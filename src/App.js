import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter로 변경
import MyPage from './components/Mypage'; // MyPage 컴포넌트 import
import WritePost from './components/Recruit'; // RecruitPage 컴포넌트 import
import SurveyPage from './components/Auth/SurveyPage';
import MainPage from './components/Main/MainPage';
import Layout from './components/Layout'; // ✅ 추가

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout을 기준으로 모든 페이지가 그 아래에 렌더링됨 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />           {/* / → MainPage */}
          <Route path="write" element={<WritePost />} />   {/* /write → 모집글 작성 */}
          <Route path="mypage" element={<MyPage />} />     {/* /mypage → 마이페이지 */}
          <Route path="survey" element={<SurveyPage />} /> {/* /survey → 설문 */}
          {/* 필요하면 더 추가 가능 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;