import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import pluginCheckFile from "eslint-plugin-check-file";
import pluginN from "eslint-plugin-n";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      n: pluginN,
      "check-file": pluginCheckFile,
    },
    rules: {
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: "error",
      quotes: ["error", "double"],
      "n/no-process-env": "error",
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**": "NEXT_JS_APP_ROUTER_CASE",
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
