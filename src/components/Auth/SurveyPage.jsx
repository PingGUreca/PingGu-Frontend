import { useState } from 'react';
import {
  SurveyContainer, Card, SectionTitle, FormGroup, Label, Input,
  ButtonGroup, SelectButton, SubmitButton, ModalOverlay, ModalContent,
  DistrictGrid, DistrictCard, ModalHeader, ModalFooter, ModalButton
} from '../../styles/Auth/SurveyStyles';

const SurveyPage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [handedness, setHandedness] = useState('');
  const [racket, setRacket] = useState('');
  const [level, setLevel] = useState('');
  const [gu, setGu] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    if (!name) {
      alert('이름을 입력해주세요!');
      return;
    }

    alert(`제출 완료!\n이름: ${name}\n성별: ${gender}\n손잡이: ${handedness}\n라켓: ${racket}\n실력: ${level}\n지역: ${gu}`);
  };

  const seoulDistricts = [
    '강남구', '강동구', '강북구', '강서구',
    '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구',
    '마포구', '서대문구', '서초구', '성동구',
    '성북구', '송파구', '양천구', '영등포구',
    '용산구', '은평구', '종로구', '중구', '중랑구'
  ];

  const groupByInitial = (districts) => {
    const initials = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    const ranges = [
      ['가','나'],['나','다'],['다','라'],['라','마'],['마','바'],['바','사'],['사','아'],['아','자'],
      ['자','차'],['차','카'],['카','타'],['타','파'],['파','하'],['하','힣']
    ];

    return initials.reduce((acc, initial, idx) => {
      acc[initial] = districts.filter(d => d >= ranges[idx][0] && d < ranges[idx][1]);
      return acc;
    }, {});
  };

  const groupedDistricts = groupByInitial(seoulDistricts);

  return (
    <SurveyContainer>
      <Card>
        <SectionTitle>기본정보를 알려주세요</SectionTitle>

        <FormGroup>
          <Label>이름</Label>
          <Input
            type="text"
            placeholder="예: 김탁구"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>성별</Label>
          <ButtonGroup>
            <SelectButton active={gender === 'M'} onClick={() => setGender('M')}>남성</SelectButton>
            <SelectButton active={gender === 'F'} onClick={() => setGender('F')}>여성</SelectButton>
          </ButtonGroup>
        </FormGroup>

        <FormGroup>
          <Label>손잡이</Label>
          <ButtonGroup>
            <SelectButton active={handedness === 'R'} onClick={() => setHandedness('R')}>오른손잡이</SelectButton>
            <SelectButton active={handedness === 'L'} onClick={() => setHandedness('L')}>왼손잡이</SelectButton>
            <SelectButton active={handedness === 'BOTH'} onClick={() => setHandedness('BOTH')}>양손 모두 가능</SelectButton>
          </ButtonGroup>
        </FormGroup>

        <FormGroup>
          <Label>탁구채</Label>
          <ButtonGroup>
            <SelectButton active={racket === 'PEN_HOLDER'} onClick={() => setRacket('PEN_HOLDER')}>펜홀더</SelectButton>
            <SelectButton active={racket === 'SHAKE_HAND'} onClick={() => setRacket('SHAKE_HAND')}>쉐이크핸드</SelectButton>
          </ButtonGroup>
        </FormGroup>

        <FormGroup>
          <Label>선호하는 지역</Label>
          <SelectButton onClick={() => setIsModalOpen(true)}>
            {gu || '지역 선택하기'}
          </SelectButton>
        </FormGroup>

        <FormGroup>
          <Label>실력</Label>
          <ButtonGroup>
            <SelectButton active={level === 'BEGINNER'} onClick={() => setLevel('BEGINNER')}>초급</SelectButton>
            <SelectButton active={level === 'INTERMEDIATE'} onClick={() => setLevel('INTERMEDIATE')}>중급</SelectButton>
            <SelectButton active={level === 'ADVANCED'} onClick={() => setLevel('ADVANCED')}>고급</SelectButton>
          </ButtonGroup>
        </FormGroup>

        <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
      </Card>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>지역을 선택해주세요</ModalHeader>

            {Object.entries(groupedDistricts).map(([initial, districts]) => (
              districts.length > 0 && (
                <div key={initial} style={{ marginBottom: '24px' }}>
                  <Label style={{ marginBottom: '12px', fontSize: '16px' }}>{initial}</Label>
                  <DistrictGrid>
                    {districts.map((district) => (
                      <DistrictCard
                        key={district}
                        active={gu === district}
                        onClick={() => {
                          setGu(district);
                          setIsModalOpen(false);
                        }}
                      >
                        {district}
                      </DistrictCard>
                    ))}
                  </DistrictGrid>
                </div>
              )
            ))}

            <ModalFooter>
              <ModalButton onClick={() => setIsModalOpen(false)}>닫기</ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </SurveyContainer>
  );
};

export default SurveyPage;