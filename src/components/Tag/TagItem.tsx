import React from "react";
import { Tag } from "./Tag.types";

export const TagItem = ({
  tag,
  index,
  classname,
}: {
  tag : string;
  index: number;
  classname: string;
}) => {
  return (
    <span
      dir="ltr"
      key={index.toString()}
      className={`inline-block mx-1 my-1 px-3 py-0.5 cursor-pointer ${classname} | ""`} 
    >
      #{tag}
    </span>
  );
};
