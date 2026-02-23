import { createSignal, Show } from "solid-js";
import { Mail } from "lucide-solid";
import { Box, HStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import * as Field from "~/components/ui/field";
import { FormInput } from "~/components/common/FormInput";
import { contactSchema, type ContactInput } from "~/schemas/auth";

interface MailFormProps {
    onSubmitForm: (data: ContactInput) => void;
    initialData?: ContactInput | null;
}

export const MailForm = (props: MailFormProps) => {
    const [email, setEmail] = createSignal(props.initialData?.email ?? "");
    const [subject, setSubject] = createSignal(props.initialData?.subject ?? "");
    const [message, setMessage] = createSignal(props.initialData?.message ?? "");
    const [errors, setErrors] = createSignal<Record<string, string>>({});

    // フィールド単位のバリデーション（blur時）
    const validateField = (key: keyof ContactInput) => {
        const values: Record<string, string> = { email: email(), subject: subject(), message: message() };
        const fieldSchema = contactSchema.shape[key];
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
    const handleInput = (key: keyof ContactInput, value: string) => {
        const setters = { email: setEmail, subject: setSubject, message: setMessage };
        setters[key](value);
        if (errors()[key]) {
            // setterの後にvalidateFieldを呼ぶため、最新値を使うようタイマーで遅延
            // ただしSolidJSではsetter直後にシグナルが更新されるのでそのまま呼べる
            validateField(key);
        }
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        setErrors({});

        // Zodバリデーションの実行
        const result = contactSchema.safeParse({
            email: email(),
            subject: subject(),
            message: message(),
        });

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        // バリデーション成功時に親コンポーネントへデータを渡す
        props.onSubmitForm(result.data);
    };

    return (
        <Box
            w="full"
            maxW="md"
            mx="auto"
            mt="6"
        >
            <Box mb="6">
                <HStack gap="2" mb="2">
                    <Box color="fg.muted">
                        <Mail />
                    </Box>
                    <Box fontWeight="semibold" color="fg.muted">
                        メールでお問い合わせ
                    </Box>
                </HStack>
                <Box fontSize="sm" color="fg.muted">
                    返答にはお時間をいただく場合がございます。
                    また、内容によってはご返答いたしかねる場合もありますこと、ご了承お願いいたします。
                </Box>
            </Box>

            {/* フォームセクション */}
            <styled.form
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap="4"
                novalidate
            >
                <FormInput
                    label="メールアドレス"
                    type="email"
                    placeholder="メールアドレス"
                    value={email()}
                    onInput={(e) => handleInput("email", e.currentTarget.value)}
                    onBlur={() => validateField("email")}
                    error={errors().email}
                    showAsterisk
                />
                <FormInput
                    label="件名"
                    placeholder="件名"
                    value={subject()}
                    onInput={(e) => handleInput("subject", e.currentTarget.value)}
                    onBlur={() => validateField("subject")}
                    error={errors().subject}
                    showAsterisk
                />

                {/* お問い合わせ内容 (Textarea) */}
                <Field.Root invalid={!!errors().message}>
                    <Field.Label>
                        お問い合わせ内容
                        <Box
                            as="span"
                            color="red.10"
                            ml="1">
                            *
                        </Box>
                    </Field.Label>
                    <Textarea
                        placeholder="お問い合わせ内容を入力してください"
                        value={message()}
                        onInput={(e) => handleInput("message", e.currentTarget.value)}
                        onBlur={() => validateField("message")}
                        rows={5}
                    />
                    <Show when={errors().message}>
                        <Field.ErrorText>
                            {errors().message}
                        </Field.ErrorText>
                    </Show>
                </Field.Root>

                <Button
                    type="submit"
                    w="72"
                    colorPalette="blue"
                    borderRadius="lg"
                    mx="auto"
                    mt="2"
                >
                    入力内容の確認
                </Button>
            </styled.form>
        </Box>
    );
};