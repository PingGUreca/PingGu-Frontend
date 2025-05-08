// src/styles/MyPage/AppliesStyles.js
import styled from 'styled-components';

export const ItemStatus = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 14px;
  color: white;
  background-color: ${props => props.active ? '#3498db' : '#95a5a6'};
  margin-left: 10px;
`;

export const ActionButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const ChatLink = styled.a`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
  }
`;