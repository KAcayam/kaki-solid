import { ParentProps, createSignal } from "solid-js";
import { Flex, Box } from "styled-system/jsx";
import { Header } from "~/components/layouts/Header";
import { Footer } from "~/components/layouts/Footer";

export default function MainRouteLayout(props: ParentProps) {
    const [isLoggedIn, setIsLoggedIn] = createSignal(true);

    return (
        <Flex
            direction="column"
            minH="100vh"
            bg="bg.default"
            class="notranslate"
        >
            <Header
                isLoggedIn={isLoggedIn()}
                cartItemCount={2}
                onLogout={() => setIsLoggedIn(false)}
                userName="牡蠣海子"
            />

            <Box as="main" flex="1" w="full" maxW="8xl" px="0!">
                {props.children}
            </Box>

            <Footer />
        </Flex>
    );
};
