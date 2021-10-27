import React from 'react';
import st from 'styled-components';
import { NavigationBar } from './navbar';

const MainContainer = st.div`
    width: 100%;
    margin-top: 4rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LayOut = (props: any) => {
    return (<>
        <NavigationBar />
        <MainContainer>
            {props.children}
        </MainContainer>
    </>)
}
