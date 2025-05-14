import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import {
  PageContainer, FilterBar, FilterButton,
  MatchList,TopBanner, BannerImage,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalButton,
  DistrictGrid, DistrictCard, SearchButton, CustomDateWrapper, CustomDateButton,
  DateDayText, ArrowButton, StatusTag, MatchTitle, MatchStatus, MatchItemStyled
} from '../../styles/Main/MainPageStyles';
import banner1 from '../../images/banner1.png';
import banner2 from '../../images/banner2.png';
import banner3 from '../../images/banner3.png';
import banner4 from '../../images/banner4.png';
import { format, isBefore, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom'; // 추가

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
  const [selectedDate, setSelectedDate] = useState(today);
  const [dateOffset, setDateOffset] = useState(0);
  const [district, setDistrict] = useState('');
  const [level, setLevel] = useState('');
  const [gender, setGender] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [recruits, setRecruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const loader = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const getDateRange = (offset) => {
    const base = new Date();
    base.setDate(base.getDate() + offset);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  };

  const isFetchingRef = useRef(false);

  const fetchRecruits = useCallback(async (reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      setLoading(true);
      const params = {
        date: format(selectedDate, 'yyyy-MM-dd'),
        gu: district || undefined,
        level: level || undefined,
        gender: gender || undefined,
        page: reset ? 0 : page,
        size: 5
      };
  
      const response = await axios.get('/recruit', { params });
      const fetched = response.data.content;
      const isLast = response.data.last;
  
      if (reset) {
        setRecruits(fetched);
        setPage(1);
      } else {
        setRecruits(prev => [...prev, ...fetched]);
        setPage(prev => prev + 1);
      }

      setHasMore(!isLast);
    } catch (error) {
      console.error('모집글 조회 실패:', error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [selectedDate, district, level, gender, page, hasMore]);

  const handleSearch = () => {
    setPage(0);
    setHasMore(true);
    fetchRecruits(true);
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchRecruits(true);
  }, [fetchRecruits]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore) {
        fetchRecruits();
      }
    }, { threshold: 1 });
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, fetchRecruits, loading, hasMore]);

  const navigate = useNavigate(); // 추가


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
              onClick={() => navigate(`/recruit/${match.recruitId}`)} // ✅ 상세 페이지 이동
              style={{ cursor: 'pointer' }} // 클릭 가능 표시
              >
              <MatchTitle>{match.title}</MatchTitle>
              <MatchStatus>
                {`인원 : ${match.current}/${match.capacity}`}
                {isClosed && <StatusTag>마감</StatusTag>}
              </MatchStatus>
              </MatchItemStyled>
          );
        })}
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
                      }}>
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
