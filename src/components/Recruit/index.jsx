import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { 
  PageContainer, 
  PageTitle,
  ContentContainer 
} from '../../styles/CommonStyles.js';

import {
  SubmitButton,
  ModalBackdrop,
  ModalBox,
  ModalTitle,
  ModalButton,
  CardWrapper,
  GameInfoCard,
  CardTitle,
  InfoTable,
  Row,
  Key,
  Value,
  DetailCard,
  FixedButtonContainer
} from '../../styles/Recruit/RecruitFormStyle.js';
import {SectionTitle} from "../../styles/Auth/SurveyStyles";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태
  const [chatUrl, setChatUrl] = useState(""); // 채팅 URL 저장
  const { recruitId } = useParams(); // URL에서 recruitId를 추출

  useEffect(() => {
    // 모집 글 정보를 가져오는 API 호출
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recruit/${recruitId}`);
        setPost(response.data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [recruitId]);

  const handleApplyClick = () => {
    // 신청 버튼 클릭 시 모달을 열고, 채팅 URL 설정
    setChatUrl(post.chatUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  if (!post) {
    return <div>Loading...</div>; // 데이터를 로딩 중일 때 표시할 내용
  }

  return (
    <PageContainer>
      <PageTitle>모집 상세보기</PageTitle> {/* 글 제목 */}

      <FixedButtonContainer>
        {/* 모집 상태에 따라 버튼을 다르게 표시 */}
        {post.status === 'FULL' ? (
          <SubmitButton status="FULL" disabled>마감</SubmitButton>
        ) : post.status === 'OPEN' ? (
          <SubmitButton status="OPEN" onClick={handleApplyClick}>신청</SubmitButton>
        ) : (
          <SubmitButton status={post.status} disabled>신청 불가</SubmitButton>
        )}
      </FixedButtonContainer>

      <ContentContainer>

        <SectionTitle> {post.title} </SectionTitle> {/* 글 제목 */}
        <p></p>

        <CardWrapper>
          <GameInfoCard>
            <InfoTable>
              <CardTitle>매치포인트</CardTitle>
              <Row>
                <Key> ⚤ 성별</Key>
                <Value>{post.gender === 'M' ? '남성' : '여성'}</Value> {/* 성별 */}
              </Row>
              <Row>
                <Key> ✨레벨</Key>
                <Value>{post.level}</Value> {/* 레벨 */}
              </Row>
              <Row>
                <Key> 🏓 라켓</Key>
                <Value>{post.racket === 'SHAKE_HAND' ? 'Shake Hand' : 'Pen Holder'} </Value>  {/* 라켓 종류 */}
              </Row>
              <Row>
                <Key> 👥 모집 인원</Key>
                <Value>{post.capacity}명</Value> {/* 모집 인원 */}
              </Row>

            </InfoTable>
          </GameInfoCard>

          <GameInfoCard>
            <InfoTable>
              <CardTitle> 모집정보</CardTitle>

              <Row>
                <Key> 🖐 작성자</Key>
                <Value>{post.userName}</Value> {/* 작성자 이름 */}
              </Row>
              <Row>
                <Key> 📍 장소</Key>
                <Value> {post.clubName} </Value> {/* 탁구장 이름과 위치 */}
              </Row>
              <Row>
                <Key>🗓 날짜</Key>
                <Value> {post.date} </Value> { /* 날짜 */}
              </Row>
            </InfoTable>
          </GameInfoCard>

        </CardWrapper>

        <DetailCard>

          <CardTitle>상세 내용</CardTitle>
          <p>{post.document}</p>
        </DetailCard>

      </ContentContainer>

      {/* 모달이 열려있을 때 채팅 URL을 보여주는 모달 */}
      {isModalOpen && (
        <ModalBackdrop>
          <ModalBox>
            <ModalTitle>신청이 완료되었습니다!</ModalTitle>
            <p>아래의 링크에서 채팅을 시작하세요:</p>
            <a href={chatUrl} target="_blank" rel="noopener noreferrer">채팅 시작</a>
            <br />
            <br /> {/* 줄바꿈 추가 */}
            <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
          </ModalBox>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default ViewPost;
