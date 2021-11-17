import React from "react";
import { FollowReq } from "../FollowReq/FollowReq";

import { Tags } from "../Tag/Tags";
import { User } from "../../models/User";
import { UserProfile } from "../UserProfile/UserProfile";
import { useQuery } from "@apollo/client";
import { GET_SKILL } from "../../pages/Skills/Skills.query";

// eslint-disable-next-line react-hooks/rules-of-hooks

const fetechedConnectReq: Array<User> = [
  {
    userId: "2",
    isCompany:false,
    name: "AmirBahador",
    description: "Devops",
    img: "https://picsum.photos/id/2/40",
    isActive: true
  },
  {
    userId: "3",
    isCompany:false,
    name: "Mehdi",
    description: "FrontEnd Developer",
    img: "",
    isActive: true
  },
  {
    userId: "4",
    isCompany:false,
    name: "Sina",
    description: "BackEnd Developer",
    img: "https://picsum.photos/id/175/40",
    isActive: true
  },
  {
    userId: "5",
    isCompany:false,
    name: "Mehrdad",
    description: "SEO",
    img: "https://picsum.photos/id/250/40",
    isActive: true
  },
  {
    userId: "6",
    isCompany:false,
    name: "Neda",
    description: "Manager",
    img: "",
    isActive: true
  },
  {
    userId: "7",
    isCompany:false,
    name: "Mahour",
    description: "UI/UX Designer",
    img: "https://picsum.photos/id/1014/40",
    isActive: true
  },
];

const CardContainer = ({
  children,
  right,
  user
}: {
  children: JSX.Element | JSX.Element[];
  right: JSX.Element | JSX.Element[];
  user:User;
}) => {

  const {
    loading,
    data: { getSkills: tag }={}}= useQuery(GET_SKILL, { variables: { id: user.userId } });
    // data: { getSkills: tag }={}}= useQuery(GET_SKILL, { variables: { id: user.userId } , pollInterval:2000});

  if (loading) return null;


  return (
    <div className="flex justify-center h-full main">
      {right}
      <div id="center" className="w-3/5 max-w-xl mx-3.5 mt-9">
        {children}
      </div>
      <div id="left" className="w-1/5 max-w-xs mt-9">
        <Tags Taglist={tag.skill} /> 
      </div>
    </div>
  );
};

export const CardContainerWithFollow = ({
  children,
  user,
}: {
  children: JSX.Element | JSX.Element[];
  user: User;
}) => (
  <CardContainer user={user}
    right={
      <div id="right" className="w-1/5 max-w-xs mt-9 ">
        <UserProfile user={user} />
        <FollowReq
          connecetlist={fetechedConnectReq}
          title="ارتباطات خود را گسترش دهید"
          type="Connect"
          butname="Connect"
        />
      </div>
    }
  >
    {children}
  </CardContainer>
);

export const CardContainerWithoutFollow = ({
  children,
  user,
}: {
  children: JSX.Element | JSX.Element[];
  user: User;
}) => (
  <CardContainer user={user}
    right={
      <div id="right" className="w-1/5 max-w-xs mt-9">
        <UserProfile user={user} />
      </div>
    }
  >
    {children}
  </CardContainer>
);
