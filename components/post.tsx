/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import st from 'styled-components';
import { Post as PostType, Comment } from '../service/models';
import Image from 'next/image';
import { LikeIcon } from './likeIcon';
import { getStringedDate } from '../libs/utils/common.utils';
import { getAllPosts } from '../service/db/dummy-data';
import { useRouter } from 'next/router';
import { CommentItem } from './comment';

type PostProps = {
    post: PostType;
    showComments?: boolean;
    commentList?: Comment[]
}

type TextImageProps = {
    backgroundColor: string;
    fontColor: string;
    fontSize: string;
    fontWeight: string;
    fontStyle: string;
    fontFamily: string;
}

type ButtonProps = {
    isDisabled: boolean;
}

const PostMainWrapper = st.div`
    width: 100%;
`;

const PostContainer = st.div`
    width: 100%;
    margin: 3rem 0;
    border: solid #ccc 1px;
    box-shadow: 0 0 5px 2px #ccc;
    display: flex;
    flex-direction: column;
    @media only screen and (min-width: 599px) and (max-width: 900px) {
        width: 80%;
    }
    @media only screen and (max-width: 599px) {
        width: 100%;
    }
`;

const PostCommentsContainer = st.div`
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
    border: solid 1px #78f;
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
    width: 100%;
    height: 35rem;
    background-color: #000;
    @media only screen and (min-width: 599px) and (max-width: 900px) {
        height: 30rem;
    }
    @media only screen and (max-width: 480px) {
        width: 100%;
        height: 25rem;
    }
`;

const PostTextSection = st(PostImageSection)`
    height: fit-content;
`;

const TextTemplateImage = st.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 5rem;
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
    border-top: solid #ccc 1px;
`;

const CommentIconWrapper = st.div`
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;
    margin: 0;
    margin-left: 0.5rem;
    cursor: pointer;
    svg {
        fill: #333;
        position: relative;
        top: -4px;
        path {
            stroke-width: 4px;
            stroke: #333;
        }
    }
`;

const PostLCCounts = st.span`
    font-size: 14px;
    color: #222;
    margin: 0 0.25rem;
    width: 2.75rem;
`;

const PostAddCommentSection = st.form`
    border-bottom: solid #ccc 1px;
    display: flex;
    align-items: center;
    padding: 0.5rem;

    input {
        width: 100%;
        font-size: 16px;
        border: none;
        outline: none;
        padding: 0.5rem;
        color: #555;
    }
`;

const PostCommentButton = st.button`
    opacity: ${(props: ButtonProps) => props.isDisabled ? '0.5' : '1'};
    margin-left: 0.5rem;
    color: #04a;
    font-size: 20px;
    font-weight: 700;
    cursor: ${(props: ButtonProps) => props.isDisabled ? 'not-allowed' : 'pointer'};
    background-color: #fff;
    border: none;
    outline: none;
    @media only screen and (max-width: 480px) {
        font-size: 16px;
    }
`;

const PostDateSection = st.div`
    border-bottom: solid #ccc 1px;
    color: #aaa;
    font-size: 12px;
    font-weight: 700;
    padding: 0 1rem;
    padding-bottom: 1rem;
`;

const PostCaptionSection = st.div`
    padding: 0 1rem;
    padding-bottom: 1rem;
    font-style: italic;
