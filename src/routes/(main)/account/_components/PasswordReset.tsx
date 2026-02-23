import { createSignal } from "solid-js";
import { Box, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { FormInput } from "~/components/common/FormInput";
import { passwordChangeSchema } from "~/schemas/auth";
import { z } from "zod";

// フィールド単位バリデーション用のベーススキーマ（refineなし）
const passwordChangeBaseSchema = z.object({
    password: z.string().min(8, { message: '半角英数字8文字以上にしてください' }),
    passwordConfirm: z.string().min(1, { message: '必須項目です' })
});

type PasswordChangeField = keyof z.infer<typeof passwordChangeBaseSchema>;

interface PasswordResetProps {
    onCancel?: () => void;
    onSave?: (password: string, passwordConfirm: string) => void;
}

export const PasswordReset = (props: PasswordResetProps) => {
    const [password, setPassword] = createSignal("");
    const [passwordConfirm, setPasswordConfirm] = createSignal("");
    const [errors, setErrors] = createSignal<Record<string, string>>({});

    // フィールドの値を取得するヘルパー
    const getFieldValue = (key: string): string => {
        const map: Record<string, () => string> = { password, passwordConfirm };
        return map[key]?.() ?? "";
    };

    // 入力時にエラーがあれば即座に再検証
    const handleInput = (key: PasswordChangeField, setter: (v: string) => void, value: string) => {
        setter(value);
        if (errors()[key]) {
            validateField(key);
        }
    };

    // フィールド単位のバリデーション（blur時）
    const validateField = (key: PasswordChangeField) => {
        const value = getFieldValue(key);
        const fieldSchema = passwordChangeBaseSchema.shape[key];
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
            if (password() !== passwordConfirm()) {
                newErrors.passwordConfirm = "パスワードが一致しません";
            }
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        const result = passwordChangeSchema.safeParse({
            password: password(),
            passwordConfirm: passwordConfirm(),
        });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        props.onSave?.(password(), passwordConfirm());
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
                パスワードを変更する
            </Box>

            <styled.form onSubmit={handleSubmit} display="flex" flexDirection="column" gap="6" novalidate>
                <FormInput
                    label="新しいパスワード"
                    type="password"
                    placeholder="パスワードを入力してください"
                    value={password()}
                    onInput={(e) => handleInput("password", setPassword, e.currentTarget.value)}
                    onBlur={() => validateField("password")}
                    error={errors().password}
                    showAsterisk
                />

                <FormInput
                    label="新しいパスワード(確認)"
                    type="password"
                    placeholder="確認のためもう一度入力してください"
                    value={passwordConfirm()}
                    onInput={(e) => handleInput("passwordConfirm", setPasswordConfirm, e.currentTarget.value)}
                    onBlur={() => validateField("passwordConfirm")}
                    error={errors().passwordConfirm}
                    showAsterisk
                />

                <VStack gap="3" pt="4">
                    <Button
                        type="submit"
                        w="full"
                        colorPalette="blue"
                        borderRadius="lg"
                    >
                        更新
                    </Button>
                    <Button
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
