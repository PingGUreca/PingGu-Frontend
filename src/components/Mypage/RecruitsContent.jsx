import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

import {
  ListContainer,
  ListItem,
  ItemTitle,
  ItemDate,
  EmptyMessage
} from '../../styles/CommonStyles.js';

const RecruitsContent = ({ recruitsData }) => {
  const navigate = useNavigate(); // ✅ 네비게이션 훅

  const handleClick = (id) => {
    navigate(`/recruit/${id}`);
  };

  return (
    <div>
      <h2>내 모집 내역</h2>

      {recruitsData && recruitsData.length > 0 ? (
        <ListContainer>
          {recruitsData.map(item => (
            <ListItem key={item.id} onClick={() => handleClick(item.id)} style={{ cursor: 'pointer' }}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDate>일시: {item.date}</ItemDate>
            </ListItem>
          ))}
        </ListContainer>
      ) : (
        <EmptyMessage>모집 내역이 없습니다.</EmptyMessage>
      )}
    </div>
  );
};

export default RecruitsContent;
