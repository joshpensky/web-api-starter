module.exports = api => {
  api.cache.forever();
  return {
    babelrcRoots: ['.', './web'],
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
        },
      ],
      '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };
};
