export interface TextDataType {
    text: string;
    style: {
        backgroundColor: string;
        fontColor: string;
        fontSize: string;
        fontWeight: string;
        fontStyle: string;
        fontFamily: string;
    }
}
export interface UserBase {
    userId: string;
    username: string;
    name: string;
    pic: string;
}

export interface User extends UserBase {
    email: string;
    passwordHash: string;
    createdDate: number;
    bio: string;
}

export interface Post {
    id: string;
    user: UserBase;
    template: 'TEXT'|'IMAGE';
    image?: string;
    textData?: TextDataType;
    caption?: string;
    headline: string;
    likesCount: number;
    commentsCount: number;
    createdDate: number;
    likedByUser: boolean;
}

export interface Comment {
    id: string;
    user: UserBase;
    text: string;
    repliesCount: number;
    createdDate: number;
}

export interface Reply {
    id: string;
    user: UserBase;
    text: string;
    createdDate: number;
}

export interface Like {
    id: string;
    user: UserBase;
    postId: string;
    createdDate: number;
}

export interface Chat {}