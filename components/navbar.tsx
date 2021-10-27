import React from 'react';
import st from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';

const NavBarWrapper = st.div`
    display: flex;
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

export const NavigationBar = () => {
    const router = useRouter();
    return (
        <NavBarWrapper>
            <SPLogo onClick={() => { router.push('/') }}>
                <Image 
                    src='/images/sp-logo-light.png'
                    alt='spoof-poster-logo'
                    layout='fill'
                />
            </SPLogo>

        </NavBarWrapper>
    )
};
