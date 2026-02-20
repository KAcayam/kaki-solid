/* ConfirmAccountUpdateModal コンポーネントの実装 */
import { Box, VStack } from "../../../../styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Dialog from "~/components/ui/dialog";
import { AccountData } from "./AccountData";
import type { ConfirmAccountUpdateModalProps } from "~/types";

export const ConfirmAccountUpdateModal = (props: ConfirmAccountUpdateModalProps) => {
    const handleConfirm = () => {
        props.onConfirm();
        // 閉じる処理は親側（onConfirm内）またはシグナル経由で行われる想定
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
                <Dialog.Content
                    w="full"
                    maxW="sm"
                    mx="auto"
                    p="0"
                    overflow="hidden"
                >
                    <Dialog.CloseTrigger />

                    <Box
                        maxH="90vh"
                        overflowY="auto"
                        bg="bg.default"
                        p="4"
                    >
                        <Dialog.Header mb="4">
                            <Dialog.Description
                                textAlign="left"
                                color="fg.muted"
                                fontSize="sm"
                            >
                                以下の内容で更新しますか
                            </Dialog.Description>
                        </Dialog.Header>

                        <VStack gap="4" w="full">
                            <AccountData user={props.tempAccount} />

                            <VStack w="72" gap="4" pt="2" mx="auto">
                                <Button
                                    w="full"
                                    colorPalette="blue"
                                    borderRadius="lg"
                                    onClick={handleConfirm}
                                >
                                    更新
                                </Button>
                                <Button
                                    variant="outline"
                                    w="full"
                                    color="fg.muted"
                                    borderRadius="lg"
                                    onClick={handleCancel}
                                >
                                    キャンセル
                                </Button>
                            </VStack>
                        </VStack>
                    </Box>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};
