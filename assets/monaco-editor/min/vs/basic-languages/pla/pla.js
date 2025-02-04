/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/pla/pla', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var s = Object.defineProperty;
        var a = Object.getOwnPropertyDescriptor;
        var r = Object.getOwnPropertyNames;
        var p = Object.prototype.hasOwnProperty;
        var l = (o) => s(o, '__esModule', { value: !0 });
        var c = (o, e) => {
                for (var t in e) s(o, t, { get: e[t], enumerable: !0 });
            },
            d = (o, e, t, i) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let n of r(e))
                        !p.call(o, n) &&
                            (t || n !== 'default') &&
                            s(o, n, {
                                get: () => e[n],
                                enumerable: !(i = a(e, n)) || i.enumerable,
                            });
                return o;
            };
        var k = (
            (o) => (e, t) =>
                (o && o.get(e)) || ((t = d(l({}), e, 1)), o && o.set(e, t), t)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        c(f, { conf: () => m, language: () => u });
        var m = {
                comments: { lineComment: '#' },
                brackets: [
                    ['[', ']'],
                    ['<', '>'],
                    ['(', ')'],
                ],
                autoClosingPairs: [
                    { open: '[', close: ']' },
                    { open: '<', close: '>' },
                    { open: '(', close: ')' },
                ],
                surroundingPairs: [
                    { open: '[', close: ']' },
                    { open: '<', close: '>' },
                    { open: '(', close: ')' },
                ],
            },
            u = {
                defaultToken: '',
                tokenPostfix: '.pla',
                brackets: [
                    { open: '[', close: ']', token: 'delimiter.square' },
                    { open: '<', close: '>', token: 'delimiter.angle' },
                    { open: '(', close: ')', token: 'delimiter.parenthesis' },
                ],
                keywords: [
                    '.i',
                    '.o',
                    '.mv',
                    '.ilb',
                    '.ob',
                    '.label',
                    '.type',
                    '.phase',
                    '.pair',
                    '.symbolic',
                    '.symbolic-output',
                    '.kiss',
                    '.p',
                    '.e',
                    '.end',
                ],
                comment: /#.*$/,
                identifier: /[a-zA-Z]+[a-zA-Z0-9_\-]*/,
                plaContent: /[01\-~\|]+/,
                tokenizer: {
                    root: [
                        { include: '@whitespace' },
                        [/@comment/, 'comment'],
                        [
                            /\.([a-zA-Z_\-]+)/,
                            {
                                cases: {
                                    '@eos': { token: 'keyword.$1' },
                                    '@keywords': {
                                        cases: {
                                            '.type': {
                                                token: 'keyword.$1',
                                                next: '@type',
                                            },
                                            '@default': {
                                                token: 'keyword.$1',
                                                next: '@keywordArg',
                                            },
                                        },
                                    },
                                    '@default': { token: 'keyword.$1' },
                                },
                            },
                        ],
                        [/@identifier/, 'identifier'],
                        [/@plaContent/, 'string'],
                    ],
                    whitespace: [[/[ \t\r\n]+/, '']],
                    type: [
                        { include: '@whitespace' },
                        [/\w+/, { token: 'type', next: '@pop' }],
                    ],
                    keywordArg: [
                        [
                            /[ \t\r\n]+/,
                            {
                                cases: {
                                    '@eos': { token: '', next: '@pop' },
                                    '@default': '',
                                },
                            },
                        ],
                        [/@comment/, 'comment', '@pop'],
                        [
                            /[<>()\[\]]/,
                            {
                                cases: {
                                    '@eos': {
                                        token: '@brackets',
                                        next: '@pop',
                                    },
                                    '@default': '@brackets',
                                },
                            },
                        ],
                        [
                            /\-?\d+/,
                            {
                                cases: {
                                    '@eos': { token: 'number', next: '@pop' },
                                    '@default': 'number',
                                },
                            },
                        ],
                        [
                            /@identifier/,
                            {
                                cases: {
                                    '@eos': {
                                        token: 'identifier',
                                        next: '@pop',
                                    },
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        [
                            /[;=]/,
                            {
                                cases: {
                                    '@eos': {
                                        token: 'delimiter',
                                        next: '@pop',
                                    },
                                    '@default': 'delimiter',
                                },
                            },
                        ],
                    ],
                },
            };
        return k(f);
    })();
    return moduleExports;
});
