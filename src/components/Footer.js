import React from "react";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";

export default function Footer() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const scrollUp = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <footer>
      <div className="row">
        <div>MUMIA</div>
        <div>All right reserved</div>{" "}
        <div className="back-to-top">
          <button type="button" onClick={scrollUp}>
            <i className="fa fa-arrow-up" />
          </button>
        </div>
        {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
        <div>MUMIA</div>
      </div>
    </footer>
  );
}
