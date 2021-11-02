import React, { useEffect } from 'react';
import st from 'styled-components';
import { Post } from '../../components/post';
import { getAllPosts } from '../../service/db/dummy-data';
import { Post as PostType } from '../../service/models';

const FeedsContainer = st.div`
    margin-top: -1.5rem;
    width: 70%;
    min-width: 27rem;
    background-color: #fff;
    box-shadow: 0 0 10px 2px #ccc;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 599px) {
        width: 100%;
        min-width: 19rem;
    }
    @media only screen and (min-width: 599px) and (max-width: 900px) {
        width: 85%;
        min-width: 27rem;
    }
`;

interface FeedsProps {
    posts: PostType[];
}

const FeedsListPage = (props: FeedsProps) => {

    useEffect(() => {
        // scrolls to page top
        window.history.scrollRestoration = 'manual'
    }, []);

    return (
        <FeedsContainer>
            {props.posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </FeedsContainer>
    );
}

export const getServerSideProps = async (context: any) => {
    const postList = await getAllPosts(50);
    return {
        props: {
            posts: postList
        }
    }
};

export default FeedsListPage;
