/* src/components/common/QuantitySelect.tsx の実装 */
import { For } from "solid-js";
import { createListCollection } from "@ark-ui/solid";
import { Box, HStack } from "styled-system/jsx";
import * as Select from "../ui/select";
import { QuantitySelectProps } from "~/types";

export const QuantitySelect = (props: QuantitySelectProps) => {
    // 数量の選択肢を生成 (デフォルト最大10)
    const quantities = Array.from({ length: props.max ?? 10 }, (_, i) => ({
        label: (i + 1).toString(),
        value: (i + 1).toString(),
    }));
    const collection = createListCollection({ items: quantities });

    return (
        <HStack justify="start" w="fit-content">
            <Select.Root
                name={props.name}
                positioning={{ gutter: 4 }}
                value={props.value}
                onValueChange={(details) => props.onValueChange(details.value)}
                collection={collection}
            >
                <Select.Label srOnly>
                    {props.label}
                </Select.Label>
                <Select.Control>
                    <Select.Trigger w="20" cursor="pointer">
                        <Select.ValueText placeholder="1" />
                        <Select.Indicator />
                    </Select.Trigger>
                </Select.Control>
                <Select.Positioner>
                    <Select.Content>
                        <Select.ItemGroup>
                            <Select.ItemGroupLabel>
                                {props.label}
                            </Select.ItemGroupLabel>
                            <For each={collection.items}>
                                {(item) => (
                                    <Select.Item
                                        item={item}
                                        cursor="pointer"
                                    >
                                        <Select.ItemText>
                                            {item.label}
                                        </Select.ItemText>
                                        <Select.ItemIndicator>
                                            ✓
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                )}
                            </For>
                        </Select.ItemGroup>
                    </Select.Content>
                </Select.Positioner>
                <Select.HiddenSelect />
            </Select.Root>
            <Box fontSize="sm" color="fg.muted" whiteSpace="nowrap">
                {props.suffix}
            </Box>
        </HStack>
    );
};
