import React from 'react';
// 공통 스타일 임포트
import {
  ListContainer,
  ListItem,
  ItemTitle,
  ItemDetail,
  ButtonGroup,
  EmptyMessage
} from '../../styles/CommonStyles.js';

// 지원 전용 스타일 임포트
import {
  ItemStatus,
  ActionButton,
  ChatLink
} from '../../styles/Mypage/AppliesStyles.js';

const AppliesContent = ({ appliesData, onCancelApply }) => {
  return (
    <div>
      <h2>내가 지원한 현황</h2>
      
      {appliesData && appliesData.length > 0 ? (
        <ListContainer>
          {appliesData.map(item => (
            <ListItem key={item.id}>
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