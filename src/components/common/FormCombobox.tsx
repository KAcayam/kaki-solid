import { createListCollection } from '@ark-ui/solid/combobox'
import { useFilter } from '@ark-ui/solid/locale'
import { createSignal, createEffect, createMemo, For, Show, splitProps, type ComponentProps } from "solid-js";
import { Box } from "styled-system/jsx";
import * as Field from "~/components/ui/field";
import * as Combobox from "~/components/ui/combobox";
import { css } from "styled-system/css";
import { FormFieldProps, ComboboxItem } from "~/types";

// ジェネリクス T を ComboboxItem で制約
type Props<T extends ComboboxItem> = Omit<ComponentProps<typeof Combobox.Root<T>>, 'collection'> &
    FormFieldProps & {
        items: T[];
        placeholder?: string;
        onBlur?: () => void;
    };

export function FormCombobox<T extends ComboboxItem>(props: Props<T>) {
    const [local, rootProps] = splitProps(props, [
        "label", "error", "helperText", "placeholder", "items", "showAsterisk", "onBlur"
    ]);

    // --- フィルタリングロジックの構築 ---
    const filterFn = useFilter({ sensitivity: 'base' });

    // 初期値（props.value）からラベルを取得してinputValueの初期値とする
    const initialInputValue = () => {
        const val = rootProps.value;
        if (Array.isArray(val) && val.length > 0) {
            const item = local.items.find(i => i.value === val[0]);
            return item?.label || "";
        }
        return "";
    };

    const [inputValue, setInputValue] = createSignal(initialInputValue());

    // props.value が外部から変更された場合に inputValue を同期
    createEffect(() => {
        const val = rootProps.value;
        if (Array.isArray(val) && val.length > 0) {
            const item = local.items.find(i => i.value === val[0]);
            if (item) {
                setInputValue(item.label);
            }
        }
    });

    // 入力値に基づいてアイテムをフィルタリング
    const filteredItems = createMemo(() => {
        const input = inputValue();
        // 入力が空の場合は全件表示
        if (!input) return local.items;
        // 入力がある場合はフィルタリング
        return local.items.filter(item =>
            filterFn().contains(item.label, input)
        );
    });

    // フィルタリングされたアイテムを使ってコレクションを作成
    // createMemoでラップすることで、filteredItemsの変更に応じてコレクションも再生成されるようにする
    const collection = createMemo(() => createListCollection({
        items: filteredItems(),
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
    }));

    return (
        <Field.Root invalid={!!local.error}>
            <Field.Label>
                {local.label}
                <Show when={local.showAsterisk}>
                    <Box as="span" color="red.10" ml="1">
                        *
                    </Box>
                </Show>
            </Field.Label>

            <Combobox.Root
                {...rootProps}
                collection={collection()}
                inputValue={inputValue()}
                onInputValueChange={(e) => setInputValue(e.inputValue)}
                inputBehavior="autohighlight"
                selectionBehavior="replace"
                openOnClick={true}
                size="md"
                positioning={{ overflowPadding: 60 }}
            >
                <Combobox.Control>
                    <Combobox.Input
                        placeholder={local.placeholder}
                        onBlur={local.onBlur}
                    />
                    <Combobox.IndicatorGroup gap="2">
                        {/* × ボタンは値が選択されている時のみ表示 */}
                        <Combobox.Context>
                            {(api) => (
                                <Show when={api().value.some(v => v !== "")}>
                                    <Combobox.ClearTrigger />
                                </Show>
                            )}
                        </Combobox.Context>
                        <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                </Combobox.Control>

                {/* 選択肢ドロップダウン */}
                <Combobox.Positioner>
                    <Combobox.Content
                        class={css({
                            rounded: "l2",
                            boxShadow: "lg",
                            borderWidth: "1px",
                            zIndex: "dropdown",
                            overflow: "auto",
                            width: "var(--reference-width)",
                            maxH: "var(--available-height)",
                        })}
                    >
                        <Show when={filteredItems().length === 0}>
                            <Combobox.Empty class={css({ p: "2", textStyle: "sm", color: "fg.muted" })}>
                                見つかりませんでした
                            </Combobox.Empty>
                        </Show>
                        <For each={collection().items}>
                            {(item) => (
                                <Combobox.Item item={item}>
                                    <Combobox.ItemText>{item.label}</Combobox.ItemText>
                                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                                </Combobox.Item>
                            )}
                        </For>
                    </Combobox.Content>
                </Combobox.Positioner>
            </Combobox.Root>

            {/* ヘルパー・エラー表示 */}
            <Show when={local.helperText && !local.error}>
                <Field.HelperText>{local.helperText}</Field.HelperText>
            </Show>
            <Show when={local.error}>
                <Field.ErrorText>{local.error}</Field.ErrorText>
            </Show>
        </Field.Root>
    );
}
