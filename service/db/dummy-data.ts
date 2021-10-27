import {
    User,
    Post,
    Comment,
    Reply,
    Like,
    Chat
} from '../models';
import uuid from 'uuid';

const timeMillis = new Date().getTime();

const userOne: User = {
    userId: uuid.v4(),
    email: 'userone@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User One',
    bio: 'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
    pic: 'https://ik.imagekit.io/zn7zdwokee9/Devme_N7FY5h9s_.png',
    createdDate: timeMillis
};

const userTwo: User = {
    userId: uuid.v4(),
    email: 'usertwo@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Two',
    bio: 'A Version 4 UUID is a universally unique identifier that is generated using random numbers. The Version 4 UUIDs produced by this site were generated using a secure random number generator.',
    pic: '',
    createdDate: timeMillis
};

const userThree: User = {
    userId: '21490993-8c96-4709-9ec6-31df9e30589e',
    email: 'userthree@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Three',
    bio: 'A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the MAC address of the computer on which it was generated.',
    pic: 'https://ik.imagekit.io/zn7zdwokee9/Devme_N7FY5h9s_.png',
    createdDate: timeMillis
};

const userFour: User = {
    userId: uuid.v4(),
    email: 'userfour@mail.com',
    passwordHash: 'asdasdasd',
    name: 'User Four',
    bio: 'A Version 4 UUID is a universally unique identifier that is generated using random numbers. The Version 4 UUIDs produced by this site were generated using a secure random number generator.',
    pic: '',
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
    'Gentlemen, you can’t fight in here. This is the war room.',
    'I haven’t spoken to my wife in years. I didn’t want to interrupt her.',
    'I’m not insane. My mother had me tested.'
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
    userFour
];

const getRandomFromRange = (start: number, end: number): number => {
    const exEnd = end + 1;
    return Math.max(Math.min(start + Math.floor(Math.random() * (exEnd - start)), end), start);
};

const generatePosts = (size: number): Post[] => {
    const postsArray: Post[] = [];

    for (let i = 0; i < size; i++) {
        const template = (getRandomFromRange(1, 10) % 2 === 0) ? 'TEXT' : 'IMAGE';
        if (template === 'TEXT') {
            const text = textArr[getRandomFromRange(0, 4)];
            postsArray.push({
                id: uuid.v4(),
                userId: userArr[getRandomFromRange(0, 4)].userId,
                template: template,
                textData: {
                    text: text,
                    style: {
                        fontColor: '#000',
                        fontFamily: 'Aspira',
                        fontSize: '16px',
                        fontWeight: '500',
                        fontStyle: 'normal',
                        backgroundColor: bgColorArr[getRandomFromRange(0, 4)],
                    }
                },
                headline: text.substring(0, 20),
                createdDate: new Date().getTime(),
                likesCount: Math.floor(Math.random() * 5000),
                commentsCount: Math.floor(Math.random() * 500)
            });
        } else {
            const text = textArr[getRandomFromRange(0, 4)];
            postsArray.push({
                id: uuid.v4(),
                userId: userArr[getRandomFromRange(0, 4)].userId,
                template: template,
                image: memeImageSrcs[getRandomFromRange(0, 6)],
                caption: text,
                headline: text.substring(0, 20),
                createdDate: new Date().getTime(),
                likesCount: Math.floor(Math.random() * 5000),
                commentsCount: Math.floor(Math.random() * 500)
            });
        }
    }

    return postsArray;
}

const posts = generatePosts(50);

export const getPostsByUser = async (userId: string) => {
    return new Promise<Post[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(posts.filter(post => post.userId === userId));
        }, 100);
    });
};

export const getAllPosts = async () => {
    return new Promise<Post[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(posts);
        }, 100);
    });
};