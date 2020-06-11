const searchData = [
  {
    data: {
      name: 'App',
      state: null,
      stateType: {
        stateful: false,
        receiving: false,
        sending: true,
      },
    },
    height: 8,
    depth: 0,
    x: 716.3000000000001,
    y: 0,
  },
  {
    data: {
      name: 'BrowserRouter',
      props: {},
      stateType: {
        stateful: false,
        receiving: true,
        sending: true,
      },
    },
    height: 7,
    depth: 1,
    x: 716.3000000000001,
    y: 95,
  },
  {
    data: {
      name: 'Router',
      state: {
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'pwbb3b',
        },
      },
      props: {
        history: {
          length: 5,
          action: 'PUSH',
          location: {
            pathname: '/',
            search: '',
            hash: '',
            key: 'pwbb3b',
          },
        },
      },
      stateType: {
        stateful: true,
        receiving: true,
        sending: true,
      },
    },
    height: 6,
    depth: 2,
    x: 716.3000000000001,
    y: 190,
  },
  {
    data: {
      name: 'Switch',
      props: {},
      stateType: {
        stateful: false,
        receiving: true,
        sending: true,
      },
    },
    height: 5,
    depth: 3,
    x: 716.3000000000001,
    y: 285,
  },
  {
    data: {
      name: 'ProtectedRoute',
      props: {
        exact: true,
        path: '/',
        component: 'f component()',
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'pwbb3b',
        },
        computedMatch: {
          path: '/',
          url: '/',
          isExact: true,
          params: {},
        },
      },
      stateType: {
        stateful: false,
        receiving: true,
        sending: true,
      },
    },
    height: 4,
    depth: 4,
    x: 716.3000000000001,
    y: 380,
  },
  {
    data: {
      name: 'Route',
      props: {
        exact: true,
        path: '/',
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'pwbb3b',
        },
        computedMatch: {
          path: '/',
          url: '/',
          isExact: true,
          params: {},
        },
        render: 'f render()',
      },
      stateType: {
        stateful: false,
        receiving: true,
        sending: true,
      },
    },
    height: 3,
    depth: 5,
    x: 716.3000000000001,
    y: 475,
  },
  {
    data: {
      name: 'Home',
      state: {
        graphData: {
          dates: [
            '2019-01-01',
            '2019-02-01',
            '2019-03-01',
            '2019-04-01',
            '2019-05-01',
            '2019-06-01',
            '2019-07-01',
            '2019-08-01',
            '2019-09-01',
            '2019-10-01',
            '2019-11-01',
            '2019-12-01',
          ],
          balances: [
            '1000',
            '1077.8292851314',
            '1056.9707208628106',
            '1011.4230105318165',
            '1280.4601643568963',
            '1246.5236049556274',
            '1594.2490714050964',
            '1397.9523718173732',
            '1035.1826098757933',
            '1138.2455309109264',
            '1911.4746773973525',
            '1002.9841051342213',
          ],
        },
      },
      props: {
        history: {
          length: 5,
          action: 'PUSH',
          location: {
            pathname: '/',
            search: '',
            hash: '',
            key: 'pwbb3b',
          },
        },
        location: {
          pathname: '/',
          search: '',
          hash: '',
          key: 'pwbb3b',
        },
        match: {
          path: '/',
          url: '/',
          isExact: true,
          params: {},
        },
      },
      stateType: {
        stateful: true,
        receiving: true,
        sending: true,
      },
    },
    height: 2,
    depth: 6,
    x: 606.1,
    y: 570,
  },
  {
    data: {
      name: 'Navbar',
    },
    height: 0,
    depth: 6,
    x: 826.5,
    y: 570,
  },
  {
    data: {
      name: 'TitleBar',
      props: {
        title: 'Home',
      },
      stateType: {
        stateful: false,
        receiving: true,
        sending: true,
      },
    },
    height: 1,
    depth: 7,
    x: 330.6,
    y: 665,
  },
  {
    data: {
      name: 'Card',
      props: {
        data: {
          dates: [
            '2019-01-01',
            '2019-02-01',
            '2019-03-01',
            '2019-04-01',
            '2019-05-01',
            '2019-06-01',
            '2019-07-01',
            '2019-08-01',
            '2019-09-01',
            '2019-10-01',
            '2019-11-01',
            '2019-12-01',
          ],
          balances: [
            '1000',
            '1077.8292851314',
            '1056.9707208628106',
            '1011.4230105318165',
            '1280.4601643568963',
            '1246.5236049556274',
            '1594.2490714050964',
            '1397.9523718173732',
            '1035.1826098757933',
            '1138.2455309109264',
            '1911.4746773973525',
            '1002.9841051342213',
          ],
        },
      },
      stateType: {
        stateful: false,
        receiving: true,
        sending: true,
      },
    },
    height: 1,
    depth: 7,
    x: 881.6,
    y: 665,
  },
  {
    data: {
      name: 'Title',
      props: {
        title: 'Home',
      },
      stateType: {
        stateful: false,
        receiving: true,
        sending: false,
      },
    },
    height: 0,
    depth: 8,
    x: 220.4,
    y: 760,
  },
  {
    data: {
      name: 'AccountIcon',
    },
    height: 0,
    depth: 8,
    x: 440.8,
    y: 760,
  },
  {
    data: {
      name: 'PlotlyComponent',
      props: {
        data: [
          {
            x: [
              '2019-01-01',
              '2019-02-01',
              '2019-03-01',
              '2019-04-01',
              '2019-05-01',
              '2019-06-01',
              '2019-07-01',
              '2019-08-01',
              '2019-09-01',
              '2019-10-01',
              '2019-11-01',
              '2019-12-01',
            ],
            y: [
              '1000',
              '1077.8292851314',
              '1056.9707208628106',
              '1011.4230105318165',
              '1280.4601643568963',
              '1246.5236049556274',
              '1594.2490714050964',
              '1397.9523718173732',
              '1035.1826098757933',
              '1138.2455309109264',
              '1911.4746773973525',
              '1002.9841051342213',
            ],
            mode: 'none',
            type: 'scattergl',
            fill: 'tozeroy',
            fillcolor: '#4BA4F4',
          },
        ],
        layout: {
          width: 320,
          height: 240,
          margin: {
            l: 30,
            r: 10,
            b: 30,
            t: 10,
          },
          yaxis: {
            range: [500, 2000],
            type: 'linear',
          },
          xaxis: {
            type: 'date',
          },
        },
        config: {
          displayModeBar: false,
        },
        debug: false,
        useResizeHandler: false,
        style: {
          position: 'relative',
          display: 'inline-block',
        },
      },
      stateType: {
        stateful: false,
        receiving: true,
        sending: false,
      },
    },
    height: 0,
    depth: 8,
    x: 881.6,
    y: 760,
  },
];

module.exports = searchData;
