import { Show, splitProps } from "solid-js";
import { Box } from "styled-system/jsx";
import * as Field from "~/components/ui/field";
import { FormFieldProps } from "~/types";
import { Input, type InputProps } from "~/components/ui/input";

type Props = InputProps & FormFieldProps;

export function FormInput(props: Props) {
    const [local, inputProps] = splitProps(props, ["label", "error", "helperText", "showAsterisk"]);

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
            <Input {...inputProps} />

            {/* 補足説明欄 */}
            <Show when={local.helperText && !local.error}>
                <Field.HelperText>{local.helperText}</Field.HelperText>
            </Show>

            {/* エラーメッセージ */}
            <Show when={local.error}>
                <Field.ErrorText>{local.error}</Field.ErrorText>
            </Show>
        </Field.Root>
    );
}
