import styled from 'styled-components';
import { Button } from '../CommonStyles';

// 신청 버튼을 위한 스타일
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SubmitButton = styled(Button)`
  padding: 12px 24px;
  background: linear-gradient(145deg, #6a82fb, #fc5c7d);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  &:disabled {
    background: #dcdcdc;
    cursor: not-allowed;
  }
`;

// 본문 스타일
export const PostContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  
  h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
  }
  
  p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    margin: 8px 0;
  }

  strong {
    font-weight: bold;
  }
`;
