import { useQuery } from "@apollo/client";
import React from "react";
import { CardContainerWithFollow } from "../../components/Card/CardContainer";
import { useUserContext } from "../../UserContext";
import { CompanyCreatePost } from "./components/CompanyCreatePost";
import { CompanyPost } from "./components/CompanyPost";
import { GET_USER } from "./graphql/query";

// const fetechedUser: User = {
//   id:"101",
//   name: "LinkedIn",
//   role: "Internet sunnyvale,CA",
//   img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
// };

export const CompanyHome = () => {
  const userId = sessionStorage.getItem("id");

  const {
    loading,
    data: { getProfile: user }={}}= useQuery(GET_USER, { variables: { id: userId } });

 
if (loading) return <div>"Loading..."</div>
  return (
    <CardContainerWithFollow user={user}>
      <CompanyCreatePost user={user} />
      <CompanyPost user={user} />
    </CardContainerWithFollow>
  );
};
