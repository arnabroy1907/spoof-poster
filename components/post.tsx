/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import st from 'styled-components';
import { Post as PostType } from '../service/models';
import Image from 'next/image';
import { LikeIcon } from './likeIcon';

type PostProps = {
    post: PostType;
}

type TextImageProps = {
    backgroundColor: string;
    fontColor: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
}

type LikeProps = {
    isLiked: boolean;
}

const PostContainer = st.div`
    min-width: 25rem;
    margin: 3rem 0;
    border: solid #ccc 1px;
    box-shadow: 0 0 5px 2px #ccc;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 480px) {
        width: 18rem;
    }
`;

const PostHeaderSection = st.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    color: #000;
    border-bottom: solid #ccc 1px;
`;

const PostHeaderSectionImage = st.div`
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    background-color: #aaa;
`;

const PostHeaderSectionName = st.div`
    margin: 0 1rem;
    h4 {
        font-size: 16px;
        margin: 0;
    }
    h5 {
        font-size: 12px;
        color: #aaa;
        margin: 0;
    }
`;

const PostImageSection = st.div`
    position: relative;
    width: 35rem;
    height: 35rem;
`;

const TextTemplateImage = st.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    line-height: 2;
    width: 100%;
    height: 100%;
    background-color: ${(props: TextImageProps) => props.backgroundColor};
    color: ${(props: TextImageProps) => props.fontColor};
    font-size: ${(props: TextImageProps) => props.fontSize};
    font-weight: ${(props: TextImageProps) => props.fontWeight};
    font-style: ${(props: TextImageProps) => props.fontStyle};
    font-family: ${(props: TextImageProps) => props.fontFamily};
`;

const PostContentSection = st.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    color: #000;
    border-bottom: solid #ccc 1px;
`;



export const Post = (props: PostProps) => {
    const post = props.post;

    return (
        <PostContainer>
            <PostHeaderSection>
                <PostHeaderSectionImage>
                    <Image
                        src={post.user.pic || '/images/no-pic-user.png'}
                        alt={post.user.userId}
                        layout='fill'
                    />
                </PostHeaderSectionImage>
                <PostHeaderSectionName>
                    <h4> {post.user.name} </h4>
                    <h5> {post.user.username} </h5>
                </PostHeaderSectionName>
            </PostHeaderSection>
            <PostImageSection>
                {(post.template === 'IMAGE' && post.image) ? (
                    <Image
                        layout='fill'
                        src={post.image}
                        alt={post.headline}
                    />
                ) : ( post.textData ? (
                    <TextTemplateImage {...post.textData?.style}>
                        {post.textData.text}
                    </TextTemplateImage>
                ): (<></>))}
            </PostImageSection>
            <PostContentSection>
                <LikeIcon
                    width='1.5rem'
                    height='1.5rem'
                    isLiked={false}
                    setIsLiked={() => { 
                        // DB Ops
                    }}
                />
            </PostContentSection>
        </PostContainer>
    );
}
