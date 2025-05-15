// src/components/Auth/LoginPage.jsx
import React from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../images/kakao_login_medium_narrow.png';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #222;
`;

const KakaoButton = styled.img`
  width: 200px;
  cursor: pointer;
`;

const LoginPage = () => {
    const handleKakaoLogin = () => {
        const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
        const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

        window.location.href =
            `https://kauth.kakao.com/oauth/authorize?` +
            `client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    return (
        <LoginContainer>
            <Title>당신의 탁구친구 PingGu</Title>
            <KakaoButton src={kakaoLogo} alt="카카오 로그인" onClick={handleKakaoLogin} />
        </LoginContainer>
    );
};

export default LoginPage;
