/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/ini/ini', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var t = Object.defineProperty;
        var i = Object.getOwnPropertyDescriptor;
        var r = Object.getOwnPropertyNames;
        var g = Object.prototype.hasOwnProperty;
        var c = (n) => t(n, '__esModule', { value: !0 });
        var l = (n, e) => {
                for (var o in e) t(n, o, { get: e[o], enumerable: !0 });
            },
            p = (n, e, o, a) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let s of r(e))
                        !g.call(n, s) &&
                            (o || s !== 'default') &&
                            t(n, s, {
                                get: () => e[s],
                                enumerable: !(a = i(e, s)) || a.enumerable,
                            });
                return n;
            };
        var u = (
            (n) => (e, o) =>
                (n && n.get(e)) || ((o = p(c({}), e, 1)), n && n.set(e, o), o)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var d = {};
        l(d, { conf: () => m, language: () => f });
        var m = {
                comments: { lineComment: '#' },
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
            f = {
                defaultToken: '',
                tokenPostfix: '.ini',
                escapes:
                    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
                tokenizer: {
                    root: [
                        [/^\[[^\]]*\]/, 'metatag'],
                        [/(^\w+)(\s*)(\=)/, ['key', '', 'delimiter']],
                        { include: '@whitespace' },
                        [/\d+/, 'number'],
                        [/"([^"\\]|\\.)*$/, 'string.invalid'],
                        [/'([^'\\]|\\.)*$/, 'string.invalid'],
                        [/"/, 'string', '@string."'],
                        [/'/, 'string', "@string.'"],
                    ],
                    whitespace: [
                        [/[ \t\r\n]+/, ''],
                        [/^\s*[#;].*$/, 'comment'],
                    ],
                    string: [
                        [/[^\\"']+/, 'string'],
                        [/@escapes/, 'string.escape'],
                        [/\\./, 'string.escape.invalid'],
                        [
                            /["']/,
                            {
                                cases: {
                                    '$#==$S2': {
                                        token: 'string',
                                        next: '@pop',
                                    },
                                    '@default': 'string',
                                },
                            },
                        ],
                    ],
                },
            };
        return u(d);
    })();
    return moduleExports;
});
