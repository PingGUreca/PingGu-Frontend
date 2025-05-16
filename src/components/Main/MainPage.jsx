// 1. React 및 라우팅 관련 훅
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// 2. 외부 라이브러리 (API 요청, 날짜 처리, CSS 등)
import axios from 'axios';
import { format, isBefore, isSameDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
// 3. 프로젝트 내부 스타일 컴포넌트
import {
  PageContainer, FilterBar, FilterButton,
  MatchList, TopBanner, BannerImage,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalButton,
  DistrictGrid, DistrictCard, SearchButton, CustomDateWrapper, CustomDateButton,
  DateDayText, ArrowButton, StatusTag, MatchTitle, MatchStatus, MatchItemStyled
} from '../../styles/Main/MainPageStyles';
// 4. 이미지 asset 파일
import banner1 from '../../images/banner1.png';
import banner2 from '../../images/banner2.png';
import banner3 from '../../images/banner3.png';
import banner4 from '../../images/banner4.png';

const seoulDistricts = [
  '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
  '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구',
  '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'
];

const getInitialConsonant = (char) => {
  const cho = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  const code = char.charCodeAt(0) - 44032;
  const index = Math.floor(code / 588);
  return cho[index] || '기타';
};

const groupedDistricts = { '상관없음': [''] };
seoulDistricts.forEach((district) => {
  const initial = getInitialConsonant(district);
  if (!groupedDistricts[initial]) groupedDistricts[initial] = [];
  groupedDistricts[initial].push(district);
});

const banners = [banner1, banner2, banner3, banner4];

const MainPage = () => {
  const today = new Date();
  const navigate = useNavigate();

  // 상태 선언
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateOffset, setDateOffset] = useState(0);
  const [district, setDistrict] = useState('');
  const [level, setLevel] = useState('');
  const [gender, setGender] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [recruits, setRecruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);
  const isFetchingRef = useRef(false);
  const fetchRef = useRef();
  const pageRef = useRef(0); // ✅ page 상태 대체

  // JWT 토큰 가져오기
  const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  const getRequestConfig = () => {
    const accessToken = getAccessToken();
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!accessToken) {
      return null;
    }

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      withCredentials: true // refresh token 쿠키를 함께 전송
    };
  };

  // 모집글 API 호출
  const fetchRecruits = useCallback(async (reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);

    try {
      const currentPage = reset ? 0 : pageRef.current;

      const params = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        gu: district || undefined,
        level: level || undefined,
        gender: gender || undefined,
        page: currentPage,
        size: 4
      };

      const config = getRequestConfig();


      const response = await axios.get('http://localhost:8080/recruit', {
        params,
        config
      });

      const fetched = response.data.content;
      const isLast = response.data.last;

      if (reset) {
        setRecruits(fetched);
        pageRef.current = 1; // ✅ 페이지 초기화 후 1로 설정
      } else {
        setRecruits(prev => [...prev, ...fetched]);
        pageRef.current += 1; // ✅ 다음 페이지로 증가
      }

      setHasMore(!isLast);
    } catch (error) {
      console.error('모집글 조회 실패:', error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [selectedDate, district, level, gender]);

  fetchRef.current = fetchRecruits;

  // 초기 데이터 로딩
  useEffect(() => {
    pageRef.current = 0;
    setHasMore(true);
    fetchRecruits(true);
  }, [fetchRecruits]);

  // 무한스크롤 옵저버 등록
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore) {
        fetchRef.current(false);
      }
    }, { threshold: 1 });

    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, loading, hasMore]);

  const getDateRange = (offset) => {
    const base = new Date();
    base.setDate(base.getDate() + offset);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  };

  const handleSearch = () => {
    pageRef.current = 0;
    setHasMore(true);
    fetchRecruits(true);
  };

  return (
      <PageContainer>
        <TopBanner>
          <BannerImage
              src={banners[bannerIndex]}
              alt="배너"
              onClick={() => setBannerIndex((prev) => (prev + 1) % banners.length)}
          />
        </TopBanner>

        <CustomDateWrapper>
          <ArrowButton
              onClick={() => {
                const newOffset = dateOffset - 1;
                const newStartDate = new Date();
                newStartDate.setDate(newStartDate.getDate() + newOffset);
                if (!isBefore(newStartDate, today)) {
                  setDateOffset(newOffset);
                }
              }}
              disabled={isBefore(new Date(new Date().setDate(today.getDate() + dateOffset - 1)), today)}
          >
            &lt;
          </ArrowButton>
          {getDateRange(dateOffset).map((date) => {
            const key = format(date, 'yyyy-MM-dd');
            const isSelected = format(selectedDate, 'yyyy-MM-dd') === key;
            const dayName = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isPast = isBefore(date, today) && !isSameDay(date, today);
            return (
                <CustomDateButton
                    key={key}
                    active={isSelected}
                    weekend={isWeekend}
                    disabled={isPast}
                    onClick={() => setSelectedDate(date)}
                >
                  {`${date.getMonth() + 1}월 ${date.getDate()}일`}
                  <DateDayText active={isSelected}>{dayName}</DateDayText>
                </CustomDateButton>
            );
          })}
          <ArrowButton onClick={() => setDateOffset((prev) => prev + 1)}>&gt;</ArrowButton>
        </CustomDateWrapper>

        <FilterBar>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <FilterButton active={!!district} onClick={() => setIsModalOpen(true)}>
              {district || '구 선택'}
            </FilterButton>
            <FilterButton as="select" value={level} onChange={(e) => setLevel(e.target.value)} active={!!level}>
              <option value="">레벨 선택</option>
              <option value="BEGINNER">초급</option>
              <option value="INTERMEDIATE">중급</option>
              <option value="ADVANCED">고급</option>
            </FilterButton>
            <FilterButton as="select" value={gender} onChange={(e) => setGender(e.target.value)} active={!!gender}>
              <option value="">성별 선택</option>
              <option value="M">남성</option>
              <option value="F">여성</option>
              <option value="ALL">상관없음</option>
            </FilterButton>
          </div>
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </FilterBar>

        <MatchList>
          {recruits.map((match, idx) => {
            const isClosed = match.current >= match.capacity;
            return (
                <MatchItemStyled
                    key={idx}
                    onClick={() => navigate(`/recruit/${match.recruitId}`)}
                    style={{ cursor: 'pointer' }}
                >
                  <MatchTitle>{match.title}</MatchTitle>
                  <MatchStatus>
                    {`인원 : ${match.current}/${match.capacity}`}
                    {isClosed && <StatusTag>마감</StatusTag>}
                  </MatchStatus>
                </MatchItemStyled>
            );
          })}
          <div ref={loader} style={{ height: '1px' }} />
        </MatchList>

        {isModalOpen && (
            <ModalOverlay onClick={() => setIsModalOpen(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>지역을 선택해주세요</ModalHeader>
                {Object.entries(groupedDistricts).map(([initial, districts]) => (
                    <div key={initial} style={{ marginBottom: '20px' }}>
                      <h4>{initial}</h4>
                      <DistrictGrid>
                        {districts.map((d) => (
                            <DistrictCard
                                key={d}
                                active={district === d}
                                onClick={() => {
                                  setDistrict(d);
                                  setIsModalOpen(false);
                                }}
                            >
                              {d || '상관없음'}
                            </DistrictCard>
                        ))}
                      </DistrictGrid>
                    </div>
                ))}
                <ModalFooter>
                  <ModalButton onClick={() => setIsModalOpen(false)}>닫기</ModalButton>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
        )}
      </PageContainer>
  );
};

export default MainPage;