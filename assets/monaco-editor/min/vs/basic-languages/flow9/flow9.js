/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/flow9/flow9', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var s = Object.defineProperty;
        var r = Object.getOwnPropertyDescriptor;
        var a = Object.getOwnPropertyNames;
        var l = Object.prototype.hasOwnProperty;
        var c = (o) => s(o, '__esModule', { value: !0 });
        var m = (o, e) => {
                for (var n in e) s(o, n, { get: e[n], enumerable: !0 });
            },
            p = (o, e, n, i) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let t of a(e))
                        !l.call(o, t) &&
                            (n || t !== 'default') &&
                            s(o, t, {
                                get: () => e[t],
                                enumerable: !(i = r(e, t)) || i.enumerable,
                            });
                return o;
            };
        var g = (
            (o) => (e, n) =>
                (o && o.get(e)) || ((n = p(c({}), e, 1)), o && o.set(e, n), n)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var d = {};
        m(d, { conf: () => f, language: () => u });
        var f = {
                comments: { blockComment: ['/*', '*/'], lineComment: '//' },
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}', notIn: ['string'] },
                    { open: '[', close: ']', notIn: ['string'] },
                    { open: '(', close: ')', notIn: ['string'] },
                    { open: '"', close: '"', notIn: ['string'] },
                    { open: "'", close: "'", notIn: ['string'] },
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                    { open: '<', close: '>' },
                ],
            },
            u = {
                defaultToken: '',
                tokenPostfix: '.flow',
                keywords: [
                    'import',
                    'require',
                    'export',
                    'forbid',
                    'native',
                    'if',
                    'else',
                    'cast',
                    'unsafe',
                    'switch',
                    'default',
                ],
                types: [
                    'io',
                    'mutable',
                    'bool',
                    'int',
                    'double',
                    'string',
                    'flow',
                    'void',
                    'ref',
                    'true',
                    'false',
                    'with',
                ],
                operators: [
                    '=',
                    '>',
                    '<',
                    '<=',
                    '>=',
                    '==',
                    '!',
                    '!=',
                    ':=',
                    '::=',
                    '&&',
                    '||',
                    '+',
                    '-',
                    '*',
                    '/',
                    '@',
                    '&',
                    '%',
                    ':',
                    '->',
                    '\\',
                    '$',
                    '??',
                    '^',
                ],
                symbols: /[@$=><!~?:&|+\-*\\\/\^%]+/,
                escapes:
                    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
                tokenizer: {
                    root: [
                        [
                            /[a-zA-Z_]\w*/,
                            {
                                cases: {
                                    '@keywords': 'keyword',
                                    '@types': 'type',
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        { include: '@whitespace' },
                        [/[{}()\[\]]/, 'delimiter'],
                        [/[<>](?!@symbols)/, 'delimiter'],
                        [
                            /@symbols/,
                            {
                                cases: {
                                    '@operators': 'delimiter',
                                    '@default': '',
                                },
                            },
                        ],
                        [
                            /((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)/,
                            'number',
                        ],
                        [/[;,.]/, 'delimiter'],
                        [/"([^"\\]|\\.)*$/, 'string.invalid'],
                        [/"/, 'string', '@string'],
                    ],
                    whitespace: [
                        [/[ \t\r\n]+/, ''],
                        [/\/\*/, 'comment', '@comment'],
                        [/\/\/.*$/, 'comment'],
                    ],
                    comment: [
                        [/[^\/*]+/, 'comment'],
                        [/\*\//, 'comment', '@pop'],
                        [/[\/*]/, 'comment'],
                    ],
                    string: [
                        [/[^\\"]+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [/"/, 'string', '@pop'],
                    ],
                },
            };
        return g(d);
    })();
    return moduleExports;
});
