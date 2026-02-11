/* Stepper コンポーネントの実装 */
import { For, Show } from "solid-js";
import { Check } from "lucide-solid";
import { Box, Flex } from "styled-system/jsx";

interface Step {
    label: string;
}

interface StepperProps {
    steps?: Step[];
    currentStepIndex?: number;
}

export const Stepper = (props: StepperProps) => {
    const steps = () => props.steps ?? [
        { label: 'カート確認' },
        { label: 'お客様情報' },
        { label: 'ご配送先' },
        { label: 'お支払い方法' },
        { label: '完了' }
    ];

    const currentStepIndex = () => props.currentStepIndex ?? 0;

    const getStepStatus = (index: number) => {
        if (index < currentStepIndex()) return 'completed';
        if (index === currentStepIndex()) return 'current';
        return 'upcoming';
    };

    return (
        <Flex justify="between" w="full">
            <For each={steps()}>
                {(step, index) => (
                    <Box
                        position="relative"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        flex="1"
                        minW="0"
                    >
                        {/* ステップ番号/アイコンの円 */}
                        <Box
                            position="relative"
                            zIndex="1"
                            display="flex"
                            h="8"
                            w="8"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="medium"
                            bg={getStepStatus(index()) === 'current' ? 'blue.10' : 'bg.muted'}
                            color={getStepStatus(index()) === 'current' ? 'white' : 'fg.muted'}
                        >
                            <Show
                                when={getStepStatus(index()) === 'completed'}
                                fallback={index() + 1}
                            >
                                <Check size={16} />
                            </Show>
                        </Box>

                        {/* ステップラベル */}
                        <Box
                            mt="2"
                            textAlign="center"
                            fontSize={{ base: "xs", md: "sm" }}
                            whiteSpace="nowrap"
                            fontWeight={getStepStatus(index()) === 'current' ? 'semibold' : 'normal'}
                            color={getStepStatus(index()) === 'current' ? 'blue.10' : 'fg.subtle'}
                        >
                            {step.label}
                        </Box>

                        {/* ステップ間を繋ぐ線 */}
                        <Show when={index() < steps().length - 1}>
                            <Box
                                position="absolute"
                                zIndex="0"
                                top="4"
                                left="calc(50% + 16px)"
                                right="calc(-50% + 16px)"
                                h="0.5"
                                bg="bg.muted"
                            />
                        </Show>
                    </Box>
                )}
            </For>
        </Flex>
    );
};
