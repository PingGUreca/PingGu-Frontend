import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  FormWrapper, FormGroup, Label, Input, Select, Textarea,
  SearchWrapper, SearchButton, SubmitButton, ModalBackdrop, ModalBox,
  ModalTitle, Grid, ModalButton
} from '../../styles/Recruit/RecruitFormStyle.js';

const LocationModal = ({ onClose, onSelectClub }) => {
  const districts = [
    '강남구', '강동구', '강북구', '강서구', '관악구',
    '광진구', '구로구', '금천구', '노원구', '도봉구',
    '동대문구', '동작구', '마포구', '서대문구', '서초구',
    '성동구', '성북구', '송파구', '양천구', '영등포구',
    '용산구', '은평구', '종로구', '중구', '중랑구',
  ];
  const [selectedGu, setSelectedGu] = useState(null);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    if (selectedGu) {
      axios.get(`http://localhost:8080/location?gu=${selectedGu}`)
        .then(res => setClubs(res.data.clubs))
        .catch(err => console.error('클럽 목록 불러오기 실패:', err));
    }
  }, [selectedGu]);

  return (
    <ModalBackdrop>
      <ModalBox>
        {!selectedGu ? (
          <>
            <ModalTitle>서울시 구 선택</ModalTitle>
            <Grid>
              {districts.map((gu) => (
                <ModalButton key={gu} onClick={() => setSelectedGu(gu)}>{gu}</ModalButton>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <ModalTitle>{selectedGu}의 탁구장 선택</ModalTitle>
            <Grid>
              {clubs.map((club) => (
                <ModalButton key={club.clubId} onClick={() => { onSelectClub(selectedGu, club); onClose(); }}>
                  {club.name}
                </ModalButton>
              ))}
            </Grid>
            <ModalButton style={{ marginTop: '1rem' }} onClick={() => setSelectedGu(null)}>← 구 다시 선택</ModalButton>
          </>
        )}
      </ModalBox>
    </ModalBackdrop>
  );
};

const PostContent = () => {
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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // navigate 추가

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

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
      const res = await axios.post('http://localhost:8080/recruit', requestPayload, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if Location header is returned from the server
      const locationUri = res.headers.location; // axios returns headers automatically
      console.log('Location URI:', locationUri);

      if (locationUri) {
        navigate(locationUri); // Use navigate with the Location header URI
      } else {
        alert('작성 완료되었습니다!');
        navigate('/mypage'); // Fallback navigation
      }
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      {showModal && (
        <LocationModal
          onClose={() => setShowModal(false)}
          onSelectClub={(gu, club) => {
            setPostData((prev) => ({
              ...prev,
              location: `${gu} ${club.name}`,
              clubId: club.clubId,
            }));
          }}
        />
      )}

      <FormWrapper>
        <FormGroup>
          <Label>탁구장 위치</Label>
          <SearchWrapper>
            <Input type="text" name="location" value={postData.location} readOnly />
            <SearchButton type="button" onClick={() => setShowModal(true)}>검색</SearchButton>
          </SearchWrapper>
        </FormGroup>

        <FormGroup>
          <Label>경기 날짜</Label>
          <Input type="date" name="date" value={postData.date} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label>인원</Label>
          <Input type="number" name="limit" value={postData.limit} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label>성별</Label>
          <Select name="gender" value={postData.gender} onChange={handleInputChange} required>
            <option value="">선택</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
            <option value="ANY">상관없음</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>레벨</Label>
          <Select name="level" value={postData.level} onChange={handleInputChange} required>
            <option value="">선택</option>
            <option value="BEGINNER">초급</option>
            <option value="INTERMEDIATE">중급</option>
            <option value="ADVANCED">고급</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>그립 종류</Label>
          <Select name="racket" value={postData.racket} onChange={handleInputChange} required>
            <option value="">선택</option>
            <option value="SHAKE_HAND">쉐이크핸드</option>
            <option value="PEN_HOLDER">펜홀더</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>제목</Label>
          <Input type="text" name="title" value={postData.title} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label>내용</Label>
          <Textarea name="content" value={postData.content} onChange={handleInputChange} required />
        </FormGroup>

        <FormGroup>
          <Label>채팅방 URL</Label>
          <Input type="url" name="chatUrl" value={postData.chatUrl} onChange={handleInputChange} required />
        </FormGroup>

        <SubmitButton type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(); }}>
          작성 완료
        </SubmitButton>
      </FormWrapper>
    </>
  );
};

export default PostContent;
