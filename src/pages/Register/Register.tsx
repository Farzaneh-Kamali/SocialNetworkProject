import React, {useState} from 'react';
import { FunctionComponent } from 'react';
import {Cart} from "../../components/InitalPages/Cart/Cart";
import {Header} from "../../components/InitalPages/Header/Header";
import {CheckBoxInput, EmailInput, PassInput} from "../../components/InitalPages/Input/Input";
import {ButtonPrimary, ButtonSecondary} from "../../components/InitalPages/Button/Button";
import "./Register.style.scss"
import { Formik, Form , FormikHelpers} from 'formik';
import {RegisterFormInput} from './Register.type';
import {registerValidateSchema} from "./Register.validation";
import {useHistory} from "react-router-dom";
import {useMutation} from  "@apollo/client"
import {ErrorHandel} from "./components/error/Error";
import {gql} from "graphql-tag";
import {ErrorMessage} from "formik";
import {Status} from "../../components/InitalPages/Description/Description";

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


export const Register : FunctionComponent = () => {
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
                <Header name={"ثبت نام"}/>

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
                        <EmailInput />
                        <PassInput />
                        <CheckBoxInput />
                        <ErrorHandel>
                            <p>
                                <ErrorMessage name={"email"} />
                            </p>
                            <p>
                                <ErrorMessage name={"password"} />
                            </p>
                        </ErrorHandel>
                        <ButtonPrimary name={"ثبت نام"}/>

                    </Form>
                </Formik>

                <Status name={"عضو هستم"} />
                <ButtonSecondary name={"ورود"} path={"/login"}/>
            </Cart>

        </div>
    );
};