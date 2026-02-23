import { createSignal, Switch, Match } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, VStack, styled } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import { notify } from "~/components/ui/toast";
import { AccountData } from "~/components/common/account/AccountData";
import { AccountEdit } from "~/components/common/account/AccoutnEdit";
import { ConfirmAccountUpdateModal } from "~/components/common/account/ConfirmAccountUpdateModal";
import { PasswordReset } from "./_components/PasswordReset";
import { ConfirmPasswordResetModal } from "./_components/ConfirmPasswordResetModal";
import usersData from "~/data/users.json";
import type { User } from "~/types";

const StyledLink = styled(A);

export default function AccountPage() {
    const pageTitle = "アカウント情報";

    // 状態管理
    const [user, setUser] = createSignal<User>(usersData.find(u => u.isPrimary) || usersData[0]);
    const [isEditing, setIsEditing] = createSignal(false);
    const [isResettingPassword, setIsResettingPassword] = createSignal(false);

    const [showAccountModal, setShowAccountModal] = createSignal(false);
    const [showPasswordModal, setShowPasswordModal] = createSignal(false);

    const [tempAccount, setTempAccount] = createSignal<User>({ ...user() });
    const [tempPassword, setTempPassword] = createSignal({ newPassword: "", confirmPassword: "" });

    // ハンドラ
    const handleSaveAccountTemp = (updated: User) => {
        setTempAccount(updated);
        setShowAccountModal(true);
    };

    const handleConfirmAccountUpdate = () => {
        setUser({ ...tempAccount() });
        setShowAccountModal(false);
        setIsEditing(false);
        notify.success("アカウント情報を更新しました");
    };

    const handleSavePasswordTemp = (newPassword: string, confirmPassword: string) => {
        setTempPassword({ newPassword, confirmPassword });
        setShowPasswordModal(true);
    };

    const handleConfirmPasswordReset = () => {
        setShowPasswordModal(false);
        setIsResettingPassword(false);
        setTempPassword({ newPassword: "", confirmPassword: "" });
        notify.success("パスワードを更新しました");
    };

    return (
        <Flex>
            <Box w="full" px="4">
                {/* 戻るリンク */}
                <Box w="fit-content" mb="4">
                    <StyledLink
                        href="/"
                        display="flex"
                        alignItems="center"
                        gap="2"
                        color="fg.subtle"
                        _hover={{ color: "fg.muted" }}
                        textDecoration="none"
                    >
                        <ChevronLeft size={16} />
                        <Box as="span" fontSize="sm">
                            TOPに戻る
                        </Box>
                    </StyledLink>
                </Box>

                {/* ページタイトル */}
                <Box
                    w="full"
                    maxW="sm"
                    mx="auto"
                >
                    <Box
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="medium"
                        textAlign="start"
                    >
                        {pageTitle}
                    </Box>
                </Box>

                {/* メインコンテンツ切り替え */}
                <Flex w="full" justify="center">
                    <Switch>
                        {/* アカウント編集 */}
                        <Match when={isEditing()}>
                            <AccountEdit
                                editingAccount={tempAccount()}
                                onSave={handleSaveAccountTemp}
                                onCancel={() => setIsEditing(false)}
                            />
                        </Match>

                        {/* パスワードリセット */}
                        <Match when={isResettingPassword()}>
                            <PasswordReset
                                onSave={handleSavePasswordTemp}
                                onCancel={() => setIsResettingPassword(false)}
                            />
                        </Match>

                        {/* 通常表示 */}
                        <Match when={true}>
                            <VStack w="full" maxW="sm" gap="6">
                                <AccountData user={user()} />
                                <VStack w="full" gap="3">
                                    <Button
                                        variant="outline"
                                        w="full"
                                        color="fg.muted"
                                        cursor="pointer"
                                        onClick={() => {
                                            setTempAccount({ ...user() });
                                            setIsEditing(true);
                                        }}
                                    >
                                        アカウント情報編集
                                    </Button>
                                    <Button
                                        variant="outline"
                                        w="full"
                                        color="fg.muted"
                                        cursor="pointer"
                                        onClick={() => setIsResettingPassword(true)}
                                    >
                                        パスワード変更
                                    </Button>
                                </VStack>
                            </VStack>
                        </Match>
                    </Switch>
                </Flex>
            </Box>

            {/* 各種確認モーダル */}
            <ConfirmAccountUpdateModal
                open={showAccountModal()}
                tempAccount={tempAccount()}
                onConfirm={handleConfirmAccountUpdate}
                onCancel={() => setShowAccountModal(false)}
                onOpenChange={setShowAccountModal}
            />

            <ConfirmPasswordResetModal
                open={showPasswordModal()}
                onConfirm={handleConfirmPasswordReset}
                onCancel={() => setShowPasswordModal(false)}
                onOpenChange={setShowPasswordModal}
            />
        </Flex>
    );
}
