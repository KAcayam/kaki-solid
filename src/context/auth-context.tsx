import { createContext, useContext, createSignal, ParentProps } from "solid-js";
import { useNavigate } from "@solidjs/router";
import usersData from "~/data/users.json";
import { User } from "~/types";

interface AuthContextType {
    isLoggedIn: () => boolean;
    user: () => User | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: ParentProps) {
    // 初期状態はtrue（開発用）
    const [isLoggedIn, setIsLoggedIn] = createSignal(true);
    // For now, cast partial data to User type
    const [user, setUser] = createSignal<User | null>(
        (usersData as unknown as User[]).find(u => u.isPrimary) || (usersData[0] as unknown as User)
    );
    const navigate = useNavigate();

    const login = () => {
        setIsLoggedIn(true);
        // ログイン処理の実装（ユーザーデータの取得など）
        setUser((usersData as unknown as User[]).find(u => u.isPrimary) || (usersData[0] as unknown as User));
        navigate("/cart/customer-information");
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        // ログアウト後のリダイレクト等は必要に応じて
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
