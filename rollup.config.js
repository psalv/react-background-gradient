import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: ["**/__tests__/**", "**/__stories__/**"],
      clean: true,
    }),
    commonjs({
      ignoreGlobal: true,
      include: [/\/node_modules\//, './src/colorthief.js'],
      namedExports: {
        react: Object.keys(require("react")),
        "react-is": Object.keys(require("react-is")),
      },
    }),
  ],
};
