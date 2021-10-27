export interface User {
    userId: string;
    email: string;
    passwordHash: string;
    createdDate: number;
    name: string;
    bio: string;
    pic: string;
}

export interface Post {
    id: string;
    userId: string;
    template: 'TEXT'|'IMAGE';
    image?: string;
    textData?: {
        text: string;
        style: {
            backgroundColor: string;
            fontColor: string;
            fontSize: string;
            fontWeight: string;
            fontStyle: string;
            fontFamily: string;
        }
    };
    caption?: string;
    headline: string;
    likesCount: number;
    commentsCount: number;
    createdDate: number;
}

export interface Comment {
    id: string;
    userId: string;
    text: string;
    repliesCount: number;
    createdDate: number;
}

export interface Reply {
    id: string;
    userId: string;
    text: string;
    createdDate: number;
}

export interface Like {
    id: string;
    userId: string;
    postId: string;
    createdDate: number;
}

export interface Chat {}