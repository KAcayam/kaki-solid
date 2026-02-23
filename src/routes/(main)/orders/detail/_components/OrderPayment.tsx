import { Box, Flex, VStack } from "styled-system/jsx";

interface OrderPaymentProps {
    subtotal: number;
    shippingCost: number;
    total: number;
}

export const OrderPayment = (props: OrderPaymentProps) => {
    return (
        <Box
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            p="4"
            bg="bg.default"
        >
            <VStack gap="2" alignItems="stretch">
                <Flex justify="space-between" fontSize="sm">
                    <Box color="fg.subtle">
                        小計
                    </Box>
                    <Box>
                        {props.subtotal.toLocaleString()}
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </Flex>

                <Flex justify="space-between" fontSize="sm">
                    <Box color="fg.subtle">
                        送料
                    </Box>
                    <Box>
                        {props.shippingCost.toLocaleString()}
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </Flex>

                <Flex
                    justify="space-between"
                    alignItems="baseline"
                    pt="2"
                >
                    <Box>
                        <Box as="span" fontWeight="semibold">
                            合計
                        </Box>
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            税込
                        </Box>
                    </Box>
                    <Box fontSize="lg" fontWeight="semibold">
                        {props.total.toLocaleString()}
                        <Box
                            as="span"
                            ml="1"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </Flex>
            </VStack>
        </Box>
    );
};
