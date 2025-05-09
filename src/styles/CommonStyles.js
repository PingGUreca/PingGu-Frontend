// src/styles/MyPage/CommonStyles.js
import styled from 'styled-components';

// 목록 컨테이너와 아이템 (Likes, Recruits, Applies에서 공통)
export const ListContainer = styled.div`
  margin-top: 20px;
`;

export const ListItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

export const ItemTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
`;

export const ItemDate = styled.p`
  margin: 0;
  color: #666;
`;

export const ItemDetail = styled.p`
  margin: 5px 0;
  color: #666;
`;

export const EmptyMessage = styled.p`
  color: #666;
  font-style: italic;
`;

// 버튼 관련 스타일
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

// 폼 관련 공통 스타일
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

// 큰 레이아웃이라 마이페이지에서 공통으로 옮김
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

export const ContentContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;