import { createSignal, createEffect } from "solid-js";
import { Box, Grid, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormInput } from "~/components/common/FormInput";
import { FormSelect } from "~/components/common/FormSelect";
import { addressSchema } from "~/schemas/auth";
import prefsData from "~/data/prefectures.json";
import type { User } from "~/types";

type Prefecture = { label: string; value: string };
const prefectures: Prefecture[] = prefsData as Prefecture[];

interface AddressEditProps {
    editingUser: User | null;
    onSave: (updatedUser: User) => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export const AddressEdit = (props: AddressEditProps) => {
    // --- フォームの状態管理 ---
    const [lastName, setLastName] = createSignal("");
    const [firstName, setFirstName] = createSignal("");
    const [postalCode, setPostalCode] = createSignal("");
    const [prefecture, setPrefecture] = createSignal("");
    const [address1, setAddress1] = createSignal("");
    const [address2, setAddress2] = createSignal("");
    const [phoneNumber, setPhoneNumber] = createSignal("");

    const [errors, setErrors] = createSignal<Record<string, string>>({});

    // フィールド名と値のマッピング
    const getFieldValue = (key: string): string => {
        const map: Record<string, () => string> = {
            lastName, firstName, postalCode, prefecture, address1, address2, phoneNumber
        };
        return map[key]?.() ?? "";
    };

    // blur時の個別フィールドバリデーション
    const validateField = (key: keyof typeof addressSchema.shape) => {
        const schema = addressSchema.shape[key];
        if (!schema) return;
        const result = schema.safeParse(getFieldValue(key));
        setErrors((prev) => {
            const next = { ...prev };
            if (result.success) {
                delete next[key];
            } else {
                next[key] = result.error.issues[0]?.message ?? "入力エラー";
            }
            return next;
        });
    };

    // 入力時にエラーがあれば即座に再検証
    const handleInput = (key: keyof typeof addressSchema.shape, setter: (v: string) => void, value: string) => {
        setter(value);
        if (errors()[key]) {
            validateField(key);
        }
    };

    // editingUser が変更された際（編集開始時）の同期処理
    createEffect(() => {
        const user = props.editingUser;
        if (user) {
            setLastName(user.lastName);
            setFirstName(user.firstName);
            setPostalCode(user.postalCode);
            setPrefecture(user.prefecture);
            setAddress1(user.address1);
            setAddress2(user.address2 || "");
            setPhoneNumber(user.phoneNumber);
        } else {
            // 新規作成時はリセット
            setLastName("");
            setFirstName("");
            setPostalCode("");
            setPrefecture("");
            setAddress1("");
            setAddress2("");
            setPhoneNumber("");
        }
        setErrors({});
    });

    const onsubmitForm = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        const result = addressSchema.safeParse({
            lastName: lastName(),
            firstName: firstName(),
            postalCode: postalCode(),
            prefecture: prefecture(),
            address1: address1(),
            address2: address2(),
            phoneNumber: phoneNumber()
        });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        // 成功時に親に渡す（既存IDがある場合は引き継ぐ）
        props.onSave({
            ...(props.editingUser || {}), // 既存データがあればマージ（id, isPrimary等）
            ...result.data,
            id: props.editingUser?.id || ""
        } as User);
    };

    return (
        <Box
            p="6"
            bg="bg.default"
            borderRadius="xl"
        >
            <Box
                mb="6"
                fontSize="sm"
                color="fg.muted"
                textAlign="start"
            >
                {props.editingUser ? '配送先を編集' : '新しい配送先'}
            </Box>

            <styled.form
                onSubmit={onsubmitForm}
                display="flex"
                flexDirection="column"
                gap="6"
                novalidate
            >
                <Grid columns={2} gap="4">
                    <FormInput
                        label="姓"
                        placeholder="名前(姓)"
                        value={lastName()}
                        onInput={(e) => handleInput("lastName", setLastName, e.currentTarget.value)}
                        onBlur={() => validateField("lastName")}
                        error={errors().lastName}
                        showAsterisk
                    />
                    <FormInput
                        label="名"
                        placeholder="名前(名)"
                        value={firstName()}
                        onInput={(e) => handleInput("firstName", setFirstName, e.currentTarget.value)}
                        onBlur={() => validateField("firstName")}
                        error={errors().firstName}
                        showAsterisk
                    />
                </Grid>

                <FormInput
                    label="郵便番号"
                    placeholder="ハイフンなし"
                    value={postalCode()}
                    onInput={(e) => handleInput("postalCode", setPostalCode, e.currentTarget.value)}
                    onBlur={() => validateField("postalCode")}
                    error={errors().postalCode}
                    showAsterisk
                />

                <FormSelect
                    label="都道府県"
                    placeholder="都道府県を選択"
                    items={prefectures}
                    value={(() => {
                        const match = prefectures.find(p => p.label === prefecture());
                        return match ? [match.value] : [];
                    })()}
                    onValueChange={(details) => {
                        const selected = prefectures.find(p => p.value === details.value[0]);
                        setPrefecture(selected?.label || "");
                    }}
                    error={errors().prefecture}
                    showAsterisk
                />

                <FormInput
                    label="住所１"
                    placeholder="市区町村・番地"
                    value={address1()}
                    onInput={(e) => handleInput("address1", setAddress1, e.currentTarget.value)}
                    onBlur={() => validateField("address1")}
                    error={errors().address1}
                    showAsterisk
                />

                <FormInput
                    label="住所２"
                    placeholder="建物名・部屋番号はこちら"
                    value={address2()}
                    onInput={(e) => handleInput("address2", setAddress2, e.currentTarget.value)}
                    error={errors().address2}
                />

                <FormInput
                    label="電話番号"
                    placeholder="ハイフンなし"
                    value={phoneNumber()}
                    onInput={(e) => handleInput("phoneNumber", setPhoneNumber, e.currentTarget.value)}
                    onBlur={() => validateField("phoneNumber")}
                    error={errors().phoneNumber}
                    showAsterisk
                />

                <VStack gap="3" pt="4">
                    <Button
                        type="submit"
                        w="72"
                        colorPalette="blue"
                        borderRadius="lg"
                    >
                        登録
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        w="72"
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={props.onCancel}
                    >
                        キャンセル
                    </Button>
                </VStack>
            </styled.form>
        </Box>
    );
};
