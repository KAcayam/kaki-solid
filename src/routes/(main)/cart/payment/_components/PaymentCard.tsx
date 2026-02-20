import { createSignal, Switch, Match } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, Grid, VStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as RadioGroup from "~/components/ui/radio-group";
import { FormInput } from "~/components/common/FormInput";

interface PaymentCardProps {
    checkOutLink?: string;
}

export const PaymentCard = (props: PaymentCardProps) => {
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = createSignal("card");
    const checkOutLink = props.checkOutLink ?? "/cart/check-out";

    return (
        <Box
            w="full"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            px="6"
            py="4"
            bg="bg.default"
        >
            <Box
                mb="4"
                textAlign="start"
                fontSize="sm"
                color="fg.muted"
            >
                お支払い方法
            </Box>

            {/* お支払い方法の選択 */}
            <Box mb="4">
                <RadioGroup.Root
                    value={selectedPayment()}
                    onValueChange={(details) => setSelectedPayment(details.value ?? "card")}
                >
                    <VStack gap="3" alignItems="start">
                        <RadioGroup.Item
                            value="card"
                            colorPalette="blue"
                            cursor="pointer"
                        >
                            <RadioGroup.ItemControl />
                            <RadioGroup.ItemText
                                fontSize="sm"
                                color="fg.default"
                            >
                                クレジットカード
                            </RadioGroup.ItemText>
                            <RadioGroup.ItemHiddenInput />
                        </RadioGroup.Item>
                        <RadioGroup.Item
                            value="convenience"
                            colorPalette="blue"
                            cursor="pointer"
                        >
                            <RadioGroup.ItemControl />
                            <RadioGroup.ItemText
                                fontSize="sm"
                                color="fg.default"
                            >
                                コンビニ決済
                            </RadioGroup.ItemText>
                            <RadioGroup.ItemHiddenInput />
                        </RadioGroup.Item>
                        <RadioGroup.Item
                            value="bank"
                            colorPalette="blue"
                            cursor="pointer"
                        >
                            <RadioGroup.ItemControl />
                            <RadioGroup.ItemText
                                fontSize="sm"
                                color="fg.default"
                            >
                                銀行振込
                            </RadioGroup.ItemText>
                            <RadioGroup.ItemHiddenInput />
                        </RadioGroup.Item>
                    </VStack>
                </RadioGroup.Root>
            </Box>

            {/* 選択された支払い方法に応じた詳細表示 Stripeなどを使用 */}
            <Switch>
                {/* クレジットカード入力フォーム */}
                <Match when={selectedPayment() === "card"}>
                    <VStack
                        gap="3"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.6"
                        px="5"
                        py="4"
                        alignItems="stretch"
                    >
                        <FormInput label="カード番号" placeholder="1234 1234 5678 5678" />
                        <Grid columns={2} gap="2">
                            <FormInput label="有効期限" placeholder="MM/YY" />
                            <FormInput label="CVC" placeholder="123" />
                        </Grid>
                        <FormInput label="カード名義" placeholder="TARO KAKI" />
                        <Button
                            colorPalette="blue"
                            mt="4"
                            w="full"
                            borderRadius="lg"
                            onClick={() => navigate(checkOutLink)}
                        >
                            支払う
                        </Button>
                    </VStack>
                </Match>

                {/* コンビニ決済案内 */}
                <Match when={selectedPayment() === "convenience"}>
                    <VStack
                        gap="3"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.6"
                        px="5"
                        py="4"
                        alignItems="stretch"
                    >
                        <Box color="fg.muted">バーコードや番号など</Box>
                        <Button
                            colorPalette="blue"
                            mt="4"
                            w="full"
                            borderRadius="lg"
                            onClick={() => navigate(checkOutLink)}
                        >
                            注文する
                        </Button>
                        <Box fontSize="xs" color="fg.subtle" pt="2">
                            ※出荷は入金が確認でき次第となります
                        </Box>
                    </VStack>
                </Match>

                {/* 銀行振込案内 */}
                <Match when={selectedPayment() === "bank"}>
                    <VStack
                        gap="3"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.6"
                        px="5"
                        py="4"
                        alignItems="stretch"
                    >
                        <Box
                            color="fg.default"
                            fontSize="sm"
                            textAlign="start"
                        >
                            オイスター銀行 牡蠣支店
                            <Box as="p">普通 09876543</Box>
                            <Box as="p">株式会社かきフライ</Box>
                        </Box>
                        <Button
                            colorPalette="blue"
                            mt="4"
                            w="full"
                            borderRadius="lg"
                            onClick={() => navigate(checkOutLink)}
                        >
                            注文する
                        </Button>
                        <Box fontSize="xs" color="fg.subtle" pt="2">
                            ※出荷は入金が確認でき次第となります
                        </Box>
                    </VStack>
                </Match>
            </Switch>
        </Box>
    );
};
