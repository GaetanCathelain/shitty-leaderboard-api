export interface Identifiable {
    id: string;
}

export interface User extends Identifiable {
    username: string;
}
