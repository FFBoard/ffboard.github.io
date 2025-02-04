/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/cameligo/cameligo', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var s = Object.defineProperty;
        var i = Object.getOwnPropertyDescriptor;
        var a = Object.getOwnPropertyNames;
        var l = Object.prototype.hasOwnProperty;
        var c = (o) => s(o, '__esModule', { value: !0 });
        var m = (o, e) => {
                for (var t in e) s(o, t, { get: e[t], enumerable: !0 });
            },
            p = (o, e, t, r) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let n of a(e))
                        !l.call(o, n) &&
                            (t || n !== 'default') &&
                            s(o, n, {
                                get: () => e[n],
                                enumerable: !(r = i(e, n)) || r.enumerable,
                            });
                return o;
            };
        var d = (
            (o) => (e, t) =>
                (o && o.get(e)) || ((t = p(c({}), e, 1)), o && o.set(e, t), t)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var k = {};
        m(k, { conf: () => g, language: () => u });
        var g = {
                comments: { lineComment: '//', blockComment: ['(*', '*)'] },
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                    ['<', '>'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '<', close: '>' },
                    { open: "'", close: "'" },
                    { open: '"', close: '"' },
                    { open: '(*', close: '*)' },
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '<', close: '>' },
                    { open: "'", close: "'" },
                    { open: '"', close: '"' },
                    { open: '(*', close: '*)' },
                ],
            },
            u = {
                defaultToken: '',
                tokenPostfix: '.cameligo',
                ignoreCase: !0,
                brackets: [
                    { open: '{', close: '}', token: 'delimiter.curly' },
                    { open: '[', close: ']', token: 'delimiter.square' },
                    { open: '(', close: ')', token: 'delimiter.parenthesis' },
                    { open: '<', close: '>', token: 'delimiter.angle' },
                ],
                keywords: [
                    'abs',
                    'assert',
                    'block',
                    'Bytes',
                    'case',
                    'Crypto',
                    'Current',
                    'else',
                    'failwith',
                    'false',
                    'for',
                    'fun',
                    'if',
                    'in',
                    'let',
                    'let%entry',
                    'let%init',
                    'List',
                    'list',
                    'Map',
                    'map',
                    'match',
                    'match%nat',
                    'mod',
                    'not',
                    'operation',
                    'Operation',
                    'of',
                    'record',
                    'Set',
                    'set',
                    'sender',
                    'skip',
                    'source',
                    'String',
                    'then',
                    'to',
                    'true',
                    'type',
                    'with',
                ],
                typeKeywords: ['int', 'unit', 'string', 'tz', 'nat', 'bool'],
                operators: [
                    '=',
                    '>',
                    '<',
                    '<=',
                    '>=',
                    '<>',
                    ':',
                    ':=',
                    'and',
                    'mod',
                    'or',
                    '+',
                    '-',
                    '*',
                    '/',
                    '@',
                    '&',
                    '^',
                    '%',
                    '->',
                    '<-',
                    '&&',
                    '||',
                ],
                symbols: /[=><:@\^&|+\-*\/\^%]+/,
                tokenizer: {
                    root: [
                        [
                            /[a-zA-Z_][\w]*/,
                            {
                                cases: {
                                    '@keywords': { token: 'keyword.$0' },
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        { include: '@whitespace' },
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
                        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                        [/\$[0-9a-fA-F]{1,16}/, 'number.hex'],
                        [/\d+/, 'number'],
                        [/[;,.]/, 'delimiter'],
                        [/'([^'\\]|\\.)*$/, 'string.invalid'],
                        [/'/, 'string', '@string'],
                        [/'[^\\']'/, 'string'],
                        [/'/, 'string.invalid'],
                        [/\#\d+/, 'string'],
                    ],
                    comment: [
                        [/[^\(\*]+/, 'comment'],
                        [/\*\)/, 'comment', '@pop'],
                        [/\(\*/, 'comment'],
                    ],
                    string: [
                        [/[^\\']+/, 'string'],
                        [/\\./, 'string.escape.invalid'],
                        [
                            /'/,
                            {
                                token: 'string.quote',
                                bracket: '@close',
                                next: '@pop',
                            },
                        ],
                    ],
                    whitespace: [
                        [/[ \t\r\n]+/, 'white'],
                        [/\(\*/, 'comment', '@comment'],
                        [/\/\/.*$/, 'comment'],
                    ],
                },
            };
        return d(k);
    })();
    return moduleExports;
});
