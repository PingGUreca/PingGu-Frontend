// src/styles/MyPage/MyPageStyles.js
import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const MenuItem = styled.div`
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? '2px solid #3498db' : 'none')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export const ContentContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;