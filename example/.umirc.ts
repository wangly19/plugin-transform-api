import { defineConfig } from 'umi';

const request = () => 1

export default defineConfig({
  plugins: [require.resolve('../lib')],
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
  },
  transformApi: {
    path: 'services',
    requestPath: '/request/mode'
  }
});
