import { Box, Flex } from "styled-system/jsx";
import { A } from "@solidjs/router";
import { styled } from "styled-system/jsx";
import { ChevronLeft } from "lucide-solid";
import { LoginForm } from "~/components/common/account/LoginForm";

const StyledLink = styled(A);

export default function LoginPage() {
    const pageTitle = "ログイン";

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
                <LoginForm
                    signupLink="/signup"
                />
            </Box>
        </Flex>
    );
}
