import { FC } from "react";
import { UserProfile } from "../../components/UserProfile/UserProfile";

import { User } from "../../components/UserCard/types/User.types";
import { message, UserMessages } from "./components/UserMessages";
import { FollowReq } from "../../components/FollowReq/FollowReq";
import { Tag } from "../../components/Tag/Tag.types";
import { Tags } from "../../components/Tag/Tags";
import "./MessagePage.style.scss";

interface MessagePageProps {}
export type MessageType = {
  messageId: number;
  user: User;
  messageBody: string;
  messageDate: string;
  messageType: string;
};

const fetechedMessages: Array<MessageType> = [
  {
    messageId: 1,
    user: {
      name: "farzaneh",
      role: "Developer",
      img: "https://picsum.photos/id/1005/40",
    },
    messageBody: "body1",
    messageDate: "date1",
    messageType: "type1",
  },
  {
    messageId: 2,
    user: {
      name: "AmirBahador",
      role: "Devops",
      img: "https://picsum.photos/id/2/40",
    },
    messageBody: "body2",
    messageDate: "date2",
    messageType: "type2",
  },
  {
    messageId: 3,
    user: {
      name: "Mehdi",
      role: "FrontEnd Developer",
      img: "",
    },
    messageBody: "body3",
    messageDate: "date3",
    messageType: "type3",
  },
];

const fetechedUser: User = {
  name: "farzaneh",
  role: "Developer",
  img: "https://picsum.photos/id/1005/40",
};

const fetechedConnectReq: Array<User> = [
  {
    name: "AmirBahador",
    role: "Devops",
    img: "https://picsum.photos/id/2/40",
  },
  {
    name: "Mehdi",
    role: "FrontEnd Developer",
    img: "",
  },
  {
    name: "Sina",
    role: "BackEnd Developer",
    img: "https://picsum.photos/id/175/40",
  },
  {
    name: "Mehrdad",
    role: "SEO",
    img: "https://picsum.photos/id/250/40",
  },
  {
    name: "Neda",
    role: "Manager",
    img: "",
  },
  {
    name: "Mahour",
    role: "UI/UX Designer",
    img: "https://picsum.photos/id/1014/40",
  },
];

const fetechedTag: Array<Tag> = [
  { name: "work" },
  { name: "business" },
  { name: "hr" },
  { name: "userinterface" },
  { name: "digital" },
  { name: "userexperience" },
  { name: "ux" },
  { name: "ui" },
  { name: "freelance" },
];

export const MessagePage: FC<MessagePageProps> = () => {
  const user = fetechedUser;
  // const messages: Array<message> = [
  //   { id: 1, title: "title", body: "body", date: "date" },
  //   { id: 1, title: "title", body: "body", date: "date" },
  // ];

  return (
    <div className="flex justify-center main ">
      <div className="w-1/5 max-w-xs ">
        <UserProfile user={user} page="userprofile" />
        <FollowReq
          connecetlist={fetechedConnectReq}
          title="ارتباطات خود را گسترش دهید"
          type="connect"
          butname="Connect"
        />
      </div>
      <div className="w-3/5 max-w-xl mx-3.5 ">
        <UserMessages
          test1="tes"
          messagesList={fetechedMessages}
          className="mt-9"
        />
      </div>
      <div className="w-1/5 max-w-xs">
        <Tags Taglist={fetechedTag} />
      </div>
    </div>
  );
};