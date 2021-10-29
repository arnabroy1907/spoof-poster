import React, { useState, useEffect, useRef } from 'react';
import st from 'styled-components';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ProfileMenuContainer = st.div`
    width: 40px;
    height: 40px;
    background-color: #aaa;
    border: solid 2px #e3f2fd;
    border-radius: 50%;
    box-shadow: 0 0 4px 2px #000;
    overflow: hidden;
    img {
        cursor: pointer;
    }
`;

const ProfileDropdown = st.div`
    position: fixed;
    top: 3.2rem;
    right: 0.5rem;
    display: flex;
    width: 12rem;
    flex-direction: column;
    background-color: #fff;
    color: #000;
    z-index: 30;
    border-radius: 5px;
    box-shadow: 0 1px 2px 1px #aaa;
`;

const ProfileName = st.div`
    width: 100%;
    padding: 1rem 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: 700;
    color: #549;
    border-bottom: solid 1px #dcdcdc;
`;

const ProfileMenus = st.div`
    width: 100%;
    padding: 0.5rem;
    padding-left: 1.5rem;
    font-size: 700;
    color: #549;
    &:hover {
        color: #327;
        cursor: pointer;
        background-color: #f0f0f0;
    }
`;

const ProfileLogoutMenu = st(ProfileMenus)`
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top: solid 1px #dcdcdc;
`;



export const ProfileMenu = (props: any) => {
    const [showMenu, setShowMenu] = useState(false);
    const profMenuRef = useRef(null);
    const rtx = useRouter();

    useEffect(() => {
        const bodyClickEventHandler = (e: any) => {
            if (profMenuRef.current && !(profMenuRef.current as any).contains(e.target)) setShowMenu(false);
        };
        document.body.addEventListener('click', bodyClickEventHandler);
        return () => {
            document.body.removeEventListener('click', bodyClickEventHandler);
        }
    }, []);

    const clickProfileMenu = () => {
        rtx.push('/user');
        setShowMenu(false);
    }

    const clickSettingsMenu = () => {
        rtx.push('/user/settings');
        setShowMenu(false);
    }

    const clickLogoutMenu = () => {
        // logout logic
        rtx.push({
            pathname: '/',
            query: {}
        });
        setShowMenu(false);
    }

    return (
        <ProfileMenuContainer ref={profMenuRef}>
            {props.user && (<>
                <Image
                    src={props.user.pic}
                    alt='profile-pic'
                    width='40px'
                    height='40px'
                    onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && 
                    <ProfileDropdown>
                        <ProfileName> {`${props.user.name} ${props.user.name} ${props.user.name}`}</ProfileName>
                        <ProfileMenus onClick={clickProfileMenu}> Profile </ProfileMenus>
                        <ProfileMenus onClick={clickSettingsMenu}> Settings </ProfileMenus>
                        <ProfileLogoutMenu onClick={clickLogoutMenu}> Logout </ProfileLogoutMenu>
                    </ProfileDropdown>
                }
                
            </>)}
        </ProfileMenuContainer>
    );
}