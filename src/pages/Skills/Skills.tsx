import React, {useState} from 'react';
import { FunctionComponent } from 'react';
import {Cart} from "../../components/InitalPages/Cart/Cart";
import {Header} from "../../components/InitalPages/Header/Header";
import {StringInput} from "../../components/InitalPages/Input/Input";
import {ButtonPrimary} from "../../components/InitalPages/Button/Button";
import "./Skills.Style.scss"
import { Formik, Form , FormikHelpers} from 'formik';
import {RegisterFormInput} from './Skills.type';
import {registerValidateSchema} from "./Skills.validation";
import {useHistory} from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";


interface RegisterQueryProps {
    email: string;
    password: string;
    isCompany: boolean;
}

const REGISTER_MUTATION = gql`
    mutation RegisterMutation($email: String!, $password: String!, $isCompany: Boolean!) {
        signup(signupRequest: { email: $email, password: $password, isCompany:$isCompany }) {
            success
            message
            email
            isCompany
        }
    }
`;

export const Skills : FunctionComponent = () => {
    const validation = registerValidateSchema()
    const history = useHistory();
    const [formState, setFormState] = useState<RegisterQueryProps>({
        email: "",
        password: "",
        isCompany: false,
    });
    const [register] = useMutation(REGISTER_MUTATION, {
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
                <Header name={"مهارت ها"}/>

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
                        register();
                    }}
                >
                    <Form>
                        <StringInput name={"skills"} dir={"rtl"} placeholder={"اضافه کردن مهارت"}/>
                        <ButtonPrimary name={"ثبت"}/>
                    </Form>
                </Formik>

            </Cart>

        </div>
    );
};