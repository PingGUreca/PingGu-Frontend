// src/components/Auth/KakaoRedirectHandler.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');
        if (!code) {
            alert('인가 코드가 없습니다.');
            navigate('/login');
            return;
        }

        const alreadyProcessed = sessionStorage.getItem('kakao_code_processed');
        if (alreadyProcessed === code) {
            console.warn('⚠️ 이미 처리된 카카오 인가 코드입니다.');
            return;
        }

        const fetchLogin = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/kakao-login?code=${code}`, {
                    withCredentials: true, // ✅ 쿠키에 refresh_token 받기 위해 필요
                });

                const { memberId, register } = response.data;

                const accessToken = response.headers['authorization']?.split(' ')[1];
                if (accessToken) {
                    localStorage.setItem('access_token', accessToken); // ✅ access_token 저장
                }

                sessionStorage.setItem('kakao_code_processed', code); // ✅ 중복 요청 방지 플래그

                // ✅ 회원 여부에 따라 페이지 이동
                if (register) {
                    navigate('/', { replace: true });
                } else {
                    navigate(`/survey?memberId=${memberId}`, { replace: true });
                }
            } catch (err) {
                console.error('카카오 로그인 처리 실패:', err);
                alert('로그인에 실패했습니다.');
                navigate('/login', { replace: true });
            }
        };

        fetchLogin();
    }, [navigate, searchParams]);

    return <div>로그인 처리 중입니다...</div>;
};

export default KakaoRedirectHandler;
