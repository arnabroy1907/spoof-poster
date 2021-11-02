import React, { useRef, useEffect} from 'react';
import st from 'styled-components';
import { UserBase } from '../service/models';
import Image from 'next/image';
import { useRouter } from 'next/router';

type UserProps = {
    user: UserBase;
    onClick: Function;
}

type LikesModalProps = {
    userList: UserBase[];
    onClose: Function;
};

const ModalOverLay = st.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #2229;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = st.div`
    width: 18rem;
    height: 80vh;
    max-height: 40rem;
    overflow-y: scroll;
    padding: 1rem;
    background-color: #fff;
    z-index: 4;
    box-shadow: 0 0 4px 2px #555;
`;

const UserSection = st.div`
    padding: 0.5rem;
    display: flex;
    align-items: center;
    color: #000;
`;

const UserImage = st.div`
    position: relative;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: solid 1px #78f;
    overflow: hidden;
    background-color: #aaa;
`;

const UserName = st.div`
    margin: 0 1rem;
    cursor: pointer;
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

const UserItem = (props: UserProps) => {

    const user = props.user;

    const rtr = useRouter();

    const goToUserPage = () => {
        rtr.push(`/user/${user.userId}`);
        props.onClick();
    }

    return (
        <UserSection>
            <UserImage onClick={goToUserPage}>
                <Image
                    src={user.pic || '/images/no-pic-user.png'}
                    alt={user.userId}
                    layout='fill'
                />
            </UserImage>
            <UserName onClick={goToUserPage}>
                <h4> {user.name} </h4>
                <h5> {user.username} </h5>
            </UserName>
        </UserSection>
    )
};

export const LikesModal = (props: LikesModalProps) => {
    const userList = props.userList || [];

    const modalRef = useRef(null);

    useEffect(() => {
        const overlayClickEventHandler = (e: any) => {
            if (modalRef.current && !(modalRef.current as any).contains(e.target)) {
                props.onClose();
            }
        };
        document.body.addEventListener('click', overlayClickEventHandler);
        return () => {
            document.body.removeEventListener('click', overlayClickEventHandler);
        }
    }, [props]);

    return (
        <ModalOverLay>
            <ModalContainer ref={modalRef}>
                {userList.map(user => 
                <UserItem
                    key={`${user.userId}-${Math.random()}`.replace('.','-')}
                    user={user}
                    onClick={() => props.onClose()}
                />)}
            </ModalContainer>
        </ModalOverLay>
    )
}