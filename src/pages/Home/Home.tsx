import React from "react";
import { UserHome } from "./UserHome";
import { CompanyHome } from "./CompanyHome";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/query";

export const Home = () => {
  const userId = sessionStorage.getItem("id");

  const {
    loading,
    data: { getProfile: user }={}}= useQuery(GET_USER, { variables: { id: userId } });

 
if (loading) return <></>
  return user.isCompany ? <CompanyHome /> : <UserHome />;
};
