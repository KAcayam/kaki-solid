import { CalendarSearch, ChevronLeftIcon, ChevronRightIcon } from "lucide-solid";
import { parseDate, type DateValue, today } from "@internationalized/date";
import { For, createSignal } from "solid-js";
import { Portal } from "solid-js/web";
import { Box, HStack, VStack } from "styled-system/jsx";
import { IconButton } from "../ui/icon-button";
import * as DatePicker from "../ui/date-picker";
import datesData from "~/data/preselected-dates.json";


// 出荷不可日データをJSONから読み込み
const PRESELECTED_DATES = datesData.map((dateStr) => parseDate(dateStr));

export const SelectCalendar = () => {
    const currentToday = today("Asia/Tokyo");
    const [focusedDate, setFocusedDate] = createSignal<DateValue>(currentToday);
    const keyOf = (d: DateValue) => `${d.year}-${d.month}-${d.day}`;

    const preselectedSet = new Set(PRESELECTED_DATES.map(keyOf));

    return (
        <HStack gap={{ base: "1", md: "2" }}>
            <DatePicker.Root
                selectionMode="multiple"
                value={PRESELECTED_DATES}
                onOpenChange={(details) => {
                    if (details.open) {
                        setFocusedDate(today("Asia/Tokyo"));
                    }
                }}
                focusedValue={focusedDate()}
                onFocusChange={(details) => setFocusedDate(details.focusedValue)}
                isDateUnavailable={(date) => preselectedSet.has(keyOf(date))}
                maxView="day"
                locale="ja-JP"
                timeZone="Asia/Tokyo"
                startOfWeek={1}
            >
                <DatePicker.Control>
                    <DatePicker.Trigger
                        asChild={(triggerProps) => (
                            <IconButton
                                {...triggerProps()}
                                variant="outline"
                                aria-label="出荷カレンダーを表示"
                            >
                                <CalendarSearch />
                            </IconButton>
                        )}
                    />
                </DatePicker.Control>

                <Portal>
                    <DatePicker.Positioner>
                        <DatePicker.Content
                            p="4"
                            w="auto"
                            boxShadow="lg"
                            borderRadius="xl"
                        >
                            <DatePicker.Context>
                                {(api) => (
                                    <VStack gap="4">
                                        <DatePicker.View view="day">
                                            <DatePicker.ViewControl>
                                                <DatePicker.PrevTrigger>
                                                    <IconButton variant="plain" size="sm">
                                                        <ChevronLeftIcon />
                                                    </IconButton>
                                                </DatePicker.PrevTrigger>
                                                <DatePicker.ViewTrigger>
                                                    <DatePicker.RangeText />
                                                </DatePicker.ViewTrigger>
                                                <DatePicker.NextTrigger>
                                                    <IconButton variant="plain" size="sm">
                                                        <ChevronRightIcon />
                                                    </IconButton>
                                                </DatePicker.NextTrigger>
                                            </DatePicker.ViewControl>

                                            <DatePicker.Table>
                                                <DatePicker.TableHead>
                                                    <DatePicker.TableRow>
                                                        <For each={api().weekDays}>
                                                            {(weekDay) => (
                                                                <DatePicker.TableHeader>
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
                                                                                aria-description={preselectedSet.has(keyOf(day)) ? "出荷不可日" : undefined}
                                                                                _unavailable={{
                                                                                    color: "white",
                                                                                    bg: "red.9",
                                                                                    borderRadius: "md",
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

                                        <Box pt="2" w="full">
                                            <IconButton
                                                variant="outline"
                                                size="sm"
                                                fontWeight="normal"
                                                w="full"
                                                onClick={() => api().setOpen(false)}
                                            >
                                                閉じる
                                            </IconButton>
                                        </Box>
                                    </VStack>
                                )}
                            </DatePicker.Context>
                        </DatePicker.Content>
                    </DatePicker.Positioner>
                </Portal>
            </DatePicker.Root>

            <VStack alignItems="start">
                <Box fontSize={{ base: "xs", md: "sm" }} color="fg.muted" lineHeight="none">
                    出荷カレンダー
                </Box>
                <Box fontSize={{ base: "xs", md: "sm" }} color="red.10" lineHeight="none">
                    赤印の日は出荷不可
                </Box>
            </VStack>
        </HStack>
    );
};
