import { Box, Flex } from "styled-system/jsx";
import { A } from "@solidjs/router";
import { styled } from "styled-system/jsx";
import { ChevronLeft } from "lucide-solid";
import { SignupForm } from "~/components/common/account/SignupForm";

const StyledLink = styled(A);

export default function SignupPage() {
    const pageTitle = "新規登録";

    return (
        <Flex w="full" px="4">
            <Box w="full">
                {/* 戻るリンク */}
                <Box w="fit-content" mb="4">
                    <StyledLink
                        href="/"
                        display="flex"
                        alignItems="center"
                        gap="2"
                        color="fg.subtle"
                        _hover={{ color: "fg.muted" }}
                        textDecoration="none"
                    >
                        <ChevronLeft size={16} />
                        <Box as="span" fontSize="sm">
                            TOPに戻る
                        </Box>
                    </StyledLink>
                </Box>

                {/* ページタイトル */}
                <Box
                    w="full"
                    maxW="sm"
                    mx="auto"
                >
                    <Box
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="medium"
                        textAlign="start"
                    >
                        {pageTitle}
                    </Box>
                </Box>
                <SignupForm
                    cancelLink="/login"
                />
            </Box>
        </Flex>
    );
}
