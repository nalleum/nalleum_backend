# nalleum_backend

# 🚀 Spoiler Backend
> 초개인화 면접 치트키 **스포일러(Spoiler)** 백엔드 서버

취준생이 설정한 **관심 기업 · 직무**를 기반으로  
기업 뉴스를 수집 → 면접 질문 형태로 가공 → **푸시 알림(Ping)** 으로 전달하는 서버입니다.

---

## 📌 핵심 역할

- 기업/산업 뉴스 수집 (외부 API, RSS)
- 뉴스 → **면접 예상 질문 + 답변 가이드** 생성 (LLM)
- 사용자 맞춤 **푸시 알림(Firebase FCM)** 발송
- 알림 로그 및 히스토리 관리
- 프론트엔드와 명확한 **API Contract 기반 협업**

---

## 🧠 서비스 개요

**문제**
- 취준생은 정보가 부족한 게 아니라,  
  **정보를 면접에 쓰는 형태로 가공할 시간이 부족**함

**해결**
- 뉴스를 단순 요약하지 않고  
  👉 *“면접에서 이렇게 나옵니다”* 형태로 재구성
- 앱을 열지 않아도 **잠금화면 푸시 알림**으로 핵심 전달

---

## 🏗️ 아키텍처 개요

[ News API / RSS ]
↓
(Backend A)
뉴스 수집 · 전처리
↓
(LLM 처리)
요약 + 질문 생성
↓
(Backend B)
API 응답 구성
↓
[ Firebase FCM ]
푸시 알림 발송
↓
[ Mobile App ]


---

## ⚙️ 기술 스택

- **Runtime:** Node.js
- **Framework:** Express (or Fastify)
- **Language:** TypeScript
- **AI:** OpenAI API (GPT-4o mini)
- **Database:** Firebase Firestore
- **Push Notification:** Firebase Cloud Messaging (FCM)
- **Deploy:** Serverless / Cloud Functions (선택)

---

## 👥 역할 분리 (Backend Contract)

### Backend A – 외부 연동 & 데이터 레이어

- 뉴스 API / RSS 수집
- OpenAI API 연동
- Firestore 연결
- FCM 푸시 발송
- 환경변수 및 키 관리

### Backend B – 서비스 로직 & API 레이어

- API 엔드포인트 설계
- 비즈니스 로직 조합
- 응답 포맷 통일
- 데모 안정성 책임

> ⚠️ 각자 영역 코드 직접 수정 금지 (요청은 OK)

---

## 📦 공통 데이터 타입 (Interface)

### News

```ts
interface News {
  id?: string;
  company: string;
  title: string;
  summary: string;
  link?: string;
}
InterviewQuestion
interface InterviewQuestion {
  oneLine: string;        // 푸시 알림용 한 줄
  question: string;       // 면접 예상 질문
  answerGuide: string;    // 답변 가이드
}
PingLog
interface PingLog {
  userId: string;
  company: string;
  role: string;
  question: string;
  sentAt: string; // ISO Date
}
🔌 서비스 함수 계약 (중요)
Backend A → Backend B 제공 함수
// 최신 뉴스 1건 조회
getLatestNews(company: string): Promise<News>;

// 뉴스 기반 면접 질문 생성
generateInterviewQuestion(
  news: News,
  role: string
): Promise<InterviewQuestion>;

// 푸시 알림 발송
sendPush(
  fcmToken: string,
  payload: {
    title: string;
    body: string;
  }
): Promise<void>;

// 푸시 로그 저장
savePingLog(log: PingLog): Promise<void>;
👉 리턴 타입 변경 금지

🌐 API 엔드포인트
POST /trigger/sendPing
특정 유저에게 면접 대비 Ping 발송

Response

{
  "success": true,
  "data": {}
}
GET /pings/latest
최근 발송된 Ping 조회

Response

{
  "success": true,
  "data": []
}
❗ 에러 처리 규칙
각자 책임 영역에서 try/catch

에러 발생 시 명확한 코드 throw

throw new Error("NEWS_FETCH_FAILED");
API 레이어에서 사용자 메시지로 변환

{
  "success": false,
  "message": "뉴스를 불러오지 못했습니다."
}
🧪 Mock & Fallback 정책
외부 API 실패 시 → Mock 데이터 사용 허용

AI 응답 실패 시 → 고정 질문 fallback

const FALLBACK_QUESTION =
  "최근 회사의 주요 이슈에 대해 어떻게 생각하십니까?";
🌿 브랜치 전략 (해커톤)
main : 데모 안정 브랜치

feat/external : Backend A

feat/api : Backend B

커밋 메시지 규칙
[BE-A] add naver search api
[BE-B] implement sendPing flow

