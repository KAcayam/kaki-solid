export type ProductCategory = 'withShell' | 'noShell';

// 商品データの基本型
export interface Product {
    id: string | number;
    name: string;
    category: ProductCategory;
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
    category: ProductCategory;
    price: number;
    quantity: number;
    img: string | null;
}

// 数量選択の型
export interface QuantitySelectProps {
    name: string;
    label: string;
    value: string[];
    onValueChange: (value: string[]) => void;
    suffix: string;
    max?: number;
}