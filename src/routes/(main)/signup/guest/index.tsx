import { createSignal } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { ChevronLeft } from "lucide-solid";
import { Box, Flex, styled } from "styled-system/jsx";
import { GuestSignupForm } from "~/components/common/account/GuestSignupForm";
import { ConfirmSignupModal } from "~/components/common/account/ConfirmSignupModal";
import usersData from "~/data/users.json";
import type { User } from "~/types";
import type { SignupInput } from "~/schemas/auth";
import { toaster } from "~/components/ui/toast";

const StyledLink = styled(A);

export default function GuestSignupPage() {
    const pageTitle = "アカウント情報登録";

    const navigate = useNavigate();

    // 仮のゲストユーザー情報 (ID: 2) の取得
    const guestUser = usersData.find((u) => u.id === "2") as User;

    // 確認モーダル用の一時アカウント情報
    const [tempAccount, setTempAccount] = createSignal<User>({ ...guestUser });
    const [showConfirmModal, setShowConfirmModal] = createSignal(false);

    // フォームから保存イベントを受け取った際の処理
    const handleSaveTemp = (updated: SignupInput) => {
        // 現在の一時データとフォームの入力値をマージして更新
        setTempAccount((prev) => ({ ...prev, ...updated }));
        setShowConfirmModal(true);
    };

    const handleConfirmUpdate = () => {
        // ここに実際の登録処理（API通信等）を記述
        setShowConfirmModal(false);
        navigate("/");
        toaster.create({
            description: "情報を登録しました",
            type: "success",
            closable: true,
            duration: 6000,
        });
    };

    return (
        <Flex w="full" px="4">
            <Box w="full">
                {/* TOPに戻るリンク */}
                <Box mb="4">
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
                        <Box as="span" fontSize="sm">TOPに戻る</Box>
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

                {/* アカウント登録フォーム */}
                <Flex w="full" justify="center">
                    <GuestSignupForm
                        guestUser={guestUser}
                        onSave={handleSaveTemp}
                        onCancel={() => navigate("/")}
                    />
                </Flex>
            </Box>

            {/* 登録確認モーダル */}
            <ConfirmSignupModal
                open={showConfirmModal()}
                tempAccount={tempAccount()}
                onConfirm={handleConfirmUpdate}
                onCancel={() => setShowConfirmModal(false)}
                onOpenChange={setShowConfirmModal}
            />
        </Flex>
    );
}
