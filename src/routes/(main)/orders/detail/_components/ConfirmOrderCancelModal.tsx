import { TriangleAlert } from "lucide-solid";
import { Box, VStack, HStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Dialog from "~/components/ui/dialog";
import { CloseButton } from "~/components/ui/close-button";

interface ConfirmOrderCancelModalProps {
    open: boolean;
    targetName: string;
    onConfirm: () => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export const ConfirmOrderCancelModal = (props: ConfirmOrderCancelModalProps) => {
    const handleConfirm = () => {
        props.onConfirm();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <Dialog.Root
            open={props.open}
            onOpenChange={(e) => props.onOpenChange(e.open)}
        >
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger
                        asChild={(triggerProps) =>
                            <CloseButton {...triggerProps()} />
                        }
                    />
                    <Dialog.Header>
                        <HStack mt="4" ml="8" gap="1">
                            <Box color="yellow.8" mr="2">
                                <TriangleAlert />
                            </Box>
                            <Dialog.Description
                                fontSize="sm"
                                color="fg.muted"
                                textAlign="start"
                            >
                                注文番号 {props.targetName}
                                <Box as="br" />
                                注文を取り消しますか？
                            </Dialog.Description>
                        </HStack>
                    </Dialog.Header>

                    <VStack gap="4" py="4">
                        <Button
                            onClick={handleConfirm}
                            w="72"
                            cursor="pointer"
                            colorPalette="blue"
                            borderRadius="lg"
                        >
                            取り消す
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            w="72"
                            cursor="pointer"
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
