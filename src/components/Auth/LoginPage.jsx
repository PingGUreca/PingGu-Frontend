import React from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../images/kakao_login_medium_narrow.png';
import pinggu from '../../images/pinggu.png';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; // 중앙 → 상단 정렬
  height: 90vh;
  text-align: center;
  padding-top: 80px; // 위에서 조금 내려오게
`;
const LogoImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 10px;
`;

const LogoText = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  color: #00328F;
  margin-bottom: 2rem;
`;

const KakaoButton = styled.img`
  width: 220px;
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
            <LogoImage src={pinggu} alt="pinggu-logo" />
            <LogoText>Hello, PingGu</LogoText>
            <KakaoButton src={kakaoLogo} alt="카카오 로그인" onClick={handleKakaoLogin} />
        </LoginContainer>
    );
};

export default LoginPage;
