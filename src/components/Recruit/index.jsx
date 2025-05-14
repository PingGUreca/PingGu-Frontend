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
  ModalButton
} from '../../styles/Recruit/RecruitFormStyle.js'; // 스타일이 정의된 파일 경로에 맞게 수정해 주세요

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
      
      {/* 모집 상태에 따라 버튼을 다르게 표시 */}
      {post.status === 'FULL' ? (
        <SubmitButton status="FULL" disabled>마감</SubmitButton>
      ) : post.status === 'OPEN' ? (
        <SubmitButton status="OPEN" onClick={handleApplyClick}>신청</SubmitButton>
      ) : (
        <SubmitButton status={post.status} disabled>신청 불가</SubmitButton>
      )}

      <ContentContainer>
        <p><strong>제목:</strong> {post.title}</p> {/* 글 제목 */}
        <p><strong>작성자:</strong> {post.userName}</p> {/* 작성자 이름 */}
        <p><strong>장소:</strong> {post.clubName} ({post.location})</p> {/* 탁구장 이름과 위치 */}
        <p><strong>날짜:</strong> {post.date}</p> {/* 날짜 */}
        <p><strong>성별:</strong> {post.gender === 'M' ? '남성' : '여성'}</p> {/* 성별 */}
        <p><strong>레벨:</strong> {post.level}</p> {/* 레벨 */}
        <p><strong>라켓:</strong> {post.racket === 'SHAKE_HAND' ? 'Shake Hand' : 'Pen Holder'}</p> {/* 라켓 종류 */}
        <p><strong>모집 인원:</strong> {post.capacity}명</p> {/* 모집 인원 */}
        <p><strong>상세 내용:</strong> {post.document}</p> {/* 상세 내용 */}
      </ContentContainer>

      {/* 모달이 열려있을 때 채팅 URL을 보여주는 모달 */}
      {isModalOpen && (
        <ModalBackdrop>
          <ModalBox>
            <ModalTitle>신청이 완료되었습니다!</ModalTitle>
            <p>아래의 링크에서 채팅을 시작하세요:</p>
            <a href={chatUrl} target="_blank" rel="noopener noreferrer">채팅 시작</a>
            <br /> {/* 줄바꿈 추가 */}
            <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
          </ModalBox>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default ViewPost;
