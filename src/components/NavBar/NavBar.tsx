import React, { useEffect, useState } from "react";
import { faBell, faHome, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Icon, Logo } from "./components/NavBarIcon";
import "./NavBar.Style.scss";
import { MessageNotifications } from "../MessageNotifications/MessageNotifications";
// import { Message } from "../MessageNotifications/Message";
import { NotificationMessage } from "../MessageNotifications/NotificationMessage";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavBarItem } from "./components/NavBarItem";

type message = {
  id: number;
  title: string;
  body: string;
  date: string;
};

export default function Navbar() {
  const history = useHistory();
  const [location, setLocation] = useState(useLocation());
  console.log(location);

  console.log(location);
  const [formState, setFormState] = useState({
    homeSelected: true,
    alarmSelected: false,
    userSelected: false,
  });
  const [notificationState, setNotificationState] = useState("hidden");
  const [notificationNumber, setNotificationNumber] = useState(0);

  const message1: message = {
    id: 1,
    title: "title1",
    body: "body1",
    date: "new Date()",
  };

  return (
    <div className="navbar">
      <div className="flex flex-row w-1/5 max-w-xs ">
        <Logo className="flex items-center align-middle logo"></Logo>
        <div className=" vl"></div>
      </div>
      <div className="w-3/5 max-w-xl mx-3.5 flex items-center align-middle">
        <NavBarItem referTo="/home">
          <FontAwesomeIcon className="far homeIcon hoverItem" icon={faHome} />
        </NavBarItem>
        <NavBarItem
          referTo="/message"
          alarmBadge
          onMouseEnter={() => {
            if (notificationNumber > 0) {
              setNotificationState("");
            }
          }}
          onMouseLeave={() => {
            setNotificationState("hidden");
          }}
        >
          <FontAwesomeIcon
            className="far fa-2x hoverItem alarm"
            icon={faBell}
          />
          <span className={notificationNumber === 0 ? "hidden-badge" : "badge"}>
            +{notificationNumber}
          </span>
        </NavBarItem>

        <NavBarItem referTo="/follow">
          <FontAwesomeIcon className="far userIcon hoverItem" icon={faUsers} />
        </NavBarItem>
      </div>
      <div className="w-1/5 max-w-xs"></div>

      <MessageNotifications
        onMouseEnter={() => {
          if (notificationNumber > 0) setNotificationState("");
        }}
        onMouseLeave={() => {
          setNotificationState("hidden");
        }}
        className={notificationState}
      >
        {/* <NotificationMessage key="1" message={message1}></NotificationMessage>
        <NotificationMessage key="2" message={message1}></NotificationMessage>
        <NotificationMessage key="3" message={message1}></NotificationMessage>
        <NotificationMessage key="4" message={message1}></NotificationMessage> */}
      </MessageNotifications>
    </div>
  );
}
