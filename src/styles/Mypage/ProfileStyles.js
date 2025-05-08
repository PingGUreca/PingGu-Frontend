// src/styles/MyPage/ProfileStyles.js
import styled from 'styled-components';
import { Button } from '../CommonStyles.js';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileName = styled.h2`
  font-size: 24px;
  margin: 0 0 5px 0;
`;

export const ProfileDetail = styled.p`
  color: #666;
  margin: 5px 0;
`;

export const SaveButton = styled(Button)`
  background-color: #3498db;
  color: white;
`;

export const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #333;
`;

export const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  margin-right: auto;
`;

export const InfoCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  font-weight: 500;
  margin-right: 8px;
  color: #555;
`;

export const InfoValue = styled.span`
  color: #333;
`;