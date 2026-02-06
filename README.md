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

