/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/sophia/sophia', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var s = Object.defineProperty;
        var i = Object.getOwnPropertyDescriptor;
        var a = Object.getOwnPropertyNames;
        var c = Object.prototype.hasOwnProperty;
        var l = (t) => s(t, '__esModule', { value: !0 });
        var m = (t, e) => {
                for (var n in e) s(t, n, { get: e[n], enumerable: !0 });
            },
            d = (t, e, n, r) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let o of a(e))
                        !c.call(t, o) &&
                            (n || o !== 'default') &&
                            s(t, o, {
                                get: () => e[o],
                                enumerable: !(r = i(e, o)) || r.enumerable,
                            });
                return t;
            };
        var f = (
            (t) => (e, n) =>
                (t && t.get(e)) || ((n = d(l({}), e, 1)), t && t.set(e, n), n)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var p = {};
        m(p, { conf: () => g, language: () => u });
        var g = {
                comments: { lineComment: '//', blockComment: ['/*', '*/'] },
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                    ['<', '>'],
                ],
                autoClosingPairs: [
                    { open: '"', close: '"', notIn: ['string', 'comment'] },
                    { open: '{', close: '}', notIn: ['string', 'comment'] },
                    { open: '[', close: ']', notIn: ['string', 'comment'] },
                    { open: '(', close: ')', notIn: ['string', 'comment'] },
                ],
            },
            u = {
                defaultToken: '',
                tokenPostfix: '.aes',
                brackets: [
                    { token: 'delimiter.curly', open: '{', close: '}' },
                    { token: 'delimiter.parenthesis', open: '(', close: ')' },
                    { token: 'delimiter.square', open: '[', close: ']' },
                    { token: 'delimiter.angle', open: '<', close: '>' },
                ],
                keywords: [
                    'contract',
                    'library',
                    'entrypoint',
                    'function',
                    'stateful',
                    'state',
                    'hash',
                    'signature',
                    'tuple',
                    'list',
                    'address',
                    'string',
                    'bool',
                    'int',
                    'record',
                    'datatype',
                    'type',
                    'option',
                    'oracle',
                    'oracle_query',
                    'Call',
                    'Bits',
                    'Bytes',
                    'Oracle',
                    'String',
                    'Crypto',
                    'Address',
                    'Auth',
                    'Chain',
                    'None',
                    'Some',
                    'bits',
                    'bytes',
                    'event',
                    'let',
                    'map',
                    'private',
                    'public',
                    'true',
                    'false',
                    'var',
                    'if',
                    'else',
                    'throw',
                ],
                operators: [
                    '=',
                    '>',
                    '<',
                    '!',
                    '~',
                    '?',
                    '::',
                    ':',
                    '==',
                    '<=',
                    '>=',
                    '!=',
                    '&&',
                    '||',
                    '++',
                    '--',
                    '+',
                    '-',
                    '*',
                    '/',
                    '&',
                    '|',
                    '^',
                    '%',
                    '<<',
                    '>>',
                    '>>>',
                    '+=',
                    '-=',
                    '*=',
                    '/=',
                    '&=',
                    '|=',
                    '^=',
                    '%=',
                    '<<=',
                    '>>=',
                    '>>>=',
                ],
                symbols: /[=><!~?:&|+\-*\/\^%]+/,
                escapes:
                    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
                integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
                floatsuffix: /[fFlL]?/,
                tokenizer: {
                    root: [
                        [
                            /[a-zA-Z_]\w*/,
                            {
                                cases: {
                                    '@keywords': { token: 'keyword.$0' },
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        { include: '@whitespace' },
                        [/\[\[.*\]\]/, 'annotation'],
                        [/^\s*#\w+/, 'keyword'],
                        [/int\d*/, 'keyword'],
                        [/[{}()\[\]]/, '@brackets'],
                        [/[<>](?!@symbols)/, '@brackets'],
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
                            /\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/,
                            'number.float',
                        ],
                        [
                            /\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/,
                            'number.float',
                        ],
                        [
                            /0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/,
                            'number.hex',
                        ],
                        [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
                        [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
                        [/\d[\d']*\d(@integersuffix)/, 'number'],
                        [/\d(@integersuffix)/, 'number'],
                        [/[;,.]/, 'delimiter'],
                        [/"([^"\\]|\\.)*$/, 'string.invalid'],
                        [/"/, 'string', '@string'],
                        [/'[^\\']'/, 'string'],
                        [
                            /(')(@escapes)(')/,
                            ['string', 'string.escape', 'string'],
                        ],
                        [/'/, 'string.invalid'],
                    ],
                    whitespace: [
                        [/[ \t\r\n]+/, ''],
                        [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'],
                        [/\/\*/, 'comment', '@comment'],
                        [/\/\/.*$/, 'comment'],
                    ],
                    comment: [
                        [/[^\/*]+/, 'comment'],
                        [/\*\//, 'comment', '@pop'],
                        [/[\/*]/, 'comment'],
                    ],
                    doccomment: [
                        [/[^\/*]+/, 'comment.doc'],
                        [/\*\//, 'comment.doc', '@pop'],
                        [/[\/*]/, 'comment.doc'],
                    ],
                    string: [
                        [/[^\\"]+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [/"/, 'string', '@pop'],
                    ],
                },
            };
        return f(p);
    })();
    return moduleExports;
});
