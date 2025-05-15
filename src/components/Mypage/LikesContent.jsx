import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

import {
  ListContainer,
  ListItem,
  ItemTitle,
  ItemDate,
  EmptyMessage
} from '../../styles/CommonStyles.js';

const LikesContent = ({ likesData }) => {
  const navigate = useNavigate(); // ✅ 네비게이션 훅

  const handleClick = (id) => {
    navigate(`/recruit/${id}`);
  };

  return (
    <div>
      <h2>좋아요 누른 모임</h2>

      {likesData && likesData.length > 0 ? (
        <ListContainer>
          {likesData.map(item => (
            <ListItem
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDate>일시: {item.date}</ItemDate>
            </ListItem>
          ))}
        </ListContainer>
      ) : (
        <EmptyMessage>좋아요를 누른 모임이 없습니다.</EmptyMessage>
      )}
    </div>
  );
};

export default LikesContent;
