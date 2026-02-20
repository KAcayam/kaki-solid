import { createSignal } from "solid-js";
import { Box, Grid, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Checkbox from "~/components/ui/checkbox";
import { FormInput } from "../FormInput";
import { FormCombobox } from "../FormCombobox";
import { signupSchema, signupBaseSchema } from "~/schemas/auth";
import type { SignupInput } from "~/schemas/auth";
import type { User } from "~/types";
import prefsData from "~/data/prefectures.json";

interface AccountEditProps {
    editingAccount: User;
    onSave: (updatedAccount: User) => void;
    onCancel: () => void;
}

export const AccountEdit = (props: AccountEditProps) => {
    const [lastName, setLastName] = createSignal(props.editingAccount.lastName);
    const [firstName, setFirstName] = createSignal(props.editingAccount.firstName);
    const [lastNameKana, setLastNameKana] = createSignal(props.editingAccount.lastNameKana);
    const [firstNameKana, setFirstNameKana] = createSignal(props.editingAccount.firstNameKana);
    const [email, setEmail] = createSignal(props.editingAccount.email);
    const [postalCode, setPostalCode] = createSignal(props.editingAccount.postalCode);
    const [prefecture, setPrefecture] = createSignal(props.editingAccount.prefecture);
    const [address1, setAddress1] = createSignal(props.editingAccount.address1);
    const [address2, setAddress2] = createSignal(props.editingAccount.address2 || "");
    const [phoneNumber, setPhoneNumber] = createSignal(props.editingAccount.phoneNumber);
    const [receiveCampaignEmails, setReceiveCampaignEmails] = createSignal(props.editingAccount.receiveCampaignEmails);

    const [errors, setErrors] = createSignal<Record<string, string>>({});

    // --- 都道府県データの定義 ---
    type Prefecture = { label: string; value: string };
    const prefectures = prefsData as Prefecture[];

    // フィールド名からシグナルの値を取得するマッピング
    const getFieldValue = (key: string): string => {
        const map: Record<string, () => string> = {
            lastName, firstName, lastNameKana, firstNameKana,
            email, postalCode, prefecture, address1, address2, phoneNumber
        };
        return map[key]?.() ?? "";
    };

    // フィールド単位のバリデーション（blur時）
    const validateField = (key: keyof SignupInput) => {
        const value = getFieldValue(key);
        const fieldSchema = signupBaseSchema.shape[key];
        if (!fieldSchema) return;

        const result = fieldSchema.safeParse(value);
        const newErrors = { ...errors() };

        if (!result.success) {
            newErrors[key] = result.error.issues[0].message;
        } else {
            delete newErrors[key];
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        const result = signupSchema.safeParse({
            lastName: lastName(),
            firstName: firstName(),
            lastNameKana: lastNameKana(),
            firstNameKana: firstNameKana(),
            email: email(),
            postalCode: postalCode(),
            prefecture: prefecture(),
            address1: address1(),
            address2: address2(),
            phoneNumber: phoneNumber(),
            password: 'dummy1234',
            passwordConfirm: 'dummy1234'
        });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        props.onSave({
            ...props.editingAccount,
            lastName: lastName(),
            firstName: firstName(),
            lastNameKana: lastNameKana(),
            firstNameKana: firstNameKana(),
            email: email(),
            postalCode: postalCode(),
            prefecture: prefecture(),
            address1: address1(),
            address2: address2(),
            phoneNumber: phoneNumber(),
            receiveCampaignEmails: receiveCampaignEmails(),
        });
    };

    return (
        <Box
            w="full"
            maxW="sm"
            p="8"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.6"
            bg="bg.default"
        >
            <Box
                mb="6"
                fontSize="sm"
                color="fg.muted"
                textAlign="start"
            >
                アカウント情報編集
            </Box>

            <styled.form
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap="6"
                novalidate
            >
                <Grid columns={2} gap="4">
                    <FormInput
                        label="姓"
                        value={lastName()}
                        onInput={(e) => setLastName(e.currentTarget.value)}
                        onBlur={() => validateField("lastName")}
                        error={errors().lastName}
                        showAsterisk
                    />
                    <FormInput
                        label="名"
                        value={firstName()}
                        onInput={(e) => setFirstName(e.currentTarget.value)}
                        onBlur={() => validateField("firstName")}
                        error={errors().firstName}
                        showAsterisk
                    />
                </Grid>

                <Grid columns={2} gap="4">
                    <FormInput
                        label="姓(カナ)"
                        value={lastNameKana()}
                        onInput={(e) => setLastNameKana(e.currentTarget.value)}
                        onBlur={() => validateField("lastNameKana")}
                        error={errors().lastNameKana}
                        showAsterisk
                    />
                    <FormInput
                        label="名(カナ)"
                        value={firstNameKana()}
                        onInput={(e) => setFirstNameKana(e.currentTarget.value)}
                        onBlur={() => validateField("firstNameKana")}
                        error={errors().firstNameKana}
                        showAsterisk
                    />
                </Grid>

                <FormInput
                    label="メールアドレス"
                    type="email"
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    onBlur={() => validateField("email")}
                    error={errors().email}
                    showAsterisk
                />

                <FormInput
                    label="郵便番号"
                    value={postalCode()}
                    onInput={(e) => setPostalCode(e.currentTarget.value)}
                    onBlur={() => validateField("postalCode")}
                    error={errors().postalCode}
                    showAsterisk
                />

                <FormCombobox
                    label="都道府県"
                    placeholder="都道府県を検索・選択"
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
                    onBlur={() => validateField("prefecture")}
                />

                <FormInput
                    label="住所１"
                    value={address1()}
                    onInput={(e) => setAddress1(e.currentTarget.value)}
                    onBlur={() => validateField("address1")}
                    error={errors().address1}
                    showAsterisk
                />

                <FormInput
                    label="住所２"
                    value={address2()}
                    onInput={(e) => setAddress2(e.currentTarget.value)}
                    onBlur={() => validateField("address2")}
                    error={errors().address2}
                />

                <FormInput
                    label="電話番号"
                    value={phoneNumber()}
                    onInput={(e) => setPhoneNumber(e.currentTarget.value)}
                    onBlur={() => validateField("phoneNumber")}
                    error={errors().phoneNumber}
                    showAsterisk
                />

                <Box
                    pt="2"
                    display="flex"
                    alignItems="start"
                    w="full"
                >
                    <Checkbox.Root
                        checked={receiveCampaignEmails()}
                        onCheckedChange={(e) => setReceiveCampaignEmails(!!e.checked)}
                        colorPalette="blue"
                        cursor="pointer"
                    >
                        <Checkbox.Control
                            borderColor="gray.6"
                            borderRadius="l2"
                        >
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label
                            fontSize="sm"
                            color="fg.muted"
                        >
                            キャンペーンメールを受信する
                        </Checkbox.Label>
                        <Checkbox.HiddenInput />
                    </Checkbox.Root>
                </Box>

                <VStack gap="3" pt="4">
                    <Button
                        type="submit"
                        w="full"
                        colorPalette="blue"
                        borderRadius="lg"
                    >
                        保存
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        w="full"
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
