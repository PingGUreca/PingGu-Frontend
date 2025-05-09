// src/styles/MyPage/MyPageStyles.js
import styled from 'styled-components';


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

