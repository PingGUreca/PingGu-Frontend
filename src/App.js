import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter로 변경
import SurveyPage from './components/Auth/SurveyPage';
import MainPage from './components/Main/MainPage';
import Layout from './components/Layout'; // ✅ 추가
import MyPage from './components/Mypage';
import WritePost from './components/RecruitForm';
import ViewPost from './components/Recruit';
import ViewPostLogin from './components/Recruit/login';

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

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/recruitForm" element={<WritePost />} />
        
        {/* recruitId를 동적으로 받아서 해당 글을 보여주는 경로 */}
        <Route path="/recruit/:recruitId" element={<ViewPost />} /> 
        <Route path="/recruit-login/:recruitId" element={<ViewPostLogin />} /> 
        
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <h1>탁구 매칭 서비스</h1>
              <a href="/mypage">마이페이지 바로가기</a>
              <br />
              <a href="/recruitForm">모집 글 쓰기 바로가기</a>
              <br />
              <a href="/recruit/1">1번 글 보기 바로가기(자신의 글이 아닐때)</a>
              <br />
              <a href="/recruit-login/1">1번 글 보기 바로가기(자신의 글 일때)</a>
            </header>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;