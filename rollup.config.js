import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import packageJson from './package.json';

const glob = require('glob');

const components = glob.sync('./lib/components/**/index.js', { cache: true });

const getRollupEntryOutputConfig = (fileList, isOutputNameFolderName = true) =>
  fileList.map(item => {
    const path = item.split('/');
    const outputModuleName = isOutputNameFolderName
      ? path[path.length - 2]
      : path[path.length - 1].split('.')[0];
    return {
      input: item,
      output: {
        format: 'es',
        file: `./dist/${outputModuleName}.js`,
      },
    };
  });

const entryOutputList = getRollupEntryOutputConfig(components);

const dependencies = packageJson.dependencies || {};

const shared = {
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [['@babel/preset-env', { modules: false }], 'next'],
    }),
  ],
  globals: [],
  external: [...Object.keys(dependencies), 'next/link'],
};

const rollUpConfig = entryOutputList.map(config => ({ ...shared, ...config }));

export default rollUpConfig;
