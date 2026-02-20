import { onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useCartContext } from "~/context/cart-context";
import { useAuth } from "~/context/auth-context";
import { SignupForm } from "~/components/common/account/SignupForm";
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
            title: "新規登録",
            backTo: "/cart",
            backLabel: "カートに戻る"
        });
    });

    return (
        <Box mx="auto" w="full" maxW="sm">
            <SignupForm
                cancelLink="/cart/customer-information"
            />
        </Box>
    );
}
