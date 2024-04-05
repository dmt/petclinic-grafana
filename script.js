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
        {target: 800, duration: '1m'},

        // keep going
        {target: 800, duration: '2m'},

        // Linearly ramp-down
        {target: 50, duration: '1m'},
      ],
    },
  },
  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
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
