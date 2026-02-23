import { For, Show } from "solid-js";
import { Box, Flex, VStack, styled } from "styled-system/jsx";
import type { Order } from "~/types";

const StyledImg = styled("img");

interface OrderItemsProps {
    order: Order;
}

export const OrderItems = (props: OrderItemsProps) => {
    return (
        <Box
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            px="4"
            pt="3"
            pb="2"
            bg="bg.default"
        >
            <Box
                fontSize="xs"
                color="fg.muted"
                textAlign="start"
            >
                注文商品
            </Box>

            <VStack
                gap="0"
                alignItems="stretch"
                mt="2"
            >
                <For each={props.order.products}>
                    {(product) => (
                        <Flex
                            gap="4"
                            borderTopWidth="1px"
                            borderColor="border.subtle"
                            pt="2"
                            mb="2"
                            alignItems="start"
                        >
                            {/* 商品画像 */}
                            <Box
                                w="24"
                                h="24"
                                flexShrink="0"
                                borderRadius="l2"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="gray.6"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Show
                                    when={product.image}
                                    fallback={
                                        <Box fontSize="xs" color="fg.subtle">
                                            写真なし
                                        </Box>
                                    }
                                >
                                    {(src) => (
                                        <StyledImg
                                            src={src()}
                                            alt={product.name}
                                            w="full"
                                            h="full"
                                            objectFit="cover"
                                        />
                                    )}
                                </Show>
                            </Box>

                            {/* 商品詳細情報 */}
                            <VStack
                                gap="1"
                                alignItems="start"
                                flex="1">
                                <Box fontSize="sm">
                                    {product.name}
                                </Box>
                                <Box fontSize="sm" color="fg.muted">
                                    {(product.price ?? 0).toLocaleString()}
                                    <Box
                                        as="span"
                                        ml="1"
                                        fontSize="xs"
                                        color="fg.subtle">
                                        円
                                    </Box>
                                </Box>
                                <Box
                                    mt="2"
                                    fontSize="sm"
                                    color="fg.default"
                                >
                                    個数：{product.quantity}
                                </Box>
                            </VStack>
                        </Flex>
                    )}
                </For>
            </VStack>
        </Box>
    );
};
