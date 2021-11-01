import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import st from 'styled-components';
import { Post as PostType, Comment} from '../../service/models';
import { getPostById } from '../../service/db/dummy-data';
import { Post } from '../../components/post';

const PostContainer = st.div`
    background-color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
`;

const SinglePostPage = () => {
    const rtr = useRouter();

    const [postData, setPostData] = useState<PostType>();
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    const postId = rtr && rtr.query && rtr.query.slug && rtr.query.slug[0];

    useEffect(() => {
        const getData = async () => {
            if (!postId) return;
            const data = await getPostById(postId);
            if (data && data.post && data.commentList) {
                setPostData(data.post);
                setCommentList(data.commentList);
            }
            setIsLoading(false);
        }

        getData();
    }, [postId]);

    if (!isLoading && !postData && postId) {
        return <h1> Error </h1>
    }

    if (isLoading) {
        return <h1> Loading... </h1>
    }

    return(
        <PostContainer>
            {postData && 
                <Post post={postData} showComments={true} commentList={commentList} />
            }
        </PostContainer>
    );
}

export default SinglePostPage;
