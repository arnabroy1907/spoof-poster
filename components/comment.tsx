import React, { useState, useEffect } from 'react';
import st from 'styled-components';
import { Comment, UserBase } from '../service/models';
import Image from 'next/image';
import { getStringedDate } from '../libs/utils/common.utils';
import { getAllPosts } from '../service/db/dummy-data';

type CommentProps = {
    comment: Comment;
}

type UsertProps = {
    user: UserBase;
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
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: solid 1px #78f;
    overflow: hidden;
    background-color: #aaa;
`;

const UserName = st.div`
    margin: 0 1rem;
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
`;

const ViewRepliesSection = st.div`
    width: 12rem;
    padding: 0 1rem;
    padding-bottom: 0.5rem;
    font-size: 12px;
    margin-left: 5rem;
    cursor: pointer;
    color: #aaa;
    &:hover {
        color: #000;
    }
`;

const UserItem = (props: UsertProps) => {

    const user = props.user;

    return (
        <UserSection>
            <UserImage>
                <Image
                    src={user.pic || '/images/no-pic-user.png'}
                    alt={user.userId}
                    layout='fill'
                />
            </UserImage>
            <UserName>
                <h4> {user.name} </h4>
                <h5> {user.username} </h5>
            </UserName>
        </UserSection>
    )
};

export const CommentItem = (props: CommentProps) => {

    const comment = props.comment;

    return (
        <CommentWrapper>
            <UserItem user={comment.user} />
            <CommentDateSection> {getStringedDate(comment.createdDate)} </CommentDateSection>
            <CommentTextSection> {comment.text} </CommentTextSection>
            {(comment.repliesCount > 0) && <ViewRepliesSection> --- View Replies({comment.repliesCount}) --- </ViewRepliesSection>}
        </CommentWrapper>
    );
};
