import { Box, Flex, Grid, VStack } from "styled-system/jsx";
import type { Order } from "~/types";

interface OrderStatusPanelProps {
    order: Order;
}

export const OrderStatusPanel = (props: OrderStatusPanelProps) => {
    return (
        <Box
            mb="2"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            p="4"
            bg="bg.default"
        >
            <Grid
                columns={{ base: 2, md: 4 }}
                gap="2"
                alignItems="center"
            >
                {/* 注文日 */}
                <VStack gap="0" alignItems="start">
                    <Box fontSize="xs" color="fg.muted">
                        注文日
                    </Box>
                    <Box fontSize={{ base: "sm", md: "base" }}>
                        {props.order.orderDate}
                    </Box>
                </VStack>

                {/* 注文番号 */}
                <VStack gap="0" alignItems="start">
                    <Box fontSize="xs" color="fg.muted">
                        注文番号
                    </Box>
                    <Box fontSize={{ base: "sm", md: "base" }}>
                        {props.order.orderNumber}
                    </Box>
                </VStack>

                {/* 合計金額 */}
                <VStack gap="0" alignItems={{ base: "start", md: "center" }}>
                    <Box fontSize="xs" color="fg.muted">
                        合計金額
                    </Box>
                    <Box fontSize="sm">
                        {props.order.totalAmount.toLocaleString()}
                        <Box
                            as="span"
                            ml="0.5"
                            fontSize="xs"
                            color="fg.subtle"
                        >
                            円
                        </Box>
                    </Box>
                </VStack>

                {/* 現在のステータス */}
                <Box
                    fontSize={{ base: "xs", md: "sm" }}
                    textAlign={{ base: "start", md: "center" }}
                    fontWeight="medium"
                >
                    {props.order.status}
                </Box>
            </Grid>
        </Box>
    );
};
