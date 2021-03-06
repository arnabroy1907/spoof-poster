import {
    User,
    Post,
    Comment,
    Reply,
    Like,
    Chat,
    UserBase
} from '../models';
import * as uuid from 'uuid';

const timeMillis = new Date().getTime();

const userOne: User = {
    userId: uuid.v4(),
    username: 'user_one01',
    email: 'userone@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User One',
    bio: 'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
    pic: 'https://ik.imagekit.io/zn7zdwokee9/Devme_N7FY5h9s_.png',
    createdDate: timeMillis
};

const userTwo: User = {
    userId: uuid.v4(),
    username: 'user_two_2',
    email: 'usertwo@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Two',
    bio: 'A Version 4 UUID is a universally unique identifier that is generated using random numbers. The Version 4 UUIDs produced by this site were generated using a secure random number generator.',
    pic: '',
    createdDate: timeMillis
};

const userThree: User = {
    userId: '21490993-8c96-4709-9ec6-31df9e30589e',
    username: 'user_three3',
    email: 'userthree@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Three',
    bio: 'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
    pic: 'https://ik.imagekit.io/zn7zdwokee9/old_man_prof.png',
    createdDate: timeMillis
};

const userFour: User = {
    userId: uuid.v4(),
    username: 'user_04four',
    email: 'userfour@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Four',
    bio: 'A Version 4 UUID is a universally unique identifier that is generated using random numbers. The Version 4 UUIDs produced by this site were generated using a secure random number generator.',
    pic: '',
    createdDate: timeMillis
};

const userFive: User = {
    userId: uuid.v4(),
    username: 'user_five_01',
    email: 'userfive@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Five',
    bio: 'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
    pic: 'https://ik.imagekit.io/zn7zdwokee9/Devme_N7FY5h9s_.png',
    createdDate: timeMillis
};

const memeImageSrcs: string[] = [
    'https://ik.imagekit.io/zn7zdwokee9/meme5_Fgf4SyOxYHW.png',
    'https://ik.imagekit.io/zn7zdwokee9/meme4_oJjM-_O7Y.jpg',
    'https://ik.imagekit.io/zn7zdwokee9/meme3_Q3RAkNrTG.jpg',
    'https://ik.imagekit.io/zn7zdwokee9/meme1_ELGNowZZX.jpg',
    'https://ik.imagekit.io/zn7zdwokee9/meme2_EfM3RE7mUDE.jpg',
    'https://ik.imagekit.io/zn7zdwokee9/default-image.jpg'
];

const textArr: string[] = [
    'Tragedy is when I cut my finger. Comedy is when you fall into an open sewer and die.',
    'Gentlemen, you can???t fight in here. This is the war room.',
    'I haven???t spoken to my wife in years. I didn???t want to interrupt her.',
    'I???m not insane. My mother had me tested.'
];

const bgColorArr: string[] = [
    '#ffffaa',
    '#aaffaa',
    '#aaffff',
    '#aaaaff',
];

const userArr: User[] = [
    userOne,
    userTwo,
    userThree,
    userFour,
    userFive
];

const getRandomFromRange = (start: number, end: number): number => {
    const exEnd = end + 1;
    return Math.max(Math.min(start + Math.floor(Math.random() * (exEnd - start)), end), start);
};

const getBaseUserFromFullUser = (user: User): UserBase => {
    return {
        userId: user.userId,
        pic: user.pic,
        name: user.name,
        username: user.username
    }
}

