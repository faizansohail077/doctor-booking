import { jwtDecode } from 'jwt-decode' // import dependency

export const getToken = () => {
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
    }
    return token!;
}

export const getUser = () => {
    if (getToken()) {
        const user: JwtPayload = jwtDecode(getToken());
        return user
    }
}

export interface JwtPayload {
    exp: number;
    iat: number;
    isApproved: boolean;
    isBlocked: boolean;
    isProfileCompleted: boolean;
    role: "ADMIN" | "DOCTOR" | "PATIENT";
    user_id: string;
}