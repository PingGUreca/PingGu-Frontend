import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import pinggu from '../images/pinggu.png';

const MenuTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80%;
  margin: 1rem auto;
  padding-top: 2.0rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ddd;
  padding-left: 20px;
  position: relative;
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 30px;

  a {
    text-decoration: none;
    color: #888;
    font-size: 21px;
    font-weight: 600;
    padding: 6px 12px;

    &.active {
      color: #00328F;
      border-bottom: 2px solid #00328F;
    }
  }
`;

const LogoGroup = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  font-weight: 600;
  padding: 6px 12px;
  cursor: pointer;
  text-decoration: none;

  &.active {
    color: #00328F;
    border-bottom: 2px solid #00328F;
  }

  &:hover {
    color: #00328F;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: 0.95rem;
`;

const LogoImage = styled.img`
  width: 50px;
  height: auto;
`;

const LogoText = styled.span`
  font-size: 30px;
  color: #00328F;
  font-weight: bold;
`;

const Layout = () => {
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('access_token');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.delete('https://pinggu-backend.fly.dev/auth/logout', {
                withCredentials: true,
            });
            localStorage.removeItem('access_token');
            alert('로그아웃 되었습니다.');
            navigate('/');
            window.location.reload();
        } catch (err) {
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <MenuTab>
                <MenuGroup>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🔥 소셜매칭</Link>
                    <Link to="/write" className={location.pathname === '/write' ? 'active' : ''}>📋 모집글쓰기</Link>
                </MenuGroup>

                <LogoGroup>
                    <LogoImage src={pinggu} alt="PingGu" />
                    <LogoText>PingGu</LogoText>
                </LogoGroup>

                <MenuGroup>
                    <Link to="/mypage" className={location.pathname === '/mypage' ? 'active' : ''}>MyPage</Link>
                    {isLoggedIn ? (
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    ) : (
                        <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>로그인</Link>
                    )}
                </MenuGroup>
            </MenuTab>

            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </>
    );
};

export default Layout;
