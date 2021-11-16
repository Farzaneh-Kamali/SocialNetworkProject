import React, {useState} from 'react';
import { FunctionComponent } from 'react';
import {Cart} from "../../components/InitalPages/Cart/Cart";
import {Header} from "../../components/InitalPages/Header/Header";
import {CheckBoxInput, ChoiceTimeInput, PictureInput, StringInput} from "../../components/InitalPages/Input/Input";
import {ButtonPrimary, ButtonSecondary} from "../../components/InitalPages/Button/Button";
import "./UserRegister.style.scss"
import { Formik, Field, Form , FormikHelpers} from 'formik';
import {RegisterFormInput} from './UserRegister.type';
import {registerValidateSchema} from "./UserRegister.validation";
import {useHistory} from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {ErrorMessage, useField} from "formik";
import {Status} from "../../components/InitalPages/Description/Description";

interface RegisterQueryProps {
    email: string;
    password: string;
    isCompany: boolean;
}

const USER_REGISTER_MUTATION = gql`
    mutation UserRegisterMutation($firstName: String! ,$lastName: String!, $username: String!, $description: String, 
        $title: String, $company: String, $startedAtMonth: String, $startedAtYear: String, $finishedAtMonth: String, $finishedAtYear: String) {
        signupUser(UserSignupRequest: { firstName: $firstName, lastName: $lastName, username: $username , description:$description,
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
        email: "",
        password: "",
        isCompany: false,
    });
    const [signupUser] = useMutation(USER_REGISTER_MUTATION, {
        variables: {
            email: formState.email,
            password: formState.password,
            isCompany: formState.isCompany,
        },
        onCompleted: ({ register }) => {
            history.push("/login");
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
                        password: '',
                        email: '',
                        is_vendor: false,
                    }}
                    validationSchema={validation}
                    onSubmit={(
                        values: RegisterFormInput,
                        { setSubmitting }: FormikHelpers<RegisterFormInput>
                    ) => {
                        setFormState({ email: values.email, password: values.password , isCompany: values.is_vendor});
                        signupUser();
                    }}
                >
                    <Form>

                        <StringInput placeholder={"نام"} name={"name"} dir={"rtl"} />
                        <StringInput placeholder={"نام خانوادگی"} name={"last_name"} dir={"rtl"} />
                        <StringInput placeholder={"نام کاربری"} name={"user_name"} dir={"rtl"} />
                        <StringInput placeholder={"آخرین عنوان شغلی"} name={"job_title"} dir={"rtl"} />
                        <StringInput placeholder={"نام شرکت"} name={"company_name"} dir={"rtl"} />
                        <ChoiceTimeInput name={"تاریخ شروع"}/>
                        <ChoiceTimeInput name={"تاریخ پایان"}/>
                        <PictureInput name={"+ اضافه کردن تصویر پروفایل"}/>
                        <ButtonPrimary name={"ثبت"}/>

                    </Form>
                </Formik>

            </Cart>

        </div>
    );
};