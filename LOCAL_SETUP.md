# 로컬 개발 환경 설정

## 프로젝트 개요
카카오 챗봇 스킬 서버 (FAQ 챗봇)

## 기술 스택
- Backend: Node.js (Express) 또는 Python (Flask)
- 배포: Railway, Render

## 로컬 서버 실행

### Node.js 서버 (기본)
```bash
cd kakaochatbot
npm install
node server/app.js
```
- URL: http://localhost:3000

### Python Flask 서버
```bash
cd kakaochatbot
pip install -r requirements.txt
python server/app.py
```
- URL: http://localhost:5000

## API 엔드포인트

### POST /skill
카카오 스킬 메시지 처리

```bash
curl -X POST http://localhost:3000/skill \
  -H "Content-Type: application/json" \
  -d '{
    "action": {"params": {"name": "영업시간"}},
    "userRequest": {}
  }'
```

### GET /skill
테스트용 (메시지 파라미터)

```bash
curl "http://localhost:3000/skill?message=영업시간"
```

### GET /health
헬스 체크

```bash
curl http://localhost:3000/health
```

## FAQ 키워드
- 영업시간, 운영시간, 시간
- 주소, 위치
- 전화, 연락처, 번호
- 가격, 비용
- 배송, 배달
- 환불, 반품
- 취소
- 교환
- 도움말, 도움

## 테스트
1. 로컬 서버 실행
2. `http://localhost:3000/skill?message=영업시간` 브라우저에서 테스트
3. 또는 curl로 테스트

## 문제 해결

### 포트 충돌
```bash
lsof -i :3000
# 프로세스 중지
kill <PID>
```

### 의존성 문제
```bash
rm -rf node_modules package-lock.json
npm install
```