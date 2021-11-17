import { User } from "../../models/User";
import Usericon from "../../images/Usericon.svg";
import "./UserCard.Style.scss";

type ImageSize = "S" | "M" | "L";

export const UserCard = ({
  user,
  componentname,
  image_size,
}: {
  user: User;
  componentname: string;
  image_size: ImageSize;
}) => {
  const { name, description, img } = user;

  return (
    <div className={`${componentname}_Container_Div || ""`}>
      <div className={`${componentname}_Image_Div || ""`}>
        <img
          src={img || Usericon}
          className={`border-none cursor-pointer rounded-2xl Image_${image_size}`}
          alt=""
        />
      </div>
      <div className={`${componentname}_Info_Div || ""`}>
        <div className={`${componentname}_Name`}>{name}</div>
        <div className={`${componentname}_Role`}>{description}</div>
      </div>
    </div>
  );
};
