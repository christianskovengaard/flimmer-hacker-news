import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/filename-case": "off",
      "object-curly-spacing": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "no-mixed-spaces-and-tabs": "error",
      "semi": ["error", "never"],
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxEOF": 1,
          "maxBOF": 1
        }
      ]
    }
  },
)
