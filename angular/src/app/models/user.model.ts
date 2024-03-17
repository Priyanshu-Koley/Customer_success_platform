export interface User {
    created_at: string;
    email: string;
    email_verified: boolean;
    identities: Identity[];
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
    last_login: string;
    last_ip: string;
    logins_count: number;
}

interface Identity {
    connection: string;
    provider: string;
    user_id: string;
    isSocial: boolean;
}
