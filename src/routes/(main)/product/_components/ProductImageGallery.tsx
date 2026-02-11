import { createSignal, createEffect, For, Switch, Match } from "solid-js";
import { Box, HStack, styled } from "styled-system/jsx";

const StyledImg = styled("img");
const StyledButton = styled("button");

interface ProductImageGalleryProps {
    images?: string[];
}

export const ProductImageGallery = (props: ProductImageGalleryProps) => {
    const [selectedIndex, setSelectedIndex] = createSignal(0);

    // 画像配列の正規化（nullや空配列への対応）
    const effectiveImages = () => props.images ?? [];

    // メイン画像のパス取得
    const mainImage = () => effectiveImages()[selectedIndex()] ?? null;

    // images プロパティが変更された際にインデックスをリセット
    createEffect(() => {
        const imgs = effectiveImages();
        if (imgs.length === 0 || selectedIndex() >= imgs.length) {
            setSelectedIndex(0);
        }
    });

    return (
        <Box
            display="flex"
            flexDirection="column"
        >
            {/* メイン画像表示エリア */}
            <Box
                border="1px solid"
                borderColor="gray.6"
                borderRadius="xl"
                overflow="hidden"
                bg="bg.default"
                mx="auto"
            >
                <Switch>
                    <Match when={mainImage()}>
                        <StyledImg
                            src={mainImage()!}
                            alt="商品写真"
                            h={{ base: "72", md: "96" }}
                            w="auto"
                            objectFit="contain"
                        />
                    </Match>
                    <Match when={true}>
                        <Box
                            h={{ base: "72", md: "96" }}
                            w={{ base: "full", md: "96" }}
                            bg="gray.4"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            color="fg.subtle"
                        >
                            画像なし
                        </Box>
                    </Match>
                </Switch>
            </Box>

            {/* サムネイルリスト */}
            <HStack mt="4" gap="3" flexWrap="wrap" justify="center">
                <For each={effectiveImages()}>
                    {(image, i) => (
                        <StyledButton
                            type="button"
                            onClick={() => setSelectedIndex(i())}
                            overflow="hidden"
                            borderRadius="lg"
                            border="2px solid"
                            borderColor={selectedIndex() === i() ? "gray.10" : "gray.5"}
                            transition="all"
                            _hover={{ borderColor: "gray.8" }}
                            cursor="pointer"
                        >
                            <StyledImg
                                src={image}
                                alt={`サムネイル ${i() + 1}`}
                                w="16"
                                h="16"
                                objectFit="cover"
                            />
                        </StyledButton>
                    )}
                </For>
            </HStack>
        </Box>
    );
};
