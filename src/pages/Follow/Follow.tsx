import React from "react";
import { User } from "../../models/User";
import { FollowReq } from "../../components/FollowReq/FollowReq";
import "../../components/FollowReq/Follow.Style.scss";
import { CardContainerWithoutFollow } from "../../components/Card/CardContainer";
import { useUserContext } from "../../UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Home/graphql/query";

const fetechedConnectsug: Array<User> = [
  {
    userId: "2",
    isCompany: false,
    name: "AmirBahador",
    description: "Devops",
    img: "https://picsum.photos/id/2/40",
    isActive: true,
  },
  {
    userId: "3",
    isCompany: false,
    name: "Mehdi",
    description: "FrontEnd Developer",
    isActive: true,
    img: "",
  },
  {
    userId: "4",
    isCompany: false,
    name: "Sina",
    description: "BackEnd Developer",
    img: "https://picsum.photos/id/175/40",
    isActive: true,
  },
  {
    userId: "5",
    isCompany: false,
    name: "Mehrdad",
    description: "SEO",
    img: "https://picsum.photos/id/250/40",
    isActive: true,
  },
  {
    userId: "6",
    isCompany: false,
    name: "Neda",
    description: "Manager",
    img: "",
    isActive: true,
  },
  {
    userId: "7",
    isCompany: false,
    name: "Mahour",
    description: "UI/UX Designer",
    img: "https://picsum.photos/id/1014/40",
    isActive: true,
  },
];

const fetechedfollowReq: Array<User> = [
  {
    userId: "8",
    isCompany: false,
    name: "Navid",
    description: "Devops",
    img: "https://picsum.photos/id/319/40",
    isActive: true,
  },
  {
    userId: "9",
    isCompany: false,
    name: "Sara",
    description: "FrontEnd Developer",
    img: "https://picsum.photos/id/342/40",
    isActive: true,
  },
  {
    userId: "10",
    isCompany: false,
    name: "Mari",
    description: "BackEnd Developer",
    img: "https://picsum.photos/id/177/40",
    isActive: true,
  },
  {
    userId: "11",
    isCompany: false,
    name: "Mohammad",
    description: "SEO",
    img: "https://picsum.photos/id/180/40",
    isActive: true,
  },
  {
    userId: "12",
    isCompany: false,
    name: "Omid",
    description: "Manager",
    img: "https://picsum.photos/id/20/40",
    isActive: true,
  },
  {
    userId: "13",
    isCompany: false,
    name: "Sahar",
    description: "UI/UX Designer",
    img: "https://picsum.photos/id/30/40",
    isActive: true,
  },
];

// const fetechedUser: User = {
//   userId:"1",
//   name: "farzaneh",
//   description: "Developer",
//   img: "https://picsum.photos/id/1005/40",
// };
export const Follow = () => {
  const userId = sessionStorage.getItem("id");

  const { loading, data: { getProfile: user } = {} } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <div>"Loading..."</div>;
  return (
    <CardContainerWithoutFollow user={user}>
      <FollowReq
        connecetlist={fetechedfollowReq}
        title="دعوت ها"
        type="Follow"
        butname="Accept"
      />
      <FollowReq
        connecetlist={fetechedConnectsug}
        title="ارتباطات خود را گسترش دهید"
        type="Follow"
        butname="Connect"
      />
    </CardContainerWithoutFollow>
  );
};
