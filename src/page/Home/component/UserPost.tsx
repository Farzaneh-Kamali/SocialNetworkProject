import React, { useState } from 'react'
import { FunctionComponent } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { Post } from '../types/Post.type';
import { User } from '../types/User.types';
import Usericon from '../../../images/Usericon.jpg'


interface UserPostProps {
    post: Post;
    status: boolean;

}

const Header = ({ user: { name, role, img } }: { user: User }) => (
    <div className="flex mb-6">
        {img && <div ><img src={img}
            className="h-auto max-w-full align-middle border-none rounded-full cursor-pointer"
            alt="" /></div>}
        {!img && <div><img src={Usericon}
            className="h-auto max-w-full align-middle border-none rounded-full cursor-pointer"
            alt="" /></div>}
        <div className="mr-2">
            <div className="font-sans text-base font-semibold cursor-pointer hover:text-blue-600 hover:underline" >{name}</div>
            <div className="font-sans text-sm text-gray-400 cursor-pointer" >{role}</div>
        </div>
    </div>
);

const likeFromBack = () =>
    new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });


export const UserPost = ({ post, status }: UserPostProps) => {
    const { user, body, likes } = post;

    const [currentLike, setCurrentLike] = useState(likes);
    const [like, setlike] = useState(status);

    const onLikeClick = React.useCallback(() => {
        if (like === false) {
            setCurrentLike(() => currentLike + 1);
            setlike(() => true)

            likeFromBack().catch((x) => {
                setCurrentLike((currentLike) => currentLike - 1)
                setlike(() => false)
            }
            );
        }
        else if (like === true) {
            setCurrentLike(() => currentLike - 1);
            setlike(() => false)

            likeFromBack().catch((x) => {
                setCurrentLike((currentLike) => currentLike + 1)
                setlike(() => true)
            }

            );
        }

    }, [currentLike]);

    return (
        <div className="grid w-1/2 h-auto m-auto my-5 bg-white rounded-xl">
            <div className="mt-6 mr-6"  >
                < Header user={user} />
            </div >
            <div className="mx-6 text-sm font-medium">{body.text}</div>
            <div className="mx-8 my-4 bg-gray-100 border-1 rounded-xl">
                {body.media && <img className="w-full h-full rounded-xl" src={body.media} alt={"sth"} />}
            </div>
            <div className="grid p-5 justify-items-end">

                <label className="px-2 mx-6 text-xs text-white bg-blue-400 rounded-full">{currentLike}+</label>
                <svg id="like" xmlns="http://www.w3.org/2000/svg" onClick={onLikeClick} className="w-6 h-6 cursor-pointer hover:text-blue-400 focus:text-blue-400"
                    fill="black" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.504 9.96977V17.4846H16.171L16.0027
                    17.5035C12.9084 18.1923 10.858 18.689 9.83607 18.9966C8.47867 19.4051 7.97267 19.5048 7.05197
                    19.5636C6.36337 19.6088 5.58127 19.3557 5.22487 19.0092C5.02797 18.8181 4.88057 18.4254 4.82227 
                    17.8164C4.81019 17.6887 4.76237 17.5665 4.68379 17.4625C4.60522 17.3585 4.4988 17.2765 4.37567
                    17.2253C4.10177 17.1119 3.87407 16.9271 3.68377 16.6583C3.50777 16.4126 3.39337 15.9548 3.37247
                    15.2922C3.36879 15.1704 3.33262 15.0515 3.26736 14.9468C3.20211 14.8421 3.10994 14.755 2.99957 
                    14.6937C2.35937 14.3399 2.04257 13.9409 1.97657 13.4726C1.90397 12.9549 2.07997 12.3722 2.54087 
                    11.7086C2.64901 11.5529 2.68928 11.3632 2.65313 11.1796C2.61698 10.9961 2.50724 10.8333 2.34727 
                    10.7258C1.90617 10.4297 1.66417 10.0181 1.60367 9.43427C1.50687 8.50397 2.12837 7.81622 3.53527 
                    7.67867C4.78831 7.56037 6.05345 7.66107 7.26867 7.97582C7.40652 8.01021 7.55179 8.0063 7.68739 
                    7.96455C7.82299 7.9228 7.94328 7.84496 8.03411 7.74017C8.12493 7.63538 8.18252 7.50801 8.20008                         7.37305C8.21765 7.23808 8.19447 7.10114 8.13327 6.97832C7.58327 5.86742 7.27747 4.95077 7.20597
                    4.24097C7.11247 3.29912 7.34017 2.61662 7.87257 2.05382C8.27627 1.62752 8.92197 1.38392 9.16397 
                    1.43432C9.48297 1.49942 9.69087 1.67582 9.96147 2.29322C10.121 2.65862 10.198 2.96942 10.33 
                    3.69497C10.4565 4.38377 10.5258 4.69457 10.6699 5.10197C11.1044 6.33677 12.1703 7.61672 13.6014 
                    8.49977C14.6044 9.11792 15.6914 9.60193 16.8321 9.93827C16.9033 9.95924 16.9775 9.96986 17.0521
                    9.96977H19.504ZM19.5502 18.9158C19.9055 18.9252 20.2245 18.8496 20.4918 18.6711C20.8328 18.4433
                    20.9934 18.0842 20.9967 17.6705L20.9934 9.98132C21.0308 9.57182 20.9043 9.19592 20.6051 
                    8.91662C20.3246 8.65412 19.9583 8.53022 19.5711 8.53862H17.1676C16.1953 8.24291 15.2684 7.82558 
                    14.411 7.29752C13.2582 6.58562 12.409 5.56502 12.0845 4.64522C11.9734 4.32812 11.914 4.06562 
                    11.8018 3.44822C11.65 2.61977 11.5554 2.23442 11.3376 1.73882C10.8866 0.707719 10.2948 0.203719 
                    9.47857 0.0346693C8.67557 -0.131231 7.50627 0.310819 6.76707 1.09202C5.94757 1.95722 5.58567 
                    3.03977 5.71987 4.37747C5.77707 4.95287 5.94427 5.59652 6.21927 6.31367C5.28011 6.18302 4.32768
                    6.16328 3.38347 6.25487C1.17577 6.47012 -0.0639324 7.84247 0.116467 9.57707C0.195667 10.3247 
                    0.479467 10.9599 0.962368 11.4587C0.556467 12.2052 0.394768 12.9434 0.495968 13.6637C0.612568 
                    14.4932 1.09657 15.1841 1.90177 15.7206C1.96447 16.4483 2.13937 17.0289 2.44957 17.4636C2.69399
                    17.8148 3.01289 18.1131 3.38567 18.3393C3.50447 19.0575 3.75417 19.6193 4.16227 20.0141C4.83877 
                    20.6714 6.04767 21.063 7.15207 20.9916C8.20037 20.9244 8.82077 20.8026 10.2838 20.3616C11.2485 
                    20.0708 13.2461 19.5878 16.2568 18.9158H19.5513H19.5502ZM17.6791 9.64322C17.6794 9.54928 17.6602 
                    9.45621 17.6228 9.36934C17.5853 9.28247 17.5303 9.20351 17.4608 9.13699C17.3913 9.07046 17.3087 
                    9.01768 17.2178 8.98167C17.1269 8.94565 17.0295 8.92712 16.9311 8.92712C16.8328 8.92739 16.7356 
                    8.94613 16.645 8.98227C16.5543 9.01841 16.472 9.07123 16.4028 9.13773C16.3335 9.20422 16.2787 
                    9.28309 16.2414 9.36982C16.204 9.45655 16.185 9.54945 16.1853 9.64322V17.7051C16.1851 17.7989 
                    16.2043 17.8918 16.2418 17.9784C16.2792 18.0651 16.3342 18.1439 16.4036 18.2103C16.4729 18.2767 
                    16.5553 18.3294 16.646 18.3654C16.7367 18.4014 16.8339 18.42 16.9322 18.4202C17.0304 18.42 17.1276 
                    18.4014 17.2183 18.3654C17.309 18.3294 17.3914 18.2767 17.4608 18.2103C17.5301 18.1439 17.5851 18.0651 
                    17.6226 17.9784C17.66 17.8918 17.6792 17.7989 17.6791 17.7051V9.64322Z" />
                </svg>
            </div>
        </div >
    )
}
