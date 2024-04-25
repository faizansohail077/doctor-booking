import jwt from "jsonwebtoken"

type TokenType = {
    _id: string,
    isApproved: boolean,
    isBlocked: boolean,
    isProfileCompleted: boolean,
    role: string
}
export const sendToken = async (value: TokenType) => {
    const token = await jwt.sign({ user_id: value?._id, isApproved: value?.isApproved, isBlocked: value?.isBlocked, isProfileCompleted: value?.isProfileCompleted, role: value.role }, process.env.JWT_SECRET!, { expiresIn: '1h' })
    return token
}