import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Post as PostType, UserBase, TextDataType } from '../../service/models';
import st from 'styled-components';

type IconProps = {
    onClick: Function;
}

const PostCreateContainer = st.div`
    margin-top: -1.5rem;
    width: 80%;
    height: calc(100vh - 2.5rem);
    min-width: 27rem;
    background-color: #fff;
    box-shadow: 0 0 10px 2px #ccc;
    padding: 1rem;
    padding-top: 5rem;
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

const EditorContainer = st.div`
    width: 80%;
    min-width: 27rem;
    border: solid 1px #aaa;
    box-shadow: 0 0 10px 2px #aaa;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    form {
        width: 100%;
    }

    @media only screen and (max-width: 599px) {
        width: 100%;
        min-width: 19rem;
    }
    @media only screen and (min-width: 599px) and (max-width: 900px) {
        width: 85%;
        min-width: 27rem;
    }
`;

const EditorTextView = st.div`
    width: 100%;
    padding: 4rem;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    background-color: #baf;
    color: #000;
    font-weight: 700px;

    @media only screen and (max-width: 599px) {
        padding: 1rem;
        font-size: 16px;
    }
    
`;

const FileInput = st.input`
    background-color: #fff;
    color: #f00;
    hidden: true;
    display: none;
`;

const UploadedImageSection = st.div`
    position: relative;
    width: 100%;
    height: 30rem;
    background-color: #000;
`;

const UploadedImageSectionPlace = st(UploadedImageSection)`
    background-color: #fff;
    padding: 1rem;
    width: calc(100% - 2rem);
    height: 30rem;
`;

const RemoveImageIcon = st.div`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #fff;
    background-color: #000;
    padding: 0.25rem;
    border: solid 1px #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const IconsSection = st.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const AddImageIconItem = st.div`
    width: fit-content;
    padding: 0.25rem;
    cursor: pointer;
    svg {
        width: 2rem;
        height: 2rem;
        path {
            stroke-width: 1px;
            stroke: #000;
        }
    }
`;

const AddTextIconItem = st.div`
    width: fit-content;
    padding: 0.25rem;
    cursor: pointer;
    position: relative;
    top: 0.125rem;
    svg {
        width: 2rem;
        height: 2rem;
        path {
            stroke-width: 1px;
            stroke: #fff;
        }
    }
