import { createSignal, createMemo, Show } from "solid-js";
import { useSearchParams, useNavigate, A } from "@solidjs/router";
import { ChevronLeft, CircleX } from "lucide-solid";
import { Box, Flex, Grid, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { OrderStatusPanel } from "./_components/OrderStatusPanel"
import { OrderItems } from "./_components/OrderItems";
import { OrderPayment } from "./_components/OrderPayment";
import { ConfirmOrderCancelModal } from "./_components/ConfirmOrderCancelModal";
import productsData from "~/data/products.json";
import ordersData from "~/data/orders.json";
import type { Order, OrderStatus, OrderProduct, ProductCategory } from "~/types";

const StyledLink = styled(A);

export default function OrderDetailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.orderId;
    const pageTitle = "注文履歴詳細";

    const productMap = new Map(productsData.map((p) => [p.id, p]));

    // 該当する注文データを取得して整形
    const currentOrder = createMemo<Order | undefined>(() => {
        const order = ordersData.find((o) => o.id === orderId);
        if (!order) return undefined;

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
                } as OrderProduct;
            })
        };
    });

    // キャンセルボタンを表示するステータスの判定
    const showOrderCancelButton = () => {
        const status = currentOrder()?.status;
        return status === "注文受付" || status === "入金待ち" || status === "発送準備中";
    };

    const [showCancelModal, setShowCancelModal] = createSignal(false);

    const handleConfirmCancel = () => {
        setShowCancelModal(false);
        navigate("/orders");
    };

    return (
        <Flex>
            <Box w="full" px="4">
                {/* 一覧に戻るリンク */}
                <Box w="fit-content" mb="4">
                    <StyledLink
                        href="/orders"
                        display="flex"
                        alignItems="center"
                        gap="1"
                        color="fg.subtle"
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{ color: "fg.muted" }}
                    >
                        <ChevronLeft size={16} />
                        一覧に戻る
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

                <Show
                    when={currentOrder()}
                    fallback={
                        <Box color="fg.muted">
                            注文が見つかりませんでした。
                        </Box>
                    }
                >
                    {(order) => (
                        <Box w="full" maxW="2xl" mx="auto">
                            {/* キャンセルボタンエリア */}
                            <Show when={showOrderCancelButton()}>
                                <Flex justify="flex-end" mb="2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        fontSize="xs"
                                        borderRadius="lg"
                                        onClick={() => setShowCancelModal(true)}
                                    >
                                        <Box color="red.10">
                                            <CircleX />
                                        </Box>
                                        注文キャンセル
                                    </Button>
                                </Flex>
                            </Show>

                            {/* ステータスパネル */}
                            <OrderStatusPanel order={order()} />

                            {/* 詳細グリッド */}
                            <Grid
                                columns={{ base: 1, md: 2 }}
                            >
                                <Box>
                                    <OrderItems order={order()} />
                                </Box>
                                <Box>
                                    <OrderPayment
                                        subtotal={order().subtotal}
                                        shippingCost={order().shippingCost}
                                        total={order().totalAmount}
                                    />
                                </Box>
                            </Grid>

                            <ConfirmOrderCancelModal
                                open={showCancelModal()}
                                targetName={order().id}
                                onConfirm={handleConfirmCancel}
                                onCancel={() => setShowCancelModal(false)}
                                onOpenChange={setShowCancelModal}
                            />
                        </Box>
                    )}
                </Show>
            </Box>
        </Flex>
    );
}
