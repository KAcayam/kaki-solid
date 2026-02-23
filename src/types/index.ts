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

// 商品カテゴリの型
export type ProductCategory = 'withShell' | 'noShell';

// カートのステッパーなどを含むレイアウトの型
export interface CartConfig {
    step: number;
    title: string;
    backTo: string;
    backLabel: string;
}

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

// 注文ステータスの型
export type OrderStatus = '注文受付' | '入金待ち' | '発送準備中' | 'キャンセル済み' | '配達完了';

// 注文商品の型（Product + 数量）
export interface OrderProduct extends Product {
    quantity: number;
}

// 注文履歴の型
export interface Order {
    id: string;
    orderDate: string;
    orderNumber: string;
    totalAmount: number;
    status: OrderStatus;
    subtotal: number;
    shippingCost: number;
    products: OrderProduct[];
}

// ユーザー情報の型
export interface User {
    id?: string;
    lastName: string;
    firstName: string;
    lastNameKana: string;
    firstNameKana: string;
    email: string;
    postalCode: string;
    prefecture: string;
    address1: string;
    address2?: string | null;
    phoneNumber: string;
    receiveCampaignEmails: boolean;
    isPrimary?: boolean;
}

// フォームの型
export interface FormFieldProps {
    label: string;
    error?: string;
    helperText?: string;
    showAsterisk?: boolean;
}

export interface ComboboxItem {
    label: string;
    value: string;
}

export interface ConfirmAccountUpdateModalProps {
    open: boolean;
    tempAccount: User;
    onConfirm: () => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export interface ConfirmSignupModalProps {
    open: boolean;
    tempAccount: User;
    onConfirm: () => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export interface ConfirmGuestModalProps {
    open: boolean;
    tempAccount: User;
    onConfirm: () => void;
    onCancel: () => void;
    onOpenChange: (open: boolean) => void;
}

export interface ConfirmSendEmailProps {
    email: string;
    subject: string;
    message: string;
    onCancel: () => void;
    onSend: () => void;
}