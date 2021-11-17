import { Field, Form, Formik } from "formik";
import React from "react";
import {Tag} from "../../components/Tag/Tag.types";
import { useMutation } from "@apollo/client";
import { CREATE_TAG_MUTATION } from "./Skills.mutation";
import {CreatableMulti, Option} from "../Home/components/SelectTag";
import {Cart} from "../../components/InitalPages/Cart/Cart";
import {Header, SubHeader} from "../../components/InitalPages/Header/Header";
import {ButtonPrimary} from "../../components/InitalPages/Button/Button";
import {useHistory} from "react-router-dom";

type FormValues = {
    tags?: string[];
};

const initialValues = {
    tags: [],
};
const fetechedTag: Array<Tag> = [
    { name: "work" },
    { name: "business" },
    { name: "hr" },
    { name: "userinterface" },
    { name: "digital" },
    { name: "userexperience" },
    { name: "ux" },
    { name: "ui" },
    { name: "freelance" },
];
const makeTagOption = (x: Array<Tag>) =>
    x.map(
        (a) =>
            ({
                value: `${a.name}`,
                label: `#${a.name}`,
            } as Option)
    );

export const Skills = () => {

    const [create_tag, { error }] = useMutation(CREATE_TAG_MUTATION);
    const history = useHistory();


    const taged = React.useMemo(() => makeTagOption(fetechedTag), [fetechedTag]);

    const onSubmit = (values: FormValues, onSubmitProps: any) => {
        console.log(values);
        addtag(values.tags);
        onSubmitProps.resetForm();
        history.push("/home");
    };

    const addtag = (tags?: string[]) => {
        create_tag({
            variables: {
                tags: tags,
            },
        });
        if (error) {
            console.log(error);
        }
    };
    return (
        <div className="create_tag cart-container">
        <Cart>
            <Header name={"مهارت ها"}/>
            <SubHeader name={"مهارت هایی برای نشان دادن تخصص خود اضافه کنید"}/>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => {
                return (
                            <Form>

                            <div dir="ltr" className="mb-4 mx-7">
                                <Field
                                    className="Select_Tag"
                                    name="tags"
                                    options={taged}
                                    component={CreatableMulti}
                                />
                            </div>
                            <ButtonPrimary name={"ثبت"}/>
                            </Form>

                );
            }}
        </Formik>
        </Cart>
        </div>
    );
};
