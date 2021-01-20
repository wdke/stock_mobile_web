import { defineConfig } from 'umi';

export default defineConfig({
  locale: { antd: true },
  proxy: {
    '/stock/': {
      target: 'https://hnsqwdk.top/',
      // target: 'http://localhost:8811/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  history: {
    type: 'hash',
  },
  routes: [
    // { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/login', component: '@/pages/Login' },
    { exact: true, path: '/register', component: '@/pages/Register' },

    {
      exact: true,
      component: '@/pages/index',
      routes: [
        { exact: true, path: '/HoldDayMap', component: '@/pages/hold/HoldDayMap' },
        { exact: true, path: '/hold/', component: '@/pages/hold/Index' },
        { exact: true, path: '/hold/price', component: '@/pages/hold/HoldPrice' },
        { exact: true, path: '/hold/secconds', component: '@/pages/hold/HoldSeccondsMap' },
        { exact: true, path: '/', component: '@/pages/snalysis/Snalysis' },
        { exact: true, path: '/snalysis/detail', component: '@/pages/snalysis/Detail' },
        { exact: true, path: '/trading', component: '@/pages/trading/index' }
        // { exact: true, path: '/index', component: '@/pages/ListTableList/index' },
        // { exact: true, path: '/welcome', component: '@/pages/Welcome' },
      ],
    },
    // { exact: true, path: '/mobile', component: '@/pages/app/menus/index' },
  ],
});
