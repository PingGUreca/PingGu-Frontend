import React, { useState, useRef } from 'react';
import axios from 'axios';

import {
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  Button
} from '../../styles/CommonStyles.js';

import {
  ProfileContainer,
  ProfileHeader,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileDetail,
  SaveButton,
  CancelButton,
  DeleteButton,
  InfoCard,
  InfoItem,
  InfoLabel,
  InfoValue
} from '../../styles/Mypage/ProfileStyles.js';

// 레벨 텍스트 변환 함수
const getLevelText = (level) => {
  switch(level) {
    case 'BEGINNER': return '초보자';
    case 'INTERMEDIATE': return '중급자';
    case 'ADVANCED': return '고급자';
    default: return level;
  }
};

// 성별 텍스트 변환 함수
const getGenderText = (gender) => {
  switch(gender) {
    case 'M': return '남성';
    case 'F': return '여성';
    case 'ALL': return '상관없음';
    default: return gender;
  }
};

// 주손 텍스트 변환 함수
const getMainHandText = (mainHand) => {
  switch(mainHand) {
    case 'R': return '오른손';
    case 'L': return '왼손';
    default: return mainHand;
  }
};

// 라켓 텍스트 변환 함수
const getRacketText = (racket) => {
  switch(racket) {
    case 'PEN_HOLDER': return '펜홀더';
    case 'SHAKE_HAND': return '쉐이크핸드';
    default: return racket;
  }
};

const ProfileContent = ({ userData, refreshData, onDeleteAccount, getRequestConfig }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    gender: userData?.gender || 'M',
    gu: userData?.gu || '',
    level: userData?.level || 'BEGINNER',
    mainHand: userData?.mainHand || 'R',
    racket: userData?.racket || 'SHAKE_HAND'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // 폼 입력 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 프로필 이미지 클릭
  const handleProfileImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  // 프로필 이미지 선택
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    
    // 미리보기용 URL 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 프로필 이미지 업로드
  const uploadProfileImage = async (file) => {
    if (!file) return null;
    
    const config = getRequestConfig();
    if (!config) return null;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('/mypage/profile-image', formData, {
        ...config,
        headers: {
          ...config.headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data; // 백엔드에서 반환하는 이미지 URL
    } catch (err) {
      console.error('Error uploading profile image:', err);
      throw err;
    }
  };

  // 프로필 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const config = getRequestConfig();
      if (!config) return;
      
      // 먼저 프로필 이미지가 있으면 업로드
      if (selectedFile) {
        try {
          await uploadProfileImage(selectedFile);
        } catch (err) {
          console.error('Error uploading profile image:', err);
          setError('프로필 이미지 업로드에 실패했습니다.');
          setIsSubmitting(false);
          return;
        }
      }
      
      // 프로필 정보 업데이트
      await axios.put('/mypage/profile', formData, config);
      
      // 프로필 정보 새로고침
      await refreshData();
      
      setIsEditing(false);
      setSelectedFile(null);
    } catch (err) {
      setError('프로필 저장에 실패했습니다. 다시 시도해주세요.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 편집 모드 취소
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    
    // 원래 정보로 폼 데이터 복구
    setFormData({
      name: userData?.name || '',
      gender: userData?.gender || 'M',
      gu: userData?.gu || '',
      level: userData?.level || 'BEGINNER',
      mainHand: userData?.mainHand || 'R',
      racket: userData?.racket || 'SHAKE_HAND'
    });
  };

  // 프로필 이미지 URL 또는 미리보기
  const profileImageUrl = previewUrl || userData?.profileImgUrl;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage 
          onClick={handleProfileImageClick} 
          style={{ cursor: isEditing ? 'pointer' : 'default' }}
        >
          {profileImageUrl ? (
            <img 
              src={profileImageUrl} 
              alt="프로필" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            <span>{userData?.name?.charAt(0) || '?'}</span>
          )}
          {isEditing && (
            <div 
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                background: '#007bff', 
                color: 'white', 
                borderRadius: '50%', 
                width: '24px',
                height: '24px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              +
            </div>
          )}
        </ProfileImage>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
        <ProfileInfo>
          <ProfileName>{userData?.name || '사용자'}</ProfileName>
          <ProfileDetail>레벨: {getLevelText(userData?.level)}</ProfileDetail>
          <ProfileDetail>지역: {userData?.gu || '미설정'}</ProfileDetail>
        </ProfileInfo>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            프로필 수정
          </Button>
        )}
      </ProfileHeader>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isEditing ? (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>성별</Label>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="M">남성</option>
              <option value="F">여성</option>
              <option value="ALL">상관없음</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>지역(구)</Label>
            <Input
              type="text"
              name="gu"
              value={formData.gu}
              onChange={handleChange}
              placeholder="예: 강남구, 서초구"
            />
          </FormGroup>

          <FormGroup>
            <Label>레벨</Label>
            <Select
              name="level"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="BEGINNER">초보자</option>
              <option value="INTERMEDIATE">중급자</option>
              <option value="ADVANCED">고급자</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>주로 사용하는 손</Label>
            <Select
              name="mainHand"
              value={formData.mainHand}
              onChange={handleChange}
            >
              <option value="R">오른손</option>
              <option value="L">왼손</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>라켓 그립 스타일</Label>
            <Select
              name="racket"
              value={formData.racket}
              onChange={handleChange}
            >
              <option value="SHAKE_HAND">쉐이크핸드</option>
              <option value="PEN_HOLDER">펜홀더</option>
            </Select>
          </FormGroup>

          <ButtonGroup>
            <DeleteButton 
              type="button" 
              onClick={onDeleteAccount}
            >
              회원 탈퇴
            </DeleteButton>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
            <SaveButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : '저장하기'}
            </SaveButton>
          </ButtonGroup>
        </Form>
      ) : (
        <InfoCard>
          <InfoItem>
            <InfoLabel>성별:</InfoLabel>
            <InfoValue>{getGenderText(userData?.gender)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>주로 사용하는 손:</InfoLabel>
            <InfoValue>{getMainHandText(userData?.mainHand)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>라켓 그립 스타일:</InfoLabel>
            <InfoValue>{getRacketText(userData?.racket)}</InfoValue>
          </InfoItem>
          
          <ButtonGroup>
            <DeleteButton onClick={onDeleteAccount}>회원 탈퇴</DeleteButton>
          </ButtonGroup>
        </InfoCard>
      )}
    </ProfileContainer>
  );
};

export default ProfileContent;