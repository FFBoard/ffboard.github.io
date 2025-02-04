/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/bicep/bicep', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var r = Object.defineProperty;
        var s = Object.getOwnPropertyDescriptor;
        var c = Object.getOwnPropertyNames;
        var a = Object.prototype.hasOwnProperty;
        var g = (e) => r(e, '__esModule', { value: !0 });
        var l = (e, n) => {
                for (var t in n) r(e, t, { get: n[t], enumerable: !0 });
            },
            m = (e, n, t, i) => {
                if ((n && typeof n == 'object') || typeof n == 'function')
                    for (let o of c(n))
                        !a.call(e, o) &&
                            (t || o !== 'default') &&
                            r(e, o, {
                                get: () => n[o],
                                enumerable: !(i = s(n, o)) || i.enumerable,
                            });
                return e;
            };
        var p = (
            (e) => (n, t) =>
                (e && e.get(n)) || ((t = m(g({}), n, 1)), e && e.set(n, t), t)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var L = {};
        l(L, { conf: () => w, language: () => y });
        var k = (e) => `\\b${e}\\b`,
            x = '[_a-zA-Z]',
            u = '[_a-zA-Z0-9]',
            d = k(`${x}${u}*`),
            b = [
                'targetScope',
                'resource',
                'module',
                'param',
                'var',
                'output',
                'for',
                'in',
                'if',
                'existing',
            ],
            f = ['true', 'false', 'null'],
            C = '[ \\t\\r\\n]',
            $ = '[0-9]+',
            w = {
                comments: { lineComment: '//', blockComment: ['/*', '*/'] },
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: "'", close: "'" },
                    { open: "'''", close: "'''" },
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: "'", close: "'", notIn: ['string', 'comment'] },
                    { open: "'''", close: "'''", notIn: ['string', 'comment'] },
                ],
                autoCloseBefore: `:.,=}])' 
	`,
                indentationRules: {
                    increaseIndentPattern: new RegExp(
                        '^((?!\\/\\/).)*(\\{[^}"\'`]*|\\([^)"\'`]*|\\[[^\\]"\'`]*)$'
                    ),
                    decreaseIndentPattern: new RegExp(
                        '^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$'
                    ),
                },
            },
            y = {
                defaultToken: '',
                tokenPostfix: '.bicep',
                brackets: [
                    { open: '{', close: '}', token: 'delimiter.curly' },
                    { open: '[', close: ']', token: 'delimiter.square' },
                    { open: '(', close: ')', token: 'delimiter.parenthesis' },
                ],
                symbols: /[=><!~?:&|+\-*/^%]+/,
                keywords: b,
                namedLiterals: f,
                escapes: "\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|'|\\${)",
                tokenizer: {
                    root: [
                        { include: '@expression' },
                        { include: '@whitespace' },
                    ],
                    stringVerbatim: [
                        { regex: "(|'|'')[^']", action: { token: 'string' } },
                        {
                            regex: "'''",
                            action: { token: 'string.quote', next: '@pop' },
                        },
                    ],
                    stringLiteral: [
                        {
                            regex: '\\${',
                            action: {
                                token: 'delimiter.bracket',
                                next: '@bracketCounting',
                            },
                        },
                        { regex: "[^\\\\'$]+", action: { token: 'string' } },
                        {
                            regex: '@escapes',
                            action: { token: 'string.escape' },
                        },
                        {
                            regex: '\\\\.',
                            action: { token: 'string.escape.invalid' },
                        },
                        {
                            regex: "'",
                            action: { token: 'string', next: '@pop' },
                        },
                    ],
                    bracketCounting: [
                        {
                            regex: '{',
                            action: {
                                token: 'delimiter.bracket',
                                next: '@bracketCounting',
                            },
                        },
                        {
                            regex: '}',
                            action: {
                                token: 'delimiter.bracket',
                                next: '@pop',
                            },
                        },
                        { include: 'expression' },
                    ],
                    comment: [
                        { regex: '[^\\*]+', action: { token: 'comment' } },
                        {
                            regex: '\\*\\/',
                            action: { token: 'comment', next: '@pop' },
                        },
                        { regex: '[\\/*]', action: { token: 'comment' } },
                    ],
                    whitespace: [
                        { regex: C },
                        {
                            regex: '\\/\\*',
                            action: { token: 'comment', next: '@comment' },
                        },
                        { regex: '\\/\\/.*$', action: { token: 'comment' } },
                    ],
                    expression: [
                        {
                            regex: "'''",
                            action: {
                                token: 'string.quote',
                                next: '@stringVerbatim',
                            },
                        },
                        {
                            regex: "'",
                            action: {
                                token: 'string.quote',
                                next: '@stringLiteral',
                            },
                        },
                        { regex: $, action: { token: 'number' } },
                        {
                            regex: d,
                            action: {
                                cases: {
                                    '@keywords': { token: 'keyword' },
                                    '@namedLiterals': { token: 'keyword' },
                                    '@default': { token: 'identifier' },
                                },
                            },
                        },
                    ],
                },
            };
        return p(L);
    })();
    return moduleExports;
});
