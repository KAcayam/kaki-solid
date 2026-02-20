/* ゲスト購入フォームの実装（src/routes/(main)/cart/customer-information/_components/GuestForm.tsx） */
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Grid, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Checkbox from "~/components/ui/checkbox";
import { FormInput } from "~/components/common/FormInput";
import { FormCombobox } from "~/components/common/FormCombobox";
import { guestSchema, type GuestInput } from "~/schemas/auth";
import prefsData from "~/data/prefectures.json";
import { ConfirmGuestModal } from "./ConfirmGuestModal";

// --- 都道府県データの定義 ---
type Prefecture = { label: string; value: string };
const prefectures = prefsData as Prefecture[];

interface GuestFormProps {
    cancelLink?: string;
}

export const GuestForm = (props: GuestFormProps) => {
    const navigate = useNavigate();
    const cancelLink = props.cancelLink ?? "/";

    // --- フォームの状態管理 ---
    const [formData, setFormData] = createSignal<GuestInput>({
        lastName: "",
        firstName: "",
        lastNameKana: "",
        firstNameKana: "",
        postalCode: "",
        prefecture: "",
        address1: "",
        address2: "",
        phoneNumber: "",
        email: ""
    });
    const [receiveCampaignEmails, setReceiveCampaignEmails] = createSignal(true);
    const [errors, setErrors] = createSignal<Record<string, string>>({});
    const [showConfirmModal, setShowConfirmModal] = createSignal(false);

    // 入力更新ヘルパー
    const updateField = (key: keyof GuestInput, value: string) => {
        setFormData({ ...formData(), [key]: value });
    };

    // フィールド単位のバリデーション（blur時）
    const validateField = (key: keyof GuestInput) => {
        const value = formData()[key];
        const fieldSchema = guestSchema.shape[key];
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

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        const result = guestSchema.safeParse(formData());

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        // バリデーション成功で確認モーダルを表示
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        // API送信などの処理をここに記述
        setShowConfirmModal(false);
    };

    return (
        <VStack gap="4" w="full">
            <Box
                w="full"
                maxW="sm"
                p="8"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.6"
                bg="bg.default"
            >
                <styled.form onSubmit={onSubmit} display="flex" flexDirection="column" gap="6" novalidate>
                    <Grid columns={{ base: 1, sm: 2 }} gap="4">
                        <FormInput
                            label="姓"
                            placeholder="名前(姓)"
                            value={formData().lastName}
                            onInput={(e) => updateField("lastName", e.currentTarget.value)}
                            onBlur={() => validateField("lastName")}
                            error={errors().lastName}
                            showAsterisk
                        />
                        <FormInput
                            label="名"
                            placeholder="名前(名)"
                            value={formData().firstName}
                            onInput={(e) => updateField("firstName", e.currentTarget.value)}
                            onBlur={() => validateField("firstName")}
                            error={errors().firstName}
                            showAsterisk
                        />
                    </Grid>

                    <Grid columns={{ base: 1, sm: 2 }} gap="4">
                        <FormInput
                            label="姓(カナ)"
                            placeholder="ナマエ(姓)"
                            value={formData().lastNameKana}
                            onInput={(e) => updateField("lastNameKana", e.currentTarget.value)}
                            onBlur={() => validateField("lastNameKana")}
                            error={errors().lastNameKana}
                            showAsterisk
                        />
                        <FormInput
                            label="名(カナ)"
                            placeholder="ナマエ(名)"
                            value={formData().firstNameKana}
                            onInput={(e) => updateField("firstNameKana", e.currentTarget.value)}
                            onBlur={() => validateField("firstNameKana")}
                            error={errors().firstNameKana}
                            showAsterisk
                        />
                    </Grid>

                    <FormInput
                        label="郵便番号"
                        placeholder="ハイフンなし"
                        value={formData().postalCode}
                        onInput={(e) => updateField("postalCode", e.currentTarget.value)}
                        onBlur={() => validateField("postalCode")}
                        error={errors().postalCode}
                        showAsterisk
                    />

                    <FormCombobox
                        label="都道府県"
                        placeholder="都道府県を検索・選択"
                        items={prefectures}
                        value={(() => {
                            const match = prefectures.find(p => p.label === formData().prefecture);
                            return match ? [match.value] : [];
                        })()}
                        onValueChange={(details) => {
                            const selected = prefectures.find(p => p.value === details.value[0]);
                            updateField("prefecture", selected?.label || "");
                        }}
                        error={errors().prefecture}
                        showAsterisk
                        onBlur={() => validateField("prefecture")}
                    />

                    <FormInput
                        label="住所１"
                        placeholder="市区町村・番地"
                        value={formData().address1}
                        onInput={(e) => updateField("address1", e.currentTarget.value)}
                        onBlur={() => validateField("address1")}
                        error={errors().address1}
                        showAsterisk
                    />

                    <FormInput
                        label="住所２"
                        placeholder="建物名・部屋番号はこちら"
                        value={formData().address2 || ""}
                        onInput={(e) => updateField("address2", e.currentTarget.value)}
                        onBlur={() => validateField("address2")}
                        error={errors().address2}
                    />

                    <FormInput
                        label="電話番号"
                        placeholder="ハイフンなし"
                        value={formData().phoneNumber}
                        onInput={(e) => updateField("phoneNumber", e.currentTarget.value)}
                        onBlur={() => validateField("phoneNumber")}
                        error={errors().phoneNumber}
                        showAsterisk
                    />

                    <FormInput
                        label="メールアドレス"
                        type="email"
                        placeholder="メールアドレス"
                        value={formData().email}
                        onInput={(e) => updateField("email", e.currentTarget.value)}
                        onBlur={() => validateField("email")}
                        error={errors().email}
                        showAsterisk
                    />

                    <Box
                        py="2"
                        display="flex"
                        alignItems="start"
                        w="full"
                    >
                        <Checkbox.Root
                            checked={receiveCampaignEmails()}
                            onCheckedChange={(e) => setReceiveCampaignEmails(!!e.checked)}
                        >
                            <Checkbox.Control
                                colorPalette="blue"
                                borderRadius="l2"
                            >
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            <Checkbox.Label
                                fontSize="sm"
                                color="fg.muted"
                                cursor="pointer"
                            >
                                キャンペーンメールを受信する
                            </Checkbox.Label>
                            <Checkbox.HiddenInput />
                        </Checkbox.Root>
                    </Box>

                    {/* アクションボタン */}
                    <VStack gap="3">
                        <Button
                            type="submit"
                            w="full"
                            borderRadius="lg"
                            colorPalette="blue"
                        >
                            次に進む
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            w="full"
                            borderRadius="lg"
                            color="fg.muted"
                            onClick={() => navigate(cancelLink)}
                            cursor="pointer"
                        >
                            キャンセル
                        </Button>
                    </VStack>
                </styled.form>
            </Box>

            <ConfirmGuestModal
                open={showConfirmModal()}
                tempAccount={{ ...formData(), receiveCampaignEmails: receiveCampaignEmails() }}
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirmModal(false)}
                onOpenChange={setShowConfirmModal}
            />
        </VStack>
    );
};
