import { useNavigate } from "@solidjs/router";
import { Show, Switch, Match } from "solid-js";
import { CircleQuestionMark } from "lucide-solid";
import { Box, VStack, AspectRatio, styled } from "styled-system/jsx";
import { Product } from "~/types";

interface ProductCardProps {
    product: Product;
}

// 型安全に HTML 属性を扱うため
const StyledButton = styled("button");
const StyledImg = styled("img");

export const ProductCard = (props: ProductCardProps) => {
    const navigate = useNavigate();

    // ログインが必要かどうかの判定
    const showLoginRequired = () => props.product.isLoggedInRequired;

    // 遷移先のURLを生成
    const detailPageHref = () =>
        props.product.type ? `/product/${props.product.type}?id=${props.product.id}` : "#";

    const handleNavigate = () => {
        if (!showLoginRequired() && props.product.type) {
            navigate(detailPageHref());
        }
    };

    return (
        <StyledButton
            type="button"
            onClick={handleNavigate}
            w="full"
            display="flex"
            flexDirection="column"
            textAlign="left"
            cursor={showLoginRequired() ? "default" : "pointer"}
        >
            {/* 商品写真エリア (4:3) */}
            <AspectRatio
                ratio={4 / 3}
                w="full"
                mb="2"
                borderRadius="xl"
                overflow="hidden"
                border="1px solid"
                borderColor="gray.6"
            >
                <Switch>
                    {/* ログインが必要な場合 */}
                    <Match when={showLoginRequired()}>
                        <VStack
                            justify="center"
                            textAlign="center"
                            color="gray.8"
                        >
                            <CircleQuestionMark size={48} />
                            <Box fontSize={{ base: "xs", md: "sm" }}>ログインが必要です</Box>
                        </VStack>
                    </Match>

                    {/* 画像がある場合 */}
                    <Match when={props.product.image}>
                        <StyledImg
                            src={props.product.image ?? undefined}
                            alt={props.product.name}
                            objectFit="contain!"
                            w="full"
                            h="full"
                        />
                    </Match>

                    {/* 画像なしの場合 */}
                    <Match when={true}>
                        <Box
                            color="fg.subtle"
                            fontSize={{ base: "sm", md: "md" }}
                        >
                            画像なし
                        </Box>
                    </Match>
                </Switch>
            </AspectRatio>

            {/* 商品名と価格表示エリア */}
            <VStack w="full" gap="0">
                <Show
                    when={!showLoginRequired()}
                    fallback={
                        <Box fontSize={{ base: "xs", md: "sm" }} color="fg.muted">
                            ログインすると商品が閲覧できます
                        </Box>
                    }
                >
                    <Box fontSize={{ base: "xs", md: "md" }} fontWeight="medium">
                        {props.product.name}
                    </Box>
                    <Show when={props.product.price !== undefined}>
                        <Box fontSize={{ base: "sm", md: "md" }}>
                            {props.product.price?.toLocaleString()}
                            <Box as="span" fontSize={{ base: "xs", md: "sm" }} ml="0.5">
                                円~
                            </Box>
                        </Box>
                    </Show>
                </Show>
            </VStack>
        </StyledButton>
    );
};
