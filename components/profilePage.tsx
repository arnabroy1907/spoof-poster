import React from 'react';
import st from 'styled-components';
import Image from 'next/image';
import { Post as PostType, User } from '../service/models';
import { Post } from './post';

type ProfilePageProps = {
    user: User;
    posts: PostType[];
};

const ProfileContainer = st.div`
    width: 100%;
    padding: 1rem;
    text-align: center;
`;


const ProfileSection = st.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px #ccc;
    box-shadow: 0 0 5px 2px #ccc;
    padding: 1rem;
`;

const ProfileHeroSection = st.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    padding: 4rem;
    @media only screen and (max-width: 599px) {
        padding: 1rem;
    }
`;

const ProfileImageWrapper  = st.div`
    position: relative;
    width: 15rem;
    height: 15rem;
    background-color: #4e5e73;
    border: solid 1px #aaa;
    box-shadow: 0 0 5px 2px #aaa;
    @media only screen and (max-width: 599px) {
        width: 10rem;
        height: 10rem;
    }
`;

const ProfileNameSection = st.div`
    padding: 1rem;
    text-align: left;
    
    h1 {
        font-size: 3rem;
        margin: 0;
    }

    h2 {
        color: #444;
    }

    span {
        color: #777;
        font-style: italic;
        display: flex;
        align-items: center;
        font-weight: 700;
    }

    @media only screen and (max-width: 599px) {
        padding-left: 1rem;
        h1 {
            font-size: 1.25rem;
        }
        h2 {
            font-size: 0.75rem;
        }
        span {
            font-size: 0.625rem;
        }
    }
`;

const ProfileDescription = st.div`
    width: 80%;
    background-color: #cef4;
    padding: 1rem 2rem;
    font-style: italic;
    line-height: 2;
    border: solid 2px #79a;
    box-shadow: inset 0 0 10px 4px #79a;

    @media only screen and (max-width: 599px) {
        padding: 1rem;
        font-size: 0.75rem;
    }
`;

const PostSection = st.div`
    margin-top: 2rem;
    border-top: 1px solid #ccc;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
`;

type EmailIconProps = {
    width: string;
    height: string;
}

const EmailIconWrapper = st.div`
    padding: 0;
    padding-right: 0.5rem;
    svg {
        width: ${(props: EmailIconProps) => props.width};
        height: ${(props: EmailIconProps) => props.height};
        overflow: unset;
    }
`;

