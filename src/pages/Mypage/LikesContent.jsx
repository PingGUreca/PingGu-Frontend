import React from 'react';

import {
  ListContainer,
  ListItem,
  ItemTitle,
  ItemDate,
  EmptyMessage
} from '../../styles/CommonStyles.js';

const LikesContent = ({ likesData }) => {
  return (
    <div>
      <h2>좋아요 누른 모임</h2>
      
      {likesData && likesData.length > 0 ? (
        <ListContainer>
          {likesData.map(item => (
            <ListItem key={item.id}>
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