import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, Grid, styled } from "styled-system/jsx";
import productsData from "~/data/products.json";
import { CartItem } from "~/types";
import { Stepper } from "./_components/Stepper";

const StyledLink = styled(A);

export default function CartPage() {
    const pageTitle = "カート";

    // カート内の商品状態管理
    // 初期データは Svelte 版のロジックに基づき JSON から構築
    const [items, setItems] = createSignal<CartItem[]>([
        {
            id: 'oyster-001',
            title: productsData.find((p) => p.id === 'oyster-001')?.name || '不明な商品',
            variant: productsData.find((p) => p.id === 'oyster-001')?.type === 'withShell' ? 'kg' : 'パック',
            price: productsData.find((p) => p.id === 'oyster-001')?.price || 0,
            quantity: 1,
            img: productsData.find((p) => p.id === 'oyster-001')?.image || null,
            type: (productsData.find((p) => p.id === 'oyster-001')?.type || 'noImage') as CartItem['type']
        },
        {
            id: 'oyster-005',
            title: productsData.find((p) => p.id === 'oyster-005')?.name || '不明な商品',
            variant: productsData.find((p) => p.id === 'oyster-005')?.type === 'withShell' ? 'kg' : 'パック',
            price: productsData.find((p) => p.id === 'oyster-005')?.price || 0,
            quantity: 4,
            img: productsData.find((p) => p.id === 'oyster-005')?.image || null,
            type: (productsData.find((p) => p.id === 'oyster-005')?.type || 'noImage') as CartItem['type']
        }
    ]);

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

                {/* ステッパー（プレースホルダー） */}
                <Box
                    mx="auto"
                    mb="4"
                    w="full"
                    maxW="2xl"
                >
                    <Stepper />
                </Box>

                {/* ページタイトル */}
                <Box mb={{ base: "2", md: "4" }}>
                    <Box fontSize={{ base: "base", md: "xl" }} fontWeight="medium">
                        {pageTitle}
                    </Box>
                </Box>

                <Grid columns={{ base: 1, lg: 2 }} gap="4" alignItems="start">
                    {/* 左カラム: カート内商品リスト */}
                    <Box as="section">
                        <For each={items()}>
                            {(item) => (
                                <Box mb="4" p="4" border="1px dashed" borderColor="border.disabled">
                                    [CartItemCard: {item.title}]
                                    {/* removeItem(item.id) や changeQty(item.id, n) を渡す想定 */}
                                </Box>
                            )}
                        </For>
                    </Box>

                    {/* 右カラム: 合計金額・購入手続き（プレースホルダー） */}
                    <Box as="aside" p="4" border="1px dashed" borderColor="border.disabled">
                        [CartSummary: {items().length} items]
                    </Box>
                </Grid>
            </Box>
        </Flex>
    );
}