const EmailIcon = (props: EmailIconProps) => {
    return (
        <EmailIconWrapper {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M 50 110 C 49.695805 110 49.394459 110.01789 49.095703 110.04492 C 48.975402 110.05571 48.857317 110.07288 48.738281 110.08789 C 48.557875 110.11081 48.378928 110.13742 48.201172 110.16992 C 48.073333 110.19317 47.946407 110.21803 47.820312 110.24609 C 47.638545 110.28668 47.459589 110.33238 47.28125 110.38281 C 47.175103 110.41276 47.067573 110.43932 46.962891 110.47266 C 46.698312 110.55705 46.43701 110.65224 46.181641 110.75781 C 46.074168 110.80227 45.970781 110.85429 45.865234 110.90234 C 45.705048 110.9752 45.546461 111.04981 45.390625 111.13086 C 45.276381 111.19035 45.164339 111.25269 45.052734 111.31641 C 44.906431 111.3998 44.762901 111.48754 44.621094 111.57812 C 44.51548 111.64572 44.409496 111.7118 44.306641 111.7832 C 44.131466 111.90457 43.962055 112.03369 43.794922 112.16602 C 43.739607 112.20989 43.681309 112.24991 43.626953 112.29492 C 43.610948 112.30817 43.595999 112.32259 43.580078 112.33594 C 43.369095 112.51258 43.166836 112.69872 42.970703 112.89258 C 42.923832 112.93894 42.879936 112.98788 42.833984 113.03516 C 42.678606 113.19491 42.527614 113.35894 42.382812 113.5293 C 42.319245 113.60405 42.256695 113.67923 42.195312 113.75586 C 42.070861 113.91134 41.951336 114.07101 41.835938 114.23438 C 41.775048 114.32043 41.714459 114.4061 41.65625 114.49414 C 41.52507 114.69293 41.400601 114.89627 41.283203 115.10547 C 41.259836 115.14711 41.233741 115.18648 41.210938 115.22852 C 41.178071 115.28894 41.150789 115.35289 41.119141 115.41406 C 41.020538 115.60514 40.924663 115.79927 40.837891 115.99805 C 40.784326 116.12049 40.738196 116.24615 40.689453 116.37109 C 40.651416 116.46869 40.607412 116.56286 40.572266 116.66211 C 40.552141 116.719 40.538575 116.77692 40.519531 116.83398 C 40.474721 116.96822 40.433736 117.10354 40.394531 117.24023 C 40.348957 117.39885 40.308932 117.55724 40.271484 117.7168 C 40.242002 117.84285 40.21021 117.96786 40.185547 118.0957 C 40.129857 118.38275 40.082848 118.67083 40.052734 118.95898 C 40.048943 118.99567 40.050268 119.03351 40.046875 119.07031 C 40.021542 119.34219 40.008863 119.61343 40.005859 119.88477 C 40.005417 119.92353 40 119.96113 40 120 L 40 400 C 40 405.522 44.477 410 50 410 L 470 410 C 475.522 410 480 405.522 480 400 L 480 120 C 480 119.96376 479.99453 119.92873 479.99414 119.89258 C 479.99127 119.62128 479.98028 119.34998 479.95508 119.07812 C 479.95141 119.03797 479.94946 118.99705 479.94531 118.95703 C 479.91449 118.66365 479.8679 118.37034 479.81055 118.07812 C 479.78823 117.96355 479.76057 117.85142 479.73438 117.73828 C 479.69564 117.57177 479.65306 117.40572 479.60547 117.24023 C 479.56626 117.10354 479.52529 116.96822 479.48047 116.83398 C 479.46141 116.77692 479.44787 116.719 479.42773 116.66211 C 479.39259 116.56283 479.34858 116.46871 479.31055 116.37109 C 479.2618 116.24615 479.21568 116.12049 479.16211 115.99805 C 479.08384 115.81872 478.99611 115.64574 478.9082 115.47266 C 478.83843 115.33565 478.76722 115.19968 478.69141 115.06641 C 478.57742 114.86551 478.45877 114.66777 478.33203 114.47656 C 478.28172 114.40081 478.22808 114.32819 478.17578 114.25391 C 478.05902 114.0878 477.9386 113.92556 477.8125 113.76758 C 477.74653 113.68499 477.67983 113.60386 477.61133 113.52344 C 477.46827 113.3554 477.31938 113.19287 477.16602 113.03516 C 477.12006 112.98788 477.07617 112.93894 477.0293 112.89258 C 476.83316 112.69869 476.63091 112.51261 476.41992 112.33594 C 476.404 112.3226 476.38905 112.30816 476.37305 112.29492 C 476.32377 112.25412 476.27077 112.2176 476.2207 112.17773 C 476.04434 112.03753 475.86503 111.9014 475.67969 111.77344 C 475.58956 111.71108 475.49653 111.65319 475.4043 111.59375 C 475.24804 111.49327 475.08948 111.3964 474.92773 111.30469 C 474.82632 111.24707 474.72468 111.19085 474.62109 111.13672 C 474.45816 111.0517 474.2927 110.97254 474.125 110.89648 C 474.02274 110.85006 473.92242 110.80086 473.81836 110.75781 C 473.56036 110.65115 473.29669 110.5538 473.0293 110.46875 C 472.93309 110.43819 472.83377 110.41638 472.73633 110.38867 C 472.55144 110.33601 472.36632 110.28621 472.17773 110.24414 C 472.05307 110.21642 471.92715 110.19294 471.80078 110.16992 C 471.6198 110.1368 471.43763 110.10913 471.25391 110.08594 C 471.1376 110.07135 471.02181 110.05548 470.9043 110.04492 C 470.60554 110.01789 470.30419 110 470 110 L 50 110 z M 78.246094 130 L 441.75391 130 L 260 277.13477 L 78.246094 130 z M 60 140.96094 L 253.70703 297.77148 C 255.54103 299.25748 257.771 300 260 300 C 262.229 300 264.45897 299.25844 266.29297 297.77344 L 460 140.96289 L 460 390 L 60 390 L 60 140.96094 z"></path>
            </svg>
        </EmailIconWrapper>
        
    )
};

export const ProfilePage = (props: ProfilePageProps) => {

    const user = props.user;
    const postList = props.posts;

    return (
        <ProfileContainer>
            <ProfileSection>
                <ProfileHeroSection>
                    <ProfileImageWrapper>
                        <Image
                            src={user.pic || '/images/no-pic-user.png'}
                            alt={user.name}
                            layout='fill'
                            objectFit='contain'
                        />
                    </ProfileImageWrapper>
                    <ProfileNameSection>
                        <h1> {user.name} </h1>
                        <h2> {user.username} </h2>
                        <span> 
                            <EmailIcon
                                width='1.5rem'
                                height='1.5rem'
                            /> 
                            {user.email} 
                        </span>
                    </ProfileNameSection>
                </ProfileHeroSection>
                <ProfileDescription>
                    {user.bio}
                </ProfileDescription>
            </ProfileSection>
            <PostSection>
                {postList.map(post => <Post post={post} key={post.id} />)}
            </PostSection>
        </ProfileContainer>
    );
}
