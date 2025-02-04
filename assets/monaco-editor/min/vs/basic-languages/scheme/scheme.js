/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/scheme/scheme', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var s = Object.defineProperty;
        var r = Object.getOwnPropertyDescriptor;
        var i = Object.getOwnPropertyNames;
        var l = Object.prototype.hasOwnProperty;
        var c = (o) => s(o, '__esModule', { value: !0 });
        var m = (o, e) => {
                for (var n in e) s(o, n, { get: e[n], enumerable: !0 });
            },
            p = (o, e, n, a) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let t of i(e))
                        !l.call(o, t) &&
                            (n || t !== 'default') &&
                            s(o, t, {
                                get: () => e[t],
                                enumerable: !(a = r(e, t)) || a.enumerable,
                            });
                return o;
            };
        var d = (
            (o) => (e, n) =>
                (o && o.get(e)) || ((n = p(c({}), e, 1)), o && o.set(e, n), n)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        m(f, { conf: () => g, language: () => u });
        var g = {
                comments: { lineComment: ';', blockComment: ['#|', '|#'] },
                brackets: [
                    ['(', ')'],
                    ['{', '}'],
                    ['[', ']'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                ],
            },
            u = {
                defaultToken: '',
                ignoreCase: !0,
                tokenPostfix: '.scheme',
                brackets: [
                    { open: '(', close: ')', token: 'delimiter.parenthesis' },
                    { open: '{', close: '}', token: 'delimiter.curly' },
                    { open: '[', close: ']', token: 'delimiter.square' },
                ],
                keywords: [
                    'case',
                    'do',
                    'let',
                    'loop',
                    'if',
                    'else',
                    'when',
                    'cons',
                    'car',
                    'cdr',
                    'cond',
                    'lambda',
                    'lambda*',
                    'syntax-rules',
                    'format',
                    'set!',
                    'quote',
                    'eval',
                    'append',
                    'list',
                    'list?',
                    'member?',
                    'load',
                ],
                constants: ['#t', '#f'],
                operators: [
                    'eq?',
                    'eqv?',
                    'equal?',
                    'and',
                    'or',
                    'not',
                    'null?',
                ],
                tokenizer: {
                    root: [
                        [/#[xXoObB][0-9a-fA-F]+/, 'number.hex'],
                        [
                            /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?/,
                            'number.float',
                        ],
                        [
                            /(?:\b(?:(define|define-syntax|define-macro))\b)(\s+)((?:\w|\-|\!|\?)*)/,
                            ['keyword', 'white', 'variable'],
                        ],
                        { include: '@whitespace' },
                        { include: '@strings' },
                        [
                            /[a-zA-Z_#][a-zA-Z0-9_\-\?\!\*]*/,
                            {
                                cases: {
                                    '@keywords': 'keyword',
                                    '@constants': 'constant',
                                    '@operators': 'operators',
                                    '@default': 'identifier',
                                },
                            },
                        ],
                    ],
                    comment: [
                        [/[^\|#]+/, 'comment'],
                        [/#\|/, 'comment', '@push'],
                        [/\|#/, 'comment', '@pop'],
                        [/[\|#]/, 'comment'],
                    ],
                    whitespace: [
                        [/[ \t\r\n]+/, 'white'],
                        [/#\|/, 'comment', '@comment'],
                        [/;.*$/, 'comment'],
                    ],
                    strings: [
                        [/"$/, 'string', '@popall'],
                        [/"(?=.)/, 'string', '@multiLineString'],
                    ],
                    multiLineString: [
                        [/[^\\"]+$/, 'string', '@popall'],
                        [/[^\\"]+/, 'string'],
                        [/\\./, 'string.escape'],
                        [/"/, 'string', '@popall'],
                        [/\\$/, 'string'],
                    ],
                },
            };
        return d(f);
    })();
    return moduleExports;
});
