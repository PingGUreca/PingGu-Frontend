import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProfileContent from './ProfileContent.jsx';
import LikesContent from './LikesContent.jsx';
import RecruitsContent from './RecruitsContent.jsx';
import AppliesContent from './AppliesContent.jsx';

import { 
  PageContainer, 
  PageTitle,
  ContentContainer 
} from '../../styles/CommonStyles.js';

import { 
  MenuContainer, 
  MenuItem, 
} from '../../styles/Mypage/MyPageStyles.js';

// 마이페이지 컴포넌트
const MyPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [likesData, setLikesData] = useState([]);
  const [recruitsData, setRecruitsData] = useState([]);
  const [appliesData, setAppliesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // JWT 토큰 가져오기
  const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  // API 요청을 위한 기본 설정
  const getRequestConfig = () => {
    const accessToken = getAccessToken();
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!accessToken) {
      navigate('/login');
      return null;
    }
    
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true // refresh token 쿠키를 함께 전송
    };
  };

  // 프로필 데이터 새로고침 함수
  const refreshProfileData = async () => {
    try {
      const config = getRequestConfig();
      if (!config) return false;
      
      const response = await axios.get('/mypage', config);
      setUserData(response.data);
      return true;
    } catch (err) {
      console.error('Error refreshing profile data:', err);
      if (err.response && err.response.status === 401) {
        // 인증 오류 시 로그인 페이지로 리다이렉트
        navigate('/login');
      }
      return false;
    }
  };

  // 모든 사용자 데이터 새로고침
  const refreshAllData = async () => {
    try {
      const config = getRequestConfig();
      if (!config) return;
      
      setLoading(true);
      
      // 프로필 정보 가져오기
      const profileResponse = await axios.get('https://pinggu-backend.fly.dev/mypage', config);
      setUserData(profileResponse.data);
      
      // 좋아요 누른 모임 가져오기
      const likesResponse = await axios.get('https://pinggu-backend.fly.dev/mypage/likes', config);
      setLikesData(likesResponse.data);
      
      // 내 모집 내역 가져오기
      const recruitsResponse = await axios.get('https://pinggu-backend.fly.dev/mypage/recruits', config);
      setRecruitsData(recruitsResponse.data);
      
      // 내가 지원한 모임 가져오기
      const appliesResponse = await axios.get('https://pinggu-backend.fly.dev/mypage/applies', config);
      setAppliesData(appliesResponse.data);
      
      setLoading(false);
    } catch (err) {
      setError('정보를 불러오는데 실패했습니다.');
      setLoading(false);
      console.error('Error fetching user data:', err);
      
      if (err.response && err.response.status === 401) {
        // 인증 오류 시 로그인 페이지로 리다이렉트
        navigate('/login');
      }
    }
  };

  // 처음 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!getAccessToken()) {
      navigate('/login');
      return;
    }
    
    refreshAllData();
  }, [navigate]);

  // 회원 탈퇴 처리
  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        const config = getRequestConfig();
        if (!config) return;
        
        await axios.delete('/mypage', config);
        alert('탈퇴가 완료되었습니다.');
        // 로그아웃 처리 및 홈페이지로 리다이렉트
        localStorage.removeItem('access_token');
        navigate('/');
      } catch (err) {
        alert('탈퇴 처리 중 오류가 발생했습니다.');
        console.error('Error deleting account:', err);
      }
    }
  };

  // 탭 메뉴 정의
  const menuItems = [
    { id: 'profile', label: '프로필 정보' },
    { id: 'likes', label: '좋아요 누른 모임' },
    { id: 'recruits', label: '내 모집 내역' },
    { id: 'applies', label: '나의 지원 현황' }
  ];

  // 탭 변경 핸들러
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 지원 취소 핸들러
  const handleCancelApply = async (recruitId) => {
    if (window.confirm('지원을 취소하시겠습니까?')) {
      try {
        const config = getRequestConfig();
        if (!config) return;
        
        await axios.post(`https://pinggu-backend.fly.dev/mypage/applies?recruitId=${recruitId}`, {}, config);
        
        // 지원 목록 새로고침
        const appliesResponse = await axios.get('https://pinggu-backend.fly.dev/mypage/applies', config);
        setAppliesData(appliesResponse.data);
        
        alert('지원이 취소되었습니다.');
      } catch (err) {
        alert('지원 취소 중 오류가 발생했습니다.');
        console.error('Error canceling apply:', err);
      }
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
      <PageTitle>마이페이지</PageTitle>

      <MenuContainer>
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            active={activeTab === item.id}
            onClick={() => handleTabChange(item.id)}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuContainer>

      <ContentContainer>
        {/* 선택된 탭에 따라 다른 컴포넌트 렌더링 */}
        {activeTab === 'profile' && (
          <ProfileContent 
            userData={userData} 
            refreshData={refreshProfileData} 
            onDeleteAccount={handleDeleteAccount}
            getRequestConfig={getRequestConfig}
          />
        )}
        {activeTab === 'likes' && <LikesContent likesData={likesData} />}
        {activeTab === 'recruits' && <RecruitsContent recruitsData={recruitsData} />}
        {activeTab === 'applies' && (
          <AppliesContent 
            appliesData={appliesData} 
            onCancelApply={handleCancelApply} 
          />
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default MyPage;