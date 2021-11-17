import { FC } from "react";

import { User } from "../../models/User";

import "./MessagePage.Style.scss";
import { CardContainerWithFollow } from "../../components/Card/CardContainer";
import { CompanyMessages } from "./CompanyMessagePage/CompanyMessages";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../Home/graphql/query";

interface MessagePageProps {}

export type MessageType = {
  messageId: number;
  user: User;
  messageBody: string;
  messageDate: string;
  messageType: string;
};

const fetchedMessages: Array<MessageType> = [
  {
    messageId: 1,
    user: {
      userId: "1",
      isCompany: false,
      name: "farzaneh",
      description: "Developer",
      isActive: true,
      img: "https://picsum.photos/id/1005/40",
    },
    messageBody: "body1",
    messageDate: "date1",
    messageType: "type1",
  },
  {
    messageId: 2,
    user: {
      userId: "2",
      isCompany: false,
      name: "AmirBahador",
      isActive: true,
      description: "Devops",
      img: "https://picsum.photos/id/2/40",
    },
    messageBody: "body2",
    messageDate: "date2",
    messageType: "type2",
  },
  {
    messageId: 3,
    user: {
      userId: "3",
      isCompany: false,
      name: "Mehdi",
      isActive: true,
      description: "FrontEnd Developer",
      img: "",
    },
    messageBody: "body3",
    messageDate: "date3",
    messageType: "type3",
  },
  {
    messageId: 4,
    user: {
      userId: "20",
      isCompany: false,
      name: "Mehdi",
      isActive: true,
      description: "FrontEnd Developer",
      img: "",
    },
    messageBody: "body3",
    messageDate: "date3",
    messageType: "type3",
  },
];

// const fetechedUser: User = {
//   id: "101",
//   name: "LinkedIn",
//   role: "Internet sunnyvale,CA",
//   img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
// };

export const MessagePage: FC<MessagePageProps> = () => {
  //const users = fetechedUser;
  const userId = sessionStorage.getItem("id");

  const {
    loading,
    data: { getProfile: user }={}}= useQuery(GET_USER, { variables: { id: userId } });

 
if (loading) return <div>"Loading..."</div>
  // alert(user);
  return (
    <CardContainerWithFollow user={user}>
      {/* <UserMessages messagesList={fetchedMessages} className="mt-9" /> */}
      {/* <MessageApp /> */}
      <CompanyMessages messagesList={fetchedMessages} className="mt-9" />
    </CardContainerWithFollow>
    // <div className="flex justify-center main ">
    //   <div className="w-1/5 max-w-xs ">
    //     <UserProfile user={user} />
    //     <FollowReq
    //       connecetlist={fetechedConnectReq}
    //       title="ارتباطات خود را گسترش دهید"
    //       type="connect"
    //       butname="Connect"
    //     />
    //   </div>
    //   <div className="w-3/5 max-w-xl mx-3.5 ">
    //     <UserMessages
    //       test1="tes"
    //       messagesList={fetechedMessages}
    //       className="mt-9"
    //     />
    //   </div>
    //   <div className="w-1/5 max-w-xs">
    //     <Tags Taglist={fetechedTag} />
    //   </div>
    // </div>
  );
};
