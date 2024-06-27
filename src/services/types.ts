export const StatusCodeEnum = {
    NOT_FOUND: 404,
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 403,
    MULTI_STATUS: 207,
    TIMEOUT: 524
};

export interface LoginResponse {
    message: string
    body: {
        token: string
        id: string
        name: string
        email: string
    }
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    nome: string
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string
    body: {
        id: string
        name: string
        email: string
    }
}

export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
    id?: string
}

export interface RecoveryPasswordRequest {
    email: string | string[],
    token: string,
    newPassword: string
}

export interface ISendMessageToAI {
    session_id: string
    user_id_ext: string
    text: string
    sender_type: string
    create_session: boolean
}

export interface IResponseMessageFromAI {
    session_id: string
    user_id_ext: string
    text: string
    sender_type: string
}
