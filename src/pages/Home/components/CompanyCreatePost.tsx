import { Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "../../../components/Buttun/Button";
import { Card } from "../../../components/Card/Card";
import { User } from "../../../models/User";
import { UserCard } from "../../../components/UserCard/UserCard";
import { PostInput } from "./PostInput";
import { Tag } from "../../../components/Tag/Tag.types";
import { useMutation } from "@apollo/client";
import { C_CREATE_POST_MUTATION } from "../graphql/mutations";
import { CreatableMulti, Option } from "./SelectTag";

interface CompanyCreatePostProps {
  user: User;
}

type FormValues = {
  content: string;
  tags?: string[];
};

const initialValues = {
  content: "",
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

export const CompanyCreatePost = ({ user }: CompanyCreatePostProps) => {
  const [createpost, { error }] = useMutation(C_CREATE_POST_MUTATION);

  const taged = React.useMemo(() => makeTagOption(fetechedTag), [fetechedTag]);

  const onSubmit = (values: FormValues, onSubmitProps: any) => {
    console.log(values);
    addpost(values.content, values.tags);
    onSubmitProps.resetForm();
  };

  const addpost = (content: string, tags?: string[]) => {
    createpost({
      variables: {
        content: content,
        tags: tags,
      },
    });
    console.log(`this is content ${content}`);
    if (error) {
      console.log(error);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form>
            <Card classname="Create_Post">
              <UserCard
                user={user}
                componentname="Create_Post"
                image_size="M"
              />

              <PostInput title="درخواست نیرو ..." />
              <div dir="ltr" className="mb-4 mx-7">
                <Field
                  className="Select_Tag"
                  name="tags"
                  options={taged}
                  component={CreatableMulti}
                />
              </div>

              <div
                dir="ltr"
                className="pt-4 pb-6 border-t-2 mx-7 rounded-b-3xl"
              >
                <Button
                  type="submit"
                  disabled={!formik.dirty}
                  gruop="Primary"
                  lang="fa"
                  size="M"
                >
                  ارسال
                </Button>
              </div>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};
