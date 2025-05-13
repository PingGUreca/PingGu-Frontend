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
  
  // 임시 memberId (실제로는 JWT에서 추출하거나 로그인 상태에서 가져옴)
  // TODO: JWT 구현 이후 변경 예정
  const memberId = 100;  // 예시 ID 값

  // 프로필 데이터 새로고침 함수
  const refreshProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/mypage?memberId=${memberId}`);
      setUserData(response.data);
      return true;
    } catch (err) {
      console.error('Error refreshing profile data:', err);
      return false;
    }
  };

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // 프로필 정보 가져오기
        const profileResponse = await axios.get(`http://localhost:8080/mypage?memberId=${memberId}`);
        setUserData(profileResponse.data);
        
        // 좋아요 누른 모임 가져오기
        const likesResponse = await axios.get(`http://localhost:8080/mypage/likes?memberId=${memberId}`);
        setLikesData(likesResponse.data);
        
        // 내 모집 내역 가져오기
        const recruitsResponse = await axios.get(`http://localhost:8080/mypage/recruits?memberId=${memberId}`);
        setRecruitsData(recruitsResponse.data);
        
        // 내가 지원한 모임 가져오기
        const appliesResponse = await axios.get(`http://localhost:8080/mypage/applies?memberId=${memberId}`);
        setAppliesData(appliesResponse.data);
        
        setLoading(false);
      } catch (err) {
        setError('정보를 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, [memberId]);

  // 회원 탈퇴 처리
  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        await axios.delete(`http://localhost:8080/mypage?memberId=${memberId}`);
        alert('탈퇴가 완료되었습니다.');
        // 로그아웃 처리 및 홈페이지로 리다이렉트
        localStorage.removeItem('token');
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
    { id: 'applies', label: '내가 지원 현황' }
  ];

  // 탭 변경 핸들러
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // 지원 취소 핸들러
  const handleCancelApply = async (recruitId) => {
    if (window.confirm('지원을 취소하시겠습니까?')) {
      try {
        await axios.post(`http://localhost:8080/mypage/applies?memberId=${memberId}&recruitId=${recruitId}`);
        
        // 지원 목록 새로고침
        const appliesResponse = await axios.get(`http://localhost:8080/mypage/applies?memberId=${memberId}`);
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
            memberId={memberId}
            onDeleteAccount={handleDeleteAccount} 
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