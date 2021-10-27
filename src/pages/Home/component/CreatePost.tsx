import "../../../variables/variables.scss";
import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useFormik } from 'formik';
import { User } from '../types/User.types';
import { CREATE_POST_MUTATION } from "../graphql/mutations";
//import { Uploader } from './Uploader';
import { Header } from "./header/Header";

interface CreatePostProps {
    user: User;

}

// const Header = ({ user: { name, role, img } }: { user: User }) => (
//     <div className="user">
//         <img className="h-auto max-w-full align-middle border-none rounded-full cursor-pointer" src={img}
//             alt="userimage" />
//     </div>
// );

export const CreatePost = ({ user }: CreatePostProps) => {
    const [createpost, { data, loading, error }] = useMutation(CREATE_POST_MUTATION);

    const formpost = useFormik({
        initialValues: {
            text: '',
            photo: '',
            video: ''
        },
        onSubmit: () => {
            addpost();
        },
    });
    const addpost = () => {
        createpost({
            variables: {
                text: formpost.values.text,
                like : 0
            }
        });
        console.log(`this is text ${formpost.values.text}`)
        if (error) {
            console.log(error);
        }

    };
    return (
        <form onSubmit={formpost.handleSubmit}>
            <div className="container grid w-1/2 h-auto m-auto bg-white grid-row-3 rounded-xl ">
                <div className="mt-6 mr-6"  >
                    <Header user={user} page={"createpost"} />
                </div>
                <div className="relative flex flex-wrap items-stretch mt-6 mb-3 mr-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-gray-400 transition duration-100 "
                        fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5812 16.2089C16.9135 16.2089 
                            17.1828 16.498 17.1828 16.8545C17.1828 17.1813 16.9565 17.4514 16.6629 17.4941L16.5812 
                            17.5H10.3053C9.9731 17.5 9.70378 17.211 9.70378 16.8545C9.70378 16.5277 9.93008 16.2576 
                            10.2237 16.2148L10.3053 16.2089H16.5812ZM10.4773 1.41662C11.6162 0.194461 13.4634 0.194461 
                            14.6023 1.41662L15.7846 2.6854C16.9235 3.90755 16.9235 5.88985 15.7846 7.112L6.89776 
                            16.6486C6.3896 17.1939 5.70064 17.4999 4.98151 17.4999H1.34203C1.00393 17.4999 0.732243 
                            17.201 0.740669 16.8383L0.832219 12.8975C0.85042 12.1526 1.13443 11.4425 1.62532 
                            10.9157L10.4773 1.41662ZM9.78923 3.979L2.47604 11.8287C2.20317 12.1215 2.04503 12.5169 
                            2.03492 12.9305L1.95853 16.2084L4.98151 16.2088C5.33722 16.2088 5.67929 16.0745 5.94929
                            15.8317L6.04705 15.7357L13.3965 7.849L9.78923 3.979ZM13.7516 2.32953C13.0825 1.61156 11.997
                            1.61156 11.328 2.32953L10.6406 3.066L14.2469 6.936L14.9339 6.19909C15.5658 5.52101 15.6009
                            4.44433 15.0392 3.72195L14.9339 3.59831L13.7516 2.32953Z" />
                    </svg>
                    <textarea id="text"
                        name="text"
                        onChange={formpost.handleChange}
                        value={formpost.values.text} className="w-5/6 h-20 mr-4 text-black outline-none resize-none focus:text-black-600" placeholder="چیزی بنویس ..." />
                </div>
                <div dir="ltr" className="rounded-b-xl send-box">
                    <button type="submit" className="p-2 pl-5 pr-5 m-2 ml-6 send-but hover:text-white">
                        ارسال</button>

                    <label className="inline-flex items-center float-right px-8 py-2 m-2 font-medium text-gray-600 rounded cursor-pointer hover:bg-gray-200">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10.4852 0.499817C12.6978 0.499817 14.2381 2.03379 14.4022 4.28415L16.8203 
                           3.2019C17.8666 2.73455 19.0082 3.52863 19.0913 4.7353L19.0961 4.87632V11.5153C19.0961 
                           12.7526 17.9932 13.6087 16.9411 13.237L16.82 13.1886L14.4022 12.1062C14.2377 14.3551 12.6942 
                           15.8908 10.4852 15.8908H4.75869C2.41556 15.8908 0.827148 14.1717 0.827148 11.7028V4.68782C0.827148
                            2.21891 2.41556 0.499817 4.75869 0.499817H10.4852ZM10.4852 1.99982H4.75869C3.16881 1.99982 
                            2.19734 3.0512 2.19734 4.68782V11.7028C2.19734 13.3394 3.16881 14.3908 4.75869 
                            14.3908H10.4852C12.0711 14.3908 13.0465 13.3367 13.0465 11.7028L13.0463 11.0173C13.0461 
                            11.0066 13.046 10.9959 13.0461 10.9852L13.0465 4.68782C13.0465 3.0516 12.0745 1.99982 
                            10.4852 1.99982ZM17.4003 4.57141L17.3384 4.59056L14.4167 5.89682V10.4928L17.338 
                            11.7999C17.5029 11.8736 17.6811 11.7642 17.7187 11.5854L17.7259 11.5153V4.87632C17.7259
                             4.68152 17.5657 4.54203 17.4003 4.57141Z" fill="#666666" /></svg>
                        <span>Video</span>
                        <input id="video"
                            name="Video"
                            onChange={formpost.handleChange}
                            value={formpost.values.video} type='file' accept="video/mp4" className="hidden" />
                    </label>
                    <label className="inline-flex items-center float-right px-8 py-2 m-2 font-medium text-gray-600 rounded cursor-pointer hover:bg-gray-200">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M13.9156 0C17.0243 0 19.0961 2.42887 19.0961 5.91408V14.0849C19.0961 17.5703
                    17.0242 20 13.9156 20H5.9983C2.89111 20 0.826904 17.5722 0.826904 14.0849V5.91408C0.826904 2.43059
                    2.89714 0 5.9983 0H13.9156ZM13.9156 1.50383H5.9983C3.67751 1.50383 2.19984 3.2387 2.19984
                    5.91408V14.0849C2.19984 16.7647 3.67206 18.4962 5.9983 18.4962H13.9156C16.2442 18.4962 17.7232
                    16.7618 17.7232 14.0849V5.91408C17.7232 3.23744 16.2444 1.50383 13.9156 1.50383ZM14.5662
                    10.1835L14.6852 10.3086L16.5854 12.4561C16.8492 12.7543 16.8424 13.2303 16.5702 13.5193C16.3227
                    13.7821 15.941 13.7998 15.6754 13.5768L15.5995 13.5027L13.6994 11.3553C13.3684 10.9814 12.8303
                    10.9779 12.4943 11.3269L12.4206 11.4137L10.3807 14.1312C9.65916 15.0939 8.36094 15.1971 7.52097
                    14.3903L7.40937 14.2747L6.59529 13.3648C6.38145 13.1217 6.04043 13.0987 5.80295 13.2949L5.72794
                    13.3684L4.32846 14.9855C4.06764 15.2869 3.63314 15.2996 3.35799 15.0139C3.10785 14.7542 3.07551
                    14.3372 3.26766 14.0372L3.33205 13.9509L4.73123 12.3341C5.46783 11.4819 6.68084 11.4365 7.4655
                    12.1967L7.57988 12.3167L8.38985 13.222C8.62662 13.4865 9.00611 13.4933 9.2508 13.2553L9.31988
                    13.1766L11.3599 10.4589C12.1704 9.37823 13.6299 9.26886 14.5662 10.1835ZM6.83076 4.64124C8.09589
                    4.64124 9.12265 5.76589 9.12265 7.15164C9.12265 8.53738 8.09589 9.66204 6.83076 9.66204C5.56569
                    9.66204 4.53979 8.53744 4.53979 7.15164C4.53979 5.76583 5.56569 4.64124 6.83076 4.64124ZM6.83076
                    6.14507C6.32418 6.14507 5.91272 6.59611 5.91272 7.15164C5.91272 7.70716 6.32418 8.1582 6.83076
                    8.1582C7.33764 8.1582 7.74972 7.70684 7.74972 7.15164C7.74972 6.59643 7.33764 6.14507 6.83076 
                    6.14507Z" fill="#666666" /></svg>
                        <span>Photo</span>
                        <input id="photo"
                            name="Photo"
                            onChange={formpost.handleChange}
                            value={formpost.values.photo} type='file' accept="image/png , image/jpeg" className="hidden" />
                    </label>
                    {/* <Uploader id="video"
                        name=""
                        // onChange={formik.handleChange}
                        // value = {formik.values.video}
                        path= />
                    <Uploader id="photo"
                        name=""
                        path=/> */}
                </div>
            </div>
        </form>
    )
}
