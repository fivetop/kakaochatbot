# AI/LLM 기반 카카오 챗봇

## 프로젝트 구조

```
kakaochatbot/
├── bot/                 # 챗봇 로직
│   ├── handler.py      # 메시지 처리
│   └── llm.py          # LLM 연동
├── server/              # 백엔드 서버
│   └── app.py          # Flask 서버
├── config/              # 설정
│   ├── skill.json      # 스킬 정의
│   └── .env            # API 키 (실제 사용시)
├── requirements.txt    # 의존성
└── README.md           # 사용법
```

## 사전 준비

1. **카카오 Developers**에서 앱 생성
   - https://developers.kakao.com → 내 애플리케이션 → 앱 만들기
   - 앱 키(Admin Key) 확인

2. **카카오 i 플러그인** 설정
   - 챗봇 서비스 → 스킬 → 스킬 활성화

3. **LLM API 키 준비**
   - OpenAI API (GPT-4)
   - 또는 Anthropic (Claude), Google (Gemini) 등

## 설치

```bash
cd kakaochatbot
pip install -r requirements.txt
```

## 설정

`.env` 파일 생성:
```bash
# .env
KAKAO_ADMIN_KEY=your_kakao_admin_key
OPENAI_API_KEY=your_openai_api_key
```

## 실행

```bash
# 로컬 서버 실행
python server/app.py

# ngrok으로 외부 노출 (테스트용)
ngrok http 5000
```

## 카카오 스킬 URL 설정

카카오 Developers → 내 애플리케이션 → 챗봇 서비스 → 스킬
- 스킬 주소: `https://your-domain.com/skill`
- 검증 URL: `https://your-domain.com/skill/validation`
- 발화 저장소: `https://your-domain.com/skill/dictionary`

## 배포

```bash
# Render, Heroku, AWS 등 백엔드 서버에 배포
# 스킬 URL을 실제 서버 주소로 설정
```

---

## 기능

- [ ]streaming 응답
- [ ]멀티턴 대화 지원
- [ ]이미지/uploads/image.png 분석 (GPT-4 Vision)
- [ ]음성 TTS 연동
- [ ]사용자별 세션 관리
