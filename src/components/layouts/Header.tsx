/* Header コンポーネントの最適化実装 */
import { useNavigate, A } from "@solidjs/router";
import { Show } from "solid-js";
import { ShoppingCart, User, Clipboard, LogOut } from "lucide-solid";
import { Box, HStack, styled } from "styled-system/jsx";
import { button } from "styled-system/recipes";
import { IconButton } from "../ui/icon-button";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import * as Menu from "../ui/menu";

interface HeaderProps {
    isLoggedIn: boolean;
    userName?: string;
    cartItemCount: number;
    accountEditLink?: string;
    orderHistoryLink?: string;
    onLogout: () => void;
}

const StyledLink = styled(A);

export const Header = (props: HeaderProps) => {
    const navigate = useNavigate();
    const accountEditLink = props.accountEditLink ?? "/account";
    const orderHistoryLink = props.orderHistoryLink ?? "/orders";

    return (
        <HStack
            as="header"
            w="full"
            h="12"
            px={{ base: "3", md: "6" }}
            borderBottomWidth="1px"
            justify="space-between"
            position="sticky"
            top="0"
            zIndex="sticky"
            bg="bg.default"
        >
            <StyledLink
                href="/"
                class={button({ variant: "link" })}
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
            >
                オイスターマーケット
            </StyledLink>

            <HStack gap="1">
                {/* カートボタン（バッジ付き） */}
                <Box position="relative">
                    <IconButton
                        variant="plain"
                        borderRadius="full"
                        aria-label="カートを表示"
                        onClick={() => navigate("/cart")}
                    >
                        <ShoppingCart />
                    </IconButton>
                    <Show when={props.cartItemCount > 0}>
                        <Badge
                            colorPalette="red"
                            position="absolute"
                            right="-1"
                        >
                            {props.cartItemCount}
                        </Badge>
                    </Show>
                </Box>

                {/* 認証・メニューセクション */}
                <Show
                    when={props.isLoggedIn}
                    fallback={
                        <Button
                            variant="outline"
                            size="xs"
                            onClick={() => navigate("/login")}
                        >
                            ログイン
                        </Button>
                    }
                >
                    <Menu.Root>
                        <Menu.Trigger
                            asChild={(triggerProps) => (
                                <Button {...triggerProps()}
                                    variant="plain"
                                    size="xs"
                                    fontWeight="normal"
                                >
                                    {props.userName}様
                                </Button>
                            )}
                        />
                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item value="account" onClick={() => navigate(accountEditLink)}>
                                    <HStack gap="2">
                                        <User size={16} />
                                        <span>アカウント</span>
                                    </HStack>
                                </Menu.Item>
                                <Menu.Item value="orders" onClick={() => navigate(orderHistoryLink)}>
                                    <HStack gap="2">
                                        <Clipboard size={16} />
                                        <span>注文履歴</span>
                                    </HStack>
                                </Menu.Item>
                                <Menu.Item value="logout" onClick={() => props.onLogout()}>
                                    <HStack gap="2">
                                        <LogOut size={16} />
                                        <span>ログアウト</span>
                                    </HStack>
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Menu.Root>
                </Show>
            </HStack>
        </HStack>
    );
};
