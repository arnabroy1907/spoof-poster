import React, { useState, useEffect } from 'react';
import st from 'styled-components';
import { Comment, Reply, UserBase } from '../service/models';
import Image from 'next/image';
import { getStringedDate } from '../libs/utils/common.utils';
import { getAllPosts } from '../service/db/dummy-data';
import { useRouter } from 'next/router';

type CommentProps = {
    comment: Comment;
}

type UserProps = {
    user: UserBase;
}

type ButtonProps = {
    isDisabled: boolean;
}

const CommentWrapper = st.div`
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
`;

const UserSection = st.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    color: #000;
`;

const UserImage = st.div`
    position: relative;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: solid 1px #78f;
    overflow: hidden;
    background-color: #aaa;
`;

const UserName = st.div`
    margin: 0 1rem;
    cursor: pointer;
    h4 {
        font-size: 12px;
        margin: 0;
    }
    h5 {
        font-size: 10px;
        color: #aaa;
        margin: 0;
    }
`;

const CommentDateSection = st.div`
    color: #aaa;
    font-size: 12px;
    font-weight: 700;
    padding: 0 1rem;
    padding-left: 3rem;
`;

const CommentTextSection = st.div`
    padding: 0 1rem;
    padding-bottom: 0.5rem;
    padding-left: 3rem;
    font-size: 14px;
`;

const ReplySection = st.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-left: 2.5rem;
`;

const AddReplySection = st.form`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    width: 100%;

    input {
        width: 100%;
        font-size: 16px;
        border: solid 1px #ccc;
        border-radius: 1.5rem;
        outline: none;
        padding: 0.5rem;
        font-size: 12px;
        height: 1.5rem;
        color: #555;
        background-color: #f0f0f0;
    }
`;

const ViewRepliesSection = st.div`
    width: 100%;
`;

const ViewRepliesButton = st.div`
    width: fit-content;
    padding: 0.25rem;
    margin-left: 1.5rem;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    color: #aaa;
    &:hover {
        color: #000;
    }
`;

const ReplyPostButton = st.button<ButtonProps>`
    opacity: ${(props: ButtonProps) => props.isDisabled ? '0.5' : '1'};
    margin-left: 0.5rem;
    color: #04a;
    font-weight: 700;
    cursor: ${(props: ButtonProps) => props.isDisabled ? 'not-allowed' : 'pointer'};
    background-color: #fff;
    border: none;
    outline: none;
    @media only screen and (max-width: 480px) {
        font-size: 16px;
    }
`;

const ReplyWrapper = st.div``;

const UserItem = (props: UserProps) => {

    const user = props.user;

    const rtr = useRouter();

    const goToUserPage = () => {
        rtr.push(`/user/${user.userId}`);
    }

    return (
        <UserSection>
            <UserImage onClick={goToUserPage}>
                <Image
                    src={user.pic || '/images/no-pic-user.png'}
                    alt={user.userId}
                    layout='fill'
                />
            </UserImage>
            <UserName onClick={goToUserPage}>
                <h4> {user.name} </h4>
                <h5> {user.username} </h5>
            </UserName>
        </UserSection>
    )
};

export const CommentItem = (props: CommentProps) => {
    const comment = props.comment;
    
    const [showReplySection, setShowReplySection] = useState(false);
    const [replyBtnDisabled, setReplyBtnDisabled] = useState(true);
    const [viewReplies, setViewReplies] = useState(false);
    const [replyList, setReplyList] = useState<Reply[]>([]);
    const [replyVal, setReplyVal] = useState('');
    const [repliesCount, setRepliesCount] = useState(comment.repliesCount);

    const doReplySubmit = async (e: any) => {
        e.preventDefault();
        setReplyBtnDisabled(true);
        // Do API Calls

        // Dummy submission delay
        await getAllPosts(30);

        // On Success
        setReplyVal('');
        setRepliesCount(repliesCount + 1);
    }

    const doViewReplies = async () => {
        if (viewReplies) {
            setViewReplies(false);
            return;
        };

        // Load Replies from DB
        await getAllPosts(30);

        const dbReplyList: Reply[] = [
            {
                createdDate: new Date().getTime(),
                text: 'somet higns lkakjdhaskhakh dkjahs dkajshdkashdkjhasd',
                id: `gajsjdvahjs-bsjdhbsajd-${Math.random()}`.replace('.', '-'),
                user: {
                    userId: '21490993-8c96-4709-9ec6-31df9e30589e',
                    username: 'user_three3',
                    name: 'User Three',
                    pic: 'https://ik.imagekit.io/zn7zdwokee9/old_man_prof.png'
                }
            }
        ];

        setReplyList(dbReplyList);
        setRepliesCount(dbReplyList.length);
        setViewReplies(true);
    };

    return (
        <CommentWrapper>
            <UserItem user={comment.user} />
            <CommentDateSection> {getStringedDate(comment.createdDate)} </CommentDateSection>
            <CommentTextSection> {comment.text} </CommentTextSection>
            <ReplySection>
                {(repliesCount > 0) && 
                    <ViewRepliesSection>
                        <ViewRepliesButton onClick={doViewReplies}>
                            {viewReplies ? 'Hide Replies' : `View Previous Replies (${repliesCount})`}
                        </ViewRepliesButton>
                        {viewReplies && replyList.map(reply => (
                            <ReplyWrapper key={reply.id}>
                                <UserItem user={reply.user} />
                                <CommentDateSection> {getStringedDate(reply.createdDate)} </CommentDateSection>
                                <CommentTextSection> {reply.text} </CommentTextSection>
                            </ReplyWrapper>
                        ))}
                    </ViewRepliesSection>
                }
                <AddReplySection onSubmit={doReplySubmit}>
                    <input
                        type="text"
                        name="reply"
                        placeholder="Add a reply..."
                        value={replyVal}
                        onChange={(e: any) => {
                            setReplyVal(e.target.value);
                            if (e.target.value && e.target.value.length > 0) {
                                setReplyBtnDisabled(false);
                            } else {
                                setReplyBtnDisabled(true);
                            }
                        }}
                    />
                    <ReplyPostButton isDisabled={replyBtnDisabled}> Post </ReplyPostButton>
                </AddReplySection>
                
            </ReplySection>
        </CommentWrapper>
    );
};
