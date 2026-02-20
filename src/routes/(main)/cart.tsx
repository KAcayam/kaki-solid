/* src/routes/(main)/cart.tsx */
import { ParentProps } from "solid-js";
import { A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, styled } from "styled-system/jsx";
import { Stepper } from "~/components/common/Stepper";
import { useCartContext } from "~/context/cart-context";

const StyledLink = styled(A);

export default function CartFlowLayout(props: ParentProps) {
    const context = useCartContext();

    return (
        <Flex>
            <Box w="full" px="4">
                {/* 戻るリンク */}
                <Box w="fit-content">
                    <StyledLink
                        href={context?.config().backTo ?? "/"}
                        display="flex"
                        alignItems="center"
                        gap="1"
                        mb="4"
                        color="fg.subtle"
                        fontSize={{ base: "xs", md: "sm" }}
                        _hover={{ color: "fg.muted" }}
                    >
                        <ChevronLeft size={16} />
                        {context?.config().backLabel}
                    </StyledLink>
                </Box>

                {/* ステッパー */}
                <Box mx="auto" mb="4" w="full" maxW="2xl">
                    <Stepper currentStepIndex={context?.config().step ?? 0} />
                </Box>

                {/* タイトル */}
                <Box
                    as="h1"
                    display="flex"
                    alignItems="start"
                    my="2"
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="medium"
                >
                    {context?.config().title}
                </Box>

                {/* ページコンテンツ */}
                {props.children}
            </Box>
        </Flex>
    );
}
