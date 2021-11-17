import React from "react";
import { Button } from "../Buttun/Button";
import { User } from "../../models/User";
import { UserCard } from "../UserCard/UserCard";

export const FollowCard = ({
  req,
  butname,
  type,
}: {
  req: User;
  butname: string;
  type: string;
}) => {
  return (
    <div className="flex">
      <div className="w-2/3">
        <UserCard user={req} componentname={type} image_size="S" />
      </div>

      <div dir="ltr" className="w-1/3 Button_Div">
        <Button type="button" gruop="Primary" lang="en" size="M">
          Connect
        </Button>
        {butname === "Accept" && <label className="Ignore_Label">Ignore</label>}
      </div>
    </div>
  );
};
