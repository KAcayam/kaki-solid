/* src/routes/(main)/cart/customer-information/index.tsx */
import { createSignal, onMount, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, VStack } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { AccountData } from "~/components/common/account/AccountData";
import { AccountEdit } from "~/components/common/account/AccoutnEdit";
import { ConfirmAccountUpdateModal } from "~/components/common/account/ConfirmAccountUpdateModal";
import { useAuth } from "~/context/auth-context";
import { useCartContext } from "~/context/cart-context";
import { notify } from "~/components/ui/toast";

import usersData from "~/data/users.json"; // サンプルデータ

export default function CustomerInformationPage() {
    const navigate = useNavigate();
    const context = useCartContext();
    const auth = useAuth();

    // レイアウト設定の宣言
    onMount(() => {
        context?.setConfig({
            step: 1,
            title: "お客様情報",
            backTo: "/cart",
            backLabel: "カートに戻る"
        });
    });

    // 状態管理
    const [user, setUser] = createSignal(auth?.user() || usersData[0]);

    const [isEditing, setIsEditing] = createSignal(false);
    const [showConfirmModal, setShowConfirmModal] = createSignal(false);
    const [tempAccount, setTempAccount] = createSignal({ ...user() });

    // アクションハンドラ
    const handleSave = (updatedAccount: any) => {
        setTempAccount(updatedAccount);
        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = () => {
        setUser({ ...tempAccount() });
        setShowConfirmModal(false);
        setIsEditing(false);
        notify.success("アカウント情報を更新しました");
    };

    const handleCancelUpdate = () => {
        setTempAccount({ ...user() });
        setShowConfirmModal(false);
    };

    return (
        <Show
            when={auth?.isLoggedIn()}
            fallback={
                /* 未ログイン時の表示 */
                <VStack mx="auto" mt="8" w="72" gap="8">
                    <Button
                        variant="outline"
                        w="full"
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={() => navigate("/cart/customer-information/login")}
                    >
                        ログイン
                    </Button>
                    <Button
                        variant="outline"
                        w="full"
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={() => navigate("/cart/customer-information/guest")}
                    >
                        ゲスト購入
                    </Button>
                    <Button
                        variant="outline"
                        w="full"
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={() => navigate("/cart/customer-information/signup")}
                    >
                        新規登録
                    </Button>
                </VStack>
            }
        >
            {/* ログイン済みの表示 */}
            <VStack w="full" alignItems="center">
                <Show
                    when={isEditing()}
                    fallback={<AccountData user={user()} />}
                >
                    <AccountEdit
                        editingAccount={tempAccount()}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                </Show>

                <Show when={!isEditing()}>
                    <VStack mx="auto" mt="6" w="72" gap="4">
                        <Button
                            colorPalette="blue"
                            w="full"
                            borderRadius="lg"
                            onClick={() => navigate("/cart/shipping-information")}
                        >
                            次に進む
                        </Button>
                        <Box w="full">
                            <Button
                                variant="plain"
                                px="0"
                                h="auto"
                                fontSize="sm"
                                color="fg.muted"
                                onClick={() => {
                                    setTempAccount({ ...user() });
                                    setIsEditing(true);
                                }}
                            >
                                アカウント情報を編集する
                            </Button>
                        </Box>
                    </VStack>
                </Show>
            </VStack>

            <ConfirmAccountUpdateModal
                open={showConfirmModal()}
                tempAccount={tempAccount()}
                onConfirm={handleConfirmUpdate}
                onCancel={handleCancelUpdate}
                onOpenChange={setShowConfirmModal}
            />
        </Show>
    );
}
