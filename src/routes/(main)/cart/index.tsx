import { For, onMount } from "solid-js";
import { Box, Grid } from "styled-system/jsx";
import { CartItemCard } from "./_components/CartItemCard";
import { CartSummary } from "./_components/CartSummary";
import { useCartContext } from "~/context/cart-context";

export default function CartPage() {
    const pageTitle = "カート";
    const context = useCartContext();

    // 自身の情報をレイアウトへ提供
    onMount(() => {
        context?.setConfig({
            step: 0,
            title: pageTitle,
            backTo: "/",
            backLabel: "TOPに戻る"
        });
    });

    return (
        <Grid
            columns={{ base: 1, lg: 2 }}
            gap="4"
            w="full"
            maxW="4xl"
            mx="auto"
        >
            <Box as="section">
                <For each={context?.items() ?? []}>
                    {(item) => (
                        <Box mb="4">
                            <CartItemCard
                                item={item}
                                onRemove={(id) => context?.removeItem(id)}
                                onChangeQuantity={(id, qty) => context?.changeQty(id, qty)}
                            />
                        </Box>
                    )}
                </For>
            </Box>

            <CartSummary items={context?.items() ?? []} />
        </Grid>
    );
}
