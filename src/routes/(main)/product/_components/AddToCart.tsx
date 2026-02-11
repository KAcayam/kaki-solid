/* AddToCart コンポーネントの実装 */
import { useNavigate } from "@solidjs/router";
import { Check } from "lucide-solid";
import { Box, VStack, HStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Dialog from "~/components/ui/dialog";
import { CloseButton } from "~/components/ui/close-button";

interface AddToCartProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onProceedToCheckout?: () => void;
    onContinueShopping?: () => void;
}

export const AddToCart = (props: AddToCartProps) => {
    const navigate = useNavigate();

    const handleProceedToCheckoutInternal = () => {
        props.onProceedToCheckout?.();
        navigate("/cart");
    };

    const handleContinueShoppingInternal = () => {
        props.onContinueShopping?.();
        navigate("/");
    };

    return (
        <Dialog.Root
            open={props.open}
            onOpenChange={(e) => props.onOpenChange(e.open)}
        >
            <Dialog.Backdrop />
            <Dialog.Positioner px="4">
                <Dialog.Content>
                    <Dialog.CloseTrigger
                        asChild={(triggerProps) =>
                            <CloseButton {...triggerProps()} />
                        }
                    />
                    <Dialog.Header>
                        <HStack mt="4" ml="8" gap="1">
                            <Box color="green.8">
                                <Check size={24} />
                            </Box>
                            <Box
                                fontSize={{ base: "sm", md: "base" }}
                                color="fg.muted"
                            >
                                カートに商品が追加されました
                            </Box>
                        </HStack>
                    </Dialog.Header>

                    <VStack gap="4" py="4">
                        <Button
                            onClick={handleProceedToCheckoutInternal}
                            w="72"
                            cursor="pointer"
                            colorPalette="blue"
                            borderRadius="lg"
                        >
                            カートを確認する
                        </Button>
                        <Button
                            onClick={handleContinueShoppingInternal}
                            variant="outline"
                            w="72"
                            cursor="pointer"
                            color="fg.muted"
                            borderRadius="lg"
                        >
                            買い物を続ける
                        </Button>
                    </VStack>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};
