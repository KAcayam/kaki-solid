import { Box, VStack, styled } from "styled-system/jsx";

export const Commerce = () => {
    return (
        <Box w="full" maxW="2xl" mx="auto">
            {/* ヘッダーセクション */}
            <Box mb="6">
                <Box as="h1" fontSize="lg" fontWeight="semibold" color="fg.default">
                    特定商取引法に基づく表記
                </Box>
                <Box fontSize="sm" color="fg.muted" mt="1">
                    本サイトでの取引に関する重要事項を記載しております。
                </Box>
            </Box>

            {/* コンテンツセクション */}
            <VStack gap="6" alignItems="stretch" fontSize="sm" lineHeight="relaxed" color="fg.default">
                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">販売業者</Box>
                    <Box as="p">株式会社オイスターカンパニー</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">代表者</Box>
                    <Box as="p">牡蠣太郎</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">所在地</Box>
                    <Box as="p">東京都東京2-2-2</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">電話番号</Box>
                    <Box as="p">050-2233-4455</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">メールアドレス</Box>
                    <Box as="p">kaki@oystar.kaki</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">お支払い方法と時期</Box>
                    <styled.ul mt="1" listStyleType="disc" listStylePosition="inside" display="flex" flexDirection="column" gap="1">
                        <Box as="li">クレジットカード：前払い（ご注文時にカード情報をご登録ください）</Box>
                        <Box as="li">銀行振込：前払い（配送希望日の3日前までに振込確認）</Box>
                        <Box as="li">コンビニ決済：前払い（配送希望日の3日前まで／指定なしの場合は注文から3日後23:59まで）</Box>
                    </styled.ul>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">商品代金以外の必要料金</Box>
                    <styled.ul mt="1" listStyleType="disc" listStylePosition="inside" display="flex" flexDirection="column" gap="1">
                        <Box as="li">消費税</Box>
                        <Box as="li">コンビニ決済手数料：220円（税込）</Box>
                        <Box as="li">配送料：全国一律 864円、北海道 1,100円、沖縄・離島 1,900円</Box>
                    </styled.ul>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">返品・交換について</Box>
                    <Box as="p">
                        生鮮食品のため、不良品以外の返品・交換はお受けできません。
                        万が一不良品があった場合は、商品到着から3日以内に電話またはメールでご連絡ください。
                        ご連絡がない場合、返品には応じられません。 お客様のご都合による返品・交換はできません。
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
};
