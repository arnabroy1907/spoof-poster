import React from 'react';
import st from 'styled-components';
import { Post as PostType, Comment} from '../../service/models';
import { getPostById } from '../../service/db/dummy-data';
import { Post } from '../../components/post';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

const PostContainer = st.div`
    background-color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    min-width: 27rem;
    @media only screen and (max-width: 480px) {
        width: 100%;
        min-width: 19rem;
    }
`;

type SinglePostPageProps = {
    post: PostType;
    commentList: Comment[];
};

const SinglePostPage = (props: SinglePostPageProps) => {
    return(
        <PostContainer>
            <Post post={props.post} showComments={true} commentList={props.commentList} />
        </PostContainer>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params, req, res} = context;

    const postId = params && params.slug && params.slug[0];
    if (!postId) {return { props: {}}};

    const data = await getPostById(postId);

    const response: GetServerSidePropsResult<SinglePostPageProps> = {
        props: {
            post: data.post,
            commentList: data.commentList
        }
    };
    return response;
};

export default SinglePostPage;
