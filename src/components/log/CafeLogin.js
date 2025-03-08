import React, {useRef, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


function CafeLogin() {
    const [option, setOption] = useState("user");
    const [message, setMessage] = useState("");
    const userid = useRef();
    const passwd = useRef();
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleLogin = (e) => {
        e.preventDefault();
        if (userid.current.value=="") {
            window.alert('아이디를 입력하세요.');
            userid.current.focus();
            return;
        }
        if (passwd.current.value=="") {
            window.alert('비밀번호를 입력하세요.');
            passwd.current.focus();
            return;
        }
        
        const loginData={
            option: option, 
            userid: userid.current.value,
            passwd: passwd.current.value,
        };
        console.log("보낼 데이터:", loginData); // 🔍 콘솔 확인


        fetch("http://localhost/api/member/login", {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        })
        .then(response => response.json())
        .then(data => {
            console.log("로그인 응답:", data);
            setMessage(data.message);
            if (data.status === 'success'){
                const expiresDate = new Date(); 
                expiresDate.setDate(expiresDate.getDate() + 30);
                cookies.set('cf_number', data.cf_number,{path:'/',expires: expiresDate });
                cookies.set('userid',data.userid,{path:'/',expires: expiresDate});
                cookies.set('user_name',data.user_name,{path:'/',expires: expiresDate});
                cookies.set('user_au_lv',data.user_au_lv,{path:'/',expires: expiresDate});
                
                alert(data.message)
                navigate('/success');
            } else {
                alert(data.message)
                navigate('/member/login?msg=error');
            }
        })
        .catch((error) => console.error("로그인 오류:", error));
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center"}}>
                <h2>CAFETITLE</h2>
                <form onSubmit={handleLogin}> 
                    <table border={"1"}>
                        <tbody>
                            <tr>
                                <td>사용자 유형</td>
                                <td>
                                    <select value={option} onChange={(e) => setOption(e.target.value)}> 
                                        <option value="user">사용자</option>
                                        <option value="manager">매니저</option>
                                        <option value="admin">관리자</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>아이디</td>
                                <td><input  name="userid" ref={userid} /></td> 
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td><input  name="passwd" type="password" ref={passwd} /></td> 
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button type="button" onClick={handleLogin
                                    } className="btn btn-primary full-width-button" >로그인</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <a href="추후결정" style={{color: "black", textDecoration: "none"}}>아이디</a>
                                    <a href="추후결정" style={{color: "black", textDecoration: "none"}}>/ 비밀번호 찾기</a>
                                    <a href="추후결정" style={{color: "black", textDecoration: "none"}}>/ 회원가입</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>

    );

};

export default CafeLogin;