`;

const CommentIcon = (props: any) => {
    return (
        <CommentIconWrapper onClick={props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256.00098 256.00098" id="Flat">
                <path d="M216.00049,52.00049h-176a12.01343,12.01343,0,0,0-12,12V222.82422a11.88727,11.88727,0,0,0,6.93359,10.87793,12.05387,12.05387,0,0,0,5.09766,1.14111,11.91739,11.91739,0,0,0,7.69043-2.83349l32.2959-27.14942,2.35937-.85986H216.00049a12.01343,12.01343,0,0,0,12-12v-128A12.01343,12.01343,0,0,0,216.00049,52.00049Zm4,140a4.00428,4.00428,0,0,1-4,4H81.67139a3.99389,3.99389,0,0,0-1.37012.24219l-3.68555,1.34277a4.01,4.01,0,0,0-1.20508.69678l-32.83691,27.604a3.99985,3.99985,0,0,1-6.57324-3.062V64.00049a4.00426,4.00426,0,0,1,4-4h176a4.00427,4.00427,0,0,1,4,4Zm-56-80.00049a4.0002,4.0002,0,0,1-4,4h-64a4,4,0,0,1,0-8h64A4.0002,4.0002,0,0,1,164.00049,112Zm0,32a4.0002,4.0002,0,0,1-4,4h-64a4,4,0,0,1,0-8h64A4.0002,4.0002,0,0,1,164.00049,144Z" />
            </svg>  
        </CommentIconWrapper>
    );
};

export const Post = (props: PostProps) => {
    const post = props.post;
    const commentList = props.commentList || [];

    const [likesCount, setLikesCount] = useState(post.likesCount);
    const [commentsCount, setCommentsCount] = useState(post.commentsCount);
    const [commentValue, setCommentValue] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const caption = post.caption || post.textData?.text;

    const rtr = useRouter();

    const getCountString = (lcnt: number) => {
        const KCount = 1000;
        const MCount = KCount * 1000;
        const BCount = MCount * 1000;

        if (lcnt < KCount) return `${lcnt}`;

        if (lcnt >= KCount && lcnt < MCount) {
            const kVal = Math.floor(lcnt/KCount);
            const kpVal = Math.floor((lcnt % KCount) / (KCount / 10));
            return `${kVal}.${kpVal}k`;
        }

        if (lcnt >= MCount && lcnt < BCount) {
            const mVal = Math.floor(lcnt/MCount);
            const mpVal = Math.floor((lcnt % MCount) / (MCount / 10));
            return `${mVal}.${mpVal}m`;
        }

        if (lcnt >= BCount) {
            const bVal = Math.floor(lcnt/BCount);
            const bpVal = Math.floor((lcnt % BCount) / (BCount / 10));
            return `${bVal}.${bpVal}b`;
        }
    }

    const likesCountString = getCountString(likesCount);
    const commentCountString = getCountString(commentsCount);
    const dateString = getStringedDate(post.createdDate);

    const doCommentSubmit = async (e: any) => {
        e.preventDefault();
        setButtonDisabled(true);
        // Do API Calls

        // Dummy submission delay
        await getAllPosts(30);

        // On Success
        setCommentValue('');
        setCommentsCount(commentsCount + 1);
    }

    return (
        <PostMainWrapper>
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
            {(post.template === 'IMAGE' && post.image) ? (
                <PostImageSection>
                    <Image
                        layout={'fill'}
                        objectFit='contain'
                        src={post.image}
                        alt={post.headline}
                    />
                </PostImageSection>
            ) : ( post.textData ? (
                <PostTextSection>
                    <TextTemplateImage {...post.textData?.style}>
                        {post.textData.text}
                    </TextTemplateImage>
                </PostTextSection>
            ): (<></>))}
            <PostContentSection>
                <LikeIcon
                    width='1.5rem'
                    height='1.5rem'
                    isLiked={post.likedByUser}
                    likesCount={likesCount}
                    setLikesCount={(newCount: number) => {
                        setLikesCount(newCount);
                    }}
                    setIsLiked={() => { 
                        // DB Ops
                    }}
                />
                <PostLCCounts>
                    {likesCountString}
                </PostLCCounts>
                <CommentIcon
                    onClick={() => {
                        if (!props.showComments) {
                            rtr.push({
                                pathname: '/feeds/[...slug]',
                                query: {
                                    slug: [post.id, post.headline.toLowerCase().replaceAll(' ', '-')]
                                }
                            });
                        }
                    }}
                />
                <PostLCCounts>
                    {commentCountString}
                </PostLCCounts>
            </PostContentSection>
            <PostCaptionSection>
                {caption}
            </PostCaptionSection>
            <PostDateSection>
                {dateString}
            </PostDateSection>
            {!props.showComments && 
                <PostAddCommentSection
                    onSubmit = {doCommentSubmit}
                >
                    <input
                        type='text'
                        name='comment-input'
                        placeholder='Add a comment...'
                        value={commentValue}
                        onChange={(e) => {
                            setCommentValue(e.target.value);
                            if (e.target.value.length > 0) setButtonDisabled(false);
                            else setButtonDisabled(true);
                        }}
                    />
                    <PostCommentButton
                        isDisabled={buttonDisabled}
                    > Post </PostCommentButton>
                </PostAddCommentSection>
            }
        </PostContainer>
            <PostCommentsContainer>
                {commentList.map(comment => <CommentItem key={comment.id} comment={comment}/>)}
            </PostCommentsContainer>
        </PostMainWrapper>
    );
}
