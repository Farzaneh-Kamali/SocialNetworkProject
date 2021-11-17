import React from "react";
import "../../../variables/variables.scss";
import { useMutation } from "@apollo/client";
import { User } from "../../../models/User";
import { CREATE_POST_MUTATION } from "../graphql/mutations";
import { UPLOAD_FILE_MUTATION } from "../graphql/mutations";
import { Uploader } from "./Uploader";
import { UserCard } from "../../../components/UserCard/UserCard";
import { Formik, Form } from "formik";
import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Buttun/Button";
import { PostInput } from "./PostInput";
import { ShowMedia } from "./ShowMedia";

interface CreatePostProps {
  user: User;
}
const initialValues = {
  content: "",
  video: undefined,
  image: undefined,
};

type FormValues = {
  content: string;
  video?: File;
  image?: File;
};

export const CreatePost = ({ user }: CreatePostProps) => {
  const [createpost, { error }] = useMutation(CREATE_POST_MUTATION);
  const [uploadFile] = useMutation(UPLOAD_FILE_MUTATION, {
    onCompleted: (data) => console.log(data),
  });

  const onSubmit = (values: FormValues, onSubmitProps: any) => {
    console.log(values);

    // if (values.image || values.video) {
    //   values.image
    //     ? addpost(values.content, values.image)
    //     : addpost(values.content, values.video);
    // } else {
    //   addpost(values.content);
    // }
    addpost(values.content);
    // values.image && addfile(values.image);
    onSubmitProps.resetForm();
    console.log("after reset", values);
  };

  // const addpost = (content: string) => {
  //   createpost({
  //     variables: {
  //       content: content,
  //     },
  //   });
  //   console.log(`this is content ${content}`);
  //   if (error) {
  //     console.log(error);
  //   }
  // };

  const addfile = (image: File) => {
    uploadFile({
      variables: {
        file: image,
      },
    });
    console.log("this is content image");
    if (error) {
      console.log(error);
    }
  };
  const addpost = (content: string, file?: File) => {
    createpost({
      variables: {
        content: content,
        file: file,
      },
    });
    console.log(`this is content ${content}`);
    if (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
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
                <PostInput title="چیزی بنویس ..." />

                <ShowMedia />

                <div dir="ltr" className="py-2.5 px-7 rounded-b-3xl send-box">
                  <Button
                    disabled={!formik.dirty}
                    type="submit"
                    gruop="Primary"
                    lang="fa"
                    size="M"
                  >
                    ارسال
                  </Button>

                  <Uploader label="Video" name="video" />
                  <Uploader label="Photo" name="image" />
                </div>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
