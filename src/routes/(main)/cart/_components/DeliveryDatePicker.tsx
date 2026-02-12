/* src/routes/(main)/cart/_components/DeliveryDatePicker.tsx */
import { createSignal } from "solid-js";
import { For, Portal } from "solid-js/web";
import { ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-solid";
import { Box, Flex } from "styled-system/jsx";
import { css } from "styled-system/css";
import { IconButton } from "~/components/ui/icon-button";
import * as DatePicker from "~/components/ui/date-picker";
import { today, getLocalTimeZone, type DateValue } from "@internationalized/date";

interface DeliveryDatePickerProps {
    value: DateValue[];
    onValueChange: (value: DateValue[]) => void;
}

export const DeliveryDatePicker = (props: DeliveryDatePickerProps) => {
    const currentToday = today(getLocalTimeZone());
    const [focusedDate, setFocusedDate] = createSignal<DateValue>(currentToday);

    return (
        <DatePicker.Root
            selectionMode="single"
            value={props.value}
            onValueChange={(details) => props.onValueChange(details.value)}
            maxView="day"
            min={currentToday}
            focusedValue={focusedDate()}
            onFocusChange={(details) => {
                // 当月より前にはナビゲートさせない
                const focused = details.focusedValue;
                if (focused.year < currentToday.year ||
                    (focused.year === currentToday.year && focused.month < currentToday.month)) {
                    return;
                }
                setFocusedDate(focused);
            }}
            locale="ja-JP"
            startOfWeek={1}
        >
            <DatePicker.Control>
                <DatePicker.Trigger
                    cursor="pointer"
                    fontWeight="normal"
                    color="fg.muted"
                >
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        border="1px solid"
                        borderColor="gray.6"
                        borderRadius="l2"
                        h="10"
                        px="3"
                        w="9rem"
                    >
                        <Box>
                            {props.value.length > 0
                                ? props.value[0].toDate(getLocalTimeZone()).toLocaleDateString('ja-JP')
                                : '希望日'}
                        </Box>
                        <ChevronsUpDown size={16} />
                    </Flex>
                </DatePicker.Trigger>
            </DatePicker.Control>
            <Portal>
                <DatePicker.Positioner>
                    <DatePicker.Content
                        p="4"
                        borderRadius="xl"
                        boxShadow="lg"
                    >
                        <DatePicker.Context>
                            {(api) => (
                                <DatePicker.View view="day">
                                    <DatePicker.ViewControl>
                                        <DatePicker.PrevTrigger cursor="pointer">
                                            <IconButton variant="plain" size="sm">
                                                <ChevronLeft />
                                            </IconButton>
                                        </DatePicker.PrevTrigger>
                                        <DatePicker.ViewTrigger>
                                            <DatePicker.RangeText />
                                        </DatePicker.ViewTrigger>
                                        <DatePicker.NextTrigger cursor="pointer">
                                            <IconButton variant="plain" size="sm">
                                                <ChevronRight />
                                            </IconButton>
                                        </DatePicker.NextTrigger>
                                    </DatePicker.ViewControl>
                                    <DatePicker.Table>
                                        <DatePicker.TableHead>
                                            <DatePicker.TableRow>
                                                <For each={api().weekDays}>
                                                    {(weekDay) => (
                                                        <DatePicker.TableHeader fontSize="xs">
                                                            {weekDay.short}
                                                        </DatePicker.TableHeader>
                                                    )}
                                                </For>
                                            </DatePicker.TableRow>
                                        </DatePicker.TableHead>
                                        <DatePicker.TableBody>
                                            <For each={api().weeks}>
                                                {(week) => (
                                                    <DatePicker.TableRow>
                                                        <For each={week}>
                                                            {(day) => (
                                                                <DatePicker.TableCell value={day}>
                                                                    <DatePicker.TableCellTrigger
                                                                        cursor="pointer"
                                                                        _disabled={{
                                                                            color: "gray.6",
                                                                            cursor: "default",
                                                                        }}
                                                                        _today={{
                                                                            _before: { display: "none" },
                                                                            boxShadow: "inset 0 0 4px 2px var(--colors-blue-4)",
                                                                        }}
                                                                    >
                                                                        {day.day}
                                                                    </DatePicker.TableCellTrigger>
                                                                </DatePicker.TableCell>
                                                            )}
                                                        </For>
                                                    </DatePicker.TableRow>
                                                )}
                                            </For>
                                        </DatePicker.TableBody>
                                    </DatePicker.Table>
                                </DatePicker.View>
                            )}
                        </DatePicker.Context>
                    </DatePicker.Content>
                </DatePicker.Positioner>
            </Portal>
        </DatePicker.Root>
    );
};
