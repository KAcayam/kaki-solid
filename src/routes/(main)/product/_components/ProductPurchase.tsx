import { createSignal, createMemo, Show } from "solid-js";
import { Box, VStack, HStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { ShippingCalendar } from "~/components/common/ShippingCalendar";
import type { Product } from "~/types";
import { AddToCart } from "./AddToCart";
import { QuantitySelect } from "~/components/common/QuantitySelect";

interface ProductPurchaseProps {
    product: Product;
}

export const ProductPurchase = (props: ProductPurchaseProps) => {
    const [selectedQuantity, setSelectedQuantity] = createSignal<string[]>(["1"]);
    const [showAddedToCartModal, setShowAddedToCartModal] = createSignal(false);

    const priceUnit = createMemo(() => {
        return props.product.category === 'withShell' ? '1kgあたり' : '1パック(500g)あたり';
    });

    const quantityLabel = createMemo(() => {
        return props.product.category === 'withShell' ? '数量 (kg)' : '数量 (パック)';
    });

    const quantitySuffix = createMemo(() => {
        return props.product.category === 'withShell' ? 'kg' : 'パック';
    });

    const handleAddToCart = () => {
        console.log(`カートに追加: ${props.product.name}, 数量: ${selectedQuantity()[0]}`);
        setShowAddedToCartModal(true);
    };

    return (
        <VStack>
            <Box
                w="full"
                maxW={{ base: "sm", md: "xs" }}
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.6"
                p="4"
            >
                {/* 価格表示セクション */}
                <Box mb="4" textAlign="left">
                    <Box fontSize="sm" color="fg.muted">
                        {priceUnit()}
                    </Box>
                    <HStack gap="2" mb="1">
                        <Box as="span" fontSize="2xl" fontWeight="medium">
                            {props.product.price?.toLocaleString()}
                        </Box>
                        <Box as="span" fontSize={{ base: "base", md: "lg" }}>円</Box>
                        <Box as="span" fontSize={{ base: "xs", md: "sm" }} color="fg.muted">税込</Box>
                    </HStack>
                    <Box fontSize="sm">
                        在庫：
                        <Show
                            when={props.product.inStock}
                            fallback={<Box as="span" fontWeight="semibold" color="red.8">在庫なし</Box>}
                        >
                            <Box as="span" fontWeight="bold" fontSize="md" color="green.10">◯</Box>
                        </Show>
                    </Box>
                </Box>

                {/* 配送・カレンダーセクション */}
                <Box mb="4" fontSize="sm" color="fg.muted" textAlign="left">
                    <ShippingCalendar />
                    <Box mt="2">
                        お届け予定日：
                        <Box as="span" color="fg.default">通常2〜6日後にお届け</Box>
                    </Box>
                    <Box fontSize="xs" lineHeight="1.6">※ 出荷不可日、一部離島は除く</Box>
                    <Box fontSize="xs" lineHeight="1.6">※ 出荷は支払い確認後となります</Box>
                </Box>

                {/* 数量選択セクション */}
                <Box mb="6" w="fit-content">
                    <QuantitySelect
                        name="quantity"
                        label={quantityLabel()}
                        value={selectedQuantity()}
                        onValueChange={setSelectedQuantity}
                        suffix={quantitySuffix()}
                    />
                </Box>

                {/* アクションボタン */}
                <Box>
                    <Button
                        type="button"
                        w="full"
                        colorPalette="blue"
                        borderRadius="lg"
                        onClick={handleAddToCart}
                        disabled={!props.product.inStock}
                        cursor="pointer"
                    >
                        {props.product.inStock ? 'カートに入れる' : '在庫切れ'}
                    </Button>
                </Box>

                {/* カート追加完了モーダル */}
                <AddToCart
                    open={showAddedToCartModal()}
                    onOpenChange={setShowAddedToCartModal}
                    onProceedToCheckout={() => setShowAddedToCartModal(false)}
                    onContinueShopping={() => setShowAddedToCartModal(false)}
                />
            </Box>
        </VStack>
    );
};
