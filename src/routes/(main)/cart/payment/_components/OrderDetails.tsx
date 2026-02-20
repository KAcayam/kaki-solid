import { createSignal, onMount, onCleanup, For } from "solid-js";
import { Box, Flex, VStack } from "styled-system/jsx";
import * as Accordion from "~/components/ui/accordion";
import { CartItem } from "~/types";

interface OrderDetailsProps {
    cartItems: CartItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
}

export const OrderDetails = (props: OrderDetailsProps) => {
    // アコーディオンの開閉状態
    const [value, setValue] = createSignal<string[]>([]);

    let mediaQuery: MediaQueryList;
    let handleChange: (e: MediaQueryListEvent) => void;

    onMount(() => {
        mediaQuery = window.matchMedia("(min-width: 768px)");

        // 初期描画時の判定（デスクトップなら開く）
        if (mediaQuery.matches) {
            requestAnimationFrame(() => setValue(["order-details"]));
        }

        // 画面リサイズ時のイベントリスナー
        handleChange = (e: MediaQueryListEvent) => {
            setValue(e.matches ? ["order-details"] : []);
        };
        mediaQuery.addEventListener("change", handleChange);
    });

    onCleanup(() => {
        if (mediaQuery && handleChange) {
            mediaQuery.removeEventListener("change", handleChange);
        }
    });

    return (
        <Box
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            px="6"
            pb="3"
            bg="bg.default"
        >
            {/* ご注文内容アコーディオン */}
            <Accordion.Root
                value={value()}
                onValueChange={(details) => setValue(details.value)}
                collapsible
            >
                <Accordion.Item value="order-details">
                    <Accordion.ItemTrigger
                        cursor="pointer"
                        fontSize="sm"
                        color="fg.subtle"
                        _hover={{ textDecoration: "none" }}
                    >
                        ご注文内容
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>

                    <Accordion.ItemContent px="0" pb="3">
                        <VStack
                            alignItems="stretch"
                            w="full"
                        >
                            <For each={props.cartItems}>
                                {(item) => (
                                    <Flex
                                        justify="space-between"
                                        fontSize="sm"
                                        color="fg.muted"
                                    >
                                        <Box>
                                            {item.title} × {item.quantity}
                                        </Box>
                                        <Box>
                                            {(item.price * item.quantity).toLocaleString()}
                                            <Box
                                                as="span"
                                                ml="1"
                                                fontSize="xs"
                                            >
                                                円
                                            </Box>
                                        </Box>
                                    </Flex>
                                )}
                            </For>
                        </VStack>
                    </Accordion.ItemContent>
                </Accordion.Item>
            </Accordion.Root>

            {/* 小計・送料・合計エリア */}
            <VStack
                gap="2"
                alignItems="stretch"
                pt="3"
            >
                <Flex justify="space-between" fontSize="sm">
                    <Box color="fg.subtle">
                        小計
                    </Box>
                    <Box>
                        {props.subtotal.toLocaleString()}
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </Flex>

                <Flex justify="space-between" fontSize="sm">
                    <Box color="fg.subtle">
                        送料
                    </Box>
                    <Box>
                        {props.shippingCost.toLocaleString()}
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </Flex>

                <Flex justify="space-between" pt="2">
                    <Box>
                        <Box as="span" fontWeight="semibold">
                            合計
                        </Box>
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            税込
                        </Box>
                    </Box>
                    <Box fontSize="lg" fontWeight="semibold">
                        {props.total.toLocaleString()}
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </Flex>
            </VStack>
        </Box>
    );
};
