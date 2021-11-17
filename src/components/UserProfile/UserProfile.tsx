import React from "react";
import { Card } from "../Card/Card";
import "./UserProfile.Style.scss";
import { UserCard } from "../UserCard/UserCard";
import { User } from "../../models/User";
import { ReactComponent as VectorSvg } from "../../images/Vector.svg";
import { useHistory } from "react-router";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {

    const history = useHistory();
    const onclick=()=>{
        history.push("/user_register");
    }
    return (
        <Card classname="User_Profile" >

            <div className="mt-12">
                <UserCard user={user} componentname="Profile" image_size="L" />
            </div>
            <div className="flex items-end justify-center ">
                <div className="flex justify-center w-3 h-3 mb-2 container_vector">
                    <VectorSvg id="vector_svg" className="w-full h-full" onClick={onclick} />
                </div>
            </div>
            <div className="flex items-end justify-center mb-3.5">
                <a href=" " className="logout hover:underline" >logout</a>
            </div>


        </Card>
    )
}

