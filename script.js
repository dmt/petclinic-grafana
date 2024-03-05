import http from 'k6/http';
import {check} from 'k6';

export const options = {
  scenarios: {
    owners: {
      executor: 'ramping-arrival-rate',

      // Start iterations per `timeUnit`
      startRate: 100,

      // Start `startRate` iterations per second
      timeUnit: '1s',

      // Pre-allocate necessary VUs.
      preAllocatedVUs: 600,

      stages: [
        // Start 100 iterations per `timeUnit` for the first minute.
        {target: 100, duration: '1m'},

        // Linearly ramp-up to starting 300 iterations per `timeUnit` over the following two minutes.
        {target: 300, duration: '2m'},

        // Linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minutes.
        {target: 60, duration: '2m'},
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
  const res = http.get('http://petclinic:8080/owners?lastName=', params);
  check(res, {

    'is status 200': (r) => r.status === 200,

    'includes owner results': (r) => r.body.includes('Peter McTavish')

  });
  const res2 = http.get('http://petclinic:8080/', params);
}
