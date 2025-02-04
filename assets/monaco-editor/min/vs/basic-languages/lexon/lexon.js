/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/lexon/lexon', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var n = Object.defineProperty;
        var s = Object.getOwnPropertyDescriptor;
        var d = Object.getOwnPropertyNames;
        var a = Object.prototype.hasOwnProperty;
        var l = (t) => n(t, '__esModule', { value: !0 });
        var p = (t, e) => {
                for (var o in e) n(t, o, { get: e[o], enumerable: !0 });
            },
            c = (t, e, o, r) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let i of d(e))
                        !a.call(t, i) &&
                            (o || i !== 'default') &&
                            n(t, i, {
                                get: () => e[i],
                                enumerable: !(r = s(e, i)) || r.enumerable,
                            });
                return t;
            };
        var m = (
            (t) => (e, o) =>
                (t && t.get(e)) || ((o = c(l({}), e, 1)), t && t.set(e, o), o)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        p(f, { conf: () => u, language: () => k });
        var u = {
                comments: { lineComment: 'COMMENT' },
                brackets: [['(', ')']],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: ':', close: '.' },
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '`', close: '`' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                    { open: ':', close: '.' },
                ],
                folding: {
                    markers: {
                        start: new RegExp('^\\s*(::\\s*|COMMENT\\s+)#region'),
                        end: new RegExp('^\\s*(::\\s*|COMMENT\\s+)#endregion'),
                    },
                },
            },
            k = {
                tokenPostfix: '.lexon',
                ignoreCase: !0,
                keywords: [
                    'lexon',
                    'lex',
                    'clause',
                    'terms',
                    'contracts',
                    'may',
                    'pay',
                    'pays',
                    'appoints',
                    'into',
                    'to',
                ],
                typeKeywords: [
                    'amount',
                    'person',
                    'key',
                    'time',
                    'date',
                    'asset',
                    'text',
                ],
                operators: [
                    'less',
                    'greater',
                    'equal',
                    'le',
                    'gt',
                    'or',
                    'and',
                    'add',
                    'added',
                    'subtract',
                    'subtracted',
                    'multiply',
                    'multiplied',
                    'times',
                    'divide',
                    'divided',
                    'is',
                    'be',
                    'certified',
                ],
                symbols: /[=><!~?:&|+\-*\/\^%]+/,
                tokenizer: {
                    root: [
                        [/^(\s*)(comment:?(?:\s.*|))$/, ['', 'comment']],
                        [
                            /"/,
                            {
                                token: 'identifier.quote',
                                bracket: '@open',
                                next: '@quoted_identifier',
                            },
                        ],
                        [
                            'LEX$',
                            {
                                token: 'keyword',
                                bracket: '@open',
                                next: '@identifier_until_period',
                            },
                        ],
                        [
                            'LEXON',
                            {
                                token: 'keyword',
                                bracket: '@open',
                                next: '@semver',
                            },
                        ],
                        [
                            ':',
                            {
                                token: 'delimiter',
                                bracket: '@open',
                                next: '@identifier_until_period',
                            },
                        ],
                        [
                            /[a-z_$][\w$]*/,
                            {
                                cases: {
                                    '@operators': 'operator',
                                    '@typeKeywords': 'keyword.type',
                                    '@keywords': 'keyword',
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        { include: '@whitespace' },
                        [/[{}()\[\]]/, '@brackets'],
                        [/[<>](?!@symbols)/, '@brackets'],
                        [/@symbols/, 'delimiter'],
                        [/\d*\.\d*\.\d*/, 'number.semver'],
                        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
                        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
                        [/\d+/, 'number'],
                        [/[;,.]/, 'delimiter'],
                    ],
                    quoted_identifier: [
                        [/[^\\"]+/, 'identifier'],
                        [
                            /"/,
                            {
                                token: 'identifier.quote',
                                bracket: '@close',
                                next: '@pop',
                            },
                        ],
                    ],
                    space_identifier_until_period: [
                        [':', 'delimiter'],
                        [' ', { token: 'white', next: '@identifier_rest' }],
                    ],
                    identifier_until_period: [
                        { include: '@whitespace' },
                        [':', { token: 'delimiter', next: '@identifier_rest' }],
                        [/[^\\.]+/, 'identifier'],
                        [
                            /\./,
                            {
                                token: 'delimiter',
                                bracket: '@close',
                                next: '@pop',
                            },
                        ],
                    ],
                    identifier_rest: [
                        [/[^\\.]+/, 'identifier'],
                        [
                            /\./,
                            {
                                token: 'delimiter',
                                bracket: '@close',
                                next: '@pop',
                            },
                        ],
                    ],
                    semver: [
                        { include: '@whitespace' },
                        [':', 'delimiter'],
                        [
                            /\d*\.\d*\.\d*/,
                            {
                                token: 'number.semver',
                                bracket: '@close',
                                next: '@pop',
                            },
                        ],
                    ],
                    whitespace: [[/[ \t\r\n]+/, 'white']],
                },
            };
        return m(f);
    })();
    return moduleExports;
});
