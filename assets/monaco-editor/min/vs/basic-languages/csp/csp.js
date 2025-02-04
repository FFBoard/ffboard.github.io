/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/basic-languages/csp/csp', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var o = Object.defineProperty;
        var i = Object.getOwnPropertyDescriptor;
        var u = Object.getOwnPropertyNames;
        var g = Object.prototype.hasOwnProperty;
        var a = (r) => o(r, '__esModule', { value: !0 });
        var c = (r, t) => {
                for (var e in t) o(r, e, { get: t[e], enumerable: !0 });
            },
            q = (r, t, e, n) => {
                if ((t && typeof t == 'object') || typeof t == 'function')
                    for (let s of u(t))
                        !g.call(r, s) &&
                            (e || s !== 'default') &&
                            o(r, s, {
                                get: () => t[s],
                                enumerable: !(n = i(t, s)) || n.enumerable,
                            });
                return r;
            };
        var f = (
            (r) => (t, e) =>
                (r && r.get(t)) || ((e = q(a({}), t, 1)), r && r.set(t, e), e)
        )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var d = {};
        c(d, { conf: () => l, language: () => p });
        var l = { brackets: [], autoClosingPairs: [], surroundingPairs: [] },
            p = {
                keywords: [],
                typeKeywords: [],
                tokenPostfix: '.csp',
                operators: [],
                symbols: /[=><!~?:&|+\-*\/\^%]+/,
                escapes:
                    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
                tokenizer: {
                    root: [
                        [/child-src/, 'string.quote'],
                        [/connect-src/, 'string.quote'],
                        [/default-src/, 'string.quote'],
                        [/font-src/, 'string.quote'],
                        [/frame-src/, 'string.quote'],
                        [/img-src/, 'string.quote'],
                        [/manifest-src/, 'string.quote'],
                        [/media-src/, 'string.quote'],
                        [/object-src/, 'string.quote'],
                        [/script-src/, 'string.quote'],
                        [/style-src/, 'string.quote'],
                        [/worker-src/, 'string.quote'],
                        [/base-uri/, 'string.quote'],
                        [/plugin-types/, 'string.quote'],
                        [/sandbox/, 'string.quote'],
                        [/disown-opener/, 'string.quote'],
                        [/form-action/, 'string.quote'],
                        [/frame-ancestors/, 'string.quote'],
                        [/report-uri/, 'string.quote'],
                        [/report-to/, 'string.quote'],
                        [/upgrade-insecure-requests/, 'string.quote'],
                        [/block-all-mixed-content/, 'string.quote'],
                        [/require-sri-for/, 'string.quote'],
                        [/reflected-xss/, 'string.quote'],
                        [/referrer/, 'string.quote'],
                        [/policy-uri/, 'string.quote'],
                        [/'self'/, 'string.quote'],
                        [/'unsafe-inline'/, 'string.quote'],
                        [/'unsafe-eval'/, 'string.quote'],
                        [/'strict-dynamic'/, 'string.quote'],
                        [/'unsafe-hashed-attributes'/, 'string.quote'],
                    ],
                },
            };
        return f(d);
    })();
    return moduleExports;
});
