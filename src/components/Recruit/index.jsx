import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

import {
  ActionButtonContainer
} from '../../styles/Recruit/ViewPostStyle.js';

import { SectionTitle } from "../../styles/Auth/SurveyStyles";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatUrl, setChatUrl] = useState("");
  const [showButtons, setShowButtons] = useState(false); // 버튼 표시 여부
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

    const checkAuthor = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:8080/recruit/author/${recruitId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.author) {
          setShowButtons(true);
        }
      } catch (error) {
        console.error("작성자 확인 실패:", error);
      }
    };

    fetchPost();
    checkAuthor();
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

  const token = localStorage.getItem('access_token');
  if (!token) {
    alert("로그인이 필요합니다.");
    return;
  }

  try {
    await axios.delete(`http://localhost:8080/recruit/${recruitId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

      <FixedButtonContainer>
        {post.status === 'FULL' ? (
          <SubmitButton status="FULL" disabled>마감</SubmitButton>
        ) : post.status === 'OPEN' ? (
          <SubmitButton status="OPEN" onClick={handleApplyClick}>신청</SubmitButton>
        ) : (
          <SubmitButton status={post.status} disabled>신청 불가</SubmitButton>
        )}
      </FixedButtonContainer>

      <ContentContainer>
        <SectionTitle> {post.title} </SectionTitle>

        <CardWrapper>
          <GameInfoCard>
            <InfoTable>
              <CardTitle>매치포인트</CardTitle>
              <Row>
                <Key> ⚤ 성별</Key>
                <Value>{post.gender === 'M' ? '남성' : '여성'}</Value>
              </Row>
              <Row>
                <Key> ✨레벨</Key>
                <Value>{post.level}</Value>
              </Row>
              <Row>
                <Key> 🏓 라켓</Key>
                <Value>{post.racket === 'SHAKE_HAND' ? 'Shake Hand' : 'Pen Holder'}</Value>
              </Row>
              <Row>
                <Key> 👥 모집 인원</Key>
                <Value>{post.capacity}명</Value>
              </Row>
            </InfoTable>
          </GameInfoCard>

          <GameInfoCard>
            <InfoTable>
              <CardTitle> 모집정보</CardTitle>
              <Row>
                <Key> 🖐 작성자</Key>
                <Value>{post.userName}</Value>
              </Row>
              <Row>
                <Key> 📍 장소</Key>
                <Value>{post.clubName}</Value>
              </Row>
              <Row>
                <Key>🗓 날짜</Key>
                <Value>{post.date}</Value>
              </Row>
            </InfoTable>
          </GameInfoCard>
        </CardWrapper>

        <DetailCard>
          <CardTitle>상세 내용</CardTitle>
          <p>{post.document}</p>
        </DetailCard>
      </ContentContainer>

      {isModalOpen && (
        <ModalBackdrop>
          <ModalBox>
            <ModalTitle>신청이 완료되었습니다!</ModalTitle>
            <p>아래의 링크에서 채팅을 시작하세요:</p>
            <a href={chatUrl} target="_blank" rel="noopener noreferrer">채팅 시작</a>
            <br /><br />
            <ModalButton onClick={handleCloseModal}>닫기</ModalButton>
          </ModalBox>
        </ModalBackdrop>
      )}

      {showButtons && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <ActionButtonContainer>
            <ModalButton onClick={handleEdit}>수정</ModalButton>
            <ModalButton onClick={handleDelete}>삭제</ModalButton>
          </ActionButtonContainer>
        </div>
      )}
    </PageContainer>
  );
};

export default ViewPost;
