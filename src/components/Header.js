import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationService from "./auth/AuthenticationService"; 

import { Button, Dropdown } from "semantic-ui-react";
import logo from "../asset/logo_gym.png";
import styled from "styled-components";
import Message from "./Message/Message";
import { MenuItem, MenuSpan } from "./homeStyle";

export default function Header() {
    const [menuItem, setMenuItem] = useState(0);
    //const [memberseq, setMemberseq] = useState(localStorage.getItem("memberseq"));

    const navigate = useNavigate();
    let profile = null;

    useEffect(() => {
      // URL 검사
      const path = window.location.pathname;
      
      if(path === "/") {
        setMenuItem(1);
      } else if(path.startsWith('/community')) {
        setMenuItem(2);
      } else if(path.startsWith('/mate')) {
        setMenuItem(3);
      } else {
        setMenuItem(0);
      }
    }, [profile, window.location.pathname]);

    const handleMember =   () => {
      return (
        <>
          <Dropdown icon={null} trigger={
            <img
                src={`http://localhost:3000/images/profile/${localStorage.getItem('profile')}`}
                alt="프로필"
                width="28"
                height="28"
                style={{ borderRadius: '50%', overflow:'hidden', objectFit: 'cover'}}
            />} >
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/mypage/profilecard/profile" style={{ color:'black'}}>마이페이지</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Message />

          <Link to="/write">
            <Button size="mini" style={{ color:'white', backgroundColor:'#5271FF'}}>글쓰기</Button>
          </Link>
        </>
        
      );
    }

    const handleGuest = () => {
      return (
        <>
          <MenuSpan>
            <Link to="/login">로그인</Link>
          </MenuSpan>
          <Link to="/signup">회원가입</Link>
        </>
      );
    }

    const logout = () => {
        AuthenticationService.logout();
        alert("로그아웃되었습니다.");
        navigate("/");
    };

    return (
        <header style={{ height : "70px", position:'fixed',width:'100%', backgroundColor:'white', zIndex:'1000', borderBottom:'2px solid rgba(34,36,38,.15)'}}>
          <div style={{ width:'1100px', margin:'auto', display:'flex', alignItems:'center'}}>
            <Link to="/">
              <img alt="logo" src={logo} style={{ verticalAlign: "middle", width:"150px", margin:"15px 15px 15px 0"}} />
            </Link>
            
            <span>
              <MenuItem className={menuItem === 1 && "active"} to="/">홈</MenuItem>
              <MenuItem className={menuItem === 2 && "active"} to="/community/1">커뮤니티</MenuItem>
              <MenuItem className={menuItem === 3 && "active"} to="/mate/health">헬친</MenuItem>
            </span>

            <div style={{ float:"right", display: 'flex', marginLeft:'auto'}}>
              {localStorage.getItem("memberseq") == null ? handleGuest():handleMember()}
            </div>
          </div>
        </header>
    );
}

