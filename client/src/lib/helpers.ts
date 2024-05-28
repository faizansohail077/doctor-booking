import { jwtDecode } from 'jwt-decode' // import dependency
import toast from 'react-hot-toast';

export const getToken = () => {
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token')!;
    }
    return token!;
}

export const removeToken = () => {
    localStorage.removeItem('token')!;
    return;
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
    email: string
}

export const errorHandler = ( error: any) => {
    if (error?.response?.data?.message) {
        return toast.error(error?.response?.data?.message)
    } else {
        toast.error("Something Went Wrong")
    }
}