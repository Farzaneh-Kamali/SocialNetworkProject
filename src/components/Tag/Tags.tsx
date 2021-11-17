import React from "react";
import { Card } from "../Card/Card";
import { ReactComponent as PlusSvg } from "../../images/Plus.svg";
import "./Tag.Style.scss";
import { Tag } from "./Tag.types";
import { TagItem } from "./TagItem";
import { useHistory } from "react-router-dom";

interface TagProps {
  Taglist: Array<Tag>;
}

export const Tags = ({ Taglist }: TagProps) => {
  const tags = React.useMemo(
    () =>
      Taglist.map((a, index) => (
        <TagItem tag={a.name} index={index} classname="tag-span-sidebar" />
      )),
    [Taglist]
  );
  const history = useHistory();
  const onclick = () => {
    history.push("/skills");
  };
  console.log(Taglist);
  return (
    <Card classname="Tag">
      <div className="flex items-center border-b mx-7">
        <div className="w-3/4 mb-2 mt-3.5 tag-title">
          <label> هشتگ هایی که دنبال میکنید</label>
        </div>
        <div dir="ltr" className="w-1/4">
          <div className="w-5 h-5 container_plus">
            <PlusSvg id="plus_svg" className="plus" onClick={onclick} />
          </div>
        </div>
      </div>
      <div dir="ltr" className="mt-3.5 mb-5 mx-7">
        {tags}
      </div>
    </Card>
  );
};
