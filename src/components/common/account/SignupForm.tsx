/* 新規登録フォームの実装（src/components/common/account/SignupForm.tsx） */
import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Grid, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Checkbox from "~/components/ui/checkbox";
import { FormInput } from "~/components/common/FormInput";
import { FormCombobox } from "~/components/common/FormCombobox";
import { signupSchema, signupBaseSchema, type SignupInput } from "~/schemas/auth";
import prefsData from "~/data/prefectures.json";
import { ConfirmSignupModal } from "./ConfirmSignupModal";

interface SignupFormProps {
    cancelLink?: string;
}

// --- 都道府県データの定義 ---
type Prefecture = { label: string; value: string };
const prefectures = prefsData as Prefecture[];

export const SignupForm = (props: SignupFormProps) => {
    const navigate = useNavigate();
    const cancelLink = props.cancelLink ?? "/";

    // --- フィールドの状態管理 ---
    const [formData, setFormData] = createSignal<SignupInput>({
        email: "",
        password: "",
        passwordConfirm: "",
        lastName: "",
        firstName: "",
        lastNameKana: "",
        firstNameKana: "",
        postalCode: "",
        prefecture: "",
        address1: "",
        address2: "",
        phoneNumber: "",
    });
    const [receiveCampaignEmails, setReceiveCampaignEmails] = createSignal(true);

    // エラー・モーダル状態管理
    const [errors, setErrors] = createSignal<Record<string, string>>({});
    const [showConfirmModal, setShowConfirmModal] = createSignal(false);

    // 入力値更新用のヘルパー
    const updateField = (key: keyof SignupInput, value: string) => {
        setFormData({ ...formData(), [key]: value });
    };

    // フィールド単位のバリデーション（blur時）
    const validateField = (key: keyof SignupInput) => {
        const value = formData()[key];
        const fieldSchema = signupBaseSchema.shape[key];
        if (!fieldSchema) return;

        const result = fieldSchema.safeParse(value);
        const newErrors = { ...errors() };

        if (!result.success) {
            newErrors[key] = result.error.issues[0].message;
        } else {
            delete newErrors[key];
        }

        // passwordConfirm の場合はパスワード一致もチェック
        if (key === "passwordConfirm" && result.success) {
            if (formData().password !== formData().passwordConfirm) {
                newErrors.passwordConfirm = "パスワードが一致しません";
            }
        }

        setErrors(newErrors);
    };

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        const result = signupSchema.safeParse(formData());

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

    const handleConfirmUpdate = () => {
        // API送信などの登録処理をここに記述
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

                    <FormInput
                        label="パスワード"
                        type="password"
                        placeholder="半角英数字で8文字以上"
                        value={formData().password}
                        onInput={(e) => updateField("password", e.currentTarget.value)}
                        onBlur={() => validateField("password")}
                        error={errors().password}
                        showAsterisk
                    />

                    <FormInput
                        label="パスワード(確認)"
                        type="password"
                        placeholder="確認のためもう一度入力してください"
                        value={formData().passwordConfirm}
                        onInput={(e) => updateField("passwordConfirm", e.currentTarget.value)}
                        onBlur={() => validateField("passwordConfirm")}
                        error={errors().passwordConfirm}
                        showAsterisk
                    />

                    <Box borderTopWidth="1px" borderColor="border.subtle" />

                    <Grid columns={2} gap="4">
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

                    <Grid columns={2} gap="4">
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

                    <VStack gap="3">
                        <Button
                            type="submit"
                            w="full"
                            colorPalette="blue"
                            borderRadius="lg"
                        >
                            確認
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            w="full"
                            color="fg.muted"
                            borderRadius="lg"
                            onClick={() => navigate(cancelLink)}
                        >
                            キャンセル
                        </Button>
                    </VStack>
                </styled.form>
            </Box>

            <ConfirmSignupModal
                open={showConfirmModal()}
                tempAccount={{ ...formData(), receiveCampaignEmails: receiveCampaignEmails() }}
                onConfirm={handleConfirmUpdate}
                onCancel={() => setShowConfirmModal(false)}
                onOpenChange={setShowConfirmModal}
            />
        </VStack>
    );
};
