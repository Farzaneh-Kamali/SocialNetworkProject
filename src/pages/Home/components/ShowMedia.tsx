import { useFormikContext } from "formik";
import React from "react";

export const ShowMedia = () => {
  const { values } = useFormikContext<{ image: File; video: File }>();

  const { image, video } = React.useMemo(
    () => ({
      image: values.image && URL.createObjectURL(values.image),
      video: values.video && URL.createObjectURL(values.video),
    }),
    [values.image, values.video]
  );

  return image || video ? (
    <div className="flex justify-center my-5 mx-9 border-1 ">
      {image && (
        <img
          key={image}
          className="max-w-xl rounded-3xl max-h-80"
          src={image}
          alt=""
        />
      )}
      {video && (
        <video key={video} className="rounded-3xl max-h-96" controls>
          <source src={video} />
        </video>
      )}
    </div>
  ) : null;
};
