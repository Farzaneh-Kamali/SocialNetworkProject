import React from "react";
import { Card } from "../../../components/Card/Card";
import { ReadMore } from "../../../components/MoreLink/ReadMore";
import { TagItem } from "../../../components/Tag/TagItem";
import { User } from "../../../models/User";
import { UserCard } from "../../../components/UserCard/UserCard";
import { CPost } from "../types/CPost.type";
import { Button } from "../../../components/Buttun/Button";

interface CompanyPostCardProps {
  post: CPost;
}
export const CompanyPostCard = ({ post }: CompanyPostCardProps) => {
  const {user,posts,resumeNumber } = post;

  const tags = React.useMemo(
    () =>
      posts.tags &&
      posts.tags.map((a, index) => (
        <TagItem tag={a.name.toString()} index={index} classname="tag-span-sidebar" />
      )),
    [posts.tags]
  );
  return (
    <Card classname="Post">
      <UserCard user={user} componentname="Message" image_size="L" />

      <div>
        <ReadMore text={posts.content} />
      </div>
      <div className="my-3 mx-9">{tags}</div>

      <div dir="ltr" className="grid mb-5 ml-8">
        {resumeNumber && (
          <label className="grid items-center justify-center resume-box">
            {resumeNumber}+
          </label>
        )}
        <Button gruop="Secondary" lang="fa" size="XL" type="button">
          رزومه های دریافتی
        </Button>
      </div>
    </Card>
  );
};
