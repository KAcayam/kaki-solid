import { createSignal } from "solid-js";
import { Box, Flex } from "styled-system/jsx";
import { Button } from "../ui/button";
import * as Dialog from "../ui/dialog";
import { CloseButton } from "../ui/close-button";
import { ContactModal } from "~/components/send-email/ContactModal";
import { TermsOfService } from "~/components/briefcase/TermsOfService";
import { PrivacyPolicy } from "~/components/briefcase/PrivacyPolicy";
import { Commerce } from "~/components/briefcase/Commerce";

export const Footer = () => {
    const [showContact, setShowContact] = createSignal(false);
    const [showTerms, setShowTerms] = createSignal(false);
    const [showPrivacy, setShowPrivacy] = createSignal(false);
    const [showCommerce, setShowCommerce] = createSignal(false);

    const currentYear = new Date().getFullYear();

    return (
        <Box
            as="footer"
            mt="4"
            w="full"
            borderTopWidth="1px"
            borderColor="border.default"
        >
            <Flex
                direction="column"
                align="center"
                gap="0"
                px="4"
                pt="2"
                mx="auto"
                maxW="screen-2xl"
            >
                <nav>
                    <Flex
                        direction={{ base: "column", md: "row" }}
                        align="center"
                        gap={{ base: "0", md: "8" }}
                        flexWrap="wrap"
                        justify="center"
                    >
                        {/* お問い合わせ */}
                        <Dialog.Root
                            open={showContact()}
                            onOpenChange={(e) => setShowContact(e.open)}
                        >
                            <Dialog.Trigger asChild={(triggerProps) => (
                                <Button
                                    {...triggerProps()}
                                    variant="plain"
                                    fontWeight="normal"
                                    p="0"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    color="fg.muted"
                                    _hover={{ bg: "bg.subtle", color: "fg.default" }}
                                >
                                    お問い合わせ
                                </Button>
                            )} />
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content
                                    maxH="80vh"
                                    maxW="md"
                                    overflowY="auto"
                                    p="6"
                                >
                                    <Dialog.CloseTrigger
                                        asChild={(triggerProps) =>
                                            <CloseButton {...triggerProps()} />
                                        }
                                    />
                                    <ContactModal onOpenChange={setShowContact} />
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Dialog.Root>

                        {/* 各種規約リンクグループ */}
                        <Flex
                            gap={{ base: "4", md: "8" }}
                            flexWrap="wrap"
                        >
                            {/* 利用規約 */}
                            <Dialog.Root
                                open={showTerms()}
                                onOpenChange={(e) => setShowTerms(e.open)}
                            >
                                <Dialog.Trigger asChild={(triggerProps) => (
                                    <Button
                                        {...triggerProps()}
                                        variant="plain"
                                        fontWeight="normal"
                                        p="0"
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="fg.muted"
                                        _hover={{ bg: "bg.subtle", color: "fg.default" }}
                                    >
                                        利用規約
                                    </Button>
                                )} />
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content
                                        maxH="80vh"
                                        maxW="md"
                                        overflowY="auto"
                                        p="6"
                                    >
                                        <Dialog.CloseTrigger
                                            asChild={(triggerProps) =>
                                                <CloseButton {...triggerProps()} />
                                            }
                                        />
                                        <TermsOfService />
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Dialog.Root>

                            {/* 個人情報保護方針 */}
                            <Dialog.Root
                                open={showPrivacy()}
                                onOpenChange={(e) => setShowPrivacy(e.open)}
                            >
                                <Dialog.Trigger asChild={(triggerProps) => (
                                    <Button
                                        {...triggerProps()}
                                        variant="plain"
                                        fontWeight="normal"
                                        p="0"
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="fg.muted"
                                        _hover={{ bg: "bg.subtle", color: "fg.default" }}
                                    >
                                        個人情報保護方針
                                    </Button>
                                )} />
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content
                                        maxH="80vh"
                                        maxW="md"
                                        overflowY="auto"
                                        p="6"
                                    >
                                        <Dialog.CloseTrigger
                                            asChild={(triggerProps) =>
                                                <CloseButton {...triggerProps()} />
                                            }
                                        />
                                        <PrivacyPolicy />
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Dialog.Root>

                            {/* 特定商取引法上の表記 */}
                            <Dialog.Root
                                open={showCommerce()}
                                onOpenChange={(e) => setShowCommerce(e.open)}
                            >
                                <Dialog.Trigger asChild={(triggerProps) => (
                                    <Button
                                        {...triggerProps()}
                                        variant="plain"
                                        fontWeight="normal"
                                        p="0"
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="fg.muted"
                                        _hover={{ bg: "bg.subtle", color: "fg.default" }}
                                    >
                                        特定商取引法上の表記
                                    </Button>
                                )} />
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content
                                        maxH="80vh"
                                        maxW="md"
                                        overflowY="auto"
                                        p="6"
                                    >
                                        <Dialog.CloseTrigger
                                            asChild={(triggerProps) =>
                                                <CloseButton {...triggerProps()} />
                                            }
                                        />
                                        <Commerce />
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Dialog.Root>
                        </Flex>
                    </Flex>
                </nav>

                <Box
                    my="2"
                    fontSize="xs"
                    color="fg.subtle"
                    class="notranslate"
                    translate="no"
                >
                    ©︎{currentYear} Oyster Company. All Rights Reserved.
                </Box>
            </Flex>
        </Box>
    );
};
