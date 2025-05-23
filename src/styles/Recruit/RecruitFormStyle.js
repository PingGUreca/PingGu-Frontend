import styled from 'styled-components';
import { Button } from '../CommonStyles';

export const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0);
`;

export const FormTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
`;

export const Select = styled.select`
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
`;

export const CardWrapper = styled.div`
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
    padding: 0 30px;
    justify-content: space-between;
    align-items: stretch;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.04);
    
`;


export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  font-weight: bold;
`;

export const GameInfoCard = styled.div`
    margin-bottom: 20px;
    width: 40%;

`;
export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Key = styled.div`
  color: #666;
  font-weight: 500;
  margin-right: 30px;
`;

export const Value = styled.div`
  color: #222;
  font-weight: 600;
  
`;

export const DetailCard = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 4px 24px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.04);


  h3 {
    font-size: 18px;
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    color: #444;
    line-height: 1.6;
    white-space: pre-line;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  gap: 10px;

  input {
    flex: 1;
  }
`;

export const SearchButton = styled(Button)`
  height: 42px;
  padding: 0 16px;
  background-color: #00328F;
  color: white;
  font-weight: 500;
`;

export const SubmitButton = styled(Button)`
  height: 48px;
  //background-color: #2ecc71;
  color: white;
  font-weight: bold;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease-in-out;

  background-color: ${({ status }) =>
    status === 'FULL' ? '#ff4d4f' : status === 'OPEN' ? '#00328F' :status === 'CANCEL' ? '#f39c12' : '#dcdcdc'};

  //color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 8px 12px rgba(0, 0, 0, 0.1)')};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
`;

export const ModalTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const ModalButton = styled.button`
  padding: 10px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
export const FixedButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    z-index: 1000;
    display: flex;
    justify-content: center;
`;