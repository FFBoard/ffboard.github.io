/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/sparql/sparql', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var o = Object.defineProperty;
        var i = Object.getOwnPropertyDescriptor;
        var a = Object.getOwnPropertyNames;
        var l = Object.prototype.hasOwnProperty;
        var d = (s) => o(s, '__esModule', { value: !0 });
        var c = (s, e) => {
                for (var t in e) o(s, t, { get: e[t], enumerable: !0 });
            },
            g = (s, e, t, r) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let n of a(e))
                        !l.call(s, n) &&
                            (t || n !== 'default') &&
                            o(s, n, {
                                get: () => e[n],
                                enumerable: !(r = i(e, n)) || r.enumerable,
                            });
                return s;
            };
        var u = (
            (s) => (e, t) =>
                (s && s.get(e)) || ((t = g(d({}), e, 1)), s && s.set(e, t), t)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        c(f, { conf: () => p, language: () => m });
        var p = {
                comments: { lineComment: '#' },
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                ],
                autoClosingPairs: [
                    { open: "'", close: "'", notIn: ['string'] },
                    { open: '"', close: '"', notIn: ['string'] },
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                ],
            },
            m = {
                defaultToken: '',
                tokenPostfix: '.rq',
                brackets: [
                    { token: 'delimiter.curly', open: '{', close: '}' },
                    { token: 'delimiter.parenthesis', open: '(', close: ')' },
                    { token: 'delimiter.square', open: '[', close: ']' },
                    { token: 'delimiter.angle', open: '<', close: '>' },
                ],
                keywords: [
                    'add',
                    'as',
                    'asc',
                    'ask',
                    'base',
                    'by',
                    'clear',
                    'construct',
                    'copy',
                    'create',
                    'data',
                    'delete',
                    'desc',
                    'describe',
                    'distinct',
                    'drop',
                    'false',
                    'filter',
                    'from',
                    'graph',
                    'group',
                    'having',
                    'in',
                    'insert',
                    'limit',
                    'load',
                    'minus',
                    'move',
                    'named',
                    'not',
                    'offset',
                    'optional',
                    'order',
                    'prefix',
                    'reduced',
                    'select',
                    'service',
                    'silent',
                    'to',
                    'true',
                    'undef',
                    'union',
                    'using',
                    'values',
                    'where',
                    'with',
                ],
                builtinFunctions: [
                    'a',
                    'abs',
                    'avg',
                    'bind',
                    'bnode',
                    'bound',
                    'ceil',
                    'coalesce',
                    'concat',
                    'contains',
                    'count',
                    'datatype',
                    'day',
                    'encode_for_uri',
                    'exists',
                    'floor',
                    'group_concat',
                    'hours',
                    'if',
                    'iri',
                    'isblank',
                    'isiri',
                    'isliteral',
                    'isnumeric',
                    'isuri',
                    'lang',
                    'langmatches',
                    'lcase',
                    'max',
                    'md5',
                    'min',
                    'minutes',
                    'month',
                    'now',
                    'rand',
                    'regex',
                    'replace',
                    'round',
                    'sameterm',
                    'sample',
                    'seconds',
                    'sha1',
                    'sha256',
                    'sha384',
                    'sha512',
                    'str',
                    'strafter',
                    'strbefore',
                    'strdt',
                    'strends',
                    'strlang',
                    'strlen',
                    'strstarts',
                    'struuid',
                    'substr',
                    'sum',
                    'timezone',
                    'tz',
                    'ucase',
                    'uri',
                    'uuid',
                    'year',
                ],
                ignoreCase: !0,
                tokenizer: {
                    root: [
                        [/<[^\s\u00a0>]*>?/, 'tag'],
                        { include: '@strings' },
                        [/#.*/, 'comment'],
                        [/[{}()\[\]]/, '@brackets'],
                        [/[;,.]/, 'delimiter'],
                        [
                            /[_\w\d]+:(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])*/,
                            'tag',
                        ],
                        [
                            /:(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/,
                            'tag',
                        ],
                        [
                            /[$?]?[_\w\d]+/,
                            {
                                cases: {
                                    '@keywords': { token: 'keyword' },
                                    '@builtinFunctions': {
                                        token: 'predefined.sql',
                                    },
                                    '@default': 'identifier',
                                },
                            },
                        ],
                        [/\^\^/, 'operator.sql'],
                        [/\^[*+\-<>=&|^\/!?]*/, 'operator.sql'],
                        [/[*+\-<>=&|\/!?]/, 'operator.sql'],
                        [/@[a-z\d\-]*/, 'metatag.html'],
                        [/\s+/, 'white'],
                    ],
                    strings: [
                        [/'([^'\\]|\\.)*$/, 'string.invalid'],
                        [/'$/, 'string.sql', '@pop'],
                        [/'/, 'string.sql', '@stringBody'],
                        [/"([^"\\]|\\.)*$/, 'string.invalid'],
                        [/"$/, 'string.sql', '@pop'],
                        [/"/, 'string.sql', '@dblStringBody'],
                    ],
                    stringBody: [
                        [/[^\\']+/, 'string.sql'],
                        [/\\./, 'string.escape'],
                        [/'/, 'string.sql', '@pop'],
                    ],
                    dblStringBody: [
                        [/[^\\"]+/, 'string.sql'],
                        [/\\./, 'string.escape'],
                        [/"/, 'string.sql', '@pop'],
                    ],
                },
            };
        return u(f);
    })();
    return moduleExports;
});
