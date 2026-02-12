/* CartItemCard コンポーネントの実装 */
import { createSignal, createMemo, createEffect, For } from "solid-js";
import { createListCollection } from "@ark-ui/solid";
import { Trash2 } from "lucide-solid";
import { Box, Flex, HStack, styled } from "styled-system/jsx";
import { IconButton } from "~/components/ui/icon-button";
import { CartItem } from "~/types";
import { QuantitySelect } from "~/components/common/QuantitySelect";
import { ConfirmDeleteModal } from "~/components/common/ConfirmDeleteModal";

const StyledImg = styled("img");

interface CartItemCardProps {
    item: CartItem;
    onRemove: (id: string) => void;
    onChangeQuantity: (id: string, quantity: number) => void;
}

export const CartItemCard = (props: CartItemCardProps) => {
    const [showDeleteModal, setShowDeleteModal] = createSignal(false);

    // 数量選択肢 (1-10)
    const quantities = Array.from({ length: 10 }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
    }));
    const collection = createListCollection({ items: quantities });

    // 内部状態と外部propsの同期
    const [selectedQuantity, setSelectedQuantity] = createSignal<string[]>([props.item.quantity.toString()]);
    createEffect(() => setSelectedQuantity([props.item.quantity.toString()]));

    const unitText = createMemo(() => {
        return props.item.category === 'withShell' ? 'kg' : 'パック';
    });

    return (
        <Flex
            gap="4"
            p="4"
            border="1px solid"
            borderColor="gray.6"
            borderRadius="xl"
            bg="bg.default"
        >
            {/* 商品写真 */}
            <Box
                display="flex"
                h="40"
                w="40"
                flexShrink="0"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.6"
            >
                {props.item.img ? (
                    <StyledImg
                        src={props.item.img}
                        alt={props.item.title}
                        maxH="full"
                        maxW="full"
                        objectFit="contain"
                    />
                ) : (
                    <Box
                        fontSize="sm"
                        color="fg.subtle"
                    >
                        画像なし
                    </Box>
                )}
            </Box>

            <Flex
                flex="1"
                flexDirection="column"
                justify="space-between"
            >
                <Box>
                    <Box
                        as="h2"
                        fontSize={{ base: "sm", md: "lg" }}
                        fontWeight="medium"
                        textAlign="left"
                    >
                        {props.item.title}
                    </Box>
                    <HStack
                        mt="2"
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="semibold"
                    >
                        {props.item.price.toLocaleString()}
                        <Box
                            as="span"
                            fontSize={{ base: "sm", md: "base" }}
                            fontWeight="normal"
                        >
                            円
                        </Box>
                        <Box
                            as="span"
                            fontSize={{ base: "xs", md: "sm" }}
                            fontWeight="normal"
                            color="fg.subtle"
                        >
                            税込
                        </Box>
                    </HStack>
                </Box>

                <Flex
                    flexDirection={{ base: "column", md: "row" }}
                >
                    <QuantitySelect
                        name={`quantity-${props.item.id}`}
                        label="数量変更"
                        value={selectedQuantity()}
                        onValueChange={(val) => props.onChangeQuantity(props.item.id, Number(val[0]))}
                        suffix={unitText()}
                    />

                    <Box ml="auto">
                        <IconButton
                            variant="plain"
                            onClick={() => setShowDeleteModal(true)}
                            aria-label="削除"
                            colorPalette="red"
                        >
                            <Trash2 />
                        </IconButton>
                    </Box>
                </Flex>
            </Flex>

            {/* 削除確認モーダル */}
            <ConfirmDeleteModal
                open={showDeleteModal()}
                targetName={props.item.title}
                onOpenChange={setShowDeleteModal}
                onConfirm={() => { props.onRemove(props.item.id); setShowDeleteModal(false); }}
                onCancel={() => setShowDeleteModal(false)}
            />
        </Flex>
    );
};
