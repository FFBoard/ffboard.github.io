/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/dockerfile/dockerfile', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var a = Object.defineProperty;
        var l = Object.getOwnPropertyDescriptor;
        var r = Object.getOwnPropertyNames;
        var i = Object.prototype.hasOwnProperty;
        var p = (o) => a(o, '__esModule', { value: !0 });
        var g = (o, e) => {
                for (var n in e) a(o, n, { get: e[n], enumerable: !0 });
            },
            c = (o, e, n, t) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let s of r(e))
                        !i.call(o, s) &&
                            (n || s !== 'default') &&
                            a(o, s, {
                                get: () => e[s],
                                enumerable: !(t = l(e, s)) || t.enumerable,
                            });
                return o;
            };
        var u = (
            (o) => (e, n) =>
                (o && o.get(e)) || ((n = c(p({}), e, 1)), o && o.set(e, n), n)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        g(f, { conf: () => d, language: () => k });
        var d = {
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                ],
            },
            k = {
                defaultToken: '',
                tokenPostfix: '.dockerfile',
                variable: /\${?[\w]+}?/,
                tokenizer: {
                    root: [
                        { include: '@whitespace' },
                        { include: '@comment' },
                        [/(ONBUILD)(\s+)/, ['keyword', '']],
                        [
                            /(ENV)(\s+)([\w]+)/,
                            [
                                'keyword',
                                '',
                                { token: 'variable', next: '@arguments' },
                            ],
                        ],
                        [
                            /(FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|ARG|VOLUME|LABEL|USER|WORKDIR|COPY|CMD|STOPSIGNAL|SHELL|HEALTHCHECK|ENTRYPOINT)/,
                            { token: 'keyword', next: '@arguments' },
                        ],
                    ],
                    arguments: [
                        { include: '@whitespace' },
                        { include: '@strings' },
                        [
                            /(@variable)/,
                            {
                                cases: {
                                    '@eos': {
                                        token: 'variable',
                                        next: '@popall',
                                    },
                                    '@default': 'variable',
                                },
                            },
                        ],
                        [/\\/, { cases: { '@eos': '', '@default': '' } }],
                        [
                            /./,
                            {
                                cases: {
                                    '@eos': { token: '', next: '@popall' },
                                    '@default': '',
                                },
                            },
                        ],
                    ],
                    whitespace: [
                        [
                            /\s+/,
                            {
                                cases: {
                                    '@eos': { token: '', next: '@popall' },
                                    '@default': '',
                                },
                            },
                        ],
                    ],
                    comment: [[/(^#.*$)/, 'comment', '@popall']],
                    strings: [
                        [/\\'$/, '', '@popall'],
                        [/\\'/, ''],
                        [/'$/, 'string', '@popall'],
                        [/'/, 'string', '@stringBody'],
                        [/"$/, 'string', '@popall'],
                        [/"/, 'string', '@dblStringBody'],
                    ],
                    stringBody: [
                        [
                            /[^\\\$']/,
                            {
                                cases: {
                                    '@eos': {
                                        token: 'string',
                                        next: '@popall',
                                    },
                                    '@default': 'string',
                                },
                            },
                        ],
                        [/\\./, 'string.escape'],
                        [/'$/, 'string', '@popall'],
                        [/'/, 'string', '@pop'],
                        [/(@variable)/, 'variable'],
                        [/\\$/, 'string'],
                        [/$/, 'string', '@popall'],
                    ],
                    dblStringBody: [
                        [
                            /[^\\\$"]/,
                            {
                                cases: {
                                    '@eos': {
                                        token: 'string',
                                        next: '@popall',
                                    },
                                    '@default': 'string',
                                },
                            },
                        ],
                        [/\\./, 'string.escape'],
                        [/"$/, 'string', '@popall'],
                        [/"/, 'string', '@pop'],
                        [/(@variable)/, 'variable'],
                        [/\\$/, 'string'],
                        [/$/, 'string', '@popall'],
                    ],
                },
            };
        return u(f);
    })();
    return moduleExports;
});
