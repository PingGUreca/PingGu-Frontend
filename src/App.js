import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter로 변경
import MyPage from './components/Mypage';
import WritePost from './components/RecruitForm';
import ViewPost from './components/Recruit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/recruitForm" element={<WritePost />} />
        
        {/* recruitId를 동적으로 받아서 해당 글을 보여주는 경로 */}
        <Route path="/recruit/:recruitId" element={<ViewPost />} /> 
        
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <h1>탁구 매칭 서비스</h1>
              <a href="/mypage">마이페이지 바로가기</a>
              <br />
              <a href="/recruitForm">모집 글 쓰기 바로가기</a>
              <br />
              <a href="/recruit/1">글 보기 바로가기</a>
            </header>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
