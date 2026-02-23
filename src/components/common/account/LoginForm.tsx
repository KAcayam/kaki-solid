import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Eye, EyeOff } from "lucide-solid";
import { Box, VStack, Flex, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Field from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { Input } from "~/components/ui/input";
import { FormInput } from "~/components/common/FormInput";
import { loginSchema, type LoginInput } from "~/schemas/auth";

interface LoginFormProps {
    signupLink?: string;
}

export const LoginForm = (props: LoginFormProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [showPassword, setShowPassword] = createSignal(false);
    const [errors, setErrors] = createSignal<Record<string, string>>({});

    const signupLink = props.signupLink ?? "/signup";

    // フィールド単位のバリデーション（blur時）
    const validateField = (key: keyof LoginInput) => {
        const values: Record<string, string> = { email: email(), password: password() };
        const fieldSchema = loginSchema.shape[key];
        if (!fieldSchema) return;

        const result = fieldSchema.safeParse(values[key]);
        const newErrors = { ...errors() };

        if (!result.success) {
            newErrors[key] = result.error.issues[0].message;
        } else {
            delete newErrors[key];
        }

        setErrors(newErrors);
    };

    // 入力時にエラーがあれば即座に再検証
    const handleInput = (key: keyof LoginInput, setter: (v: string) => void, value: string) => {
        setter(value);
        if (errors()[key]) {
            validateField(key);
        }
    };

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        const result = loginSchema.safeParse({
            email: email(),
            password: password()
        });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        // バリデーション成功時の処理（API連携等）
        console.log("Validated Data:", result.data);
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
                <styled.form
                    onSubmit={onSubmit}
                    display="flex"
                    flexDirection="column"
                    gap="6"
                    novalidate
                >
                    {/* Googleログインで置き換える */}
                    <Button variant="outline" type="button" w="full" cursor="pointer">
                        Sign in with Google（ロゴ付き）
                    </Button>

                    <Flex align="center" gap="4">
                        <Box flex="1" h="1px" bg="gray.6" />
                        <Box fontSize="xs" color="fg.muted">
                            もしくは
                        </Box>
                        <Box flex="1" h="1px" bg="gray.6" />
                    </Flex>

                    <FormInput
                        label="Email"
                        type="email"
                        placeholder="メールアドレス"
                        value={email()}
                        onInput={(e) => handleInput("email", setEmail, e.currentTarget.value)}
                        onBlur={() => validateField("email")}
                        error={errors().email}
                    />

                    <Field.Root invalid={!!errors().password}>
                        <Field.Label>
                            Password
                        </Field.Label>
                        <Box position="relative">
                            <Input
                                type={showPassword() ? "text" : "password"}
                                placeholder="パスワード"
                                value={password()}
                                onInput={(e) => handleInput("password", setPassword, e.currentTarget.value)}
                                onBlur={() => validateField("password")}
                                pr="10"
                            />
                            <Box
                                position="absolute"
                                right="1"
                                top="50%"
                                transform="translateY(-50%)"
                            >
                                <IconButton
                                    variant="plain"
                                    size="sm"
                                    type="button"
                                    aria-label={showPassword() ? "パスワードを隠す" : "パスワードを表示"}
                                    onClick={() => setShowPassword(!showPassword())}
                                >
                                    {showPassword() ? <EyeOff /> : <Eye />}
                                </IconButton>
                            </Box>
                        </Box>
                        <Show when={errors().password}>
                            <Field.ErrorText>{errors().password}</Field.ErrorText>
                        </Show>
                    </Field.Root>

                    <Box textAlign="start">
                        <styled.a
                            href="#"
                            fontSize="sm"
                            color="fg.subtle"
                            _hover={{ color: "fg.muted", backgroundColor: "gray.3" }}
                        >
                            パスワードを忘れた場合
                        </styled.a>

                    </Box>

                    <Button
                        type="submit"
                        w="full"
                        colorPalette="blue"
                        borderRadius="lg"
                    >
                        ログイン
                    </Button>
                </styled.form>
            </Box>

            {/* 新規登録ボタンエリア */}
            <Box w="full" maxW="sm" px="8" pt="4">
                <Button
                    variant="outline"
                    w="full"
                    color="fg.muted"
                    borderRadius="lg"
                    onClick={() => navigate(signupLink)}
                >
                    新規登録
                </Button>
            </Box>
        </VStack>
    );
};
