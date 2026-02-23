import { KeyRound } from "lucide-solid";
import { VStack, HStack, Box } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Dialog from "~/components/ui/dialog";
import { CloseButton } from "~/components/ui/close-button";

interface ConfirmPasswordResetModalProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export const ConfirmPasswordResetModal = (props: ConfirmPasswordResetModalProps) => {
    return (
        <Dialog.Root
            open={props.open}
            onOpenChange={(e) => props.onOpenChange(e.open)}
        >
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content w="96">
                    <Dialog.CloseTrigger
                        asChild={(triggerProps) =>
                            <CloseButton {...triggerProps()} />
                        }
                    />
                    <Dialog.Header>
                        <HStack mt="4" ml="6" gap="2">
                            <Box color="yellow.8">
                                <KeyRound size={24} />
                            </Box>
                            <Dialog.Description
                                fontSize="sm"
                                color="fg.muted"
                            >
                                パスワードを変更しますか？
                            </Dialog.Description>
                        </HStack>
                    </Dialog.Header>

                    <VStack gap="4" py="4" mx="auto">
                        <Button
                            onClick={props.onConfirm}
                            w="72"
                            colorPalette="blue"
                            borderRadius="lg"
                        >
                            変更
                        </Button>
                        <Button
                            onClick={props.onCancel}
                            variant="outline"
                            w="72"
                            color="fg.muted"
                            borderRadius="lg"
                        >
                            キャンセル
                        </Button>
                    </VStack>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};
