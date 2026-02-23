import { Box, VStack, styled } from "styled-system/jsx";

export const TermsOfService = () => {
    return (
        <Box w="full" maxW="2xl" mx="auto">
            {/* ヘッダーセクション */}
            <Box mb="6">
                <Box as="h1" fontSize="lg" fontWeight="semibold" color="fg.default">
                    利用規約
                </Box>
                <Box fontSize="sm" color="fg.muted" mt="1">
                    本サイトをご利用いただく前に必ずお読みください。
                </Box>
            </Box>

            {/* コンテンツセクション */}
            <VStack gap="6" alignItems="stretch" fontSize="sm" lineHeight="relaxed" color="fg.default">
                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第1条　本規約の範囲</Box>
                    <Box as="p">
                        オイスターカンパニー株式会社（以下「当社」といいます）は、当社が運営する「新鮮な牡蠣販売所」（以下「本サイト」といいます）の提供にあたり、
                        本規約を定めます。利用者は、本サイトを利用することにより本規約に同意したものとみなします。
                        なお、当社は必要に応じて本規約を改定できるものとし、改定後の規約は本サイト上に掲載した時点で効力を生じます。
                    </Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第2条　本サイトサービスの利用</Box>
                    <Box as="p">
                        利用者は、本規約および当社が定める各種方針に従って本サイトを利用するものとします。
                        未成年者が本サイトを利用する場合は、法定代理人の同意を得たうえで利用してください。
                        当社は日本国内においてのみサービスを提供するものとします。
                    </Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第3条　会員登録</Box>
                    <Box as="p">
                        利用者は、当社が定める方法に従い会員登録を行うことができます。
                        当社は、申請内容に虚偽がある場合、過去に規約違反がある場合、その他不適当と判断した場合には登録を承認しないことがあります。
                        また、登録は日本国内に住所を有する方に限られます。
                    </Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第4条　禁止事項</Box>
                    <Box as="p">利用者は、本サイトの利用に際して以下の行為を行ってはなりません。</Box>
                    <styled.ul mt="1" listStyleType="disc" listStylePosition="inside" display="flex" flexDirection="column" gap="1">
                        <Box as="li">法令または公序良俗に反する行為</Box>
                        <Box as="li">他の利用者、第三者、または当社の権利を侵害する行為</Box>
                        <Box as="li">虚偽の情報を登録または送信する行為</Box>
                        <Box as="li">当社の運営を妨げる行為</Box>
                    </styled.ul>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第5条　免責事項</Box>
                    <Box as="p">
                        当社は、本サイトの内容や提供情報の正確性、有用性、確実性について保証するものではありません。
                        また、利用者が本サイトを利用したことによって生じた損害について、当社は一切の責任を負いません。
                    </Box>
                </Box>

                <Box as="section">
                    <Box as="h2" mb="1" fontWeight="semibold" color="fg.default">第6条　準拠法および裁判管轄</Box>
                    <Box as="p">本規約は日本法に準拠し、当社所在地を管轄する裁判所を専属的合意管轄裁判所とします。</Box>
                </Box>

                <Box mt="6" textAlign="right" fontSize="xs" color="fg.subtle">
                    制定日：2026年1月1日
                </Box>
            </VStack>
        </Box>
    );
};
