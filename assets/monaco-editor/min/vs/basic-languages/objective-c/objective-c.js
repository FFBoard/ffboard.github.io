/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/objective-c/objective-c', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var s = Object.defineProperty;
        var r = Object.getOwnPropertyDescriptor;
        var c = Object.getOwnPropertyNames;
        var a = Object.prototype.hasOwnProperty;
        var l = (o) => s(o, '__esModule', { value: !0 });
        var p = (o, e) => {
                for (var n in e) s(o, n, { get: e[n], enumerable: !0 });
            },
            d = (o, e, n, i) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let t of c(e))
                        !a.call(o, t) &&
                            (n || t !== 'default') &&
                            s(o, t, {
                                get: () => e[t],
                                enumerable: !(i = r(e, t)) || i.enumerable,
                            });
                return o;
            };
        var g = (
            (o) => (e, n) =>
                (o && o.get(e)) || ((n = d(l({}), e, 1)), o && o.set(e, n), n)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        p(f, { conf: () => m, language: () => u });
        var m = {
                comments: { lineComment: '//', blockComment: ['/*', '*/'] },
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
            u = {
                defaultToken: '',
                tokenPostfix: '.objective-c',
                keywords: [
                    '#import',
                    '#include',
                    '#define',
                    '#else',
                    '#endif',
                    '#if',
                    '#ifdef',
                    '#ifndef',
                    '#ident',
                    '#undef',
                    '@class',
                    '@defs',
                    '@dynamic',
                    '@encode',
                    '@end',
                    '@implementation',
                    '@interface',
                    '@package',
                    '@private',
                    '@protected',
                    '@property',
                    '@protocol',
                    '@public',
                    '@selector',
                    '@synthesize',
                    '__declspec',
                    'assign',
                    'auto',
                    'BOOL',
                    'break',
                    'bycopy',
                    'byref',
                    'case',
                    'char',
                    'Class',
                    'const',
                    'copy',
                    'continue',
                    'default',
                    'do',
                    'double',
                    'else',
                    'enum',
                    'extern',
                    'FALSE',
                    'false',
                    'float',
                    'for',
                    'goto',
                    'if',
                    'in',
                    'int',
                    'id',
                    'inout',
                    'IMP',
                    'long',
                    'nil',
                    'nonatomic',
                    'NULL',
                    'oneway',
                    'out',
                    'private',
                    'public',
                    'protected',
                    'readwrite',
                    'readonly',
                    'register',
                    'return',
                    'SEL',
                    'self',
                    'short',
                    'signed',
                    'sizeof',
                    'static',
                    'struct',
                    'super',
                    'switch',
                    'typedef',
                    'TRUE',
                    'true',
                    'union',
                    'unsigned',
                    'volatile',
                    'void',
                    'while',
                ],
                decpart: /\d(_?\d)*/,
                decimal: /0|@decpart/,
                tokenizer: {
                    root: [
                        { include: '@comments' },
                        { include: '@whitespace' },
                        { include: '@numbers' },
                        { include: '@strings' },
                        [/[,:;]/, 'delimiter'],
                        [/[{}\[\]()<>]/, '@brackets'],
                        [
                            /[a-zA-Z@#]\w*/,
                            {
                                cases: {
                                    '@keywords': 'keyword',
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        [
                            /[<>=\\+\\-\\*\\/\\^\\|\\~,]|and\\b|or\\b|not\\b]/,
                            'operator',
                        ],
                    ],
                    whitespace: [[/\s+/, 'white']],
                    comments: [
                        ['\\/\\*', 'comment', '@comment'],
                        ['\\/\\/+.*', 'comment'],
                    ],
                    comment: [
                        ['\\*\\/', 'comment', '@pop'],
                        ['.', 'comment'],
                    ],
                    numbers: [
                        [/0[xX][0-9a-fA-F]*(_?[0-9a-fA-F])*/, 'number.hex'],
                        [
                            /@decimal((\.@decpart)?([eE][\-+]?@decpart)?)[fF]*/,
                            {
                                cases: {
                                    '(\\d)*': 'number',
                                    $0: 'number.float',
                                },
                            },
                        ],
                    ],
                    strings: [
                        [/'$/, 'string.escape', '@popall'],
                        [/'/, 'string.escape', '@stringBody'],
                        [/"$/, 'string.escape', '@popall'],
                        [/"/, 'string.escape', '@dblStringBody'],
                    ],
                    stringBody: [
                        [/[^\\']+$/, 'string', '@popall'],
                        [/[^\\']+/, 'string'],
                        [/\\./, 'string'],
                        [/'/, 'string.escape', '@popall'],
                        [/\\$/, 'string'],
                    ],
                    dblStringBody: [
                        [/[^\\"]+$/, 'string', '@popall'],
                        [/[^\\"]+/, 'string'],
                        [/\\./, 'string'],
                        [/"/, 'string.escape', '@popall'],
                        [/\\$/, 'string'],
                    ],
                },
            };
        return g(f);
    })();
    return moduleExports;
});
