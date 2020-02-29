import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'

// lib/index.js-commonjs-main   标准使用
// dist/index.js-umd-unpkg      全局引用
// es/index.js-es-module        tree-shaking用
export default [{
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: 'v3',
  },
  plugins: [
    typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true
        }
      }
    }),
    babel({ runtimeHelpers: true }),
    //terser(),
  ]
}, {
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true
        }
      }
    }),
    babel({ runtimeHelpers: true }),
    //terser(),
  ]
}, {
  input: './src/index.ts',
  output: {
    file: './es/index.js',
    format: 'es',
  },
  plugins: [
    typescript({
      clean: true,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true
        }
      }
    }),
    babel({ runtimeHelpers: true }),
    //terser(),
  ]
}]
