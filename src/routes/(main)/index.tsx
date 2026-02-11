import { For } from "solid-js";
import { Box, Flex, VStack, Grid } from "styled-system/jsx";
import { SelectCalendar } from "~/components/common/SelectCalendar";
import { ProductCard } from "./_components/ProductCard";
import type { Product } from "~/types";

import productsData from "~/data/products.json";

export default function ProductListPage() {
  return (
    <Box
      as="main"
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >

      {/* タイトル・ロゴセクション */}
      <VStack
        mb="4"
        w="full"
      >
        {/* 画像などを使う際は要調整 */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          align="center"
          gap={{ base: "2", sm: "4" }}
        >
          <Box
            w="40"
            h="16"
            bg="gray.6"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              color="white"
              fontWeight="bold"
              fontSize="2xl"
            >
              ロゴなど
            </Box>
          </Box>
          <Box
            as="h1"
            fontSize={{ base: "2xl!", sm: "4xl!" }}
            m="1!"
          >
            オイスターマーケット
          </Box>
        </Flex>

        <Box
          maxW="xl"
          textAlign="start"
          fontSize={{ base: "xs", sm: "sm" }}
          color="fg.muted"
        >
          新鮮な牡蠣を産地から直接お届けします。期間限定の旬の味をお楽しみください。
        </Box>
      </VStack>

      {/* メインコンテンツセクション */}
      <Box w="full">
        {/* 出荷不可日カレンダー　*/}
        <Flex mb="4" w="full" justify="flex-end">
          <SelectCalendar />
        </Flex>

        {/* 商品パネル（グリッド） */}
        <Grid
          columns={{ base: 2, md: 3, xl: 4 }}
          gap={{ base: 4, md: 6 }}
        >
          <For each={productsData as Product[]}>
            {(product) => (
              <ProductCard product={product} />
            )}
          </For>
        </Grid>
      </Box>
    </Box>
  );
}