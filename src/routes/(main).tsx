import { createSignal, ParentProps } from "solid-js";
import { Flex, Box } from "styled-system/jsx";
import { Header } from "~/components/layouts/Header";
import { Footer } from "~/components/layouts/Footer";
import { useAuth } from "~/context/auth-context";
import { CartContext } from "~/context/cart-context";
import { CartConfig, CartItem } from "~/types";
import cartInitialData from "~/data/cart-initial.json";

export default function MainRouteLayout(props: ParentProps) {
    const auth = useAuth();

    // カートアイテムの状態管理（全ページ共通）
    const [items, setItems] = createSignal<CartItem[]>(cartInitialData as CartItem[]);

    // レイアウト設定（カートフロー用）
    const [config, setConfig] = createSignal<CartConfig>({
        step: 0,
        title: "",
        backTo: "/",
        backLabel: ""
    });

    const removeItem = (id: string) => {
        setItems(items().filter((i) => i.id !== id));
    };

    const changeQty = (id: string, qty: number) => {
        setItems(items().map((it) => (it.id === id ? { ...it, quantity: qty } : it)));
    };

    return (
        <CartContext.Provider value={{ config, setConfig, items, removeItem, changeQty }}>
            <Flex
                direction="column"
                minH="100vh"
                bg="bg.default"
                class="notranslate"
            >
                <Header
                    isLoggedIn={auth?.isLoggedIn() ?? false}
                    cartItemCount={items().length}
                    onLogout={() => auth?.logout()}
                    userName={auth?.user()?.lastName + " " + auth?.user()?.firstName}
                />

                <Box as="main" flex="1" w="full" maxW="8xl" px="0!">
                    {props.children}
                </Box>

                <Footer />
            </Flex>
        </CartContext.Provider>
    );
};
