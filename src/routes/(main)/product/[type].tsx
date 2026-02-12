/* ProductDetailPage.tsx の論理エラー修正版（レイアウトは提示通りに維持） */
import { useSearchParams, A } from "@solidjs/router";
import { Show } from "solid-js";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, Grid, styled } from "styled-system/jsx";
import productsData from "~/data/products.json";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ProductPurchase } from "./_components/ProductPurchase";
import type { Product } from "~/types";

const StyledLink = styled(A);

// jsonの該当商品の検索結果の型定義を整理
type ProductWithDetails = Product & { detailImages: string[] };

export default function ProductDetailPage() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.id;

    const product = productsData.find((p) => p.id === productId) as ProductWithDetails | undefined;

    return (
        <Show when={product}>
            {(p) => (
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

                        {/* 商品名 */}
                        <Box display="flex" alignItems="start">
                            <Box
                                fontSize={{ base: "lg", md: "xl" }}
                                fontWeight="medium"
                            >
                                {p().name}
                            </Box>
                        </Box>

                        {/* メインコンテンツグリッド */}
                        <Grid
                            columns={{ base: 1, md: 2 }}
                            gap="4"
                            justifyItems="start"
                        >
                            {/* 画像・注釈 */}
                            <Box
                                borderRadius="xl"
                                border="1px solid"
                                borderColor="gray.6"
                                p="4"
                                bg="bg.default"
                                w="full"
                            >
                                <ProductImageGallery images={p().detailImages} />

                                <Box
                                    mt="6"
                                    color="fg.muted"
                                    textAlign="left"
                                    fontSize={{ base: "xs", md: "sm" }}
                                >
                                    <Box as="p">
                                        {p().description}
                                    </Box>
                                    <Box as="p">
                                        ・その他注意書きがあるときもこちらに記載する
                                    </Box>
                                </Box>
                            </Box>

                            {/* 購入情報パネル */}
                            <Box w={{ base: "full", md: "96" }}>
                                <ProductPurchase product={p()} />
                            </Box>
                        </Grid>
                    </Box>
                </Flex>
            )}
        </Show>
    );
}
