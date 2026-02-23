import { createSignal } from "solid-js";
import { Box, Grid, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Checkbox from "~/components/ui/checkbox";
import { FormInput } from "~/components/common/FormInput";
import { FormSelect } from "~/components/common/FormSelect";
import { signupSchema, signupBaseSchema, type SignupInput } from "~/schemas/auth";
import prefsData from "~/data/prefectures.json";
import type { User } from "~/types";

interface GuestSignupFormProps {
    guestUser?: User | null;
    onSave?: (updatedAccount: SignupInput & { receiveCampaignEmails: boolean }) => void;
    onCancel?: () => void;
}

export const GuestSignupForm = (props: GuestSignupFormProps) => {
    const guest = props.guestUser;

    // フィールドの状態管理
    const [formData, setFormData] = createSignal<SignupInput>({
        email: guest?.email || "",
        password: "",
        passwordConfirm: "",
        lastName: guest?.lastName || "",
        firstName: guest?.firstName || "",
        lastNameKana: guest?.lastNameKana || "",
        firstNameKana: guest?.firstNameKana || "",
        postalCode: guest?.postalCode || "",
        prefecture: guest?.prefecture || "",
        address1: guest?.address1 || "",
        address2: guest?.address2 || "",
        phoneNumber: guest?.phoneNumber || "",
    });
    const [receiveCampaignEmails, setReceiveCampaignEmails] = createSignal(guest?.receiveCampaignEmails ?? false);

    // エラー状態管理
    const [errors, setErrors] = createSignal<Record<string, string>>({});

    // 入力値更新用のヘルパー（エラーがあれば即座に再検証）
    const updateField = (key: keyof SignupInput, value: string) => {
        setFormData({ ...formData(), [key]: value });
        if (errors()[key]) {
            validateField(key);
        }
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

    const handleSubmit = (e: SubmitEvent) => {
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

        props.onSave?.({
            ...result.data,
            receiveCampaignEmails: receiveCampaignEmails()
        });
    };

    // 都道府県データの定義
    type Prefecture = { label: string; value: string };
    const prefectures = prefsData as Prefecture[];

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
                アカウント情報登録
            </Box>

            <styled.form onSubmit={handleSubmit} display="flex" flexDirection="column" gap="6" novalidate>
                <FormInput
                    label="メールアドレス"
                    type="email"
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
                        value={formData().lastName}
                        onInput={(e) => updateField("lastName", e.currentTarget.value)}
                        onBlur={() => validateField("lastName")}
                        error={errors().lastName}
                        showAsterisk
                    />
                    <FormInput
                        label="名"
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
                        value={formData().lastNameKana}
                        onInput={(e) => updateField("lastNameKana", e.currentTarget.value)}
                        onBlur={() => validateField("lastNameKana")}
                        error={errors().lastNameKana}
                        showAsterisk
                    />
                    <FormInput
                        label="名(カナ)"
                        value={formData().firstNameKana}
                        onInput={(e) => updateField("firstNameKana", e.currentTarget.value)}
                        onBlur={() => validateField("firstNameKana")}
                        error={errors().firstNameKana}
                        showAsterisk
                    />
                </Grid>

                <FormInput
                    label="郵便番号"
                    value={formData().postalCode}
                    onInput={(e) => updateField("postalCode", e.currentTarget.value)}
                    onBlur={() => validateField("postalCode")}
                    error={errors().postalCode}
                    showAsterisk
                />

                <FormSelect
                    label="都道府県"
                    placeholder="都道府県を選択"
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
                />

                <FormInput
                    label="住所１"
                    value={formData().address1}
                    onInput={(e) => updateField("address1", e.currentTarget.value)}
                    onBlur={() => validateField("address1")}
                    error={errors().address1}
                    showAsterisk
                />

                <FormInput
                    label="住所２"
                    value={formData().address2 || ""}
                    onInput={(e) => updateField("address2", e.currentTarget.value)}
                    error={errors().address2}
                />

                <FormInput
                    label="電話番号"
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
                        colorPalette="blue"

                        cursor="pointer"
                    >
                        <Checkbox.Control
                            borderColor="gray.6"
                            borderRadius="l2"
                        >
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Label fontSize="sm" color="fg.muted">
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
                        onClick={props.onCancel}
                    >
                        キャンセル
                    </Button>
                </VStack>
            </styled.form>
        </Box>
    );
};
