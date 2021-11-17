import { useQuery } from "@apollo/client";
import React from "react";
import { User } from "../../../models/User";
import { GET_COMPANY_POSTS } from "../graphql/query";
import { CPost } from "../types/CPost.type";
import { CompanyPostCard } from "./CompanyPostCard";
interface CompanyPostProps {
  user: User;
}

const fetechedPost: Array<CPost> = [
  {
    user:{
      userId:"101",
      name:"LinkedIn",
      description:"SocialNetwork",
      isCompany:true,
      isActive:true,
      img:""
    },
    posts: {
      content: "استخدام نیروی منابع انسانی در ایران",
      tags: [{ name: "hr" }],
    },
    resumeNumber: 9,
  },
  {
    user:{
    userId:"101",
    name:"LinkedIn",
    description:"SocialNetwork",
    isCompany:true,
    isActive:true,
    img:""
  },
  posts: {
      content: "استخدام مدیر سئو",
      tags: [{ name: "digital" }],
    },
  },
];

export const CompanyPost = ({ user }: CompanyPostProps) => {
  const { loading, data: { companyProfile: post } = {} } = useQuery(
    GET_COMPANY_POSTS,
    { variables: { id: user.userId } }
  );

  const onclick = () => {
    console.log(post.posts);
  };

  const posts = React.useMemo(
    () =>
      // [post.posts] &&
      fetechedPost.map((a: any, index: any) => (
        <CompanyPostCard key={index.toString()} post={a} />
      )),
    [fetechedPost]
  );
  // if (loading) return <></>;

  return (
    <div>
      <div>{posts}</div>
    </div>
  );
};
