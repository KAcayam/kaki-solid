import { Send } from "lucide-solid";
import { Box, VStack, HStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import type { ConfirmSendEmailProps } from "~/types";

export const ConfirmSendEmail = (props: ConfirmSendEmailProps) => {
    return (
        <Box
            w="full"
            maxW="md"
            mx="auto"
        >
            {/* ヘッダーセクション */}
            <HStack gap="2" mt="6">
                <Box color="fg.muted">
                    <Send />
                </Box>
                <Box fontSize="sm" color="fg.muted">
                    下記の内容で送信しますか？
                </Box>
            </HStack>

            <Box
                my="4"
                borderTopWidth="1px"
                borderColor="border.default"
                w="full"
            />

            {/* 確認内容リスト */}
            <VStack
                gap="4"
                alignItems="stretch"
            >
                <Box>
                    <Box fontSize="sm" color="fg.muted">
                        メールアドレス
                    </Box>
                    <Box color="fg.default">
                        {props.email}
                    </Box>
                </Box>
                <Box>
                    <Box fontSize="sm" color="fg.muted">
                        件名
                    </Box>
                    <Box color="fg.default">
                        {props.subject}
                    </Box>
                </Box>
                <Box>
                    <Box fontSize="sm" color="fg.muted">
                        お問い合わせ内容
                    </Box>
                    <Box color="fg.default" whiteSpace="pre-wrap">
                        {props.message}
                    </Box>
                </Box>
            </VStack>

            <Box
                my="4"
                borderTopWidth="1px"
                borderColor="border.default"
                w="full"
            />

            {/* アクションボタン */}
            <VStack gap="4">
                <Button
                    w="72"
                    colorPalette="blue"
                    borderRadius="lg"
                    onClick={props.onSend}
                >
                    送信
                </Button>
                <Button
                    variant="outline"
                    w="72"
                    color="fg.muted"
                    borderRadius="lg"
                    onClick={props.onCancel}
                >
                    キャンセル
                </Button>
            </VStack>
        </Box>
    );
};
