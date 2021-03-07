export default [{
  target: 'node',
  cjs: { type: 'rollup' },
  disableTypeCheck: true,
  extraExternals: ['umi', 'react']
}];
