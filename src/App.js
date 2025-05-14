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
        {/* Layout 공통 적용 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />                 {/* / */}
          <Route path="write" element={<WritePost />} />         {/* /write */}
          <Route path="mypage" element={<MyPage />} />           {/* /mypage */}
          <Route path="survey" element={<SurveyPage />} />       {/* /survey */}
          <Route path="recruit/:recruitId" element={<ViewPost />} />           {/* /recruit/1 */}
          <Route path="recruit-login/:recruitId" element={<ViewPostLogin />} />{/* /recruit-login/1 */}
          <Route path="recruitForm" element={<WritePost />} /> {/* ✅ 여기에 넣기 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;