import { createSignal, Switch, Match } from "solid-js";
import { Phone } from "lucide-solid";
import { Box, VStack, HStack } from "styled-system/jsx";
import { MailForm } from "~/components/send-email/MailForm";
import { ConfirmSendEmail } from "~/components/send-email/ConfirmSendEmail";
import type { ContactInput } from "~/schemas/auth";
import { notify } from "~/components/ui/toast";

interface ContactModalProps {
    onOpenChange: (open: boolean) => void;
}

export const ContactModal = (props: ContactModalProps) => {
    type ContactStep = "input" | "confirm";
    const [currentStep, setCurrentStep] = createSignal<ContactStep>("input");
    const [formData, setFormData] = createSignal<ContactInput | null>(null);

    const handleFormSubmit = (data: ContactInput) => {
        setFormData(data);
        setCurrentStep("confirm");
    };

    const handleConfirmCancel = () => {
        setCurrentStep("input");
    };

    const handleConfirmSend = () => {
        notify.success("お問い合わせを送信しました");
        props.onOpenChange(false);
    };

    return (
        <Box>
            <Switch>
                <Match when={currentStep() === "input"}>
                    <VStack
                        gap="6"
                        alignItems="stretch"
                    >
                        {/* メールお問い合わせ */}
                        <MailForm
                            onSubmitForm={handleFormSubmit}
                            initialData={formData()}
                        />

                        {/* 境界線 */}
                        <Box
                            borderTopWidth="1px"
                            borderColor="border.default"
                            w="full"
                        />

                        {/* 電話お問い合わせ */}
                        <Box mb="4">
                            <HStack gap="2" mb="2">
                                <Box color="fg.muted">
                                    <Phone />
                                </Box>
                                <Box
                                    fontWeight="semibold"
                                    color="fg.muted"
                                >
                                    お電話でお問い合わせ
                                </Box>
                            </HStack>
                            <Box
                                fontSize="sm"
                                color="fg.muted"
                                mb="4"
                            >
                                下記時間帯でも応対できない場合がありますこと、ご了承お願いいたします。
                            </Box>
                            <Box
                                color="fg.default"
                                fontWeight="medium"
                                fontSize="md"
                            >
                                【平日11:00-17:00】0123-45-6789
                            </Box>
                        </Box>
                    </VStack>
                </Match>

                {/* 確認ステップ */}
                <Match when={currentStep() === "confirm" && formData()}>
                    <ConfirmSendEmail
                        email={formData()!.email}
                        subject={formData()!.subject}
                        message={formData()!.message}
                        onCancel={handleConfirmCancel}
                        onSend={handleConfirmSend}
                    />
                </Match>
            </Switch>
        </Box>
    );
};
