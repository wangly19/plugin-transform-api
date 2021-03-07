import { defineConfig } from 'umi';

const request = () => 1

export default defineConfig({
  plugins: [require.resolve('../dist')],
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {},
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  interface: {
    path: 'services',
    requestPath: 'umi-request'
  }
});
