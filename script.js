import http from 'k6/http';
import exec from 'k6/execution';
import {check} from 'k6';

export const options = {
  scenarios: {
    owners: {
      executor: 'ramping-arrival-rate',

      // Start iterations per `timeUnit`
      startRate: 50,

      // Start `startRate` iterations per second
      timeUnit: '1s',

      // Pre-allocate necessary VUs.
      preAllocatedVUs: 1000,

      stages: [
        // ramp up iterations per `timeUnit` for the first minute.
        {target: 400, duration: '1m'},
        // keep ramping up
        {target: 800, duration: '5m'},
        // hold
        {target: 800, duration: '1m'},
        // ramp-down
        {target: 50, duration: '1m'},
      ],
    },
  },
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
export default function() {
  const params = {timeout: '10s'};
  // https://grafana.com/docs/k6/latest/examples/distribute-workloads/
  if (exec.vu.idInTest % 2 === 0) {
    const res = http.get('http://petclinic:8080/owners?lastName=', params);
    check(res, {
      'is status 200': (r) => r.status === 200,
      'includes owner results': (r) => r.body.includes('Peter McTavish')
    });
  } else {
    const res = http.get('http://petclinic:8080/', params);
  }
}
