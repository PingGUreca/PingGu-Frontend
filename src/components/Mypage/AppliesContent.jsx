import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ListContainer,
  ListItem,
  ItemTitle,
  ItemDetail,
  ButtonGroup,
  EmptyMessage
} from '../../styles/CommonStyles.js';

import {
  ItemStatus,
  ActionButton,
  ChatLink
} from '../../styles/Mypage/AppliesStyles.js';

const AppliesContent = ({ appliesData, onCancelApply }) => {
  const navigate = useNavigate();

  const handleItemClick = (e, id) => {
    // 버튼이나 링크 클릭 시에는 이동하지 않음
    if (
      e.target.tagName === 'BUTTON' ||
      e.target.tagName === 'A'
    ) {
      return;
    }
    navigate(`/recruit/${id}`);
  };

  return (
    <div>
      <h2>나의 지원 현황</h2>

      {appliesData && appliesData.length > 0 ? (
        <ListContainer>
          {appliesData.map(item => (
            <ListItem
              key={item.id}
              onClick={(e) => handleItemClick(e, item.id)}
              style={{ cursor: 'pointer' }}
            >
              <ItemTitle>
                {item.title}
                <ItemStatus active={item.status === "모집 진행중"}>
                  {item.status}
                </ItemStatus>
              </ItemTitle>
              <ItemDetail>일시: {item.date}</ItemDetail>
              <ItemDetail>장소: {Array.isArray(item.club) ? item.club.join(' - ') : item.club}</ItemDetail>

              <ButtonGroup>
                {item.status === "모집 진행중" && (
                  <ActionButton onClick={() => onCancelApply(item.id)}>
                    지원 취소
                  </ActionButton>
                )}
                {item.chatUrl && (
                  <ChatLink href={item.chatUrl} target="_blank" rel="noopener noreferrer">
                    채팅방 참여
                  </ChatLink>
                )}
              </ButtonGroup>
            </ListItem>
          ))}
        </ListContainer>
      ) : (
        <EmptyMessage>지원한 모임이 없습니다.</EmptyMessage>
      )}
    </div>
  );
};

export default AppliesContent;
