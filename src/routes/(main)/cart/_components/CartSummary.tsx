/* CartSummary コンポーネントの実装 */
import { useNavigate } from "@solidjs/router";
import { createSignal, createMemo, Show, For } from "solid-js";
import { createListCollection } from "@ark-ui/solid";
import { Box, Flex, HStack, VStack } from "styled-system/jsx";
import { Divider } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as RadioGroup from "~/components/ui/radio-group";
import * as Checkbox from "~/components/ui/checkbox";
import * as Select from "~/components/ui/select";
import { DeliveryDatePicker } from "./DeliveryDatePicker";
import { ShippingCalendar } from "~/components/common/ShippingCalendar";
import { CartItem } from "~/types";
import { type DateValue } from "@internationalized/date";
import { Portal } from "solid-js/web";

interface CartSummaryProps {
  items: CartItem[];
}

export const CartSummary = (props: CartSummaryProps) => {
  const navigate = useNavigate();

  // 計算ロジック
  const subtotal = createMemo(() =>
    props.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const total = () => subtotal();

  // 配送希望日時の状態
  const [deliveryOption, setDeliveryOption] = createSignal("none");
  const [selectedDate, setSelectedDate] = createSignal<DateValue[]>([]);
  const [selectedTime, setSelectedTime] = createSignal<string[]>([]);

  // 時間帯選択の設定
  const timeOptions = [
    { value: '指定なし', label: '指定なし' },
    { value: '午前', label: '午前' },
    { value: '午後', label: '午後' },
    { value: '夜', label: '夜' }
  ];
  const timeCollection = createListCollection({ items: timeOptions });

  // ギフト用チェックボックス
  const [isGift, setIsGift] = createSignal(false);

  function handleProceedToNext() {
    navigate('/cart/customer-information');
  }

  function handleContinueShopping() {
    navigate('/');
  }

  return (
    <Box
      h="fit-content"
      w={{ base: "full", md: "sm" }}
      border="1px solid"
      borderColor="gray.6"
      borderRadius="xl"
      p="6"
      bg="bg.default"
    >
      {/* 金額エリア */}
      <Box mb="4">
        <Flex justify="space-between" align="center">
          <Box fontSize="sm">
            商品小計
          </Box>
          <Box>
            {subtotal().toLocaleString()}
            <Box
              as="span"
              ml="1"
              fontSize="xs"
              color="fg.muted"
            >
              円
            </Box>
          </Box>
        </Flex>
      </Box>

      <Flex justify="space-between" align="center">
        <Box fontSize="sm" color="fg.muted">
          送料
        </Box>
        <Box fontSize="sm" color="fg.muted">
          住所入力後に確定
        </Box>
      </Flex>

      <Box mt="5">
        <Flex justify="space-between" align="center">
          <HStack gap="3" alignItems="baseline">
            <Box fontSize="lg">
              合計
            </Box>
            <Box fontSize="sm" color="fg.muted">
              税込
            </Box>
          </HStack>
          <Box fontSize="xl" fontWeight="semibold">
            {total().toLocaleString()}
            <Box
              as="span"
              ml="1"
              fontSize="xs"
              color="fg.muted"
            >
              円
            </Box>
          </Box>
        </Flex>
      </Box>

      <Divider my="4" />

      {/* 出荷不可日カレンダー */}
      <Box mb="6">
        <ShippingCalendar />
      </Box>

      {/* 配送オプション選択 */}
      <Box mb="6">
        <RadioGroup.Root
          colorPalette="blue"
          value={deliveryOption()}
          onValueChange={(details) =>
            setDeliveryOption(details.value ?? "none")
          }
        >
          <VStack gap="2" alignItems="start">
            <RadioGroup.Item
              value="none"
              cursor="pointer"
            >
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText fontSize="sm" color="fg.muted">
                配送希望日時なし
              </RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
            <RadioGroup.Item
              value="specific"
              cursor="pointer"
            >
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText fontSize="sm" color="fg.muted">
                配送希望日時
              </RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </VStack>
        </RadioGroup.Root>

        <Show when={deliveryOption() === 'specific'}>
          <Flex gap="4" mt="2">
            {/* 日付選択 */}
            <DeliveryDatePicker
              value={selectedDate()}
              onValueChange={setSelectedDate}
            />

            {/* 時間帯選択 */}
            <Box>
              <Select.Root
                collection={timeCollection}
                value={selectedTime()}
                onValueChange={(details) => setSelectedTime(details.value)}
              >
                <Select.Control w="9rem">
                  <Select.Trigger cursor="pointer" color="fg.muted">
                    <Select.ValueText placeholder="希望時間帯" />
                    <Select.Indicator />
                  </Select.Trigger>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      <For each={timeCollection.items}>
                        {(item) => (
                          <Select.Item item={item}>
                            <Select.ItemText>
                              {item.label}
                            </Select.ItemText>
                            <Select.ItemIndicator />
                          </Select.Item>
                        )}
                      </For>
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
                <Select.HiddenSelect />
              </Select.Root>
            </Box>
          </Flex>
        </Show>
      </Box>

      {/* ギフト用 */}
      <Box mb="4">
        <HStack gap="2">
          <Checkbox.Root
            checked={isGift()}
            onCheckedChange={(details) => setIsGift(!!details.checked)}
            colorPalette="blue"
            cursor="pointer"
          >
            <Checkbox.Control borderRadius="l2">
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label fontSize="sm" color="fg.muted">
              ギフト用
            </Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        </HStack>
      </Box>

      {/* 諸注意 */}
      <VStack gap="2" fontSize="sm" color="fg.muted" mb="6" alignItems="start">
        <Box>
          お届け予定日：
          <Box as="span" color="fg.default">
            通常2〜6日後にお届け
          </Box>
        </Box>
        <Box fontSize="xs" lineHeight="1">
          ※ 出荷不可日、一部離島は除く
        </Box>
        <Box fontSize="xs">
          ※ 出荷は支払い確認後となります
        </Box>
      </VStack>

      {/* アクションボタン */}
      <VStack gap="3">
        <Button
          colorPalette="blue"
          w="full"
          borderRadius="lg"
          cursor="pointer"
          onClick={handleProceedToNext}
        >
          次に進む
        </Button>
        <Button
          variant="outline"
          w="full"
          borderRadius="lg"
          cursor="pointer"
          color="fg.muted"
          onClick={handleContinueShopping}
        >
          買い物を続ける
        </Button>
      </VStack>
    </Box>
  );
};
