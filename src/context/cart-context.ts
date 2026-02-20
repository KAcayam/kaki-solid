import { createContext, useContext } from "solid-js";
import type { Accessor } from "solid-js";
import { CartConfig, CartItem } from "~/types";

export interface CartContextType {
    // レイアウト設定（ステッパー、タイトル等）
    config: Accessor<CartConfig>;
    setConfig: (config: CartConfig) => void;

    // カートアイテム管理
    items: Accessor<CartItem[]>;
    removeItem: (id: string) => void;
    changeQty: (id: string, qty: number) => void;
}

export const CartContext = createContext<CartContextType>();
export const useCartContext = () => useContext(CartContext);
