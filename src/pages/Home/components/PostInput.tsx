import { Field } from "formik";
import React from "react";
import EditIcon from "../../../images/Vector.svg";

export const PostInput = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="flex items-start mr-9">
        <img src={EditIcon} alt="" />
        <Field
          as="textarea"
          id="content"
          name="content"
          className="w-full ml-2 mr-2 overflow-hidden text-base font-light text-black outline-none resize-none focus:text-black-600"
          placeholder={title}
        />
      </div>
    </div>
  );
};
