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
  background-color: ${({ active, weekend }) =>
    active ? '#00328F' : weekend ? '#bbb' : '#eee'};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  transition: background-color 0.2s;
  text-align: center;
  min-width: 110px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  &:hover {
    background-color: ${({ active, weekend, disabled }) =>
      disabled ? null : active ? '#e55a00' : weekend ? '#999' : '#ddd'};
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
  font-size: 12px;
  color: white;
  background-color: red;
  padding: 2px 6px;
  border-radius: 6px;
  margin-left: 8px;
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
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 16px 24px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
`;