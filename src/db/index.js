// src/db/index.js

const profiles = new Map();
const issues = new Map();

function health() {
  return { ok: true, mode: "memory", mock: true, detail: "in-memory mock db" };
}

async function getUserProfile(deviceId) {
  return profiles.get(deviceId) || null;
}

async function upsertUserProfile(profile) {
  profiles.set(profile.deviceId, profile);
}

async function saveIssue(deviceId, issue) {
  const list = issues.get(deviceId) || [];
  const next = [issue, ...list.filter((x) => x.id !== issue.id)];
  issues.set(deviceId, next);
}

async function listIssues(deviceId, limit = 10) {
  const list = issues.get(deviceId) || [];
  return list.slice(0, limit);
}

module.exports = {
  db: {
    mode: "memory",
    health,
    getUserProfile,
    upsertUserProfile,
    saveIssue,
    listIssues,
  },
};
