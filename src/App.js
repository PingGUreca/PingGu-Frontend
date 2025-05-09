import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter로 변경
import MyPage from './components/Mypage'; // MyPage 컴포넌트 import
import WritePost from './components/Recruit'; // RecruitPage 컴포넌트 import

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/recruit" element={<WritePost />} /> {/* /recruit 라우트 추가 */}
          <Route path="/" element={
            <div className="App">
              <header className="App-header">
                <h1>탁구 매칭 서비스</h1>
                <a href="/mypage">마이페이지 바로가기</a>
                <br />
                <a href="/recruit">모집 글 쓰기 바로가기</a> {/* /recruit 링크 추가 */}
              </header>
            </div>
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
