import { Pencil, Trash2 } from "lucide-solid";
import { Box, Flex, VStack, HStack } from "styled-system/jsx";
import { IconButton } from "~/components/ui/icon-button";
import * as RadioGroup from "~/components/ui/radio-group";
import type { User } from "~/types";

interface AddressCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export const AddressCard = (props: AddressCardProps) => {
    return (
        <Flex
            w="full"
            align="center"
            justify="space-between"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.6"
            p="4"
            bg="bg.default"
        >
            <HStack gap="2">
                {/* 配送先選択ラジオボタン */}
                <RadioGroup.Item
                    value={String(props.user.id)}
                    mt="1"
                    mr="1"
                >
                    <RadioGroup.ItemControl />
                    <RadioGroup.ItemHiddenInput />
                </RadioGroup.Item>

                <VStack gap="0" fontSize="sm" alignItems="start">
                    <Box fontWeight="medium">
                        {props.user.lastName}{props.user.firstName}
                    </Box>
                    <Box color="fg.muted">
                        〒{props.user.postalCode}
                    </Box>
                    <Box color="fg.muted" textAlign="start">
                        {props.user.prefecture}{props.user.address1}{props.user.address2 || ""}
                    </Box>
                    <Box color="fg.muted">{props.user.phoneNumber}</Box>
                </VStack>
            </HStack>

            {/* 操作ボタンエリア */}
            <HStack gap="1" ml="2">
                <IconButton
                    variant="plain"
                    onClick={() => props.onEdit(props.user)}
                    aria-label="編集"
                    colorPalette="green"
                >
                    <Pencil size={16} />
                </IconButton>

                <IconButton
                    variant="plain"
                    onClick={() => props.onDelete(props.user)}
                    aria-label="削除"
                    colorPalette="red"
                    visibility={props.user.isPrimary ? "hidden" : "visible"}
                >
                    <Trash2 size={16} />
                </IconButton>
            </HStack>
        </Flex>
    );
};
