import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
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

// 본문 콘텐츠 Wrapper
const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: 0.95rem;
`;

const Layout = () => {
  const location = useLocation();

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
          <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>로그인</Link>
        </MenuGroup>
      </MenuTab>

      {/* 여기서 하위 페이지 감싸줌 */}
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default Layout;
