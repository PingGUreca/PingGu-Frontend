# Nginx를 기반으로 한 이미지 사용
FROM nginx:alpine

# 빌드된 React 파일을 Nginx로 복사
COPY build/ /usr/share/nginx/html

# 포트 설정 (Fly.io 기본 HTTP 포트는 8080)
EXPOSE 8080

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]