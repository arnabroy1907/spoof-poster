import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import st from 'styled-components';
import { useRouter } from 'next/router';

const LinkSpan = st.span`
    color: #1976D2;
    cursor: pointer;
`;

const HomePage = () => {
    const rtr = useRouter();

    useEffect(() => {
        // some auth logic
        rtr.push('/feeds');
    });

    return (<>
        <Image
            src='/images/sp-logo-dark.png'
            alt='sp-logo'
            width='500px'
            height='130px'
        />
        <h1> This is just the beginning </h1>
        <h4>Read more <Link href='/about' passHref={true}><LinkSpan>about us</LinkSpan></Link>.</h4>
    </>)
}

export default HomePage;
