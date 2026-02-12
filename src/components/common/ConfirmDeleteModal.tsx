/* ConfirmDeleteModal コンポーネントの実装 */
import { TriangleAlert } from "lucide-solid";
import { Box, VStack, HStack } from "styled-system/jsx";
import { Button } from "../ui/button";
import * as Dialog from "../ui/dialog";
import { CloseButton } from "../ui/close-button";

interface ConfirmDeleteModalProps {
    open: boolean;
    targetName: string;
    onConfirm: () => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export const ConfirmDeleteModal = (props: ConfirmDeleteModalProps) => {
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
                            <Box color="yellow.8">
                                <TriangleAlert size={24} />
                            </Box>
                            <Dialog.Description fontSize="sm" color="fg.default">
                                {props.targetName} を削除しますか？
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
                            削除
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
