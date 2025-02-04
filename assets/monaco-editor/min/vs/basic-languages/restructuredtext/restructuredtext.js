/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/restructuredtext/restructuredtext', [
    'require',
    'require',
], (require) => {
    var moduleExports = (() => {
        var t = Object.defineProperty;
        var a = Object.getOwnPropertyDescriptor;
        var l = Object.getOwnPropertyNames;
        var r = Object.prototype.hasOwnProperty;
        var k = (n) => t(n, '__esModule', { value: !0 });
        var c = (n, e) => {
                for (var s in e) t(n, s, { get: e[s], enumerable: !0 });
            },
            p = (n, e, s, o) => {
                if ((e && typeof e == 'object') || typeof e == 'function')
                    for (let i of l(e))
                        !r.call(n, i) &&
                            (s || i !== 'default') &&
                            t(n, i, {
                                get: () => e[i],
                                enumerable: !(o = a(e, i)) || o.enumerable,
                            });
                return n;
            };
        var u = (
            (n) => (e, s) =>
                (n && n.get(e)) || ((s = p(k({}), e, 1)), n && n.set(e, s), s)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var f = {};
        c(f, { conf: () => m, language: () => g });
        var m = {
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')'],
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '<', close: '>', notIn: ['string'] },
                ],
                surroundingPairs: [
                    { open: '(', close: ')' },
                    { open: '[', close: ']' },
                    { open: '`', close: '`' },
                ],
                folding: {
                    markers: {
                        start: new RegExp('^\\s*<!--\\s*#?region\\b.*-->'),
                        end: new RegExp('^\\s*<!--\\s*#?endregion\\b.*-->'),
                    },
                },
            },
            g = {
                defaultToken: '',
                tokenPostfix: '.rst',
                control: /[\\`*_\[\]{}()#+\-\.!]/,
                escapes: /\\(?:@control)/,
                empty: [
                    'area',
                    'base',
                    'basefont',
                    'br',
                    'col',
                    'frame',
                    'hr',
                    'img',
                    'input',
                    'isindex',
                    'link',
                    'meta',
                    'param',
                ],
                alphanumerics: /[A-Za-z0-9]/,
                simpleRefNameWithoutBq:
                    /(?:@alphanumerics[-_+:.]*@alphanumerics)+|(?:@alphanumerics+)/,
                simpleRefName: /(?:`@phrase`|@simpleRefNameWithoutBq)/,
                phrase: /@simpleRefNameWithoutBq(?:\s@simpleRefNameWithoutBq)*/,
                citationName: /[A-Za-z][A-Za-z0-9-_.]*/,
                blockLiteralStart:
                    /(?:[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]|[\s])/,
                precedingChars: /(?:[ -:/'"<([{])/,
                followingChars: /(?:[ -.,:;!?/'")\]}>]|$)/,
                punctuation: /(=|-|~|`|#|"|\^|\+|\*|:|\.|'|_|\+)/,
                tokenizer: {
                    root: [
                        [/^(@punctuation{3,}$){1,1}?/, 'keyword'],
                        [
                            /^\s*([\*\-+‣•]|[a-zA-Z0-9]+\.|\([a-zA-Z0-9]+\)|[a-zA-Z0-9]+\))\s/,
                            'keyword',
                        ],
                        [/([ ]::)\s*$/, 'keyword', '@blankLineOfLiteralBlocks'],
                        [/(::)\s*$/, 'keyword', '@blankLineOfLiteralBlocks'],
                        { include: '@tables' },
                        { include: '@explicitMarkupBlocks' },
                        { include: '@inlineMarkup' },
                    ],
                    explicitMarkupBlocks: [
                        { include: '@citations' },
                        { include: '@footnotes' },
                        [
                            /^(\.\.\s)(@simpleRefName)(::\s)(.*)$/,
                            [
                                { token: '', next: 'subsequentLines' },
                                'keyword',
                                '',
                                '',
                            ],
                        ],
                        [
                            /^(\.\.)(\s+)(_)(@simpleRefName)(:)(\s+)(.*)/,
                            [
                                { token: '', next: 'hyperlinks' },
                                '',
                                '',
                                'string.link',
                                '',
                                '',
                                'string.link',
                            ],
                        ],
                        [
                            /^((?:(?:\.\.)(?:\s+))?)(__)(:)(\s+)(.*)/,
                            [
                                { token: '', next: 'subsequentLines' },
                                '',
                                '',
                                '',
                                'string.link',
                            ],
                        ],
                        [/^(__\s+)(.+)/, ['', 'string.link']],
                        [
                            /^(\.\.)( \|)([^| ]+[^|]*[^| ]*)(\| )(@simpleRefName)(:: .*)/,
                            [
                                { token: '', next: 'subsequentLines' },
                                '',
                                'string.link',
                                '',
                                'keyword',
                                '',
                            ],
                            '@rawBlocks',
                        ],
                        [
                            /(\|)([^| ]+[^|]*[^| ]*)(\|_{0,2})/,
                            ['', 'string.link', ''],
                        ],
                        [
                            /^(\.\.)([ ].*)$/,
                            [{ token: '', next: '@comments' }, 'comment'],
                        ],
                    ],
                    inlineMarkup: [
                        { include: '@citationsReference' },
                        { include: '@footnotesReference' },
                        [/(@simpleRefName)(_{1,2})/, ['string.link', '']],
                        [
                            /(`)([^<`]+\s+)(<)(.*)(>)(`)(_)/,
                            ['', 'string.link', '', 'string.link', '', '', ''],
                        ],
                        [/\*\*([^\\*]|\*(?!\*))+\*\*/, 'strong'],
                        [/\*[^*]+\*/, 'emphasis'],
                        [/(``)((?:[^`]|\`(?!`))+)(``)/, ['', 'keyword', '']],
                        [/(__\s+)(.+)/, ['', 'keyword']],
                        [
                            /(:)((?:@simpleRefNameWithoutBq)?)(:`)([^`]+)(`)/,
                            ['', 'keyword', '', '', ''],
                        ],
                        [
                            /(`)([^`]+)(`:)((?:@simpleRefNameWithoutBq)?)(:)/,
                            ['', '', '', 'keyword', ''],
                        ],
                        [/(`)([^`]+)(`)/, ''],
                        [/(_`)(@phrase)(`)/, ['', 'string.link', '']],
                    ],
                    citations: [
                        [
                            /^(\.\.\s+\[)((?:@citationName))(\]\s+)(.*)/,
                            [
                                { token: '', next: '@subsequentLines' },
                                'string.link',
                                '',
                                '',
                            ],
                        ],
                    ],
                    citationsReference: [
                        [/(\[)(@citationName)(\]_)/, ['', 'string.link', '']],
                    ],
                    footnotes: [
                        [
                            /^(\.\.\s+\[)((?:[0-9]+))(\]\s+.*)/,
                            [
                                { token: '', next: '@subsequentLines' },
                                'string.link',
                                '',
                            ],
                        ],
                        [
                            /^(\.\.\s+\[)((?:#@simpleRefName?))(\]\s+)(.*)/,
                            [
                                { token: '', next: '@subsequentLines' },
                                'string.link',
                                '',
                                '',
                            ],
                        ],
                        [
                            /^(\.\.\s+\[)((?:\*))(\]\s+)(.*)/,
                            [
                                { token: '', next: '@subsequentLines' },
                                'string.link',
                                '',
                                '',
                            ],
                        ],
                    ],
                    footnotesReference: [
                        [/(\[)([0-9]+)(\])(_)/, ['', 'string.link', '', '']],
                        [
                            /(\[)(#@simpleRefName?)(\])(_)/,
                            ['', 'string.link', '', ''],
                        ],
                        [/(\[)(\*)(\])(_)/, ['', 'string.link', '', '']],
                    ],
                    blankLineOfLiteralBlocks: [
                        [/^$/, '', '@subsequentLinesOfLiteralBlocks'],
                        [/^.*$/, '', '@pop'],
                    ],
                    subsequentLinesOfLiteralBlocks: [
                        [/(@blockLiteralStart+)(.*)/, ['keyword', '']],
                        [/^(?!blockLiteralStart)/, '', '@popall'],
                    ],
                    subsequentLines: [
                        [/^[\s]+.*/, ''],
                        [/^(?!\s)/, '', '@pop'],
                    ],
                    hyperlinks: [
                        [/^[\s]+.*/, 'string.link'],
                        [/^(?!\s)/, '', '@pop'],
                    ],
                    comments: [
                        [/^[\s]+.*/, 'comment'],
                        [/^(?!\s)/, '', '@pop'],
                    ],
                    tables: [
                        [/\+-[+-]+/, 'keyword'],
                        [/\+=[+=]+/, 'keyword'],
                    ],
                },
            };
        return u(f);
    })();
    return moduleExports;
});
