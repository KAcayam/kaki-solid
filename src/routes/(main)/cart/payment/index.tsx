import { createSignal, createMemo, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Grid, VStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { useCartContext } from "~/context/cart-context";
import cartInitialData from "~/data/cart-initial.json";
import type { CartItem } from "~/types";
import { OrderDetails } from "./_components/OrderDetails";
import { PaymentCard } from "./_components/PaymentCard";

export default function PaymentPage() {
    const navigate = useNavigate();
    const context = useCartContext();

    // レイアウト設定の宣言
    onMount(() => {
        context?.setConfig({
            step: 3,
            title: "お支払い方法",
            backTo: "/cart/shipping-information",
            backLabel: "前に戻る"
        });
    });

    // 2. カートデタの取得と計算
    const [items] = createSignal<CartItem[]>(cartInitialData as CartItem[]);

    const subtotal = createMemo(() =>
        items().reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
    const shippingCost = 880;
    const total = () => subtotal() + shippingCost;

    return (
        <Grid
            columns={{ base: 1, md: 2 }}
            gap="4"
            alignItems="start"
            maxW="3xl"
            mx="auto"
            w="full"
        >
            {/* 注文内容詳細 */}
            <Box w="full" maxW="sm" mx="auto">
                <OrderDetails
                    cartItems={items()}
                    subtotal={subtotal()}
                    shippingCost={shippingCost}
                    total={total()}
                />
            </Box>

            {/* 支払い方法選択 */}
            <Box w="full" maxW="sm" mx="auto">
                <PaymentCard />

                <VStack pt="4" w="full" maxW="72" mx="auto">
                    <Button
                        variant="outline"
                        w="full"
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={() => navigate("/cart")}
                    >
                        カートに戻る
                    </Button>
                </VStack>
            </Box>
        </Grid>
    );
}
