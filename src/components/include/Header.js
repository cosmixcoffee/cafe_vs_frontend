import React from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import "../../components/css/Header.css";

function Header_plus() {
    const cookies = new Cookies();

    const userid = cookies.get('userid');
    const user_name = cookies.get('user_name');
    const cf_number = cookies.get('cf_number');
    const user_au_lv = cookies.get('user_au_lv');

    const removeCookie = (name) => {
        cookies.remove("userid", {path: '/' });
        cookies.remove("user_name", {path: '/' });
        cookies.remove("cf_number", {path: '/' });
        cookies.remove("user_au_lv", {path: '/' });
        window.location.reload();
    };

    const getUserRole = () => {
        switch (user_au_lv) {
            case "0":
                return `${user_name}  관리자님 |`;
            case "1":
                return `${user_name}  매니저님 |`;
            case "2":
                return `${user_name}  회원님 |`;
            default:
                return "";
        }
    };

    return (
        <div className="Rheader">
            {userid ? (
                <>
                    <span>{getUserRole()}</span>
                    <Link to="마이페이지링크">마이페이지</Link>
                    <botton OnClick={removeCookie} className="logout_btn">로그아웃</botton>
                </>
            ):(<Link to="로그인링크">로그인</Link>

            )}
            <hr />
        </div>
        
    );
}

export default Header_plus;