import React from 'react';
import {Outlet, Link, useLocation, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

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
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 30px;

  a {
    text-decoration: none;
    color: #888;
    font-size: 18px;
    font-weight: 600;
    padding: 6px 12px;

    &.active {
      color: #00328F;
      border-bottom: 2px solid #00328F;
    }
  }
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

const Layout = () => {
    const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('access_token'); // ✅ 토큰 유무로 로그인 상태 판단
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        alert('로그아웃 되었습니다.');
        navigate('/');
        window.location.reload(); // 새로고침으로 상태 반영
    };

    return (
        <>
            <MenuTab>
                {/* 왼쪽: 소셜매칭, 모집글쓰기 */}
                <MenuGroup>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🔥 소셜매칭</Link>
                    <Link to="/write" className={location.pathname === '/write' ? 'active' : ''}>📋 모집글쓰기</Link>
                </MenuGroup>

                {/* 오른쪽: 마이페이지, 로그인 */}
                <MenuGroup>
                    <Link to="/mypage" className={location.pathname === '/mypage' ? 'active' : ''}>MyPage</Link>
                    {isLoggedIn ? (
                        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    ) : (
                        // ✅ 로그인 상태가 아니면 로그인 버튼 표시
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
