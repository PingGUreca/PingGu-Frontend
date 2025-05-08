import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // BrowserRouter로 변경
import MyPage from './pages/Mypage'; // MyPage 컴포넌트 import

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/" element={
          <div className="App">
            <header className="App-header">
              <h1>탁구 매칭 서비스</h1>
              <a href="/mypage">마이페이지 바로가기</a>
            </header>
          </div>
        } />
      </Routes>
    </Router>
    </>
  );
}

export default App;
