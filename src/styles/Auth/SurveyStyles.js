import styled from 'styled-components';

export const SurveyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SelectButton = styled.button`
  background-color: ${({ active }) => (active ? '#00328F' : '#eee')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #00328F;
    color: #fff;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 40px;
  padding: 12px 28px;
  background-color: #00328F;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
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
