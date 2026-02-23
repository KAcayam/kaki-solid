import { createListCollection } from '@ark-ui/solid/select'
import { createMemo, For, Show, splitProps, type ComponentProps } from "solid-js";
import { Box } from "styled-system/jsx";
import * as Field from "~/components/ui/field";
import * as Select from "~/components/ui/select";
import { css } from "styled-system/css";
import { FormFieldProps, ComboboxItem } from "~/types";

type Props = Omit<ComponentProps<typeof Select.Root>, 'collection'> &
    FormFieldProps & {
        items: ComboboxItem[];
        placeholder?: string;
    };

export function FormSelect(props: Props) {
    const [local, rootProps] = splitProps(props, [
        "label", "error", "helperText", "placeholder", "items", "showAsterisk"
    ]);

    const collection = createMemo(() => createListCollection({
        items: local.items,
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

            <Select.Root
                {...rootProps}
                collection={collection()}
                size="md"
                positioning={{ overflowPadding: 60 }}
            >
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder={local.placeholder} />
                        <Select.Indicator />
                    </Select.Trigger>
                </Select.Control>

                <Select.Positioner>
                    <Select.Content
                        class={css({
                            rounded: "l2",
                            boxShadow: "lg",
                            borderWidth: "1px",
                            zIndex: "dropdown",
                            overflow: "auto",
                            maxH: "var(--available-height)",
                        })}
                    >
                        <For each={collection().items}>
                            {(item) => (
                                <Select.Item item={item}>
                                    <Select.ItemText>{item.label}</Select.ItemText>
                                    <Select.ItemIndicator />
                                </Select.Item>
                            )}
                        </For>
                    </Select.Content>
                </Select.Positioner>

                <Select.HiddenSelect />
            </Select.Root>

            <Show when={local.helperText && !local.error}>
                <Field.HelperText>{local.helperText}</Field.HelperText>
            </Show>
            <Show when={local.error}>
                <Field.ErrorText>{local.error}</Field.ErrorText>
            </Show>
        </Field.Root>
    );
}
