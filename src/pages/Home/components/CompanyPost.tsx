import { useQuery } from "@apollo/client";
import React from "react";
import { User } from "../../../models/User";
import { GET_COMPANY_POSTS } from "../graphql/query";
import { CompanyPostCard } from "./CompanyPostCard";
interface CompanyPostProps {
  user: User;
}


// const fetechedPost: Array<CPost> = [
//
//   {
//     body: {
//       text: "استخدام نیروی منابع انسانی در ایران",
//       tags: [{ name: "hr" }],
//     },
//     resumeNumber: 9,
//   },
//   {
//     body: {
//       text: "استخدام مدیر سئو",
//       tags: [{ name: "digital" }],
//     },
//   },
// ];

export const CompanyPost = ({ user }: CompanyPostProps) => {
  // cosnt post = fetechedPost
  const id=user.userId;
  const { error, data } = useQuery(GET_COMPANY_POSTS, {
    variables: { id },
    //pollInterval: 1000,
  });
  const onclick=()=> {
    console.log(user);
    console.log(data);
  }
 
  // const posts = React.useMemo(
  //   () =>
  //     // data &&
  //    fetechedPost.map((a: any, index: any) => (
  //       <CompanyPostCard key={index.toString()} post={a} />
  //     )),
  //   [fetechedPost]
  // );

  if (error) return <div>`Error! ${error.message}`;</div>;
  return <></>
  // return<div><button onClick={onclick}>click</button></div>
  // return <div>{posts}</div>;
};
