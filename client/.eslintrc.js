module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': 'plugin:react/recommended',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 13,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'semi': ['error', 'never'],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }]
    }
};
