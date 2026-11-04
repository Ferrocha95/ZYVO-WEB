import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Scripts de skills / tooling (CommonJS, no son código de la app)
    ".agents/**",
  ]),
  {
    rules: {
      // Patrón de montaje de next-themes (`setMounted(true)` en un effect) e
      // inicialización desde localStorage: legítimos; la regla es demasiado estricta.
      "react-hooks/set-state-in-effect": "off",
      // Comillas tipográficas en textos en español.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
