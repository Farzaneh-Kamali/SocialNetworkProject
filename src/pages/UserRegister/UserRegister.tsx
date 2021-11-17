import React, {useState} from 'react';
import { FunctionComponent } from 'react';
import {Cart} from "../../components/InitalPages/Cart/Cart";
import {Header} from "../../components/InitalPages/Header/Header";
import {ChoiceTimeInput, PictureInput, StringInput} from "../../components/InitalPages/Input/Input";
import {ButtonPrimary, } from "../../components/InitalPages/Button/Button";
import "./UserRegister.style.scss"
import { Formik,  Form , FormikHelpers} from 'formik';
import {RegisterFormInput} from './UserRegister.type';
import {registerValidateSchema} from "./UserRegister.validation";
import {useHistory} from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {User} from "../../models/User";


interface RegisterQueryProps {
    firstName: string;
    lastName: string;
    username: string;
    description: string;
    title: string;
    company: string;
    startedAtMonth: string;
    startedAtYear: string;
    finishedAtMonth: string;
    finishedAtYear: string;
}

const USER_REGISTER_MUTATION = gql`
    mutation UserRegisterMutation($firstName: String! ,$lastName: String!, $username: String!, $description: String, 
        $title: String, $company: String, $startedAtMonth: String, $startedAtYear: String, $finishedAtMonth: String, $finishedAtYear: String) {
        userSignupGraph(userSignupRequest: { firstName: $firstName, lastName: $lastName, username: $username , description:$description,
        title: $title, company: $company, startedAtMonth:$startedAtMonth , startedAtYear:$startedAtYear, finishedAtMonth:$finishedAtMonth , finishedAtYear:$finishedAtYear}) {
            success
            message
        }
    }
`;


export const UserRegister : FunctionComponent = () => {
    const validation = registerValidateSchema()
    const history = useHistory();
    const [formState, setFormState] = useState<RegisterQueryProps>({
        firstName:"",
        lastName: "",
        username: "",
        description:"",
        title: "",
        company: "",
        startedAtMonth: "",
        startedAtYear: "",
        finishedAtMonth: "",
        finishedAtYear: "",
    });
    const [userSignup] = useMutation(USER_REGISTER_MUTATION, {
        variables: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            username: formState.username,
            description: formState.description,
            title: formState.title,
            company: formState.company,
            startedAtMonth: formState.startedAtMonth,
            startedAtYear: formState.startedAtYear,
            finishedAtMonth: formState.finishedAtMonth,
            finishedAtYear: formState.finishedAtYear,
        },
        onCompleted: ({ userSignup }) => {
            const userText = sessionStorage.getItem("user");
            const user:User = userText && JSON.parse(userText);
            user.isActive = true
            sessionStorage.setItem("user", JSON.stringify(user));
            history.push("/skills");
        },
        onError: (error) => {
            console.log(error.message);
        },
    });
    return (

        <div className="register cart-container">
            <Cart>
                <Header name={"پروفایل"}/>

                <Formik
                    initialValues={{
                        firstName:"",
                        lastName: "",
                        username: "",
                        description:"",
                        title: "",
                        company: "",
                        startedAtMonth: "",
                        startedAtYear: "",
                        finishedAtMonth: "",
                        finishedAtYear: "",
                    }}
                    // validationSchema={validation}
                    onSubmit={(
                        values: RegisterFormInput,
                        { setSubmitting }: FormikHelpers<RegisterFormInput>
                    ) => {
                        setFormState({
                            firstName: values.firstName,
                            lastName: values.lastName,
                            username: values.username,
                            description: values.description,
                            title: values.title,
                            company: values.company,
                            startedAtMonth: values.startedAtMonth,
                            startedAtYear: values.startedAtYear,
                            finishedAtMonth: values.finishedAtMonth,
                            finishedAtYear: values.finishedAtYear,
                        });
                        userSignup();
                    }}
                >
                    <Form>

                        <StringInput placeholder={"نام"} name={"firstName"} dir={"rtl"} />
                        <StringInput placeholder={"نام خانوادگی"} name={"lastName"} dir={"rtl"} />
                        <StringInput placeholder={"نام کاربری"} name={"username"} dir={"rtl"} />
                        <StringInput placeholder={"توضیحات"} name={"description"} dir={"rtl"} />
                        <StringInput placeholder={"آخرین عنوان شغلی"} name={"title"} dir={"rtl"} />
                        <StringInput placeholder={"نام شرکت"} name={"company"} dir={"rtl"} />
                        <ChoiceTimeInput name={"تاریخ شروع"} id={"startedAt"} />
                        <ChoiceTimeInput name={"تاریخ پایان"} id={"finishedAt"}/>
                        {/*<PictureInput name={"+ اضافه کردن تصویر پروفایل"}/>*/}
                        <ButtonPrimary name={"ثبت"}/>

                    </Form>
                </Formik>

            </Cart>

        </div>
    );
};