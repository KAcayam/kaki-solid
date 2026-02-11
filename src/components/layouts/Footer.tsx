import { HStack, Box } from "../../../styled-system/jsx";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <HStack
            as="footer"
            h="12"
            borderTopWidth="1px"
            justify="center"
        >
            <Box
                as="p"
                fontSize="xs"
                color="gray.10"
            >
                ©{currentYear} Oyster Market. All rights reserved.
            </Box>
        </HStack>
    );
};
