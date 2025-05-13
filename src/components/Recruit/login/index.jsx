import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { 
  PageContainer, 
  PageTitle,
  ContentContainer 
} from '../../../styles/CommonStyles.js';

import {
ActionButtonContainer,
SmallButton
} from '../../../styles/Recruit/ViewPostStyle.js'

import {
  SubmitButton,
  ModalBackdrop,
  ModalBox,
  ModalTitle,
  ModalButton
} from '../../../styles/Recruit/RecruitFormStyle.js';

const ViewPostLogin = () => {
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatUrl, setChatUrl] = useState("");
  const { recruitId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recruit/${recruitId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [recruitId]);

  const handleApplyClick = () => {
    setChatUrl(post.chatUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/recruit/${recruitId}`);
      alert("삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    const confirmed = window.confirm("수정하시겠습니까?");
    if (confirmed) {
      navigate(`/recruitForm?recruitId=${recruitId}`);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <PageTitle>모집 상세보기</PageTitle>

      <div>
        {post.status ? (
          <SubmitButton disabled>마감</SubmitButton>
        ) : (
          <SubmitButton onClick={handleApplyClick}>신청</SubmitButton>
        )}
      </div>

      {/* ✅ 수정 / 삭제 버튼 항상 보이게 */}
      <div style={{ marginTop: "1rem" }}>
        <ActionButtonContainer>
          <SmallButton onClick={handleEdit}>수정</SmallButton>
          <SmallButton onClick={handleDelete}>삭제</SmallButton>
        </ActionButtonContainer>
      </div>

      <ContentContainer>
        <p><strong>제목:</strong> {post.title}</p>
        <p><strong>작성자:</strong> {post.userName}</p>
        <p><strong>장소:</strong> {post.clubName} ({post.location})</p>
        <p><strong>날짜:</strong> {post.date}</p>
        <p><strong>성별:</strong> {post.gender === 'M' ? '남성' : '여성'}</p>
        <p><strong>레벨:</strong> {post.level}</p>
        <p><strong>라켓:</strong> {post.racket === 'SHAKE_HAND' ? 'Shake Hand' : 'Pen Holder'}</p>
        <p><strong>모집 인원:</strong> {post.capacity}명</p>
        <p><strong>상세 내용:</strong> {post.document}</p>
      </ContentContainer>

      {isModalOpen && (
        <ModalBackdrop>
          <ModalBox>
            <ModalTitle>신청이 완료되었습니다!</ModalTitle>
            <p>아래의 링크에서 채팅을 시작하세요:</p>
            <a href={chatUrl} target="_blank" rel="noopener noreferrer">채팅 시작</a>
            <br />
            <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
          </ModalBox>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
};

export default ViewPostLogin;
