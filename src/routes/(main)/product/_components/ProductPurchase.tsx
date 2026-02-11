/* ProductPurchase コンポーネントの実装 */
import { createSignal, createMemo, For, Show } from "solid-js";
import { createListCollection } from "@ark-ui/solid";
import { Box, Flex, VStack, HStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Select from "~/components/ui/select";
import { SelectCalendar } from "~/components/common/SelectCalendar";
import type { Product, ProductType } from "~/types";
import { AddToCart } from "./AddToCart";

interface ProductPurchaseProps {
    product: Product;
    productType?: ProductType;
}

export const ProductPurchase = (props: ProductPurchaseProps) => {
    const productType = () => props.productType ?? 'withShell';

    // 数量の選択肢 (1-10)
    const quantities = Array.from({ length: 10 }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
    }));

    const collection = createListCollection({ items: quantities });
    const [selectedQuantity, setSelectedQuantity] = createSignal<string[]>(["1"]);
    const [showAddedToCartModal, setShowAddedToCartModal] = createSignal(false);

    // 商品タイプに基づいた文言の導出
    const priceUnit = createMemo(() => {
        const type = productType();
        if (type === 'withShell' || type === 'noImage') return '1kgあたり';
        if (type === 'noShell') return '1パック(500g)あたり';
        return '';
    });

    const quantityLabel = createMemo(() => {
        const type = productType();
        if (type === 'withShell' || type === 'noImage') return '数量 (kg)';
        if (type === 'noShell') return '数量 (パック)';
        return '数量';
    });

    const quantitySuffix = createMemo(() => {
        const type = productType();
        if (type === 'withShell' || type === 'noImage') return 'kg';
        if (type === 'noShell') return 'パック';
        return '';
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
                        <Box
                            as="span"
                            fontSize={{ base: "base", md: "lg" }}
                        >
                            円
                        </Box>
                        <Box
                            as="span"
                            fontSize={{ base: "xs", md: "sm" }}
                            color="fg.muted"
                        >
                            税込
                        </Box>
                    </HStack>
                    <Box fontSize="sm">
                        在庫：
                        <Show
                            when={props.product.inStock}
                            fallback={
                                <Box
                                    as="span"
                                    fontWeight="semibold"
                                    color="red.8"
                                >
                                    在庫なし
                                </Box>
                            }
                        >
                            <Box
                                as="span"
                                fontWeight="bold"
                                fontSize="md"
                                color="green.10"
                            >
                                ◯
                            </Box>
                        </Show>
                    </Box>
                </Box>

                {/* 配送・カレンダーセクション */}
                <Box
                    mb="4"
                    gap="2"
                    fontSize="sm"
                    color="fg.muted"
                    textAlign="left"
                >
                    <SelectCalendar />
                    <Box mt="2">
                        お届け予定日：
                        <Box as="span" color="fg.default">
                            通常2〜6日後にお届け
                        </Box>
                    </Box>
                    <Box fontSize="xs" lineHeight="1.6">
                        ※ 出荷不可日、一部離島は除く
                    </Box>
                    <Box fontSize="xs" lineHeight="1.6">
                        ※ 出荷は支払い確認後となります
                    </Box>
                </Box>

                {/* 数量選択セクション */}
                <Box mb="6" w="fit-content">
                    <HStack justify="start">
                        <Select.Root
                            name="quantity"
                            positioning={{ gutter: 4 }}
                            value={selectedQuantity()}
                            onValueChange={(details) => setSelectedQuantity(details.value)}
                            collection={collection}
                        >
                            <Select.Label srOnly>
                                {quantityLabel()}
                            </Select.Label>
                            <Select.Control>
                                <Select.Trigger w="20" cursor="pointer">
                                    <Select.ValueText placeholder="1" />
                                    <Select.Indicator />
                                </Select.Trigger>
                            </Select.Control>
                            <Select.Positioner>
                                <Select.Content>
                                    <Select.ItemGroup>
                                        <Select.ItemGroupLabel>{quantityLabel()}</Select.ItemGroupLabel>
                                        <For each={collection.items}>
                                            {(item) => (
                                                <Select.Item item={item} cursor="pointer">
                                                    <Select.ItemText>{item.label}</Select.ItemText>
                                                    <Select.ItemIndicator>✓</Select.ItemIndicator>
                                                </Select.Item>
                                            )}
                                        </For>
                                    </Select.ItemGroup>
                                </Select.Content>
                            </Select.Positioner>
                            <Select.HiddenSelect />
                        </Select.Root>
                        <Box fontSize="sm" color="fg.muted" whiteSpace="nowrap">
                            {quantitySuffix()}
                        </Box>
                    </HStack>
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