`;


const AddImageIcon = (props: IconProps) => {
    return (
        <AddImageIconItem onClick={() => { props.onClick(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                <path d="M 5 14 L 5 68 L 48.527344 68 C 50.308594 74.890625 56.558594 80 64 80 C 72.824219 80 80 72.824219 80 64 C 80 59.4375 78.070313 55.328125 75 52.410156 L 75 14 Z M 7 16 L 73 16 L 73 50.78125 C 71.222656 49.566406 69.1875 48.710938 67 48.292969 L 67 22 L 13 22 L 13 60 L 48.527344 60 C 48.195313 61.28125 48 62.617188 48 64 C 48 64.679688 48.054688 65.34375 48.140625 66 L 7 66 Z M 15 24 L 65 24 L 65 37 C 64.449219 37 64 37.449219 64 38 C 64 38.550781 64.449219 39 65 39 L 65 43 C 64.449219 43 64 43.449219 64 44 C 64 44.550781 64.449219 45 65 45 L 65 48.050781 C 64.667969 48.03125 64.335938 48 64 48 C 63.894531 48 63.792969 48.011719 63.6875 48.015625 L 63.492188 47.871094 C 63.804688 47.691406 64 47.359375 64 47 C 64 46.449219 63.550781 46 63 46 C 62.535156 46 62.132813 46.320313 62.027344 46.769531 L 55.492188 41.871094 C 55.804688 41.691406 56 41.359375 56 41 C 56 40.449219 55.550781 40 55 40 C 54.535156 40 54.132813 40.320313 54.027344 40.769531 L 49.988281 37.742188 L 49.96875 37.757813 C 49.859375 37.3125 49.457031 37 49 37 C 48.449219 37 48 37.449219 48 38 C 48 38.367188 48.203125 38.707031 48.527344 38.878906 L 42 43.957031 C 41.976563 43.421875 41.535156 43 41 43 C 40.449219 43 40 43.449219 40 44 C 40 44.054688 40.007813 44.109375 40.015625 44.164063 L 35.964844 40.734375 C 35.855469 40.335938 35.511719 40.046875 35.097656 40.003906 L 33.640625 38.769531 C 33.867188 38.578125 34 38.296875 34 38 C 34 37.449219 33.550781 37 33 37 C 32.644531 37 32.316406 37.191406 32.136719 37.5 L 30.0625 35.746094 L 23.589844 40.191406 C 23.417969 40.066406 23.210938 40 23 40 C 22.449219 40 22 40.449219 22 41 C 22 41.089844 22.011719 41.175781 22.035156 41.261719 L 18 44.035156 C 18 44.023438 18 44.011719 18 44 C 18 43.449219 17.550781 43 17 43 C 16.449219 43 16 43.449219 16 44 C 16 44.429688 16.273438 44.808594 16.679688 44.945313 L 15 46.097656 L 15 42 C 15.550781 42 16 41.550781 16 41 C 16 40.449219 15.550781 40 15 40 L 15 36 C 15.550781 36 16 35.550781 16 35 C 16 34.449219 15.550781 34 15 34 Z M 21 31 C 20.449219 31 20 31.449219 20 32 C 20 32.550781 20.449219 33 21 33 C 21.550781 33 22 32.550781 22 32 C 22 31.449219 21.550781 31 21 31 Z M 25 31 C 24.449219 31 24 31.449219 24 32 C 24 32.550781 24.449219 33 25 33 C 25.550781 33 26 32.550781 26 32 C 26 31.449219 25.550781 31 25 31 Z M 37 31 C 36.449219 31 36 31.449219 36 32 C 36 32.550781 36.449219 33 37 33 C 37.550781 33 38 32.550781 38 32 C 38 31.449219 37.550781 31 37 31 Z M 41 31 C 40.449219 31 40 31.449219 40 32 C 40 32.550781 40.449219 33 41 33 C 41.550781 33 42 32.550781 42 32 C 42 31.449219 41.550781 31 41 31 Z M 53 31 C 52.449219 31 52 31.449219 52 32 C 52 32.550781 52.449219 33 53 33 C 53.550781 33 54 32.550781 54 32 C 54 31.449219 53.550781 31 53 31 Z M 57 31 C 56.449219 31 56 31.449219 56 32 C 56 32.550781 56.449219 33 57 33 C 57.550781 33 58 32.550781 58 32 C 58 31.449219 57.550781 31 57 31 Z M 19 34 C 18.449219 34 18 34.449219 18 35 C 18 35.550781 18.449219 36 19 36 C 19.550781 36 20 35.550781 20 35 C 20 34.449219 19.550781 34 19 34 Z M 23 34 C 22.449219 34 22 34.449219 22 35 C 22 35.550781 22.449219 36 23 36 C 23.550781 36 24 35.550781 24 35 C 24 34.449219 23.550781 34 23 34 Z M 27 34 C 26.449219 34 26 34.449219 26 35 C 26 35.550781 26.449219 36 27 36 C 27.550781 36 28 35.550781 28 35 C 28 34.449219 27.550781 34 27 34 Z M 31 34 C 30.449219 34 30 34.449219 30 35 C 30 35.550781 30.449219 36 31 36 C 31.550781 36 32 35.550781 32 35 C 32 34.449219 31.550781 34 31 34 Z M 35 34 C 34.449219 34 34 34.449219 34 35 C 34 35.550781 34.449219 36 35 36 C 35.550781 36 36 35.550781 36 35 C 36 34.449219 35.550781 34 35 34 Z M 39 34 C 38.449219 34 38 34.449219 38 35 C 38 35.550781 38.449219 36 39 36 C 39.550781 36 40 35.550781 40 35 C 40 34.449219 39.550781 34 39 34 Z M 43 34 C 42.449219 34 42 34.449219 42 35 C 42 35.550781 42.449219 36 43 36 C 43.550781 36 44 35.550781 44 35 C 44 34.449219 43.550781 34 43 34 Z M 47 34 C 46.449219 34 46 34.449219 46 35 C 46 35.550781 46.449219 36 47 36 C 47.550781 36 48 35.550781 48 35 C 48 34.449219 47.550781 34 47 34 Z M 51 34 C 50.449219 34 50 34.449219 50 35 C 50 35.550781 50.449219 36 51 36 C 51.550781 36 52 35.550781 52 35 C 52 34.449219 51.550781 34 51 34 Z M 55 34 C 54.449219 34 54 34.449219 54 35 C 54 35.550781 54.449219 36 55 36 C 55.550781 36 56 35.550781 56 35 C 56 34.449219 55.550781 34 55 34 Z M 59 34 C 58.449219 34 58 34.449219 58 35 C 58 35.550781 58.449219 36 59 36 C 59.550781 36 60 35.550781 60 35 C 60 34.449219 59.550781 34 59 34 Z M 63 34 C 62.449219 34 62 34.449219 62 35 C 62 35.550781 62.449219 36 63 36 C 63.550781 36 64 35.550781 64 35 C 64 34.449219 63.550781 34 63 34 Z M 17 37 C 16.449219 37 16 37.449219 16 38 C 16 38.550781 16.449219 39 17 39 C 17.550781 39 18 38.550781 18 38 C 18 37.449219 17.550781 37 17 37 Z M 21 37 C 20.449219 37 20 37.449219 20 38 C 20 38.550781 20.449219 39 21 39 C 21.550781 39 22 38.550781 22 38 C 22 37.449219 21.550781 37 21 37 Z M 25 37 C 24.449219 37 24 37.449219 24 38 C 24 38.550781 24.449219 39 25 39 C 25.550781 39 26 38.550781 26 38 C 26 37.449219 25.550781 37 25 37 Z M 37 37 C 36.449219 37 36 37.449219 36 38 C 36 38.550781 36.449219 39 37 39 C 37.550781 39 38 38.550781 38 38 C 38 37.449219 37.550781 37 37 37 Z M 41 37 C 40.449219 37 40 37.449219 40 38 C 40 38.550781 40.449219 39 41 39 C 41.550781 39 42 38.550781 42 38 C 42 37.449219 41.550781 37 41 37 Z M 45 37 C 44.449219 37 44 37.449219 44 38 C 44 38.550781 44.449219 39 45 39 C 45.550781 39 46 38.550781 46 38 C 46 37.449219 45.550781 37 45 37 Z M 53 37 C 52.449219 37 52 37.449219 52 38 C 52 38.550781 52.449219 39 53 39 C 53.550781 39 54 38.550781 54 38 C 54 37.449219 53.550781 37 53 37 Z M 57 37 C 56.449219 37 56 37.449219 56 38 C 56 38.550781 56.449219 39 57 39 C 57.550781 39 58 38.550781 58 38 C 58 37.449219 57.550781 37 57 37 Z M 61 37 C 60.449219 37 60 37.449219 60 38 C 60 38.550781 60.449219 39 61 39 C 61.550781 39 62 38.550781 62 38 C 62 37.449219 61.550781 37 61 37 Z M 29.9375 38.253906 L 50.417969 55.582031 C 49.941406 56.351563 49.519531 57.15625 49.175781 58 L 15 58 L 15 48.527344 Z M 19 40 C 18.449219 40 18 40.449219 18 41 C 18 41.550781 18.449219 42 19 42 C 19.550781 42 20 41.550781 20 41 C 20 40.449219 19.550781 40 19 40 Z M 39 40 C 38.449219 40 38 40.449219 38 41 C 38 41.550781 38.449219 42 39 42 C 39.550781 42 40 41.550781 40 41 C 40 40.449219 39.550781 40 39 40 Z M 43 40 C 42.449219 40 42 40.449219 42 41 C 42 41.550781 42.449219 42 43 42 C 43.550781 42 44 41.550781 44 41 C 44 40.449219 43.550781 40 43 40 Z M 59 40 C 58.449219 40 58 40.449219 58 41 C 58 41.550781 58.449219 42 59 42 C 59.550781 42 60 41.550781 60 41 C 60 40.449219 59.550781 40 59 40 Z M 63 40 C 62.449219 40 62 40.449219 62 41 C 62 41.550781 62.449219 42 63 42 C 63.550781 42 64 41.550781 64 41 C 64 40.449219 63.550781 40 63 40 Z M 50.011719 40.257813 L 60.769531 48.328125 C 57.082031 49.085938 53.859375 51.121094 51.574219 53.941406 L 42.394531 46.179688 Z M 61 43 C 60.449219 43 60 43.449219 60 44 C 60 44.550781 60.449219 45 61 45 C 61.550781 45 62 44.550781 62 44 C 62 43.449219 61.550781 43 61 43 Z M 64 50 C 71.742188 50 78 56.257813 78 64 C 78 71.742188 71.742188 78 64 78 C 56.257813 78 50 71.742188 50 64 C 50 56.257813 56.257813 50 64 50 Z M 63 57 L 63 63 L 57 63 L 57 65 L 63 65 L 63 71 L 65 71 L 65 65 L 71 65 L 71 63 L 65 63 L 65 57 Z"></path>
            </svg>
        </AddImageIconItem>
    );
}

const AddTextIcon = (props: IconProps) => {
    return (
        <AddTextIconItem onClick={() => { props.onClick(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path d="M 19.279297 4 C 18.866297 4 18.494703 4.254625 18.345703 4.640625 L 4.0664062 41.640625 C 3.9474063 41.948625 3.9897813 42.294406 4.1757812 42.566406 C 4.3627813 42.838406 4.67 43 5 43 L 9.9804688 43 C 10.400469 43 10.776922 42.73775 10.919922 42.34375 L 14.691406 32 L 28.962891 32 L 29.876953 34.550781 C 31.066953 32.347781 32.960047 30.585016 35.248047 29.541016 L 25.603516 4.6386719 C 25.453516 4.2536719 25.084875 4 24.671875 4 L 19.279297 4 z M 21.890625 12.257812 L 26.8125 26 L 16.880859 26 L 21.890625 12.257812 z M 40 30 C 34.488997 30 30 34.488997 30 40 C 30 45.511003 34.488997 50 40 50 C 45.511003 50 50 45.511003 50 40 C 50 34.488997 45.511003 30 40 30 z M 40 32 C 44.430123 32 48 35.569877 48 40 C 48 44.430123 44.430123 48 40 48 C 35.569877 48 32 44.430123 32 40 C 32 35.569877 35.569877 32 40 32 z M 40 34.099609 C 39.85 34.099609 39.711719 34.125 39.589844 34.171875 C 39.467969 34.21875 39.362891 34.2875 39.275391 34.375 C 39.187891 34.4625 39.119141 34.569531 39.072266 34.691406 C 39.025391 34.813281 39 34.949609 39 35.099609 L 39 39 L 35.099609 39 C 34.949609 39 34.813281 39.025391 34.691406 39.072266 C 34.569531 39.119141 34.4625 39.187891 34.375 39.275391 C 34.2875 39.362891 34.21875 39.467969 34.171875 39.589844 C 34.125 39.711719 34.099609 39.85 34.099609 40 C 34.099609 40.15 34.125 40.288281 34.171875 40.410156 C 34.265625 40.653906 34.447656 40.833984 34.691406 40.927734 C 34.813281 40.974609 34.949609 41 35.099609 41 L 39 41 L 39 44.900391 C 39 45.500391 39.4 45.900391 40 45.900391 C 40.6 45.900391 41 45.500391 41 44.900391 L 41 41 L 44.900391 41 C 45.500391 41 45.900391 40.6 45.900391 40 C 45.900391 39.4 45.500391 39 44.900391 39 L 41 39 L 41 35.099609 C 41 34.499609 40.6 34.099609 40 34.099609 z"></path>
            </svg>
        </AddTextIconItem>
    );
}

function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

const CreatePostPage = () => {
    const [file, setFile] = useState<any>(null);
    const [textData, setTextData] = useState<TextDataType|null>(null);
    const [postType, setPostType] = useState<'IMAGE'|'TEXT'>('IMAGE');

    const imageFormRef = useRef(null);

    return (
        <PostCreateContainer>
            <EditorContainer>
                {postType === 'IMAGE' && 
                    (file ? (
                        <UploadedImageSection>
                            <Image
                                alt={'file-image'}
                                src={file}
                                layout='fill'
                                objectFit='contain'
                            />
                            <RemoveImageIcon onClick={() => setFile('')}>
                                X
                            </RemoveImageIcon>
                        </UploadedImageSection>
                    ) : (
                        <UploadedImageSectionPlace>
                            <Image
                                alt={'file-image-placeholder'}
                                src='/images/img-placeholder.png'
                                layout='fill'
                                objectFit='contain'
                            />
                        </UploadedImageSectionPlace>
                    ))
                }
                {postType === 'TEXT' && 
                    <EditorTextView>
                        {JSON.stringify(textData)}
                    </EditorTextView>
                }

                <form onSubmit={(e) => { e.preventDefault() }}>
                    <IconsSection>
                        <AddImageIcon
                            onClick={() => {
                                setPostType('IMAGE');
                                const imageFormElem = imageFormRef.current;
                                if (imageFormElem) {
                                    // @ts-ignore
                                    imageFormElem.click();
                                }
                            }}
                        />
                        <AddTextIcon
                            onClick={() => {
                                setFile('');
                                setPostType('TEXT');
                            }}
                        />
                    </IconsSection>
                    
                    <FileInput
                        ref={imageFormRef}
                        type='file'
                        accept='image/*'
                        onChange={async (e) => {
                            if (e.target && e.target.files && e.target.files.length > 0 && e.target.files[0]) {
                                const fileDat = e.target.files[0];
                                const fileBs64 = await getBase64(fileDat);
                                setFile(fileBs64);
                            }
                        }}
                    />
                    
                </form>

            </EditorContainer>
        </PostCreateContainer>
    );
}

export default CreatePostPage;
