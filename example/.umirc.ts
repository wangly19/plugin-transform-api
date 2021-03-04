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
  transformApi: {
    path: 'services',
    requestPath: '/request/mode'
  }
});