const generatePosts = (size: number): Post[] => {
    const postsArray: Post[] = [];

    for (let i = 0; i < size; i++) {
        const template = (getRandomFromRange(1, 10) % 2 === 0) ? 'TEXT' : 'IMAGE';
        if (template === 'TEXT') {
            const text = textArr[getRandomFromRange(0, 3)];
            const user = userArr[getRandomFromRange(0, 4)];
            postsArray.push({
                id: uuid.v4(),
                user: getBaseUserFromFullUser(user),
                template: template,
                textData: {
                    text: text,
                    style: {
                        fontColor: '#000',
                        fontFamily: (getRandomFromRange(1, 10) > 7) ? 'Aspira' : 'cursive',
                        fontSize: '24px',
                        fontWeight: '700',
                        fontStyle: 'normal',
                        backgroundColor: bgColorArr[getRandomFromRange(0, 3)],
                    }
                },
                headline: text.substring(0, 20),
                createdDate: new Date().getTime(),
                likesCount: Math.floor(Math.random() * 5000),
                commentsCount: Math.floor(Math.random() * 500),
                likedByUser: (getRandomFromRange(1, 10) % 2 === 0)
            });
        } else {
            const text = textArr[getRandomFromRange(0, 3)];
            const user = userArr[getRandomFromRange(0, 4)];
            postsArray.push({
                id: uuid.v4(),
                user: getBaseUserFromFullUser(user),
                template: template,
                image: memeImageSrcs[getRandomFromRange(0, 5)],
                caption: text,
                headline: text.substring(0, 20),
                createdDate: new Date().getTime(),
                likesCount: Math.floor(Math.random() * 5000),
                commentsCount: Math.floor(Math.random() * 500),
                likedByUser: (getRandomFromRange(1, 10) > 7)
            });
        }
    }

    return postsArray;
}

const posts = generatePosts(50);

export const getPostsByUser = async (userId: string) => {
    return new Promise<Post[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(posts.filter(post => post.user.userId === userId || post.user.userId === userThree.userId));
        }, 100);
    });
};

export const getAllPosts = async (limit: number) => {
    return new Promise<Post[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(generatePosts(limit));
        }, 1000);
    });
};

export const getPostById = async (postId: string) => {
    let post: Post;

    const template = (getRandomFromRange(1, 10) % 2 === 0) ? 'TEXT' : 'IMAGE';
    if (template === 'TEXT') {
        const text = textArr[getRandomFromRange(0, 3)];
        const user = userArr[getRandomFromRange(0, 4)];
        post = {
            id: postId,
            user: getBaseUserFromFullUser(user),
            template: template,
            textData: {
                text: text,
                style: {
                    fontColor: '#000',
                    fontFamily: (getRandomFromRange(1, 10) > 7) ? 'Aspira' : 'cursive',
                    fontSize: '24px',
                    fontWeight: '700',
                    fontStyle: 'normal',
                    backgroundColor: bgColorArr[getRandomFromRange(0, 3)],
                }
            },
            headline: text.substring(0, 20),
            createdDate: new Date().getTime(),
            likesCount: Math.floor(Math.random() * 5000),
            commentsCount: Math.floor(Math.random() * 500),
            likedByUser: (getRandomFromRange(1, 10) % 2 === 0)
        };
    } else {
        const text = textArr[getRandomFromRange(0, 3)];
        const user = userArr[getRandomFromRange(0, 4)];
        post = {
            id: postId,
            user: getBaseUserFromFullUser(user),
            template: template,
            image: memeImageSrcs[getRandomFromRange(0, 5)],
            caption: text,
            headline: text.substring(0, 20),
            createdDate: new Date().getTime(),
            likesCount: Math.floor(Math.random() * 5000),
            commentsCount: Math.floor(Math.random() * 500),
            likedByUser: (getRandomFromRange(1, 10) > 7)
        };
    }

    const commentList: Comment[] = [];
    for (let i = 0; i < 10; i++) {
        commentList.push({
            text: textArr[getRandomFromRange(0, 3)],
            id: uuid.v4(),
            repliesCount: Math.floor(Math.random() * 10),
            createdDate: new Date().getTime(),
            user: getBaseUserFromFullUser(userArr[getRandomFromRange(0, 4)])
        });
    }

    return new Promise<{post: Post, commentList: Comment[]}>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                post: post,
                commentList: commentList
            });
        }, 1000);
    });
}

export const getLikedUsersByPost = async (postId: string) => {
    return new Promise<UserBase[]>((resolve, _reject) => {
        const likedUserList: UserBase[] = [];
        for (let i = 0; i < 50; i++) {
            const user = userArr[getRandomFromRange(0, 4)];
            likedUserList.push(getBaseUserFromFullUser(user));
        }
        
        setTimeout(() => {
            resolve(likedUserList);
        }, 300);
    });
}

export const getUserById = async (userId: string) => {
    return new Promise<User>((resolve, _reject) => {
        const user = userArr[getRandomFromRange(0, 4)];
        
        setTimeout(() => {
            resolve(user);
        }, 300);
    });
}