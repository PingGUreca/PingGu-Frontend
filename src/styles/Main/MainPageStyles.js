import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 10px 20px;
  max-width: 960px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const Badge = styled.span`
  display: inline-block;
  margin-left: 8px;
  background: #00328F;
  color: #fff;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 50%;
`;

export const LoginButton = styled.button`
  background: #eee;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
`;

export const FilterBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? '#00328F' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#e55a00' : '#ddd')};
  }
`;

export const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MatchItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f2f2f2;
  padding: 16px;
  border-radius: 8px;
`;

export const MatchDetail = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const ImageBanner = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

export const DistrictGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const DistrictCard = styled.div`
  padding: 12px;
  text-align: center;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? '#00328F' : '#f2f2f2')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ active }) => (active ? '#00328F' : '#e0e0e0')};
  }
`;

export const TopBanner = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`;

export const MyPageButton = styled.button`
  background-color: #eee;
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const SearchButton = styled.button`
  background-color: #00328F;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

export const CustomDateWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 25px;
  width: 100%;
`;


export const CustomDateButton = styled.button`
  background-color: ${({ active }) =>
    active ? '#00328F' : '#eee'}; // ✅ 주말 여부는 배경색에서 제거
  color: ${({ active, weekend }) =>
    active ? '#fff' : weekend ? '#d32f2f' : '#000'}; // ✅ 주말이면 빨간 글씨
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  transition: all 0.2s ease, transform 0.2s ease;
  text-align: center;
  min-width: 110px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-3px)')};
    background-color: ${({ active, disabled }) =>
      disabled ? null : active ? '#00246e' : '#ddd'}; // ✅ 주말 조건 제거
  }
`;



export const DateDayText = styled.div`
  font-size: 14px;
  color: ${({ active }) => (active ? '#fff' : '#000')};
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #00328F;
  padding: 0 10px;
`;

export const StatusTag = styled.span`
  display: inline-block;
  margin-left: 8px;

  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;

  color: white;
  background: linear-gradient(135deg, #f44336, #d32f2f); // 밝은 빨강 → 진한 빨강
  border-radius: 999px;

  box-shadow: 0 2px 6px rgba(244, 67, 54, 0.3); // 약간의 그림자
  transition: all 0.2s ease;

  user-select: none;
`;

export const MatchTitle = styled.div`
  color: #000;
  text-align: left;
  flex: 2;
`;

export const MatchStatus = styled.div`
  text-align: right;
  flex: 1;
`;

export const MatchItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;

  padding: 18px 24px;
  margin-bottom: 14px;

  font-size: 16px;
  font-weight: 500;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.25s ease;

  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;
