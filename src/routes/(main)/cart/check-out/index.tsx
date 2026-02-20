import { onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, VStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { useCartContext } from "~/context/cart-context";
import { useAuth } from "~/context/auth-context";

export default function CheckOutPage() {
    const navigate = useNavigate();
    const context = useCartContext();

    // レイアウト設定の宣言
    onMount(() => {
        context?.setConfig({
            step: 4,
            title: "",
            backTo: "",
            backLabel: ""
        });
    });

    const auth = useAuth();

    const backToTop = () => navigate("/");
    const goToGuestSignup = () => navigate("/signup/guest");

    return (
        <VStack gap="8" w="full" mt="8">
            <Box fontWeight="bold">
                ご購入いただきありがとうございます
            </Box>
            <Show
                when={auth?.isLoggedIn()}
                fallback={
                    /* ゲスト購入の場合の表示 */
                    <>
                        <Box
                            fontSize={{ base: "xs", md: "sm" }}
                            color="fg.muted"
                        >
                            ゲスト購入情報のメールアドレス宛に確認メールが送信されました
                        </Box>

                        <VStack w="full" gap="4" pt="8">
                            <Box
                                fontSize={{ base: "xs", md: "sm" }}
                                color="fg.muted"
                            >
                                購入者情報を登録すると次回以降の取引がスムーズになります
                            </Box>

                            <Button
                                colorPalette="blue"
                                w="72"
                                mx="auto"
                                borderRadius="lg"
                                onClick={goToGuestSignup}
                            >
                                登録する
                            </Button>
                        </VStack>
                    </>
                }
            >
                {/* ログイン済みの場合の表示 */}
                <Box
                    textAlign="center"
                    fontSize={{ base: "xs", md: "sm" }}
                    color="fg.muted"
                >
                    登録されたメールアドレス宛に確認メールが送信されました
                </Box>
            </Show>

            {/* TOPに戻るボタン */}
            <Button
                variant="outline"
                w="72"
                color="fg.muted"
                borderRadius="lg"
                onClick={backToTop}
            >
                TOPに戻る
            </Button>
        </VStack>
    );
}
