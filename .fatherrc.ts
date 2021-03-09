export default [{
  // 包类型 -> node plugin
  target: 'node',
  cjs: { type: 'babel', lazy: true },
  disableTypeCheck: true,
}];
