import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';
import st from 'styled-components';
import { ProfilePage } from '../../components/profilePage';
import { getPostsByUser, getUserById } from '../../service/db/dummy-data';
import { Post, User } from '../../service/models';

type ProfilePageProps = {
    user: User;
    posts: Post[];
};

const ProfileMainContainer = st.div`
    margin-top: -1.5rem;
    width: 70%;
    min-width: 27rem;
    background-color: #fff;
    box-shadow: 0 0 10px 2px #ccc;
    padding: 1rem;
    padding-top: 3rem;
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

const UserHome = (props: ProfilePageProps) => {
    return (
        <ProfileMainContainer>
            <ProfilePage user={props.user} posts={props.posts}/>
        </ProfileMainContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { params, req, res} = context;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.includes('Bearer ')) {
        // do auth logics
        // get userId
    }

    const userId = 'abcd';
    const user = await getUserById(userId);
    const posts = await getPostsByUser(userId);

    const response: GetServerSidePropsResult<ProfilePageProps> = {
        props: {
            posts: posts,
            user: user
        }
    };
    return response;
};

export default UserHome;
