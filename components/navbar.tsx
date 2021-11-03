import React, { useState } from 'react';
import st from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ProfileMenu } from './profileMenu';
import { UserBase } from '../service/models';

type CreatePostProps = {
    onClick: Function;
}

const NavBarWrapper = st.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3.5rem;
    background-color: #283593;
    color: #fff;
    padding: 0.5rem 1rem;
    @media only screen and (max-width: 480px) {
        padding: 0.5rem 0.5rem;
    }
    z-index: 2;
    box-shadow: 0 0 4px 2px #333;
`;

const SPLogo = st.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 2.5rem;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: 200ms;
    &:hover {
        width: 10.125rem;
        height: 2.625rem;
    }
`;

const NavIconSection = st.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 7rem;
`;

const CreatePostIconItem = st.div`
    cursor: pointer;
    position: relative;
    top: 1px;
    svg {
        color: #def;
        fill: #def;

        path {
            stroke-width: 1px;
            stroke: #def;
        }
    }
    div {
        position: absolute;
        background-color: #222;
        color: #fff;
        font-size: 12px;
        padding: 0.25rem;
        width: 6rem;
        text-align: center;
        left: -2.5rem;
        margin-top: 0.5rem;
    }
`;

const CreatePostIcon = (props: CreatePostProps) => {
    const [showToolTip, setShowToolTip] = useState(false);
    return (
        <CreatePostIconItem
            onClick={() => props.onClick()}
            onMouseEnter={() => {setShowToolTip(true);}}
            onMouseLeave={() => {setShowToolTip(false);}}
        >
            <svg aria-label="New post" height="32" role="img" viewBox="0 0 48 48" width="32">
                <path d="M31.8 48H16.2c-6.6 0-9.6-1.6-12.1-4C1.6 41.4 0 38.4 0 31.8V16.2C0 9.6 1.6 6.6 4 4.1 6.6 1.6 9.6 0 16.2 0h15.6c6.6 0 9.6 1.6 12.1 4C46.4 6.6 48 9.6 48 16.2v15.6c0 6.6-1.6 9.6-4 12.1-2.6 2.5-5.6 4.1-12.2 4.1zM16.2 3C10 3 7.8 4.6 6.1 6.2 4.6 7.8 3 10 3 16.2v15.6c0 6.2 1.6 8.4 3.2 10.1 1.6 1.6 3.8 3.1 10 3.1h15.6c6.2 0 8.4-1.6 10.1-3.2 1.6-1.6 3.1-3.8 3.1-10V16.2c0-6.2-1.6-8.4-3.2-10.1C40.2 4.6 38 3 31.8 3H16.2z"></path>
                <path d="M36.3 25.5H11.7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"></path>
                <path d="M24 37.8c-.8 0-1.5-.7-1.5-1.5V11.7c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v24.6c0 .8-.7 1.5-1.5 1.5z"></path>
            </svg>
            {showToolTip && <div>Create Post</div>}
        </CreatePostIconItem>
    );
};

export const NavigationBar = () => {
    const router = useRouter();
    const user: UserBase = {
        pic: 'https://ik.imagekit.io/zn7zdwokee9/old_man_prof.png?updatedAt=1635409108827',
        name: 'Old Man',
        userId: 'asdasdasdasdasdasdadsdadas',
        username: 'old_man98'
    }
    return (
        <NavBarWrapper>
            <SPLogo onClick={() => { router.push('/') }}>
                <Image 
                    src='/images/sp-logo-light.png'
                    alt='spoof-poster-logo'
                    layout='fill'
                />
            </SPLogo>
            <NavIconSection>
               <CreatePostIcon onClick={() => { router.push('/feeds/create') }}/>
                <ProfileMenu user={user}/> 
            </NavIconSection>
        </NavBarWrapper>
    )
};
