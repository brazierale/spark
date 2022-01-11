import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 5 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 20 }
  ]
}

export default function () {
  http.get('http://localhost:3001/api/testCases');
  sleep(1);
}
