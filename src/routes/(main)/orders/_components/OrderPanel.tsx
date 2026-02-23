/* OrderPanel コンポーネントの実装 */
import { For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Flex, Grid, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import type { Order } from "~/types";

const StyledImg = styled("img");

interface OrderPanelProps {
    order: Order;
}

export const OrderPanel = (props: OrderPanelProps) => {
    const navigate = useNavigate();

    const handleDetail = () => {
        navigate(`/orders/detail?orderId=${props.order.id}`);
    };

    return (
        <Box
            mb="4"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            p="4"
            bg="bg.default"
        >
            {/* ステータス情報エリア */}
            <Grid
                gridTemplateColumns={{ base: "repeat(3, 1fr)", md: "repeat(6, 1fr)" }}
                gap="2"
                alignItems="center"
            >
                {/* 注文日 */}
                <VStack
                    gap="0"
                    alignItems="start"
                >
                    <Box fontSize="xs" color="fg.muted">
                        注文日
                    </Box>
                    <Box
                        fontSize="sm"
                        whiteSpace="nowrap"
                    >
                        {props.order.orderDate}
                    </Box>
                </VStack>

                {/* 注文番号 */}
                <VStack
                    gap="0"
                    alignItems="start"
                    gridColumn={{ base: "span 2", md: "span 2" }}
                >
                    <Box fontSize="xs" color="fg.muted">
                        注文番号
                    </Box>
                    <Box
                        fontSize="sm"
                    >
                        {props.order.orderNumber}
                    </Box>
                </VStack>

                {/* 合計金額 */}
                <VStack
                    gap="0"
                    alignItems="start"
                >
                    <Box fontSize="xs" color="fg.muted">
                        合計金額
                    </Box>
                    <Box fontSize="sm">
                        {props.order.totalAmount.toLocaleString()}
                        <Box
                            as="span"
                            ml="0.5"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </VStack>

                {/* ステータス */}
                <Box
                    fontSize={{ base: "xs", md: "sm" }}
                    textAlign={{ base: "start", md: "end" }}
                >
                    {props.order.status}
                </Box>

                {/* 詳細ボタン */}
                <Box textAlign="right">
                    <Button
                        size="sm"
                        variant="outline"
                        fontSize="xs"
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={handleDetail}
                    >
                        詳細
                    </Button>
                </Box>
            </Grid>

            {/* 商品リストエリア */}
            <VStack
                gap="2"
                alignItems="stretch"
                mt="4"
            >
                <For each={props.order.products}>
                    {(product) => (
                        <Flex
                            gap="4"
                            borderTopWidth="1px"
                            borderColor="border.default"
                            pt="2"
                            alignItems="start"
                        >
                            {/* 商品画像 */}
                            <Box
                                w="16"
                                h="16"
                                flexShrink="0"
                                borderRadius="l2"
                                overflow="hidden"
                                border="1px solid"
                                borderColor="gray.6"
                                bgColor="bg.default"
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

                            {/* 商品名・単価 */}
                            <VStack
                                gap="0"
                                alignItems="start"
                                flex="1"
                            >
                                <Box fontSize={{ base: "sm", md: "base" }}>
                                    {product.name}
                                </Box>
                                <Box
                                    fontSize={{ base: "sm", md: "base" }}
                                    color="fg.muted"
                                >
                                    {(product.price ?? 0).toLocaleString()}
                                    <Box
                                        as="span"
                                        ml="1"
                                        fontSize="xs"
                                        color="fg.subtle"
                                    >
                                        円
                                    </Box>
                                </Box>
                            </VStack>
                        </Flex>
                    )}
                </For>
            </VStack>
        </Box>
    );
};
