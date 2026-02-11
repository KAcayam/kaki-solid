/* 商品詳細ページのコンポーネント組み込み */
import { useSearchParams, A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, Grid, VStack, styled } from "styled-system/jsx";
import productsData from "~/data/products.json";
import { ProductImageGallery } from "./_components/ProductImageGallery";
import { ProductPurchase } from "./_components/ProductPurchase";
import type { Product, ProductType } from "~/types";

const StyledLink = styled(A);

// jsonの該当商品の検索結果の型定義を整理
type ProductWithDetails = Product & { detailImages: string[] };

export default function ProductDetailPage() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.id;

    // JSONから該当商品を検索
    // JSONのキー名に合わせ、型の補完を行う
    const product = productsData.find((p) => p.id === productId) as ProductWithDetails | undefined;

    // フォールバック用データ
    const fallbackProduct: ProductWithDetails = {
        id: "dummy",
        name: "商品が見つかりません",
        price: 0,
        image: null,
        detailImages: [],
        type: "noImage",
        isLoggedInRequired: false,
        description: "お探しの商品は見つかりませんでした。"
    };

    const displayProduct = product || fallbackProduct;

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
                        color="fg.subtle"
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{ color: "fg.muted" }}
                        class="notranslate"
                    >
                        <ChevronLeft size={16} />
                        TOPに戻る
                    </StyledLink>
                </Box>

                {/* 商品名 */}
                <Box display="flex" alignItems="start" my="2">
                    <Box fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
                        {displayProduct.name}
                    </Box>
                </Box>

                {/* メインコンテンツグリッド */}
                <Grid columns={{ base: 1, md: 2 }} gap="4" justifyItems="start">

                    {/* カラム1: 画像・注釈 */}
                    <Box
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.6"
                        p="4"
                        bg="bg.default"
                        w="full"
                    >
                        <ProductImageGallery images={displayProduct.detailImages} />

                        <Box
                            mt="6"
                            color="fg.muted"
                            textAlign="left"
                            fontSize={{ base: "xs", md: "sm" }}
                        >
                            <Box as="p">{displayProduct.description}</Box>
                            <Box as="p">・その他注意書きがあるときもこちらに記載する</Box>
                        </Box>
                    </Box>

                    {/* カラム2: 購入情報パネル */}
                    <Box w={{ base: "full", md: "96" }}>
                        <ProductPurchase
                            product={displayProduct}
                            productType={displayProduct.type as ProductType}
                        />
                    </Box>
                </Grid>
            </Box>
        </Flex>
    );
}
