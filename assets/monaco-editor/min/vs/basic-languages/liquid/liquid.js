/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/liquid/liquid', ['require', 'require'], (
    require
) => {
    var moduleExports = (() => {
        var p = Object.create;
        var r = Object.defineProperty;
        var g = Object.getOwnPropertyDescriptor;
        var w = Object.getOwnPropertyNames;
        var h = Object.getPrototypeOf,
            q = Object.prototype.hasOwnProperty;
        var d = (e) => r(e, '__esModule', { value: !0 });
        var f = ((e) =>
            typeof require != 'undefined'
                ? require
                : typeof Proxy != 'undefined'
                ? new Proxy(e, {
                      get: (t, i) =>
                          (typeof require != 'undefined' ? require : t)[i],
                  })
                : e)(function (e) {
            if (typeof require != 'undefined')
                return require.apply(this, arguments);
            throw new Error('Dynamic require of "' + e + '" is not supported');
        });
        var b = (e, t) => () => (
                t || e((t = { exports: {} }).exports, t), t.exports
            ),
            T = (e, t) => {
                for (var i in t) r(e, i, { get: t[i], enumerable: !0 });
            },
            a = (e, t, i, l) => {
                if ((t && typeof t == 'object') || typeof t == 'function')
                    for (let o of w(t))
                        !q.call(e, o) &&
                            (i || o !== 'default') &&
                            r(e, o, {
                                get: () => t[o],
                                enumerable: !(l = g(t, o)) || l.enumerable,
                            });
                return e;
            },
            s = (e, t) =>
                a(
                    d(
                        r(
                            e != null ? p(h(e)) : {},
                            'default',
                            !t && e && e.__esModule
                                ? { get: () => e.default, enumerable: !0 }
                                : { value: e, enumerable: !0 }
                        )
                    ),
                    e
                ),
            k = (
                (e) => (t, i) =>
                    (e && e.get(t)) ||
                    ((i = a(d({}), t, 1)), e && e.set(t, i), i)
            )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var c = b((y, u) => {
            var _ = s(f('vs/editor/editor.api'));
            u.exports = _;
        });
        var $ = {};
        T($, { conf: () => x, language: () => S });
        var n = {};
        a(n, s(c()));
        var m = [
                'area',
                'base',
                'br',
                'col',
                'embed',
                'hr',
                'img',
                'input',
                'keygen',
                'link',
                'menuitem',
                'meta',
                'param',
                'source',
                'track',
                'wbr',
            ],
            x = {
                wordPattern:
                    /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g,
                brackets: [
                    ['<!--', '-->'],
                    ['<', '>'],
                    ['{{', '}}'],
                    ['{%', '%}'],
                    ['{', '}'],
                    ['(', ')'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '%', close: '%' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                ],
                surroundingPairs: [
                    { open: '<', close: '>' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" },
                ],
                onEnterRules: [
                    {
                        beforeText: new RegExp(
                            `<(?!(?:${m.join(
                                '|'
                            )}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
                            'i'
                        ),
                        afterText: /^<\/(\w[\w\d]*)\s*>$/i,
                        action: {
                            indentAction:
                                n.languages.IndentAction.IndentOutdent,
                        },
                    },
                    {
                        beforeText: new RegExp(
                            `<(?!(?:${m.join(
                                '|'
                            )}))(\\w[\\w\\d]*)([^/>]*(?!/)>)[^<]*$`,
                            'i'
                        ),
                        action: {
                            indentAction: n.languages.IndentAction.Indent,
                        },
                    },
                ],
            },
            S = {
                defaultToken: '',
                tokenPostfix: '',
                builtinTags: [
                    'if',
                    'else',
                    'elseif',
                    'endif',
                    'render',
                    'assign',
                    'capture',
                    'endcapture',
                    'case',
                    'endcase',
                    'comment',
                    'endcomment',
                    'cycle',
                    'decrement',
                    'for',
                    'endfor',
                    'include',
                    'increment',
                    'layout',
                    'raw',
                    'endraw',
                    'render',
                    'tablerow',
                    'endtablerow',
                    'unless',
                    'endunless',
                ],
                builtinFilters: [
                    'abs',
                    'append',
                    'at_least',
                    'at_most',
                    'capitalize',
                    'ceil',
                    'compact',
                    'date',
                    'default',
                    'divided_by',
                    'downcase',
                    'escape',
                    'escape_once',
                    'first',
                    'floor',
                    'join',
                    'json',
                    'last',
                    'lstrip',
                    'map',
                    'minus',
                    'modulo',
                    'newline_to_br',
                    'plus',
                    'prepend',
                    'remove',
                    'remove_first',
                    'replace',
                    'replace_first',
                    'reverse',
                    'round',
                    'rstrip',
                    'size',
                    'slice',
                    'sort',
                    'sort_natural',
                    'split',
                    'strip',
                    'strip_html',
                    'strip_newlines',
                    'times',
                    'truncate',
                    'truncatewords',
                    'uniq',
                    'upcase',
                    'url_decode',
                    'url_encode',
                    'where',
                ],
                constants: ['true', 'false'],
                operators: ['==', '!=', '>', '<', '>=', '<='],
                symbol: /[=><!]+/,
                identifier: /[a-zA-Z_][\w]*/,
                tokenizer: {
                    root: [
                        [
                            /\{\%\s*comment\s*\%\}/,
                            'comment.start.liquid',
                            '@comment',
                        ],
                        [
                            /\{\{/,
                            {
                                token: '@rematch',
                                switchTo: '@liquidState.root',
                            },
                        ],
                        [
                            /\{\%/,
                            {
                                token: '@rematch',
                                switchTo: '@liquidState.root',
                            },
                        ],
                        [
                            /(<)([\w\-]+)(\/>)/,
                            ['delimiter.html', 'tag.html', 'delimiter.html'],
                        ],
                        [
                            /(<)([:\w]+)/,
                            [
                                'delimiter.html',
                                { token: 'tag.html', next: '@otherTag' },
                            ],
                        ],
                        [
                            /(<\/)([\w\-]+)/,
                            [
                                'delimiter.html',
                                { token: 'tag.html', next: '@otherTag' },
                            ],
                        ],
                        [/</, 'delimiter.html'],
                        [/\{/, 'delimiter.html'],
                        [/[^<{]+/],
                    ],
                    comment: [
                        [
                            /\{\%\s*endcomment\s*\%\}/,
                            'comment.end.liquid',
                            '@pop',
                        ],
                        [/./, 'comment.content.liquid'],
                    ],
                    otherTag: [
                        [
                            /\{\{/,
                            {
                                token: '@rematch',
                                switchTo: '@liquidState.otherTag',
                            },
                        ],
                        [
                            /\{\%/,
                            {
                                token: '@rematch',
                                switchTo: '@liquidState.otherTag',
                            },
                        ],
                        [/\/?>/, 'delimiter.html', '@pop'],
                        [/"([^"]*)"/, 'attribute.value'],
                        [/'([^']*)'/, 'attribute.value'],
                        [/[\w\-]+/, 'attribute.name'],
                        [/=/, 'delimiter'],
                        [/[ \t\r\n]+/],
                    ],
                    liquidState: [
                        [/\{\{/, 'delimiter.output.liquid'],
                        [
                            /\}\}/,
                            {
                                token: 'delimiter.output.liquid',
                                switchTo: '@$S2.$S3',
                            },
                        ],
                        [/\{\%/, 'delimiter.tag.liquid'],
                        [/raw\s*\%\}/, 'delimiter.tag.liquid', '@liquidRaw'],
                        [
                            /\%\}/,
                            {
                                token: 'delimiter.tag.liquid',
                                switchTo: '@$S2.$S3',
                            },
                        ],
                        { include: 'liquidRoot' },
                    ],
                    liquidRaw: [
                        [/^(?!\{\%\s*endraw\s*\%\}).+/],
                        [/\{\%/, 'delimiter.tag.liquid'],
                        [/@identifier/],
                        [
                            /\%\}/,
                            { token: 'delimiter.tag.liquid', next: '@root' },
                        ],
                    ],
                    liquidRoot: [
                        [/\d+(\.\d+)?/, 'number.liquid'],
                        [/"[^"]*"/, 'string.liquid'],
                        [/'[^']*'/, 'string.liquid'],
                        [/\s+/],
                        [
                            /@symbol/,
                            {
                                cases: {
                                    '@operators': 'operator.liquid',
                                    '@default': '',
                                },
                            },
                        ],
                        [/\./],
                        [
                            /@identifier/,
                            {
                                cases: {
                                    '@constants': 'keyword.liquid',
                                    '@builtinFilters': 'predefined.liquid',
                                    '@builtinTags': 'predefined.liquid',
                                    '@default': 'variable.liquid',
                                },
                            },
                        ],
                        [/[^}|%]/, 'variable.liquid'],
                    ],
                },
            };
        return k($);
    })();
    return moduleExports;
});
