import { useFormikContext } from "formik";
import React, { ChangeEvent } from "react";

export const FileInput = ({ name, ...rest }: { name: string }) => {
 
  const { setFieldValue, values } =
    useFormikContext<{ image: File; video: File }>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const file_size = e.target.files[0].size;
       if (file_size < 9437184.00402009){
         setFieldValue("video", undefined);
        setFieldValue("image", undefined);
        setFieldValue(name, e.target.files[0]);
       }
        else{
          alert("حجم فایل انتخابی باید کمتر از 9 مگا بایت باشد !")
        }
        
      }
      console.log(values.image , values.video);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <input
      id={name}
      name={name}
      type="file"
      {...rest}
      accept={`${name}/*`}
      onChange={onChange}
      className="hidden"
    />
  );
};
