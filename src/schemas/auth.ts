import { z } from 'zod';

// ログイン用のスキーマ
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: '必須項目です' })
        .pipe(z.email({ message: '有効なメールアドレスを入力してください' })),

    password: z.string().min(8, { message: 'パスワードが違います' })
});

// 新規登録・アカウント編集用のベーススキーマ（フィールド単位バリデーション用）
export const signupBaseSchema = z.object({
    email: z
        .string()
        .min(1, { message: '必須項目です' })
        .pipe(z.email({ message: '有効なメールアドレスを入力してください' })),

    password: z.string().min(8, { message: '半角英数字8文字以上にしてください' }),

    passwordConfirm: z.string().min(1, { message: '必須項目です' }),

    lastName: z.string().min(1, { message: '必須項目です' }),
    firstName: z.string().min(1, { message: '必須項目です' }),

    lastNameKana: z.string().min(1, { message: '必須項目です' }),
    firstNameKana: z.string().min(1, { message: '必須項目です' }),

    postalCode: z.string().min(1, { message: '必須項目です' }),
    prefecture: z.string().min(1, { message: '必須項目です' }),
    address1: z.string().min(1, { message: '必須項目です' }),
    address2: z.string().optional().nullable(), // null データを許容するように修正
    phoneNumber: z.string().min(1, { message: '必須項目です' })
});

// 新規登録・アカウント編集用のスキーマ（refine付き）
export const signupSchema = signupBaseSchema
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'パスワードが一致しません',
        path: ['passwordConfirm']
    });

// パスワード変更用のスキーマ
export const passwordChangeSchema = z
    .object({
        password: z.string().min(8, { message: '半角英数字8文字以上にしてください' }),
        passwordConfirm: z.string().min(1, { message: '必須項目です' })
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'パスワードが一致しません',
        path: ['passwordConfirm']
    });

// ゲスト購入用のスキーマ
export const guestSchema = z.object({
    lastName: z.string().min(1, { message: '必須項目です' }),
    firstName: z.string().min(1, { message: '必須項目です' }),

    lastNameKana: z.string().min(1, { message: '必須項目です' }),
    firstNameKana: z.string().min(1, { message: '必須項目です' }),

    postalCode: z.string().min(1, { message: '必須項目です' }),
    prefecture: z.string().min(1, { message: '必須項目です' }),
    address1: z.string().min(1, { message: '必須項目です' }),
    address2: z.string().optional().nullable(), // null データを許容するように修正
    phoneNumber: z.string().min(1, { message: '必須項目です' }),
    email: z
        .string()
        .min(1, { message: '必須項目です' })
        .pipe(z.email({ message: '有効なメールアドレスを入力してください' }))
});

// 配送先情報用のスキーマ
export const addressSchema = z.object({
    lastName: z.string().min(1, { message: '必須項目です' }),
    firstName: z.string().min(1, { message: '必須項目です' }),
    postalCode: z.string().min(1, { message: '必須項目です' }),
    prefecture: z.string().min(1, { message: '必須項目です' }),
    address1: z.string().min(1, { message: '必須項目です' }),
    address2: z.string().optional().nullable(), // null データを許容するように修正
    phoneNumber: z.string().min(1, { message: '必須項目です' })
});

// お問い合わせ用のスキーマ
export const contactSchema = z.object({
    email: z
        .string()
        .min(1, { message: '必須項目です' })
        .pipe(z.email({ message: '有効なメールアドレスを入力してください' })),

    subject: z.string().min(1, { message: '必須項目です' }),

    message: z.string().min(1, { message: '必須項目です' })
});

// 型の抽出
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
export type GuestInput = z.infer<typeof guestSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ContactInput = z.infer<typeof contactSchema>;