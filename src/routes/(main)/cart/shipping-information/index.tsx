import { createSignal, createEffect, onMount, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Box, VStack, Flex } from "styled-system/jsx";
import { Button } from "~/components/ui/button";
import * as Checkbox from "~/components/ui/checkbox";
import * as RadioGroup from "~/components/ui/radio-group";
import * as Dialog from "~/components/ui/dialog";
import { CloseButton } from "~/components/ui/close-button";
import * as Field from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import { notify } from "~/components/ui/toast";
import { useCartContext } from "~/context/cart-context";
import { AddressCard } from "./_components/AddressCard";
import { AddressEdit } from "./_components/AddressEdit";
import { ConfirmDeleteModal } from "~/components/common/ConfirmDeleteModal";
import usersData from "~/data/users.json";
import type { User } from "~/types";

export default function ShippingInformationPage() {
    const navigate = useNavigate();
    const context = useCartContext();

    // レイアウト設定の宣言
    onMount(() => {
        context?.setConfig({
            step: 2,
            title: "ご配送先",
            backTo: "/cart/customer-information",
            backLabel: "前に戻る"
        });
    });

    // 状態管理
    const [addresses, setAddresses] = createSignal<User[]>(usersData);
    const [selectedId, setSelectedId] = createSignal<string>("");
    const [showAddressModal, setShowAddressModal] = createSignal(false);
    const [editingUser, setEditingUser] = createSignal<User | null>(null);
    const [deletingUser, setDeletingUser] = createSignal<User | null>(null);

    // 選択状態の自動調整
    createEffect(() => {
        const currentAddresses = addresses();
        const currentSelected = selectedId();
        if (currentAddresses.length > 0) {
            if (!currentSelected || !currentAddresses.some((u) => u.id === currentSelected)) {
                setSelectedId(String(currentAddresses[0].id));
            }
        } else {
            setSelectedId("");
        }
    });

    // アクションハンドラ
    const openNewAddressModal = () => {
        setEditingUser(null);
        setShowAddressModal(true);
    };

    const openEditAddressModal = (user: User) => {
        setEditingUser({ ...user });
        setShowAddressModal(true);
    };

    const handleDelete = (user: User) => {
        setDeletingUser(user);
    };

    const confirmDelete = () => {
        const user = deletingUser();
        if (user) {
            setAddresses(addresses().filter((u) => u.id !== user.id));
        }
        setDeletingUser(null);
        notify.success("配送先を削除しました");
    };
    // ギフト用チェックボックス
    const [isGift, setIsGift] = createSignal(false);

    const handleModalSubmit = (updated: User) => {
        const target = editingUser();
        if (target && updated.id) {
            // 編集
            setAddresses(addresses().map((u) => (u.id === updated.id ? updated : u)));
            notify.success("配送先情報を更新しました");
        } else {
            // 新規追加
            const newId = (
                addresses().length > 0 ? Math.max(...addresses().map((u) => Number(u.id))) + 1 : 1
            ).toString();
            const newUser: User = { ...updated, id: newId };
            setAddresses([...addresses(), newUser]);
            setSelectedId(newUser.id as string);
            notify.success("配送先を追加しました");
        }
        setShowAddressModal(false);
    };

    return (
        <VStack gap="6">
            <VStack gap="4">
                <Box w="full" maxW="xl">
                    {/* 配送先選択グループ */}
                    <RadioGroup.Root
                        value={selectedId()}
                        onValueChange={(details) => setSelectedId(details.value ?? "")}
                        colorPalette="blue"
                    >
                        <For each={addresses()}>
                            {(u) => (
                                <AddressCard
                                    user={u}
                                    onEdit={openEditAddressModal}
                                    onDelete={handleDelete}
                                />
                            )}
                        </For>
                    </RadioGroup.Root>
                </Box>

                <Flex w="full" justify="center" pt="4">
                    <Button
                        variant="outline"
                        w={{ base: "full", md: "72" }}
                        color="fg.muted"
                        borderRadius="lg"
                        onClick={openNewAddressModal}
                    >
                        新しい配送先を追加
                    </Button>
                </Flex>
            </VStack>

            {/* 境界線 */}
            <Box
                borderTopWidth="1px"
                borderColor="border.default"
                w="full"
                maxW="3xl"
            />

            <VStack
                w="full"
                maxW="xl"
                gap="4"
                alignItems="start"
            >
                <Checkbox.Root
                    checked={isGift()}
                    onCheckedChange={(details) => setIsGift(!!details.checked)}
                    colorPalette="blue"
                    cursor="pointer"
                >
                    <Checkbox.Control
                        borderRadius="l2"
                        borderColor="gray.6"
                    >
                        <Checkbox.Indicator />
                    </Checkbox.Control>
                    <Checkbox.Label
                        fontSize="sm"
                        color="fg.muted"
                    >
                        ギフト用
                    </Checkbox.Label>
                    <Checkbox.HiddenInput />
                </Checkbox.Root>

                <VStack w="full" gap="2" py="2">
                    <Field.Root maxW="2xl" w="full">
                        <Field.Label
                            fontSize="sm"
                            color="fg.muted"
                            fontWeight="medium"
                        >
                            備考
                        </Field.Label>
                        <Textarea
                            placeholder="ご要望などがあればこちらに記入ください。"
                            id="message"
                            rows={4}
                            bg="bg.default"
                            fontSize="sm"
                        />
                    </Field.Root>
                </VStack>
            </VStack>

            <Box pb="4">
                <Button
                    w="72"
                    borderRadius="lg"
                    colorPalette="blue"
                    onClick={() => navigate("/cart/payment")}
                >
                    お支払いに進む
                </Button>
            </Box>

            {/* AddressEdit モーダル */}
            <Dialog.Root
                open={showAddressModal()}
                onOpenChange={(e) => setShowAddressModal(e.open)}
            >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        w="full"
                        maxW="sm"
                        maxH="80vh"
                        overflowY="auto"
                        p="0"
                    >
                        <Dialog.CloseTrigger
                            asChild={(triggerProps) =>
                                <CloseButton {...triggerProps()} />
                            }
                        />
                        <AddressEdit
                            editingUser={editingUser()}
                            onSave={handleModalSubmit}
                            onCancel={() => setShowAddressModal(false)}
                            onOpenChange={setShowAddressModal}
                        />
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>

            {/* 削除確認モーダル */}
            <ConfirmDeleteModal
                open={!!deletingUser()}
                targetName={`${deletingUser()?.lastName ?? ""}${deletingUser()?.firstName ?? ""}`}
                onConfirm={confirmDelete}
                onCancel={() => setDeletingUser(null)}
                onOpenChange={(open) => { if (!open) setDeletingUser(null); }}
            />
        </VStack>
    );
}
