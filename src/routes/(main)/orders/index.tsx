import { For, Show, createMemo } from "solid-js";
import { A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, VStack, styled } from "styled-system/jsx";
import { OrderPanel } from "./_components/OrderPanel";
import productsData from "~/data/products.json";
import ordersData from "~/data/orders.json";
import type { Order, OrderStatus, ProductCategory } from "~/types";

const StyledLink = styled(A);

export default function OrderHistoryPage() {
    const pageTitle = "注文履歴一覧";

    // 商品情報をIDで検索するためのマップを作成
    const productMap = new Map(productsData.map((p) => [p.id, p]));

    // 注文データに商品詳細情報を紐付ける
    const orders = createMemo<Order[]>(() => {
        return (ordersData || []).map((order) => {
            return {
                id: order.id,
                orderDate: order.date,
                orderNumber: order.id,
                totalAmount: order.total,
                status: order.status as OrderStatus,
                subtotal: order.subtotal ?? 0,
                shippingCost: order.shippingCost ?? 0,
                products: order.items.map((item) => {
                    const product = productMap.get(item.productId);
                    return {
                        id: item.productId,
                        name: product?.name ?? "商品が見つかりません",
                        price: item.price,
                        image: product?.image ?? null,
                        category: (product?.category ?? "withShell") as ProductCategory,
                        inStock: product?.inStock ?? true,
                        description: product?.description ?? "",
                        detailImages: product?.detailImages ?? [],
                        quantity: item.quantity
                    };
                })
            };
        });
    });

    return (
        <Flex>
            <Box w="full" px="4">
                {/* TOPに戻るリンク */}
                <Box w="fit-content" mb="4">
                    <StyledLink
                        href="/"
                        display="flex"
                        alignItems="center"
                        gap="1"
                        color="fg.subtle"
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{ color: "fg.muted" }}
                    >
                        <ChevronLeft size={16} />
                        TOPに戻る
                    </StyledLink>
                </Box>

                {/* ページタイトル */}
                <Box
                    w="full"
                    maxW="2xl"
                    mx="auto"
                    textAlign="start"
                >
                    <Box
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="medium"
                    >
                        {pageTitle}
                    </Box>
                </Box>

                {/* 注文履歴リスト */}
                <Flex
                    direction="column"
                    w="full"
                >
                    <Box
                        w="full"
                        maxW="2xl"
                        mx="auto"
                    >
                        <Show
                            when={orders().length > 0}
                            fallback={
                                <Box color="fg.muted">
                                    注文履歴はありません。
                                </Box>
                            }
                        >
                            <VStack gap="2" alignItems="stretch">
                                <For each={orders()}>
                                    {(order) => (
                                        <OrderPanel order={order} />
                                    )}
                                </For>
                            </VStack>
                        </Show>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
}
