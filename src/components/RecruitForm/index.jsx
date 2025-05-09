import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PostContent from './PostContent.jsx'; // 글 작성 화면 컴포넌트

import { 
  PageContainer, 
  PageTitle,
  ContentContainer 
} from '../../styles/CommonStyles.js';

const WritePost = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 글 작성 데이터 전송 함수
  const submitPost = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/posts', postData);
      alert('글이 작성되었습니다.');
      navigate('/mypage');
    } catch (err) {
      setError('글 작성에 실패했습니다.');
      console.error('Error submitting post:', err);
    } finally {
      setLoading(false);
    }
  };

  // 로딩 상태 표시
  if (loading) {
    return <PageContainer>로딩 중...</PageContainer>;
  }

  // 에러 상태 표시
  if (error) {
    return <PageContainer>에러: {error}</PageContainer>;
  }

  return (
    <PageContainer>
      <PageTitle>모집 글 작성</PageTitle>

      <ContentContainer>
        <PostContent 
          postData={postData} 
          setPostData={setPostData}
          onSubmit={submitPost}
        />
      </ContentContainer>
    </PageContainer>
  );
};

export default WritePost;
