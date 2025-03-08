// src/components/log/LoginSuccess.js

import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    // 쿠키에서 유저 정보 가져오기
    const userid = cookies.get("userid");
    const user_name = cookies.get("user_name");
    const cf_number = cookies.get("cf_number");
    const user_au_lv = cookies.get("user_au_lv");

    // 로그아웃 함수
    const handleLogout = () => {
        cookies.remove("userid", { path: "/" });
        cookies.remove("user_name", { path: "/" });
        cookies.remove("cf_number", { path: "/" });
        cookies.remove("user_au_lv", { path: "/" });

        alert("로그아웃 되었습니다.");
        navigate("/member/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>로그인 성공!</h2>
            <p>환영합니다, {user_name}님! 🎉</p>
            <p>아이디: {userid}</p>
            <p>카페 번호: {cf_number}</p>
            <p>권한 레벨: {user_au_lv === "0" ? "관리자" : user_au_lv === "1" ? "매니저" : "사용자"}</p>
            <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
                로그아웃
            </button>
        </div>
    );
}

export default LoginSuccess;
