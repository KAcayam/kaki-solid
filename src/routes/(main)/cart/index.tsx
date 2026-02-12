import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, Grid, styled } from "styled-system/jsx";
import cartInitialData from "~/data/cart-initial.json";
import { CartItem } from "~/types";
import { Stepper } from "../../../components/common/Stepper";
import { CartItemCard } from "./_components/CartItemCard";
import { CartSummary } from "./_components/CartSummary";

const StyledLink = styled(A);

export default function CartPage() {
    const pageTitle = "カート";

    // カート内のサンプルデータをdata/cart-initial.jsonから読み込む
    const [items, setItems] = createSignal<CartItem[]>(cartInitialData as CartItem[]);

    // 操作ロジック
    const removeItem = (id: string) => {
        setItems(items().filter((i) => i.id !== id));
    };

    const changeQty = (id: string, qty: number) => {
        setItems(items().map((it) => (it.id === id ? { ...it, quantity: qty } : it)));
    };

    return (
        <Flex>
            <Box
                w="full"
                px="4"
            >
                {/* TOPに戻るリンク */}
                <Box w="fit-content">
                    <StyledLink
                        href="/"
                        display="flex"
                        alignItems="center"
                        gap="1"
                        mb="4"
                        color="fg.subtle"
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{ color: "fg.muted" }}
                    >
                        <ChevronLeft size={16} />
                        TOPに戻る
                    </StyledLink>
                </Box>

                {/* ステッパー */}
                <Box
                    mx="auto"
                    mb="4"
                    w="full"
                    maxW="2xl"
                >
                    <Stepper />
                </Box>

                {/* ページタイトル */}
                <Box
                    as="h1"
                    display="flex"
                    alignItems="start"
                    my="2"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="medium"
                >
                    {pageTitle}
                </Box>

                <Grid
                    columns={{ base: 1, lg: 2 }}
                    gap="4"
                    alignItems="start"
                >
                    {/* カート内商品リスト */}
                    <Box as="section">
                        <For each={items()}>
                            {(item) => (
                                <Box mb="4">
                                    <CartItemCard
                                        item={item}
                                        onRemove={removeItem}
                                        onChangeQuantity={changeQty}
                                    />
                                </Box>
                            )}
                        </For>
                    </Box>

                    {/* 合計金額・購入手続き */}
                    <CartSummary items={items()} />
                </Grid>
            </Box>
        </Flex>
    );
}
