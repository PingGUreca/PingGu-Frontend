// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import PostContent from './PostContent.jsx'; // 글 작성 화면 컴포넌트

// import { 
//   PageContainer, 
//   PageTitle,
//   ContentContainer 
// } from '../../styles/CommonStyles.js';

// const WritePost = () => {
//   const navigate = useNavigate();
//   const [postData, setPostData] = useState({
//     title: '',
//     content: '',
//     category: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // 글 작성 데이터 전송 함수
//   const submitPost = async () => {
//     setLoading(true);
//     try {
//       await axios.post('http://localhost:8080/posts', postData);
//       alert('글이 작성되었습니다.');
//       navigate('/mypage');
//     } catch (err) {
//       setError('글 작성에 실패했습니다.');
//       console.error('Error submitting post:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 로딩 상태 표시
//   if (loading) {
//     return <PageContainer>로딩 중...</PageContainer>;
//   }

//   // 에러 상태 표시
//   if (error) {
//     return <PageContainer>에러: {error}</PageContainer>;
//   }

//   return (
//     <PageContainer>
//       <PageTitle>모집 글 작성</PageTitle>

//       <ContentContainer>
//         <PostContent 
//           postData={postData} 
//           setPostData={setPostData}
//           onSubmit={submitPost}
//         />
//       </ContentContainer>
//     </PageContainer>
//   );
// };

// export default WritePost;

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import PostContent from './PostContent.jsx';

import {
  PageContainer,
  PageTitle,
  ContentContainer
} from '../../styles/CommonStyles.js';

const WritePost = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recruitId = searchParams.get('recruitId');

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    date: '',
    limit: '',
    gender: '',
    level: '',
    racket: '',
    chatUrl: '',
    clubId: null,
    location: '',
  });

  const [loading, setLoading] = useState(!!recruitId);
  const [error, setError] = useState(null);

  // ✅ recruitId 있을 경우, 기존 글 불러오기
  useEffect(() => {
    if (!recruitId) return;

    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/recruit/${recruitId}`);
        const data = response.data;

        setPostData({
          title: data.title || '',
          content: data.document || '',
          date: data.date || '',
          limit: data.capacity?.toString() || '',
          gender:
            data.gender === 'M' ? 'MALE' :
            data.gender === 'F' ? 'FEMALE' : 'ANY',
          level: data.level || '',
          racket: data.racket || '',
          chatUrl: data.chatUrl || '',
          clubId: data.clubId || null,
          location: `${data.location || ''}`, // 필요시 가공
        });
      } catch (err) {
        setError('기존 글을 불러오지 못했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [recruitId]);

  // ✅ POST or PUT 분기 처리
  const handleSubmit = async () => {
    const requestPayload = {
      clubId: postData.clubId,
      date: postData.date,
      capacity: parseInt(postData.limit),
      gender:
        postData.gender === 'MALE' ? 'M' :
        postData.gender === 'FEMALE' ? 'F' :
        'All',
      level: postData.level,
      racket: postData.racket,
      title: postData.title,
      document: postData.content,
      chatUrl: postData.chatUrl,
    };

    try {
      if (recruitId) {
        await axios.put(`http://localhost:8080/recruit/${recruitId}`, requestPayload);
        alert('글이 수정되었습니다.');
        navigate(`/recruit/${recruitId}`);
      } else {
        const res = await axios.post('http://localhost:8080/recruit', requestPayload);
        const locationUri = res.headers.location;
        if (locationUri) {
          navigate(locationUri);
        } else {
          alert('작성 완료되었습니다!');
          navigate('/mypage');
        }
      }
    } catch (err) {
      console.error('제출 실패:', err);
      setError('제출 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <PageContainer>로딩 중...</PageContainer>;
  if (error) return <PageContainer>에러: {error}</PageContainer>;

  return (
    <PageContainer>
      <PageTitle>{recruitId ? '모집 글 수정' : '모집 글 작성'}</PageTitle>
      <ContentContainer>
        <PostContent
          postData={postData}
          setPostData={setPostData}
          onSubmit={handleSubmit}
        />
      </ContentContainer>
    </PageContainer>
  );
};

export default WritePost;
