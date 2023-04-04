export interface IEmailRequest {
    to: string
    subject: string
    text: string
}


export interface UserBody {
    name: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface ResetPassword {
    token: string;
    password: string;
}