import React, {useState} from 'react';
import { FunctionComponent } from 'react';
import {Cart} from "../../components/InitalPages/Cart/Cart";
import {Header} from "../../components/InitalPages/Header/Header";
import {StringInput} from "../../components/InitalPages/Input/Input";
import {ButtonPrimary} from "../../components/InitalPages/Button/Button";
import "./CompanyRegister.Style.scss"
import { Formik, Form , FormikHelpers} from 'formik';
import {RegisterFormInput} from './CompanyRegister.type';
import {useHistory} from "react-router-dom";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { User } from '../../models/User';

interface RegisterQueryProps {
    name: string;
    description: string;
}

const COMPANY_REGISTER_MUTATION = gql`
    mutation CompanyRegisterMutation($name: String!, $description: String) {
        companySignup(companySignupRequest: { name: $name, description: $description}) {
            success
            message
        }
    }
`;

export const CompanyRegister : FunctionComponent = () => {
    // const validation = registerValidateSchema()
    const history = useHistory();
    const [formState, setFormState] = useState<RegisterQueryProps>({
        name: "",
        description: "",
    });
    const [companySignup] = useMutation(COMPANY_REGISTER_MUTATION, {
        variables: {
            name: formState.name,
            description: formState.description,
        },
        onCompleted: ({ companySignup }) => {
            const userText = sessionStorage.getItem("user");
            const user:User = userText && JSON.parse(userText);
            user.isActive = true
            sessionStorage.setItem("user", JSON.stringify(user));
            history.push("/home");
        },
        onError: (error) => {
            console.log(error.message);
        },
    });
    return (

        <div className="company-register cart-container">
            <Cart>
                <Header name={"پروفایل"}/>

                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                    }}
                    // validationSchema={validation}
                    onSubmit={(
                        values: RegisterFormInput,
                        { setSubmitting }: FormikHelpers<RegisterFormInput>
                    ) => {
                        setFormState({ name: values.name , description: values.description });
                        companySignup();
                    }}
                >
                    <Form>
                        <StringInput name={"name"} dir={"rtl"} placeholder={"نام شرکت"}/>
                        <StringInput name={"description"} dir={"rtl"} placeholder={"توضیحات"}/>
                        <ButtonPrimary name={"ثبت"}/>

                    </Form>
                </Formik>

            </Cart>

        </div>
    );
};