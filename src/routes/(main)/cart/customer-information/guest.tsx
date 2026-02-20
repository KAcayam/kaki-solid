import { onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useCartContext } from "~/context/cart-context";
import { useAuth } from "~/context/auth-context";
import { GuestForm } from "~/components/common/account/GuestForm";
import { Box } from "styled-system/jsx";

export default function LoginPage() {
    const context = useCartContext();
    const auth = useAuth();
    const navigate = useNavigate();

    // ログイン済みならリダイレクト
    onMount(() => {
        if (auth?.isLoggedIn()) {
            navigate("/cart/customer-information", { replace: true });
            return;
        }

        context?.setConfig({
            step: 1,
            title: "ゲスト購入",
            backTo: "/cart",
            backLabel: "カートに戻る"
        });
    });

    return (
        <Box mx="auto" w="full" maxW="sm">
            <Box
                w="full"
                maxW="sm"
                textAlign="start"
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.10"
            >
                購入後に下記情報を登録することができます
            </Box>
            <GuestForm
                cancelLink="/cart/customer-information"
            />
        </Box>
    );
}
