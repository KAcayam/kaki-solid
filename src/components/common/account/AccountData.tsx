import { Box, Flex, VStack } from "styled-system/jsx";
import type { User } from "~/types";

interface AccountDataProps {
    user: User;
}

export const AccountData = (props: AccountDataProps) => {
    return (
        <Box w="full" maxW="sm">
            <VStack
                gap="4"
                p="8"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.6"
                bg="bg.default"
            >
                {/* 姓名セクション */}
                <Flex
                    gap="8"
                    alignItems="flex-start"
                    w="full"
                >
                    <Box
                        flex="1"
                        textAlign="start"
                    >
                        <Box fontSize="sm" color="fg.muted">
                            姓
                        </Box>
                        <Box wordBreak="break-all">
                            {props.user.lastName}
                        </Box>
                    </Box>
                    <Box
                        flex="1"
                        textAlign="start"
                    >
                        <Box fontSize="sm" color="fg.muted">
                            名
                        </Box>
                        <Box wordBreak="break-all">
                            {props.user.firstName}
                        </Box>
                    </Box>
                </Flex>

                {/* フリガナセクション */}
                <Flex
                    gap="8"
                    alignItems="flex-start"
                    w="full"
                >
                    <Box
                        flex="1"
                        textAlign="start"
                    >
                        <Box fontSize="sm" color="fg.muted">姓(カナ)</Box>
                        <Box wordBreak="break-all">{props.user.lastNameKana}</Box>
                    </Box>
                    <Box
                        flex="1"
                        textAlign="start"
                    >
                        <Box fontSize="sm" color="fg.muted">
                            名(カナ)
                        </Box>
                        <Box wordBreak="break-all">{
                            props.user.firstNameKana}
                        </Box>
                    </Box>
                </Flex>

                {/* 基本情報項目 */}
                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        メールアドレス
                    </Box>
                    <Box wordBreak="break-all">
                        {props.user.email}
                    </Box>
                </Box>

                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        郵便番号
                    </Box>
                    <Box wordBreak="break-all">
                        {props.user.postalCode}
                    </Box>
                </Box>

                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        都道府県
                    </Box>
                    <Box wordBreak="break-all">
                        {props.user.prefecture}
                    </Box>
                </Box>

                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        住所１
                    </Box>
                    <Box wordBreak="break-all">
                        {props.user.address1}
                    </Box>
                </Box>

                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        住所２
                    </Box>
                    <Box wordBreak="break-all">
                        {props.user.address2 || ""}
                    </Box>
                </Box>

                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        電話番号
                    </Box>
                    <Box wordBreak="break-all">
                        {props.user.phoneNumber}
                    </Box>
                </Box>

                <Box
                    w="full"
                    textAlign="start"
                >
                    <Box fontSize="sm" color="fg.muted">
                        キャンペーンメール
                    </Box>
                    <Box>
                        {props.user.receiveCampaignEmails ? '受信する' : '受信しない'}
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
};