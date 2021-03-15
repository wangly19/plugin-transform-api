import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    hmr: true,
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},

  interface: {
    path: 'services',
    requestPath: 'umi-request'
  }
});
