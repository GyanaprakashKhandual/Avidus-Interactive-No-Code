import http from 'k6/http';
import { check, sleep } from 'k6';
import { config } from './config.js';

// Use configuration directly from config.js
const contactUrl = config.messageFromChair;
const targetUsers = config.targetUsers;
const rampUpDuration = config.rampUpDuration;
const testDuration = config.testDuration;
const rampDownDuration = config.rampDownDuration;

export const options = {
  stages: [
    { duration: rampUpDuration, target: targetUsers },
    { duration: testDuration, target: targetUsers },
    { duration: rampDownDuration, target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const params = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
    },
    timeout: '30s',
  };

  const response = http.get(contactUrl, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time acceptable': (r) => r.timings.duration < 3000,
    'page contains contact content': (r) => r.body.includes('contact') || r.body.includes('Contact'),
  });

  sleep(0.1);
}