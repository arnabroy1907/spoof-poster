import React, { useState, useEffect } from 'react';
import st from 'styled-components';

type BTTProps = {
    showBTT: boolean;
    opacity: number;
}

const BackToTopBox = st.div`
    display: ${(props: BTTProps) => props.showBTT ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    width: 4rem;
    height: 4rem;
    background-color: #777;
    color: #fff;
    padding: 0.5rem;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    opacity: ${(props: BTTProps) => `${props.opacity}`};
    border-radius: 50%;

    svg {
        overflow: unset;
        width: 4rem;
        height: 4rem;
    }

    @media screen and (max-width: 480px) {
        bottom: 2rem;
        right: 2rem;
    }
`;

export const BackToTop = () => {
    const [showBTT, setShowBTT] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY > 1000) {
                setShowBTT(true);
                if (window.scrollY > 1000 && window.scrollY < 2000) {
                    const op = (window.scrollY - 1000) / 1000;
                    setOpacity(op);
                } else setOpacity(1);
            }
            else setShowBTT(false);
        };

        window.addEventListener('scroll', handler);
        return () => {
            window.removeEventListener('scroll', handler);
        };
    })

    return (
        <BackToTopBox showBTT={showBTT} opacity={opacity} onClick={() => {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" >
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"  fill="#fff"/>
            </svg>
        </BackToTopBox>
    )
}
