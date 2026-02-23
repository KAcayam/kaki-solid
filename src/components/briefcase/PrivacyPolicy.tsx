import { Box, VStack, styled } from "styled-system/jsx";

export const PrivacyPolicy = () => {
    return (
        <Box w="full" maxW="2xl" mx="auto">
            {/* ヘッダーセクション */}
            <Box mb="6">
                <Box as="h1" fontSize="lg" fontWeight="semibold" color="fg.default">
                    個人情報保護方針
                </Box>
                <Box fontSize="sm" color="fg.muted" mt="1">
                    当社はお客様の個人情報を適切に管理し、以下の方針に従って取り扱います。
                </Box>
            </Box>

            {/* コンテンツセクション */}
            <VStack gap="6" alignItems="stretch" fontSize="sm" lineHeight="relaxed" color="fg.default">
                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第1条　個人情報の収集</Box>
                    <Box as="p">
                        当社は、商品購入や会員登録、サービス利用時に必要な範囲で個人情報を収集いたします。
                        収集する情報は、氏名、住所、電話番号、メールアドレスなど、サービス提供に必要な情報に限ります。
                    </Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第2条　利用目的</Box>
                    <Box as="p">収集した個人情報は、以下の目的で利用いたします：</Box>
                    <styled.ul mt="1" listStyleType="disc" listStylePosition="inside" display="flex" flexDirection="column" gap="1">
                        <Box as="li">商品の発送およびサービス提供</Box>
                        <Box as="li">お問い合わせへの対応</Box>
                        <Box as="li">当社サービスに関するご案内や重要なお知らせの送付</Box>
                    </styled.ul>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第3条　第三者提供</Box>
                    <Box as="p">法令に基づく場合を除き、収集した個人情報を第三者に提供することはありません。</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第4条　安全管理</Box>
                    <Box as="p">当社は、個人情報の漏洩、滅失、毀損を防ぐために、適切な安全管理措置を講じます。</Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第5条　開示・訂正・削除</Box>
                    <Box as="p">
                        お客様は、当社が保有する自己の個人情報について、開示、訂正、削除を請求する権利があります。
                        請求方法は当社ウェブサイトにてご案内いたします。
                    </Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第6条　本方針の変更</Box>
                    <Box as="p">
                        本方針は、法令または当社の都合により変更される場合があります。
                        変更後の方針は、本ウェブサイトに掲載された時点から効力を生じます。
                    </Box>
                </Box>

                <Box mt="6" textAlign="right" fontSize="xs" color="fg.subtle">
                    制定日：2026年1月1日
                </Box>
            </VStack>
        </Box>
    );
};
