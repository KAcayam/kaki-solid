/* src/types/index.ts */

// 商品データの基本型
export interface Product {
    id: string | number;
    name: string;
    type?: string;
    image?: string | null;
    price?: number;
    isLoggedInRequired?: boolean;
    inStock?: boolean;
    description?: string;
    detailImages?: string[];
}

// 商品種別の定義
export type ProductType = 'withShell' | 'noShell' | 'noImage';

// カート内商品の型（Product型をベースに拡張）
export interface CartItem {
    id: string;
    title: string;
    variant: string;
    price: number;
    quantity: number;
    img: string | null;
    type: ProductType;
}