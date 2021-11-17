import React, { useState } from "react";
import { FC, HTMLProps } from "react";
import { MessageType } from "../MessagePage";
import { CompanyMessage } from "./CompanyMessage/CompanyMessage";
import "./CompanyMessages.Style.scss";
import { UserCard } from "./../../../components/UserCard/UserCard";
import { Tag } from "../../../components/Tag/Tag.types";
import { Card } from "../../../components/Card/Card";
import { TagItem } from "../../../components/Tag/TagItem";
import { ReactComponent as ArrowSVG } from "../../../images/Arrow.svg";
import { useUserContext } from "../../../UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../Home/graphql/query";

interface CompanyMessagesProps extends HTMLProps<HTMLDivElement> {
  messagesList: Array<MessageType>;
  children?: React.ReactNode;
}
const fetechedTag: Array<Tag> = [
  { name: "work" },
  { name: "business" },
  { name: "hr" },
];
// const fetchedUser: User = {
//   id:"1",
//   name: "farzaneh",
//   role: "Developer",
//   img: "https://picsum.photos/id/1005/40",
// };
export type message = { id: number; title: string; body: string; date: string };
export const CompanyMessages: FC<CompanyMessagesProps> = (
  { messagesList }: CompanyMessagesProps,
  props: CompanyMessagesProps
) => {
  const userId = sessionStorage.getItem("id");

  const {
    loading,
    data: { getProfile: user }={}}= useQuery(GET_USER, { variables: { id: userId } });

 

  const [seeMore, setSeeMore] = useState(false);

  const messages = React.useCallback(
    (min: number, max: number) =>
      messagesList
        .slice(min, max)
        .map((message) => <CompanyMessage message={message} />),
    [messagesList]
  );
  const jobTitle = "استخدام نیروی منابع انسانی در ایران ...";
  const Taglist = fetechedTag;
  const tag = React.useMemo(
    () =>
      Taglist.map((a, index) => (
        <TagItem tag={a.name} index={index} classname="tag-span-sidebar" />
      )),
    [Taglist]
  );
  const lenght = messagesList.length;
  const status = seeMore ? "less" : "more";
  const onclick = () => {
    setSeeMore(!seeMore);
  };

  if (loading) return <div>"Loading..."</div>
  return (
    <div className={`companyMessagesCard ${props.className || ""}`}>
      <div>
        <UserCard user={user} componentname="Message" image_size="L" />
        <div className="text-sm mr-7">{jobTitle}</div>
        <Card classname="shortTag">
          <div className="mt-3.5 mb-5 mx-7">{tag}</div>
        </Card>

        <hr className="w-90% mx-8" />
      </div>
      <div className="companyMessagesHeader">رزومه های ارسالی</div>
      <div>
        {messages(0, 3)}
        {seeMore ? (
          messages(3, lenght)
        ) : (
          <div className="flex justify-center">
            <div className="my-4 container_Arrow">
              <ArrowSVG id="arrow_svg" onClick={onclick} className="w-full h-full cursor-pointer " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
