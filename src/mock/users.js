// Mock users for hackathon demo (in-memory only)

const users = [
  {
    deviceId: "demo-001",
    nickname: "홍길동",
    targetCompanies: ["네이버", "카카오"],
    targetRole: "Frontend",
    interestKeywords: ["생성형 AI", "검색", "추천"],
    pushTime: "08:00",
  },
  {
    deviceId: "demo-002",
    nickname: "김지원",
    targetCompanies: ["토스"],
    targetRole: "PM",
    interestKeywords: ["핀테크", "송금", "보안"],
    pushTime: "22:30",
  },
  {
    deviceId: "demo-003",
    nickname: "이서준",
    targetCompanies: ["쿠팡"],
    targetRole: "Backend",
    interestKeywords: ["물류", "추천", "대규모 트래픽", "캐시"],
    pushTime: "12:30",
  },
];

module.exports = { users };
