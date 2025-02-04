/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(c722ca6c7eed3d7987c0d5c3df5c45f6b15e77d1)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ (function () {
    var Q = [
            'require',
            'exports',
            'vs/base/common/strings',
            'vs/editor/common/core/position',
            'vs/editor/common/core/range',
            'vs/base/common/platform',
            'vs/base/common/event',
            'vs/base/common/types',
            'vs/base/common/lifecycle',
            'vs/base/common/uri',
            'vs/base/common/errors',
            'vs/base/common/stopwatch',
            'vs/base/common/diff/diff',
            'vs/base/common/uint',
            'vs/editor/common/core/characterClassifier',
            'vs/editor/common/core/wordHelper',
            'vs/base/common/arrays',
            'vs/base/common/cache',
            'vs/base/common/codicons',
            'vs/base/common/diff/diffChange',
            'vs/base/common/functional',
            'vs/base/common/iterator',
            'vs/base/common/keyCodes',
            'vs/base/common/lazy',
            'vs/base/common/linkedList',
            'vs/base/common/process',
            'vs/base/common/path',
            'vs/base/common/cancellation',
            'vs/base/common/hash',
            'vs/base/common/objects',
            'vs/editor/common/core/selection',
            'vs/editor/common/core/wordCharacterClassifier',
            'vs/editor/common/diff/diffComputer',
            'vs/editor/common/languages/linkComputer',
            'vs/editor/common/languages/supports/inplaceReplaceSupport',
            'vs/editor/common/model',
            'vs/editor/common/model/prefixSumComputer',
            'vs/editor/common/model/mirrorTextModel',
            'vs/editor/common/model/textModelSearch',
            'vs/editor/common/services/unicodeTextModelHighlighter',
            'vs/editor/common/standalone/standaloneEnums',
            'vs/editor/common/tokenizationRegistry',
            'vs/editor/common/languages',
            'vs/editor/common/services/editorBaseApi',
            'vs/base/common/worker/simpleWorker',
            'vs/editor/common/services/editorSimpleWorker',
        ],
        Z = function (U) {
            for (var r = [], E = 0, e = U.length; E < e; E++) r[E] = Q[U[E]];
            return r;
        },
        pe = this,
        Se = typeof global == 'object' ? global : {},
        re;
    (function (U) {
        U.global = pe;
        var r = (function () {
            function E() {
                (this._detected = !1),
                    (this._isWindows = !1),
                    (this._isNode = !1),
                    (this._isElectronRenderer = !1),
                    (this._isWebWorker = !1),
                    (this._isElectronNodeIntegrationWebWorker = !1);
            }
            return (
                Object.defineProperty(E.prototype, 'isWindows', {
                    get: function () {
                        return this._detect(), this._isWindows;
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(E.prototype, 'isNode', {
                    get: function () {
                        return this._detect(), this._isNode;
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(E.prototype, 'isElectronRenderer', {
                    get: function () {
                        return this._detect(), this._isElectronRenderer;
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(E.prototype, 'isWebWorker', {
                    get: function () {
                        return this._detect(), this._isWebWorker;
                    },
                    enumerable: !1,
                    configurable: !0,
                }),
                Object.defineProperty(
                    E.prototype,
                    'isElectronNodeIntegrationWebWorker',
                    {
                        get: function () {
                            return (
                                this._detect(),
                                this._isElectronNodeIntegrationWebWorker
                            );
                        },
                        enumerable: !1,
                        configurable: !0,
                    }
                ),
                (E.prototype._detect = function () {
                    this._detected ||
                        ((this._detected = !0),
                        (this._isWindows = E._isWindows()),
                        (this._isNode =
                            typeof module != 'undefined' && !!module.exports),
                        (this._isElectronRenderer =
                            typeof process != 'undefined' &&
                            typeof process.versions != 'undefined' &&
                            typeof process.versions.electron != 'undefined' &&
                            process.type === 'renderer'),
                        (this._isWebWorker =
                            typeof U.global.importScripts == 'function'),
                        (this._isElectronNodeIntegrationWebWorker =
                            this._isWebWorker &&
                            typeof process != 'undefined' &&
                            typeof process.versions != 'undefined' &&
                            typeof process.versions.electron != 'undefined' &&
                            process.type === 'worker'));
                }),
                (E._isWindows = function () {
                    return typeof navigator != 'undefined' &&
                        navigator.userAgent &&
                        navigator.userAgent.indexOf('Windows') >= 0
                        ? !0
                        : typeof process != 'undefined'
                        ? process.platform === 'win32'
                        : !1;
                }),
                E
            );
        })();
        U.Environment = r;
    })(re || (re = {}));
    var re;
    (function (U) {
        var r = (function () {
            function N(o, w, g) {
                (this.type = o), (this.detail = w), (this.timestamp = g);
            }
            return N;
        })();
        U.LoaderEvent = r;
        var E = (function () {
            function N(o) {
                this._events = [new r(1, '', o)];
            }
            return (
                (N.prototype.record = function (o, w) {
                    this._events.push(
                        new r(o, w, U.Utilities.getHighPerformanceTimestamp())
                    );
                }),
                (N.prototype.getEvents = function () {
                    return this._events;
                }),
                N
            );
        })();
        U.LoaderEventRecorder = E;
        var e = (function () {
            function N() {}
            return (
                (N.prototype.record = function (o, w) {}),
                (N.prototype.getEvents = function () {
                    return [];
                }),
                (N.INSTANCE = new N()),
                N
            );
        })();
        U.NullLoaderEventRecorder = e;
    })(re || (re = {}));
    var re;
    (function (U) {
        var r = (function () {
            function E() {}
            return (
                (E.fileUriToFilePath = function (e, N) {
                    if (((N = decodeURI(N).replace(/%23/g, '#')), e)) {
                        if (/^file:\/\/\//.test(N)) return N.substr(8);
                        if (/^file:\/\//.test(N)) return N.substr(5);
                    } else if (/^file:\/\//.test(N)) return N.substr(7);
                    return N;
                }),
                (E.startsWith = function (e, N) {
                    return e.length >= N.length && e.substr(0, N.length) === N;
                }),
                (E.endsWith = function (e, N) {
                    return (
                        e.length >= N.length &&
                        e.substr(e.length - N.length) === N
                    );
                }),
                (E.containsQueryString = function (e) {
                    return /^[^\#]*\?/gi.test(e);
                }),
                (E.isAbsolutePath = function (e) {
                    return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(
                        e
                    );
                }),
                (E.forEachProperty = function (e, N) {
                    if (e) {
                        var o = void 0;
                        for (o in e) e.hasOwnProperty(o) && N(o, e[o]);
                    }
                }),
                (E.isEmpty = function (e) {
                    var N = !0;
                    return (
                        E.forEachProperty(e, function () {
                            N = !1;
                        }),
                        N
                    );
                }),
                (E.recursiveClone = function (e) {
                    if (
                        !e ||
                        typeof e != 'object' ||
                        e instanceof RegExp ||
                        (!Array.isArray(e) &&
                            Object.getPrototypeOf(e) !== Object.prototype)
                    )
                        return e;
                    var N = Array.isArray(e) ? [] : {};
                    return (
                        E.forEachProperty(e, function (o, w) {
                            w && typeof w == 'object'
                                ? (N[o] = E.recursiveClone(w))
                                : (N[o] = w);
                        }),
                        N
                    );
                }),
                (E.generateAnonymousModule = function () {
                    return '===anonymous' + E.NEXT_ANONYMOUS_ID++ + '===';
                }),
                (E.isAnonymousModule = function (e) {
                    return E.startsWith(e, '===anonymous');
                }),
                (E.getHighPerformanceTimestamp = function () {
                    return (
                        this.PERFORMANCE_NOW_PROBED ||
                            ((this.PERFORMANCE_NOW_PROBED = !0),
                            (this.HAS_PERFORMANCE_NOW =
                                U.global.performance &&
                                typeof U.global.performance.now == 'function')),
                        this.HAS_PERFORMANCE_NOW
                            ? U.global.performance.now()
                            : Date.now()
                    );
                }),
                (E.NEXT_ANONYMOUS_ID = 1),
                (E.PERFORMANCE_NOW_PROBED = !1),
                (E.HAS_PERFORMANCE_NOW = !1),
                E
            );
        })();
        U.Utilities = r;
    })(re || (re = {}));
    var re;
    (function (U) {
        function r(N) {
            if (N instanceof Error) return N;
            var o = new Error(N.message || String(N) || 'Unknown Error');
            return N.stack && (o.stack = N.stack), o;
        }
        U.ensureError = r;
        var E = (function () {
            function N() {}
            return (
                (N.validateConfigurationOptions = function (o) {
                    function w(c) {
                        if (c.phase === 'loading') {
                            console.error(
                                'Loading "' + c.moduleId + '" failed'
                            ),
                                console.error(c),
                                console.error(
                                    'Here are the modules that depend on it:'
                                ),
                                console.error(c.neededBy);
                            return;
                        }
                        if (c.phase === 'factory') {
                            console.error(
                                'The factory method of "' +
                                    c.moduleId +
                                    '" has thrown an exception'
                            ),
                                console.error(c);
                            return;
                        }
                    }
                    if (
                        ((o = o || {}),
                        typeof o.baseUrl != 'string' && (o.baseUrl = ''),
                        typeof o.isBuild != 'boolean' && (o.isBuild = !1),
                        typeof o.paths != 'object' && (o.paths = {}),
                        typeof o.config != 'object' && (o.config = {}),
                        typeof o.catchError == 'undefined' &&
                            (o.catchError = !1),
                        typeof o.recordStats == 'undefined' &&
                            (o.recordStats = !1),
                        typeof o.urlArgs != 'string' && (o.urlArgs = ''),
                        typeof o.onError != 'function' && (o.onError = w),
                        Array.isArray(o.ignoreDuplicateModules) ||
                            (o.ignoreDuplicateModules = []),
                        o.baseUrl.length > 0 &&
                            (U.Utilities.endsWith(o.baseUrl, '/') ||
                                (o.baseUrl += '/')),
                        typeof o.cspNonce != 'string' && (o.cspNonce = ''),
                        typeof o.preferScriptTags == 'undefined' &&
                            (o.preferScriptTags = !1),
                        Array.isArray(o.nodeModules) || (o.nodeModules = []),
                        o.nodeCachedData &&
                            typeof o.nodeCachedData == 'object' &&
                            (typeof o.nodeCachedData.seed != 'string' &&
                                (o.nodeCachedData.seed = 'seed'),
                            (typeof o.nodeCachedData.writeDelay != 'number' ||
                                o.nodeCachedData.writeDelay < 0) &&
                                (o.nodeCachedData.writeDelay = 1e3 * 7),
                            !o.nodeCachedData.path ||
                                typeof o.nodeCachedData.path != 'string'))
                    ) {
                        var g = r(
                            new Error(
                                "INVALID cached data configuration, 'path' MUST be set"
                            )
                        );
                        (g.phase = 'configuration'),
                            o.onError(g),
                            (o.nodeCachedData = void 0);
                    }
                    return o;
                }),
                (N.mergeConfigurationOptions = function (o, w) {
                    o === void 0 && (o = null), w === void 0 && (w = null);
                    var g = U.Utilities.recursiveClone(w || {});
                    return (
                        U.Utilities.forEachProperty(o, function (c, m) {
                            c === 'ignoreDuplicateModules' &&
                            typeof g.ignoreDuplicateModules != 'undefined'
                                ? (g.ignoreDuplicateModules =
                                      g.ignoreDuplicateModules.concat(m))
                                : c === 'paths' && typeof g.paths != 'undefined'
                                ? U.Utilities.forEachProperty(
                                      m,
                                      function (S, t) {
                                          return (g.paths[S] = t);
                                      }
                                  )
                                : c === 'config' &&
                                  typeof g.config != 'undefined'
                                ? U.Utilities.forEachProperty(
                                      m,
                                      function (S, t) {
                                          return (g.config[S] = t);
                                      }
                                  )
                                : (g[c] = U.Utilities.recursiveClone(m));
                        }),
                        N.validateConfigurationOptions(g)
                    );
                }),
                N
            );
        })();
        U.ConfigurationOptionsUtil = E;
        var e = (function () {
            function N(o, w) {
                if (
                    ((this._env = o),
                    (this.options = E.mergeConfigurationOptions(w)),
                    this._createIgnoreDuplicateModulesMap(),
                    this._createNodeModulesMap(),
                    this._createSortedPathsRules(),
                    this.options.baseUrl === '')
                ) {
                    if (
                        this.options.nodeRequire &&
                        this.options.nodeRequire.main &&
                        this.options.nodeRequire.main.filename &&
                        this._env.isNode
                    ) {
                        var g = this.options.nodeRequire.main.filename,
                            c = Math.max(
                                g.lastIndexOf('/'),
                                g.lastIndexOf('\\')
                            );
                        this.options.baseUrl = g.substring(0, c + 1);
                    }
                    if (this.options.nodeMain && this._env.isNode) {
                        var g = this.options.nodeMain,
                            c = Math.max(
                                g.lastIndexOf('/'),
                                g.lastIndexOf('\\')
                            );
                        this.options.baseUrl = g.substring(0, c + 1);
                    }
                }
            }
            return (
                (N.prototype._createIgnoreDuplicateModulesMap = function () {
                    this.ignoreDuplicateModulesMap = {};
                    for (
                        var o = 0;
                        o < this.options.ignoreDuplicateModules.length;
                        o++
                    )
                        this.ignoreDuplicateModulesMap[
                            this.options.ignoreDuplicateModules[o]
                        ] = !0;
                }),
                (N.prototype._createNodeModulesMap = function () {
                    this.nodeModulesMap = Object.create(null);
                    for (
                        var o = 0, w = this.options.nodeModules;
                        o < w.length;
                        o++
                    ) {
                        var g = w[o];
                        this.nodeModulesMap[g] = !0;
                    }
                }),
                (N.prototype._createSortedPathsRules = function () {
                    var o = this;
                    (this.sortedPathsRules = []),
                        U.Utilities.forEachProperty(
                            this.options.paths,
                            function (w, g) {
                                Array.isArray(g)
                                    ? o.sortedPathsRules.push({
                                          from: w,
                                          to: g,
                                      })
                                    : o.sortedPathsRules.push({
                                          from: w,
                                          to: [g],
                                      });
                            }
                        ),
                        this.sortedPathsRules.sort(function (w, g) {
                            return g.from.length - w.from.length;
                        });
                }),
                (N.prototype.cloneAndMerge = function (o) {
                    return new N(
                        this._env,
                        E.mergeConfigurationOptions(o, this.options)
                    );
                }),
                (N.prototype.getOptionsLiteral = function () {
                    return this.options;
                }),
                (N.prototype._applyPaths = function (o) {
                    for (
                        var w, g = 0, c = this.sortedPathsRules.length;
                        g < c;
                        g++
                    )
                        if (
                            ((w = this.sortedPathsRules[g]),
                            U.Utilities.startsWith(o, w.from))
                        ) {
                            for (var m = [], S = 0, t = w.to.length; S < t; S++)
                                m.push(w.to[S] + o.substr(w.from.length));
                            return m;
                        }
                    return [o];
                }),
                (N.prototype._addUrlArgsToUrl = function (o) {
                    return U.Utilities.containsQueryString(o)
                        ? o + '&' + this.options.urlArgs
                        : o + '?' + this.options.urlArgs;
                }),
                (N.prototype._addUrlArgsIfNecessaryToUrl = function (o) {
                    return this.options.urlArgs ? this._addUrlArgsToUrl(o) : o;
                }),
                (N.prototype._addUrlArgsIfNecessaryToUrls = function (o) {
                    if (this.options.urlArgs)
                        for (var w = 0, g = o.length; w < g; w++)
                            o[w] = this._addUrlArgsToUrl(o[w]);
                    return o;
                }),
                (N.prototype.moduleIdToPaths = function (o) {
                    if (this._env.isNode) {
                        var w =
                            this.nodeModulesMap[o] === !0 ||
                            (this.options.amdModulesPattern instanceof RegExp &&
                                !this.options.amdModulesPattern.test(o));
                        if (w)
                            return this.isBuild() ? ['empty:'] : ['node|' + o];
                    }
                    var g = o,
                        c;
                    if (
                        !U.Utilities.endsWith(g, '.js') &&
                        !U.Utilities.isAbsolutePath(g)
                    ) {
                        c = this._applyPaths(g);
                        for (var m = 0, S = c.length; m < S; m++)
                            (this.isBuild() && c[m] === 'empty:') ||
                                (U.Utilities.isAbsolutePath(c[m]) ||
                                    (c[m] = this.options.baseUrl + c[m]),
                                !U.Utilities.endsWith(c[m], '.js') &&
                                    !U.Utilities.containsQueryString(c[m]) &&
                                    (c[m] = c[m] + '.js'));
                    } else
                        !U.Utilities.endsWith(g, '.js') &&
                            !U.Utilities.containsQueryString(g) &&
                            (g = g + '.js'),
                            (c = [g]);
                    return this._addUrlArgsIfNecessaryToUrls(c);
                }),
                (N.prototype.requireToUrl = function (o) {
                    var w = o;
                    return (
                        U.Utilities.isAbsolutePath(w) ||
                            ((w = this._applyPaths(w)[0]),
                            U.Utilities.isAbsolutePath(w) ||
                                (w = this.options.baseUrl + w)),
                        this._addUrlArgsIfNecessaryToUrl(w)
                    );
                }),
                (N.prototype.isBuild = function () {
                    return this.options.isBuild;
                }),
                (N.prototype.isDuplicateMessageIgnoredFor = function (o) {
                    return this.ignoreDuplicateModulesMap.hasOwnProperty(o);
                }),
                (N.prototype.getConfigForModule = function (o) {
                    if (this.options.config) return this.options.config[o];
                }),
                (N.prototype.shouldCatchError = function () {
                    return this.options.catchError;
                }),
                (N.prototype.shouldRecordStats = function () {
                    return this.options.recordStats;
                }),
                (N.prototype.onError = function (o) {
                    this.options.onError(o);
                }),
                N
            );
        })();
        U.Configuration = e;
    })(re || (re = {}));
    var re;
    (function (U) {
        var r = (function () {
                function c(m) {
                    (this._env = m),
                        (this._scriptLoader = null),
                        (this._callbackMap = {});
                }
                return (
                    (c.prototype.load = function (m, S, t, d) {
                        var h = this;
                        if (!this._scriptLoader)
                            if (this._env.isWebWorker)
                                this._scriptLoader = new N();
                            else if (this._env.isElectronRenderer) {
                                var v = m
                                    .getConfig()
                                    .getOptionsLiteral().preferScriptTags;
                                v
                                    ? (this._scriptLoader = new E())
                                    : (this._scriptLoader = new o(this._env));
                            } else
                                this._env.isNode
                                    ? (this._scriptLoader = new o(this._env))
                                    : (this._scriptLoader = new E());
                        var L = { callback: t, errorback: d };
                        if (this._callbackMap.hasOwnProperty(S)) {
                            this._callbackMap[S].push(L);
                            return;
                        }
                        (this._callbackMap[S] = [L]),
                            this._scriptLoader.load(
                                m,
                                S,
                                function () {
                                    return h.triggerCallback(S);
                                },
                                function (C) {
                                    return h.triggerErrorback(S, C);
                                }
                            );
                    }),
                    (c.prototype.triggerCallback = function (m) {
                        var S = this._callbackMap[m];
                        delete this._callbackMap[m];
                        for (var t = 0; t < S.length; t++) S[t].callback();
                    }),
                    (c.prototype.triggerErrorback = function (m, S) {
                        var t = this._callbackMap[m];
                        delete this._callbackMap[m];
                        for (var d = 0; d < t.length; d++) t[d].errorback(S);
                    }),
                    c
                );
            })(),
            E = (function () {
                function c() {}
                return (
                    (c.prototype.attachListeners = function (m, S, t) {
                        var d = function () {
                                m.removeEventListener('load', h),
                                    m.removeEventListener('error', v);
                            },
                            h = function (L) {
                                d(), S();
                            },
                            v = function (L) {
                                d(), t(L);
                            };
                        m.addEventListener('load', h),
                            m.addEventListener('error', v);
                    }),
                    (c.prototype.load = function (m, S, t, d) {
                        if (/^node\|/.test(S)) {
                            var h = m.getConfig().getOptionsLiteral(),
                                v = w(
                                    m.getRecorder(),
                                    h.nodeRequire || U.global.nodeRequire
                                ),
                                L = S.split('|'),
                                C = null;
                            try {
                                C = v(L[1]);
                            } catch (i) {
                                d(i);
                                return;
                            }
                            m.enqueueDefineAnonymousModule([], function () {
                                return C;
                            }),
                                t();
                        } else {
                            var y = document.createElement('script');
                            y.setAttribute('async', 'async'),
                                y.setAttribute('type', 'text/javascript'),
                                this.attachListeners(y, t, d);
                            var p = m
                                .getConfig()
                                .getOptionsLiteral().trustedTypesPolicy;
                            p && (S = p.createScriptURL(S)),
                                y.setAttribute('src', S);
                            var s = m.getConfig().getOptionsLiteral().cspNonce;
                            s && y.setAttribute('nonce', s),
                                document
                                    .getElementsByTagName('head')[0]
                                    .appendChild(y);
                        }
                    }),
                    c
                );
            })();
        function e(c) {
            var m = c.getConfig().getOptionsLiteral().trustedTypesPolicy;
            try {
                var S = m
                    ? self.eval(m.createScript('', 'true'))
                    : new Function('true');
                return S.call(self), !0;
            } catch {
                return !1;
            }
        }
        var N = (function () {
                function c() {
                    this._cachedCanUseEval = null;
                }
                return (
                    (c.prototype._canUseEval = function (m) {
                        return (
                            this._cachedCanUseEval === null &&
                                (this._cachedCanUseEval = e(m)),
                            this._cachedCanUseEval
                        );
                    }),
                    (c.prototype.load = function (m, S, t, d) {
                        if (/^node\|/.test(S)) {
                            var h = m.getConfig().getOptionsLiteral(),
                                v = w(
                                    m.getRecorder(),
                                    h.nodeRequire || U.global.nodeRequire
                                ),
                                L = S.split('|'),
                                C = null;
                            try {
                                C = v(L[1]);
                            } catch (s) {
                                d(s);
                                return;
                            }
                            m.enqueueDefineAnonymousModule([], function () {
                                return C;
                            }),
                                t();
                        } else {
                            var y = m
                                    .getConfig()
                                    .getOptionsLiteral().trustedTypesPolicy,
                                p =
                                    /^((http:)|(https:)|(file:))/.test(S) &&
                                    S.substring(0, self.origin.length) !==
                                        self.origin;
                            if (!p && this._canUseEval(m)) {
                                fetch(S)
                                    .then(function (s) {
                                        if (s.status !== 200)
                                            throw new Error(s.statusText);
                                        return s.text();
                                    })
                                    .then(function (s) {
                                        s =
                                            s +
                                            `
//# sourceURL=` +
                                            S;
                                        var i = y
                                            ? self.eval(y.createScript('', s))
                                            : new Function(s);
                                        i.call(self), t();
                                    })
                                    .then(void 0, d);
                                return;
                            }
                            try {
                                y && (S = y.createScriptURL(S)),
                                    importScripts(S),
                                    t();
                            } catch (s) {
                                d(s);
                            }
                        }
                    }),
                    c
                );
            })(),
            o = (function () {
                function c(m) {
                    (this._env = m),
                        (this._didInitialize = !1),
                        (this._didPatchNodeRequire = !1);
                }
                return (
                    (c.prototype._init = function (m) {
                        this._didInitialize ||
                            ((this._didInitialize = !0),
                            (this._fs = m('fs')),
                            (this._vm = m('vm')),
                            (this._path = m('path')),
                            (this._crypto = m('crypto')));
                    }),
                    (c.prototype._initNodeRequire = function (m, S) {
                        var t =
                            S.getConfig().getOptionsLiteral().nodeCachedData;
                        if (!t || this._didPatchNodeRequire) return;
                        this._didPatchNodeRequire = !0;
                        var d = this,
                            h = m('module');
                        function v(L) {
                            var C = L.constructor,
                                y = function (s) {
                                    try {
                                        return L.require(s);
                                    } finally {
                                    }
                                };
                            return (
                                (y.resolve = function (s, i) {
                                    return C._resolveFilename(s, L, !1, i);
                                }),
                                (y.resolve.paths = function (s) {
                                    return C._resolveLookupPaths(s, L);
                                }),
                                (y.main = process.mainModule),
                                (y.extensions = C._extensions),
                                (y.cache = C._cache),
                                y
                            );
                        }
                        h.prototype._compile = function (L, C) {
                            var y = h.wrap(L.replace(/^#!.*/, '')),
                                p = S.getRecorder(),
                                s = d._getCachedDataPath(t, C),
                                i = { filename: C },
                                a;
                            try {
                                var l = d._fs.readFileSync(s);
                                (a = l.slice(0, 16)),
                                    (i.cachedData = l.slice(16)),
                                    p.record(60, s);
                            } catch {
                                p.record(61, s);
                            }
                            var f = new d._vm.Script(y, i),
                                u = f.runInThisContext(i),
                                _ = d._path.dirname(C),
                                b = v(this),
                                A = [
                                    this.exports,
                                    b,
                                    this,
                                    C,
                                    _,
                                    process,
                                    Se,
                                    Buffer,
                                ],
                                P = u.apply(this.exports, A);
                            return (
                                d._handleCachedData(f, y, s, !i.cachedData, S),
                                d._verifyCachedData(f, y, s, a, S),
                                P
                            );
                        };
                    }),
                    (c.prototype.load = function (m, S, t, d) {
                        var h = this,
                            v = m.getConfig().getOptionsLiteral(),
                            L = w(
                                m.getRecorder(),
                                v.nodeRequire || U.global.nodeRequire
                            ),
                            C =
                                v.nodeInstrumenter ||
                                function (u) {
                                    return u;
                                };
                        this._init(L), this._initNodeRequire(L, m);
                        var y = m.getRecorder();
                        if (/^node\|/.test(S)) {
                            var p = S.split('|'),
                                s = null;
                            try {
                                s = L(p[1]);
                            } catch (u) {
                                d(u);
                                return;
                            }
                            m.enqueueDefineAnonymousModule([], function () {
                                return s;
                            }),
                                t();
                        } else {
                            S = U.Utilities.fileUriToFilePath(
                                this._env.isWindows,
                                S
                            );
                            var i = this._path.normalize(S),
                                a = this._getElectronRendererScriptPathOrUri(i),
                                l = Boolean(v.nodeCachedData),
                                f = l
                                    ? this._getCachedDataPath(
                                          v.nodeCachedData,
                                          S
                                      )
                                    : void 0;
                            this._readSourceAndCachedData(
                                i,
                                f,
                                y,
                                function (u, _, b, A) {
                                    if (u) {
                                        d(u);
                                        return;
                                    }
                                    var P;
                                    _.charCodeAt(0) === c._BOM
                                        ? (P =
                                              c._PREFIX +
                                              _.substring(1) +
                                              c._SUFFIX)
                                        : (P = c._PREFIX + _ + c._SUFFIX),
                                        (P = C(P, i));
                                    var D = { filename: a, cachedData: b },
                                        k = h._createAndEvalScript(
                                            m,
                                            P,
                                            D,
                                            t,
                                            d
                                        );
                                    h._handleCachedData(k, P, f, l && !b, m),
                                        h._verifyCachedData(k, P, f, A, m);
                                }
                            );
                        }
                    }),
                    (c.prototype._createAndEvalScript = function (
                        m,
                        S,
                        t,
                        d,
                        h
                    ) {
                        var v = m.getRecorder();
                        v.record(31, t.filename);
                        var L = new this._vm.Script(S, t),
                            C = L.runInThisContext(t),
                            y = m.getGlobalAMDDefineFunc(),
                            p = !1,
                            s = function () {
                                return (p = !0), y.apply(null, arguments);
                            };
                        return (
                            (s.amd = y.amd),
                            C.call(
                                U.global,
                                m.getGlobalAMDRequireFunc(),
                                s,
                                t.filename,
                                this._path.dirname(t.filename)
                            ),
                            v.record(32, t.filename),
                            p
                                ? d()
                                : h(
                                      new Error(
                                          "Didn't receive define call in " +
                                              t.filename +
                                              '!'
                                      )
                                  ),
                            L
                        );
                    }),
                    (c.prototype._getElectronRendererScriptPathOrUri =
                        function (m) {
                            if (!this._env.isElectronRenderer) return m;
                            var S = m.match(/^([a-z])\:(.*)/i);
                            return S
                                ? 'file:///' +
                                      (S[1].toUpperCase() + ':' + S[2]).replace(
                                          /\\/g,
                                          '/'
                                      )
                                : 'file://' + m;
                        }),
                    (c.prototype._getCachedDataPath = function (m, S) {
                        var t = this._crypto
                                .createHash('md5')
                                .update(S, 'utf8')
                                .update(m.seed, 'utf8')
                                .update(process.arch, '')
                                .digest('hex'),
                            d = this._path.basename(S).replace(/\.js$/, '');
                        return this._path.join(m.path, d + '-' + t + '.code');
                    }),
                    (c.prototype._handleCachedData = function (m, S, t, d, h) {
                        var v = this;
                        m.cachedDataRejected
                            ? this._fs.unlink(t, function (L) {
                                  h.getRecorder().record(62, t),
                                      v._createAndWriteCachedData(m, S, t, h),
                                      L && h.getConfig().onError(L);
                              })
                            : d && this._createAndWriteCachedData(m, S, t, h);
                    }),
                    (c.prototype._createAndWriteCachedData = function (
                        m,
                        S,
                        t,
                        d
                    ) {
                        var h = this,
                            v = Math.ceil(
                                d.getConfig().getOptionsLiteral().nodeCachedData
                                    .writeDelay *
                                    (1 + Math.random())
                            ),
                            L = -1,
                            C = 0,
                            y = void 0,
                            p = function () {
                                setTimeout(function () {
                                    y ||
                                        (y = h._crypto
                                            .createHash('md5')
                                            .update(S, 'utf8')
                                            .digest());
                                    var s = m.createCachedData();
                                    if (
                                        !(
                                            s.length === 0 ||
                                            s.length === L ||
                                            C >= 5
                                        )
                                    ) {
                                        if (s.length < L) {
                                            p();
                                            return;
                                        }
                                        (L = s.length),
                                            h._fs.writeFile(
                                                t,
                                                Buffer.concat([y, s]),
                                                function (i) {
                                                    i &&
                                                        d
                                                            .getConfig()
                                                            .onError(i),
                                                        d
                                                            .getRecorder()
                                                            .record(63, t),
                                                        p();
                                                }
                                            );
                                    }
                                }, v * Math.pow(4, C++));
                            };
                        p();
                    }),
                    (c.prototype._readSourceAndCachedData = function (
                        m,
                        S,
                        t,
                        d
                    ) {
                        if (!S) this._fs.readFile(m, { encoding: 'utf8' }, d);
                        else {
                            var h = void 0,
                                v = void 0,
                                L = void 0,
                                C = 2,
                                y = function (p) {
                                    p ? d(p) : --C == 0 && d(void 0, h, v, L);
                                };
                            this._fs.readFile(
                                m,
                                { encoding: 'utf8' },
                                function (p, s) {
                                    (h = s), y(p);
                                }
                            ),
                                this._fs.readFile(S, function (p, s) {
                                    !p && s && s.length > 0
                                        ? ((L = s.slice(0, 16)),
                                          (v = s.slice(16)),
                                          t.record(60, S))
                                        : t.record(61, S),
                                        y();
                                });
                        }
                    }),
                    (c.prototype._verifyCachedData = function (m, S, t, d, h) {
                        var v = this;
                        !d ||
                            m.cachedDataRejected ||
                            setTimeout(function () {
                                var L = v._crypto
                                    .createHash('md5')
                                    .update(S, 'utf8')
                                    .digest();
                                d.equals(L) ||
                                    (h
                                        .getConfig()
                                        .onError(
                                            new Error(
                                                "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                                                    t +
                                                    "' now, but a RESTART IS REQUIRED"
                                            )
                                        ),
                                    v._fs.unlink(t, function (C) {
                                        C && h.getConfig().onError(C);
                                    }));
                            }, Math.ceil(5e3 * (1 + Math.random())));
                    }),
                    (c._BOM = 65279),
                    (c._PREFIX =
                        '(function (require, define, __filename, __dirname) { '),
                    (c._SUFFIX = `
});`),
                    c
                );
            })();
        function w(c, m) {
            if (m.__$__isRecorded) return m;
            var S = function (d) {
                c.record(33, d);
                try {
                    return m(d);
                } finally {
                    c.record(34, d);
                }
            };
            return (S.__$__isRecorded = !0), S;
        }
        U.ensureRecordedNodeRequire = w;
        function g(c) {
            return new r(c);
        }
        U.createScriptLoader = g;
    })(re || (re = {}));
    var re;
    (function (U) {
        var r = (function () {
            function g(c) {
                var m = c.lastIndexOf('/');
                m !== -1
                    ? (this.fromModulePath = c.substr(0, m + 1))
                    : (this.fromModulePath = '');
            }
            return (
                (g._normalizeModuleId = function (c) {
                    var m = c,
                        S;
                    for (S = /\/\.\//; S.test(m); ) m = m.replace(S, '/');
                    for (
                        m = m.replace(/^\.\//g, ''),
                            S =
                                /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
                        S.test(m);

                    )
                        m = m.replace(S, '/');
                    return (
                        (m = m.replace(
                            /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
                            ''
                        )),
                        m
                    );
                }),
                (g.prototype.resolveModule = function (c) {
                    var m = c;
                    return (
                        U.Utilities.isAbsolutePath(m) ||
                            ((U.Utilities.startsWith(m, './') ||
                                U.Utilities.startsWith(m, '../')) &&
                                (m = g._normalizeModuleId(
                                    this.fromModulePath + m
                                ))),
                        m
                    );
                }),
                (g.ROOT = new g('')),
                g
            );
        })();
        U.ModuleIdResolver = r;
        var E = (function () {
            function g(c, m, S, t, d, h) {
                (this.id = c),
                    (this.strId = m),
                    (this.dependencies = S),
                    (this._callback = t),
                    (this._errorback = d),
                    (this.moduleIdResolver = h),
                    (this.exports = {}),
                    (this.error = null),
                    (this.exportsPassedIn = !1),
                    (this.unresolvedDependenciesCount =
                        this.dependencies.length),
                    (this._isComplete = !1);
            }
            return (
                (g._safeInvokeFunction = function (c, m) {
                    try {
                        return {
                            returnedValue: c.apply(U.global, m),
                            producedError: null,
                        };
                    } catch (S) {
                        return { returnedValue: null, producedError: S };
                    }
                }),
                (g._invokeFactory = function (c, m, S, t) {
                    return c.isBuild() && !U.Utilities.isAnonymousModule(m)
                        ? { returnedValue: null, producedError: null }
                        : c.shouldCatchError()
                        ? this._safeInvokeFunction(S, t)
                        : {
                              returnedValue: S.apply(U.global, t),
                              producedError: null,
                          };
                }),
                (g.prototype.complete = function (c, m, S) {
                    this._isComplete = !0;
                    var t = null;
                    if (this._callback)
                        if (typeof this._callback == 'function') {
                            c.record(21, this.strId);
                            var d = g._invokeFactory(
                                m,
                                this.strId,
                                this._callback,
                                S
                            );
                            (t = d.producedError),
                                c.record(22, this.strId),
                                !t &&
                                    typeof d.returnedValue != 'undefined' &&
                                    (!this.exportsPassedIn ||
                                        U.Utilities.isEmpty(this.exports)) &&
                                    (this.exports = d.returnedValue);
                        } else this.exports = this._callback;
                    if (t) {
                        var h = U.ensureError(t);
                        (h.phase = 'factory'),
                            (h.moduleId = this.strId),
                            (this.error = h),
                            m.onError(h);
                    }
                    (this.dependencies = null),
                        (this._callback = null),
                        (this._errorback = null),
                        (this.moduleIdResolver = null);
                }),
                (g.prototype.onDependencyError = function (c) {
                    return (
                        (this._isComplete = !0),
                        (this.error = c),
                        this._errorback ? (this._errorback(c), !0) : !1
                    );
                }),
                (g.prototype.isComplete = function () {
                    return this._isComplete;
                }),
                g
            );
        })();
        U.Module = E;
        var e = (function () {
                function g() {
                    (this._nextId = 0),
                        (this._strModuleIdToIntModuleId = new Map()),
                        (this._intModuleIdToStrModuleId = []),
                        this.getModuleId('exports'),
                        this.getModuleId('module'),
                        this.getModuleId('require');
                }
                return (
                    (g.prototype.getMaxModuleId = function () {
                        return this._nextId;
                    }),
                    (g.prototype.getModuleId = function (c) {
                        var m = this._strModuleIdToIntModuleId.get(c);
                        return (
                            typeof m == 'undefined' &&
                                ((m = this._nextId++),
                                this._strModuleIdToIntModuleId.set(c, m),
                                (this._intModuleIdToStrModuleId[m] = c)),
                            m
                        );
                    }),
                    (g.prototype.getStrModuleId = function (c) {
                        return this._intModuleIdToStrModuleId[c];
                    }),
                    g
                );
            })(),
            N = (function () {
                function g(c) {
                    this.id = c;
                }
                return (
                    (g.EXPORTS = new g(0)),
                    (g.MODULE = new g(1)),
                    (g.REQUIRE = new g(2)),
                    g
                );
            })();
        U.RegularDependency = N;
        var o = (function () {
            function g(c, m, S) {
                (this.id = c), (this.pluginId = m), (this.pluginParam = S);
            }
            return g;
        })();
        U.PluginDependency = o;
        var w = (function () {
            function g(c, m, S, t, d) {
                d === void 0 && (d = 0),
                    (this._env = c),
                    (this._scriptLoader = m),
                    (this._loaderAvailableTimestamp = d),
                    (this._defineFunc = S),
                    (this._requireFunc = t),
                    (this._moduleIdProvider = new e()),
                    (this._config = new U.Configuration(this._env)),
                    (this._hasDependencyCycle = !1),
                    (this._modules2 = []),
                    (this._knownModules2 = []),
                    (this._inverseDependencies2 = []),
                    (this._inversePluginDependencies2 = new Map()),
                    (this._currentAnonymousDefineCall = null),
                    (this._recorder = null),
                    (this._buildInfoPath = []),
                    (this._buildInfoDefineStack = []),
                    (this._buildInfoDependencies = []);
            }
            return (
                (g.prototype.reset = function () {
                    return new g(
                        this._env,
                        this._scriptLoader,
                        this._defineFunc,
                        this._requireFunc,
                        this._loaderAvailableTimestamp
                    );
                }),
                (g.prototype.getGlobalAMDDefineFunc = function () {
                    return this._defineFunc;
                }),
                (g.prototype.getGlobalAMDRequireFunc = function () {
                    return this._requireFunc;
                }),
                (g._findRelevantLocationInStack = function (c, m) {
                    for (
                        var S = function (i) {
                                return i.replace(/\\/g, '/');
                            },
                            t = S(c),
                            d = m.split(/\n/),
                            h = 0;
                        h < d.length;
                        h++
                    ) {
                        var v = d[h].match(/(.*):(\d+):(\d+)\)?$/);
                        if (v) {
                            var L = v[1],
                                C = v[2],
                                y = v[3],
                                p = Math.max(
                                    L.lastIndexOf(' ') + 1,
                                    L.lastIndexOf('(') + 1
                                );
                            if (((L = L.substr(p)), (L = S(L)), L === t)) {
                                var s = {
                                    line: parseInt(C, 10),
                                    col: parseInt(y, 10),
                                };
                                return (
                                    s.line === 1 &&
                                        (s.col -=
                                            '(function (require, define, __filename, __dirname) { '.length),
                                    s
                                );
                            }
                        }
                    }
                    throw new Error(
                        'Could not correlate define call site for needle ' + c
                    );
                }),
                (g.prototype.getBuildInfo = function () {
                    if (!this._config.isBuild()) return null;
                    for (
                        var c = [], m = 0, S = 0, t = this._modules2.length;
                        S < t;
                        S++
                    ) {
                        var d = this._modules2[S];
                        if (!!d) {
                            var h = this._buildInfoPath[d.id] || null,
                                v = this._buildInfoDefineStack[d.id] || null,
                                L = this._buildInfoDependencies[d.id];
                            c[m++] = {
                                id: d.strId,
                                path: h,
                                defineLocation:
                                    h && v
                                        ? g._findRelevantLocationInStack(h, v)
                                        : null,
                                dependencies: L,
                                shim: null,
                                exports: d.exports,
                            };
                        }
                    }
                    return c;
                }),
                (g.prototype.getRecorder = function () {
                    return (
                        this._recorder ||
                            (this._config.shouldRecordStats()
                                ? (this._recorder = new U.LoaderEventRecorder(
                                      this._loaderAvailableTimestamp
                                  ))
                                : (this._recorder =
                                      U.NullLoaderEventRecorder.INSTANCE)),
                        this._recorder
                    );
                }),
                (g.prototype.getLoaderEvents = function () {
                    return this.getRecorder().getEvents();
                }),
                (g.prototype.enqueueDefineAnonymousModule = function (c, m) {
                    if (this._currentAnonymousDefineCall !== null)
                        throw new Error(
                            'Can only have one anonymous define call per script file'
                        );
                    var S = null;
                    this._config.isBuild() &&
                        (S = new Error('StackLocation').stack || null),
                        (this._currentAnonymousDefineCall = {
                            stack: S,
                            dependencies: c,
                            callback: m,
                        });
                }),
                (g.prototype.defineModule = function (c, m, S, t, d, h) {
                    var v = this;
                    h === void 0 && (h = new r(c));
                    var L = this._moduleIdProvider.getModuleId(c);
                    if (this._modules2[L]) {
                        this._config.isDuplicateMessageIgnoredFor(c) ||
                            console.warn(
                                "Duplicate definition of module '" + c + "'"
                            );
                        return;
                    }
                    var C = new E(
                        L,
                        c,
                        this._normalizeDependencies(m, h),
                        S,
                        t,
                        h
                    );
                    (this._modules2[L] = C),
                        this._config.isBuild() &&
                            ((this._buildInfoDefineStack[L] = d),
                            (this._buildInfoDependencies[L] = (
                                C.dependencies || []
                            ).map(function (y) {
                                return v._moduleIdProvider.getStrModuleId(y.id);
                            }))),
                        this._resolve(C);
                }),
                (g.prototype._normalizeDependency = function (c, m) {
                    if (c === 'exports') return N.EXPORTS;
                    if (c === 'module') return N.MODULE;
                    if (c === 'require') return N.REQUIRE;
                    var S = c.indexOf('!');
                    if (S >= 0) {
                        var t = m.resolveModule(c.substr(0, S)),
                            d = m.resolveModule(c.substr(S + 1)),
                            h = this._moduleIdProvider.getModuleId(t + '!' + d),
                            v = this._moduleIdProvider.getModuleId(t);
                        return new o(h, v, d);
                    }
                    return new N(
                        this._moduleIdProvider.getModuleId(m.resolveModule(c))
                    );
                }),
                (g.prototype._normalizeDependencies = function (c, m) {
                    for (var S = [], t = 0, d = 0, h = c.length; d < h; d++)
                        S[t++] = this._normalizeDependency(c[d], m);
                    return S;
                }),
                (g.prototype._relativeRequire = function (c, m, S, t) {
                    if (typeof m == 'string')
                        return this.synchronousRequire(m, c);
                    this.defineModule(
                        U.Utilities.generateAnonymousModule(),
                        m,
                        S,
                        t,
                        null,
                        c
                    );
                }),
                (g.prototype.synchronousRequire = function (c, m) {
                    m === void 0 && (m = new r(c));
                    var S = this._normalizeDependency(c, m),
                        t = this._modules2[S.id];
                    if (!t)
                        throw new Error(
                            "Check dependency list! Synchronous require cannot resolve module '" +
                                c +
                                "'. This is the first mention of this module!"
                        );
                    if (!t.isComplete())
                        throw new Error(
                            "Check dependency list! Synchronous require cannot resolve module '" +
                                c +
                                "'. This module has not been resolved completely yet."
                        );
                    if (t.error) throw t.error;
                    return t.exports;
                }),
                (g.prototype.configure = function (c, m) {
                    var S = this._config.shouldRecordStats();
                    m
                        ? (this._config = new U.Configuration(this._env, c))
                        : (this._config = this._config.cloneAndMerge(c)),
                        this._config.shouldRecordStats() &&
                            !S &&
                            (this._recorder = null);
                }),
                (g.prototype.getConfig = function () {
                    return this._config;
                }),
                (g.prototype._onLoad = function (c) {
                    if (this._currentAnonymousDefineCall !== null) {
                        var m = this._currentAnonymousDefineCall;
                        (this._currentAnonymousDefineCall = null),
                            this.defineModule(
                                this._moduleIdProvider.getStrModuleId(c),
                                m.dependencies,
                                m.callback,
                                null,
                                m.stack
                            );
                    }
                }),
                (g.prototype._createLoadError = function (c, m) {
                    var S = this,
                        t = this._moduleIdProvider.getStrModuleId(c),
                        d = (this._inverseDependencies2[c] || []).map(function (
                            v
                        ) {
                            return S._moduleIdProvider.getStrModuleId(v);
                        }),
                        h = U.ensureError(m);
                    return (
                        (h.phase = 'loading'),
                        (h.moduleId = t),
                        (h.neededBy = d),
                        h
                    );
                }),
                (g.prototype._onLoadError = function (c, m) {
                    var S = this._createLoadError(c, m);
                    this._modules2[c] ||
                        (this._modules2[c] = new E(
                            c,
                            this._moduleIdProvider.getStrModuleId(c),
                            [],
                            function () {},
                            null,
                            null
                        ));
                    for (
                        var t = [],
                            d = 0,
                            h = this._moduleIdProvider.getMaxModuleId();
                        d < h;
                        d++
                    )
                        t[d] = !1;
                    var v = !1,
                        L = [];
                    for (L.push(c), t[c] = !0; L.length > 0; ) {
                        var C = L.shift(),
                            y = this._modules2[C];
                        y && (v = y.onDependencyError(S) || v);
                        var p = this._inverseDependencies2[C];
                        if (p)
                            for (var d = 0, h = p.length; d < h; d++) {
                                var s = p[d];
                                t[s] || (L.push(s), (t[s] = !0));
                            }
                    }
                    v || this._config.onError(S);
                }),
                (g.prototype._hasDependencyPath = function (c, m) {
                    var S = this._modules2[c];
                    if (!S) return !1;
                    for (
                        var t = [],
                            d = 0,
                            h = this._moduleIdProvider.getMaxModuleId();
                        d < h;
                        d++
                    )
                        t[d] = !1;
                    var v = [];
                    for (v.push(S), t[c] = !0; v.length > 0; ) {
                        var L = v.shift(),
                            C = L.dependencies;
                        if (C)
                            for (var d = 0, h = C.length; d < h; d++) {
                                var y = C[d];
                                if (y.id === m) return !0;
                                var p = this._modules2[y.id];
                                p && !t[y.id] && ((t[y.id] = !0), v.push(p));
                            }
                    }
                    return !1;
                }),
                (g.prototype._findCyclePath = function (c, m, S) {
                    if (c === m || S === 50) return [c];
                    var t = this._modules2[c];
                    if (!t) return null;
                    var d = t.dependencies;
                    if (d)
                        for (var h = 0, v = d.length; h < v; h++) {
                            var L = this._findCyclePath(d[h].id, m, S + 1);
                            if (L !== null) return L.push(c), L;
                        }
                    return null;
                }),
                (g.prototype._createRequire = function (c) {
                    var m = this,
                        S = function (t, d, h) {
                            return m._relativeRequire(c, t, d, h);
                        };
                    return (
                        (S.toUrl = function (t) {
                            return m._config.requireToUrl(c.resolveModule(t));
                        }),
                        (S.getStats = function () {
                            return m.getLoaderEvents();
                        }),
                        (S.hasDependencyCycle = function () {
                            return m._hasDependencyCycle;
                        }),
                        (S.config = function (t, d) {
                            d === void 0 && (d = !1), m.configure(t, d);
                        }),
                        (S.__$__nodeRequire = U.global.nodeRequire),
                        S
                    );
                }),
                (g.prototype._loadModule = function (c) {
                    var m = this;
                    if (!(this._modules2[c] || this._knownModules2[c])) {
                        this._knownModules2[c] = !0;
                        var S = this._moduleIdProvider.getStrModuleId(c),
                            t = this._config.moduleIdToPaths(S),
                            d = /^@[^\/]+\/[^\/]+$/;
                        this._env.isNode &&
                            (S.indexOf('/') === -1 || d.test(S)) &&
                            t.push('node|' + S);
                        var h = -1,
                            v = function (L) {
                                if ((h++, h >= t.length)) m._onLoadError(c, L);
                                else {
                                    var C = t[h],
                                        y = m.getRecorder();
                                    if (m._config.isBuild() && C === 'empty:') {
                                        (m._buildInfoPath[c] = C),
                                            m.defineModule(
                                                m._moduleIdProvider.getStrModuleId(
                                                    c
                                                ),
                                                [],
                                                null,
                                                null,
                                                null
                                            ),
                                            m._onLoad(c);
                                        return;
                                    }
                                    y.record(10, C),
                                        m._scriptLoader.load(
                                            m,
                                            C,
                                            function () {
                                                m._config.isBuild() &&
                                                    (m._buildInfoPath[c] = C),
                                                    y.record(11, C),
                                                    m._onLoad(c);
                                            },
                                            function (p) {
                                                y.record(12, C), v(p);
                                            }
                                        );
                                }
                            };
                        v(null);
                    }
                }),
                (g.prototype._loadPluginDependency = function (c, m) {
                    var S = this;
                    if (!(this._modules2[m.id] || this._knownModules2[m.id])) {
                        this._knownModules2[m.id] = !0;
                        var t = function (d) {
                            S.defineModule(
                                S._moduleIdProvider.getStrModuleId(m.id),
                                [],
                                d,
                                null,
                                null
                            );
                        };
                        (t.error = function (d) {
                            S._config.onError(S._createLoadError(m.id, d));
                        }),
                            c.load(
                                m.pluginParam,
                                this._createRequire(r.ROOT),
                                t,
                                this._config.getOptionsLiteral()
                            );
                    }
                }),
                (g.prototype._resolve = function (c) {
                    var m = this,
                        S = c.dependencies;
                    if (S)
                        for (var t = 0, d = S.length; t < d; t++) {
                            var h = S[t];
                            if (h === N.EXPORTS) {
                                (c.exportsPassedIn = !0),
                                    c.unresolvedDependenciesCount--;
                                continue;
                            }
                            if (h === N.MODULE) {
                                c.unresolvedDependenciesCount--;
                                continue;
                            }
                            if (h === N.REQUIRE) {
                                c.unresolvedDependenciesCount--;
                                continue;
                            }
                            var v = this._modules2[h.id];
                            if (v && v.isComplete()) {
                                if (v.error) {
                                    c.onDependencyError(v.error);
                                    return;
                                }
                                c.unresolvedDependenciesCount--;
                                continue;
                            }
                            if (this._hasDependencyPath(h.id, c.id)) {
                                (this._hasDependencyCycle = !0),
                                    console.warn(
                                        "There is a dependency cycle between '" +
                                            this._moduleIdProvider.getStrModuleId(
                                                h.id
                                            ) +
                                            "' and '" +
                                            this._moduleIdProvider.getStrModuleId(
                                                c.id
                                            ) +
                                            "'. The cyclic path follows:"
                                    );
                                var L =
                                    this._findCyclePath(h.id, c.id, 0) || [];
                                L.reverse(),
                                    L.push(h.id),
                                    console.warn(
                                        L.map(function (p) {
                                            return m._moduleIdProvider.getStrModuleId(
                                                p
                                            );
                                        }).join(` => 
`)
                                    ),
                                    c.unresolvedDependenciesCount--;
                                continue;
                            }
                            if (
                                ((this._inverseDependencies2[h.id] =
                                    this._inverseDependencies2[h.id] || []),
                                this._inverseDependencies2[h.id].push(c.id),
                                h instanceof o)
                            ) {
                                var C = this._modules2[h.pluginId];
                                if (C && C.isComplete()) {
                                    this._loadPluginDependency(C.exports, h);
                                    continue;
                                }
                                var y = this._inversePluginDependencies2.get(
                                    h.pluginId
                                );
                                y ||
                                    ((y = []),
                                    this._inversePluginDependencies2.set(
                                        h.pluginId,
                                        y
                                    )),
                                    y.push(h),
                                    this._loadModule(h.pluginId);
                                continue;
                            }
                            this._loadModule(h.id);
                        }
                    c.unresolvedDependenciesCount === 0 &&
                        this._onModuleComplete(c);
                }),
                (g.prototype._onModuleComplete = function (c) {
                    var m = this,
                        S = this.getRecorder();
                    if (!c.isComplete()) {
                        var t = c.dependencies,
                            d = [];
                        if (t)
                            for (var h = 0, v = t.length; h < v; h++) {
                                var L = t[h];
                                if (L === N.EXPORTS) {
                                    d[h] = c.exports;
                                    continue;
                                }
                                if (L === N.MODULE) {
                                    d[h] = {
                                        id: c.strId,
                                        config: function () {
                                            return m._config.getConfigForModule(
                                                c.strId
                                            );
                                        },
                                    };
                                    continue;
                                }
                                if (L === N.REQUIRE) {
                                    d[h] = this._createRequire(
                                        c.moduleIdResolver
                                    );
                                    continue;
                                }
                                var C = this._modules2[L.id];
                                if (C) {
                                    d[h] = C.exports;
                                    continue;
                                }
                                d[h] = null;
                            }
                        c.complete(S, this._config, d);
                        var y = this._inverseDependencies2[c.id];
                        if (((this._inverseDependencies2[c.id] = null), y))
                            for (var h = 0, v = y.length; h < v; h++) {
                                var p = y[h],
                                    s = this._modules2[p];
                                s.unresolvedDependenciesCount--,
                                    s.unresolvedDependenciesCount === 0 &&
                                        this._onModuleComplete(s);
                            }
                        var i = this._inversePluginDependencies2.get(c.id);
                        if (i) {
                            this._inversePluginDependencies2.delete(c.id);
                            for (var h = 0, v = i.length; h < v; h++)
                                this._loadPluginDependency(c.exports, i[h]);
                        }
                    }
                }),
                g
            );
        })();
        U.ModuleManager = w;
    })(re || (re = {}));
    var Y, re;
    (function (U) {
        var r = new U.Environment(),
            E = null,
            e = function (g, c, m) {
                typeof g != 'string' && ((m = c), (c = g), (g = null)),
                    (typeof c != 'object' || !Array.isArray(c)) &&
                        ((m = c), (c = null)),
                    c || (c = ['require', 'exports', 'module']),
                    g
                        ? E.defineModule(g, c, m, null, null)
                        : E.enqueueDefineAnonymousModule(c, m);
            };
        e.amd = { jQuery: !0 };
        var N = function (g, c) {
                c === void 0 && (c = !1), E.configure(g, c);
            },
            o = function () {
                if (arguments.length === 1) {
                    if (
                        arguments[0] instanceof Object &&
                        !Array.isArray(arguments[0])
                    ) {
                        N(arguments[0]);
                        return;
                    }
                    if (typeof arguments[0] == 'string')
                        return E.synchronousRequire(arguments[0]);
                }
                if (
                    (arguments.length === 2 || arguments.length === 3) &&
                    Array.isArray(arguments[0])
                ) {
                    E.defineModule(
                        U.Utilities.generateAnonymousModule(),
                        arguments[0],
                        arguments[1],
                        arguments[2],
                        null
                    );
                    return;
                }
                throw new Error('Unrecognized require call');
            };
        (o.config = N),
            (o.getConfig = function () {
                return E.getConfig().getOptionsLiteral();
            }),
            (o.reset = function () {
                E = E.reset();
            }),
            (o.getBuildInfo = function () {
                return E.getBuildInfo();
            }),
            (o.getStats = function () {
                return E.getLoaderEvents();
            }),
            (o.define = e);
        function w() {
            if (
                typeof U.global.require != 'undefined' ||
                typeof require != 'undefined'
            ) {
                var g = U.global.require || require;
                if (typeof g == 'function' && typeof g.resolve == 'function') {
                    var c = U.ensureRecordedNodeRequire(E.getRecorder(), g);
                    (U.global.nodeRequire = c),
                        (o.nodeRequire = c),
                        (o.__$__nodeRequire = c);
                }
            }
            r.isNode &&
            !r.isElectronRenderer &&
            !r.isElectronNodeIntegrationWebWorker
                ? ((module.exports = o), (require = o))
                : (r.isElectronRenderer || (U.global.define = e),
                  (U.global.require = o));
        }
        (U.init = w),
            (typeof U.global.define != 'function' || !U.global.define.amd) &&
                ((E = new U.ModuleManager(
                    r,
                    U.createScriptLoader(r),
                    e,
                    o,
                    U.Utilities.getHighPerformanceTimestamp()
                )),
                typeof U.global.require != 'undefined' &&
                    typeof U.global.require != 'function' &&
                    o.config(U.global.require),
                (Y = function () {
                    return e.apply(null, arguments);
                }),
                (Y.amd = e.amd),
                typeof doNotInitLoader == 'undefined' && w());
    })(re || (re = {})),
        Y(Q[16], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.ArrayQueue =
                    r.findMinBy =
                    r.findLastMaxBy =
                    r.findMaxBy =
                    r.numberComparator =
                    r.compareBy =
                    r.splice =
                    r.insertInto =
                    r.asArray =
                    r.pushToEnd =
                    r.pushToStart =
                    r.arrayInsert =
                    r.range =
                    r.flatten =
                    r.firstOrDefault =
                    r.lastIndex =
                    r.findLast =
                    r.distinct =
                    r.isNonEmptyArray =
                    r.isFalsyOrEmpty =
                    r.coalesce =
                    r.groupBy =
                    r.quickSelect =
                    r.findFirstInSorted =
                    r.binarySearch =
                    r.equals =
                    r.tail2 =
                    r.tail =
                        void 0);
            function E(R, I = 0) {
                return R[R.length - (1 + I)];
            }
            r.tail = E;
            function e(R) {
                if (R.length === 0) throw new Error('Invalid tail call');
                return [R.slice(0, R.length - 1), R[R.length - 1]];
            }
            r.tail2 = e;
            function N(R, I, F = (O, V) => O === V) {
                if (R === I) return !0;
                if (!R || !I || R.length !== I.length) return !1;
                for (let O = 0, V = R.length; O < V; O++)
                    if (!F(R[O], I[O])) return !1;
                return !0;
            }
            r.equals = N;
            function o(R, I, F) {
                let O = 0,
                    V = R.length - 1;
                for (; O <= V; ) {
                    const K = ((O + V) / 2) | 0,
                        $ = F(R[K], I);
                    if ($ < 0) O = K + 1;
                    else if ($ > 0) V = K - 1;
                    else return K;
                }
                return -(O + 1);
            }
            r.binarySearch = o;
            function w(R, I) {
                let F = 0,
                    O = R.length;
                if (O === 0) return 0;
                for (; F < O; ) {
                    const V = Math.floor((F + O) / 2);
                    I(R[V]) ? (O = V) : (F = V + 1);
                }
                return F;
            }
            r.findFirstInSorted = w;
            function g(R, I, F) {
                if (((R = R | 0), R >= I.length))
                    throw new TypeError('invalid index');
                let O = I[Math.floor(I.length * Math.random())],
                    V = [],
                    K = [],
                    $ = [];
                for (let z of I) {
                    const n = F(z, O);
                    n < 0 ? V.push(z) : n > 0 ? K.push(z) : $.push(z);
                }
                return R < V.length
                    ? g(R, V, F)
                    : R < V.length + $.length
                    ? $[0]
                    : g(R - (V.length + $.length), K, F);
            }
            r.quickSelect = g;
            function c(R, I) {
                const F = [];
                let O;
                for (const V of R.slice(0).sort(I))
                    !O || I(O[0], V) !== 0 ? ((O = [V]), F.push(O)) : O.push(V);
                return F;
            }
            r.groupBy = c;
            function m(R) {
                return R.filter((I) => !!I);
            }
            r.coalesce = m;
            function S(R) {
                return !Array.isArray(R) || R.length === 0;
            }
            r.isFalsyOrEmpty = S;
            function t(R) {
                return Array.isArray(R) && R.length > 0;
            }
            r.isNonEmptyArray = t;
            function d(R, I = (F) => F) {
                const F = new Set();
                return R.filter((O) => {
                    const V = I(O);
                    return F.has(V) ? !1 : (F.add(V), !0);
                });
            }
            r.distinct = d;
            function h(R, I) {
                const F = v(R, I);
                if (F !== -1) return R[F];
            }
            r.findLast = h;
            function v(R, I) {
                for (let F = R.length - 1; F >= 0; F--) {
                    const O = R[F];
                    if (I(O)) return F;
                }
                return -1;
            }
            r.lastIndex = v;
            function L(R, I) {
                return R.length > 0 ? R[0] : I;
            }
            r.firstOrDefault = L;
            function C(R) {
                return [].concat(...R);
            }
            r.flatten = C;
            function y(R, I) {
                let F = typeof I == 'number' ? R : 0;
                typeof I == 'number' ? (F = R) : ((F = 0), (I = R));
                const O = [];
                if (F <= I) for (let V = F; V < I; V++) O.push(V);
                else for (let V = F; V > I; V--) O.push(V);
                return O;
            }
            r.range = y;
            function p(R, I, F) {
                const O = R.slice(0, I),
                    V = R.slice(I);
                return O.concat(F, V);
            }
            r.arrayInsert = p;
            function s(R, I) {
                const F = R.indexOf(I);
                F > -1 && (R.splice(F, 1), R.unshift(I));
            }
            r.pushToStart = s;
            function i(R, I) {
                const F = R.indexOf(I);
                F > -1 && (R.splice(F, 1), R.push(I));
            }
            r.pushToEnd = i;
            function a(R) {
                return Array.isArray(R) ? R : [R];
            }
            r.asArray = a;
            function l(R, I, F) {
                const O = u(R, I),
                    V = R.length,
                    K = F.length;
                R.length = V + K;
                for (let $ = V - 1; $ >= O; $--) R[$ + K] = R[$];
                for (let $ = 0; $ < K; $++) R[$ + O] = F[$];
            }
            r.insertInto = l;
            function f(R, I, F, O) {
                const V = u(R, I),
                    K = R.splice(V, F);
                return l(R, V, O), K;
            }
            r.splice = f;
            function u(R, I) {
                return I < 0
                    ? Math.max(I + R.length, 0)
                    : Math.min(I, R.length);
            }
            function _(R, I) {
                return (F, O) => I(R(F), R(O));
            }
            r.compareBy = _;
            const b = (R, I) => R - I;
            r.numberComparator = b;
            function A(R, I) {
                if (R.length === 0) return;
                let F = R[0];
                for (let O = 1; O < R.length; O++) {
                    const V = R[O];
                    I(V, F) > 0 && (F = V);
                }
                return F;
            }
            r.findMaxBy = A;
            function P(R, I) {
                if (R.length === 0) return;
                let F = R[0];
                for (let O = 1; O < R.length; O++) {
                    const V = R[O];
                    I(V, F) >= 0 && (F = V);
                }
                return F;
            }
            r.findLastMaxBy = P;
            function D(R, I) {
                return A(R, (F, O) => -I(F, O));
            }
            r.findMinBy = D;
            class k {
                constructor(I) {
                    (this.items = I),
                        (this.firstIdx = 0),
                        (this.lastIdx = this.items.length - 1);
                }
                takeWhile(I) {
                    let F = this.firstIdx;
                    for (; F < this.items.length && I(this.items[F]); ) F++;
                    const O =
                        F === this.firstIdx
                            ? null
                            : this.items.slice(this.firstIdx, F);
                    return (this.firstIdx = F), O;
                }
                takeFromEndWhile(I) {
                    let F = this.lastIdx;
                    for (; F >= 0 && I(this.items[F]); ) F--;
                    const O =
                        F === this.lastIdx
                            ? null
                            : this.items.slice(F + 1, this.lastIdx + 1);
                    return (this.lastIdx = F), O;
                }
                peek() {
                    return this.items[this.firstIdx];
                }
                dequeue() {
                    const I = this.items[this.firstIdx];
                    return this.firstIdx++, I;
                }
                takeCount(I) {
                    const F = this.items.slice(
                        this.firstIdx,
                        this.firstIdx + I
                    );
                    return (this.firstIdx += I), F;
                }
            }
            r.ArrayQueue = k;
        }),
        Y(Q[17], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.LRUCachedComputed = void 0);
            class E {
                constructor(N) {
                    (this.computeFn = N),
                        (this.lastCache = void 0),
                        (this.lastArgKey = void 0);
                }
                get(N) {
                    const o = JSON.stringify(N);
                    return (
                        this.lastArgKey !== o &&
                            ((this.lastArgKey = o),
                            (this.lastCache = this.computeFn(N))),
                        this.lastCache
                    );
                }
            }
            r.LRUCachedComputed = E;
        }),
        Y(Q[18], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.CSSIcon = r.Codicon = r.getCodiconAriaLabel = void 0);
            function E(o) {
                return o
                    ? o.replace(/\$\((.*?)\)/g, (w, g) => ` ${g} `).trim()
                    : '';
            }
            r.getCodiconAriaLabel = E;
            class e {
                constructor(w, g, c) {
                    (this.id = w),
                        (this.definition = g),
                        (this.description = c),
                        e._allCodicons.push(this);
                }
                get classNames() {
                    return 'codicon codicon-' + this.id;
                }
                get classNamesArray() {
                    return ['codicon', 'codicon-' + this.id];
                }
                get cssSelector() {
                    return '.codicon.codicon-' + this.id;
                }
                static getAll() {
                    return e._allCodicons;
                }
            }
            (r.Codicon = e),
                (e._allCodicons = []),
                (e.add = new e('add', { fontCharacter: '\\ea60' })),
                (e.plus = new e('plus', e.add.definition)),
                (e.gistNew = new e('gist-new', e.add.definition)),
                (e.repoCreate = new e('repo-create', e.add.definition)),
                (e.lightbulb = new e('lightbulb', { fontCharacter: '\\ea61' })),
                (e.lightBulb = new e('light-bulb', {
                    fontCharacter: '\\ea61',
                })),
                (e.repo = new e('repo', { fontCharacter: '\\ea62' })),
                (e.repoDelete = new e('repo-delete', {
                    fontCharacter: '\\ea62',
                })),
                (e.gistFork = new e('gist-fork', { fontCharacter: '\\ea63' })),
                (e.repoForked = new e('repo-forked', {
                    fontCharacter: '\\ea63',
                })),
                (e.gitPullRequest = new e('git-pull-request', {
                    fontCharacter: '\\ea64',
                })),
                (e.gitPullRequestAbandoned = new e(
                    'git-pull-request-abandoned',
                    { fontCharacter: '\\ea64' }
                )),
                (e.recordKeys = new e('record-keys', {
                    fontCharacter: '\\ea65',
                })),
                (e.keyboard = new e('keyboard', { fontCharacter: '\\ea65' })),
                (e.tag = new e('tag', { fontCharacter: '\\ea66' })),
                (e.tagAdd = new e('tag-add', { fontCharacter: '\\ea66' })),
                (e.tagRemove = new e('tag-remove', {
                    fontCharacter: '\\ea66',
                })),
                (e.person = new e('person', { fontCharacter: '\\ea67' })),
                (e.personFollow = new e('person-follow', {
                    fontCharacter: '\\ea67',
                })),
                (e.personOutline = new e('person-outline', {
                    fontCharacter: '\\ea67',
                })),
                (e.personFilled = new e('person-filled', {
                    fontCharacter: '\\ea67',
                })),
                (e.gitBranch = new e('git-branch', {
                    fontCharacter: '\\ea68',
                })),
                (e.gitBranchCreate = new e('git-branch-create', {
                    fontCharacter: '\\ea68',
                })),
                (e.gitBranchDelete = new e('git-branch-delete', {
                    fontCharacter: '\\ea68',
                })),
                (e.sourceControl = new e('source-control', {
                    fontCharacter: '\\ea68',
                })),
                (e.mirror = new e('mirror', { fontCharacter: '\\ea69' })),
                (e.mirrorPublic = new e('mirror-public', {
                    fontCharacter: '\\ea69',
                })),
                (e.star = new e('star', { fontCharacter: '\\ea6a' })),
                (e.starAdd = new e('star-add', { fontCharacter: '\\ea6a' })),
                (e.starDelete = new e('star-delete', {
                    fontCharacter: '\\ea6a',
                })),
                (e.starEmpty = new e('star-empty', {
                    fontCharacter: '\\ea6a',
                })),
                (e.comment = new e('comment', { fontCharacter: '\\ea6b' })),
                (e.commentAdd = new e('comment-add', {
                    fontCharacter: '\\ea6b',
                })),
                (e.alert = new e('alert', { fontCharacter: '\\ea6c' })),
                (e.warning = new e('warning', { fontCharacter: '\\ea6c' })),
                (e.search = new e('search', { fontCharacter: '\\ea6d' })),
                (e.searchSave = new e('search-save', {
                    fontCharacter: '\\ea6d',
                })),
                (e.logOut = new e('log-out', { fontCharacter: '\\ea6e' })),
                (e.signOut = new e('sign-out', { fontCharacter: '\\ea6e' })),
                (e.logIn = new e('log-in', { fontCharacter: '\\ea6f' })),
                (e.signIn = new e('sign-in', { fontCharacter: '\\ea6f' })),
                (e.eye = new e('eye', { fontCharacter: '\\ea70' })),
                (e.eyeUnwatch = new e('eye-unwatch', {
                    fontCharacter: '\\ea70',
                })),
                (e.eyeWatch = new e('eye-watch', { fontCharacter: '\\ea70' })),
                (e.circleFilled = new e('circle-filled', {
                    fontCharacter: '\\ea71',
                })),
                (e.primitiveDot = new e('primitive-dot', {
                    fontCharacter: '\\ea71',
                })),
                (e.closeDirty = new e('close-dirty', {
                    fontCharacter: '\\ea71',
                })),
                (e.debugBreakpoint = new e('debug-breakpoint', {
                    fontCharacter: '\\ea71',
                })),
                (e.debugBreakpointDisabled = new e(
                    'debug-breakpoint-disabled',
                    { fontCharacter: '\\ea71' }
                )),
                (e.debugHint = new e('debug-hint', {
                    fontCharacter: '\\ea71',
                })),
                (e.primitiveSquare = new e('primitive-square', {
                    fontCharacter: '\\ea72',
                })),
                (e.edit = new e('edit', { fontCharacter: '\\ea73' })),
                (e.pencil = new e('pencil', { fontCharacter: '\\ea73' })),
                (e.info = new e('info', { fontCharacter: '\\ea74' })),
                (e.issueOpened = new e('issue-opened', {
                    fontCharacter: '\\ea74',
                })),
                (e.gistPrivate = new e('gist-private', {
                    fontCharacter: '\\ea75',
                })),
                (e.gitForkPrivate = new e('git-fork-private', {
                    fontCharacter: '\\ea75',
                })),
                (e.lock = new e('lock', { fontCharacter: '\\ea75' })),
                (e.mirrorPrivate = new e('mirror-private', {
                    fontCharacter: '\\ea75',
                })),
                (e.close = new e('close', { fontCharacter: '\\ea76' })),
                (e.removeClose = new e('remove-close', {
                    fontCharacter: '\\ea76',
                })),
                (e.x = new e('x', { fontCharacter: '\\ea76' })),
                (e.repoSync = new e('repo-sync', { fontCharacter: '\\ea77' })),
                (e.sync = new e('sync', { fontCharacter: '\\ea77' })),
                (e.clone = new e('clone', { fontCharacter: '\\ea78' })),
                (e.desktopDownload = new e('desktop-download', {
                    fontCharacter: '\\ea78',
                })),
                (e.beaker = new e('beaker', { fontCharacter: '\\ea79' })),
                (e.microscope = new e('microscope', {
                    fontCharacter: '\\ea79',
                })),
                (e.vm = new e('vm', { fontCharacter: '\\ea7a' })),
                (e.deviceDesktop = new e('device-desktop', {
                    fontCharacter: '\\ea7a',
                })),
                (e.file = new e('file', { fontCharacter: '\\ea7b' })),
                (e.fileText = new e('file-text', { fontCharacter: '\\ea7b' })),
                (e.more = new e('more', { fontCharacter: '\\ea7c' })),
                (e.ellipsis = new e('ellipsis', { fontCharacter: '\\ea7c' })),
                (e.kebabHorizontal = new e('kebab-horizontal', {
                    fontCharacter: '\\ea7c',
                })),
                (e.mailReply = new e('mail-reply', {
                    fontCharacter: '\\ea7d',
                })),
                (e.reply = new e('reply', { fontCharacter: '\\ea7d' })),
                (e.organization = new e('organization', {
                    fontCharacter: '\\ea7e',
                })),
                (e.organizationFilled = new e('organization-filled', {
                    fontCharacter: '\\ea7e',
                })),
                (e.organizationOutline = new e('organization-outline', {
                    fontCharacter: '\\ea7e',
                })),
                (e.newFile = new e('new-file', { fontCharacter: '\\ea7f' })),
                (e.fileAdd = new e('file-add', { fontCharacter: '\\ea7f' })),
                (e.newFolder = new e('new-folder', {
                    fontCharacter: '\\ea80',
                })),
                (e.fileDirectoryCreate = new e('file-directory-create', {
                    fontCharacter: '\\ea80',
                })),
                (e.trash = new e('trash', { fontCharacter: '\\ea81' })),
                (e.trashcan = new e('trashcan', { fontCharacter: '\\ea81' })),
                (e.history = new e('history', { fontCharacter: '\\ea82' })),
                (e.clock = new e('clock', { fontCharacter: '\\ea82' })),
                (e.folder = new e('folder', { fontCharacter: '\\ea83' })),
                (e.fileDirectory = new e('file-directory', {
                    fontCharacter: '\\ea83',
                })),
                (e.symbolFolder = new e('symbol-folder', {
                    fontCharacter: '\\ea83',
                })),
                (e.logoGithub = new e('logo-github', {
                    fontCharacter: '\\ea84',
                })),
                (e.markGithub = new e('mark-github', {
                    fontCharacter: '\\ea84',
                })),
                (e.github = new e('github', { fontCharacter: '\\ea84' })),
                (e.terminal = new e('terminal', { fontCharacter: '\\ea85' })),
                (e.console = new e('console', { fontCharacter: '\\ea85' })),
                (e.repl = new e('repl', { fontCharacter: '\\ea85' })),
                (e.zap = new e('zap', { fontCharacter: '\\ea86' })),
                (e.symbolEvent = new e('symbol-event', {
                    fontCharacter: '\\ea86',
                })),
                (e.error = new e('error', { fontCharacter: '\\ea87' })),
                (e.stop = new e('stop', { fontCharacter: '\\ea87' })),
                (e.variable = new e('variable', { fontCharacter: '\\ea88' })),
                (e.symbolVariable = new e('symbol-variable', {
                    fontCharacter: '\\ea88',
                })),
                (e.array = new e('array', { fontCharacter: '\\ea8a' })),
                (e.symbolArray = new e('symbol-array', {
                    fontCharacter: '\\ea8a',
                })),
                (e.symbolModule = new e('symbol-module', {
                    fontCharacter: '\\ea8b',
                })),
                (e.symbolPackage = new e('symbol-package', {
                    fontCharacter: '\\ea8b',
                })),
                (e.symbolNamespace = new e('symbol-namespace', {
                    fontCharacter: '\\ea8b',
                })),
                (e.symbolObject = new e('symbol-object', {
                    fontCharacter: '\\ea8b',
                })),
                (e.symbolMethod = new e('symbol-method', {
                    fontCharacter: '\\ea8c',
                })),
                (e.symbolFunction = new e('symbol-function', {
                    fontCharacter: '\\ea8c',
                })),
                (e.symbolConstructor = new e('symbol-constructor', {
                    fontCharacter: '\\ea8c',
                })),
                (e.symbolBoolean = new e('symbol-boolean', {
                    fontCharacter: '\\ea8f',
                })),
                (e.symbolNull = new e('symbol-null', {
                    fontCharacter: '\\ea8f',
                })),
                (e.symbolNumeric = new e('symbol-numeric', {
                    fontCharacter: '\\ea90',
                })),
                (e.symbolNumber = new e('symbol-number', {
                    fontCharacter: '\\ea90',
                })),
                (e.symbolStructure = new e('symbol-structure', {
                    fontCharacter: '\\ea91',
                })),
                (e.symbolStruct = new e('symbol-struct', {
                    fontCharacter: '\\ea91',
                })),
                (e.symbolParameter = new e('symbol-parameter', {
                    fontCharacter: '\\ea92',
                })),
                (e.symbolTypeParameter = new e('symbol-type-parameter', {
                    fontCharacter: '\\ea92',
                })),
                (e.symbolKey = new e('symbol-key', {
                    fontCharacter: '\\ea93',
                })),
                (e.symbolText = new e('symbol-text', {
                    fontCharacter: '\\ea93',
                })),
                (e.symbolReference = new e('symbol-reference', {
                    fontCharacter: '\\ea94',
                })),
                (e.goToFile = new e('go-to-file', { fontCharacter: '\\ea94' })),
                (e.symbolEnum = new e('symbol-enum', {
                    fontCharacter: '\\ea95',
                })),
                (e.symbolValue = new e('symbol-value', {
                    fontCharacter: '\\ea95',
                })),
                (e.symbolRuler = new e('symbol-ruler', {
                    fontCharacter: '\\ea96',
                })),
                (e.symbolUnit = new e('symbol-unit', {
                    fontCharacter: '\\ea96',
                })),
                (e.activateBreakpoints = new e('activate-breakpoints', {
                    fontCharacter: '\\ea97',
                })),
                (e.archive = new e('archive', { fontCharacter: '\\ea98' })),
                (e.arrowBoth = new e('arrow-both', {
                    fontCharacter: '\\ea99',
                })),
                (e.arrowDown = new e('arrow-down', {
                    fontCharacter: '\\ea9a',
                })),
                (e.arrowLeft = new e('arrow-left', {
                    fontCharacter: '\\ea9b',
                })),
                (e.arrowRight = new e('arrow-right', {
                    fontCharacter: '\\ea9c',
                })),
                (e.arrowSmallDown = new e('arrow-small-down', {
                    fontCharacter: '\\ea9d',
                })),
                (e.arrowSmallLeft = new e('arrow-small-left', {
                    fontCharacter: '\\ea9e',
                })),
                (e.arrowSmallRight = new e('arrow-small-right', {
                    fontCharacter: '\\ea9f',
                })),
                (e.arrowSmallUp = new e('arrow-small-up', {
                    fontCharacter: '\\eaa0',
                })),
                (e.arrowUp = new e('arrow-up', { fontCharacter: '\\eaa1' })),
                (e.bell = new e('bell', { fontCharacter: '\\eaa2' })),
                (e.bold = new e('bold', { fontCharacter: '\\eaa3' })),
                (e.book = new e('book', { fontCharacter: '\\eaa4' })),
                (e.bookmark = new e('bookmark', { fontCharacter: '\\eaa5' })),
                (e.debugBreakpointConditionalUnverified = new e(
                    'debug-breakpoint-conditional-unverified',
                    { fontCharacter: '\\eaa6' }
                )),
                (e.debugBreakpointConditional = new e(
                    'debug-breakpoint-conditional',
                    { fontCharacter: '\\eaa7' }
                )),
                (e.debugBreakpointConditionalDisabled = new e(
                    'debug-breakpoint-conditional-disabled',
                    { fontCharacter: '\\eaa7' }
                )),
                (e.debugBreakpointDataUnverified = new e(
                    'debug-breakpoint-data-unverified',
                    { fontCharacter: '\\eaa8' }
                )),
                (e.debugBreakpointData = new e('debug-breakpoint-data', {
                    fontCharacter: '\\eaa9',
                })),
                (e.debugBreakpointDataDisabled = new e(
                    'debug-breakpoint-data-disabled',
                    { fontCharacter: '\\eaa9' }
                )),
                (e.debugBreakpointLogUnverified = new e(
                    'debug-breakpoint-log-unverified',
                    { fontCharacter: '\\eaaa' }
                )),
                (e.debugBreakpointLog = new e('debug-breakpoint-log', {
                    fontCharacter: '\\eaab',
                })),
                (e.debugBreakpointLogDisabled = new e(
                    'debug-breakpoint-log-disabled',
                    { fontCharacter: '\\eaab' }
                )),
                (e.briefcase = new e('briefcase', { fontCharacter: '\\eaac' })),
                (e.broadcast = new e('broadcast', { fontCharacter: '\\eaad' })),
                (e.browser = new e('browser', { fontCharacter: '\\eaae' })),
                (e.bug = new e('bug', { fontCharacter: '\\eaaf' })),
                (e.calendar = new e('calendar', { fontCharacter: '\\eab0' })),
                (e.caseSensitive = new e('case-sensitive', {
                    fontCharacter: '\\eab1',
                })),
                (e.check = new e('check', { fontCharacter: '\\eab2' })),
                (e.checklist = new e('checklist', { fontCharacter: '\\eab3' })),
                (e.chevronDown = new e('chevron-down', {
                    fontCharacter: '\\eab4',
                })),
                (e.dropDownButton = new e(
                    'drop-down-button',
                    e.chevronDown.definition
                )),
                (e.chevronLeft = new e('chevron-left', {
                    fontCharacter: '\\eab5',
                })),
                (e.chevronRight = new e('chevron-right', {
                    fontCharacter: '\\eab6',
                })),
                (e.chevronUp = new e('chevron-up', {
                    fontCharacter: '\\eab7',
                })),
                (e.chromeClose = new e('chrome-close', {
                    fontCharacter: '\\eab8',
                })),
                (e.chromeMaximize = new e('chrome-maximize', {
                    fontCharacter: '\\eab9',
                })),
                (e.chromeMinimize = new e('chrome-minimize', {
                    fontCharacter: '\\eaba',
                })),
                (e.chromeRestore = new e('chrome-restore', {
                    fontCharacter: '\\eabb',
                })),
                (e.circleOutline = new e('circle-outline', {
                    fontCharacter: '\\eabc',
                })),
                (e.debugBreakpointUnverified = new e(
                    'debug-breakpoint-unverified',
                    { fontCharacter: '\\eabc' }
                )),
                (e.circleSlash = new e('circle-slash', {
                    fontCharacter: '\\eabd',
                })),
                (e.circuitBoard = new e('circuit-board', {
                    fontCharacter: '\\eabe',
                })),
                (e.clearAll = new e('clear-all', { fontCharacter: '\\eabf' })),
                (e.clippy = new e('clippy', { fontCharacter: '\\eac0' })),
                (e.closeAll = new e('close-all', { fontCharacter: '\\eac1' })),
                (e.cloudDownload = new e('cloud-download', {
                    fontCharacter: '\\eac2',
                })),
                (e.cloudUpload = new e('cloud-upload', {
                    fontCharacter: '\\eac3',
                })),
                (e.code = new e('code', { fontCharacter: '\\eac4' })),
                (e.collapseAll = new e('collapse-all', {
                    fontCharacter: '\\eac5',
                })),
                (e.colorMode = new e('color-mode', {
                    fontCharacter: '\\eac6',
                })),
                (e.commentDiscussion = new e('comment-discussion', {
                    fontCharacter: '\\eac7',
                })),
                (e.compareChanges = new e('compare-changes', {
                    fontCharacter: '\\eafd',
                })),
                (e.creditCard = new e('credit-card', {
                    fontCharacter: '\\eac9',
                })),
                (e.dash = new e('dash', { fontCharacter: '\\eacc' })),
                (e.dashboard = new e('dashboard', { fontCharacter: '\\eacd' })),
                (e.database = new e('database', { fontCharacter: '\\eace' })),
                (e.debugContinue = new e('debug-continue', {
                    fontCharacter: '\\eacf',
                })),
                (e.debugDisconnect = new e('debug-disconnect', {
                    fontCharacter: '\\ead0',
                })),
                (e.debugPause = new e('debug-pause', {
                    fontCharacter: '\\ead1',
                })),
                (e.debugRestart = new e('debug-restart', {
                    fontCharacter: '\\ead2',
                })),
                (e.debugStart = new e('debug-start', {
                    fontCharacter: '\\ead3',
                })),
                (e.debugStepInto = new e('debug-step-into', {
                    fontCharacter: '\\ead4',
                })),
                (e.debugStepOut = new e('debug-step-out', {
                    fontCharacter: '\\ead5',
                })),
                (e.debugStepOver = new e('debug-step-over', {
                    fontCharacter: '\\ead6',
                })),
                (e.debugStop = new e('debug-stop', {
                    fontCharacter: '\\ead7',
                })),
                (e.debug = new e('debug', { fontCharacter: '\\ead8' })),
                (e.deviceCameraVideo = new e('device-camera-video', {
                    fontCharacter: '\\ead9',
                })),
                (e.deviceCamera = new e('device-camera', {
                    fontCharacter: '\\eada',
                })),
                (e.deviceMobile = new e('device-mobile', {
                    fontCharacter: '\\eadb',
                })),
                (e.diffAdded = new e('diff-added', {
                    fontCharacter: '\\eadc',
                })),
                (e.diffIgnored = new e('diff-ignored', {
                    fontCharacter: '\\eadd',
                })),
                (e.diffModified = new e('diff-modified', {
                    fontCharacter: '\\eade',
                })),
                (e.diffRemoved = new e('diff-removed', {
                    fontCharacter: '\\eadf',
                })),
                (e.diffRenamed = new e('diff-renamed', {
                    fontCharacter: '\\eae0',
                })),
                (e.diff = new e('diff', { fontCharacter: '\\eae1' })),
                (e.discard = new e('discard', { fontCharacter: '\\eae2' })),
                (e.editorLayout = new e('editor-layout', {
                    fontCharacter: '\\eae3',
                })),
                (e.emptyWindow = new e('empty-window', {
                    fontCharacter: '\\eae4',
                })),
                (e.exclude = new e('exclude', { fontCharacter: '\\eae5' })),
                (e.extensions = new e('extensions', {
                    fontCharacter: '\\eae6',
                })),
                (e.eyeClosed = new e('eye-closed', {
                    fontCharacter: '\\eae7',
                })),
                (e.fileBinary = new e('file-binary', {
                    fontCharacter: '\\eae8',
                })),
                (e.fileCode = new e('file-code', { fontCharacter: '\\eae9' })),
                (e.fileMedia = new e('file-media', {
                    fontCharacter: '\\eaea',
                })),
                (e.filePdf = new e('file-pdf', { fontCharacter: '\\eaeb' })),
                (e.fileSubmodule = new e('file-submodule', {
                    fontCharacter: '\\eaec',
                })),
                (e.fileSymlinkDirectory = new e('file-symlink-directory', {
                    fontCharacter: '\\eaed',
                })),
                (e.fileSymlinkFile = new e('file-symlink-file', {
                    fontCharacter: '\\eaee',
                })),
                (e.fileZip = new e('file-zip', { fontCharacter: '\\eaef' })),
                (e.files = new e('files', { fontCharacter: '\\eaf0' })),
                (e.filter = new e('filter', { fontCharacter: '\\eaf1' })),
                (e.flame = new e('flame', { fontCharacter: '\\eaf2' })),
                (e.foldDown = new e('fold-down', { fontCharacter: '\\eaf3' })),
                (e.foldUp = new e('fold-up', { fontCharacter: '\\eaf4' })),
                (e.fold = new e('fold', { fontCharacter: '\\eaf5' })),
                (e.folderActive = new e('folder-active', {
                    fontCharacter: '\\eaf6',
                })),
                (e.folderOpened = new e('folder-opened', {
                    fontCharacter: '\\eaf7',
                })),
                (e.gear = new e('gear', { fontCharacter: '\\eaf8' })),
                (e.gift = new e('gift', { fontCharacter: '\\eaf9' })),
                (e.gistSecret = new e('gist-secret', {
                    fontCharacter: '\\eafa',
                })),
                (e.gist = new e('gist', { fontCharacter: '\\eafb' })),
                (e.gitCommit = new e('git-commit', {
                    fontCharacter: '\\eafc',
                })),
                (e.gitCompare = new e('git-compare', {
                    fontCharacter: '\\eafd',
                })),
                (e.gitMerge = new e('git-merge', { fontCharacter: '\\eafe' })),
                (e.githubAction = new e('github-action', {
                    fontCharacter: '\\eaff',
                })),
                (e.githubAlt = new e('github-alt', {
                    fontCharacter: '\\eb00',
                })),
                (e.globe = new e('globe', { fontCharacter: '\\eb01' })),
                (e.grabber = new e('grabber', { fontCharacter: '\\eb02' })),
                (e.graph = new e('graph', { fontCharacter: '\\eb03' })),
                (e.gripper = new e('gripper', { fontCharacter: '\\eb04' })),
                (e.heart = new e('heart', { fontCharacter: '\\eb05' })),
                (e.home = new e('home', { fontCharacter: '\\eb06' })),
                (e.horizontalRule = new e('horizontal-rule', {
                    fontCharacter: '\\eb07',
                })),
                (e.hubot = new e('hubot', { fontCharacter: '\\eb08' })),
                (e.inbox = new e('inbox', { fontCharacter: '\\eb09' })),
                (e.issueClosed = new e('issue-closed', {
                    fontCharacter: '\\eba4',
                })),
                (e.issueReopened = new e('issue-reopened', {
                    fontCharacter: '\\eb0b',
                })),
                (e.issues = new e('issues', { fontCharacter: '\\eb0c' })),
                (e.italic = new e('italic', { fontCharacter: '\\eb0d' })),
                (e.jersey = new e('jersey', { fontCharacter: '\\eb0e' })),
                (e.json = new e('json', { fontCharacter: '\\eb0f' })),
                (e.kebabVertical = new e('kebab-vertical', {
                    fontCharacter: '\\eb10',
                })),
                (e.key = new e('key', { fontCharacter: '\\eb11' })),
                (e.law = new e('law', { fontCharacter: '\\eb12' })),
                (e.lightbulbAutofix = new e('lightbulb-autofix', {
                    fontCharacter: '\\eb13',
                })),
                (e.linkExternal = new e('link-external', {
                    fontCharacter: '\\eb14',
                })),
                (e.link = new e('link', { fontCharacter: '\\eb15' })),
                (e.listOrdered = new e('list-ordered', {
                    fontCharacter: '\\eb16',
                })),
                (e.listUnordered = new e('list-unordered', {
                    fontCharacter: '\\eb17',
                })),
                (e.liveShare = new e('live-share', {
                    fontCharacter: '\\eb18',
                })),
                (e.loading = new e('loading', { fontCharacter: '\\eb19' })),
                (e.location = new e('location', { fontCharacter: '\\eb1a' })),
                (e.mailRead = new e('mail-read', { fontCharacter: '\\eb1b' })),
                (e.mail = new e('mail', { fontCharacter: '\\eb1c' })),
                (e.markdown = new e('markdown', { fontCharacter: '\\eb1d' })),
                (e.megaphone = new e('megaphone', { fontCharacter: '\\eb1e' })),
                (e.mention = new e('mention', { fontCharacter: '\\eb1f' })),
                (e.milestone = new e('milestone', { fontCharacter: '\\eb20' })),
                (e.mortarBoard = new e('mortar-board', {
                    fontCharacter: '\\eb21',
                })),
                (e.move = new e('move', { fontCharacter: '\\eb22' })),
                (e.multipleWindows = new e('multiple-windows', {
                    fontCharacter: '\\eb23',
                })),
                (e.mute = new e('mute', { fontCharacter: '\\eb24' })),
                (e.noNewline = new e('no-newline', {
                    fontCharacter: '\\eb25',
                })),
                (e.note = new e('note', { fontCharacter: '\\eb26' })),
                (e.octoface = new e('octoface', { fontCharacter: '\\eb27' })),
                (e.openPreview = new e('open-preview', {
                    fontCharacter: '\\eb28',
                })),
                (e.package_ = new e('package', { fontCharacter: '\\eb29' })),
                (e.paintcan = new e('paintcan', { fontCharacter: '\\eb2a' })),
                (e.pin = new e('pin', { fontCharacter: '\\eb2b' })),
                (e.play = new e('play', { fontCharacter: '\\eb2c' })),
                (e.run = new e('run', { fontCharacter: '\\eb2c' })),
                (e.plug = new e('plug', { fontCharacter: '\\eb2d' })),
                (e.preserveCase = new e('preserve-case', {
                    fontCharacter: '\\eb2e',
                })),
                (e.preview = new e('preview', { fontCharacter: '\\eb2f' })),
                (e.project = new e('project', { fontCharacter: '\\eb30' })),
                (e.pulse = new e('pulse', { fontCharacter: '\\eb31' })),
                (e.question = new e('question', { fontCharacter: '\\eb32' })),
                (e.quote = new e('quote', { fontCharacter: '\\eb33' })),
                (e.radioTower = new e('radio-tower', {
                    fontCharacter: '\\eb34',
                })),
                (e.reactions = new e('reactions', { fontCharacter: '\\eb35' })),
                (e.references = new e('references', {
                    fontCharacter: '\\eb36',
                })),
                (e.refresh = new e('refresh', { fontCharacter: '\\eb37' })),
                (e.regex = new e('regex', { fontCharacter: '\\eb38' })),
                (e.remoteExplorer = new e('remote-explorer', {
                    fontCharacter: '\\eb39',
                })),
                (e.remote = new e('remote', { fontCharacter: '\\eb3a' })),
                (e.remove = new e('remove', { fontCharacter: '\\eb3b' })),
                (e.replaceAll = new e('replace-all', {
                    fontCharacter: '\\eb3c',
                })),
                (e.replace = new e('replace', { fontCharacter: '\\eb3d' })),
                (e.repoClone = new e('repo-clone', {
                    fontCharacter: '\\eb3e',
                })),
                (e.repoForcePush = new e('repo-force-push', {
                    fontCharacter: '\\eb3f',
                })),
                (e.repoPull = new e('repo-pull', { fontCharacter: '\\eb40' })),
                (e.repoPush = new e('repo-push', { fontCharacter: '\\eb41' })),
                (e.report = new e('report', { fontCharacter: '\\eb42' })),
                (e.requestChanges = new e('request-changes', {
                    fontCharacter: '\\eb43',
                })),
                (e.rocket = new e('rocket', { fontCharacter: '\\eb44' })),
                (e.rootFolderOpened = new e('root-folder-opened', {
                    fontCharacter: '\\eb45',
                })),
                (e.rootFolder = new e('root-folder', {
                    fontCharacter: '\\eb46',
                })),
                (e.rss = new e('rss', { fontCharacter: '\\eb47' })),
                (e.ruby = new e('ruby', { fontCharacter: '\\eb48' })),
                (e.saveAll = new e('save-all', { fontCharacter: '\\eb49' })),
                (e.saveAs = new e('save-as', { fontCharacter: '\\eb4a' })),
                (e.save = new e('save', { fontCharacter: '\\eb4b' })),
                (e.screenFull = new e('screen-full', {
                    fontCharacter: '\\eb4c',
                })),
                (e.screenNormal = new e('screen-normal', {
                    fontCharacter: '\\eb4d',
                })),
                (e.searchStop = new e('search-stop', {
                    fontCharacter: '\\eb4e',
                })),
                (e.server = new e('server', { fontCharacter: '\\eb50' })),
                (e.settingsGear = new e('settings-gear', {
                    fontCharacter: '\\eb51',
                })),
                (e.settings = new e('settings', { fontCharacter: '\\eb52' })),
                (e.shield = new e('shield', { fontCharacter: '\\eb53' })),
                (e.smiley = new e('smiley', { fontCharacter: '\\eb54' })),
                (e.sortPrecedence = new e('sort-precedence', {
                    fontCharacter: '\\eb55',
                })),
                (e.splitHorizontal = new e('split-horizontal', {
                    fontCharacter: '\\eb56',
                })),
                (e.splitVertical = new e('split-vertical', {
                    fontCharacter: '\\eb57',
                })),
                (e.squirrel = new e('squirrel', { fontCharacter: '\\eb58' })),
                (e.starFull = new e('star-full', { fontCharacter: '\\eb59' })),
                (e.starHalf = new e('star-half', { fontCharacter: '\\eb5a' })),
                (e.symbolClass = new e('symbol-class', {
                    fontCharacter: '\\eb5b',
                })),
                (e.symbolColor = new e('symbol-color', {
                    fontCharacter: '\\eb5c',
                })),
                (e.symbolCustomColor = new e('symbol-customcolor', {
                    fontCharacter: '\\eb5c',
                })),
                (e.symbolConstant = new e('symbol-constant', {
                    fontCharacter: '\\eb5d',
                })),
                (e.symbolEnumMember = new e('symbol-enum-member', {
                    fontCharacter: '\\eb5e',
                })),
                (e.symbolField = new e('symbol-field', {
                    fontCharacter: '\\eb5f',
                })),
                (e.symbolFile = new e('symbol-file', {
                    fontCharacter: '\\eb60',
                })),
                (e.symbolInterface = new e('symbol-interface', {
                    fontCharacter: '\\eb61',
                })),
                (e.symbolKeyword = new e('symbol-keyword', {
                    fontCharacter: '\\eb62',
                })),
                (e.symbolMisc = new e('symbol-misc', {
                    fontCharacter: '\\eb63',
                })),
                (e.symbolOperator = new e('symbol-operator', {
                    fontCharacter: '\\eb64',
                })),
                (e.symbolProperty = new e('symbol-property', {
                    fontCharacter: '\\eb65',
                })),
                (e.wrench = new e('wrench', { fontCharacter: '\\eb65' })),
                (e.wrenchSubaction = new e('wrench-subaction', {
                    fontCharacter: '\\eb65',
                })),
                (e.symbolSnippet = new e('symbol-snippet', {
                    fontCharacter: '\\eb66',
                })),
                (e.tasklist = new e('tasklist', { fontCharacter: '\\eb67' })),
                (e.telescope = new e('telescope', { fontCharacter: '\\eb68' })),
                (e.textSize = new e('text-size', { fontCharacter: '\\eb69' })),
                (e.threeBars = new e('three-bars', {
                    fontCharacter: '\\eb6a',
                })),
                (e.thumbsdown = new e('thumbsdown', {
                    fontCharacter: '\\eb6b',
                })),
                (e.thumbsup = new e('thumbsup', { fontCharacter: '\\eb6c' })),
                (e.tools = new e('tools', { fontCharacter: '\\eb6d' })),
                (e.triangleDown = new e('triangle-down', {
                    fontCharacter: '\\eb6e',
                })),
                (e.triangleLeft = new e('triangle-left', {
                    fontCharacter: '\\eb6f',
                })),
                (e.triangleRight = new e('triangle-right', {
                    fontCharacter: '\\eb70',
                })),
                (e.triangleUp = new e('triangle-up', {
                    fontCharacter: '\\eb71',
                })),
                (e.twitter = new e('twitter', { fontCharacter: '\\eb72' })),
                (e.unfold = new e('unfold', { fontCharacter: '\\eb73' })),
                (e.unlock = new e('unlock', { fontCharacter: '\\eb74' })),
                (e.unmute = new e('unmute', { fontCharacter: '\\eb75' })),
                (e.unverified = new e('unverified', {
                    fontCharacter: '\\eb76',
                })),
                (e.verified = new e('verified', { fontCharacter: '\\eb77' })),
                (e.versions = new e('versions', { fontCharacter: '\\eb78' })),
                (e.vmActive = new e('vm-active', { fontCharacter: '\\eb79' })),
                (e.vmOutline = new e('vm-outline', {
                    fontCharacter: '\\eb7a',
                })),
                (e.vmRunning = new e('vm-running', {
                    fontCharacter: '\\eb7b',
                })),
                (e.watch = new e('watch', { fontCharacter: '\\eb7c' })),
                (e.whitespace = new e('whitespace', {
                    fontCharacter: '\\eb7d',
                })),
                (e.wholeWord = new e('whole-word', {
                    fontCharacter: '\\eb7e',
                })),
                (e.window = new e('window', { fontCharacter: '\\eb7f' })),
                (e.wordWrap = new e('word-wrap', { fontCharacter: '\\eb80' })),
                (e.zoomIn = new e('zoom-in', { fontCharacter: '\\eb81' })),
                (e.zoomOut = new e('zoom-out', { fontCharacter: '\\eb82' })),
                (e.listFilter = new e('list-filter', {
                    fontCharacter: '\\eb83',
                })),
                (e.listFlat = new e('list-flat', { fontCharacter: '\\eb84' })),
                (e.listSelection = new e('list-selection', {
                    fontCharacter: '\\eb85',
                })),
                (e.selection = new e('selection', { fontCharacter: '\\eb85' })),
                (e.listTree = new e('list-tree', { fontCharacter: '\\eb86' })),
                (e.debugBreakpointFunctionUnverified = new e(
                    'debug-breakpoint-function-unverified',
                    { fontCharacter: '\\eb87' }
                )),
                (e.debugBreakpointFunction = new e(
                    'debug-breakpoint-function',
                    { fontCharacter: '\\eb88' }
                )),
                (e.debugBreakpointFunctionDisabled = new e(
                    'debug-breakpoint-function-disabled',
                    { fontCharacter: '\\eb88' }
                )),
                (e.debugStackframeActive = new e('debug-stackframe-active', {
                    fontCharacter: '\\eb89',
                })),
                (e.debugStackframeDot = new e('debug-stackframe-dot', {
                    fontCharacter: '\\eb8a',
                })),
                (e.debugStackframe = new e('debug-stackframe', {
                    fontCharacter: '\\eb8b',
                })),
                (e.debugStackframeFocused = new e('debug-stackframe-focused', {
                    fontCharacter: '\\eb8b',
                })),
                (e.debugBreakpointUnsupported = new e(
                    'debug-breakpoint-unsupported',
                    { fontCharacter: '\\eb8c' }
                )),
                (e.symbolString = new e('symbol-string', {
                    fontCharacter: '\\eb8d',
                })),
                (e.debugReverseContinue = new e('debug-reverse-continue', {
                    fontCharacter: '\\eb8e',
                })),
                (e.debugStepBack = new e('debug-step-back', {
                    fontCharacter: '\\eb8f',
                })),
                (e.debugRestartFrame = new e('debug-restart-frame', {
                    fontCharacter: '\\eb90',
                })),
                (e.callIncoming = new e('call-incoming', {
                    fontCharacter: '\\eb92',
                })),
                (e.callOutgoing = new e('call-outgoing', {
                    fontCharacter: '\\eb93',
                })),
                (e.menu = new e('menu', { fontCharacter: '\\eb94' })),
                (e.expandAll = new e('expand-all', {
                    fontCharacter: '\\eb95',
                })),
                (e.feedback = new e('feedback', { fontCharacter: '\\eb96' })),
                (e.groupByRefType = new e('group-by-ref-type', {
                    fontCharacter: '\\eb97',
                })),
                (e.ungroupByRefType = new e('ungroup-by-ref-type', {
                    fontCharacter: '\\eb98',
                })),
                (e.account = new e('account', { fontCharacter: '\\eb99' })),
                (e.bellDot = new e('bell-dot', { fontCharacter: '\\eb9a' })),
                (e.debugConsole = new e('debug-console', {
                    fontCharacter: '\\eb9b',
                })),
                (e.library = new e('library', { fontCharacter: '\\eb9c' })),
                (e.output = new e('output', { fontCharacter: '\\eb9d' })),
                (e.runAll = new e('run-all', { fontCharacter: '\\eb9e' })),
                (e.syncIgnored = new e('sync-ignored', {
                    fontCharacter: '\\eb9f',
                })),
                (e.pinned = new e('pinned', { fontCharacter: '\\eba0' })),
                (e.githubInverted = new e('github-inverted', {
                    fontCharacter: '\\eba1',
                })),
                (e.debugAlt = new e('debug-alt', { fontCharacter: '\\eb91' })),
                (e.serverProcess = new e('server-process', {
                    fontCharacter: '\\eba2',
                })),
                (e.serverEnvironment = new e('server-environment', {
                    fontCharacter: '\\eba3',
                })),
                (e.pass = new e('pass', { fontCharacter: '\\eba4' })),
                (e.stopCircle = new e('stop-circle', {
                    fontCharacter: '\\eba5',
                })),
                (e.playCircle = new e('play-circle', {
                    fontCharacter: '\\eba6',
                })),
                (e.record = new e('record', { fontCharacter: '\\eba7' })),
                (e.debugAltSmall = new e('debug-alt-small', {
                    fontCharacter: '\\eba8',
                })),
                (e.vmConnect = new e('vm-connect', {
                    fontCharacter: '\\eba9',
                })),
                (e.cloud = new e('cloud', { fontCharacter: '\\ebaa' })),
                (e.merge = new e('merge', { fontCharacter: '\\ebab' })),
                (e.exportIcon = new e('export', { fontCharacter: '\\ebac' })),
                (e.graphLeft = new e('graph-left', {
                    fontCharacter: '\\ebad',
                })),
                (e.magnet = new e('magnet', { fontCharacter: '\\ebae' })),
                (e.notebook = new e('notebook', { fontCharacter: '\\ebaf' })),
                (e.redo = new e('redo', { fontCharacter: '\\ebb0' })),
                (e.checkAll = new e('check-all', { fontCharacter: '\\ebb1' })),
                (e.pinnedDirty = new e('pinned-dirty', {
                    fontCharacter: '\\ebb2',
                })),
                (e.passFilled = new e('pass-filled', {
                    fontCharacter: '\\ebb3',
                })),
                (e.circleLargeFilled = new e('circle-large-filled', {
                    fontCharacter: '\\ebb4',
                })),
                (e.circleLargeOutline = new e('circle-large-outline', {
                    fontCharacter: '\\ebb5',
                })),
                (e.combine = new e('combine', { fontCharacter: '\\ebb6' })),
                (e.gather = new e('gather', { fontCharacter: '\\ebb6' })),
                (e.table = new e('table', { fontCharacter: '\\ebb7' })),
                (e.variableGroup = new e('variable-group', {
                    fontCharacter: '\\ebb8',
                })),
                (e.typeHierarchy = new e('type-hierarchy', {
                    fontCharacter: '\\ebb9',
                })),
                (e.typeHierarchySub = new e('type-hierarchy-sub', {
                    fontCharacter: '\\ebba',
                })),
                (e.typeHierarchySuper = new e('type-hierarchy-super', {
                    fontCharacter: '\\ebbb',
                })),
                (e.gitPullRequestCreate = new e('git-pull-request-create', {
                    fontCharacter: '\\ebbc',
                })),
                (e.runAbove = new e('run-above', { fontCharacter: '\\ebbd' })),
                (e.runBelow = new e('run-below', { fontCharacter: '\\ebbe' })),
                (e.notebookTemplate = new e('notebook-template', {
                    fontCharacter: '\\ebbf',
                })),
                (e.debugRerun = new e('debug-rerun', {
                    fontCharacter: '\\ebc0',
                })),
                (e.workspaceTrusted = new e('workspace-trusted', {
                    fontCharacter: '\\ebc1',
                })),
                (e.workspaceUntrusted = new e('workspace-untrusted', {
                    fontCharacter: '\\ebc2',
                })),
                (e.workspaceUnspecified = new e('workspace-unspecified', {
                    fontCharacter: '\\ebc3',
                })),
                (e.terminalCmd = new e('terminal-cmd', {
                    fontCharacter: '\\ebc4',
                })),
                (e.terminalDebian = new e('terminal-debian', {
                    fontCharacter: '\\ebc5',
                })),
                (e.terminalLinux = new e('terminal-linux', {
                    fontCharacter: '\\ebc6',
                })),
                (e.terminalPowershell = new e('terminal-powershell', {
                    fontCharacter: '\\ebc7',
                })),
                (e.terminalTmux = new e('terminal-tmux', {
                    fontCharacter: '\\ebc8',
                })),
                (e.terminalUbuntu = new e('terminal-ubuntu', {
                    fontCharacter: '\\ebc9',
                })),
                (e.terminalBash = new e('terminal-bash', {
                    fontCharacter: '\\ebca',
                })),
                (e.arrowSwap = new e('arrow-swap', {
                    fontCharacter: '\\ebcb',
                })),
                (e.copy = new e('copy', { fontCharacter: '\\ebcc' })),
                (e.personAdd = new e('person-add', {
                    fontCharacter: '\\ebcd',
                })),
                (e.filterFilled = new e('filter-filled', {
                    fontCharacter: '\\ebce',
                })),
                (e.wand = new e('wand', { fontCharacter: '\\ebcf' })),
                (e.debugLineByLine = new e('debug-line-by-line', {
                    fontCharacter: '\\ebd0',
                })),
                (e.inspect = new e('inspect', { fontCharacter: '\\ebd1' })),
                (e.layers = new e('layers', { fontCharacter: '\\ebd2' })),
                (e.layersDot = new e('layers-dot', {
                    fontCharacter: '\\ebd3',
                })),
                (e.layersActive = new e('layers-active', {
                    fontCharacter: '\\ebd4',
                })),
                (e.compass = new e('compass', { fontCharacter: '\\ebd5' })),
                (e.compassDot = new e('compass-dot', {
                    fontCharacter: '\\ebd6',
                })),
                (e.compassActive = new e('compass-active', {
                    fontCharacter: '\\ebd7',
                })),
                (e.azure = new e('azure', { fontCharacter: '\\ebd8' })),
                (e.issueDraft = new e('issue-draft', {
                    fontCharacter: '\\ebd9',
                })),
                (e.gitPullRequestClosed = new e('git-pull-request-closed', {
                    fontCharacter: '\\ebda',
                })),
                (e.gitPullRequestDraft = new e('git-pull-request-draft', {
                    fontCharacter: '\\ebdb',
                })),
                (e.debugAll = new e('debug-all', { fontCharacter: '\\ebdc' })),
                (e.debugCoverage = new e('debug-coverage', {
                    fontCharacter: '\\ebdd',
                })),
                (e.runErrors = new e('run-errors', {
                    fontCharacter: '\\ebde',
                })),
                (e.folderLibrary = new e('folder-library', {
                    fontCharacter: '\\ebdf',
                })),
                (e.debugContinueSmall = new e('debug-continue-small', {
                    fontCharacter: '\\ebe0',
                })),
                (e.beakerStop = new e('beaker-stop', {
                    fontCharacter: '\\ebe1',
                })),
                (e.graphLine = new e('graph-line', {
                    fontCharacter: '\\ebe2',
                })),
                (e.graphScatter = new e('graph-scatter', {
                    fontCharacter: '\\ebe3',
                })),
                (e.pieChart = new e('pie-chart', { fontCharacter: '\\ebe4' })),
                (e.bracket = new e('bracket', e.json.definition)),
                (e.bracketDot = new e('bracket-dot', {
                    fontCharacter: '\\ebe5',
                })),
                (e.bracketError = new e('bracket-error', {
                    fontCharacter: '\\ebe6',
                })),
                (e.lockSmall = new e('lock-small', {
                    fontCharacter: '\\ebe7',
                })),
                (e.azureDevops = new e('azure-devops', {
                    fontCharacter: '\\ebe8',
                })),
                (e.verifiedFilled = new e('verified-filled', {
                    fontCharacter: '\\ebe9',
                })),
                (e.newLine = new e('newline', { fontCharacter: '\\ebea' })),
                (e.layout = new e('layout', { fontCharacter: '\\ebeb' })),
                (e.layoutActivitybarLeft = new e('layout-activitybar-left', {
                    fontCharacter: '\\ebec',
                })),
                (e.layoutActivitybarRight = new e('layout-activitybar-right', {
                    fontCharacter: '\\ebed',
                })),
                (e.layoutPanelLeft = new e('layout-panel-left', {
                    fontCharacter: '\\ebee',
                })),
                (e.layoutPanelCenter = new e('layout-panel-center', {
                    fontCharacter: '\\ebef',
                })),
                (e.layoutPanelJustify = new e('layout-panel-justify', {
                    fontCharacter: '\\ebf0',
                })),
                (e.layoutPanelRight = new e('layout-panel-right', {
                    fontCharacter: '\\ebf1',
                })),
                (e.layoutPanel = new e('layout-panel', {
                    fontCharacter: '\\ebf2',
                })),
                (e.layoutSidebarLeft = new e('layout-sidebar-left', {
                    fontCharacter: '\\ebf3',
                })),
                (e.layoutSidebarRight = new e('layout-sidebar-right', {
                    fontCharacter: '\\ebf4',
                })),
                (e.layoutStatusbar = new e('layout-statusbar', {
                    fontCharacter: '\\ebf5',
                })),
                (e.layoutMenubar = new e('layout-menubar', {
                    fontCharacter: '\\ebf6',
                })),
                (e.layoutCentered = new e('layout-centered', {
                    fontCharacter: '\\ebf7',
                })),
                (e.target = new e('target', { fontCharacter: '\\ebf8' })),
                (e.indent = new e('indent', { fontCharacter: '\\ebf9' })),
                (e.recordSmall = new e('record-small', {
                    fontCharacter: '\\ebfa',
                })),
                (e.errorSmall = new e('error-small', {
                    fontCharacter: '\\ebfb',
                })),
                (e.arrowCircleDown = new e('arrow-circle-down', {
                    fontCharacter: '\\ebfc',
                })),
                (e.arrowCircleLeft = new e('arrow-circle-left', {
                    fontCharacter: '\\ebfd',
                })),
                (e.arrowCircleRight = new e('arrow-circle-right', {
                    fontCharacter: '\\ebfe',
                })),
                (e.arrowCircleUp = new e('arrow-circle-up', {
                    fontCharacter: '\\ebff',
                })),
                (e.dialogError = new e('dialog-error', e.error.definition)),
                (e.dialogWarning = new e(
                    'dialog-warning',
                    e.warning.definition
                )),
                (e.dialogInfo = new e('dialog-info', e.info.definition)),
                (e.dialogClose = new e('dialog-close', e.close.definition)),
                (e.treeItemExpanded = new e(
                    'tree-item-expanded',
                    e.chevronDown.definition
                )),
                (e.treeFilterOnTypeOn = new e(
                    'tree-filter-on-type-on',
                    e.listFilter.definition
                )),
                (e.treeFilterOnTypeOff = new e(
                    'tree-filter-on-type-off',
                    e.listSelection.definition
                )),
                (e.treeFilterClear = new e(
                    'tree-filter-clear',
                    e.close.definition
                )),
                (e.treeItemLoading = new e(
                    'tree-item-loading',
                    e.loading.definition
                )),
                (e.menuSelection = new e('menu-selection', e.check.definition)),
                (e.menuSubmenu = new e(
                    'menu-submenu',
                    e.chevronRight.definition
                )),
                (e.menuBarMore = new e('menubar-more', e.more.definition)),
                (e.scrollbarButtonLeft = new e(
                    'scrollbar-button-left',
                    e.triangleLeft.definition
                )),
                (e.scrollbarButtonRight = new e(
                    'scrollbar-button-right',
                    e.triangleRight.definition
                )),
                (e.scrollbarButtonUp = new e(
                    'scrollbar-button-up',
                    e.triangleUp.definition
                )),
                (e.scrollbarButtonDown = new e(
                    'scrollbar-button-down',
                    e.triangleDown.definition
                )),
                (e.toolBarMore = new e('toolbar-more', e.more.definition)),
                (e.quickInputBack = new e(
                    'quick-input-back',
                    e.arrowLeft.definition
                ));
            var N;
            (function (o) {
                (o.iconNameSegment = '[A-Za-z0-9]+'),
                    (o.iconNameExpression = '[A-Za-z0-9-]+'),
                    (o.iconModifierExpression = '~[A-Za-z]+'),
                    (o.iconNameCharacter = '[A-Za-z0-9~-]');
                const w = new RegExp(
                    `^(${o.iconNameExpression})(${o.iconModifierExpression})?$`
                );
                function g(S) {
                    if (S instanceof e) return ['codicon', 'codicon-' + S.id];
                    const t = w.exec(S.id);
                    if (!t) return g(e.error);
                    let [, d, h] = t;
                    const v = ['codicon', 'codicon-' + d];
                    return h && v.push('codicon-modifier-' + h.substr(1)), v;
                }
                o.asClassNameArray = g;
                function c(S) {
                    return g(S).join(' ');
                }
                o.asClassName = c;
                function m(S) {
                    return '.' + g(S).join('.');
                }
                o.asCSSSelector = m;
            })((N = r.CSSIcon || (r.CSSIcon = {})));
        }),
        Y(Q[19], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.DiffChange = void 0);
            class E {
                constructor(N, o, w, g) {
                    (this.originalStart = N),
                        (this.originalLength = o),
                        (this.modifiedStart = w),
                        (this.modifiedLength = g);
                }
                getOriginalEnd() {
                    return this.originalStart + this.originalLength;
                }
                getModifiedEnd() {
                    return this.modifiedStart + this.modifiedLength;
                }
            }
            r.DiffChange = E;
        }),
        Y(Q[10], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.NotSupportedError =
                    r.illegalState =
                    r.illegalArgument =
                    r.canceled =
                    r.CancellationError =
                    r.isCancellationError =
                    r.transformErrorForSerialization =
                    r.onUnexpectedExternalError =
                    r.onUnexpectedError =
                    r.errorHandler =
                    r.ErrorHandler =
                        void 0);
            class E {
                constructor() {
                    (this.listeners = []),
                        (this.unexpectedErrorHandler = function (v) {
                            setTimeout(() => {
                                throw v.stack
                                    ? new Error(
                                          v.message +
                                              `

` +
                                              v.stack
                                      )
                                    : v;
                            }, 0);
                        });
                }
                emit(v) {
                    this.listeners.forEach((L) => {
                        L(v);
                    });
                }
                onUnexpectedError(v) {
                    this.unexpectedErrorHandler(v), this.emit(v);
                }
                onUnexpectedExternalError(v) {
                    this.unexpectedErrorHandler(v);
                }
            }
            (r.ErrorHandler = E), (r.errorHandler = new E());
            function e(h) {
                g(h) || r.errorHandler.onUnexpectedError(h);
            }
            r.onUnexpectedError = e;
            function N(h) {
                g(h) || r.errorHandler.onUnexpectedExternalError(h);
            }
            r.onUnexpectedExternalError = N;
            function o(h) {
                if (h instanceof Error) {
                    let { name: v, message: L } = h;
                    const C = h.stacktrace || h.stack;
                    return { $isError: !0, name: v, message: L, stack: C };
                }
                return h;
            }
            r.transformErrorForSerialization = o;
            const w = 'Canceled';
            function g(h) {
                return h instanceof c
                    ? !0
                    : h instanceof Error && h.name === w && h.message === w;
            }
            r.isCancellationError = g;
            class c extends Error {
                constructor() {
                    super(w);
                    this.name = this.message;
                }
            }
            r.CancellationError = c;
            function m() {
                const h = new Error(w);
                return (h.name = h.message), h;
            }
            r.canceled = m;
            function S(h) {
                return h
                    ? new Error(`Illegal argument: ${h}`)
                    : new Error('Illegal argument');
            }
            r.illegalArgument = S;
            function t(h) {
                return h
                    ? new Error(`Illegal state: ${h}`)
                    : new Error('Illegal state');
            }
            r.illegalState = t;
            class d extends Error {
                constructor(v) {
                    super('NotSupported');
                    v && (this.message = v);
                }
            }
            r.NotSupportedError = d;
        }),
        Y(Q[20], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.once = void 0);
            function E(e) {
                const N = this;
                let o = !1,
                    w;
                return function () {
                    return o || ((o = !0), (w = e.apply(N, arguments))), w;
                };
            }
            r.once = E;
        }),
        Y(Q[21], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Iterable = void 0);
            var E;
            (function (e) {
                function N(a) {
                    return (
                        a &&
                        typeof a == 'object' &&
                        typeof a[Symbol.iterator] == 'function'
                    );
                }
                e.is = N;
                const o = Object.freeze([]);
                function w() {
                    return o;
                }
                e.empty = w;
                function* g(a) {
                    yield a;
                }
                e.single = g;
                function c(a) {
                    return a || o;
                }
                e.from = c;
                function m(a) {
                    return !a || a[Symbol.iterator]().next().done === !0;
                }
                e.isEmpty = m;
                function S(a) {
                    return a[Symbol.iterator]().next().value;
                }
                e.first = S;
                function t(a, l) {
                    for (const f of a) if (l(f)) return !0;
                    return !1;
                }
                e.some = t;
                function d(a, l) {
                    for (const f of a) if (l(f)) return f;
                }
                e.find = d;
                function* h(a, l) {
                    for (const f of a) l(f) && (yield f);
                }
                e.filter = h;
                function* v(a, l) {
                    let f = 0;
                    for (const u of a) yield l(u, f++);
                }
                e.map = v;
                function* L(...a) {
                    for (const l of a) for (const f of l) yield f;
                }
                e.concat = L;
                function* C(a) {
                    for (const l of a) for (const f of l) yield f;
                }
                e.concatNested = C;
                function y(a, l, f) {
                    let u = f;
                    for (const _ of a) u = l(u, _);
                    return u;
                }
                e.reduce = y;
                function* p(a, l, f = a.length) {
                    for (
                        l < 0 && (l += a.length),
                            f < 0
                                ? (f += a.length)
                                : f > a.length && (f = a.length);
                        l < f;
                        l++
                    )
                        yield a[l];
                }
                e.slice = p;
                function s(a, l = Number.POSITIVE_INFINITY) {
                    const f = [];
                    if (l === 0) return [f, a];
                    const u = a[Symbol.iterator]();
                    for (let _ = 0; _ < l; _++) {
                        const b = u.next();
                        if (b.done) return [f, e.empty()];
                        f.push(b.value);
                    }
                    return [
                        f,
                        {
                            [Symbol.iterator]() {
                                return u;
                            },
                        },
                    ];
                }
                e.consume = s;
                function i(a, l, f = (u, _) => u === _) {
                    const u = a[Symbol.iterator](),
                        _ = l[Symbol.iterator]();
                    for (;;) {
                        const b = u.next(),
                            A = _.next();
                        if (b.done !== A.done) return !1;
                        if (b.done) return !0;
                        if (!f(b.value, A.value)) return !1;
                    }
                }
                e.equals = i;
            })((E = r.Iterable || (r.Iterable = {})));
        }),
        Y(Q[22], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.KeyChord =
                    r.KeyCodeUtils =
                    r.IMMUTABLE_KEY_CODE_TO_CODE =
                    r.IMMUTABLE_CODE_TO_KEY_CODE =
                    r.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE =
                    r.EVENT_KEY_CODE_MAP =
                        void 0);
            class E {
                constructor() {
                    (this._keyCodeToStr = []),
                        (this._strToKeyCode = Object.create(null));
                }
                define(d, h) {
                    (this._keyCodeToStr[d] = h),
                        (this._strToKeyCode[h.toLowerCase()] = d);
                }
                keyCodeToStr(d) {
                    return this._keyCodeToStr[d];
                }
                strToKeyCode(d) {
                    return this._strToKeyCode[d.toLowerCase()] || 0;
                }
            }
            const e = new E(),
                N = new E(),
                o = new E();
            (r.EVENT_KEY_CODE_MAP = new Array(230)),
                (r.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {});
            const w = [],
                g = Object.create(null),
                c = Object.create(null);
            (r.IMMUTABLE_CODE_TO_KEY_CODE = []),
                (r.IMMUTABLE_KEY_CODE_TO_CODE = []);
            for (let t = 0; t <= 193; t++) r.IMMUTABLE_CODE_TO_KEY_CODE[t] = -1;
            for (let t = 0; t <= 127; t++) r.IMMUTABLE_KEY_CODE_TO_CODE[t] = -1;
            (function () {
                const t = '',
                    d = [
                        [0, 1, 0, 'None', 0, 'unknown', 0, 'VK_UNKNOWN', t, t],
                        [0, 1, 1, 'Hyper', 0, t, 0, t, t, t],
                        [0, 1, 2, 'Super', 0, t, 0, t, t, t],
                        [0, 1, 3, 'Fn', 0, t, 0, t, t, t],
                        [0, 1, 4, 'FnLock', 0, t, 0, t, t, t],
                        [0, 1, 5, 'Suspend', 0, t, 0, t, t, t],
                        [0, 1, 6, 'Resume', 0, t, 0, t, t, t],
                        [0, 1, 7, 'Turbo', 0, t, 0, t, t, t],
                        [0, 1, 8, 'Sleep', 0, t, 0, 'VK_SLEEP', t, t],
                        [0, 1, 9, 'WakeUp', 0, t, 0, t, t, t],
                        [31, 0, 10, 'KeyA', 31, 'A', 65, 'VK_A', t, t],
                        [32, 0, 11, 'KeyB', 32, 'B', 66, 'VK_B', t, t],
                        [33, 0, 12, 'KeyC', 33, 'C', 67, 'VK_C', t, t],
                        [34, 0, 13, 'KeyD', 34, 'D', 68, 'VK_D', t, t],
                        [35, 0, 14, 'KeyE', 35, 'E', 69, 'VK_E', t, t],
                        [36, 0, 15, 'KeyF', 36, 'F', 70, 'VK_F', t, t],
                        [37, 0, 16, 'KeyG', 37, 'G', 71, 'VK_G', t, t],
                        [38, 0, 17, 'KeyH', 38, 'H', 72, 'VK_H', t, t],
                        [39, 0, 18, 'KeyI', 39, 'I', 73, 'VK_I', t, t],
                        [40, 0, 19, 'KeyJ', 40, 'J', 74, 'VK_J', t, t],
                        [41, 0, 20, 'KeyK', 41, 'K', 75, 'VK_K', t, t],
                        [42, 0, 21, 'KeyL', 42, 'L', 76, 'VK_L', t, t],
                        [43, 0, 22, 'KeyM', 43, 'M', 77, 'VK_M', t, t],
                        [44, 0, 23, 'KeyN', 44, 'N', 78, 'VK_N', t, t],
                        [45, 0, 24, 'KeyO', 45, 'O', 79, 'VK_O', t, t],
                        [46, 0, 25, 'KeyP', 46, 'P', 80, 'VK_P', t, t],
                        [47, 0, 26, 'KeyQ', 47, 'Q', 81, 'VK_Q', t, t],
                        [48, 0, 27, 'KeyR', 48, 'R', 82, 'VK_R', t, t],
                        [49, 0, 28, 'KeyS', 49, 'S', 83, 'VK_S', t, t],
                        [50, 0, 29, 'KeyT', 50, 'T', 84, 'VK_T', t, t],
                        [51, 0, 30, 'KeyU', 51, 'U', 85, 'VK_U', t, t],
                        [52, 0, 31, 'KeyV', 52, 'V', 86, 'VK_V', t, t],
                        [53, 0, 32, 'KeyW', 53, 'W', 87, 'VK_W', t, t],
                        [54, 0, 33, 'KeyX', 54, 'X', 88, 'VK_X', t, t],
                        [55, 0, 34, 'KeyY', 55, 'Y', 89, 'VK_Y', t, t],
                        [56, 0, 35, 'KeyZ', 56, 'Z', 90, 'VK_Z', t, t],
                        [22, 0, 36, 'Digit1', 22, '1', 49, 'VK_1', t, t],
                        [23, 0, 37, 'Digit2', 23, '2', 50, 'VK_2', t, t],
                        [24, 0, 38, 'Digit3', 24, '3', 51, 'VK_3', t, t],
                        [25, 0, 39, 'Digit4', 25, '4', 52, 'VK_4', t, t],
                        [26, 0, 40, 'Digit5', 26, '5', 53, 'VK_5', t, t],
                        [27, 0, 41, 'Digit6', 27, '6', 54, 'VK_6', t, t],
                        [28, 0, 42, 'Digit7', 28, '7', 55, 'VK_7', t, t],
                        [29, 0, 43, 'Digit8', 29, '8', 56, 'VK_8', t, t],
                        [30, 0, 44, 'Digit9', 30, '9', 57, 'VK_9', t, t],
                        [21, 0, 45, 'Digit0', 21, '0', 48, 'VK_0', t, t],
                        [3, 1, 46, 'Enter', 3, 'Enter', 13, 'VK_RETURN', t, t],
                        [
                            9,
                            1,
                            47,
                            'Escape',
                            9,
                            'Escape',
                            27,
                            'VK_ESCAPE',
                            t,
                            t,
                        ],
                        [
                            1,
                            1,
                            48,
                            'Backspace',
                            1,
                            'Backspace',
                            8,
                            'VK_BACK',
                            t,
                            t,
                        ],
                        [2, 1, 49, 'Tab', 2, 'Tab', 9, 'VK_TAB', t, t],
                        [10, 1, 50, 'Space', 10, 'Space', 32, 'VK_SPACE', t, t],
                        [
                            83,
                            0,
                            51,
                            'Minus',
                            83,
                            '-',
                            189,
                            'VK_OEM_MINUS',
                            '-',
                            'OEM_MINUS',
                        ],
                        [
                            81,
                            0,
                            52,
                            'Equal',
                            81,
                            '=',
                            187,
                            'VK_OEM_PLUS',
                            '=',
                            'OEM_PLUS',
                        ],
                        [
                            87,
                            0,
                            53,
                            'BracketLeft',
                            87,
                            '[',
                            219,
                            'VK_OEM_4',
                            '[',
                            'OEM_4',
                        ],
                        [
                            89,
                            0,
                            54,
                            'BracketRight',
                            89,
                            ']',
                            221,
                            'VK_OEM_6',
                            ']',
                            'OEM_6',
                        ],
                        [
                            88,
                            0,
                            55,
                            'Backslash',
                            88,
                            '\\',
                            220,
                            'VK_OEM_5',
                            '\\',
                            'OEM_5',
                        ],
                        [0, 0, 56, 'IntlHash', 0, t, 0, t, t, t],
                        [
                            80,
                            0,
                            57,
                            'Semicolon',
                            80,
                            ';',
                            186,
                            'VK_OEM_1',
                            ';',
                            'OEM_1',
                        ],
                        [
                            90,
                            0,
                            58,
                            'Quote',
                            90,
                            "'",
                            222,
                            'VK_OEM_7',
                            "'",
                            'OEM_7',
                        ],
                        [
                            86,
                            0,
                            59,
                            'Backquote',
                            86,
                            '`',
                            192,
                            'VK_OEM_3',
                            '`',
                            'OEM_3',
                        ],
                        [
                            82,
                            0,
                            60,
                            'Comma',
                            82,
                            ',',
                            188,
                            'VK_OEM_COMMA',
                            ',',
                            'OEM_COMMA',
                        ],
                        [
                            84,
                            0,
                            61,
                            'Period',
                            84,
                            '.',
                            190,
                            'VK_OEM_PERIOD',
                            '.',
                            'OEM_PERIOD',
                        ],
                        [
                            85,
                            0,
                            62,
                            'Slash',
                            85,
                            '/',
                            191,
                            'VK_OEM_2',
                            '/',
                            'OEM_2',
                        ],
                        [
                            8,
                            1,
                            63,
                            'CapsLock',
                            8,
                            'CapsLock',
                            20,
                            'VK_CAPITAL',
                            t,
                            t,
                        ],
                        [59, 1, 64, 'F1', 59, 'F1', 112, 'VK_F1', t, t],
                        [60, 1, 65, 'F2', 60, 'F2', 113, 'VK_F2', t, t],
                        [61, 1, 66, 'F3', 61, 'F3', 114, 'VK_F3', t, t],
                        [62, 1, 67, 'F4', 62, 'F4', 115, 'VK_F4', t, t],
                        [63, 1, 68, 'F5', 63, 'F5', 116, 'VK_F5', t, t],
                        [64, 1, 69, 'F6', 64, 'F6', 117, 'VK_F6', t, t],
                        [65, 1, 70, 'F7', 65, 'F7', 118, 'VK_F7', t, t],
                        [66, 1, 71, 'F8', 66, 'F8', 119, 'VK_F8', t, t],
                        [67, 1, 72, 'F9', 67, 'F9', 120, 'VK_F9', t, t],
                        [68, 1, 73, 'F10', 68, 'F10', 121, 'VK_F10', t, t],
                        [69, 1, 74, 'F11', 69, 'F11', 122, 'VK_F11', t, t],
                        [70, 1, 75, 'F12', 70, 'F12', 123, 'VK_F12', t, t],
                        [0, 1, 76, 'PrintScreen', 0, t, 0, t, t, t],
                        [
                            79,
                            1,
                            77,
                            'ScrollLock',
                            79,
                            'ScrollLock',
                            145,
                            'VK_SCROLL',
                            t,
                            t,
                        ],
                        [
                            7,
                            1,
                            78,
                            'Pause',
                            7,
                            'PauseBreak',
                            19,
                            'VK_PAUSE',
                            t,
                            t,
                        ],
                        [
                            19,
                            1,
                            79,
                            'Insert',
                            19,
                            'Insert',
                            45,
                            'VK_INSERT',
                            t,
                            t,
                        ],
                        [14, 1, 80, 'Home', 14, 'Home', 36, 'VK_HOME', t, t],
                        [
                            11,
                            1,
                            81,
                            'PageUp',
                            11,
                            'PageUp',
                            33,
                            'VK_PRIOR',
                            t,
                            t,
                        ],
                        [
                            20,
                            1,
                            82,
                            'Delete',
                            20,
                            'Delete',
                            46,
                            'VK_DELETE',
                            t,
                            t,
                        ],
                        [13, 1, 83, 'End', 13, 'End', 35, 'VK_END', t, t],
                        [
                            12,
                            1,
                            84,
                            'PageDown',
                            12,
                            'PageDown',
                            34,
                            'VK_NEXT',
                            t,
                            t,
                        ],
                        [
                            17,
                            1,
                            85,
                            'ArrowRight',
                            17,
                            'RightArrow',
                            39,
                            'VK_RIGHT',
                            'Right',
                            t,
                        ],
                        [
                            15,
                            1,
                            86,
                            'ArrowLeft',
                            15,
                            'LeftArrow',
                            37,
                            'VK_LEFT',
                            'Left',
                            t,
                        ],
                        [
                            18,
                            1,
                            87,
                            'ArrowDown',
                            18,
                            'DownArrow',
                            40,
                            'VK_DOWN',
                            'Down',
                            t,
                        ],
                        [
                            16,
                            1,
                            88,
                            'ArrowUp',
                            16,
                            'UpArrow',
                            38,
                            'VK_UP',
                            'Up',
                            t,
                        ],
                        [
                            78,
                            1,
                            89,
                            'NumLock',
                            78,
                            'NumLock',
                            144,
                            'VK_NUMLOCK',
                            t,
                            t,
                        ],
                        [
                            108,
                            1,
                            90,
                            'NumpadDivide',
                            108,
                            'NumPad_Divide',
                            111,
                            'VK_DIVIDE',
                            t,
                            t,
                        ],
                        [
                            103,
                            1,
                            91,
                            'NumpadMultiply',
                            103,
                            'NumPad_Multiply',
                            106,
                            'VK_MULTIPLY',
                            t,
                            t,
                        ],
                        [
                            106,
                            1,
                            92,
                            'NumpadSubtract',
                            106,
                            'NumPad_Subtract',
                            109,
                            'VK_SUBTRACT',
                            t,
                            t,
                        ],
                        [
                            104,
                            1,
                            93,
                            'NumpadAdd',
                            104,
                            'NumPad_Add',
                            107,
                            'VK_ADD',
                            t,
                            t,
                        ],
                        [3, 1, 94, 'NumpadEnter', 3, t, 0, t, t, t],
                        [
                            94,
                            1,
                            95,
                            'Numpad1',
                            94,
                            'NumPad1',
                            97,
                            'VK_NUMPAD1',
                            t,
                            t,
                        ],
                        [
                            95,
                            1,
                            96,
                            'Numpad2',
                            95,
                            'NumPad2',
                            98,
                            'VK_NUMPAD2',
                            t,
                            t,
                        ],
                        [
                            96,
                            1,
                            97,
                            'Numpad3',
                            96,
                            'NumPad3',
                            99,
                            'VK_NUMPAD3',
                            t,
                            t,
                        ],
                        [
                            97,
                            1,
                            98,
                            'Numpad4',
                            97,
                            'NumPad4',
                            100,
                            'VK_NUMPAD4',
                            t,
                            t,
                        ],
                        [
                            98,
                            1,
                            99,
                            'Numpad5',
                            98,
                            'NumPad5',
                            101,
                            'VK_NUMPAD5',
                            t,
                            t,
                        ],
                        [
                            99,
                            1,
                            100,
                            'Numpad6',
                            99,
                            'NumPad6',
                            102,
                            'VK_NUMPAD6',
                            t,
                            t,
                        ],
                        [
                            100,
                            1,
                            101,
                            'Numpad7',
                            100,
                            'NumPad7',
                            103,
                            'VK_NUMPAD7',
                            t,
                            t,
                        ],
                        [
                            101,
                            1,
                            102,
                            'Numpad8',
                            101,
                            'NumPad8',
                            104,
                            'VK_NUMPAD8',
                            t,
                            t,
                        ],
                        [
                            102,
                            1,
                            103,
                            'Numpad9',
                            102,
                            'NumPad9',
                            105,
                            'VK_NUMPAD9',
                            t,
                            t,
                        ],
                        [
                            93,
                            1,
                            104,
                            'Numpad0',
                            93,
                            'NumPad0',
                            96,
                            'VK_NUMPAD0',
                            t,
                            t,
                        ],
                        [
                            107,
                            1,
                            105,
                            'NumpadDecimal',
                            107,
                            'NumPad_Decimal',
                            110,
                            'VK_DECIMAL',
                            t,
                            t,
                        ],
                        [
                            92,
                            0,
                            106,
                            'IntlBackslash',
                            92,
                            'OEM_102',
                            226,
                            'VK_OEM_102',
                            t,
                            t,
                        ],
                        [
                            58,
                            1,
                            107,
                            'ContextMenu',
                            58,
                            'ContextMenu',
                            93,
                            t,
                            t,
                            t,
                        ],
                        [0, 1, 108, 'Power', 0, t, 0, t, t, t],
                        [0, 1, 109, 'NumpadEqual', 0, t, 0, t, t, t],
                        [71, 1, 110, 'F13', 71, 'F13', 124, 'VK_F13', t, t],
                        [72, 1, 111, 'F14', 72, 'F14', 125, 'VK_F14', t, t],
                        [73, 1, 112, 'F15', 73, 'F15', 126, 'VK_F15', t, t],
                        [74, 1, 113, 'F16', 74, 'F16', 127, 'VK_F16', t, t],
                        [75, 1, 114, 'F17', 75, 'F17', 128, 'VK_F17', t, t],
                        [76, 1, 115, 'F18', 76, 'F18', 129, 'VK_F18', t, t],
                        [77, 1, 116, 'F19', 77, 'F19', 130, 'VK_F19', t, t],
                        [0, 1, 117, 'F20', 0, t, 0, 'VK_F20', t, t],
                        [0, 1, 118, 'F21', 0, t, 0, 'VK_F21', t, t],
                        [0, 1, 119, 'F22', 0, t, 0, 'VK_F22', t, t],
                        [0, 1, 120, 'F23', 0, t, 0, 'VK_F23', t, t],
                        [0, 1, 121, 'F24', 0, t, 0, 'VK_F24', t, t],
                        [0, 1, 122, 'Open', 0, t, 0, t, t, t],
                        [0, 1, 123, 'Help', 0, t, 0, t, t, t],
                        [0, 1, 124, 'Select', 0, t, 0, t, t, t],
                        [0, 1, 125, 'Again', 0, t, 0, t, t, t],
                        [0, 1, 126, 'Undo', 0, t, 0, t, t, t],
                        [0, 1, 127, 'Cut', 0, t, 0, t, t, t],
                        [0, 1, 128, 'Copy', 0, t, 0, t, t, t],
                        [0, 1, 129, 'Paste', 0, t, 0, t, t, t],
                        [0, 1, 130, 'Find', 0, t, 0, t, t, t],
                        [
                            0,
                            1,
                            131,
                            'AudioVolumeMute',
                            112,
                            'AudioVolumeMute',
                            173,
                            'VK_VOLUME_MUTE',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            132,
                            'AudioVolumeUp',
                            113,
                            'AudioVolumeUp',
                            175,
                            'VK_VOLUME_UP',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            133,
                            'AudioVolumeDown',
                            114,
                            'AudioVolumeDown',
                            174,
                            'VK_VOLUME_DOWN',
                            t,
                            t,
                        ],
                        [
                            105,
                            1,
                            134,
                            'NumpadComma',
                            105,
                            'NumPad_Separator',
                            108,
                            'VK_SEPARATOR',
                            t,
                            t,
                        ],
                        [
                            110,
                            0,
                            135,
                            'IntlRo',
                            110,
                            'ABNT_C1',
                            193,
                            'VK_ABNT_C1',
                            t,
                            t,
                        ],
                        [0, 1, 136, 'KanaMode', 0, t, 0, t, t, t],
                        [0, 0, 137, 'IntlYen', 0, t, 0, t, t, t],
                        [0, 1, 138, 'Convert', 0, t, 0, t, t, t],
                        [0, 1, 139, 'NonConvert', 0, t, 0, t, t, t],
                        [0, 1, 140, 'Lang1', 0, t, 0, t, t, t],
                        [0, 1, 141, 'Lang2', 0, t, 0, t, t, t],
                        [0, 1, 142, 'Lang3', 0, t, 0, t, t, t],
                        [0, 1, 143, 'Lang4', 0, t, 0, t, t, t],
                        [0, 1, 144, 'Lang5', 0, t, 0, t, t, t],
                        [0, 1, 145, 'Abort', 0, t, 0, t, t, t],
                        [0, 1, 146, 'Props', 0, t, 0, t, t, t],
                        [0, 1, 147, 'NumpadParenLeft', 0, t, 0, t, t, t],
                        [0, 1, 148, 'NumpadParenRight', 0, t, 0, t, t, t],
                        [0, 1, 149, 'NumpadBackspace', 0, t, 0, t, t, t],
                        [0, 1, 150, 'NumpadMemoryStore', 0, t, 0, t, t, t],
                        [0, 1, 151, 'NumpadMemoryRecall', 0, t, 0, t, t, t],
                        [0, 1, 152, 'NumpadMemoryClear', 0, t, 0, t, t, t],
                        [0, 1, 153, 'NumpadMemoryAdd', 0, t, 0, t, t, t],
                        [0, 1, 154, 'NumpadMemorySubtract', 0, t, 0, t, t, t],
                        [
                            0,
                            1,
                            155,
                            'NumpadClear',
                            126,
                            'Clear',
                            12,
                            'VK_CLEAR',
                            t,
                            t,
                        ],
                        [0, 1, 156, 'NumpadClearEntry', 0, t, 0, t, t, t],
                        [5, 1, 0, t, 5, 'Ctrl', 17, 'VK_CONTROL', t, t],
                        [4, 1, 0, t, 4, 'Shift', 16, 'VK_SHIFT', t, t],
                        [6, 1, 0, t, 6, 'Alt', 18, 'VK_MENU', t, t],
                        [57, 1, 0, t, 57, 'Meta', 0, 'VK_COMMAND', t, t],
                        [
                            5,
                            1,
                            157,
                            'ControlLeft',
                            5,
                            t,
                            0,
                            'VK_LCONTROL',
                            t,
                            t,
                        ],
                        [4, 1, 158, 'ShiftLeft', 4, t, 0, 'VK_LSHIFT', t, t],
                        [6, 1, 159, 'AltLeft', 6, t, 0, 'VK_LMENU', t, t],
                        [57, 1, 160, 'MetaLeft', 57, t, 0, 'VK_LWIN', t, t],
                        [
                            5,
                            1,
                            161,
                            'ControlRight',
                            5,
                            t,
                            0,
                            'VK_RCONTROL',
                            t,
                            t,
                        ],
                        [4, 1, 162, 'ShiftRight', 4, t, 0, 'VK_RSHIFT', t, t],
                        [6, 1, 163, 'AltRight', 6, t, 0, 'VK_RMENU', t, t],
                        [57, 1, 164, 'MetaRight', 57, t, 0, 'VK_RWIN', t, t],
                        [0, 1, 165, 'BrightnessUp', 0, t, 0, t, t, t],
                        [0, 1, 166, 'BrightnessDown', 0, t, 0, t, t, t],
                        [0, 1, 167, 'MediaPlay', 0, t, 0, t, t, t],
                        [0, 1, 168, 'MediaRecord', 0, t, 0, t, t, t],
                        [0, 1, 169, 'MediaFastForward', 0, t, 0, t, t, t],
                        [0, 1, 170, 'MediaRewind', 0, t, 0, t, t, t],
                        [
                            114,
                            1,
                            171,
                            'MediaTrackNext',
                            119,
                            'MediaTrackNext',
                            176,
                            'VK_MEDIA_NEXT_TRACK',
                            t,
                            t,
                        ],
                        [
                            115,
                            1,
                            172,
                            'MediaTrackPrevious',
                            120,
                            'MediaTrackPrevious',
                            177,
                            'VK_MEDIA_PREV_TRACK',
                            t,
                            t,
                        ],
                        [
                            116,
                            1,
                            173,
                            'MediaStop',
                            121,
                            'MediaStop',
                            178,
                            'VK_MEDIA_STOP',
                            t,
                            t,
                        ],
                        [0, 1, 174, 'Eject', 0, t, 0, t, t, t],
                        [
                            117,
                            1,
                            175,
                            'MediaPlayPause',
                            122,
                            'MediaPlayPause',
                            179,
                            'VK_MEDIA_PLAY_PAUSE',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            176,
                            'MediaSelect',
                            123,
                            'LaunchMediaPlayer',
                            181,
                            'VK_MEDIA_LAUNCH_MEDIA_SELECT',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            177,
                            'LaunchMail',
                            124,
                            'LaunchMail',
                            180,
                            'VK_MEDIA_LAUNCH_MAIL',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            178,
                            'LaunchApp2',
                            125,
                            'LaunchApp2',
                            183,
                            'VK_MEDIA_LAUNCH_APP2',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            179,
                            'LaunchApp1',
                            0,
                            t,
                            0,
                            'VK_MEDIA_LAUNCH_APP1',
                            t,
                            t,
                        ],
                        [0, 1, 180, 'SelectTask', 0, t, 0, t, t, t],
                        [0, 1, 181, 'LaunchScreenSaver', 0, t, 0, t, t, t],
                        [
                            0,
                            1,
                            182,
                            'BrowserSearch',
                            115,
                            'BrowserSearch',
                            170,
                            'VK_BROWSER_SEARCH',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            183,
                            'BrowserHome',
                            116,
                            'BrowserHome',
                            172,
                            'VK_BROWSER_HOME',
                            t,
                            t,
                        ],
                        [
                            112,
                            1,
                            184,
                            'BrowserBack',
                            117,
                            'BrowserBack',
                            166,
                            'VK_BROWSER_BACK',
                            t,
                            t,
                        ],
                        [
                            113,
                            1,
                            185,
                            'BrowserForward',
                            118,
                            'BrowserForward',
                            167,
                            'VK_BROWSER_FORWARD',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            186,
                            'BrowserStop',
                            0,
                            t,
                            0,
                            'VK_BROWSER_STOP',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            187,
                            'BrowserRefresh',
                            0,
                            t,
                            0,
                            'VK_BROWSER_REFRESH',
                            t,
                            t,
                        ],
                        [
                            0,
                            1,
                            188,
                            'BrowserFavorites',
                            0,
                            t,
                            0,
                            'VK_BROWSER_FAVORITES',
                            t,
                            t,
                        ],
                        [0, 1, 189, 'ZoomToggle', 0, t, 0, t, t, t],
                        [0, 1, 190, 'MailReply', 0, t, 0, t, t, t],
                        [0, 1, 191, 'MailForward', 0, t, 0, t, t, t],
                        [0, 1, 192, 'MailSend', 0, t, 0, t, t, t],
                        [109, 1, 0, t, 109, 'KeyInComposition', 229, t, t, t],
                        [111, 1, 0, t, 111, 'ABNT_C2', 194, 'VK_ABNT_C2', t, t],
                        [91, 1, 0, t, 91, 'OEM_8', 223, 'VK_OEM_8', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_KANA', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_HANGUL', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_JUNJA', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_FINAL', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_HANJA', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_KANJI', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_CONVERT', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_NONCONVERT', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_ACCEPT', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_MODECHANGE', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_SELECT', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_PRINT', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_EXECUTE', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_SNAPSHOT', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_HELP', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_APPS', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_PROCESSKEY', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_PACKET', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_DBE_SBCSCHAR', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_DBE_DBCSCHAR', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_ATTN', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_CRSEL', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_EXSEL', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_EREOF', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_PLAY', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_ZOOM', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_NONAME', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_PA1', t, t],
                        [0, 1, 0, t, 0, t, 0, 'VK_OEM_CLEAR', t, t],
                    ];
                let h = [],
                    v = [];
                for (const L of d) {
                    const [C, y, p, s, i, a, l, f, u, _] = L;
                    if (
                        (v[p] ||
                            ((v[p] = !0),
                            (w[p] = s),
                            (g[s] = p),
                            (c[s.toLowerCase()] = p),
                            y &&
                                ((r.IMMUTABLE_CODE_TO_KEY_CODE[p] = i),
                                i !== 0 &&
                                    i !== 3 &&
                                    i !== 5 &&
                                    i !== 4 &&
                                    i !== 6 &&
                                    i !== 57 &&
                                    (r.IMMUTABLE_KEY_CODE_TO_CODE[i] = p))),
                        !h[i])
                    ) {
                        if (((h[i] = !0), !a))
                            throw new Error(
                                `String representation missing for key code ${i} around scan code ${s}`
                            );
                        e.define(i, a),
                            N.define(i, u || a),
                            o.define(i, _ || u || a);
                    }
                    l && (r.EVENT_KEY_CODE_MAP[l] = i),
                        f && (r.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[f] = i);
                }
                r.IMMUTABLE_KEY_CODE_TO_CODE[3] = 46;
            })();
            var m;
            (function (t) {
                function d(p) {
                    return e.keyCodeToStr(p);
                }
                t.toString = d;
                function h(p) {
                    return e.strToKeyCode(p);
                }
                t.fromString = h;
                function v(p) {
                    return N.keyCodeToStr(p);
                }
                t.toUserSettingsUS = v;
                function L(p) {
                    return o.keyCodeToStr(p);
                }
                t.toUserSettingsGeneral = L;
                function C(p) {
                    return N.strToKeyCode(p) || o.strToKeyCode(p);
                }
                t.fromUserSettings = C;
                function y(p) {
                    if (p >= 93 && p <= 108) return null;
                    switch (p) {
                        case 16:
                            return 'Up';
                        case 18:
                            return 'Down';
                        case 15:
                            return 'Left';
                        case 17:
                            return 'Right';
                    }
                    return e.keyCodeToStr(p);
                }
                t.toElectronAccelerator = y;
            })((m = r.KeyCodeUtils || (r.KeyCodeUtils = {})));
            function S(t, d) {
                const h = ((d & 65535) << 16) >>> 0;
                return (t | h) >>> 0;
            }
            r.KeyChord = S;
        }),
        Y(Q[23], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Lazy = void 0);
            class E {
                constructor(N) {
                    (this.executor = N), (this._didRun = !1);
                }
                getValue() {
                    if (!this._didRun)
                        try {
                            this._value = this.executor();
                        } catch (N) {
                            this._error = N;
                        } finally {
                            this._didRun = !0;
                        }
                    if (this._error) throw this._error;
                    return this._value;
                }
                get rawValue() {
                    return this._value;
                }
            }
            r.Lazy = E;
        }),
        Y(Q[8], Z([0, 1, 20, 21]), function (U, r, E, e) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.ImmortalReference =
                    r.SafeDisposable =
                    r.MutableDisposable =
                    r.Disposable =
                    r.DisposableStore =
                    r.toDisposable =
                    r.combinedDisposable =
                    r.dispose =
                    r.isDisposable =
                    r.MultiDisposeError =
                    r.markAsSingleton =
                    r.setDisposableTracker =
                        void 0);
            const N = !1;
            let o = null;
            function w(l) {
                o = l;
            }
            if (((r.setDisposableTracker = w), N)) {
                const l = '__is_disposable_tracked__';
                w(
                    new (class {
                        trackDisposable(f) {
                            const u = new Error('Potentially leaked disposable')
                                .stack;
                            setTimeout(() => {
                                f[l] || console.log(u);
                            }, 3e3);
                        }
                        setParent(f, u) {
                            if (f && f !== p.None)
                                try {
                                    f[l] = !0;
                                } catch {}
                        }
                        markAsDisposed(f) {
                            if (f && f !== p.None)
                                try {
                                    f[l] = !0;
                                } catch {}
                        }
                        markAsSingleton(f) {}
                    })()
                );
            }
            function g(l) {
                return o == null || o.trackDisposable(l), l;
            }
            function c(l) {
                o == null || o.markAsDisposed(l);
            }
            function m(l, f) {
                o == null || o.setParent(l, f);
            }
            function S(l, f) {
                if (!!o) for (const u of l) o.setParent(u, f);
            }
            function t(l) {
                return o == null || o.markAsSingleton(l), l;
            }
            r.markAsSingleton = t;
            class d extends Error {
                constructor(f) {
                    super(
                        `Encountered errors while disposing of store. Errors: [${f.join(
                            ', '
                        )}]`
                    );
                    this.errors = f;
                }
            }
            r.MultiDisposeError = d;
            function h(l) {
                return typeof l.dispose == 'function' && l.dispose.length === 0;
            }
            r.isDisposable = h;
            function v(l) {
                if (e.Iterable.is(l)) {
                    let f = [];
                    for (const u of l)
                        if (u)
                            try {
                                u.dispose();
                            } catch (_) {
                                f.push(_);
                            }
                    if (f.length === 1) throw f[0];
                    if (f.length > 1) throw new d(f);
                    return Array.isArray(l) ? [] : l;
                } else if (l) return l.dispose(), l;
            }
            r.dispose = v;
            function L(...l) {
                const f = C(() => v(l));
                return S(l, f), f;
            }
            r.combinedDisposable = L;
            function C(l) {
                const f = g({
                    dispose: (0, E.once)(() => {
                        c(f), l();
                    }),
                });
                return f;
            }
            r.toDisposable = C;
            class y {
                constructor() {
                    (this._toDispose = new Set()),
                        (this._isDisposed = !1),
                        g(this);
                }
                dispose() {
                    this._isDisposed ||
                        (c(this), (this._isDisposed = !0), this.clear());
                }
                get isDisposed() {
                    return this._isDisposed;
                }
                clear() {
                    try {
                        v(this._toDispose.values());
                    } finally {
                        this._toDispose.clear();
                    }
                }
                add(f) {
                    if (!f) return f;
                    if (f === this)
                        throw new Error(
                            'Cannot register a disposable on itself!'
                        );
                    return (
                        m(f, this),
                        this._isDisposed
                            ? y.DISABLE_DISPOSED_WARNING ||
                              console.warn(
                                  new Error(
                                      'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!'
                                  ).stack
                              )
                            : this._toDispose.add(f),
                        f
                    );
                }
            }
            (r.DisposableStore = y), (y.DISABLE_DISPOSED_WARNING = !1);
            class p {
                constructor() {
                    (this._store = new y()), g(this), m(this._store, this);
                }
                dispose() {
                    c(this), this._store.dispose();
                }
                _register(f) {
                    if (f === this)
                        throw new Error(
                            'Cannot register a disposable on itself!'
                        );
                    return this._store.add(f);
                }
            }
            (r.Disposable = p), (p.None = Object.freeze({ dispose() {} }));
            class s {
                constructor() {
                    (this._isDisposed = !1), g(this);
                }
                get value() {
                    return this._isDisposed ? void 0 : this._value;
                }
                set value(f) {
                    var u;
                    this._isDisposed ||
                        f === this._value ||
                        ((u = this._value) === null ||
                            u === void 0 ||
                            u.dispose(),
                        f && m(f, this),
                        (this._value = f));
                }
                clear() {
                    this.value = void 0;
                }
                dispose() {
                    var f;
                    (this._isDisposed = !0),
                        c(this),
                        (f = this._value) === null ||
                            f === void 0 ||
                            f.dispose(),
                        (this._value = void 0);
                }
                clearAndLeak() {
                    const f = this._value;
                    return (this._value = void 0), f && m(f, null), f;
                }
            }
            r.MutableDisposable = s;
            class i {
                constructor() {
                    (this.dispose = () => {}),
                        (this.unset = () => {}),
                        (this.isset = () => !1),
                        g(this);
                }
                set(f) {
                    let u = f;
                    return (
                        (this.unset = () => (u = void 0)),
                        (this.isset = () => u !== void 0),
                        (this.dispose = () => {
                            u && (u(), (u = void 0), c(this));
                        }),
                        this
                    );
                }
            }
            r.SafeDisposable = i;
            class a {
                constructor(f) {
                    this.object = f;
                }
                dispose() {}
            }
            r.ImmortalReference = a;
        }),
        Y(Q[24], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.LinkedList = void 0);
            class E {
                constructor(o) {
                    (this.element = o),
                        (this.next = E.Undefined),
                        (this.prev = E.Undefined);
                }
            }
            E.Undefined = new E(void 0);
            class e {
                constructor() {
                    (this._first = E.Undefined),
                        (this._last = E.Undefined),
                        (this._size = 0);
                }
                get size() {
                    return this._size;
                }
                isEmpty() {
                    return this._first === E.Undefined;
                }
                clear() {
                    let o = this._first;
                    for (; o !== E.Undefined; ) {
                        const w = o.next;
                        (o.prev = E.Undefined), (o.next = E.Undefined), (o = w);
                    }
                    (this._first = E.Undefined),
                        (this._last = E.Undefined),
                        (this._size = 0);
                }
                unshift(o) {
                    return this._insert(o, !1);
                }
                push(o) {
                    return this._insert(o, !0);
                }
                _insert(o, w) {
                    const g = new E(o);
                    if (this._first === E.Undefined)
                        (this._first = g), (this._last = g);
                    else if (w) {
                        const m = this._last;
                        (this._last = g), (g.prev = m), (m.next = g);
                    } else {
                        const m = this._first;
                        (this._first = g), (g.next = m), (m.prev = g);
                    }
                    this._size += 1;
                    let c = !1;
                    return () => {
                        c || ((c = !0), this._remove(g));
                    };
                }
                shift() {
                    if (this._first !== E.Undefined) {
                        const o = this._first.element;
                        return this._remove(this._first), o;
                    }
                }
                pop() {
                    if (this._last !== E.Undefined) {
                        const o = this._last.element;
                        return this._remove(this._last), o;
                    }
                }
                _remove(o) {
                    if (o.prev !== E.Undefined && o.next !== E.Undefined) {
                        const w = o.prev;
                        (w.next = o.next), (o.next.prev = w);
                    } else o.prev === E.Undefined && o.next === E.Undefined ? ((this._first = E.Undefined), (this._last = E.Undefined)) : o.next === E.Undefined ? ((this._last = this._last.prev), (this._last.next = E.Undefined)) : o.prev === E.Undefined && ((this._first = this._first.next), (this._first.prev = E.Undefined));
                    this._size -= 1;
                }
                *[Symbol.iterator]() {
                    let o = this._first;
                    for (; o !== E.Undefined; ) yield o.element, (o = o.next);
                }
            }
            r.LinkedList = e;
        }),
        Y(Q[5], Z([0, 1]), function (U, r) {
            'use strict';
            var E;
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.isAndroid =
                    r.isEdge =
                    r.isSafari =
                    r.isFirefox =
                    r.isChrome =
                    r.isLittleEndian =
                    r.OS =
                    r.setTimeout0 =
                    r.language =
                    r.userAgent =
                    r.isIOS =
                    r.isWebWorker =
                    r.isWeb =
                    r.isNative =
                    r.isLinux =
                    r.isMacintosh =
                    r.isWindows =
                    r.globals =
                        void 0);
            const e = 'en';
            let N = !1,
                o = !1,
                w = !1,
                g = !1,
                c = !1,
                m = !1,
                S = !1,
                t = !1,
                d = !1,
                h,
                v = e,
                L,
                C;
            r.globals =
                typeof self == 'object'
                    ? self
                    : typeof global == 'object'
                    ? global
                    : {};
            let y;
            typeof r.globals.vscode != 'undefined' &&
            typeof r.globals.vscode.process != 'undefined'
                ? (y = r.globals.vscode.process)
                : typeof process != 'undefined' && (y = process);
            const p =
                    typeof ((E = y == null ? void 0 : y.versions) === null ||
                    E === void 0
                        ? void 0
                        : E.electron) == 'string',
                s = p && (y == null ? void 0 : y.type) === 'renderer';
            if (typeof navigator == 'object' && !s)
                (C = navigator.userAgent),
                    (N = C.indexOf('Windows') >= 0),
                    (o = C.indexOf('Macintosh') >= 0),
                    (t =
                        (C.indexOf('Macintosh') >= 0 ||
                            C.indexOf('iPad') >= 0 ||
                            C.indexOf('iPhone') >= 0) &&
                        !!navigator.maxTouchPoints &&
                        navigator.maxTouchPoints > 0),
                    (w = C.indexOf('Linux') >= 0),
                    (m = !0),
                    (h = navigator.language),
                    (v = h);
            else if (typeof y == 'object') {
                (N = y.platform === 'win32'),
                    (o = y.platform === 'darwin'),
                    (w = y.platform === 'linux'),
                    (g = w && !!y.env.SNAP && !!y.env.SNAP_REVISION),
                    (S = p),
                    (d = !!y.env.CI || !!y.env.BUILD_ARTIFACTSTAGINGDIRECTORY),
                    (h = e),
                    (v = e);
                const u = y.env.VSCODE_NLS_CONFIG;
                if (u)
                    try {
                        const _ = JSON.parse(u),
                            b = _.availableLanguages['*'];
                        (h = _.locale),
                            (v = b || e),
                            (L = _._translationsConfigFile);
                    } catch {}
                c = !0;
            } else console.error('Unable to resolve platform.');
            let i = 0;
            o ? (i = 1) : N ? (i = 3) : w && (i = 2),
                (r.isWindows = N),
                (r.isMacintosh = o),
                (r.isLinux = w),
                (r.isNative = c),
                (r.isWeb = m),
                (r.isWebWorker =
                    m && typeof r.globals.importScripts == 'function'),
                (r.isIOS = t),
                (r.userAgent = C),
                (r.language = v),
                (r.setTimeout0 = (() => {
                    if (
                        typeof r.globals.postMessage == 'function' &&
                        !r.globals.importScripts
                    ) {
                        let u = [];
                        r.globals.addEventListener('message', (b) => {
                            if (b.data && b.data.vscodeScheduleAsyncWork)
                                for (let A = 0, P = u.length; A < P; A++) {
                                    const D = u[A];
                                    if (
                                        D.id === b.data.vscodeScheduleAsyncWork
                                    ) {
                                        u.splice(A, 1), D.callback();
                                        return;
                                    }
                                }
                        });
                        let _ = 0;
                        return (b) => {
                            const A = ++_;
                            u.push({ id: A, callback: b }),
                                r.globals.postMessage(
                                    { vscodeScheduleAsyncWork: A },
                                    '*'
                                );
                        };
                    }
                    return (u) => setTimeout(u);
                })()),
                (r.OS = o || t ? 2 : N ? 1 : 3);
            let a = !0,
                l = !1;
            function f() {
                if (!l) {
                    l = !0;
                    const u = new Uint8Array(2);
                    (u[0] = 1),
                        (u[1] = 2),
                        (a = new Uint16Array(u.buffer)[0] === (2 << 8) + 1);
                }
                return a;
            }
            (r.isLittleEndian = f),
                (r.isChrome = !!(
                    r.userAgent && r.userAgent.indexOf('Chrome') >= 0
                )),
                (r.isFirefox = !!(
                    r.userAgent && r.userAgent.indexOf('Firefox') >= 0
                )),
                (r.isSafari = !!(
                    !r.isChrome &&
                    r.userAgent &&
                    r.userAgent.indexOf('Safari') >= 0
                )),
                (r.isEdge = !!(
                    r.userAgent && r.userAgent.indexOf('Edg/') >= 0
                )),
                (r.isAndroid = !!(
                    r.userAgent && r.userAgent.indexOf('Android') >= 0
                ));
        }),
        Y(Q[25], Z([0, 1, 5]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.platform = r.env = r.cwd = void 0);
            let e;
            if (
                typeof E.globals.vscode != 'undefined' &&
                typeof E.globals.vscode.process != 'undefined'
            ) {
                const N = E.globals.vscode.process;
                e = {
                    get platform() {
                        return N.platform;
                    },
                    get arch() {
                        return N.arch;
                    },
                    get env() {
                        return N.env;
                    },
                    cwd() {
                        return N.cwd();
                    },
                };
            } else
                typeof process != 'undefined'
                    ? (e = {
                          get platform() {
                              return process.platform;
                          },
                          get arch() {
                              return process.arch;
                          },
                          get env() {
                              return process.env;
                          },
                          cwd() {
                              return process.env.VSCODE_CWD || process.cwd();
                          },
                      })
                    : (e = {
                          get platform() {
                              return E.isWindows
                                  ? 'win32'
                                  : E.isMacintosh
                                  ? 'darwin'
                                  : 'linux';
                          },
                          get arch() {},
                          get env() {
                              return {};
                          },
                          cwd() {
                              return '/';
                          },
                      });
            (r.cwd = e.cwd), (r.env = e.env), (r.platform = e.platform);
        }),
        Y(Q[26], Z([0, 1, 25]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.sep =
                    r.extname =
                    r.basename =
                    r.dirname =
                    r.relative =
                    r.resolve =
                    r.normalize =
                    r.posix =
                    r.win32 =
                        void 0);
            const e = 65,
                N = 97,
                o = 90,
                w = 122,
                g = 46,
                c = 47,
                m = 92,
                S = 58,
                t = 63;
            class d extends Error {
                constructor(i, a, l) {
                    let f;
                    typeof a == 'string' && a.indexOf('not ') === 0
                        ? ((f = 'must not be'), (a = a.replace(/^not /, '')))
                        : (f = 'must be');
                    const u = i.indexOf('.') !== -1 ? 'property' : 'argument';
                    let _ = `The "${i}" ${u} ${f} of type ${a}`;
                    _ += `. Received type ${typeof l}`;
                    super(_);
                    this.code = 'ERR_INVALID_ARG_TYPE';
                }
            }
            function h(s, i) {
                if (typeof s != 'string') throw new d(i, 'string', s);
            }
            function v(s) {
                return s === c || s === m;
            }
            function L(s) {
                return s === c;
            }
            function C(s) {
                return (s >= e && s <= o) || (s >= N && s <= w);
            }
            function y(s, i, a, l) {
                let f = '',
                    u = 0,
                    _ = -1,
                    b = 0,
                    A = 0;
                for (let P = 0; P <= s.length; ++P) {
                    if (P < s.length) A = s.charCodeAt(P);
                    else {
                        if (l(A)) break;
                        A = c;
                    }
                    if (l(A)) {
                        if (!(_ === P - 1 || b === 1))
                            if (b === 2) {
                                if (
                                    f.length < 2 ||
                                    u !== 2 ||
                                    f.charCodeAt(f.length - 1) !== g ||
                                    f.charCodeAt(f.length - 2) !== g
                                ) {
                                    if (f.length > 2) {
                                        const D = f.lastIndexOf(a);
                                        D === -1
                                            ? ((f = ''), (u = 0))
                                            : ((f = f.slice(0, D)),
                                              (u =
                                                  f.length -
                                                  1 -
                                                  f.lastIndexOf(a))),
                                            (_ = P),
                                            (b = 0);
                                        continue;
                                    } else if (f.length !== 0) {
                                        (f = ''), (u = 0), (_ = P), (b = 0);
                                        continue;
                                    }
                                }
                                i &&
                                    ((f += f.length > 0 ? `${a}..` : '..'),
                                    (u = 2));
                            } else
                                f.length > 0
                                    ? (f += `${a}${s.slice(_ + 1, P)}`)
                                    : (f = s.slice(_ + 1, P)),
                                    (u = P - _ - 1);
                        (_ = P), (b = 0);
                    } else A === g && b !== -1 ? ++b : (b = -1);
                }
                return f;
            }
            function p(s, i) {
                if (i === null || typeof i != 'object')
                    throw new d('pathObject', 'Object', i);
                const a = i.dir || i.root,
                    l = i.base || `${i.name || ''}${i.ext || ''}`;
                return a ? (a === i.root ? `${a}${l}` : `${a}${s}${l}`) : l;
            }
            (r.win32 = {
                resolve(...s) {
                    let i = '',
                        a = '',
                        l = !1;
                    for (let f = s.length - 1; f >= -1; f--) {
                        let u;
                        if (f >= 0) {
                            if (((u = s[f]), h(u, 'path'), u.length === 0))
                                continue;
                        } else
                            i.length === 0
                                ? (u = E.cwd())
                                : ((u = E.env[`=${i}`] || E.cwd()),
                                  (u === void 0 ||
                                      (u.slice(0, 2).toLowerCase() !==
                                          i.toLowerCase() &&
                                          u.charCodeAt(2) === m)) &&
                                      (u = `${i}\\`));
                        const _ = u.length;
                        let b = 0,
                            A = '',
                            P = !1;
                        const D = u.charCodeAt(0);
                        if (_ === 1) v(D) && ((b = 1), (P = !0));
                        else if (v(D))
                            if (((P = !0), v(u.charCodeAt(1)))) {
                                let k = 2,
                                    R = k;
                                for (; k < _ && !v(u.charCodeAt(k)); ) k++;
                                if (k < _ && k !== R) {
                                    const I = u.slice(R, k);
                                    for (R = k; k < _ && v(u.charCodeAt(k)); )
                                        k++;
                                    if (k < _ && k !== R) {
                                        for (
                                            R = k;
                                            k < _ && !v(u.charCodeAt(k));

                                        )
                                            k++;
                                        (k === _ || k !== R) &&
                                            ((A = `\\\\${I}\\${u.slice(R, k)}`),
                                            (b = k));
                                    }
                                }
                            } else b = 1;
                        else
                            C(D) &&
                                u.charCodeAt(1) === S &&
                                ((A = u.slice(0, 2)),
                                (b = 2),
                                _ > 2 &&
                                    v(u.charCodeAt(2)) &&
                                    ((P = !0), (b = 3)));
                        if (A.length > 0)
                            if (i.length > 0) {
                                if (A.toLowerCase() !== i.toLowerCase())
                                    continue;
                            } else i = A;
                        if (l) {
                            if (i.length > 0) break;
                        } else if (
                            ((a = `${u.slice(b)}\\${a}`),
                            (l = P),
                            P && i.length > 0)
                        )
                            break;
                    }
                    return (
                        (a = y(a, !l, '\\', v)),
                        l ? `${i}\\${a}` : `${i}${a}` || '.'
                    );
                },
                normalize(s) {
                    h(s, 'path');
                    const i = s.length;
                    if (i === 0) return '.';
                    let a = 0,
                        l,
                        f = !1;
                    const u = s.charCodeAt(0);
                    if (i === 1) return L(u) ? '\\' : s;
                    if (v(u))
                        if (((f = !0), v(s.charCodeAt(1)))) {
                            let b = 2,
                                A = b;
                            for (; b < i && !v(s.charCodeAt(b)); ) b++;
                            if (b < i && b !== A) {
                                const P = s.slice(A, b);
                                for (A = b; b < i && v(s.charCodeAt(b)); ) b++;
                                if (b < i && b !== A) {
                                    for (A = b; b < i && !v(s.charCodeAt(b)); )
                                        b++;
                                    if (b === i)
                                        return `\\\\${P}\\${s.slice(A)}\\`;
                                    b !== A &&
                                        ((l = `\\\\${P}\\${s.slice(A, b)}`),
                                        (a = b));
                                }
                            }
                        } else a = 1;
                    else
                        C(u) &&
                            s.charCodeAt(1) === S &&
                            ((l = s.slice(0, 2)),
                            (a = 2),
                            i > 2 && v(s.charCodeAt(2)) && ((f = !0), (a = 3)));
                    let _ = a < i ? y(s.slice(a), !f, '\\', v) : '';
                    return (
                        _.length === 0 && !f && (_ = '.'),
                        _.length > 0 && v(s.charCodeAt(i - 1)) && (_ += '\\'),
                        l === void 0
                            ? f
                                ? `\\${_}`
                                : _
                            : f
                            ? `${l}\\${_}`
                            : `${l}${_}`
                    );
                },
                isAbsolute(s) {
                    h(s, 'path');
                    const i = s.length;
                    if (i === 0) return !1;
                    const a = s.charCodeAt(0);
                    return (
                        v(a) ||
                        (i > 2 &&
                            C(a) &&
                            s.charCodeAt(1) === S &&
                            v(s.charCodeAt(2)))
                    );
                },
                join(...s) {
                    if (s.length === 0) return '.';
                    let i, a;
                    for (let u = 0; u < s.length; ++u) {
                        const _ = s[u];
                        h(_, 'path'),
                            _.length > 0 &&
                                (i === void 0 ? (i = a = _) : (i += `\\${_}`));
                    }
                    if (i === void 0) return '.';
                    let l = !0,
                        f = 0;
                    if (typeof a == 'string' && v(a.charCodeAt(0))) {
                        ++f;
                        const u = a.length;
                        u > 1 &&
                            v(a.charCodeAt(1)) &&
                            (++f,
                            u > 2 && (v(a.charCodeAt(2)) ? ++f : (l = !1)));
                    }
                    if (l) {
                        for (; f < i.length && v(i.charCodeAt(f)); ) f++;
                        f >= 2 && (i = `\\${i.slice(f)}`);
                    }
                    return r.win32.normalize(i);
                },
                relative(s, i) {
                    if ((h(s, 'from'), h(i, 'to'), s === i)) return '';
                    const a = r.win32.resolve(s),
                        l = r.win32.resolve(i);
                    if (
                        a === l ||
                        ((s = a.toLowerCase()), (i = l.toLowerCase()), s === i)
                    )
                        return '';
                    let f = 0;
                    for (; f < s.length && s.charCodeAt(f) === m; ) f++;
                    let u = s.length;
                    for (; u - 1 > f && s.charCodeAt(u - 1) === m; ) u--;
                    const _ = u - f;
                    let b = 0;
                    for (; b < i.length && i.charCodeAt(b) === m; ) b++;
                    let A = i.length;
                    for (; A - 1 > b && i.charCodeAt(A - 1) === m; ) A--;
                    const P = A - b,
                        D = _ < P ? _ : P;
                    let k = -1,
                        R = 0;
                    for (; R < D; R++) {
                        const F = s.charCodeAt(f + R);
                        if (F !== i.charCodeAt(b + R)) break;
                        F === m && (k = R);
                    }
                    if (R !== D) {
                        if (k === -1) return l;
                    } else {
                        if (P > D) {
                            if (i.charCodeAt(b + R) === m)
                                return l.slice(b + R + 1);
                            if (R === 2) return l.slice(b + R);
                        }
                        _ > D &&
                            (s.charCodeAt(f + R) === m
                                ? (k = R)
                                : R === 2 && (k = 3)),
                            k === -1 && (k = 0);
                    }
                    let I = '';
                    for (R = f + k + 1; R <= u; ++R)
                        (R === u || s.charCodeAt(R) === m) &&
                            (I += I.length === 0 ? '..' : '\\..');
                    return (
                        (b += k),
                        I.length > 0
                            ? `${I}${l.slice(b, A)}`
                            : (l.charCodeAt(b) === m && ++b, l.slice(b, A))
                    );
                },
                toNamespacedPath(s) {
                    if (typeof s != 'string') return s;
                    if (s.length === 0) return '';
                    const i = r.win32.resolve(s);
                    if (i.length <= 2) return s;
                    if (i.charCodeAt(0) === m) {
                        if (i.charCodeAt(1) === m) {
                            const a = i.charCodeAt(2);
                            if (a !== t && a !== g)
                                return `\\\\?\\UNC\\${i.slice(2)}`;
                        }
                    } else if (
                        C(i.charCodeAt(0)) &&
                        i.charCodeAt(1) === S &&
                        i.charCodeAt(2) === m
                    )
                        return `\\\\?\\${i}`;
                    return s;
                },
                dirname(s) {
                    h(s, 'path');
                    const i = s.length;
                    if (i === 0) return '.';
                    let a = -1,
                        l = 0;
                    const f = s.charCodeAt(0);
                    if (i === 1) return v(f) ? s : '.';
                    if (v(f)) {
                        if (((a = l = 1), v(s.charCodeAt(1)))) {
                            let b = 2,
                                A = b;
                            for (; b < i && !v(s.charCodeAt(b)); ) b++;
                            if (b < i && b !== A) {
                                for (A = b; b < i && v(s.charCodeAt(b)); ) b++;
                                if (b < i && b !== A) {
                                    for (A = b; b < i && !v(s.charCodeAt(b)); )
                                        b++;
                                    if (b === i) return s;
                                    b !== A && (a = l = b + 1);
                                }
                            }
                        }
                    } else
                        C(f) &&
                            s.charCodeAt(1) === S &&
                            ((a = i > 2 && v(s.charCodeAt(2)) ? 3 : 2),
                            (l = a));
                    let u = -1,
                        _ = !0;
                    for (let b = i - 1; b >= l; --b)
                        if (v(s.charCodeAt(b))) {
                            if (!_) {
                                u = b;
                                break;
                            }
                        } else _ = !1;
                    if (u === -1) {
                        if (a === -1) return '.';
                        u = a;
                    }
                    return s.slice(0, u);
                },
                basename(s, i) {
                    i !== void 0 && h(i, 'ext'), h(s, 'path');
                    let a = 0,
                        l = -1,
                        f = !0,
                        u;
                    if (
                        (s.length >= 2 &&
                            C(s.charCodeAt(0)) &&
                            s.charCodeAt(1) === S &&
                            (a = 2),
                        i !== void 0 && i.length > 0 && i.length <= s.length)
                    ) {
                        if (i === s) return '';
                        let _ = i.length - 1,
                            b = -1;
                        for (u = s.length - 1; u >= a; --u) {
                            const A = s.charCodeAt(u);
                            if (v(A)) {
                                if (!f) {
                                    a = u + 1;
                                    break;
                                }
                            } else
                                b === -1 && ((f = !1), (b = u + 1)),
                                    _ >= 0 &&
                                        (A === i.charCodeAt(_)
                                            ? --_ == -1 && (l = u)
                                            : ((_ = -1), (l = b)));
                        }
                        return (
                            a === l ? (l = b) : l === -1 && (l = s.length),
                            s.slice(a, l)
                        );
                    }
                    for (u = s.length - 1; u >= a; --u)
                        if (v(s.charCodeAt(u))) {
                            if (!f) {
                                a = u + 1;
                                break;
                            }
                        } else l === -1 && ((f = !1), (l = u + 1));
                    return l === -1 ? '' : s.slice(a, l);
                },
                extname(s) {
                    h(s, 'path');
                    let i = 0,
                        a = -1,
                        l = 0,
                        f = -1,
                        u = !0,
                        _ = 0;
                    s.length >= 2 &&
                        s.charCodeAt(1) === S &&
                        C(s.charCodeAt(0)) &&
                        (i = l = 2);
                    for (let b = s.length - 1; b >= i; --b) {
                        const A = s.charCodeAt(b);
                        if (v(A)) {
                            if (!u) {
                                l = b + 1;
                                break;
                            }
                            continue;
                        }
                        f === -1 && ((u = !1), (f = b + 1)),
                            A === g
                                ? a === -1
                                    ? (a = b)
                                    : _ !== 1 && (_ = 1)
                                : a !== -1 && (_ = -1);
                    }
                    return a === -1 ||
                        f === -1 ||
                        _ === 0 ||
                        (_ === 1 && a === f - 1 && a === l + 1)
                        ? ''
                        : s.slice(a, f);
                },
                format: p.bind(null, '\\'),
                parse(s) {
                    h(s, 'path');
                    const i = {
                        root: '',
                        dir: '',
                        base: '',
                        ext: '',
                        name: '',
                    };
                    if (s.length === 0) return i;
                    const a = s.length;
                    let l = 0,
                        f = s.charCodeAt(0);
                    if (a === 1)
                        return v(f)
                            ? ((i.root = i.dir = s), i)
                            : ((i.base = i.name = s), i);
                    if (v(f)) {
                        if (((l = 1), v(s.charCodeAt(1)))) {
                            let k = 2,
                                R = k;
                            for (; k < a && !v(s.charCodeAt(k)); ) k++;
                            if (k < a && k !== R) {
                                for (R = k; k < a && v(s.charCodeAt(k)); ) k++;
                                if (k < a && k !== R) {
                                    for (R = k; k < a && !v(s.charCodeAt(k)); )
                                        k++;
                                    k === a ? (l = k) : k !== R && (l = k + 1);
                                }
                            }
                        }
                    } else if (C(f) && s.charCodeAt(1) === S) {
                        if (a <= 2) return (i.root = i.dir = s), i;
                        if (((l = 2), v(s.charCodeAt(2)))) {
                            if (a === 3) return (i.root = i.dir = s), i;
                            l = 3;
                        }
                    }
                    l > 0 && (i.root = s.slice(0, l));
                    let u = -1,
                        _ = l,
                        b = -1,
                        A = !0,
                        P = s.length - 1,
                        D = 0;
                    for (; P >= l; --P) {
                        if (((f = s.charCodeAt(P)), v(f))) {
                            if (!A) {
                                _ = P + 1;
                                break;
                            }
                            continue;
                        }
                        b === -1 && ((A = !1), (b = P + 1)),
                            f === g
                                ? u === -1
                                    ? (u = P)
                                    : D !== 1 && (D = 1)
                                : u !== -1 && (D = -1);
                    }
                    return (
                        b !== -1 &&
                            (u === -1 ||
                            D === 0 ||
                            (D === 1 && u === b - 1 && u === _ + 1)
                                ? (i.base = i.name = s.slice(_, b))
                                : ((i.name = s.slice(_, u)),
                                  (i.base = s.slice(_, b)),
                                  (i.ext = s.slice(u, b)))),
                        _ > 0 && _ !== l
                            ? (i.dir = s.slice(0, _ - 1))
                            : (i.dir = i.root),
                        i
                    );
                },
                sep: '\\',
                delimiter: ';',
                win32: null,
                posix: null,
            }),
                (r.posix = {
                    resolve(...s) {
                        let i = '',
                            a = !1;
                        for (let l = s.length - 1; l >= -1 && !a; l--) {
                            const f = l >= 0 ? s[l] : E.cwd();
                            h(f, 'path'),
                                f.length !== 0 &&
                                    ((i = `${f}/${i}`),
                                    (a = f.charCodeAt(0) === c));
                        }
                        return (
                            (i = y(i, !a, '/', L)),
                            a ? `/${i}` : i.length > 0 ? i : '.'
                        );
                    },
                    normalize(s) {
                        if ((h(s, 'path'), s.length === 0)) return '.';
                        const i = s.charCodeAt(0) === c,
                            a = s.charCodeAt(s.length - 1) === c;
                        return (
                            (s = y(s, !i, '/', L)),
                            s.length === 0
                                ? i
                                    ? '/'
                                    : a
                                    ? './'
                                    : '.'
                                : (a && (s += '/'), i ? `/${s}` : s)
                        );
                    },
                    isAbsolute(s) {
                        return (
                            h(s, 'path'), s.length > 0 && s.charCodeAt(0) === c
                        );
                    },
                    join(...s) {
                        if (s.length === 0) return '.';
                        let i;
                        for (let a = 0; a < s.length; ++a) {
                            const l = s[a];
                            h(l, 'path'),
                                l.length > 0 &&
                                    (i === void 0 ? (i = l) : (i += `/${l}`));
                        }
                        return i === void 0 ? '.' : r.posix.normalize(i);
                    },
                    relative(s, i) {
                        if (
                            (h(s, 'from'),
                            h(i, 'to'),
                            s === i ||
                                ((s = r.posix.resolve(s)),
                                (i = r.posix.resolve(i)),
                                s === i))
                        )
                            return '';
                        const a = 1,
                            l = s.length,
                            f = l - a,
                            u = 1,
                            _ = i.length - u,
                            b = f < _ ? f : _;
                        let A = -1,
                            P = 0;
                        for (; P < b; P++) {
                            const k = s.charCodeAt(a + P);
                            if (k !== i.charCodeAt(u + P)) break;
                            k === c && (A = P);
                        }
                        if (P === b)
                            if (_ > b) {
                                if (i.charCodeAt(u + P) === c)
                                    return i.slice(u + P + 1);
                                if (P === 0) return i.slice(u + P);
                            } else
                                f > b &&
                                    (s.charCodeAt(a + P) === c
                                        ? (A = P)
                                        : P === 0 && (A = 0));
                        let D = '';
                        for (P = a + A + 1; P <= l; ++P)
                            (P === l || s.charCodeAt(P) === c) &&
                                (D += D.length === 0 ? '..' : '/..');
                        return `${D}${i.slice(u + A)}`;
                    },
                    toNamespacedPath(s) {
                        return s;
                    },
                    dirname(s) {
                        if ((h(s, 'path'), s.length === 0)) return '.';
                        const i = s.charCodeAt(0) === c;
                        let a = -1,
                            l = !0;
                        for (let f = s.length - 1; f >= 1; --f)
                            if (s.charCodeAt(f) === c) {
                                if (!l) {
                                    a = f;
                                    break;
                                }
                            } else l = !1;
                        return a === -1
                            ? i
                                ? '/'
                                : '.'
                            : i && a === 1
                            ? '//'
                            : s.slice(0, a);
                    },
                    basename(s, i) {
                        i !== void 0 && h(i, 'ext'), h(s, 'path');
                        let a = 0,
                            l = -1,
                            f = !0,
                            u;
                        if (
                            i !== void 0 &&
                            i.length > 0 &&
                            i.length <= s.length
                        ) {
                            if (i === s) return '';
                            let _ = i.length - 1,
                                b = -1;
                            for (u = s.length - 1; u >= 0; --u) {
                                const A = s.charCodeAt(u);
                                if (A === c) {
                                    if (!f) {
                                        a = u + 1;
                                        break;
                                    }
                                } else
                                    b === -1 && ((f = !1), (b = u + 1)),
                                        _ >= 0 &&
                                            (A === i.charCodeAt(_)
                                                ? --_ == -1 && (l = u)
                                                : ((_ = -1), (l = b)));
                            }
                            return (
                                a === l ? (l = b) : l === -1 && (l = s.length),
                                s.slice(a, l)
                            );
                        }
                        for (u = s.length - 1; u >= 0; --u)
                            if (s.charCodeAt(u) === c) {
                                if (!f) {
                                    a = u + 1;
                                    break;
                                }
                            } else l === -1 && ((f = !1), (l = u + 1));
                        return l === -1 ? '' : s.slice(a, l);
                    },
                    extname(s) {
                        h(s, 'path');
                        let i = -1,
                            a = 0,
                            l = -1,
                            f = !0,
                            u = 0;
                        for (let _ = s.length - 1; _ >= 0; --_) {
                            const b = s.charCodeAt(_);
                            if (b === c) {
                                if (!f) {
                                    a = _ + 1;
                                    break;
                                }
                                continue;
                            }
                            l === -1 && ((f = !1), (l = _ + 1)),
                                b === g
                                    ? i === -1
                                        ? (i = _)
                                        : u !== 1 && (u = 1)
                                    : i !== -1 && (u = -1);
                        }
                        return i === -1 ||
                            l === -1 ||
                            u === 0 ||
                            (u === 1 && i === l - 1 && i === a + 1)
                            ? ''
                            : s.slice(i, l);
                    },
                    format: p.bind(null, '/'),
                    parse(s) {
                        h(s, 'path');
                        const i = {
                            root: '',
                            dir: '',
                            base: '',
                            ext: '',
                            name: '',
                        };
                        if (s.length === 0) return i;
                        const a = s.charCodeAt(0) === c;
                        let l;
                        a ? ((i.root = '/'), (l = 1)) : (l = 0);
                        let f = -1,
                            u = 0,
                            _ = -1,
                            b = !0,
                            A = s.length - 1,
                            P = 0;
                        for (; A >= l; --A) {
                            const D = s.charCodeAt(A);
                            if (D === c) {
                                if (!b) {
                                    u = A + 1;
                                    break;
                                }
                                continue;
                            }
                            _ === -1 && ((b = !1), (_ = A + 1)),
                                D === g
                                    ? f === -1
                                        ? (f = A)
                                        : P !== 1 && (P = 1)
                                    : f !== -1 && (P = -1);
                        }
                        if (_ !== -1) {
                            const D = u === 0 && a ? 1 : u;
                            f === -1 ||
                            P === 0 ||
                            (P === 1 && f === _ - 1 && f === u + 1)
                                ? (i.base = i.name = s.slice(D, _))
                                : ((i.name = s.slice(D, f)),
                                  (i.base = s.slice(D, _)),
                                  (i.ext = s.slice(f, _)));
                        }
                        return (
                            u > 0
                                ? (i.dir = s.slice(0, u - 1))
                                : a && (i.dir = '/'),
                            i
                        );
                    },
                    sep: '/',
                    delimiter: ':',
                    win32: null,
                    posix: null,
                }),
                (r.posix.win32 = r.win32.win32 = r.win32),
                (r.posix.posix = r.win32.posix = r.posix),
                (r.normalize =
                    E.platform === 'win32'
                        ? r.win32.normalize
                        : r.posix.normalize),
                (r.resolve =
                    E.platform === 'win32' ? r.win32.resolve : r.posix.resolve),
                (r.relative =
                    E.platform === 'win32'
                        ? r.win32.relative
                        : r.posix.relative),
                (r.dirname =
                    E.platform === 'win32' ? r.win32.dirname : r.posix.dirname),
                (r.basename =
                    E.platform === 'win32'
                        ? r.win32.basename
                        : r.posix.basename),
                (r.extname =
                    E.platform === 'win32' ? r.win32.extname : r.posix.extname),
                (r.sep = E.platform === 'win32' ? r.win32.sep : r.posix.sep);
        }),
        Y(Q[11], Z([0, 1, 5]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.StopWatch = void 0);
            const e =
                E.globals.performance &&
                typeof E.globals.performance.now == 'function';
            class N {
                constructor(w) {
                    (this._highResolution = e && w),
                        (this._startTime = this._now()),
                        (this._stopTime = -1);
                }
                static create(w = !0) {
                    return new N(w);
                }
                stop() {
                    this._stopTime = this._now();
                }
                elapsed() {
                    return this._stopTime !== -1
                        ? this._stopTime - this._startTime
                        : this._now() - this._startTime;
                }
                _now() {
                    return this._highResolution
                        ? E.globals.performance.now()
                        : Date.now();
                }
            }
            r.StopWatch = N;
        }),
        Y(Q[6], Z([0, 1, 10, 8, 24, 11]), function (U, r, E, e, N, o) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Relay =
                    r.EventBufferer =
                    r.DebounceEmitter =
                    r.PauseableEmitter =
                    r.Emitter =
                    r.Event =
                        void 0);
            let w = !1,
                g = !1;
            var c;
            (function (s) {
                s.None = () => e.Disposable.None;
                function i(X) {
                    if (g) {
                        const { onListenerDidAdd: q } = X,
                            G = d.create();
                        let H = 0;
                        X.onListenerDidAdd = () => {
                            ++H == 2 &&
                                (console.warn(
                                    'snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here'
                                ),
                                G.print()),
                                q == null || q();
                        };
                    }
                }
                function a(X) {
                    return (q, G = null, H) => {
                        let J = !1,
                            x;
                        return (
                            (x = X(
                                (ee) => {
                                    if (!J)
                                        return (
                                            x ? x.dispose() : (J = !0),
                                            q.call(G, ee)
                                        );
                                },
                                null,
                                H
                            )),
                            J && x.dispose(),
                            x
                        );
                    };
                }
                s.once = a;
                function l(X, q, G) {
                    return P(
                        (H, J = null, x) =>
                            X((ee) => H.call(J, q(ee)), null, x),
                        G
                    );
                }
                s.map = l;
                function f(X, q, G) {
                    return P(
                        (H, J = null, x) =>
                            X(
                                (ee) => {
                                    q(ee), H.call(J, ee);
                                },
                                null,
                                x
                            ),
                        G
                    );
                }
                s.forEach = f;
                function u(X, q, G) {
                    return P(
                        (H, J = null, x) =>
                            X((ee) => q(ee) && H.call(J, ee), null, x),
                        G
                    );
                }
                s.filter = u;
                function _(X) {
                    return X;
                }
                s.signal = _;
                function b(...X) {
                    return (q, G = null, H) =>
                        (0, e.combinedDisposable)(
                            ...X.map((J) => J((x) => q.call(G, x), null, H))
                        );
                }
                s.any = b;
                function A(X, q, G, H) {
                    let J = G;
                    return l(X, (x) => ((J = q(J, x)), J), H);
                }
                s.reduce = A;
                function P(X, q) {
                    let G;
                    const H = {
                        onFirstListenerAdd() {
                            G = X(J.fire, J);
                        },
                        onLastListenerRemove() {
                            G.dispose();
                        },
                    };
                    q || i(H);
                    const J = new v(H);
                    return q && q.add(J), J.event;
                }
                function D(X, q, G = 100, H = !1, J, x) {
                    let ee,
                        ie,
                        he,
                        _e = 0;
                    const be = {
                        leakWarningThreshold: J,
                        onFirstListenerAdd() {
                            ee = X((Ce) => {
                                _e++,
                                    (ie = q(ie, Ce)),
                                    H && !he && (me.fire(ie), (ie = void 0)),
                                    clearTimeout(he),
                                    (he = setTimeout(() => {
                                        const le = ie;
                                        (ie = void 0),
                                            (he = void 0),
                                            (!H || _e > 1) && me.fire(le),
                                            (_e = 0);
                                    }, G));
                            });
                        },
                        onLastListenerRemove() {
                            ee.dispose();
                        },
                    };
                    x || i(be);
                    const me = new v(be);
                    return x && x.add(me), me.event;
                }
                s.debounce = D;
                function k(X, q = (H, J) => H === J, G) {
                    let H = !0,
                        J;
                    return u(
                        X,
                        (x) => {
                            const ee = H || !q(x, J);
                            return (H = !1), (J = x), ee;
                        },
                        G
                    );
                }
                s.latch = k;
                function R(X, q, G) {
                    return [s.filter(X, q, G), s.filter(X, (H) => !q(H), G)];
                }
                s.split = R;
                function I(X, q = !1, G = []) {
                    let H = G.slice(),
                        J = X((ie) => {
                            H ? H.push(ie) : ee.fire(ie);
                        });
                    const x = () => {
                            H && H.forEach((ie) => ee.fire(ie)), (H = null);
                        },
                        ee = new v({
                            onFirstListenerAdd() {
                                J || (J = X((ie) => ee.fire(ie)));
                            },
                            onFirstListenerDidAdd() {
                                H && (q ? setTimeout(x) : x());
                            },
                            onLastListenerRemove() {
                                J && J.dispose(), (J = null);
                            },
                        });
                    return ee.event;
                }
                s.buffer = I;
                class F {
                    constructor(q) {
                        this.event = q;
                    }
                    map(q) {
                        return new F(l(this.event, q));
                    }
                    forEach(q) {
                        return new F(f(this.event, q));
                    }
                    filter(q) {
                        return new F(u(this.event, q));
                    }
                    reduce(q, G) {
                        return new F(A(this.event, q, G));
                    }
                    latch() {
                        return new F(k(this.event));
                    }
                    debounce(q, G = 100, H = !1, J) {
                        return new F(D(this.event, q, G, H, J));
                    }
                    on(q, G, H) {
                        return this.event(q, G, H);
                    }
                    once(q, G, H) {
                        return a(this.event)(q, G, H);
                    }
                }
                function O(X) {
                    return new F(X);
                }
                s.chain = O;
                function V(X, q, G = (H) => H) {
                    const H = (...ie) => ee.fire(G(...ie)),
                        J = () => X.on(q, H),
                        x = () => X.removeListener(q, H),
                        ee = new v({
                            onFirstListenerAdd: J,
                            onLastListenerRemove: x,
                        });
                    return ee.event;
                }
                s.fromNodeEventEmitter = V;
                function K(X, q, G = (H) => H) {
                    const H = (...ie) => ee.fire(G(...ie)),
                        J = () => X.addEventListener(q, H),
                        x = () => X.removeEventListener(q, H),
                        ee = new v({
                            onFirstListenerAdd: J,
                            onLastListenerRemove: x,
                        });
                    return ee.event;
                }
                s.fromDOMEventEmitter = K;
                function $(X) {
                    return new Promise((q) => a(X)(q));
                }
                s.toPromise = $;
                function z(X, q) {
                    return q(void 0), X((G) => q(G));
                }
                s.runAndSubscribe = z;
                function n(X, q) {
                    let G = null;
                    function H(x) {
                        G == null || G.dispose(),
                            (G = new e.DisposableStore()),
                            q(x, G);
                    }
                    H(void 0);
                    const J = X((x) => H(x));
                    return (0, e.toDisposable)(() => {
                        J.dispose(), G == null || G.dispose();
                    });
                }
                s.runAndSubscribeWithStore = n;
            })((c = r.Event || (r.Event = {})));
            class m {
                constructor(i) {
                    (this._listenerCount = 0),
                        (this._invocationCount = 0),
                        (this._elapsedOverall = 0),
                        (this._name = `${i}_${m._idPool++}`);
                }
                start(i) {
                    (this._stopWatch = new o.StopWatch(!0)),
                        (this._listenerCount = i);
                }
                stop() {
                    if (this._stopWatch) {
                        const i = this._stopWatch.elapsed();
                        (this._elapsedOverall += i),
                            (this._invocationCount += 1),
                            console.info(
                                `did FIRE ${
                                    this._name
                                }: elapsed_ms: ${i.toFixed(5)}, listener: ${
                                    this._listenerCount
                                } (elapsed_overall: ${this._elapsedOverall.toFixed(
                                    2
                                )}, invocations: ${this._invocationCount})`
                            ),
                            (this._stopWatch = void 0);
                    }
                }
            }
            m._idPool = 0;
            let S = -1;
            class t {
                constructor(i, a = Math.random().toString(18).slice(2, 5)) {
                    (this.customThreshold = i),
                        (this.name = a),
                        (this._warnCountdown = 0);
                }
                dispose() {
                    this._stacks && this._stacks.clear();
                }
                check(i, a) {
                    let l = S;
                    if (
                        (typeof this.customThreshold == 'number' &&
                            (l = this.customThreshold),
                        l <= 0 || a < l)
                    )
                        return;
                    this._stacks || (this._stacks = new Map());
                    const f = this._stacks.get(i.value) || 0;
                    if (
                        (this._stacks.set(i.value, f + 1),
                        (this._warnCountdown -= 1),
                        this._warnCountdown <= 0)
                    ) {
                        this._warnCountdown = l * 0.5;
                        let u,
                            _ = 0;
                        for (const [b, A] of this._stacks)
                            (!u || _ < A) && ((u = b), (_ = A));
                        console.warn(
                            `[${this.name}] potential listener LEAK detected, having ${a} listeners already. MOST frequent listener (${_}):`
                        ),
                            console.warn(u);
                    }
                    return () => {
                        const u = this._stacks.get(i.value) || 0;
                        this._stacks.set(i.value, u - 1);
                    };
                }
            }
            class d {
                constructor(i) {
                    this.value = i;
                }
                static create() {
                    var i;
                    return new d(
                        (i = new Error().stack) !== null && i !== void 0
                            ? i
                            : ''
                    );
                }
                print() {
                    console.warn(
                        this.value
                            .split(
                                `
`
                            )
                            .slice(2).join(`
`)
                    );
                }
            }
            class h {
                constructor(i, a, l) {
                    (this.callback = i),
                        (this.callbackThis = a),
                        (this.stack = l),
                        (this.subscription = new e.SafeDisposable());
                }
                invoke(i) {
                    this.callback.call(this.callbackThis, i);
                }
            }
            class v {
                constructor(i) {
                    var a;
                    (this._disposed = !1),
                        (this._options = i),
                        (this._leakageMon =
                            S > 0
                                ? new t(
                                      this._options &&
                                          this._options.leakWarningThreshold
                                  )
                                : void 0),
                        (this._perfMon = (
                            (a = this._options) === null || a === void 0
                                ? void 0
                                : a._profName
                        )
                            ? new m(this._options._profName)
                            : void 0);
                }
                dispose() {
                    var i, a, l, f;
                    if (!this._disposed) {
                        if (((this._disposed = !0), this._listeners)) {
                            if (w) {
                                const u = Array.from(this._listeners);
                                queueMicrotask(() => {
                                    var _;
                                    for (const b of u)
                                        b.subscription.isset() &&
                                            (b.subscription.unset(),
                                            (_ = b.stack) === null ||
                                                _ === void 0 ||
                                                _.print());
                                });
                            }
                            this._listeners.clear();
                        }
                        (i = this._deliveryQueue) === null ||
                            i === void 0 ||
                            i.clear(),
                            (l =
                                (a = this._options) === null || a === void 0
                                    ? void 0
                                    : a.onLastListenerRemove) === null ||
                                l === void 0 ||
                                l.call(a),
                            (f = this._leakageMon) === null ||
                                f === void 0 ||
                                f.dispose();
                    }
                }
                get event() {
                    return (
                        this._event ||
                            (this._event = (i, a, l) => {
                                var f, u, _;
                                this._listeners ||
                                    (this._listeners = new N.LinkedList());
                                const b = this._listeners.isEmpty();
                                b &&
                                    ((f = this._options) === null ||
                                    f === void 0
                                        ? void 0
                                        : f.onFirstListenerAdd) &&
                                    this._options.onFirstListenerAdd(this);
                                let A, P;
                                this._leakageMon &&
                                    this._listeners.size >= 30 &&
                                    ((P = d.create()),
                                    (A = this._leakageMon.check(
                                        P,
                                        this._listeners.size + 1
                                    ))),
                                    w && (P = P ?? d.create());
                                const D = new h(i, a, P),
                                    k = this._listeners.push(D);
                                b &&
                                    ((u = this._options) === null ||
                                    u === void 0
                                        ? void 0
                                        : u.onFirstListenerDidAdd) &&
                                    this._options.onFirstListenerDidAdd(this),
                                    ((_ = this._options) === null ||
                                    _ === void 0
                                        ? void 0
                                        : _.onListenerDidAdd) &&
                                        this._options.onListenerDidAdd(
                                            this,
                                            i,
                                            a
                                        );
                                const R = D.subscription.set(() => {
                                    A && A(),
                                        this._disposed ||
                                            (k(),
                                            this._options &&
                                                this._options
                                                    .onLastListenerRemove &&
                                                ((this._listeners &&
                                                    !this._listeners.isEmpty()) ||
                                                    this._options.onLastListenerRemove(
                                                        this
                                                    )));
                                });
                                return (
                                    l instanceof e.DisposableStore
                                        ? l.add(R)
                                        : Array.isArray(l) && l.push(R),
                                    R
                                );
                            }),
                        this._event
                    );
                }
                fire(i) {
                    var a, l;
                    if (this._listeners) {
                        this._deliveryQueue ||
                            (this._deliveryQueue = new N.LinkedList());
                        for (let f of this._listeners)
                            this._deliveryQueue.push([f, i]);
                        for (
                            (a = this._perfMon) === null ||
                            a === void 0 ||
                            a.start(this._deliveryQueue.size);
                            this._deliveryQueue.size > 0;

                        ) {
                            const [f, u] = this._deliveryQueue.shift();
                            try {
                                f.invoke(u);
                            } catch (_) {
                                (0, E.onUnexpectedError)(_);
                            }
                        }
                        (l = this._perfMon) === null ||
                            l === void 0 ||
                            l.stop();
                    }
                }
            }
            r.Emitter = v;
            class L extends v {
                constructor(i) {
                    super(i);
                    (this._isPaused = 0),
                        (this._eventQueue = new N.LinkedList()),
                        (this._mergeFn = i == null ? void 0 : i.merge);
                }
                pause() {
                    this._isPaused++;
                }
                resume() {
                    if (this._isPaused !== 0 && --this._isPaused == 0)
                        if (this._mergeFn) {
                            const i = Array.from(this._eventQueue);
                            this._eventQueue.clear(),
                                super.fire(this._mergeFn(i));
                        } else
                            for (
                                ;
                                !this._isPaused && this._eventQueue.size !== 0;

                            )
                                super.fire(this._eventQueue.shift());
                }
                fire(i) {
                    this._listeners &&
                        (this._isPaused !== 0
                            ? this._eventQueue.push(i)
                            : super.fire(i));
                }
            }
            r.PauseableEmitter = L;
            class C extends L {
                constructor(i) {
                    var a;
                    super(i);
                    this._delay =
                        (a = i.delay) !== null && a !== void 0 ? a : 100;
                }
                fire(i) {
                    this._handle ||
                        (this.pause(),
                        (this._handle = setTimeout(() => {
                            (this._handle = void 0), this.resume();
                        }, this._delay))),
                        super.fire(i);
                }
            }
            r.DebounceEmitter = C;
            class y {
                constructor() {
                    this.buffers = [];
                }
                wrapEvent(i) {
                    return (a, l, f) =>
                        i(
                            (u) => {
                                const _ = this.buffers[this.buffers.length - 1];
                                _ ? _.push(() => a.call(l, u)) : a.call(l, u);
                            },
                            void 0,
                            f
                        );
                }
                bufferEvents(i) {
                    const a = [];
                    this.buffers.push(a);
                    const l = i();
                    return this.buffers.pop(), a.forEach((f) => f()), l;
                }
            }
            r.EventBufferer = y;
            class p {
                constructor() {
                    (this.listening = !1),
                        (this.inputEvent = c.None),
                        (this.inputEventListener = e.Disposable.None),
                        (this.emitter = new v({
                            onFirstListenerDidAdd: () => {
                                (this.listening = !0),
                                    (this.inputEventListener = this.inputEvent(
                                        this.emitter.fire,
                                        this.emitter
                                    ));
                            },
                            onLastListenerRemove: () => {
                                (this.listening = !1),
                                    this.inputEventListener.dispose();
                            },
                        })),
                        (this.event = this.emitter.event);
                }
                set input(i) {
                    (this.inputEvent = i),
                        this.listening &&
                            (this.inputEventListener.dispose(),
                            (this.inputEventListener = i(
                                this.emitter.fire,
                                this.emitter
                            )));
                }
                dispose() {
                    this.inputEventListener.dispose(), this.emitter.dispose();
                }
            }
            r.Relay = p;
        }),
        Y(Q[27], Z([0, 1, 6]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.CancellationTokenSource = r.CancellationToken = void 0);
            const e = Object.freeze(function (g, c) {
                const m = setTimeout(g.bind(c), 0);
                return {
                    dispose() {
                        clearTimeout(m);
                    },
                };
            });
            var N;
            (function (g) {
                function c(m) {
                    return m === g.None || m === g.Cancelled || m instanceof o
                        ? !0
                        : !m || typeof m != 'object'
                        ? !1
                        : typeof m.isCancellationRequested == 'boolean' &&
                          typeof m.onCancellationRequested == 'function';
                }
                (g.isCancellationToken = c),
                    (g.None = Object.freeze({
                        isCancellationRequested: !1,
                        onCancellationRequested: E.Event.None,
                    })),
                    (g.Cancelled = Object.freeze({
                        isCancellationRequested: !0,
                        onCancellationRequested: e,
                    }));
            })((N = r.CancellationToken || (r.CancellationToken = {})));
            class o {
                constructor() {
                    (this._isCancelled = !1), (this._emitter = null);
                }
                cancel() {
                    this._isCancelled ||
                        ((this._isCancelled = !0),
                        this._emitter &&
                            (this._emitter.fire(void 0), this.dispose()));
                }
                get isCancellationRequested() {
                    return this._isCancelled;
                }
                get onCancellationRequested() {
                    return this._isCancelled
                        ? e
                        : (this._emitter || (this._emitter = new E.Emitter()),
                          this._emitter.event);
                }
                dispose() {
                    this._emitter &&
                        (this._emitter.dispose(), (this._emitter = null));
                }
            }
            class w {
                constructor(c) {
                    (this._token = void 0),
                        (this._parentListener = void 0),
                        (this._parentListener =
                            c && c.onCancellationRequested(this.cancel, this));
                }
                get token() {
                    return this._token || (this._token = new o()), this._token;
                }
                cancel() {
                    this._token
                        ? this._token instanceof o && this._token.cancel()
                        : (this._token = N.Cancelled);
                }
                dispose(c = !1) {
                    c && this.cancel(),
                        this._parentListener && this._parentListener.dispose(),
                        this._token
                            ? this._token instanceof o && this._token.dispose()
                            : (this._token = N.None);
                }
            }
            r.CancellationTokenSource = w;
        }),
        Y(Q[2], Z([0, 1, 17, 23]), function (U, r, E, e) {
            'use strict';
            var N;
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.InvisibleCharacters =
                    r.AmbiguousCharacters =
                    r.noBreakWhitespace =
                    r.getLeftDeleteOffset =
                    r.singleLetterHash =
                    r.containsUppercaseCharacter =
                    r.startsWithUTF8BOM =
                    r.UTF8_BOM_CHARACTER =
                    r.isEmojiImprecise =
                    r.isFullWidthCharacter =
                    r.containsUnusualLineTerminators =
                    r.UNUSUAL_LINE_TERMINATORS =
                    r.isBasicASCII =
                    r.containsRTL =
                    r.getCharContainingOffset =
                    r.prevCharLength =
                    r.nextCharLength =
                    r.GraphemeIterator =
                    r.CodePointIterator =
                    r.getNextCodePoint =
                    r.computeCodePoint =
                    r.isLowSurrogate =
                    r.isHighSurrogate =
                    r.commonSuffixLength =
                    r.commonPrefixLength =
                    r.startsWithIgnoreCase =
                    r.equalsIgnoreCase =
                    r.isUpperAsciiLetter =
                    r.isLowerAsciiLetter =
                    r.compareSubstringIgnoreCase =
                    r.compareIgnoreCase =
                    r.compareSubstring =
                    r.compare =
                    r.lastNonWhitespaceIndex =
                    r.getLeadingWhitespace =
                    r.firstNonWhitespaceIndex =
                    r.splitLines =
                    r.regExpFlags =
                    r.regExpLeadsToEndlessLoop =
                    r.createRegExp =
                    r.stripWildcards =
                    r.convertSimple2RegExpPattern =
                    r.rtrim =
                    r.ltrim =
                    r.trim =
                    r.escapeRegExpCharacters =
                    r.escape =
                    r.format =
                    r.isFalsyOrWhitespace =
                        void 0);
            function o(M) {
                return !M || typeof M != 'string' ? !0 : M.trim().length === 0;
            }
            r.isFalsyOrWhitespace = o;
            const w = /{(\d+)}/g;
            function g(M, ...T) {
                return T.length === 0
                    ? M
                    : M.replace(w, function (B, W) {
                          const j = parseInt(W, 10);
                          return isNaN(j) || j < 0 || j >= T.length ? B : T[j];
                      });
            }
            r.format = g;
            function c(M) {
                return M.replace(/[<>&]/g, function (T) {
                    switch (T) {
                        case '<':
                            return '&lt;';
                        case '>':
                            return '&gt;';
                        case '&':
                            return '&amp;';
                        default:
                            return T;
                    }
                });
            }
            r.escape = c;
            function m(M) {
                return M.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
            }
            r.escapeRegExpCharacters = m;
            function S(M, T = ' ') {
                const B = t(M, T);
                return d(B, T);
            }
            r.trim = S;
            function t(M, T) {
                if (!M || !T) return M;
                const B = T.length;
                if (B === 0 || M.length === 0) return M;
                let W = 0;
                for (; M.indexOf(T, W) === W; ) W = W + B;
                return M.substring(W);
            }
            r.ltrim = t;
            function d(M, T) {
                if (!M || !T) return M;
                const B = T.length,
                    W = M.length;
                if (B === 0 || W === 0) return M;
                let j = W,
                    te = -1;
                for (
                    ;
                    (te = M.lastIndexOf(T, j - 1)),
                        !(te === -1 || te + B !== j);

                ) {
                    if (te === 0) return '';
                    j = te;
                }
                return M.substring(0, j);
            }
            r.rtrim = d;
            function h(M) {
                return M.replace(
                    /[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g,
                    '\\$&'
                ).replace(/[\*]/g, '.*');
            }
            r.convertSimple2RegExpPattern = h;
            function v(M) {
                return M.replace(/\*/g, '');
            }
            r.stripWildcards = v;
            function L(M, T, B = {}) {
                if (!M)
                    throw new Error('Cannot create regex from empty string');
                T || (M = m(M)),
                    B.wholeWord &&
                        (/\B/.test(M.charAt(0)) || (M = '\\b' + M),
                        /\B/.test(M.charAt(M.length - 1)) || (M = M + '\\b'));
                let W = '';
                return (
                    B.global && (W += 'g'),
                    B.matchCase || (W += 'i'),
                    B.multiline && (W += 'm'),
                    B.unicode && (W += 'u'),
                    new RegExp(M, W)
                );
            }
            r.createRegExp = L;
            function C(M) {
                return M.source === '^' ||
                    M.source === '^$' ||
                    M.source === '$' ||
                    M.source === '^\\s*$'
                    ? !1
                    : !!(M.exec('') && M.lastIndex === 0);
            }
            r.regExpLeadsToEndlessLoop = C;
            function y(M) {
                return (
                    (M.global ? 'g' : '') +
                    (M.ignoreCase ? 'i' : '') +
                    (M.multiline ? 'm' : '') +
                    (M.unicode ? 'u' : '')
                );
            }
            r.regExpFlags = y;
            function p(M) {
                return M.split(/\r\n|\r|\n/);
            }
            r.splitLines = p;
            function s(M) {
                for (let T = 0, B = M.length; T < B; T++) {
                    const W = M.charCodeAt(T);
                    if (W !== 32 && W !== 9) return T;
                }
                return -1;
            }
            r.firstNonWhitespaceIndex = s;
            function i(M, T = 0, B = M.length) {
                for (let W = T; W < B; W++) {
                    const j = M.charCodeAt(W);
                    if (j !== 32 && j !== 9) return M.substring(T, W);
                }
                return M.substring(T, B);
            }
            r.getLeadingWhitespace = i;
            function a(M, T = M.length - 1) {
                for (let B = T; B >= 0; B--) {
                    const W = M.charCodeAt(B);
                    if (W !== 32 && W !== 9) return B;
                }
                return -1;
            }
            r.lastNonWhitespaceIndex = a;
            function l(M, T) {
                return M < T ? -1 : M > T ? 1 : 0;
            }
            r.compare = l;
            function f(M, T, B = 0, W = M.length, j = 0, te = T.length) {
                for (; B < W && j < te; B++, j++) {
                    let ce = M.charCodeAt(B),
                        ne = T.charCodeAt(j);
                    if (ce < ne) return -1;
                    if (ce > ne) return 1;
                }
                const se = W - B,
                    de = te - j;
                return se < de ? -1 : se > de ? 1 : 0;
            }
            r.compareSubstring = f;
            function u(M, T) {
                return _(M, T, 0, M.length, 0, T.length);
            }
            r.compareIgnoreCase = u;
            function _(M, T, B = 0, W = M.length, j = 0, te = T.length) {
                for (; B < W && j < te; B++, j++) {
                    let ce = M.charCodeAt(B),
                        ne = T.charCodeAt(j);
                    if (ce === ne) continue;
                    if (ce >= 128 || ne >= 128)
                        return f(M.toLowerCase(), T.toLowerCase(), B, W, j, te);
                    b(ce) && (ce -= 32), b(ne) && (ne -= 32);
                    const ae = ce - ne;
                    if (ae !== 0) return ae;
                }
                const se = W - B,
                    de = te - j;
                return se < de ? -1 : se > de ? 1 : 0;
            }
            r.compareSubstringIgnoreCase = _;
            function b(M) {
                return M >= 97 && M <= 122;
            }
            r.isLowerAsciiLetter = b;
            function A(M) {
                return M >= 65 && M <= 90;
            }
            r.isUpperAsciiLetter = A;
            function P(M, T) {
                return M.length === T.length && _(M, T) === 0;
            }
            r.equalsIgnoreCase = P;
            function D(M, T) {
                const B = T.length;
                return T.length > M.length ? !1 : _(M, T, 0, B) === 0;
            }
            r.startsWithIgnoreCase = D;
            function k(M, T) {
                let B,
                    W = Math.min(M.length, T.length);
                for (B = 0; B < W; B++)
                    if (M.charCodeAt(B) !== T.charCodeAt(B)) return B;
                return W;
            }
            r.commonPrefixLength = k;
            function R(M, T) {
                let B,
                    W = Math.min(M.length, T.length);
                const j = M.length - 1,
                    te = T.length - 1;
                for (B = 0; B < W; B++)
                    if (M.charCodeAt(j - B) !== T.charCodeAt(te - B)) return B;
                return W;
            }
            r.commonSuffixLength = R;
            function I(M) {
                return 55296 <= M && M <= 56319;
            }
            r.isHighSurrogate = I;
            function F(M) {
                return 56320 <= M && M <= 57343;
            }
            r.isLowSurrogate = F;
            function O(M, T) {
                return ((M - 55296) << 10) + (T - 56320) + 65536;
            }
            r.computeCodePoint = O;
            function V(M, T, B) {
                const W = M.charCodeAt(B);
                if (I(W) && B + 1 < T) {
                    const j = M.charCodeAt(B + 1);
                    if (F(j)) return O(W, j);
                }
                return W;
            }
            r.getNextCodePoint = V;
            function K(M, T) {
                const B = M.charCodeAt(T - 1);
                if (F(B) && T > 1) {
                    const W = M.charCodeAt(T - 2);
                    if (I(W)) return O(W, B);
                }
                return B;
            }
            class $ {
                constructor(T, B = 0) {
                    (this._str = T), (this._len = T.length), (this._offset = B);
                }
                get offset() {
                    return this._offset;
                }
                setOffset(T) {
                    this._offset = T;
                }
                prevCodePoint() {
                    const T = K(this._str, this._offset);
                    return (this._offset -= T >= 65536 ? 2 : 1), T;
                }
                nextCodePoint() {
                    const T = V(this._str, this._len, this._offset);
                    return (this._offset += T >= 65536 ? 2 : 1), T;
                }
                eol() {
                    return this._offset >= this._len;
                }
            }
            r.CodePointIterator = $;
            class z {
                constructor(T, B = 0) {
                    this._iterator = new $(T, B);
                }
                get offset() {
                    return this._iterator.offset;
                }
                nextGraphemeLength() {
                    const T = le.getInstance(),
                        B = this._iterator,
                        W = B.offset;
                    let j = T.getGraphemeBreakType(B.nextCodePoint());
                    for (; !B.eol(); ) {
                        const te = B.offset,
                            se = T.getGraphemeBreakType(B.nextCodePoint());
                        if (Ce(j, se)) {
                            B.setOffset(te);
                            break;
                        }
                        j = se;
                    }
                    return B.offset - W;
                }
                prevGraphemeLength() {
                    const T = le.getInstance(),
                        B = this._iterator,
                        W = B.offset;
                    let j = T.getGraphemeBreakType(B.prevCodePoint());
                    for (; B.offset > 0; ) {
                        const te = B.offset,
                            se = T.getGraphemeBreakType(B.prevCodePoint());
                        if (Ce(se, j)) {
                            B.setOffset(te);
                            break;
                        }
                        j = se;
                    }
                    return W - B.offset;
                }
                eol() {
                    return this._iterator.eol();
                }
            }
            r.GraphemeIterator = z;
            function n(M, T) {
                return new z(M, T).nextGraphemeLength();
            }
            r.nextCharLength = n;
            function X(M, T) {
                return new z(M, T).prevGraphemeLength();
            }
            r.prevCharLength = X;
            function q(M, T) {
                T > 0 && F(M.charCodeAt(T)) && T--;
                const B = T + n(M, T);
                return [B - X(M, B), B];
            }
            r.getCharContainingOffset = q;
            const G =
                /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
            function H(M) {
                return G.test(M);
            }
            r.containsRTL = H;
            const J = /^[\t\n\r\x20-\x7E]*$/;
            function x(M) {
                return J.test(M);
            }
            (r.isBasicASCII = x),
                (r.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/);
            function ee(M) {
                return r.UNUSUAL_LINE_TERMINATORS.test(M);
            }
            r.containsUnusualLineTerminators = ee;
            function ie(M) {
                return (
                    (M >= 11904 && M <= 55215) ||
                    (M >= 63744 && M <= 64255) ||
                    (M >= 65281 && M <= 65374)
                );
            }
            r.isFullWidthCharacter = ie;
            function he(M) {
                return (
                    (M >= 127462 && M <= 127487) ||
                    M === 8986 ||
                    M === 8987 ||
                    M === 9200 ||
                    M === 9203 ||
                    (M >= 9728 && M <= 10175) ||
                    M === 11088 ||
                    M === 11093 ||
                    (M >= 127744 && M <= 128591) ||
                    (M >= 128640 && M <= 128764) ||
                    (M >= 128992 && M <= 129008) ||
                    (M >= 129280 && M <= 129535) ||
                    (M >= 129648 && M <= 129782)
                );
            }
            (r.isEmojiImprecise = he),
                (r.UTF8_BOM_CHARACTER = String.fromCharCode(65279));
            function _e(M) {
                return !!(M && M.length > 0 && M.charCodeAt(0) === 65279);
            }
            r.startsWithUTF8BOM = _e;
            function be(M, T = !1) {
                return M
                    ? (T && (M = M.replace(/\\./g, '')), M.toLowerCase() !== M)
                    : !1;
            }
            r.containsUppercaseCharacter = be;
            function me(M) {
                const T = 90 - 65 + 1;
                return (
                    (M = M % (2 * T)),
                    M < T
                        ? String.fromCharCode(97 + M)
                        : String.fromCharCode(65 + M - T)
                );
            }
            r.singleLetterHash = me;
            function Ce(M, T) {
                return M === 0
                    ? T !== 5 && T !== 7
                    : M === 2 && T === 3
                    ? !1
                    : M === 4 ||
                      M === 2 ||
                      M === 3 ||
                      T === 4 ||
                      T === 2 ||
                      T === 3
                    ? !0
                    : !(
                          (M === 8 &&
                              (T === 8 || T === 9 || T === 11 || T === 12)) ||
                          ((M === 11 || M === 9) && (T === 9 || T === 10)) ||
                          ((M === 12 || M === 10) && T === 10) ||
                          T === 5 ||
                          T === 13 ||
                          T === 7 ||
                          M === 1 ||
                          (M === 13 && T === 14) ||
                          (M === 6 && T === 6)
                      );
            }
            class le {
                constructor() {
                    this._data = ye();
                }
                static getInstance() {
                    return (
                        le._INSTANCE || (le._INSTANCE = new le()), le._INSTANCE
                    );
                }
                getGraphemeBreakType(T) {
                    if (T < 32) return T === 10 ? 3 : T === 13 ? 2 : 4;
                    if (T < 127) return 0;
                    const B = this._data,
                        W = B.length / 3;
                    let j = 1;
                    for (; j <= W; )
                        if (T < B[3 * j]) j = 2 * j;
                        else if (T > B[3 * j + 1]) j = 2 * j + 1;
                        else return B[3 * j + 2];
                    return 0;
                }
            }
            le._INSTANCE = null;
            function ye() {
                return JSON.parse(
                    '[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]'
                );
            }
            function Le(M, T) {
                if (M === 0) return 0;
                const B = Ne(M, T);
                if (B !== void 0) return B;
                const W = new $(T, M);
                return W.prevCodePoint(), W.offset;
            }
            r.getLeftDeleteOffset = Le;
            function Ne(M, T) {
                const B = new $(T, M);
                let W = B.prevCodePoint();
                for (; Ae(W) || W === 65039 || W === 8419; ) {
                    if (B.offset === 0) return;
                    W = B.prevCodePoint();
                }
                if (!he(W)) return;
                let j = B.offset;
                return j > 0 && B.prevCodePoint() === 8205 && (j = B.offset), j;
            }
            function Ae(M) {
                return 127995 <= M && M <= 127999;
            }
            r.noBreakWhitespace = '\xA0';
            class ue {
                constructor(T) {
                    this.confusableDictionary = T;
                }
                static getInstance(T) {
                    return ue.cache.get(Array.from(T));
                }
                static getLocales() {
                    return ue._locales.getValue();
                }
                isAmbiguous(T) {
                    return this.confusableDictionary.has(T);
                }
                getPrimaryConfusable(T) {
                    return this.confusableDictionary.get(T);
                }
                getConfusableCodePoints() {
                    return new Set(this.confusableDictionary.keys());
                }
            }
            (r.AmbiguousCharacters = ue),
                (N = ue),
                (ue.ambiguousCharacterData = new e.Lazy(() =>
                    JSON.parse(
                        '{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}'
                    )
                )),
                (ue.cache = new E.LRUCachedComputed((M) => {
                    function T(ne) {
                        const ae = new Map();
                        for (let fe = 0; fe < ne.length; fe += 2)
                            ae.set(ne[fe], ne[fe + 1]);
                        return ae;
                    }
                    function B(ne, ae) {
                        const fe = new Map(ne);
                        for (const [we, ve] of ae) fe.set(we, ve);
                        return fe;
                    }
                    function W(ne, ae) {
                        if (!ne) return ae;
                        const fe = new Map();
                        for (const [we, ve] of ne) ae.has(we) && fe.set(we, ve);
                        return fe;
                    }
                    const j = N.ambiguousCharacterData.getValue();
                    let te = M.filter((ne) => !ne.startsWith('_') && ne in j);
                    te.length === 0 && (te = ['_default']);
                    let se;
                    for (const ne of te) {
                        const ae = T(j[ne]);
                        se = W(se, ae);
                    }
                    const de = T(j._common),
                        ce = B(de, se);
                    return new ue(ce);
                })),
                (ue._locales = new e.Lazy(() =>
                    Object.keys(ue.ambiguousCharacterData.getValue()).filter(
                        (M) => !M.startsWith('_')
                    )
                ));
            class ge {
                static getRawData() {
                    return JSON.parse(
                        '[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]'
                    );
                }
                static getData() {
                    return (
                        this._data || (this._data = new Set(ge.getRawData())),
                        this._data
                    );
                }
                static isInvisibleCharacter(T) {
                    return ge.getData().has(T);
                }
                static get codePoints() {
                    return ge.getData();
                }
            }
            (r.InvisibleCharacters = ge), (ge._data = void 0);
        }),
        Y(Q[28], Z([0, 1, 2]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.StringSHA1 =
                    r.toHexString =
                    r.stringHash =
                    r.numberHash =
                    r.doHash =
                    r.hash =
                        void 0);
            function e(L) {
                return N(L, 0);
            }
            r.hash = e;
            function N(L, C) {
                switch (typeof L) {
                    case 'object':
                        return L === null
                            ? o(349, C)
                            : Array.isArray(L)
                            ? c(L, C)
                            : m(L, C);
                    case 'string':
                        return g(L, C);
                    case 'boolean':
                        return w(L, C);
                    case 'number':
                        return o(L, C);
                    case 'undefined':
                        return o(937, C);
                    default:
                        return o(617, C);
                }
            }
            r.doHash = N;
            function o(L, C) {
                return ((C << 5) - C + L) | 0;
            }
            r.numberHash = o;
            function w(L, C) {
                return o(L ? 433 : 863, C);
            }
            function g(L, C) {
                C = o(149417, C);
                for (let y = 0, p = L.length; y < p; y++)
                    C = o(L.charCodeAt(y), C);
                return C;
            }
            r.stringHash = g;
            function c(L, C) {
                return (C = o(104579, C)), L.reduce((y, p) => N(p, y), C);
            }
            function m(L, C) {
                return (
                    (C = o(181387, C)),
                    Object.keys(L)
                        .sort()
                        .reduce((y, p) => ((y = g(p, y)), N(L[p], y)), C)
                );
            }
            function S(L, C, y = 32) {
                const p = y - C,
                    s = ~((1 << p) - 1);
                return ((L << C) | ((s & L) >>> p)) >>> 0;
            }
            function t(L, C = 0, y = L.byteLength, p = 0) {
                for (let s = 0; s < y; s++) L[C + s] = p;
            }
            function d(L, C, y = '0') {
                for (; L.length < C; ) L = y + L;
                return L;
            }
            function h(L, C = 32) {
                return L instanceof ArrayBuffer
                    ? Array.from(new Uint8Array(L))
                          .map((y) => y.toString(16).padStart(2, '0'))
                          .join('')
                    : d((L >>> 0).toString(16), C / 4);
            }
            r.toHexString = h;
            class v {
                constructor() {
                    (this._h0 = 1732584193),
                        (this._h1 = 4023233417),
                        (this._h2 = 2562383102),
                        (this._h3 = 271733878),
                        (this._h4 = 3285377520),
                        (this._buff = new Uint8Array(64 + 3)),
                        (this._buffDV = new DataView(this._buff.buffer)),
                        (this._buffLen = 0),
                        (this._totalLen = 0),
                        (this._leftoverHighSurrogate = 0),
                        (this._finished = !1);
                }
                update(C) {
                    const y = C.length;
                    if (y === 0) return;
                    const p = this._buff;
                    let s = this._buffLen,
                        i = this._leftoverHighSurrogate,
                        a,
                        l;
                    for (
                        i !== 0
                            ? ((a = i), (l = -1), (i = 0))
                            : ((a = C.charCodeAt(0)), (l = 0));
                        ;

                    ) {
                        let f = a;
                        if (E.isHighSurrogate(a))
                            if (l + 1 < y) {
                                const u = C.charCodeAt(l + 1);
                                E.isLowSurrogate(u)
                                    ? (l++, (f = E.computeCodePoint(a, u)))
                                    : (f = 65533);
                            } else {
                                i = a;
                                break;
                            }
                        else E.isLowSurrogate(a) && (f = 65533);
                        if (((s = this._push(p, s, f)), l++, l < y))
                            a = C.charCodeAt(l);
                        else break;
                    }
                    (this._buffLen = s), (this._leftoverHighSurrogate = i);
                }
                _push(C, y, p) {
                    return (
                        p < 128
                            ? (C[y++] = p)
                            : p < 2048
                            ? ((C[y++] = 192 | ((p & 1984) >>> 6)),
                              (C[y++] = 128 | ((p & 63) >>> 0)))
                            : p < 65536
                            ? ((C[y++] = 224 | ((p & 61440) >>> 12)),
                              (C[y++] = 128 | ((p & 4032) >>> 6)),
                              (C[y++] = 128 | ((p & 63) >>> 0)))
                            : ((C[y++] = 240 | ((p & 1835008) >>> 18)),
                              (C[y++] = 128 | ((p & 258048) >>> 12)),
                              (C[y++] = 128 | ((p & 4032) >>> 6)),
                              (C[y++] = 128 | ((p & 63) >>> 0))),
                        y >= 64 &&
                            (this._step(),
                            (y -= 64),
                            (this._totalLen += 64),
                            (C[0] = C[64 + 0]),
                            (C[1] = C[64 + 1]),
                            (C[2] = C[64 + 2])),
                        y
                    );
                }
                digest() {
                    return (
                        this._finished ||
                            ((this._finished = !0),
                            this._leftoverHighSurrogate &&
                                ((this._leftoverHighSurrogate = 0),
                                (this._buffLen = this._push(
                                    this._buff,
                                    this._buffLen,
                                    65533
                                ))),
                            (this._totalLen += this._buffLen),
                            this._wrapUp()),
                        h(this._h0) +
                            h(this._h1) +
                            h(this._h2) +
                            h(this._h3) +
                            h(this._h4)
                    );
                }
                _wrapUp() {
                    (this._buff[this._buffLen++] = 128),
                        t(this._buff, this._buffLen),
                        this._buffLen > 56 && (this._step(), t(this._buff));
                    const C = 8 * this._totalLen;
                    this._buffDV.setUint32(56, Math.floor(C / 4294967296), !1),
                        this._buffDV.setUint32(60, C % 4294967296, !1),
                        this._step();
                }
                _step() {
                    const C = v._bigBlock32,
                        y = this._buffDV;
                    for (let b = 0; b < 64; b += 4)
                        C.setUint32(b, y.getUint32(b, !1), !1);
                    for (let b = 64; b < 320; b += 4)
                        C.setUint32(
                            b,
                            S(
                                C.getUint32(b - 12, !1) ^
                                    C.getUint32(b - 32, !1) ^
                                    C.getUint32(b - 56, !1) ^
                                    C.getUint32(b - 64, !1),
                                1
                            ),
                            !1
                        );
                    let p = this._h0,
                        s = this._h1,
                        i = this._h2,
                        a = this._h3,
                        l = this._h4,
                        f,
                        u,
                        _;
                    for (let b = 0; b < 80; b++)
                        b < 20
                            ? ((f = (s & i) | (~s & a)), (u = 1518500249))
                            : b < 40
                            ? ((f = s ^ i ^ a), (u = 1859775393))
                            : b < 60
                            ? ((f = (s & i) | (s & a) | (i & a)),
                              (u = 2400959708))
                            : ((f = s ^ i ^ a), (u = 3395469782)),
                            (_ =
                                (S(p, 5) + f + l + u + C.getUint32(b * 4, !1)) &
                                4294967295),
                            (l = a),
                            (a = i),
                            (i = S(s, 30)),
                            (s = p),
                            (p = _);
                    (this._h0 = (this._h0 + p) & 4294967295),
                        (this._h1 = (this._h1 + s) & 4294967295),
                        (this._h2 = (this._h2 + i) & 4294967295),
                        (this._h3 = (this._h3 + a) & 4294967295),
                        (this._h4 = (this._h4 + l) & 4294967295);
                }
            }
            (r.StringSHA1 = v),
                (v._bigBlock32 = new DataView(new ArrayBuffer(320)));
        }),
        Y(Q[12], Z([0, 1, 19, 28]), function (U, r, E, e) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.LcsDiff =
                    r.MyArray =
                    r.Debug =
                    r.stringDiff =
                    r.StringDiffSequence =
                        void 0);
            class N {
                constructor(t) {
                    this.source = t;
                }
                getElements() {
                    const t = this.source,
                        d = new Int32Array(t.length);
                    for (let h = 0, v = t.length; h < v; h++)
                        d[h] = t.charCodeAt(h);
                    return d;
                }
            }
            r.StringDiffSequence = N;
            function o(S, t, d) {
                return new m(new N(S), new N(t)).ComputeDiff(d).changes;
            }
            r.stringDiff = o;
            class w {
                static Assert(t, d) {
                    if (!t) throw new Error(d);
                }
            }
            r.Debug = w;
            class g {
                static Copy(t, d, h, v, L) {
                    for (let C = 0; C < L; C++) h[v + C] = t[d + C];
                }
                static Copy2(t, d, h, v, L) {
                    for (let C = 0; C < L; C++) h[v + C] = t[d + C];
                }
            }
            r.MyArray = g;
            class c {
                constructor() {
                    (this.m_changes = []),
                        (this.m_originalStart = 1073741824),
                        (this.m_modifiedStart = 1073741824),
                        (this.m_originalCount = 0),
                        (this.m_modifiedCount = 0);
                }
                MarkNextChange() {
                    (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
                        this.m_changes.push(
                            new E.DiffChange(
                                this.m_originalStart,
                                this.m_originalCount,
                                this.m_modifiedStart,
                                this.m_modifiedCount
                            )
                        ),
                        (this.m_originalCount = 0),
                        (this.m_modifiedCount = 0),
                        (this.m_originalStart = 1073741824),
                        (this.m_modifiedStart = 1073741824);
                }
                AddOriginalElement(t, d) {
                    (this.m_originalStart = Math.min(this.m_originalStart, t)),
                        (this.m_modifiedStart = Math.min(
                            this.m_modifiedStart,
                            d
                        )),
                        this.m_originalCount++;
                }
                AddModifiedElement(t, d) {
                    (this.m_originalStart = Math.min(this.m_originalStart, t)),
                        (this.m_modifiedStart = Math.min(
                            this.m_modifiedStart,
                            d
                        )),
                        this.m_modifiedCount++;
                }
                getChanges() {
                    return (
                        (this.m_originalCount > 0 ||
                            this.m_modifiedCount > 0) &&
                            this.MarkNextChange(),
                        this.m_changes
                    );
                }
                getReverseChanges() {
                    return (
                        (this.m_originalCount > 0 ||
                            this.m_modifiedCount > 0) &&
                            this.MarkNextChange(),
                        this.m_changes.reverse(),
                        this.m_changes
                    );
                }
            }
            class m {
                constructor(t, d, h = null) {
                    (this.ContinueProcessingPredicate = h),
                        (this._originalSequence = t),
                        (this._modifiedSequence = d);
                    const [v, L, C] = m._getElements(t),
                        [y, p, s] = m._getElements(d);
                    (this._hasStrings = C && s),
                        (this._originalStringElements = v),
                        (this._originalElementsOrHash = L),
                        (this._modifiedStringElements = y),
                        (this._modifiedElementsOrHash = p),
                        (this.m_forwardHistory = []),
                        (this.m_reverseHistory = []);
                }
                static _isStringArray(t) {
                    return t.length > 0 && typeof t[0] == 'string';
                }
                static _getElements(t) {
                    const d = t.getElements();
                    if (m._isStringArray(d)) {
                        const h = new Int32Array(d.length);
                        for (let v = 0, L = d.length; v < L; v++)
                            h[v] = (0, e.stringHash)(d[v], 0);
                        return [d, h, !0];
                    }
                    return d instanceof Int32Array
                        ? [[], d, !1]
                        : [[], new Int32Array(d), !1];
                }
                ElementsAreEqual(t, d) {
                    return this._originalElementsOrHash[t] !==
                        this._modifiedElementsOrHash[d]
                        ? !1
                        : this._hasStrings
                        ? this._originalStringElements[t] ===
                          this._modifiedStringElements[d]
                        : !0;
                }
                ElementsAreStrictEqual(t, d) {
                    if (!this.ElementsAreEqual(t, d)) return !1;
                    const h = m._getStrictElement(this._originalSequence, t),
                        v = m._getStrictElement(this._modifiedSequence, d);
                    return h === v;
                }
                static _getStrictElement(t, d) {
                    return typeof t.getStrictElement == 'function'
                        ? t.getStrictElement(d)
                        : null;
                }
                OriginalElementsAreEqual(t, d) {
                    return this._originalElementsOrHash[t] !==
                        this._originalElementsOrHash[d]
                        ? !1
                        : this._hasStrings
                        ? this._originalStringElements[t] ===
                          this._originalStringElements[d]
                        : !0;
                }
                ModifiedElementsAreEqual(t, d) {
                    return this._modifiedElementsOrHash[t] !==
                        this._modifiedElementsOrHash[d]
                        ? !1
                        : this._hasStrings
                        ? this._modifiedStringElements[t] ===
                          this._modifiedStringElements[d]
                        : !0;
                }
                ComputeDiff(t) {
                    return this._ComputeDiff(
                        0,
                        this._originalElementsOrHash.length - 1,
                        0,
                        this._modifiedElementsOrHash.length - 1,
                        t
                    );
                }
                _ComputeDiff(t, d, h, v, L) {
                    const C = [!1];
                    let y = this.ComputeDiffRecursive(t, d, h, v, C);
                    return (
                        L && (y = this.PrettifyChanges(y)),
                        { quitEarly: C[0], changes: y }
                    );
                }
                ComputeDiffRecursive(t, d, h, v, L) {
                    for (
                        L[0] = !1;
                        t <= d && h <= v && this.ElementsAreEqual(t, h);

                    )
                        t++, h++;
                    for (; d >= t && v >= h && this.ElementsAreEqual(d, v); )
                        d--, v--;
                    if (t > d || h > v) {
                        let a;
                        return (
                            h <= v
                                ? (w.Assert(
                                      t === d + 1,
                                      'originalStart should only be one more than originalEnd'
                                  ),
                                  (a = [new E.DiffChange(t, 0, h, v - h + 1)]))
                                : t <= d
                                ? (w.Assert(
                                      h === v + 1,
                                      'modifiedStart should only be one more than modifiedEnd'
                                  ),
                                  (a = [new E.DiffChange(t, d - t + 1, h, 0)]))
                                : (w.Assert(
                                      t === d + 1,
                                      'originalStart should only be one more than originalEnd'
                                  ),
                                  w.Assert(
                                      h === v + 1,
                                      'modifiedStart should only be one more than modifiedEnd'
                                  ),
                                  (a = [])),
                            a
                        );
                    }
                    const C = [0],
                        y = [0],
                        p = this.ComputeRecursionPoint(t, d, h, v, C, y, L),
                        s = C[0],
                        i = y[0];
                    if (p !== null) return p;
                    if (!L[0]) {
                        const a = this.ComputeDiffRecursive(t, s, h, i, L);
                        let l = [];
                        return (
                            L[0]
                                ? (l = [
                                      new E.DiffChange(
                                          s + 1,
                                          d - (s + 1) + 1,
                                          i + 1,
                                          v - (i + 1) + 1
                                      ),
                                  ])
                                : (l = this.ComputeDiffRecursive(
                                      s + 1,
                                      d,
                                      i + 1,
                                      v,
                                      L
                                  )),
                            this.ConcatenateChanges(a, l)
                        );
                    }
                    return [new E.DiffChange(t, d - t + 1, h, v - h + 1)];
                }
                WALKTRACE(
                    t,
                    d,
                    h,
                    v,
                    L,
                    C,
                    y,
                    p,
                    s,
                    i,
                    a,
                    l,
                    f,
                    u,
                    _,
                    b,
                    A,
                    P
                ) {
                    let D = null,
                        k = null,
                        R = new c(),
                        I = d,
                        F = h,
                        O = f[0] - b[0] - v,
                        V = -1073741824,
                        K = this.m_forwardHistory.length - 1;
                    do {
                        const $ = O + t;
                        $ === I || ($ < F && s[$ - 1] < s[$ + 1])
                            ? ((a = s[$ + 1]),
                              (u = a - O - v),
                              a < V && R.MarkNextChange(),
                              (V = a),
                              R.AddModifiedElement(a + 1, u),
                              (O = $ + 1 - t))
                            : ((a = s[$ - 1] + 1),
                              (u = a - O - v),
                              a < V && R.MarkNextChange(),
                              (V = a - 1),
                              R.AddOriginalElement(a, u + 1),
                              (O = $ - 1 - t)),
                            K >= 0 &&
                                ((s = this.m_forwardHistory[K]),
                                (t = s[0]),
                                (I = 1),
                                (F = s.length - 1));
                    } while (--K >= -1);
                    if (((D = R.getReverseChanges()), P[0])) {
                        let $ = f[0] + 1,
                            z = b[0] + 1;
                        if (D !== null && D.length > 0) {
                            const n = D[D.length - 1];
                            ($ = Math.max($, n.getOriginalEnd())),
                                (z = Math.max(z, n.getModifiedEnd()));
                        }
                        k = [new E.DiffChange($, l - $ + 1, z, _ - z + 1)];
                    } else {
                        (R = new c()),
                            (I = C),
                            (F = y),
                            (O = f[0] - b[0] - p),
                            (V = 1073741824),
                            (K = A
                                ? this.m_reverseHistory.length - 1
                                : this.m_reverseHistory.length - 2);
                        do {
                            const $ = O + L;
                            $ === I || ($ < F && i[$ - 1] >= i[$ + 1])
                                ? ((a = i[$ + 1] - 1),
                                  (u = a - O - p),
                                  a > V && R.MarkNextChange(),
                                  (V = a + 1),
                                  R.AddOriginalElement(a + 1, u + 1),
                                  (O = $ + 1 - L))
                                : ((a = i[$ - 1]),
                                  (u = a - O - p),
                                  a > V && R.MarkNextChange(),
                                  (V = a),
                                  R.AddModifiedElement(a + 1, u + 1),
                                  (O = $ - 1 - L)),
                                K >= 0 &&
                                    ((i = this.m_reverseHistory[K]),
                                    (L = i[0]),
                                    (I = 1),
                                    (F = i.length - 1));
                        } while (--K >= -1);
                        k = R.getChanges();
                    }
                    return this.ConcatenateChanges(D, k);
                }
                ComputeRecursionPoint(t, d, h, v, L, C, y) {
                    let p = 0,
                        s = 0,
                        i = 0,
                        a = 0,
                        l = 0,
                        f = 0;
                    t--,
                        h--,
                        (L[0] = 0),
                        (C[0] = 0),
                        (this.m_forwardHistory = []),
                        (this.m_reverseHistory = []);
                    const u = d - t + (v - h),
                        _ = u + 1,
                        b = new Int32Array(_),
                        A = new Int32Array(_),
                        P = v - h,
                        D = d - t,
                        k = t - h,
                        R = d - v,
                        F = (D - P) % 2 == 0;
                    (b[P] = t), (A[D] = d), (y[0] = !1);
                    for (let O = 1; O <= u / 2 + 1; O++) {
                        let V = 0,
                            K = 0;
                        (i = this.ClipDiagonalBound(P - O, O, P, _)),
                            (a = this.ClipDiagonalBound(P + O, O, P, _));
                        for (let z = i; z <= a; z += 2) {
                            z === i || (z < a && b[z - 1] < b[z + 1])
                                ? (p = b[z + 1])
                                : (p = b[z - 1] + 1),
                                (s = p - (z - P) - k);
                            const n = p;
                            for (
                                ;
                                p < d &&
                                s < v &&
                                this.ElementsAreEqual(p + 1, s + 1);

                            )
                                p++, s++;
                            if (
                                ((b[z] = p),
                                p + s > V + K && ((V = p), (K = s)),
                                !F && Math.abs(z - D) <= O - 1 && p >= A[z])
                            )
                                return (
                                    (L[0] = p),
                                    (C[0] = s),
                                    n <= A[z] && 1447 > 0 && O <= 1447 + 1
                                        ? this.WALKTRACE(
                                              P,
                                              i,
                                              a,
                                              k,
                                              D,
                                              l,
                                              f,
                                              R,
                                              b,
                                              A,
                                              p,
                                              d,
                                              L,
                                              s,
                                              v,
                                              C,
                                              F,
                                              y
                                          )
                                        : null
                                );
                        }
                        const $ = (V - t + (K - h) - O) / 2;
                        if (
                            this.ContinueProcessingPredicate !== null &&
                            !this.ContinueProcessingPredicate(V, $)
                        )
                            return (
                                (y[0] = !0),
                                (L[0] = V),
                                (C[0] = K),
                                $ > 0 && 1447 > 0 && O <= 1447 + 1
                                    ? this.WALKTRACE(
                                          P,
                                          i,
                                          a,
                                          k,
                                          D,
                                          l,
                                          f,
                                          R,
                                          b,
                                          A,
                                          p,
                                          d,
                                          L,
                                          s,
                                          v,
                                          C,
                                          F,
                                          y
                                      )
                                    : (t++,
                                      h++,
                                      [
                                          new E.DiffChange(
                                              t,
                                              d - t + 1,
                                              h,
                                              v - h + 1
                                          ),
                                      ])
                            );
                        (l = this.ClipDiagonalBound(D - O, O, D, _)),
                            (f = this.ClipDiagonalBound(D + O, O, D, _));
                        for (let z = l; z <= f; z += 2) {
                            z === l || (z < f && A[z - 1] >= A[z + 1])
                                ? (p = A[z + 1] - 1)
                                : (p = A[z - 1]),
                                (s = p - (z - D) - R);
                            const n = p;
                            for (
                                ;
                                p > t && s > h && this.ElementsAreEqual(p, s);

                            )
                                p--, s--;
                            if (
                                ((A[z] = p),
                                F && Math.abs(z - P) <= O && p <= b[z])
                            )
                                return (
                                    (L[0] = p),
                                    (C[0] = s),
                                    n >= b[z] && 1447 > 0 && O <= 1447 + 1
                                        ? this.WALKTRACE(
                                              P,
                                              i,
                                              a,
                                              k,
                                              D,
                                              l,
                                              f,
                                              R,
                                              b,
                                              A,
                                              p,
                                              d,
                                              L,
                                              s,
                                              v,
                                              C,
                                              F,
                                              y
                                          )
                                        : null
                                );
                        }
                        if (O <= 1447) {
                            let z = new Int32Array(a - i + 2);
                            (z[0] = P - i + 1),
                                g.Copy2(b, i, z, 1, a - i + 1),
                                this.m_forwardHistory.push(z),
                                (z = new Int32Array(f - l + 2)),
                                (z[0] = D - l + 1),
                                g.Copy2(A, l, z, 1, f - l + 1),
                                this.m_reverseHistory.push(z);
                        }
                    }
                    return this.WALKTRACE(
                        P,
                        i,
                        a,
                        k,
                        D,
                        l,
                        f,
                        R,
                        b,
                        A,
                        p,
                        d,
                        L,
                        s,
                        v,
                        C,
                        F,
                        y
                    );
                }
                PrettifyChanges(t) {
                    for (let d = 0; d < t.length; d++) {
                        const h = t[d],
                            v =
                                d < t.length - 1
                                    ? t[d + 1].originalStart
                                    : this._originalElementsOrHash.length,
                            L =
                                d < t.length - 1
                                    ? t[d + 1].modifiedStart
                                    : this._modifiedElementsOrHash.length,
                            C = h.originalLength > 0,
                            y = h.modifiedLength > 0;
                        for (
                            ;
                            h.originalStart + h.originalLength < v &&
                            h.modifiedStart + h.modifiedLength < L &&
                            (!C ||
                                this.OriginalElementsAreEqual(
                                    h.originalStart,
                                    h.originalStart + h.originalLength
                                )) &&
                            (!y ||
                                this.ModifiedElementsAreEqual(
                                    h.modifiedStart,
                                    h.modifiedStart + h.modifiedLength
                                ));

                        ) {
                            const s = this.ElementsAreStrictEqual(
                                h.originalStart,
                                h.modifiedStart
                            );
                            if (
                                this.ElementsAreStrictEqual(
                                    h.originalStart + h.originalLength,
                                    h.modifiedStart + h.modifiedLength
                                ) &&
                                !s
                            )
                                break;
                            h.originalStart++, h.modifiedStart++;
                        }
                        let p = [null];
                        if (
                            d < t.length - 1 &&
                            this.ChangesOverlap(t[d], t[d + 1], p)
                        ) {
                            (t[d] = p[0]), t.splice(d + 1, 1), d--;
                            continue;
                        }
                    }
                    for (let d = t.length - 1; d >= 0; d--) {
                        const h = t[d];
                        let v = 0,
                            L = 0;
                        if (d > 0) {
                            const a = t[d - 1];
                            (v = a.originalStart + a.originalLength),
                                (L = a.modifiedStart + a.modifiedLength);
                        }
                        const C = h.originalLength > 0,
                            y = h.modifiedLength > 0;
                        let p = 0,
                            s = this._boundaryScore(
                                h.originalStart,
                                h.originalLength,
                                h.modifiedStart,
                                h.modifiedLength
                            );
                        for (let a = 1; ; a++) {
                            const l = h.originalStart - a,
                                f = h.modifiedStart - a;
                            if (
                                l < v ||
                                f < L ||
                                (C &&
                                    !this.OriginalElementsAreEqual(
                                        l,
                                        l + h.originalLength
                                    )) ||
                                (y &&
                                    !this.ModifiedElementsAreEqual(
                                        f,
                                        f + h.modifiedLength
                                    ))
                            )
                                break;
                            const _ =
                                (l === v && f === L ? 5 : 0) +
                                this._boundaryScore(
                                    l,
                                    h.originalLength,
                                    f,
                                    h.modifiedLength
                                );
                            _ > s && ((s = _), (p = a));
                        }
                        (h.originalStart -= p), (h.modifiedStart -= p);
                        const i = [null];
                        if (d > 0 && this.ChangesOverlap(t[d - 1], t[d], i)) {
                            (t[d - 1] = i[0]), t.splice(d, 1), d++;
                            continue;
                        }
                    }
                    if (this._hasStrings)
                        for (let d = 1, h = t.length; d < h; d++) {
                            const v = t[d - 1],
                                L = t[d],
                                C =
                                    L.originalStart -
                                    v.originalStart -
                                    v.originalLength,
                                y = v.originalStart,
                                p = L.originalStart + L.originalLength,
                                s = p - y,
                                i = v.modifiedStart,
                                a = L.modifiedStart + L.modifiedLength,
                                l = a - i;
                            if (C < 5 && s < 20 && l < 20) {
                                const f = this._findBetterContiguousSequence(
                                    y,
                                    s,
                                    i,
                                    l,
                                    C
                                );
                                if (f) {
                                    const [u, _] = f;
                                    (u !== v.originalStart + v.originalLength ||
                                        _ !==
                                            v.modifiedStart +
                                                v.modifiedLength) &&
                                        ((v.originalLength =
                                            u - v.originalStart),
                                        (v.modifiedLength =
                                            _ - v.modifiedStart),
                                        (L.originalStart = u + C),
                                        (L.modifiedStart = _ + C),
                                        (L.originalLength =
                                            p - L.originalStart),
                                        (L.modifiedLength =
                                            a - L.modifiedStart));
                                }
                            }
                        }
                    return t;
                }
                _findBetterContiguousSequence(t, d, h, v, L) {
                    if (d < L || v < L) return null;
                    const C = t + d - L + 1,
                        y = h + v - L + 1;
                    let p = 0,
                        s = 0,
                        i = 0;
                    for (let a = t; a < C; a++)
                        for (let l = h; l < y; l++) {
                            const f = this._contiguousSequenceScore(a, l, L);
                            f > 0 && f > p && ((p = f), (s = a), (i = l));
                        }
                    return p > 0 ? [s, i] : null;
                }
                _contiguousSequenceScore(t, d, h) {
                    let v = 0;
                    for (let L = 0; L < h; L++) {
                        if (!this.ElementsAreEqual(t + L, d + L)) return 0;
                        v += this._originalStringElements[t + L].length;
                    }
                    return v;
                }
                _OriginalIsBoundary(t) {
                    return t <= 0 ||
                        t >= this._originalElementsOrHash.length - 1
                        ? !0
                        : this._hasStrings &&
                              /^\s*$/.test(this._originalStringElements[t]);
                }
                _OriginalRegionIsBoundary(t, d) {
                    if (
                        this._OriginalIsBoundary(t) ||
                        this._OriginalIsBoundary(t - 1)
                    )
                        return !0;
                    if (d > 0) {
                        const h = t + d;
                        if (
                            this._OriginalIsBoundary(h - 1) ||
                            this._OriginalIsBoundary(h)
                        )
                            return !0;
                    }
                    return !1;
                }
                _ModifiedIsBoundary(t) {
                    return t <= 0 ||
                        t >= this._modifiedElementsOrHash.length - 1
                        ? !0
                        : this._hasStrings &&
                              /^\s*$/.test(this._modifiedStringElements[t]);
                }
                _ModifiedRegionIsBoundary(t, d) {
                    if (
                        this._ModifiedIsBoundary(t) ||
                        this._ModifiedIsBoundary(t - 1)
                    )
                        return !0;
                    if (d > 0) {
                        const h = t + d;
                        if (
                            this._ModifiedIsBoundary(h - 1) ||
                            this._ModifiedIsBoundary(h)
                        )
                            return !0;
                    }
                    return !1;
                }
                _boundaryScore(t, d, h, v) {
                    const L = this._OriginalRegionIsBoundary(t, d) ? 1 : 0,
                        C = this._ModifiedRegionIsBoundary(h, v) ? 1 : 0;
                    return L + C;
                }
                ConcatenateChanges(t, d) {
                    let h = [];
                    if (t.length === 0 || d.length === 0)
                        return d.length > 0 ? d : t;
                    if (this.ChangesOverlap(t[t.length - 1], d[0], h)) {
                        const v = new Array(t.length + d.length - 1);
                        return (
                            g.Copy(t, 0, v, 0, t.length - 1),
                            (v[t.length - 1] = h[0]),
                            g.Copy(d, 1, v, t.length, d.length - 1),
                            v
                        );
                    } else {
                        const v = new Array(t.length + d.length);
                        return (
                            g.Copy(t, 0, v, 0, t.length),
                            g.Copy(d, 0, v, t.length, d.length),
                            v
                        );
                    }
                }
                ChangesOverlap(t, d, h) {
                    if (
                        (w.Assert(
                            t.originalStart <= d.originalStart,
                            'Left change is not less than or equal to right change'
                        ),
                        w.Assert(
                            t.modifiedStart <= d.modifiedStart,
                            'Left change is not less than or equal to right change'
                        ),
                        t.originalStart + t.originalLength >= d.originalStart ||
                            t.modifiedStart + t.modifiedLength >=
                                d.modifiedStart)
                    ) {
                        const v = t.originalStart;
                        let L = t.originalLength;
                        const C = t.modifiedStart;
                        let y = t.modifiedLength;
                        return (
                            t.originalStart + t.originalLength >=
                                d.originalStart &&
                                (L =
                                    d.originalStart +
                                    d.originalLength -
                                    t.originalStart),
                            t.modifiedStart + t.modifiedLength >=
                                d.modifiedStart &&
                                (y =
                                    d.modifiedStart +
                                    d.modifiedLength -
                                    t.modifiedStart),
                            (h[0] = new E.DiffChange(v, L, C, y)),
                            !0
                        );
                    } else return (h[0] = null), !1;
                }
                ClipDiagonalBound(t, d, h, v) {
                    if (t >= 0 && t < v) return t;
                    const L = h,
                        C = v - h - 1,
                        y = d % 2 == 0;
                    if (t < 0) {
                        const p = L % 2 == 0;
                        return y === p ? 0 : 1;
                    } else {
                        const p = C % 2 == 0;
                        return y === p ? v - 1 : v - 2;
                    }
                }
            }
            r.LcsDiff = m;
        }),
        Y(Q[7], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.assertNever =
                    r.withNullAsUndefined =
                    r.createProxyObject =
                    r.getAllMethodNames =
                    r.getAllPropertyNames =
                    r.validateConstraint =
                    r.validateConstraints =
                    r.isFunction =
                    r.assertIsDefined =
                    r.assertType =
                    r.isUndefinedOrNull =
                    r.isDefined =
                    r.isUndefined =
                    r.isBoolean =
                    r.isIterable =
                    r.isNumber =
                    r.isObject =
                    r.isString =
                    r.isArray =
                        void 0);
            function E(a) {
                return Array.isArray(a);
            }
            r.isArray = E;
            function e(a) {
                return typeof a == 'string';
            }
            r.isString = e;
            function N(a) {
                return (
                    typeof a == 'object' &&
                    a !== null &&
                    !Array.isArray(a) &&
                    !(a instanceof RegExp) &&
                    !(a instanceof Date)
                );
            }
            r.isObject = N;
            function o(a) {
                return typeof a == 'number' && !isNaN(a);
            }
            r.isNumber = o;
            function w(a) {
                return !!a && typeof a[Symbol.iterator] == 'function';
            }
            r.isIterable = w;
            function g(a) {
                return a === !0 || a === !1;
            }
            r.isBoolean = g;
            function c(a) {
                return typeof a == 'undefined';
            }
            r.isUndefined = c;
            function m(a) {
                return !S(a);
            }
            r.isDefined = m;
            function S(a) {
                return c(a) || a === null;
            }
            r.isUndefinedOrNull = S;
            function t(a, l) {
                if (!a)
                    throw new Error(
                        l
                            ? `Unexpected type, expected '${l}'`
                            : 'Unexpected type'
                    );
            }
            r.assertType = t;
            function d(a) {
                if (S(a))
                    throw new Error(
                        'Assertion Failed: argument is undefined or null'
                    );
                return a;
            }
            r.assertIsDefined = d;
            function h(a) {
                return typeof a == 'function';
            }
            r.isFunction = h;
            function v(a, l) {
                const f = Math.min(a.length, l.length);
                for (let u = 0; u < f; u++) L(a[u], l[u]);
            }
            r.validateConstraints = v;
            function L(a, l) {
                if (e(l)) {
                    if (typeof a !== l)
                        throw new Error(
                            `argument does not match constraint: typeof ${l}`
                        );
                } else if (h(l)) {
                    try {
                        if (a instanceof l) return;
                    } catch {}
                    if (
                        (!S(a) && a.constructor === l) ||
                        (l.length === 1 && l.call(void 0, a) === !0)
                    )
                        return;
                    throw new Error(
                        'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true'
                    );
                }
            }
            r.validateConstraint = L;
            function C(a) {
                let l = [],
                    f = Object.getPrototypeOf(a);
                for (; Object.prototype !== f; )
                    (l = l.concat(Object.getOwnPropertyNames(f))),
                        (f = Object.getPrototypeOf(f));
                return l;
            }
            r.getAllPropertyNames = C;
            function y(a) {
                const l = [];
                for (const f of C(a)) typeof a[f] == 'function' && l.push(f);
                return l;
            }
            r.getAllMethodNames = y;
            function p(a, l) {
                const f = (_) =>
                    function () {
                        const b = Array.prototype.slice.call(arguments, 0);
                        return l(_, b);
                    };
                let u = {};
                for (const _ of a) u[_] = f(_);
                return u;
            }
            r.createProxyObject = p;
            function s(a) {
                return a === null ? void 0 : a;
            }
            r.withNullAsUndefined = s;
            function i(a, l = 'Unreachable') {
                throw new Error(l);
            }
            r.assertNever = i;
        }),
        Y(Q[29], Z([0, 1, 7]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.getOrDefault =
                    r.equals =
                    r.mixin =
                    r.cloneAndChange =
                    r.deepFreeze =
                    r.deepClone =
                        void 0);
            function e(t) {
                if (!t || typeof t != 'object' || t instanceof RegExp) return t;
                const d = Array.isArray(t) ? [] : {};
                return (
                    Object.keys(t).forEach((h) => {
                        t[h] && typeof t[h] == 'object'
                            ? (d[h] = e(t[h]))
                            : (d[h] = t[h]);
                    }),
                    d
                );
            }
            r.deepClone = e;
            function N(t) {
                if (!t || typeof t != 'object') return t;
                const d = [t];
                for (; d.length > 0; ) {
                    const h = d.shift();
                    Object.freeze(h);
                    for (const v in h)
                        if (o.call(h, v)) {
                            const L = h[v];
                            typeof L == 'object' &&
                                !Object.isFrozen(L) &&
                                d.push(L);
                        }
                }
                return t;
            }
            r.deepFreeze = N;
            const o = Object.prototype.hasOwnProperty;
            function w(t, d) {
                return g(t, d, new Set());
            }
            r.cloneAndChange = w;
            function g(t, d, h) {
                if ((0, E.isUndefinedOrNull)(t)) return t;
                const v = d(t);
                if (typeof v != 'undefined') return v;
                if ((0, E.isArray)(t)) {
                    const L = [];
                    for (const C of t) L.push(g(C, d, h));
                    return L;
                }
                if ((0, E.isObject)(t)) {
                    if (h.has(t))
                        throw new Error(
                            'Cannot clone recursive data-structure'
                        );
                    h.add(t);
                    const L = {};
                    for (let C in t) o.call(t, C) && (L[C] = g(t[C], d, h));
                    return h.delete(t), L;
                }
                return t;
            }
            function c(t, d, h = !0) {
                return (0, E.isObject)(t)
                    ? ((0, E.isObject)(d) &&
                          Object.keys(d).forEach((v) => {
                              v in t
                                  ? h &&
                                    ((0, E.isObject)(t[v]) &&
                                    (0, E.isObject)(d[v])
                                        ? c(t[v], d[v], h)
                                        : (t[v] = d[v]))
                                  : (t[v] = d[v]);
                          }),
                      t)
                    : d;
            }
            r.mixin = c;
            function m(t, d) {
                if (t === d) return !0;
                if (
                    t == null ||
                    d === null ||
                    d === void 0 ||
                    typeof t != typeof d ||
                    typeof t != 'object' ||
                    Array.isArray(t) !== Array.isArray(d)
                )
                    return !1;
                let h, v;
                if (Array.isArray(t)) {
                    if (t.length !== d.length) return !1;
                    for (h = 0; h < t.length; h++)
                        if (!m(t[h], d[h])) return !1;
                } else {
                    const L = [];
                    for (v in t) L.push(v);
                    L.sort();
                    const C = [];
                    for (v in d) C.push(v);
                    if ((C.sort(), !m(L, C))) return !1;
                    for (h = 0; h < L.length; h++)
                        if (!m(t[L[h]], d[L[h]])) return !1;
                }
                return !0;
            }
            r.equals = m;
            function S(t, d, h) {
                const v = d(t);
                return typeof v == 'undefined' ? h : v;
            }
            r.getOrDefault = S;
        }),
        Y(Q[13], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.toUint32 = r.toUint8 = void 0);
            function E(N) {
                return N < 0 ? 0 : N > 255 ? 255 : N | 0;
            }
            r.toUint8 = E;
            function e(N) {
                return N < 0 ? 0 : N > 4294967295 ? 4294967295 : N | 0;
            }
            r.toUint32 = e;
        }),
        Y(Q[9], Z([0, 1, 26, 5]), function (U, r, E, e) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.uriToFsPath = r.URI = void 0);
            const N = /^\w[\w\d+.-]*$/,
                o = /^\//,
                w = /^\/\//;
            function g(u, _) {
                if (!u.scheme && _)
                    throw new Error(
                        `[UriError]: Scheme is missing: {scheme: "", authority: "${u.authority}", path: "${u.path}", query: "${u.query}", fragment: "${u.fragment}"}`
                    );
                if (u.scheme && !N.test(u.scheme))
                    throw new Error(
                        '[UriError]: Scheme contains illegal characters.'
                    );
                if (u.path) {
                    if (u.authority) {
                        if (!o.test(u.path))
                            throw new Error(
                                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                            );
                    } else if (w.test(u.path))
                        throw new Error(
                            '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
                        );
                }
            }
            function c(u, _) {
                return !u && !_ ? 'file' : u;
            }
            function m(u, _) {
                switch (u) {
                    case 'https':
                    case 'http':
                    case 'file':
                        _ ? _[0] !== t && (_ = t + _) : (_ = t);
                        break;
                }
                return _;
            }
            const S = '',
                t = '/',
                d =
                    /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
            class h {
                constructor(_, b, A, P, D, k = !1) {
                    typeof _ == 'object'
                        ? ((this.scheme = _.scheme || S),
                          (this.authority = _.authority || S),
                          (this.path = _.path || S),
                          (this.query = _.query || S),
                          (this.fragment = _.fragment || S))
                        : ((this.scheme = c(_, k)),
                          (this.authority = b || S),
                          (this.path = m(this.scheme, A || S)),
                          (this.query = P || S),
                          (this.fragment = D || S),
                          g(this, k));
                }
                static isUri(_) {
                    return _ instanceof h
                        ? !0
                        : _
                        ? typeof _.authority == 'string' &&
                          typeof _.fragment == 'string' &&
                          typeof _.path == 'string' &&
                          typeof _.query == 'string' &&
                          typeof _.scheme == 'string' &&
                          typeof _.fsPath == 'string' &&
                          typeof _.with == 'function' &&
                          typeof _.toString == 'function'
                        : !1;
                }
                get fsPath() {
                    return s(this, !1);
                }
                with(_) {
                    if (!_) return this;
                    let {
                        scheme: b,
                        authority: A,
                        path: P,
                        query: D,
                        fragment: k,
                    } = _;
                    return (
                        b === void 0
                            ? (b = this.scheme)
                            : b === null && (b = S),
                        A === void 0
                            ? (A = this.authority)
                            : A === null && (A = S),
                        P === void 0 ? (P = this.path) : P === null && (P = S),
                        D === void 0 ? (D = this.query) : D === null && (D = S),
                        k === void 0
                            ? (k = this.fragment)
                            : k === null && (k = S),
                        b === this.scheme &&
                        A === this.authority &&
                        P === this.path &&
                        D === this.query &&
                        k === this.fragment
                            ? this
                            : new L(b, A, P, D, k)
                    );
                }
                static parse(_, b = !1) {
                    const A = d.exec(_);
                    return A
                        ? new L(
                              A[2] || S,
                              f(A[4] || S),
                              f(A[5] || S),
                              f(A[7] || S),
                              f(A[9] || S),
                              b
                          )
                        : new L(S, S, S, S, S);
                }
                static file(_) {
                    let b = S;
                    if (
                        (e.isWindows && (_ = _.replace(/\\/g, t)),
                        _[0] === t && _[1] === t)
                    ) {
                        const A = _.indexOf(t, 2);
                        A === -1
                            ? ((b = _.substring(2)), (_ = t))
                            : ((b = _.substring(2, A)),
                              (_ = _.substring(A) || t));
                    }
                    return new L('file', b, _, S, S);
                }
                static from(_) {
                    const b = new L(
                        _.scheme,
                        _.authority,
                        _.path,
                        _.query,
                        _.fragment
                    );
                    return g(b, !0), b;
                }
                static joinPath(_, ...b) {
                    if (!_.path)
                        throw new Error(
                            '[UriError]: cannot call joinPath on URI without path'
                        );
                    let A;
                    return (
                        e.isWindows && _.scheme === 'file'
                            ? (A = h.file(E.win32.join(s(_, !0), ...b)).path)
                            : (A = E.posix.join(_.path, ...b)),
                        _.with({ path: A })
                    );
                }
                toString(_ = !1) {
                    return i(this, _);
                }
                toJSON() {
                    return this;
                }
                static revive(_) {
                    if (_) {
                        if (_ instanceof h) return _;
                        {
                            const b = new L(_);
                            return (
                                (b._formatted = _.external),
                                (b._fsPath = _._sep === v ? _.fsPath : null),
                                b
                            );
                        }
                    } else return _;
                }
            }
            r.URI = h;
            const v = e.isWindows ? 1 : void 0;
            class L extends h {
                constructor() {
                    super(...arguments);
                    (this._formatted = null), (this._fsPath = null);
                }
                get fsPath() {
                    return (
                        this._fsPath || (this._fsPath = s(this, !1)),
                        this._fsPath
                    );
                }
                toString(_ = !1) {
                    return _
                        ? i(this, !0)
                        : (this._formatted || (this._formatted = i(this, !1)),
                          this._formatted);
                }
                toJSON() {
                    const _ = { $mid: 1 };
                    return (
                        this._fsPath &&
                            ((_.fsPath = this._fsPath), (_._sep = v)),
                        this._formatted && (_.external = this._formatted),
                        this.path && (_.path = this.path),
                        this.scheme && (_.scheme = this.scheme),
                        this.authority && (_.authority = this.authority),
                        this.query && (_.query = this.query),
                        this.fragment && (_.fragment = this.fragment),
                        _
                    );
                }
            }
            const C = {
                [58]: '%3A',
                [47]: '%2F',
                [63]: '%3F',
                [35]: '%23',
                [91]: '%5B',
                [93]: '%5D',
                [64]: '%40',
                [33]: '%21',
                [36]: '%24',
                [38]: '%26',
                [39]: '%27',
                [40]: '%28',
                [41]: '%29',
                [42]: '%2A',
                [43]: '%2B',
                [44]: '%2C',
                [59]: '%3B',
                [61]: '%3D',
                [32]: '%20',
            };
            function y(u, _) {
                let b,
                    A = -1;
                for (let P = 0; P < u.length; P++) {
                    const D = u.charCodeAt(P);
                    if (
                        (D >= 97 && D <= 122) ||
                        (D >= 65 && D <= 90) ||
                        (D >= 48 && D <= 57) ||
                        D === 45 ||
                        D === 46 ||
                        D === 95 ||
                        D === 126 ||
                        (_ && D === 47)
                    )
                        A !== -1 &&
                            ((b += encodeURIComponent(u.substring(A, P))),
                            (A = -1)),
                            b !== void 0 && (b += u.charAt(P));
                    else {
                        b === void 0 && (b = u.substr(0, P));
                        const k = C[D];
                        k !== void 0
                            ? (A !== -1 &&
                                  ((b += encodeURIComponent(u.substring(A, P))),
                                  (A = -1)),
                              (b += k))
                            : A === -1 && (A = P);
                    }
                }
                return (
                    A !== -1 && (b += encodeURIComponent(u.substring(A))),
                    b !== void 0 ? b : u
                );
            }
            function p(u) {
                let _;
                for (let b = 0; b < u.length; b++) {
                    const A = u.charCodeAt(b);
                    A === 35 || A === 63
                        ? (_ === void 0 && (_ = u.substr(0, b)), (_ += C[A]))
                        : _ !== void 0 && (_ += u[b]);
                }
                return _ !== void 0 ? _ : u;
            }
            function s(u, _) {
                let b;
                return (
                    u.authority && u.path.length > 1 && u.scheme === 'file'
                        ? (b = `//${u.authority}${u.path}`)
                        : u.path.charCodeAt(0) === 47 &&
                          ((u.path.charCodeAt(1) >= 65 &&
                              u.path.charCodeAt(1) <= 90) ||
                              (u.path.charCodeAt(1) >= 97 &&
                                  u.path.charCodeAt(1) <= 122)) &&
                          u.path.charCodeAt(2) === 58
                        ? _
                            ? (b = u.path.substr(1))
                            : (b = u.path[1].toLowerCase() + u.path.substr(2))
                        : (b = u.path),
                    e.isWindows && (b = b.replace(/\//g, '\\')),
                    b
                );
            }
            r.uriToFsPath = s;
            function i(u, _) {
                const b = _ ? p : y;
                let A = '',
                    {
                        scheme: P,
                        authority: D,
                        path: k,
                        query: R,
                        fragment: I,
                    } = u;
                if (
                    (P && ((A += P), (A += ':')),
                    (D || P === 'file') && ((A += t), (A += t)),
                    D)
                ) {
                    let F = D.indexOf('@');
                    if (F !== -1) {
                        const O = D.substr(0, F);
                        (D = D.substr(F + 1)),
                            (F = O.indexOf(':')),
                            F === -1
                                ? (A += b(O, !1))
                                : ((A += b(O.substr(0, F), !1)),
                                  (A += ':'),
                                  (A += b(O.substr(F + 1), !1))),
                            (A += '@');
                    }
                    (D = D.toLowerCase()),
                        (F = D.indexOf(':')),
                        F === -1
                            ? (A += b(D, !1))
                            : ((A += b(D.substr(0, F), !1)),
                              (A += D.substr(F)));
                }
                if (k) {
                    if (
                        k.length >= 3 &&
                        k.charCodeAt(0) === 47 &&
                        k.charCodeAt(2) === 58
                    ) {
                        const F = k.charCodeAt(1);
                        F >= 65 &&
                            F <= 90 &&
                            (k = `/${String.fromCharCode(F + 32)}:${k.substr(
                                3
                            )}`);
                    } else if (k.length >= 2 && k.charCodeAt(1) === 58) {
                        const F = k.charCodeAt(0);
                        F >= 65 &&
                            F <= 90 &&
                            (k = `${String.fromCharCode(F + 32)}:${k.substr(
                                2
                            )}`);
                    }
                    A += b(k, !0);
                }
                return (
                    R && ((A += '?'), (A += b(R, !1))),
                    I && ((A += '#'), (A += _ ? I : y(I, !1))),
                    A
                );
            }
            function a(u) {
                try {
                    return decodeURIComponent(u);
                } catch {
                    return u.length > 3 ? u.substr(0, 3) + a(u.substr(3)) : u;
                }
            }
            const l = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
            function f(u) {
                return u.match(l) ? u.replace(l, (_) => a(_)) : u;
            }
        }),
        Y(
            Q[44],
            Z([0, 1, 10, 6, 8, 5, 7, 2]),
            function (U, r, E, e, N, o, w, g) {
                'use strict';
                Object.defineProperty(r, '__esModule', { value: !0 }),
                    (r.create =
                        r.SimpleWorkerServer =
                        r.SimpleWorkerClient =
                        r.logOnceWebWorkerWarning =
                            void 0);
                const c = '$initialize';
                let m = !1;
                function S(f) {
                    !o.isWeb ||
                        (m ||
                            ((m = !0),
                            console.warn(
                                'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq'
                            )),
                        console.warn(f.message));
                }
                r.logOnceWebWorkerWarning = S;
                class t {
                    constructor(u, _, b, A) {
                        (this.vsWorker = u),
                            (this.req = _),
                            (this.method = b),
                            (this.args = A),
                            (this.type = 0);
                    }
                }
                class d {
                    constructor(u, _, b, A) {
                        (this.vsWorker = u),
                            (this.seq = _),
                            (this.res = b),
                            (this.err = A),
                            (this.type = 1);
                    }
                }
                class h {
                    constructor(u, _, b, A) {
                        (this.vsWorker = u),
                            (this.req = _),
                            (this.eventName = b),
                            (this.arg = A),
                            (this.type = 2);
                    }
                }
                class v {
                    constructor(u, _, b) {
                        (this.vsWorker = u),
                            (this.req = _),
                            (this.event = b),
                            (this.type = 3);
                    }
                }
                class L {
                    constructor(u, _) {
                        (this.vsWorker = u), (this.req = _), (this.type = 4);
                    }
                }
                class C {
                    constructor(u) {
                        (this._workerId = -1),
                            (this._handler = u),
                            (this._lastSentReq = 0),
                            (this._pendingReplies = Object.create(null)),
                            (this._pendingEmitters = new Map()),
                            (this._pendingEvents = new Map());
                    }
                    setWorkerId(u) {
                        this._workerId = u;
                    }
                    sendMessage(u, _) {
                        const b = String(++this._lastSentReq);
                        return new Promise((A, P) => {
                            (this._pendingReplies[b] = {
                                resolve: A,
                                reject: P,
                            }),
                                this._send(new t(this._workerId, b, u, _));
                        });
                    }
                    listen(u, _) {
                        let b = null;
                        const A = new e.Emitter({
                            onFirstListenerAdd: () => {
                                (b = String(++this._lastSentReq)),
                                    this._pendingEmitters.set(b, A),
                                    this._send(new h(this._workerId, b, u, _));
                            },
                            onLastListenerRemove: () => {
                                this._pendingEmitters.delete(b),
                                    this._send(new L(this._workerId, b)),
                                    (b = null);
                            },
                        });
                        return A.event;
                    }
                    handleMessage(u) {
                        !u ||
                            !u.vsWorker ||
                            (this._workerId !== -1 &&
                                u.vsWorker !== this._workerId) ||
                            this._handleMessage(u);
                    }
                    _handleMessage(u) {
                        switch (u.type) {
                            case 1:
                                return this._handleReplyMessage(u);
                            case 0:
                                return this._handleRequestMessage(u);
                            case 2:
                                return this._handleSubscribeEventMessage(u);
                            case 3:
                                return this._handleEventMessage(u);
                            case 4:
                                return this._handleUnsubscribeEventMessage(u);
                        }
                    }
                    _handleReplyMessage(u) {
                        if (!this._pendingReplies[u.seq]) {
                            console.warn('Got reply to unknown seq');
                            return;
                        }
                        let _ = this._pendingReplies[u.seq];
                        if ((delete this._pendingReplies[u.seq], u.err)) {
                            let b = u.err;
                            u.err.$isError &&
                                ((b = new Error()),
                                (b.name = u.err.name),
                                (b.message = u.err.message),
                                (b.stack = u.err.stack)),
                                _.reject(b);
                            return;
                        }
                        _.resolve(u.res);
                    }
                    _handleRequestMessage(u) {
                        let _ = u.req;
                        this._handler.handleMessage(u.method, u.args).then(
                            (A) => {
                                this._send(new d(this._workerId, _, A, void 0));
                            },
                            (A) => {
                                A.detail instanceof Error &&
                                    (A.detail = (0,
                                    E.transformErrorForSerialization)(
                                        A.detail
                                    )),
                                    this._send(
                                        new d(
                                            this._workerId,
                                            _,
                                            void 0,
                                            (0,
                                            E.transformErrorForSerialization)(A)
                                        )
                                    );
                            }
                        );
                    }
                    _handleSubscribeEventMessage(u) {
                        const _ = u.req,
                            b = this._handler.handleEvent(
                                u.eventName,
                                u.arg
                            )((A) => {
                                this._send(new v(this._workerId, _, A));
                            });
                        this._pendingEvents.set(_, b);
                    }
                    _handleEventMessage(u) {
                        if (!this._pendingEmitters.has(u.req)) {
                            console.warn('Got event for unknown req');
                            return;
                        }
                        this._pendingEmitters.get(u.req).fire(u.event);
                    }
                    _handleUnsubscribeEventMessage(u) {
                        if (!this._pendingEvents.has(u.req)) {
                            console.warn('Got unsubscribe for unknown req');
                            return;
                        }
                        this._pendingEvents.get(u.req).dispose(),
                            this._pendingEvents.delete(u.req);
                    }
                    _send(u) {
                        let _ = [];
                        if (u.type === 0)
                            for (let b = 0; b < u.args.length; b++)
                                u.args[b] instanceof ArrayBuffer &&
                                    _.push(u.args[b]);
                        else
                            u.type === 1 &&
                                u.res instanceof ArrayBuffer &&
                                _.push(u.res);
                        this._handler.sendMessage(u, _);
                    }
                }
                class y extends N.Disposable {
                    constructor(u, _, b) {
                        super();
                        let A = null;
                        (this._worker = this._register(
                            u.create(
                                'vs/base/common/worker/simpleWorker',
                                (I) => {
                                    this._protocol.handleMessage(I);
                                },
                                (I) => {
                                    A && A(I);
                                }
                            )
                        )),
                            (this._protocol = new C({
                                sendMessage: (I, F) => {
                                    this._worker.postMessage(I, F);
                                },
                                handleMessage: (I, F) => {
                                    if (typeof b[I] != 'function')
                                        return Promise.reject(
                                            new Error(
                                                'Missing method ' +
                                                    I +
                                                    ' on main thread host.'
                                            )
                                        );
                                    try {
                                        return Promise.resolve(
                                            b[I].apply(b, F)
                                        );
                                    } catch (O) {
                                        return Promise.reject(O);
                                    }
                                },
                                handleEvent: (I, F) => {
                                    if (s(I)) {
                                        const O = b[I].call(b, F);
                                        if (typeof O != 'function')
                                            throw new Error(
                                                `Missing dynamic event ${I} on main thread host.`
                                            );
                                        return O;
                                    }
                                    if (p(I)) {
                                        const O = b[I];
                                        if (typeof O != 'function')
                                            throw new Error(
                                                `Missing event ${I} on main thread host.`
                                            );
                                        return O;
                                    }
                                    throw new Error(
                                        `Malformed event name ${I}`
                                    );
                                },
                            })),
                            this._protocol.setWorkerId(this._worker.getId());
                        let P = null;
                        typeof o.globals.require != 'undefined' &&
                        typeof o.globals.require.getConfig == 'function'
                            ? (P = o.globals.require.getConfig())
                            : typeof o.globals.requirejs != 'undefined' &&
                              (P = o.globals.requirejs.s.contexts._.config);
                        const D = w.getAllMethodNames(b);
                        this._onModuleLoaded = this._protocol.sendMessage(c, [
                            this._worker.getId(),
                            JSON.parse(JSON.stringify(P)),
                            _,
                            D,
                        ]);
                        const k = (I, F) => this._request(I, F),
                            R = (I, F) => this._protocol.listen(I, F);
                        this._lazyProxy = new Promise((I, F) => {
                            (A = F),
                                this._onModuleLoaded.then(
                                    (O) => {
                                        I(i(O, k, R));
                                    },
                                    (O) => {
                                        F(O),
                                            this._onError(
                                                'Worker failed to load ' + _,
                                                O
                                            );
                                    }
                                );
                        });
                    }
                    getProxyObject() {
                        return this._lazyProxy;
                    }
                    _request(u, _) {
                        return new Promise((b, A) => {
                            this._onModuleLoaded.then(() => {
                                this._protocol.sendMessage(u, _).then(b, A);
                            }, A);
                        });
                    }
                    _onError(u, _) {
                        console.error(u), console.info(_);
                    }
                }
                r.SimpleWorkerClient = y;
                function p(f) {
                    return (
                        f[0] === 'o' &&
                        f[1] === 'n' &&
                        g.isUpperAsciiLetter(f.charCodeAt(2))
                    );
                }
                function s(f) {
                    return (
                        /^onDynamic/.test(f) &&
                        g.isUpperAsciiLetter(f.charCodeAt(9))
                    );
                }
                function i(f, u, _) {
                    const b = (D) =>
                            function () {
                                const k = Array.prototype.slice.call(
                                    arguments,
                                    0
                                );
                                return u(D, k);
                            },
                        A = (D) =>
                            function (k) {
                                return _(D, k);
                            };
                    let P = {};
                    for (const D of f) {
                        if (s(D)) {
                            P[D] = A(D);
                            continue;
                        }
                        if (p(D)) {
                            P[D] = _(D, void 0);
                            continue;
                        }
                        P[D] = b(D);
                    }
                    return P;
                }
                class a {
                    constructor(u, _) {
                        (this._requestHandlerFactory = _),
                            (this._requestHandler = null),
                            (this._protocol = new C({
                                sendMessage: (b, A) => {
                                    u(b, A);
                                },
                                handleMessage: (b, A) =>
                                    this._handleMessage(b, A),
                                handleEvent: (b, A) => this._handleEvent(b, A),
                            }));
                    }
                    onmessage(u) {
                        this._protocol.handleMessage(u);
                    }
                    _handleMessage(u, _) {
                        if (u === c)
                            return this.initialize(_[0], _[1], _[2], _[3]);
                        if (
                            !this._requestHandler ||
                            typeof this._requestHandler[u] != 'function'
                        )
                            return Promise.reject(
                                new Error(
                                    'Missing requestHandler or method: ' + u
                                )
                            );
                        try {
                            return Promise.resolve(
                                this._requestHandler[u].apply(
                                    this._requestHandler,
                                    _
                                )
                            );
                        } catch (b) {
                            return Promise.reject(b);
                        }
                    }
                    _handleEvent(u, _) {
                        if (!this._requestHandler)
                            throw new Error('Missing requestHandler');
                        if (s(u)) {
                            const b = this._requestHandler[u].call(
                                this._requestHandler,
                                _
                            );
                            if (typeof b != 'function')
                                throw new Error(
                                    `Missing dynamic event ${u} on request handler.`
                                );
                            return b;
                        }
                        if (p(u)) {
                            const b = this._requestHandler[u];
                            if (typeof b != 'function')
                                throw new Error(
                                    `Missing event ${u} on request handler.`
                                );
                            return b;
                        }
                        throw new Error(`Malformed event name ${u}`);
                    }
                    initialize(u, _, b, A) {
                        this._protocol.setWorkerId(u);
                        const k = i(
                            A,
                            (R, I) => this._protocol.sendMessage(R, I),
                            (R, I) => this._protocol.listen(R, I)
                        );
                        return this._requestHandlerFactory
                            ? ((this._requestHandler =
                                  this._requestHandlerFactory(k)),
                              Promise.resolve(
                                  w.getAllMethodNames(this._requestHandler)
                              ))
                            : (_ &&
                                  (typeof _.baseUrl != 'undefined' &&
                                      delete _.baseUrl,
                                  typeof _.paths != 'undefined' &&
                                      typeof _.paths.vs != 'undefined' &&
                                      delete _.paths.vs,
                                  typeof _.trustedTypesPolicy !== void 0 &&
                                      delete _.trustedTypesPolicy,
                                  (_.catchError = !0),
                                  o.globals.require.config(_)),
                              new Promise((R, I) => {
                                  (o.globals.require || U)(
                                      [b],
                                      (O) => {
                                          if (
                                              ((this._requestHandler =
                                                  O.create(k)),
                                              !this._requestHandler)
                                          ) {
                                              I(
                                                  new Error(
                                                      'No RequestHandler!'
                                                  )
                                              );
                                              return;
                                          }
                                          R(
                                              w.getAllMethodNames(
                                                  this._requestHandler
                                              )
                                          );
                                      },
                                      I
                                  );
                              }));
                    }
                }
                r.SimpleWorkerServer = a;
                function l(f) {
                    return new a(f, null);
                }
                r.create = l;
            }
        ),
        Y(Q[14], Z([0, 1, 13]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.CharacterSet = r.CharacterClassifier = void 0);
            class e {
                constructor(w) {
                    const g = (0, E.toUint8)(w);
                    (this._defaultValue = g),
                        (this._asciiMap = e._createAsciiMap(g)),
                        (this._map = new Map());
                }
                static _createAsciiMap(w) {
                    const g = new Uint8Array(256);
                    for (let c = 0; c < 256; c++) g[c] = w;
                    return g;
                }
                set(w, g) {
                    const c = (0, E.toUint8)(g);
                    w >= 0 && w < 256
                        ? (this._asciiMap[w] = c)
                        : this._map.set(w, c);
                }
                get(w) {
                    return w >= 0 && w < 256
                        ? this._asciiMap[w]
                        : this._map.get(w) || this._defaultValue;
                }
            }
            r.CharacterClassifier = e;
            class N {
                constructor() {
                    this._actual = new e(0);
                }
                add(w) {
                    this._actual.set(w, 1);
                }
                has(w) {
                    return this._actual.get(w) === 1;
                }
            }
            r.CharacterSet = N;
        }),
        Y(Q[3], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Position = void 0);
            class E {
                constructor(N, o) {
                    (this.lineNumber = N), (this.column = o);
                }
                with(N = this.lineNumber, o = this.column) {
                    return N === this.lineNumber && o === this.column
                        ? this
                        : new E(N, o);
                }
                delta(N = 0, o = 0) {
                    return this.with(this.lineNumber + N, this.column + o);
                }
                equals(N) {
                    return E.equals(this, N);
                }
                static equals(N, o) {
                    return !N && !o
                        ? !0
                        : !!N &&
                              !!o &&
                              N.lineNumber === o.lineNumber &&
                              N.column === o.column;
                }
                isBefore(N) {
                    return E.isBefore(this, N);
                }
                static isBefore(N, o) {
                    return N.lineNumber < o.lineNumber
                        ? !0
                        : o.lineNumber < N.lineNumber
                        ? !1
                        : N.column < o.column;
                }
                isBeforeOrEqual(N) {
                    return E.isBeforeOrEqual(this, N);
                }
                static isBeforeOrEqual(N, o) {
                    return N.lineNumber < o.lineNumber
                        ? !0
                        : o.lineNumber < N.lineNumber
                        ? !1
                        : N.column <= o.column;
                }
                static compare(N, o) {
                    const w = N.lineNumber | 0,
                        g = o.lineNumber | 0;
                    if (w === g) {
                        const c = N.column | 0,
                            m = o.column | 0;
                        return c - m;
                    }
                    return w - g;
                }
                clone() {
                    return new E(this.lineNumber, this.column);
                }
                toString() {
                    return '(' + this.lineNumber + ',' + this.column + ')';
                }
                static lift(N) {
                    return new E(N.lineNumber, N.column);
                }
                static isIPosition(N) {
                    return (
                        N &&
                        typeof N.lineNumber == 'number' &&
                        typeof N.column == 'number'
                    );
                }
            }
            r.Position = E;
        }),
        Y(Q[4], Z([0, 1, 3]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Range = void 0);
            class e {
                constructor(o, w, g, c) {
                    o > g || (o === g && w > c)
                        ? ((this.startLineNumber = g),
                          (this.startColumn = c),
                          (this.endLineNumber = o),
                          (this.endColumn = w))
                        : ((this.startLineNumber = o),
                          (this.startColumn = w),
                          (this.endLineNumber = g),
                          (this.endColumn = c));
                }
                isEmpty() {
                    return e.isEmpty(this);
                }
                static isEmpty(o) {
                    return (
                        o.startLineNumber === o.endLineNumber &&
                        o.startColumn === o.endColumn
                    );
                }
                containsPosition(o) {
                    return e.containsPosition(this, o);
                }
                static containsPosition(o, w) {
                    return !(
                        w.lineNumber < o.startLineNumber ||
                        w.lineNumber > o.endLineNumber ||
                        (w.lineNumber === o.startLineNumber &&
                            w.column < o.startColumn) ||
                        (w.lineNumber === o.endLineNumber &&
                            w.column > o.endColumn)
                    );
                }
                static strictContainsPosition(o, w) {
                    return !(
                        w.lineNumber < o.startLineNumber ||
                        w.lineNumber > o.endLineNumber ||
                        (w.lineNumber === o.startLineNumber &&
                            w.column <= o.startColumn) ||
                        (w.lineNumber === o.endLineNumber &&
                            w.column >= o.endColumn)
                    );
                }
                containsRange(o) {
                    return e.containsRange(this, o);
                }
                static containsRange(o, w) {
                    return !(
                        w.startLineNumber < o.startLineNumber ||
                        w.endLineNumber < o.startLineNumber ||
                        w.startLineNumber > o.endLineNumber ||
                        w.endLineNumber > o.endLineNumber ||
                        (w.startLineNumber === o.startLineNumber &&
                            w.startColumn < o.startColumn) ||
                        (w.endLineNumber === o.endLineNumber &&
                            w.endColumn > o.endColumn)
                    );
                }
                strictContainsRange(o) {
                    return e.strictContainsRange(this, o);
                }
                static strictContainsRange(o, w) {
                    return !(
                        w.startLineNumber < o.startLineNumber ||
                        w.endLineNumber < o.startLineNumber ||
                        w.startLineNumber > o.endLineNumber ||
                        w.endLineNumber > o.endLineNumber ||
                        (w.startLineNumber === o.startLineNumber &&
                            w.startColumn <= o.startColumn) ||
                        (w.endLineNumber === o.endLineNumber &&
                            w.endColumn >= o.endColumn)
                    );
                }
                plusRange(o) {
                    return e.plusRange(this, o);
                }
                static plusRange(o, w) {
                    let g, c, m, S;
                    return (
                        w.startLineNumber < o.startLineNumber
                            ? ((g = w.startLineNumber), (c = w.startColumn))
                            : w.startLineNumber === o.startLineNumber
                            ? ((g = w.startLineNumber),
                              (c = Math.min(w.startColumn, o.startColumn)))
                            : ((g = o.startLineNumber), (c = o.startColumn)),
                        w.endLineNumber > o.endLineNumber
                            ? ((m = w.endLineNumber), (S = w.endColumn))
                            : w.endLineNumber === o.endLineNumber
                            ? ((m = w.endLineNumber),
                              (S = Math.max(w.endColumn, o.endColumn)))
                            : ((m = o.endLineNumber), (S = o.endColumn)),
                        new e(g, c, m, S)
                    );
                }
                intersectRanges(o) {
                    return e.intersectRanges(this, o);
                }
                static intersectRanges(o, w) {
                    let g = o.startLineNumber,
                        c = o.startColumn,
                        m = o.endLineNumber,
                        S = o.endColumn,
                        t = w.startLineNumber,
                        d = w.startColumn,
                        h = w.endLineNumber,
                        v = w.endColumn;
                    return (
                        g < t
                            ? ((g = t), (c = d))
                            : g === t && (c = Math.max(c, d)),
                        m > h
                            ? ((m = h), (S = v))
                            : m === h && (S = Math.min(S, v)),
                        g > m || (g === m && c > S) ? null : new e(g, c, m, S)
                    );
                }
                equalsRange(o) {
                    return e.equalsRange(this, o);
                }
                static equalsRange(o, w) {
                    return (
                        !!o &&
                        !!w &&
                        o.startLineNumber === w.startLineNumber &&
                        o.startColumn === w.startColumn &&
                        o.endLineNumber === w.endLineNumber &&
                        o.endColumn === w.endColumn
                    );
                }
                getEndPosition() {
                    return e.getEndPosition(this);
                }
                static getEndPosition(o) {
                    return new E.Position(o.endLineNumber, o.endColumn);
                }
                getStartPosition() {
                    return e.getStartPosition(this);
                }
                static getStartPosition(o) {
                    return new E.Position(o.startLineNumber, o.startColumn);
                }
                toString() {
                    return (
                        '[' +
                        this.startLineNumber +
                        ',' +
                        this.startColumn +
                        ' -> ' +
                        this.endLineNumber +
                        ',' +
                        this.endColumn +
                        ']'
                    );
                }
                setEndPosition(o, w) {
                    return new e(this.startLineNumber, this.startColumn, o, w);
                }
                setStartPosition(o, w) {
                    return new e(o, w, this.endLineNumber, this.endColumn);
                }
                collapseToStart() {
                    return e.collapseToStart(this);
                }
                static collapseToStart(o) {
                    return new e(
                        o.startLineNumber,
                        o.startColumn,
                        o.startLineNumber,
                        o.startColumn
                    );
                }
                static fromPositions(o, w = o) {
                    return new e(
                        o.lineNumber,
                        o.column,
                        w.lineNumber,
                        w.column
                    );
                }
                static lift(o) {
                    return o
                        ? new e(
                              o.startLineNumber,
                              o.startColumn,
                              o.endLineNumber,
                              o.endColumn
                          )
                        : null;
                }
                static isIRange(o) {
                    return (
                        o &&
                        typeof o.startLineNumber == 'number' &&
                        typeof o.startColumn == 'number' &&
                        typeof o.endLineNumber == 'number' &&
                        typeof o.endColumn == 'number'
                    );
                }
                static areIntersectingOrTouching(o, w) {
                    return !(
                        o.endLineNumber < w.startLineNumber ||
                        (o.endLineNumber === w.startLineNumber &&
                            o.endColumn < w.startColumn) ||
                        w.endLineNumber < o.startLineNumber ||
                        (w.endLineNumber === o.startLineNumber &&
                            w.endColumn < o.startColumn)
                    );
                }
                static areIntersecting(o, w) {
                    return !(
                        o.endLineNumber < w.startLineNumber ||
                        (o.endLineNumber === w.startLineNumber &&
                            o.endColumn <= w.startColumn) ||
                        w.endLineNumber < o.startLineNumber ||
                        (w.endLineNumber === o.startLineNumber &&
                            w.endColumn <= o.startColumn)
                    );
                }
                static compareRangesUsingStarts(o, w) {
                    if (o && w) {
                        const m = o.startLineNumber | 0,
                            S = w.startLineNumber | 0;
                        if (m === S) {
                            const t = o.startColumn | 0,
                                d = w.startColumn | 0;
                            if (t === d) {
                                const h = o.endLineNumber | 0,
                                    v = w.endLineNumber | 0;
                                if (h === v) {
                                    const L = o.endColumn | 0,
                                        C = w.endColumn | 0;
                                    return L - C;
                                }
                                return h - v;
                            }
                            return t - d;
                        }
                        return m - S;
                    }
                    return (o ? 1 : 0) - (w ? 1 : 0);
                }
                static compareRangesUsingEnds(o, w) {
                    return o.endLineNumber === w.endLineNumber
                        ? o.endColumn === w.endColumn
                            ? o.startLineNumber === w.startLineNumber
                                ? o.startColumn - w.startColumn
                                : o.startLineNumber - w.startLineNumber
                            : o.endColumn - w.endColumn
                        : o.endLineNumber - w.endLineNumber;
                }
                static spansMultipleLines(o) {
                    return o.endLineNumber > o.startLineNumber;
                }
                toJSON() {
                    return this;
                }
            }
            r.Range = e;
        }),
        Y(Q[30], Z([0, 1, 3, 4]), function (U, r, E, e) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Selection = void 0);
            class N extends e.Range {
                constructor(w, g, c, m) {
                    super(w, g, c, m);
                    (this.selectionStartLineNumber = w),
                        (this.selectionStartColumn = g),
                        (this.positionLineNumber = c),
                        (this.positionColumn = m);
                }
                toString() {
                    return (
                        '[' +
                        this.selectionStartLineNumber +
                        ',' +
                        this.selectionStartColumn +
                        ' -> ' +
                        this.positionLineNumber +
                        ',' +
                        this.positionColumn +
                        ']'
                    );
                }
                equalsSelection(w) {
                    return N.selectionsEqual(this, w);
                }
                static selectionsEqual(w, g) {
                    return (
                        w.selectionStartLineNumber ===
                            g.selectionStartLineNumber &&
                        w.selectionStartColumn === g.selectionStartColumn &&
                        w.positionLineNumber === g.positionLineNumber &&
                        w.positionColumn === g.positionColumn
                    );
                }
                getDirection() {
                    return this.selectionStartLineNumber ===
                        this.startLineNumber &&
                        this.selectionStartColumn === this.startColumn
                        ? 0
                        : 1;
                }
                setEndPosition(w, g) {
                    return this.getDirection() === 0
                        ? new N(this.startLineNumber, this.startColumn, w, g)
                        : new N(w, g, this.startLineNumber, this.startColumn);
                }
                getPosition() {
                    return new E.Position(
                        this.positionLineNumber,
                        this.positionColumn
                    );
                }
                getSelectionStart() {
                    return new E.Position(
                        this.selectionStartLineNumber,
                        this.selectionStartColumn
                    );
                }
                setStartPosition(w, g) {
                    return this.getDirection() === 0
                        ? new N(w, g, this.endLineNumber, this.endColumn)
                        : new N(this.endLineNumber, this.endColumn, w, g);
                }
                static fromPositions(w, g = w) {
                    return new N(
                        w.lineNumber,
                        w.column,
                        g.lineNumber,
                        g.column
                    );
                }
                static fromRange(w, g) {
                    return g === 0
                        ? new N(
                              w.startLineNumber,
                              w.startColumn,
                              w.endLineNumber,
                              w.endColumn
                          )
                        : new N(
                              w.endLineNumber,
                              w.endColumn,
                              w.startLineNumber,
                              w.startColumn
                          );
                }
                static liftSelection(w) {
                    return new N(
                        w.selectionStartLineNumber,
                        w.selectionStartColumn,
                        w.positionLineNumber,
                        w.positionColumn
                    );
                }
                static selectionsArrEqual(w, g) {
                    if ((w && !g) || (!w && g)) return !1;
                    if (!w && !g) return !0;
                    if (w.length !== g.length) return !1;
                    for (let c = 0, m = w.length; c < m; c++)
                        if (!this.selectionsEqual(w[c], g[c])) return !1;
                    return !0;
                }
                static isISelection(w) {
                    return (
                        w &&
                        typeof w.selectionStartLineNumber == 'number' &&
                        typeof w.selectionStartColumn == 'number' &&
                        typeof w.positionLineNumber == 'number' &&
                        typeof w.positionColumn == 'number'
                    );
                }
                static createWithDirection(w, g, c, m, S) {
                    return S === 0 ? new N(w, g, c, m) : new N(c, m, w, g);
                }
            }
            r.Selection = N;
        }),
        Y(Q[31], Z([0, 1, 14]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.getMapForWordSeparators = r.WordCharacterClassifier =
                    void 0);
            class e extends E.CharacterClassifier {
                constructor(w) {
                    super(0);
                    for (let g = 0, c = w.length; g < c; g++)
                        this.set(w.charCodeAt(g), 2);
                    this.set(32, 1), this.set(9, 1);
                }
            }
            r.WordCharacterClassifier = e;
            function N(o) {
                const w = {};
                return (g) => (w.hasOwnProperty(g) || (w[g] = o(g)), w[g]);
            }
            r.getMapForWordSeparators = N((o) => new e(o));
        }),
        Y(Q[15], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.getWordAtText =
                    r.ensureValidWordDefinition =
                    r.DEFAULT_WORD_REGEXP =
                    r.USUAL_WORD_SEPARATORS =
                        void 0),
                (r.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?');
            function E(g = '') {
                let c = '(-?\\d*\\.\\d\\w*)|([^';
                for (const m of r.USUAL_WORD_SEPARATORS)
                    g.indexOf(m) >= 0 || (c += '\\' + m);
                return (c += '\\s]+)'), new RegExp(c, 'g');
            }
            r.DEFAULT_WORD_REGEXP = E();
            function e(g) {
                let c = r.DEFAULT_WORD_REGEXP;
                if (g && g instanceof RegExp)
                    if (g.global) c = g;
                    else {
                        let m = 'g';
                        g.ignoreCase && (m += 'i'),
                            g.multiline && (m += 'm'),
                            g.unicode && (m += 'u'),
                            (c = new RegExp(g.source, m));
                    }
                return (c.lastIndex = 0), c;
            }
            r.ensureValidWordDefinition = e;
            const N = { maxLen: 1e3, windowSize: 15, timeBudget: 150 };
            function o(g, c, m, S, t = N) {
                if (m.length > t.maxLen) {
                    let C = g - t.maxLen / 2;
                    return (
                        C < 0 ? (C = 0) : (S += C),
                        (m = m.substring(C, g + t.maxLen / 2)),
                        o(g, c, m, S, t)
                    );
                }
                const d = Date.now(),
                    h = g - 1 - S;
                let v = -1,
                    L = null;
                for (let C = 1; !(Date.now() - d >= t.timeBudget); C++) {
                    const y = h - t.windowSize * C;
                    c.lastIndex = Math.max(0, y);
                    const p = w(c, m, h, v);
                    if ((!p && L) || ((L = p), y <= 0)) break;
                    v = y;
                }
                if (L) {
                    const C = {
                        word: L[0],
                        startColumn: S + 1 + L.index,
                        endColumn: S + 1 + L.index + L[0].length,
                    };
                    return (c.lastIndex = 0), C;
                }
                return null;
            }
            r.getWordAtText = o;
            function w(g, c, m, S) {
                let t;
                for (; (t = g.exec(c)); ) {
                    const d = t.index || 0;
                    if (d <= m && g.lastIndex >= m) return t;
                    if (S > 0 && d > S) return null;
                }
                return null;
            }
        }),
        Y(Q[32], Z([0, 1, 12, 2]), function (U, r, E, e) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.DiffComputer = void 0);
            const N = 3;
            function o(L, C, y, p) {
                return new E.LcsDiff(L, C, y).ComputeDiff(p);
            }
            class w {
                constructor(C) {
                    const y = [],
                        p = [];
                    for (let s = 0, i = C.length; s < i; s++)
                        (y[s] = d(C[s], 1)), (p[s] = h(C[s], 1));
                    (this.lines = C),
                        (this._startColumns = y),
                        (this._endColumns = p);
                }
                getElements() {
                    const C = [];
                    for (let y = 0, p = this.lines.length; y < p; y++)
                        C[y] = this.lines[y].substring(
                            this._startColumns[y] - 1,
                            this._endColumns[y] - 1
                        );
                    return C;
                }
                getStrictElement(C) {
                    return this.lines[C];
                }
                getStartLineNumber(C) {
                    return C + 1;
                }
                getEndLineNumber(C) {
                    return C + 1;
                }
                createCharSequence(C, y, p) {
                    const s = [],
                        i = [],
                        a = [];
                    let l = 0;
                    for (let f = y; f <= p; f++) {
                        const u = this.lines[f],
                            _ = C ? this._startColumns[f] : 1,
                            b = C ? this._endColumns[f] : u.length + 1;
                        for (let A = _; A < b; A++)
                            (s[l] = u.charCodeAt(A - 1)),
                                (i[l] = f + 1),
                                (a[l] = A),
                                l++;
                    }
                    return new g(s, i, a);
                }
            }
            class g {
                constructor(C, y, p) {
                    (this._charCodes = C),
                        (this._lineNumbers = y),
                        (this._columns = p);
                }
                getElements() {
                    return this._charCodes;
                }
                getStartLineNumber(C) {
                    return this._lineNumbers[C];
                }
                getStartColumn(C) {
                    return this._columns[C];
                }
                getEndLineNumber(C) {
                    return this._lineNumbers[C];
                }
                getEndColumn(C) {
                    return this._columns[C] + 1;
                }
            }
            class c {
                constructor(C, y, p, s, i, a, l, f) {
                    (this.originalStartLineNumber = C),
                        (this.originalStartColumn = y),
                        (this.originalEndLineNumber = p),
                        (this.originalEndColumn = s),
                        (this.modifiedStartLineNumber = i),
                        (this.modifiedStartColumn = a),
                        (this.modifiedEndLineNumber = l),
                        (this.modifiedEndColumn = f);
                }
                static createFromDiffChange(C, y, p) {
                    let s, i, a, l, f, u, _, b;
                    return (
                        C.originalLength === 0
                            ? ((s = 0), (i = 0), (a = 0), (l = 0))
                            : ((s = y.getStartLineNumber(C.originalStart)),
                              (i = y.getStartColumn(C.originalStart)),
                              (a = y.getEndLineNumber(
                                  C.originalStart + C.originalLength - 1
                              )),
                              (l = y.getEndColumn(
                                  C.originalStart + C.originalLength - 1
                              ))),
                        C.modifiedLength === 0
                            ? ((f = 0), (u = 0), (_ = 0), (b = 0))
                            : ((f = p.getStartLineNumber(C.modifiedStart)),
                              (u = p.getStartColumn(C.modifiedStart)),
                              (_ = p.getEndLineNumber(
                                  C.modifiedStart + C.modifiedLength - 1
                              )),
                              (b = p.getEndColumn(
                                  C.modifiedStart + C.modifiedLength - 1
                              ))),
                        new c(s, i, a, l, f, u, _, b)
                    );
                }
            }
            function m(L) {
                if (L.length <= 1) return L;
                const C = [L[0]];
                let y = C[0];
                for (let p = 1, s = L.length; p < s; p++) {
                    const i = L[p],
                        a =
                            i.originalStart -
                            (y.originalStart + y.originalLength),
                        l =
                            i.modifiedStart -
                            (y.modifiedStart + y.modifiedLength);
                    Math.min(a, l) < N
                        ? ((y.originalLength =
                              i.originalStart +
                              i.originalLength -
                              y.originalStart),
                          (y.modifiedLength =
                              i.modifiedStart +
                              i.modifiedLength -
                              y.modifiedStart))
                        : (C.push(i), (y = i));
                }
                return C;
            }
            class S {
                constructor(C, y, p, s, i) {
                    (this.originalStartLineNumber = C),
                        (this.originalEndLineNumber = y),
                        (this.modifiedStartLineNumber = p),
                        (this.modifiedEndLineNumber = s),
                        (this.charChanges = i);
                }
                static createFromDiffResult(C, y, p, s, i, a, l) {
                    let f, u, _, b, A;
                    if (
                        (y.originalLength === 0
                            ? ((f = p.getStartLineNumber(y.originalStart) - 1),
                              (u = 0))
                            : ((f = p.getStartLineNumber(y.originalStart)),
                              (u = p.getEndLineNumber(
                                  y.originalStart + y.originalLength - 1
                              ))),
                        y.modifiedLength === 0
                            ? ((_ = s.getStartLineNumber(y.modifiedStart) - 1),
                              (b = 0))
                            : ((_ = s.getStartLineNumber(y.modifiedStart)),
                              (b = s.getEndLineNumber(
                                  y.modifiedStart + y.modifiedLength - 1
                              ))),
                        a &&
                            y.originalLength > 0 &&
                            y.originalLength < 20 &&
                            y.modifiedLength > 0 &&
                            y.modifiedLength < 20 &&
                            i())
                    ) {
                        const P = p.createCharSequence(
                                C,
                                y.originalStart,
                                y.originalStart + y.originalLength - 1
                            ),
                            D = s.createCharSequence(
                                C,
                                y.modifiedStart,
                                y.modifiedStart + y.modifiedLength - 1
                            );
                        let k = o(P, D, i, !0).changes;
                        l && (k = m(k)), (A = []);
                        for (let R = 0, I = k.length; R < I; R++)
                            A.push(c.createFromDiffChange(k[R], P, D));
                    }
                    return new S(f, u, _, b, A);
                }
            }
            class t {
                constructor(C, y, p) {
                    (this.shouldComputeCharChanges =
                        p.shouldComputeCharChanges),
                        (this.shouldPostProcessCharChanges =
                            p.shouldPostProcessCharChanges),
                        (this.shouldIgnoreTrimWhitespace =
                            p.shouldIgnoreTrimWhitespace),
                        (this.shouldMakePrettyDiff = p.shouldMakePrettyDiff),
                        (this.originalLines = C),
                        (this.modifiedLines = y),
                        (this.original = new w(C)),
                        (this.modified = new w(y)),
                        (this.continueLineDiff = v(p.maxComputationTime)),
                        (this.continueCharDiff = v(
                            p.maxComputationTime === 0
                                ? 0
                                : Math.min(p.maxComputationTime, 5e3)
                        ));
                }
                computeDiff() {
                    if (
                        this.original.lines.length === 1 &&
                        this.original.lines[0].length === 0
                    )
                        return this.modified.lines.length === 1 &&
                            this.modified.lines[0].length === 0
                            ? { quitEarly: !1, changes: [] }
                            : {
                                  quitEarly: !1,
                                  changes: [
                                      {
                                          originalStartLineNumber: 1,
                                          originalEndLineNumber: 1,
                                          modifiedStartLineNumber: 1,
                                          modifiedEndLineNumber:
                                              this.modified.lines.length,
                                          charChanges: [
                                              {
                                                  modifiedEndColumn: 0,
                                                  modifiedEndLineNumber: 0,
                                                  modifiedStartColumn: 0,
                                                  modifiedStartLineNumber: 0,
                                                  originalEndColumn: 0,
                                                  originalEndLineNumber: 0,
                                                  originalStartColumn: 0,
                                                  originalStartLineNumber: 0,
                                              },
                                          ],
                                      },
                                  ],
                              };
                    if (
                        this.modified.lines.length === 1 &&
                        this.modified.lines[0].length === 0
                    )
                        return {
                            quitEarly: !1,
                            changes: [
                                {
                                    originalStartLineNumber: 1,
                                    originalEndLineNumber:
                                        this.original.lines.length,
                                    modifiedStartLineNumber: 1,
                                    modifiedEndLineNumber: 1,
                                    charChanges: [
                                        {
                                            modifiedEndColumn: 0,
                                            modifiedEndLineNumber: 0,
                                            modifiedStartColumn: 0,
                                            modifiedStartLineNumber: 0,
                                            originalEndColumn: 0,
                                            originalEndLineNumber: 0,
                                            originalStartColumn: 0,
                                            originalStartLineNumber: 0,
                                        },
                                    ],
                                },
                            ],
                        };
                    const C = o(
                            this.original,
                            this.modified,
                            this.continueLineDiff,
                            this.shouldMakePrettyDiff
                        ),
                        y = C.changes,
                        p = C.quitEarly;
                    if (this.shouldIgnoreTrimWhitespace) {
                        const l = [];
                        for (let f = 0, u = y.length; f < u; f++)
                            l.push(
                                S.createFromDiffResult(
                                    this.shouldIgnoreTrimWhitespace,
                                    y[f],
                                    this.original,
                                    this.modified,
                                    this.continueCharDiff,
                                    this.shouldComputeCharChanges,
                                    this.shouldPostProcessCharChanges
                                )
                            );
                        return { quitEarly: p, changes: l };
                    }
                    const s = [];
                    let i = 0,
                        a = 0;
                    for (let l = -1, f = y.length; l < f; l++) {
                        const u = l + 1 < f ? y[l + 1] : null,
                            _ = u ? u.originalStart : this.originalLines.length,
                            b = u ? u.modifiedStart : this.modifiedLines.length;
                        for (; i < _ && a < b; ) {
                            const A = this.originalLines[i],
                                P = this.modifiedLines[a];
                            if (A !== P) {
                                {
                                    let D = d(A, 1),
                                        k = d(P, 1);
                                    for (; D > 1 && k > 1; ) {
                                        const R = A.charCodeAt(D - 2),
                                            I = P.charCodeAt(k - 2);
                                        if (R !== I) break;
                                        D--, k--;
                                    }
                                    (D > 1 || k > 1) &&
                                        this._pushTrimWhitespaceCharChange(
                                            s,
                                            i + 1,
                                            1,
                                            D,
                                            a + 1,
                                            1,
                                            k
                                        );
                                }
                                {
                                    let D = h(A, 1),
                                        k = h(P, 1);
                                    const R = A.length + 1,
                                        I = P.length + 1;
                                    for (; D < R && k < I; ) {
                                        const F = A.charCodeAt(D - 1),
                                            O = A.charCodeAt(k - 1);
                                        if (F !== O) break;
                                        D++, k++;
                                    }
                                    (D < R || k < I) &&
                                        this._pushTrimWhitespaceCharChange(
                                            s,
                                            i + 1,
                                            D,
                                            R,
                                            a + 1,
                                            k,
                                            I
                                        );
                                }
                            }
                            i++, a++;
                        }
                        u &&
                            (s.push(
                                S.createFromDiffResult(
                                    this.shouldIgnoreTrimWhitespace,
                                    u,
                                    this.original,
                                    this.modified,
                                    this.continueCharDiff,
                                    this.shouldComputeCharChanges,
                                    this.shouldPostProcessCharChanges
                                )
                            ),
                            (i += u.originalLength),
                            (a += u.modifiedLength));
                    }
                    return { quitEarly: p, changes: s };
                }
                _pushTrimWhitespaceCharChange(C, y, p, s, i, a, l) {
                    if (
                        this._mergeTrimWhitespaceCharChange(C, y, p, s, i, a, l)
                    )
                        return;
                    let f;
                    this.shouldComputeCharChanges &&
                        (f = [new c(y, p, y, s, i, a, i, l)]),
                        C.push(new S(y, y, i, i, f));
                }
                _mergeTrimWhitespaceCharChange(C, y, p, s, i, a, l) {
                    const f = C.length;
                    if (f === 0) return !1;
                    const u = C[f - 1];
                    return u.originalEndLineNumber === 0 ||
                        u.modifiedEndLineNumber === 0
                        ? !1
                        : u.originalEndLineNumber + 1 === y &&
                          u.modifiedEndLineNumber + 1 === i
                        ? ((u.originalEndLineNumber = y),
                          (u.modifiedEndLineNumber = i),
                          this.shouldComputeCharChanges &&
                              u.charChanges &&
                              u.charChanges.push(new c(y, p, y, s, i, a, i, l)),
                          !0)
                        : !1;
                }
            }
            r.DiffComputer = t;
            function d(L, C) {
                const y = e.firstNonWhitespaceIndex(L);
                return y === -1 ? C : y + 1;
            }
            function h(L, C) {
                const y = e.lastNonWhitespaceIndex(L);
                return y === -1 ? C : y + 2;
            }
            function v(L) {
                if (L === 0) return () => !0;
                const C = Date.now();
                return () => Date.now() - C < L;
            }
        }),
        Y(Q[33], Z([0, 1, 14]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.computeLinks =
                    r.LinkComputer =
                    r.StateMachine =
                    r.Uint8Matrix =
                        void 0);
            class e {
                constructor(d, h, v) {
                    const L = new Uint8Array(d * h);
                    for (let C = 0, y = d * h; C < y; C++) L[C] = v;
                    (this._data = L), (this.rows = d), (this.cols = h);
                }
                get(d, h) {
                    return this._data[d * this.cols + h];
                }
                set(d, h, v) {
                    this._data[d * this.cols + h] = v;
                }
            }
            r.Uint8Matrix = e;
            class N {
                constructor(d) {
                    let h = 0,
                        v = 0;
                    for (let C = 0, y = d.length; C < y; C++) {
                        const [p, s, i] = d[C];
                        s > h && (h = s), p > v && (v = p), i > v && (v = i);
                    }
                    h++, v++;
                    const L = new e(v, h, 0);
                    for (let C = 0, y = d.length; C < y; C++) {
                        const [p, s, i] = d[C];
                        L.set(p, s, i);
                    }
                    (this._states = L), (this._maxCharCode = h);
                }
                nextState(d, h) {
                    return h < 0 || h >= this._maxCharCode
                        ? 0
                        : this._states.get(d, h);
                }
            }
            r.StateMachine = N;
            let o = null;
            function w() {
                return (
                    o === null &&
                        (o = new N([
                            [1, 104, 2],
                            [1, 72, 2],
                            [1, 102, 6],
                            [1, 70, 6],
                            [2, 116, 3],
                            [2, 84, 3],
                            [3, 116, 4],
                            [3, 84, 4],
                            [4, 112, 5],
                            [4, 80, 5],
                            [5, 115, 9],
                            [5, 83, 9],
                            [5, 58, 10],
                            [6, 105, 7],
                            [6, 73, 7],
                            [7, 108, 8],
                            [7, 76, 8],
                            [8, 101, 9],
                            [8, 69, 9],
                            [9, 58, 10],
                            [10, 47, 11],
                            [11, 47, 12],
                        ])),
                    o
                );
            }
            let g = null;
            function c() {
                if (g === null) {
                    g = new E.CharacterClassifier(0);
                    const t = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
                    for (let h = 0; h < t.length; h++)
                        g.set(t.charCodeAt(h), 1);
                    const d = '.,;';
                    for (let h = 0; h < d.length; h++)
                        g.set(d.charCodeAt(h), 2);
                }
                return g;
            }
            class m {
                static _createLink(d, h, v, L, C) {
                    let y = C - 1;
                    do {
                        const p = h.charCodeAt(y);
                        if (d.get(p) !== 2) break;
                        y--;
                    } while (y > L);
                    if (L > 0) {
                        const p = h.charCodeAt(L - 1),
                            s = h.charCodeAt(y);
                        ((p === 40 && s === 41) ||
                            (p === 91 && s === 93) ||
                            (p === 123 && s === 125)) &&
                            y--;
                    }
                    return {
                        range: {
                            startLineNumber: v,
                            startColumn: L + 1,
                            endLineNumber: v,
                            endColumn: y + 2,
                        },
                        url: h.substring(L, y + 1),
                    };
                }
                static computeLinks(d, h = w()) {
                    const v = c(),
                        L = [];
                    for (let C = 1, y = d.getLineCount(); C <= y; C++) {
                        const p = d.getLineContent(C),
                            s = p.length;
                        let i = 0,
                            a = 0,
                            l = 0,
                            f = 1,
                            u = !1,
                            _ = !1,
                            b = !1,
                            A = !1;
                        for (; i < s; ) {
                            let P = !1;
                            const D = p.charCodeAt(i);
                            if (f === 13) {
                                let k;
                                switch (D) {
                                    case 40:
                                        (u = !0), (k = 0);
                                        break;
                                    case 41:
                                        k = u ? 0 : 1;
                                        break;
                                    case 91:
                                        (b = !0), (_ = !0), (k = 0);
                                        break;
                                    case 93:
                                        (b = !1), (k = _ ? 0 : 1);
                                        break;
                                    case 123:
                                        (A = !0), (k = 0);
                                        break;
                                    case 125:
                                        k = A ? 0 : 1;
                                        break;
                                    case 39:
                                        k = l === 34 || l === 96 ? 0 : 1;
                                        break;
                                    case 34:
                                        k = l === 39 || l === 96 ? 0 : 1;
                                        break;
                                    case 96:
                                        k = l === 39 || l === 34 ? 0 : 1;
                                        break;
                                    case 42:
                                        k = l === 42 ? 1 : 0;
                                        break;
                                    case 124:
                                        k = l === 124 ? 1 : 0;
                                        break;
                                    case 32:
                                        k = b ? 0 : 1;
                                        break;
                                    default:
                                        k = v.get(D);
                                }
                                k === 1 &&
                                    (L.push(m._createLink(v, p, C, a, i)),
                                    (P = !0));
                            } else if (f === 12) {
                                let k;
                                D === 91 ? ((_ = !0), (k = 0)) : (k = v.get(D)),
                                    k === 1 ? (P = !0) : (f = 13);
                            } else (f = h.nextState(f, D)), f === 0 && (P = !0);
                            P &&
                                ((f = 1),
                                (u = !1),
                                (_ = !1),
                                (A = !1),
                                (a = i + 1),
                                (l = D)),
                                i++;
                        }
                        f === 13 && L.push(m._createLink(v, p, C, a, s));
                    }
                    return L;
                }
            }
            r.LinkComputer = m;
            function S(t) {
                return !t ||
                    typeof t.getLineCount != 'function' ||
                    typeof t.getLineContent != 'function'
                    ? []
                    : m.computeLinks(t);
            }
            r.computeLinks = S;
        }),
        Y(Q[34], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.BasicInplaceReplace = void 0);
            class E {
                constructor() {
                    this._defaultValueSet = [
                        ['true', 'false'],
                        ['True', 'False'],
                        [
                            'Private',
                            'Public',
                            'Friend',
                            'ReadOnly',
                            'Partial',
                            'Protected',
                            'WriteOnly',
                        ],
                        ['public', 'protected', 'private'],
                    ];
                }
                navigateValueSet(N, o, w, g, c) {
                    if (N && o) {
                        const m = this.doNavigateValueSet(o, c);
                        if (m) return { range: N, value: m };
                    }
                    if (w && g) {
                        const m = this.doNavigateValueSet(g, c);
                        if (m) return { range: w, value: m };
                    }
                    return null;
                }
                doNavigateValueSet(N, o) {
                    const w = this.numberReplace(N, o);
                    return w !== null ? w : this.textReplace(N, o);
                }
                numberReplace(N, o) {
                    const w = Math.pow(10, N.length - (N.lastIndexOf('.') + 1));
                    let g = Number(N),
                        c = parseFloat(N);
                    return !isNaN(g) && !isNaN(c) && g === c
                        ? g === 0 && !o
                            ? null
                            : ((g = Math.floor(g * w)),
                              (g += o ? w : -w),
                              String(g / w))
                        : null;
                }
                textReplace(N, o) {
                    return this.valueSetsReplace(this._defaultValueSet, N, o);
                }
                valueSetsReplace(N, o, w) {
                    let g = null;
                    for (let c = 0, m = N.length; g === null && c < m; c++)
                        g = this.valueSetReplace(N[c], o, w);
                    return g;
                }
                valueSetReplace(N, o, w) {
                    let g = N.indexOf(o);
                    return g >= 0
                        ? ((g += w ? 1 : -1),
                          g < 0 ? (g = N.length - 1) : (g %= N.length),
                          N[g])
                        : null;
                }
            }
            (r.BasicInplaceReplace = E), (E.INSTANCE = new E());
        }),
        Y(Q[35], Z([0, 1, 29]), function (U, r, E) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.shouldSynchronizeModel =
                    r.ApplyEditsResult =
                    r.SearchData =
                    r.ValidAnnotatedEditOperation =
                    r.FindMatch =
                    r.TextModelResolvedOptions =
                    r.InjectedTextCursorStops =
                    r.MinimapPosition =
                    r.OverviewRulerLane =
                        void 0);
            var e;
            (function (d) {
                (d[(d.Left = 1)] = 'Left'),
                    (d[(d.Center = 2)] = 'Center'),
                    (d[(d.Right = 4)] = 'Right'),
                    (d[(d.Full = 7)] = 'Full');
            })((e = r.OverviewRulerLane || (r.OverviewRulerLane = {})));
            var N;
            (function (d) {
                (d[(d.Inline = 1)] = 'Inline'), (d[(d.Gutter = 2)] = 'Gutter');
            })((N = r.MinimapPosition || (r.MinimapPosition = {})));
            var o;
            (function (d) {
                (d[(d.Both = 0)] = 'Both'),
                    (d[(d.Right = 1)] = 'Right'),
                    (d[(d.Left = 2)] = 'Left'),
                    (d[(d.None = 3)] = 'None');
            })(
                (o =
                    r.InjectedTextCursorStops ||
                    (r.InjectedTextCursorStops = {}))
            );
            class w {
                constructor(h) {
                    (this._textModelResolvedOptionsBrand = void 0),
                        (this.tabSize = Math.max(1, h.tabSize | 0)),
                        (this.indentSize = h.tabSize | 0),
                        (this.insertSpaces = Boolean(h.insertSpaces)),
                        (this.defaultEOL = h.defaultEOL | 0),
                        (this.trimAutoWhitespace = Boolean(
                            h.trimAutoWhitespace
                        )),
                        (this.bracketPairColorizationOptions =
                            h.bracketPairColorizationOptions);
                }
                equals(h) {
                    return (
                        this.tabSize === h.tabSize &&
                        this.indentSize === h.indentSize &&
                        this.insertSpaces === h.insertSpaces &&
                        this.defaultEOL === h.defaultEOL &&
                        this.trimAutoWhitespace === h.trimAutoWhitespace &&
                        (0, E.equals)(
                            this.bracketPairColorizationOptions,
                            h.bracketPairColorizationOptions
                        )
                    );
                }
                createChangeEvent(h) {
                    return {
                        tabSize: this.tabSize !== h.tabSize,
                        indentSize: this.indentSize !== h.indentSize,
                        insertSpaces: this.insertSpaces !== h.insertSpaces,
                        trimAutoWhitespace:
                            this.trimAutoWhitespace !== h.trimAutoWhitespace,
                    };
                }
            }
            r.TextModelResolvedOptions = w;
            class g {
                constructor(h, v) {
                    (this._findMatchBrand = void 0),
                        (this.range = h),
                        (this.matches = v);
                }
            }
            r.FindMatch = g;
            class c {
                constructor(h, v, L, C, y, p) {
                    (this.identifier = h),
                        (this.range = v),
                        (this.text = L),
                        (this.forceMoveMarkers = C),
                        (this.isAutoWhitespaceEdit = y),
                        (this._isTracked = p);
                }
            }
            r.ValidAnnotatedEditOperation = c;
            class m {
                constructor(h, v, L) {
                    (this.regex = h),
                        (this.wordSeparators = v),
                        (this.simpleSearch = L);
                }
            }
            r.SearchData = m;
            class S {
                constructor(h, v, L) {
                    (this.reverseEdits = h),
                        (this.changes = v),
                        (this.trimAutoWhitespaceLineNumbers = L);
                }
            }
            r.ApplyEditsResult = S;
            function t(d) {
                return !d.isTooLargeForSyncing() && !d.isForSimpleWidget;
            }
            r.shouldSynchronizeModel = t;
        }),
        Y(Q[36], Z([0, 1, 16, 13]), function (U, r, E, e) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.PrefixSumIndexOfResult =
                    r.ConstantTimePrefixSumComputer =
                    r.PrefixSumComputer =
                        void 0);
            class N {
                constructor(c) {
                    (this.values = c),
                        (this.prefixSum = new Uint32Array(c.length)),
                        (this.prefixSumValidIndex = new Int32Array(1)),
                        (this.prefixSumValidIndex[0] = -1);
                }
                insertValues(c, m) {
                    c = (0, e.toUint32)(c);
                    const S = this.values,
                        t = this.prefixSum,
                        d = m.length;
                    return d === 0
                        ? !1
                        : ((this.values = new Uint32Array(S.length + d)),
                          this.values.set(S.subarray(0, c), 0),
                          this.values.set(S.subarray(c), c + d),
                          this.values.set(m, c),
                          c - 1 < this.prefixSumValidIndex[0] &&
                              (this.prefixSumValidIndex[0] = c - 1),
                          (this.prefixSum = new Uint32Array(
                              this.values.length
                          )),
                          this.prefixSumValidIndex[0] >= 0 &&
                              this.prefixSum.set(
                                  t.subarray(0, this.prefixSumValidIndex[0] + 1)
                              ),
                          !0);
                }
                setValue(c, m) {
                    return (
                        (c = (0, e.toUint32)(c)),
                        (m = (0, e.toUint32)(m)),
                        this.values[c] === m
                            ? !1
                            : ((this.values[c] = m),
                              c - 1 < this.prefixSumValidIndex[0] &&
                                  (this.prefixSumValidIndex[0] = c - 1),
                              !0)
                    );
                }
                removeValues(c, m) {
                    (c = (0, e.toUint32)(c)), (m = (0, e.toUint32)(m));
                    const S = this.values,
                        t = this.prefixSum;
                    if (c >= S.length) return !1;
                    const d = S.length - c;
                    return (
                        m >= d && (m = d),
                        m === 0
                            ? !1
                            : ((this.values = new Uint32Array(S.length - m)),
                              this.values.set(S.subarray(0, c), 0),
                              this.values.set(S.subarray(c + m), c),
                              (this.prefixSum = new Uint32Array(
                                  this.values.length
                              )),
                              c - 1 < this.prefixSumValidIndex[0] &&
                                  (this.prefixSumValidIndex[0] = c - 1),
                              this.prefixSumValidIndex[0] >= 0 &&
                                  this.prefixSum.set(
                                      t.subarray(
                                          0,
                                          this.prefixSumValidIndex[0] + 1
                                      )
                                  ),
                              !0)
                    );
                }
                getTotalSum() {
                    return this.values.length === 0
                        ? 0
                        : this._getPrefixSum(this.values.length - 1);
                }
                getPrefixSum(c) {
                    return c < 0
                        ? 0
                        : ((c = (0, e.toUint32)(c)), this._getPrefixSum(c));
                }
                _getPrefixSum(c) {
                    if (c <= this.prefixSumValidIndex[0])
                        return this.prefixSum[c];
                    let m = this.prefixSumValidIndex[0] + 1;
                    m === 0 && ((this.prefixSum[0] = this.values[0]), m++),
                        c >= this.values.length && (c = this.values.length - 1);
                    for (let S = m; S <= c; S++)
                        this.prefixSum[S] =
                            this.prefixSum[S - 1] + this.values[S];
                    return (
                        (this.prefixSumValidIndex[0] = Math.max(
                            this.prefixSumValidIndex[0],
                            c
                        )),
                        this.prefixSum[c]
                    );
                }
                getIndexOf(c) {
                    (c = Math.floor(c)), this.getTotalSum();
                    let m = 0,
                        S = this.values.length - 1,
                        t = 0,
                        d = 0,
                        h = 0;
                    for (; m <= S; )
                        if (
                            ((t = (m + (S - m) / 2) | 0),
                            (d = this.prefixSum[t]),
                            (h = d - this.values[t]),
                            c < h)
                        )
                            S = t - 1;
                        else if (c >= d) m = t + 1;
                        else break;
                    return new w(t, c - h);
                }
            }
            r.PrefixSumComputer = N;
            class o {
                constructor(c) {
                    (this._values = c),
                        (this._isValid = !1),
                        (this._validEndIndex = -1),
                        (this._prefixSum = []),
                        (this._indexBySum = []);
                }
                getTotalSum() {
                    return this._ensureValid(), this._indexBySum.length;
                }
                getPrefixSum(c) {
                    return (
                        this._ensureValid(),
                        c === 0 ? 0 : this._prefixSum[c - 1]
                    );
                }
                getIndexOf(c) {
                    this._ensureValid();
                    const m = this._indexBySum[c],
                        S = m > 0 ? this._prefixSum[m - 1] : 0;
                    return new w(m, c - S);
                }
                removeValues(c, m) {
                    this._values.splice(c, m), this._invalidate(c);
                }
                insertValues(c, m) {
                    (this._values = (0, E.arrayInsert)(this._values, c, m)),
                        this._invalidate(c);
                }
                _invalidate(c) {
                    (this._isValid = !1),
                        (this._validEndIndex = Math.min(
                            this._validEndIndex,
                            c - 1
                        ));
                }
                _ensureValid() {
                    if (!this._isValid) {
                        for (
                            let c = this._validEndIndex + 1,
                                m = this._values.length;
                            c < m;
                            c++
                        ) {
                            const S = this._values[c],
                                t = c > 0 ? this._prefixSum[c - 1] : 0;
                            this._prefixSum[c] = t + S;
                            for (let d = 0; d < S; d++)
                                this._indexBySum[t + d] = c;
                        }
                        (this._prefixSum.length = this._values.length),
                            (this._indexBySum.length =
                                this._prefixSum[this._prefixSum.length - 1]),
                            (this._isValid = !0),
                            (this._validEndIndex = this._values.length - 1);
                    }
                }
                setValue(c, m) {
                    this._values[c] !== m &&
                        ((this._values[c] = m), this._invalidate(c));
                }
            }
            r.ConstantTimePrefixSumComputer = o;
            class w {
                constructor(c, m) {
                    (this.index = c),
                        (this.remainder = m),
                        (this._prefixSumIndexOfResultBrand = void 0),
                        (this.index = c),
                        (this.remainder = m);
                }
            }
            r.PrefixSumIndexOfResult = w;
        }),
        Y(Q[37], Z([0, 1, 2, 3, 36]), function (U, r, E, e, N) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.MirrorTextModel = void 0);
            class o {
                constructor(g, c, m, S) {
                    (this._uri = g),
                        (this._lines = c),
                        (this._eol = m),
                        (this._versionId = S),
                        (this._lineStarts = null),
                        (this._cachedTextValue = null);
                }
                dispose() {
                    this._lines.length = 0;
                }
                get version() {
                    return this._versionId;
                }
                getText() {
                    return (
                        this._cachedTextValue === null &&
                            (this._cachedTextValue = this._lines.join(
                                this._eol
                            )),
                        this._cachedTextValue
                    );
                }
                onEvents(g) {
                    g.eol &&
                        g.eol !== this._eol &&
                        ((this._eol = g.eol), (this._lineStarts = null));
                    const c = g.changes;
                    for (const m of c)
                        this._acceptDeleteRange(m.range),
                            this._acceptInsertText(
                                new e.Position(
                                    m.range.startLineNumber,
                                    m.range.startColumn
                                ),
                                m.text
                            );
                    (this._versionId = g.versionId),
                        (this._cachedTextValue = null);
                }
                _ensureLineStarts() {
                    if (!this._lineStarts) {
                        const g = this._eol.length,
                            c = this._lines.length,
                            m = new Uint32Array(c);
                        for (let S = 0; S < c; S++)
                            m[S] = this._lines[S].length + g;
                        this._lineStarts = new N.PrefixSumComputer(m);
                    }
                }
                _setLineText(g, c) {
                    (this._lines[g] = c),
                        this._lineStarts &&
                            this._lineStarts.setValue(
                                g,
                                this._lines[g].length + this._eol.length
                            );
                }
                _acceptDeleteRange(g) {
                    if (g.startLineNumber === g.endLineNumber) {
                        if (g.startColumn === g.endColumn) return;
                        this._setLineText(
                            g.startLineNumber - 1,
                            this._lines[g.startLineNumber - 1].substring(
                                0,
                                g.startColumn - 1
                            ) +
                                this._lines[g.startLineNumber - 1].substring(
                                    g.endColumn - 1
                                )
                        );
                        return;
                    }
                    this._setLineText(
                        g.startLineNumber - 1,
                        this._lines[g.startLineNumber - 1].substring(
                            0,
                            g.startColumn - 1
                        ) +
                            this._lines[g.endLineNumber - 1].substring(
                                g.endColumn - 1
                            )
                    ),
                        this._lines.splice(
                            g.startLineNumber,
                            g.endLineNumber - g.startLineNumber
                        ),
                        this._lineStarts &&
                            this._lineStarts.removeValues(
                                g.startLineNumber,
                                g.endLineNumber - g.startLineNumber
                            );
                }
                _acceptInsertText(g, c) {
                    if (c.length === 0) return;
                    const m = (0, E.splitLines)(c);
                    if (m.length === 1) {
                        this._setLineText(
                            g.lineNumber - 1,
                            this._lines[g.lineNumber - 1].substring(
                                0,
                                g.column - 1
                            ) +
                                m[0] +
                                this._lines[g.lineNumber - 1].substring(
                                    g.column - 1
                                )
                        );
                        return;
                    }
                    (m[m.length - 1] += this._lines[g.lineNumber - 1].substring(
                        g.column - 1
                    )),
                        this._setLineText(
                            g.lineNumber - 1,
                            this._lines[g.lineNumber - 1].substring(
                                0,
                                g.column - 1
                            ) + m[0]
                        );
                    const S = new Uint32Array(m.length - 1);
                    for (let t = 1; t < m.length; t++)
                        this._lines.splice(g.lineNumber + t - 1, 0, m[t]),
                            (S[t - 1] = m[t].length + this._eol.length);
                    this._lineStarts &&
                        this._lineStarts.insertValues(g.lineNumber, S);
                }
            }
            r.MirrorTextModel = o;
        }),
        Y(Q[38], Z([0, 1, 2, 31, 3, 4, 35]), function (U, r, E, e, N, o, w) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.Searcher =
                    r.isValidMatch =
                    r.TextModelSearch =
                    r.createFindMatch =
                    r.isMultilineRegexSource =
                    r.SearchParams =
                        void 0);
            const g = 999;
            class c {
                constructor(p, s, i, a) {
                    (this.searchString = p),
                        (this.isRegex = s),
                        (this.matchCase = i),
                        (this.wordSeparators = a);
                }
                parseSearchRequest() {
                    if (this.searchString === '') return null;
                    let p;
                    this.isRegex
                        ? (p = m(this.searchString))
                        : (p =
                              this.searchString.indexOf(`
`) >= 0);
                    let s = null;
                    try {
                        s = E.createRegExp(this.searchString, this.isRegex, {
                            matchCase: this.matchCase,
                            wholeWord: !1,
                            multiline: p,
                            global: !0,
                            unicode: !0,
                        });
                    } catch {
                        return null;
                    }
                    if (!s) return null;
                    let i = !this.isRegex && !p;
                    return (
                        i &&
                            this.searchString.toLowerCase() !==
                                this.searchString.toUpperCase() &&
                            (i = this.matchCase),
                        new w.SearchData(
                            s,
                            this.wordSeparators
                                ? (0, e.getMapForWordSeparators)(
                                      this.wordSeparators
                                  )
                                : null,
                            i ? this.searchString : null
                        )
                    );
                }
            }
            r.SearchParams = c;
            function m(y) {
                if (!y || y.length === 0) return !1;
                for (let p = 0, s = y.length; p < s; p++)
                    if (y.charCodeAt(p) === 92) {
                        if ((p++, p >= s)) break;
                        const a = y.charCodeAt(p);
                        if (a === 110 || a === 114 || a === 87) return !0;
                    }
                return !1;
            }
            r.isMultilineRegexSource = m;
            function S(y, p, s) {
                if (!s) return new w.FindMatch(y, null);
                const i = [];
                for (let a = 0, l = p.length; a < l; a++) i[a] = p[a];
                return new w.FindMatch(y, i);
            }
            r.createFindMatch = S;
            class t {
                constructor(p) {
                    const s = [];
                    let i = 0;
                    for (let a = 0, l = p.length; a < l; a++)
                        p.charCodeAt(a) === 10 && (s[i++] = a);
                    this._lineFeedsOffsets = s;
                }
                findLineFeedCountBeforeOffset(p) {
                    const s = this._lineFeedsOffsets;
                    let i = 0,
                        a = s.length - 1;
                    if (a === -1 || p <= s[0]) return 0;
                    for (; i < a; ) {
                        const l = i + (((a - i) / 2) >> 0);
                        s[l] >= p
                            ? (a = l - 1)
                            : s[l + 1] >= p
                            ? ((i = l), (a = l))
                            : (i = l + 1);
                    }
                    return i + 1;
                }
            }
            class d {
                static findMatches(p, s, i, a, l) {
                    const f = s.parseSearchRequest();
                    return f
                        ? f.regex.multiline
                            ? this._doFindMatchesMultiline(
                                  p,
                                  i,
                                  new C(f.wordSeparators, f.regex),
                                  a,
                                  l
                              )
                            : this._doFindMatchesLineByLine(p, i, f, a, l)
                        : [];
                }
                static _getMultilineMatchRange(p, s, i, a, l, f) {
                    let u,
                        _ = 0;
                    a
                        ? ((_ = a.findLineFeedCountBeforeOffset(l)),
                          (u = s + l + _))
                        : (u = s + l);
                    let b;
                    if (a) {
                        const k =
                            a.findLineFeedCountBeforeOffset(l + f.length) - _;
                        b = u + f.length + k;
                    } else b = u + f.length;
                    const A = p.getPositionAt(u),
                        P = p.getPositionAt(b);
                    return new o.Range(
                        A.lineNumber,
                        A.column,
                        P.lineNumber,
                        P.column
                    );
                }
                static _doFindMatchesMultiline(p, s, i, a, l) {
                    const f = p.getOffsetAt(s.getStartPosition()),
                        u = p.getValueInRange(s, 1),
                        _ =
                            p.getEOL() ===
                            `\r
`
                                ? new t(u)
                                : null,
                        b = [];
                    let A = 0,
                        P;
                    for (i.reset(0); (P = i.next(u)); )
                        if (
                            ((b[A++] = S(
                                this._getMultilineMatchRange(
                                    p,
                                    f,
                                    u,
                                    _,
                                    P.index,
                                    P[0]
                                ),
                                P,
                                a
                            )),
                            A >= l)
                        )
                            return b;
                    return b;
                }
                static _doFindMatchesLineByLine(p, s, i, a, l) {
                    const f = [];
                    let u = 0;
                    if (s.startLineNumber === s.endLineNumber) {
                        const b = p
                            .getLineContent(s.startLineNumber)
                            .substring(s.startColumn - 1, s.endColumn - 1);
                        return (
                            (u = this._findMatchesInLine(
                                i,
                                b,
                                s.startLineNumber,
                                s.startColumn - 1,
                                u,
                                f,
                                a,
                                l
                            )),
                            f
                        );
                    }
                    const _ = p
                        .getLineContent(s.startLineNumber)
                        .substring(s.startColumn - 1);
                    u = this._findMatchesInLine(
                        i,
                        _,
                        s.startLineNumber,
                        s.startColumn - 1,
                        u,
                        f,
                        a,
                        l
                    );
                    for (
                        let b = s.startLineNumber + 1;
                        b < s.endLineNumber && u < l;
                        b++
                    )
                        u = this._findMatchesInLine(
                            i,
                            p.getLineContent(b),
                            b,
                            0,
                            u,
                            f,
                            a,
                            l
                        );
                    if (u < l) {
                        const b = p
                            .getLineContent(s.endLineNumber)
                            .substring(0, s.endColumn - 1);
                        u = this._findMatchesInLine(
                            i,
                            b,
                            s.endLineNumber,
                            0,
                            u,
                            f,
                            a,
                            l
                        );
                    }
                    return f;
                }
                static _findMatchesInLine(p, s, i, a, l, f, u, _) {
                    const b = p.wordSeparators;
                    if (!u && p.simpleSearch) {
                        const D = p.simpleSearch,
                            k = D.length,
                            R = s.length;
                        let I = -k;
                        for (; (I = s.indexOf(D, I + k)) !== -1; )
                            if (
                                (!b || L(b, s, R, I, k)) &&
                                ((f[l++] = new w.FindMatch(
                                    new o.Range(i, I + 1 + a, i, I + 1 + k + a),
                                    null
                                )),
                                l >= _)
                            )
                                return l;
                        return l;
                    }
                    const A = new C(p.wordSeparators, p.regex);
                    let P;
                    A.reset(0);
                    do
                        if (
                            ((P = A.next(s)),
                            P &&
                                ((f[l++] = S(
                                    new o.Range(
                                        i,
                                        P.index + 1 + a,
                                        i,
                                        P.index + 1 + P[0].length + a
                                    ),
                                    P,
                                    u
                                )),
                                l >= _))
                        )
                            return l;
                    while (P);
                    return l;
                }
                static findNextMatch(p, s, i, a) {
                    const l = s.parseSearchRequest();
                    if (!l) return null;
                    const f = new C(l.wordSeparators, l.regex);
                    return l.regex.multiline
                        ? this._doFindNextMatchMultiline(p, i, f, a)
                        : this._doFindNextMatchLineByLine(p, i, f, a);
                }
                static _doFindNextMatchMultiline(p, s, i, a) {
                    const l = new N.Position(s.lineNumber, 1),
                        f = p.getOffsetAt(l),
                        u = p.getLineCount(),
                        _ = p.getValueInRange(
                            new o.Range(
                                l.lineNumber,
                                l.column,
                                u,
                                p.getLineMaxColumn(u)
                            ),
                            1
                        ),
                        b =
                            p.getEOL() ===
                            `\r
`
                                ? new t(_)
                                : null;
                    i.reset(s.column - 1);
                    let A = i.next(_);
                    return A
                        ? S(
                              this._getMultilineMatchRange(
                                  p,
                                  f,
                                  _,
                                  b,
                                  A.index,
                                  A[0]
                              ),
                              A,
                              a
                          )
                        : s.lineNumber !== 1 || s.column !== 1
                        ? this._doFindNextMatchMultiline(
                              p,
                              new N.Position(1, 1),
                              i,
                              a
                          )
                        : null;
                }
                static _doFindNextMatchLineByLine(p, s, i, a) {
                    const l = p.getLineCount(),
                        f = s.lineNumber,
                        u = p.getLineContent(f),
                        _ = this._findFirstMatchInLine(i, u, f, s.column, a);
                    if (_) return _;
                    for (let b = 1; b <= l; b++) {
                        const A = (f + b - 1) % l,
                            P = p.getLineContent(A + 1),
                            D = this._findFirstMatchInLine(i, P, A + 1, 1, a);
                        if (D) return D;
                    }
                    return null;
                }
                static _findFirstMatchInLine(p, s, i, a, l) {
                    p.reset(a - 1);
                    const f = p.next(s);
                    return f
                        ? S(
                              new o.Range(
                                  i,
                                  f.index + 1,
                                  i,
                                  f.index + 1 + f[0].length
                              ),
                              f,
                              l
                          )
                        : null;
                }
                static findPreviousMatch(p, s, i, a) {
                    const l = s.parseSearchRequest();
                    if (!l) return null;
                    const f = new C(l.wordSeparators, l.regex);
                    return l.regex.multiline
                        ? this._doFindPreviousMatchMultiline(p, i, f, a)
                        : this._doFindPreviousMatchLineByLine(p, i, f, a);
                }
                static _doFindPreviousMatchMultiline(p, s, i, a) {
                    const l = this._doFindMatchesMultiline(
                        p,
                        new o.Range(1, 1, s.lineNumber, s.column),
                        i,
                        a,
                        10 * g
                    );
                    if (l.length > 0) return l[l.length - 1];
                    const f = p.getLineCount();
                    return s.lineNumber !== f ||
                        s.column !== p.getLineMaxColumn(f)
                        ? this._doFindPreviousMatchMultiline(
                              p,
                              new N.Position(f, p.getLineMaxColumn(f)),
                              i,
                              a
                          )
                        : null;
                }
                static _doFindPreviousMatchLineByLine(p, s, i, a) {
                    const l = p.getLineCount(),
                        f = s.lineNumber,
                        u = p.getLineContent(f).substring(0, s.column - 1),
                        _ = this._findLastMatchInLine(i, u, f, a);
                    if (_) return _;
                    for (let b = 1; b <= l; b++) {
                        const A = (l + f - b - 1) % l,
                            P = p.getLineContent(A + 1),
                            D = this._findLastMatchInLine(i, P, A + 1, a);
                        if (D) return D;
                    }
                    return null;
                }
                static _findLastMatchInLine(p, s, i, a) {
                    let l = null,
                        f;
                    for (p.reset(0); (f = p.next(s)); )
                        l = S(
                            new o.Range(
                                i,
                                f.index + 1,
                                i,
                                f.index + 1 + f[0].length
                            ),
                            f,
                            a
                        );
                    return l;
                }
            }
            r.TextModelSearch = d;
            function h(y, p, s, i, a) {
                if (i === 0) return !0;
                const l = p.charCodeAt(i - 1);
                if (y.get(l) !== 0 || l === 13 || l === 10) return !0;
                if (a > 0) {
                    const f = p.charCodeAt(i);
                    if (y.get(f) !== 0) return !0;
                }
                return !1;
            }
            function v(y, p, s, i, a) {
                if (i + a === s) return !0;
                const l = p.charCodeAt(i + a);
                if (y.get(l) !== 0 || l === 13 || l === 10) return !0;
                if (a > 0) {
                    const f = p.charCodeAt(i + a - 1);
                    if (y.get(f) !== 0) return !0;
                }
                return !1;
            }
            function L(y, p, s, i, a) {
                return h(y, p, s, i, a) && v(y, p, s, i, a);
            }
            r.isValidMatch = L;
            class C {
                constructor(p, s) {
                    (this._wordSeparators = p),
                        (this._searchRegex = s),
                        (this._prevMatchStartIndex = -1),
                        (this._prevMatchLength = 0);
                }
                reset(p) {
                    (this._searchRegex.lastIndex = p),
                        (this._prevMatchStartIndex = -1),
                        (this._prevMatchLength = 0);
                }
                next(p) {
                    const s = p.length;
                    let i;
                    do {
                        if (
                            this._prevMatchStartIndex +
                                this._prevMatchLength ===
                                s ||
                            ((i = this._searchRegex.exec(p)), !i)
                        )
                            return null;
                        const a = i.index,
                            l = i[0].length;
                        if (
                            a === this._prevMatchStartIndex &&
                            l === this._prevMatchLength
                        ) {
                            if (l === 0) {
                                E.getNextCodePoint(
                                    p,
                                    s,
                                    this._searchRegex.lastIndex
                                ) > 65535
                                    ? (this._searchRegex.lastIndex += 2)
                                    : (this._searchRegex.lastIndex += 1);
                                continue;
                            }
                            return null;
                        }
                        if (
                            ((this._prevMatchStartIndex = a),
                            (this._prevMatchLength = l),
                            !this._wordSeparators ||
                                L(this._wordSeparators, p, s, a, l))
                        )
                            return i;
                    } while (i);
                    return null;
                }
            }
            r.Searcher = C;
        }),
        Y(Q[39], Z([0, 1, 4, 38, 2, 7, 15]), function (U, r, E, e, N, o, w) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.UnicodeTextModelHighlighter = void 0);
            class g {
                static computeUnicodeHighlights(d, h, v) {
                    const L = v ? v.startLineNumber : 1,
                        C = v ? v.endLineNumber : d.getLineCount(),
                        y = new m(h),
                        p = y.getCandidateCodePoints();
                    let s;
                    p === 'allNonBasicAscii'
                        ? (s = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g'))
                        : (s = new RegExp(`${c(Array.from(p))}`, 'g'));
                    const i = new e.Searcher(null, s),
                        a = [];
                    let l = !1,
                        f,
                        u = 0,
                        _ = 0,
                        b = 0;
                    e: for (let A = L, P = C; A <= P; A++) {
                        const D = d.getLineContent(A),
                            k = D.length;
                        i.reset(0);
                        do
                            if (((f = i.next(D)), f)) {
                                let R = f.index,
                                    I = f.index + f[0].length;
                                if (R > 0) {
                                    const K = D.charCodeAt(R - 1);
                                    N.isHighSurrogate(K) && R--;
                                }
                                if (I + 1 < k) {
                                    const K = D.charCodeAt(I - 1);
                                    N.isHighSurrogate(K) && I++;
                                }
                                const F = D.substring(R, I),
                                    O = (0, w.getWordAtText)(
                                        R + 1,
                                        w.DEFAULT_WORD_REGEXP,
                                        D,
                                        0
                                    ),
                                    V = y.shouldHighlightNonBasicASCII(
                                        F,
                                        O ? O.word : null
                                    );
                                if (V !== 0) {
                                    V === 3
                                        ? u++
                                        : V === 2
                                        ? _++
                                        : V === 1
                                        ? b++
                                        : (0, o.assertNever)(V);
                                    const K = 1e3;
                                    if (a.length >= K) {
                                        l = !0;
                                        break e;
                                    }
                                    a.push(new E.Range(A, R + 1, A, I + 1));
                                }
                            }
                        while (f);
                    }
                    return {
                        ranges: a,
                        hasMore: l,
                        ambiguousCharacterCount: u,
                        invisibleCharacterCount: _,
                        nonBasicAsciiCharacterCount: b,
                    };
                }
                static computeUnicodeHighlightReason(d, h) {
                    const v = new m(h);
                    switch (v.shouldHighlightNonBasicASCII(d, null)) {
                        case 0:
                            return null;
                        case 2:
                            return { kind: 1 };
                        case 3: {
                            const C = d.codePointAt(0),
                                y =
                                    v.ambiguousCharacters.getPrimaryConfusable(
                                        C
                                    ),
                                p = N.AmbiguousCharacters.getLocales().filter(
                                    (s) =>
                                        !N.AmbiguousCharacters.getInstance(
                                            new Set([...h.allowedLocales, s])
                                        ).isAmbiguous(C)
                                );
                            return {
                                kind: 0,
                                confusableWith: String.fromCodePoint(y),
                                notAmbiguousInLocales: p,
                            };
                        }
                        case 1:
                            return { kind: 2 };
                    }
                }
            }
            r.UnicodeTextModelHighlighter = g;
            function c(t, d) {
                return `[${N.escapeRegExpCharacters(
                    t.map((v) => String.fromCodePoint(v)).join('')
                )}]`;
            }
            class m {
                constructor(d) {
                    (this.options = d),
                        (this.allowedCodePoints = new Set(d.allowedCodePoints)),
                        (this.ambiguousCharacters =
                            N.AmbiguousCharacters.getInstance(
                                new Set(d.allowedLocales)
                            ));
                }
                getCandidateCodePoints() {
                    if (this.options.nonBasicASCII) return 'allNonBasicAscii';
                    const d = new Set();
                    if (this.options.invisibleCharacters)
                        for (const h of N.InvisibleCharacters.codePoints)
                            S(String.fromCodePoint(h)) || d.add(h);
                    if (this.options.ambiguousCharacters)
                        for (const h of this.ambiguousCharacters.getConfusableCodePoints())
                            d.add(h);
                    for (const h of this.allowedCodePoints) d.delete(h);
                    return d;
                }
                shouldHighlightNonBasicASCII(d, h) {
                    const v = d.codePointAt(0);
                    if (this.allowedCodePoints.has(v)) return 0;
                    if (this.options.nonBasicASCII) return 1;
                    let L = !1,
                        C = !1;
                    if (h)
                        for (let y of h) {
                            const p = y.codePointAt(0),
                                s = N.isBasicASCII(y);
                            (L = L || s),
                                !s &&
                                    !this.ambiguousCharacters.isAmbiguous(p) &&
                                    !N.InvisibleCharacters.isInvisibleCharacter(
                                        p
                                    ) &&
                                    (C = !0);
                        }
                    return !L && C
                        ? 0
                        : this.options.invisibleCharacters &&
                          !S(d) &&
                          N.InvisibleCharacters.isInvisibleCharacter(v)
                        ? 2
                        : this.options.ambiguousCharacters &&
                          this.ambiguousCharacters.isAmbiguous(v)
                        ? 3
                        : 0;
                }
            }
            function S(t) {
                return (
                    t === ' ' ||
                    t ===
                        `
` ||
                    t === '	'
                );
            }
        }),
        Y(Q[40], Z([0, 1]), function (U, r) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.WrappingIndent =
                    r.TrackedRangeStickiness =
                    r.TextEditorCursorStyle =
                    r.TextEditorCursorBlinkingStyle =
                    r.SymbolTag =
                    r.SymbolKind =
                    r.SignatureHelpTriggerKind =
                    r.SelectionDirection =
                    r.ScrollbarVisibility =
                    r.ScrollType =
                    r.RenderMinimap =
                    r.RenderLineNumbersType =
                    r.PositionAffinity =
                    r.OverviewRulerLane =
                    r.OverlayWidgetPositionPreference =
                    r.MouseTargetType =
                    r.MinimapPosition =
                    r.MarkerTag =
                    r.MarkerSeverity =
                    r.KeyCode =
                    r.InlineCompletionTriggerKind =
                    r.InlayHintKind =
                    r.InjectedTextCursorStops =
                    r.IndentAction =
                    r.EndOfLineSequence =
                    r.EndOfLinePreference =
                    r.EditorOption =
                    r.EditorAutoIndentStrategy =
                    r.DocumentHighlightKind =
                    r.DefaultEndOfLine =
                    r.CursorChangeReason =
                    r.ContentWidgetPositionPreference =
                    r.CompletionTriggerKind =
                    r.CompletionItemTag =
                    r.CompletionItemKind =
                    r.CompletionItemInsertTextRule =
                    r.AccessibilitySupport =
                        void 0);
            var E;
            (function (n) {
                (n[(n.Unknown = 0)] = 'Unknown'),
                    (n[(n.Disabled = 1)] = 'Disabled'),
                    (n[(n.Enabled = 2)] = 'Enabled');
            })((E = r.AccessibilitySupport || (r.AccessibilitySupport = {})));
            var e;
            (function (n) {
                (n[(n.KeepWhitespace = 1)] = 'KeepWhitespace'),
                    (n[(n.InsertAsSnippet = 4)] = 'InsertAsSnippet');
            })(
                (e =
                    r.CompletionItemInsertTextRule ||
                    (r.CompletionItemInsertTextRule = {}))
            );
            var N;
            (function (n) {
                (n[(n.Method = 0)] = 'Method'),
                    (n[(n.Function = 1)] = 'Function'),
                    (n[(n.Constructor = 2)] = 'Constructor'),
                    (n[(n.Field = 3)] = 'Field'),
                    (n[(n.Variable = 4)] = 'Variable'),
                    (n[(n.Class = 5)] = 'Class'),
                    (n[(n.Struct = 6)] = 'Struct'),
                    (n[(n.Interface = 7)] = 'Interface'),
                    (n[(n.Module = 8)] = 'Module'),
                    (n[(n.Property = 9)] = 'Property'),
                    (n[(n.Event = 10)] = 'Event'),
                    (n[(n.Operator = 11)] = 'Operator'),
                    (n[(n.Unit = 12)] = 'Unit'),
                    (n[(n.Value = 13)] = 'Value'),
                    (n[(n.Constant = 14)] = 'Constant'),
                    (n[(n.Enum = 15)] = 'Enum'),
                    (n[(n.EnumMember = 16)] = 'EnumMember'),
                    (n[(n.Keyword = 17)] = 'Keyword'),
                    (n[(n.Text = 18)] = 'Text'),
                    (n[(n.Color = 19)] = 'Color'),
                    (n[(n.File = 20)] = 'File'),
                    (n[(n.Reference = 21)] = 'Reference'),
                    (n[(n.Customcolor = 22)] = 'Customcolor'),
                    (n[(n.Folder = 23)] = 'Folder'),
                    (n[(n.TypeParameter = 24)] = 'TypeParameter'),
                    (n[(n.User = 25)] = 'User'),
                    (n[(n.Issue = 26)] = 'Issue'),
                    (n[(n.Snippet = 27)] = 'Snippet');
            })((N = r.CompletionItemKind || (r.CompletionItemKind = {})));
            var o;
            (function (n) {
                n[(n.Deprecated = 1)] = 'Deprecated';
            })((o = r.CompletionItemTag || (r.CompletionItemTag = {})));
            var w;
            (function (n) {
                (n[(n.Invoke = 0)] = 'Invoke'),
                    (n[(n.TriggerCharacter = 1)] = 'TriggerCharacter'),
                    (n[(n.TriggerForIncompleteCompletions = 2)] =
                        'TriggerForIncompleteCompletions');
            })((w = r.CompletionTriggerKind || (r.CompletionTriggerKind = {})));
            var g;
            (function (n) {
                (n[(n.EXACT = 0)] = 'EXACT'),
                    (n[(n.ABOVE = 1)] = 'ABOVE'),
                    (n[(n.BELOW = 2)] = 'BELOW');
            })(
                (g =
                    r.ContentWidgetPositionPreference ||
                    (r.ContentWidgetPositionPreference = {}))
            );
            var c;
            (function (n) {
                (n[(n.NotSet = 0)] = 'NotSet'),
                    (n[(n.ContentFlush = 1)] = 'ContentFlush'),
                    (n[(n.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
                    (n[(n.Explicit = 3)] = 'Explicit'),
                    (n[(n.Paste = 4)] = 'Paste'),
                    (n[(n.Undo = 5)] = 'Undo'),
                    (n[(n.Redo = 6)] = 'Redo');
            })((c = r.CursorChangeReason || (r.CursorChangeReason = {})));
            var m;
            (function (n) {
                (n[(n.LF = 1)] = 'LF'), (n[(n.CRLF = 2)] = 'CRLF');
            })((m = r.DefaultEndOfLine || (r.DefaultEndOfLine = {})));
            var S;
            (function (n) {
                (n[(n.Text = 0)] = 'Text'),
                    (n[(n.Read = 1)] = 'Read'),
                    (n[(n.Write = 2)] = 'Write');
            })((S = r.DocumentHighlightKind || (r.DocumentHighlightKind = {})));
            var t;
            (function (n) {
                (n[(n.None = 0)] = 'None'),
                    (n[(n.Keep = 1)] = 'Keep'),
                    (n[(n.Brackets = 2)] = 'Brackets'),
                    (n[(n.Advanced = 3)] = 'Advanced'),
                    (n[(n.Full = 4)] = 'Full');
            })(
                (t =
                    r.EditorAutoIndentStrategy ||
                    (r.EditorAutoIndentStrategy = {}))
            );
            var d;
            (function (n) {
                (n[(n.acceptSuggestionOnCommitCharacter = 0)] =
                    'acceptSuggestionOnCommitCharacter'),
                    (n[(n.acceptSuggestionOnEnter = 1)] =
                        'acceptSuggestionOnEnter'),
                    (n[(n.accessibilitySupport = 2)] = 'accessibilitySupport'),
                    (n[(n.accessibilityPageSize = 3)] =
                        'accessibilityPageSize'),
                    (n[(n.ariaLabel = 4)] = 'ariaLabel'),
                    (n[(n.autoClosingBrackets = 5)] = 'autoClosingBrackets'),
                    (n[(n.autoClosingDelete = 6)] = 'autoClosingDelete'),
                    (n[(n.autoClosingOvertype = 7)] = 'autoClosingOvertype'),
                    (n[(n.autoClosingQuotes = 8)] = 'autoClosingQuotes'),
                    (n[(n.autoIndent = 9)] = 'autoIndent'),
                    (n[(n.automaticLayout = 10)] = 'automaticLayout'),
                    (n[(n.autoSurround = 11)] = 'autoSurround'),
                    (n[(n.bracketPairColorization = 12)] =
                        'bracketPairColorization'),
                    (n[(n.guides = 13)] = 'guides'),
                    (n[(n.codeLens = 14)] = 'codeLens'),
                    (n[(n.codeLensFontFamily = 15)] = 'codeLensFontFamily'),
                    (n[(n.codeLensFontSize = 16)] = 'codeLensFontSize'),
                    (n[(n.colorDecorators = 17)] = 'colorDecorators'),
                    (n[(n.columnSelection = 18)] = 'columnSelection'),
                    (n[(n.comments = 19)] = 'comments'),
                    (n[(n.contextmenu = 20)] = 'contextmenu'),
                    (n[(n.copyWithSyntaxHighlighting = 21)] =
                        'copyWithSyntaxHighlighting'),
                    (n[(n.cursorBlinking = 22)] = 'cursorBlinking'),
                    (n[(n.cursorSmoothCaretAnimation = 23)] =
                        'cursorSmoothCaretAnimation'),
                    (n[(n.cursorStyle = 24)] = 'cursorStyle'),
                    (n[(n.cursorSurroundingLines = 25)] =
                        'cursorSurroundingLines'),
                    (n[(n.cursorSurroundingLinesStyle = 26)] =
                        'cursorSurroundingLinesStyle'),
                    (n[(n.cursorWidth = 27)] = 'cursorWidth'),
                    (n[(n.disableLayerHinting = 28)] = 'disableLayerHinting'),
                    (n[(n.disableMonospaceOptimizations = 29)] =
                        'disableMonospaceOptimizations'),
                    (n[(n.domReadOnly = 30)] = 'domReadOnly'),
                    (n[(n.dragAndDrop = 31)] = 'dragAndDrop'),
                    (n[(n.emptySelectionClipboard = 32)] =
                        'emptySelectionClipboard'),
                    (n[(n.extraEditorClassName = 33)] = 'extraEditorClassName'),
                    (n[(n.fastScrollSensitivity = 34)] =
                        'fastScrollSensitivity'),
                    (n[(n.find = 35)] = 'find'),
                    (n[(n.fixedOverflowWidgets = 36)] = 'fixedOverflowWidgets'),
                    (n[(n.folding = 37)] = 'folding'),
                    (n[(n.foldingStrategy = 38)] = 'foldingStrategy'),
                    (n[(n.foldingHighlight = 39)] = 'foldingHighlight'),
                    (n[(n.foldingImportsByDefault = 40)] =
                        'foldingImportsByDefault'),
                    (n[(n.foldingMaximumRegions = 41)] =
                        'foldingMaximumRegions'),
                    (n[(n.unfoldOnClickAfterEndOfLine = 42)] =
                        'unfoldOnClickAfterEndOfLine'),
                    (n[(n.fontFamily = 43)] = 'fontFamily'),
                    (n[(n.fontInfo = 44)] = 'fontInfo'),
                    (n[(n.fontLigatures = 45)] = 'fontLigatures'),
                    (n[(n.fontSize = 46)] = 'fontSize'),
                    (n[(n.fontWeight = 47)] = 'fontWeight'),
                    (n[(n.formatOnPaste = 48)] = 'formatOnPaste'),
                    (n[(n.formatOnType = 49)] = 'formatOnType'),
                    (n[(n.glyphMargin = 50)] = 'glyphMargin'),
                    (n[(n.gotoLocation = 51)] = 'gotoLocation'),
                    (n[(n.hideCursorInOverviewRuler = 52)] =
                        'hideCursorInOverviewRuler'),
                    (n[(n.hover = 53)] = 'hover'),
                    (n[(n.inDiffEditor = 54)] = 'inDiffEditor'),
                    (n[(n.inlineSuggest = 55)] = 'inlineSuggest'),
                    (n[(n.letterSpacing = 56)] = 'letterSpacing'),
                    (n[(n.lightbulb = 57)] = 'lightbulb'),
                    (n[(n.lineDecorationsWidth = 58)] = 'lineDecorationsWidth'),
                    (n[(n.lineHeight = 59)] = 'lineHeight'),
                    (n[(n.lineNumbers = 60)] = 'lineNumbers'),
                    (n[(n.lineNumbersMinChars = 61)] = 'lineNumbersMinChars'),
                    (n[(n.linkedEditing = 62)] = 'linkedEditing'),
                    (n[(n.links = 63)] = 'links'),
                    (n[(n.matchBrackets = 64)] = 'matchBrackets'),
                    (n[(n.minimap = 65)] = 'minimap'),
                    (n[(n.mouseStyle = 66)] = 'mouseStyle'),
                    (n[(n.mouseWheelScrollSensitivity = 67)] =
                        'mouseWheelScrollSensitivity'),
                    (n[(n.mouseWheelZoom = 68)] = 'mouseWheelZoom'),
                    (n[(n.multiCursorMergeOverlapping = 69)] =
                        'multiCursorMergeOverlapping'),
                    (n[(n.multiCursorModifier = 70)] = 'multiCursorModifier'),
                    (n[(n.multiCursorPaste = 71)] = 'multiCursorPaste'),
                    (n[(n.occurrencesHighlight = 72)] = 'occurrencesHighlight'),
                    (n[(n.overviewRulerBorder = 73)] = 'overviewRulerBorder'),
                    (n[(n.overviewRulerLanes = 74)] = 'overviewRulerLanes'),
                    (n[(n.padding = 75)] = 'padding'),
                    (n[(n.parameterHints = 76)] = 'parameterHints'),
                    (n[(n.peekWidgetDefaultFocus = 77)] =
                        'peekWidgetDefaultFocus'),
                    (n[(n.definitionLinkOpensInPeek = 78)] =
                        'definitionLinkOpensInPeek'),
                    (n[(n.quickSuggestions = 79)] = 'quickSuggestions'),
                    (n[(n.quickSuggestionsDelay = 80)] =
                        'quickSuggestionsDelay'),
                    (n[(n.readOnly = 81)] = 'readOnly'),
                    (n[(n.renameOnType = 82)] = 'renameOnType'),
                    (n[(n.renderControlCharacters = 83)] =
                        'renderControlCharacters'),
                    (n[(n.renderFinalNewline = 84)] = 'renderFinalNewline'),
                    (n[(n.renderLineHighlight = 85)] = 'renderLineHighlight'),
                    (n[(n.renderLineHighlightOnlyWhenFocus = 86)] =
                        'renderLineHighlightOnlyWhenFocus'),
                    (n[(n.renderValidationDecorations = 87)] =
                        'renderValidationDecorations'),
                    (n[(n.renderWhitespace = 88)] = 'renderWhitespace'),
                    (n[(n.revealHorizontalRightPadding = 89)] =
                        'revealHorizontalRightPadding'),
                    (n[(n.roundedSelection = 90)] = 'roundedSelection'),
                    (n[(n.rulers = 91)] = 'rulers'),
                    (n[(n.scrollbar = 92)] = 'scrollbar'),
                    (n[(n.scrollBeyondLastColumn = 93)] =
                        'scrollBeyondLastColumn'),
                    (n[(n.scrollBeyondLastLine = 94)] = 'scrollBeyondLastLine'),
                    (n[(n.scrollPredominantAxis = 95)] =
                        'scrollPredominantAxis'),
                    (n[(n.selectionClipboard = 96)] = 'selectionClipboard'),
                    (n[(n.selectionHighlight = 97)] = 'selectionHighlight'),
                    (n[(n.selectOnLineNumbers = 98)] = 'selectOnLineNumbers'),
                    (n[(n.showFoldingControls = 99)] = 'showFoldingControls'),
                    (n[(n.showUnused = 100)] = 'showUnused'),
                    (n[(n.snippetSuggestions = 101)] = 'snippetSuggestions'),
                    (n[(n.smartSelect = 102)] = 'smartSelect'),
                    (n[(n.smoothScrolling = 103)] = 'smoothScrolling'),
                    (n[(n.stickyTabStops = 104)] = 'stickyTabStops'),
                    (n[(n.stopRenderingLineAfter = 105)] =
                        'stopRenderingLineAfter'),
                    (n[(n.suggest = 106)] = 'suggest'),
                    (n[(n.suggestFontSize = 107)] = 'suggestFontSize'),
                    (n[(n.suggestLineHeight = 108)] = 'suggestLineHeight'),
                    (n[(n.suggestOnTriggerCharacters = 109)] =
                        'suggestOnTriggerCharacters'),
                    (n[(n.suggestSelection = 110)] = 'suggestSelection'),
                    (n[(n.tabCompletion = 111)] = 'tabCompletion'),
                    (n[(n.tabIndex = 112)] = 'tabIndex'),
                    (n[(n.unicodeHighlighting = 113)] = 'unicodeHighlighting'),
                    (n[(n.unusualLineTerminators = 114)] =
                        'unusualLineTerminators'),
                    (n[(n.useShadowDOM = 115)] = 'useShadowDOM'),
                    (n[(n.useTabStops = 116)] = 'useTabStops'),
                    (n[(n.wordSeparators = 117)] = 'wordSeparators'),
                    (n[(n.wordWrap = 118)] = 'wordWrap'),
                    (n[(n.wordWrapBreakAfterCharacters = 119)] =
                        'wordWrapBreakAfterCharacters'),
                    (n[(n.wordWrapBreakBeforeCharacters = 120)] =
                        'wordWrapBreakBeforeCharacters'),
                    (n[(n.wordWrapColumn = 121)] = 'wordWrapColumn'),
                    (n[(n.wordWrapOverride1 = 122)] = 'wordWrapOverride1'),
                    (n[(n.wordWrapOverride2 = 123)] = 'wordWrapOverride2'),
                    (n[(n.wrappingIndent = 124)] = 'wrappingIndent'),
                    (n[(n.wrappingStrategy = 125)] = 'wrappingStrategy'),
                    (n[(n.showDeprecated = 126)] = 'showDeprecated'),
                    (n[(n.inlayHints = 127)] = 'inlayHints'),
                    (n[(n.editorClassName = 128)] = 'editorClassName'),
                    (n[(n.pixelRatio = 129)] = 'pixelRatio'),
                    (n[(n.tabFocusMode = 130)] = 'tabFocusMode'),
                    (n[(n.layoutInfo = 131)] = 'layoutInfo'),
                    (n[(n.wrappingInfo = 132)] = 'wrappingInfo');
            })((d = r.EditorOption || (r.EditorOption = {})));
            var h;
            (function (n) {
                (n[(n.TextDefined = 0)] = 'TextDefined'),
                    (n[(n.LF = 1)] = 'LF'),
                    (n[(n.CRLF = 2)] = 'CRLF');
            })((h = r.EndOfLinePreference || (r.EndOfLinePreference = {})));
            var v;
            (function (n) {
                (n[(n.LF = 0)] = 'LF'), (n[(n.CRLF = 1)] = 'CRLF');
            })((v = r.EndOfLineSequence || (r.EndOfLineSequence = {})));
            var L;
            (function (n) {
                (n[(n.None = 0)] = 'None'),
                    (n[(n.Indent = 1)] = 'Indent'),
                    (n[(n.IndentOutdent = 2)] = 'IndentOutdent'),
                    (n[(n.Outdent = 3)] = 'Outdent');
            })((L = r.IndentAction || (r.IndentAction = {})));
            var C;
            (function (n) {
                (n[(n.Both = 0)] = 'Both'),
                    (n[(n.Right = 1)] = 'Right'),
                    (n[(n.Left = 2)] = 'Left'),
                    (n[(n.None = 3)] = 'None');
            })(
                (C =
                    r.InjectedTextCursorStops ||
                    (r.InjectedTextCursorStops = {}))
            );
            var y;
            (function (n) {
                (n[(n.Type = 1)] = 'Type'),
                    (n[(n.Parameter = 2)] = 'Parameter');
            })((y = r.InlayHintKind || (r.InlayHintKind = {})));
            var p;
            (function (n) {
                (n[(n.Automatic = 0)] = 'Automatic'),
                    (n[(n.Explicit = 1)] = 'Explicit');
            })(
                (p =
                    r.InlineCompletionTriggerKind ||
                    (r.InlineCompletionTriggerKind = {}))
            );
            var s;
            (function (n) {
                (n[(n.DependsOnKbLayout = -1)] = 'DependsOnKbLayout'),
                    (n[(n.Unknown = 0)] = 'Unknown'),
                    (n[(n.Backspace = 1)] = 'Backspace'),
                    (n[(n.Tab = 2)] = 'Tab'),
                    (n[(n.Enter = 3)] = 'Enter'),
                    (n[(n.Shift = 4)] = 'Shift'),
                    (n[(n.Ctrl = 5)] = 'Ctrl'),
                    (n[(n.Alt = 6)] = 'Alt'),
                    (n[(n.PauseBreak = 7)] = 'PauseBreak'),
                    (n[(n.CapsLock = 8)] = 'CapsLock'),
                    (n[(n.Escape = 9)] = 'Escape'),
                    (n[(n.Space = 10)] = 'Space'),
                    (n[(n.PageUp = 11)] = 'PageUp'),
                    (n[(n.PageDown = 12)] = 'PageDown'),
                    (n[(n.End = 13)] = 'End'),
                    (n[(n.Home = 14)] = 'Home'),
                    (n[(n.LeftArrow = 15)] = 'LeftArrow'),
                    (n[(n.UpArrow = 16)] = 'UpArrow'),
                    (n[(n.RightArrow = 17)] = 'RightArrow'),
                    (n[(n.DownArrow = 18)] = 'DownArrow'),
                    (n[(n.Insert = 19)] = 'Insert'),
                    (n[(n.Delete = 20)] = 'Delete'),
                    (n[(n.Digit0 = 21)] = 'Digit0'),
                    (n[(n.Digit1 = 22)] = 'Digit1'),
                    (n[(n.Digit2 = 23)] = 'Digit2'),
                    (n[(n.Digit3 = 24)] = 'Digit3'),
                    (n[(n.Digit4 = 25)] = 'Digit4'),
                    (n[(n.Digit5 = 26)] = 'Digit5'),
                    (n[(n.Digit6 = 27)] = 'Digit6'),
                    (n[(n.Digit7 = 28)] = 'Digit7'),
                    (n[(n.Digit8 = 29)] = 'Digit8'),
                    (n[(n.Digit9 = 30)] = 'Digit9'),
                    (n[(n.KeyA = 31)] = 'KeyA'),
                    (n[(n.KeyB = 32)] = 'KeyB'),
                    (n[(n.KeyC = 33)] = 'KeyC'),
                    (n[(n.KeyD = 34)] = 'KeyD'),
                    (n[(n.KeyE = 35)] = 'KeyE'),
                    (n[(n.KeyF = 36)] = 'KeyF'),
                    (n[(n.KeyG = 37)] = 'KeyG'),
                    (n[(n.KeyH = 38)] = 'KeyH'),
                    (n[(n.KeyI = 39)] = 'KeyI'),
                    (n[(n.KeyJ = 40)] = 'KeyJ'),
                    (n[(n.KeyK = 41)] = 'KeyK'),
                    (n[(n.KeyL = 42)] = 'KeyL'),
                    (n[(n.KeyM = 43)] = 'KeyM'),
                    (n[(n.KeyN = 44)] = 'KeyN'),
                    (n[(n.KeyO = 45)] = 'KeyO'),
                    (n[(n.KeyP = 46)] = 'KeyP'),
                    (n[(n.KeyQ = 47)] = 'KeyQ'),
                    (n[(n.KeyR = 48)] = 'KeyR'),
                    (n[(n.KeyS = 49)] = 'KeyS'),
                    (n[(n.KeyT = 50)] = 'KeyT'),
                    (n[(n.KeyU = 51)] = 'KeyU'),
                    (n[(n.KeyV = 52)] = 'KeyV'),
                    (n[(n.KeyW = 53)] = 'KeyW'),
                    (n[(n.KeyX = 54)] = 'KeyX'),
                    (n[(n.KeyY = 55)] = 'KeyY'),
                    (n[(n.KeyZ = 56)] = 'KeyZ'),
                    (n[(n.Meta = 57)] = 'Meta'),
                    (n[(n.ContextMenu = 58)] = 'ContextMenu'),
                    (n[(n.F1 = 59)] = 'F1'),
                    (n[(n.F2 = 60)] = 'F2'),
                    (n[(n.F3 = 61)] = 'F3'),
                    (n[(n.F4 = 62)] = 'F4'),
                    (n[(n.F5 = 63)] = 'F5'),
                    (n[(n.F6 = 64)] = 'F6'),
                    (n[(n.F7 = 65)] = 'F7'),
                    (n[(n.F8 = 66)] = 'F8'),
                    (n[(n.F9 = 67)] = 'F9'),
                    (n[(n.F10 = 68)] = 'F10'),
                    (n[(n.F11 = 69)] = 'F11'),
                    (n[(n.F12 = 70)] = 'F12'),
                    (n[(n.F13 = 71)] = 'F13'),
                    (n[(n.F14 = 72)] = 'F14'),
                    (n[(n.F15 = 73)] = 'F15'),
                    (n[(n.F16 = 74)] = 'F16'),
                    (n[(n.F17 = 75)] = 'F17'),
                    (n[(n.F18 = 76)] = 'F18'),
                    (n[(n.F19 = 77)] = 'F19'),
                    (n[(n.NumLock = 78)] = 'NumLock'),
                    (n[(n.ScrollLock = 79)] = 'ScrollLock'),
                    (n[(n.Semicolon = 80)] = 'Semicolon'),
                    (n[(n.Equal = 81)] = 'Equal'),
                    (n[(n.Comma = 82)] = 'Comma'),
                    (n[(n.Minus = 83)] = 'Minus'),
                    (n[(n.Period = 84)] = 'Period'),
                    (n[(n.Slash = 85)] = 'Slash'),
                    (n[(n.Backquote = 86)] = 'Backquote'),
                    (n[(n.BracketLeft = 87)] = 'BracketLeft'),
                    (n[(n.Backslash = 88)] = 'Backslash'),
                    (n[(n.BracketRight = 89)] = 'BracketRight'),
                    (n[(n.Quote = 90)] = 'Quote'),
                    (n[(n.OEM_8 = 91)] = 'OEM_8'),
                    (n[(n.IntlBackslash = 92)] = 'IntlBackslash'),
                    (n[(n.Numpad0 = 93)] = 'Numpad0'),
                    (n[(n.Numpad1 = 94)] = 'Numpad1'),
                    (n[(n.Numpad2 = 95)] = 'Numpad2'),
                    (n[(n.Numpad3 = 96)] = 'Numpad3'),
                    (n[(n.Numpad4 = 97)] = 'Numpad4'),
                    (n[(n.Numpad5 = 98)] = 'Numpad5'),
                    (n[(n.Numpad6 = 99)] = 'Numpad6'),
                    (n[(n.Numpad7 = 100)] = 'Numpad7'),
                    (n[(n.Numpad8 = 101)] = 'Numpad8'),
                    (n[(n.Numpad9 = 102)] = 'Numpad9'),
                    (n[(n.NumpadMultiply = 103)] = 'NumpadMultiply'),
                    (n[(n.NumpadAdd = 104)] = 'NumpadAdd'),
                    (n[(n.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
                    (n[(n.NumpadSubtract = 106)] = 'NumpadSubtract'),
                    (n[(n.NumpadDecimal = 107)] = 'NumpadDecimal'),
                    (n[(n.NumpadDivide = 108)] = 'NumpadDivide'),
                    (n[(n.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
                    (n[(n.ABNT_C1 = 110)] = 'ABNT_C1'),
                    (n[(n.ABNT_C2 = 111)] = 'ABNT_C2'),
                    (n[(n.AudioVolumeMute = 112)] = 'AudioVolumeMute'),
                    (n[(n.AudioVolumeUp = 113)] = 'AudioVolumeUp'),
                    (n[(n.AudioVolumeDown = 114)] = 'AudioVolumeDown'),
                    (n[(n.BrowserSearch = 115)] = 'BrowserSearch'),
                    (n[(n.BrowserHome = 116)] = 'BrowserHome'),
                    (n[(n.BrowserBack = 117)] = 'BrowserBack'),
                    (n[(n.BrowserForward = 118)] = 'BrowserForward'),
                    (n[(n.MediaTrackNext = 119)] = 'MediaTrackNext'),
                    (n[(n.MediaTrackPrevious = 120)] = 'MediaTrackPrevious'),
                    (n[(n.MediaStop = 121)] = 'MediaStop'),
                    (n[(n.MediaPlayPause = 122)] = 'MediaPlayPause'),
                    (n[(n.LaunchMediaPlayer = 123)] = 'LaunchMediaPlayer'),
                    (n[(n.LaunchMail = 124)] = 'LaunchMail'),
                    (n[(n.LaunchApp2 = 125)] = 'LaunchApp2'),
                    (n[(n.Clear = 126)] = 'Clear'),
                    (n[(n.MAX_VALUE = 127)] = 'MAX_VALUE');
            })((s = r.KeyCode || (r.KeyCode = {})));
            var i;
            (function (n) {
                (n[(n.Hint = 1)] = 'Hint'),
                    (n[(n.Info = 2)] = 'Info'),
                    (n[(n.Warning = 4)] = 'Warning'),
                    (n[(n.Error = 8)] = 'Error');
            })((i = r.MarkerSeverity || (r.MarkerSeverity = {})));
            var a;
            (function (n) {
                (n[(n.Unnecessary = 1)] = 'Unnecessary'),
                    (n[(n.Deprecated = 2)] = 'Deprecated');
            })((a = r.MarkerTag || (r.MarkerTag = {})));
            var l;
            (function (n) {
                (n[(n.Inline = 1)] = 'Inline'), (n[(n.Gutter = 2)] = 'Gutter');
            })((l = r.MinimapPosition || (r.MinimapPosition = {})));
            var f;
            (function (n) {
                (n[(n.UNKNOWN = 0)] = 'UNKNOWN'),
                    (n[(n.TEXTAREA = 1)] = 'TEXTAREA'),
                    (n[(n.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
                    (n[(n.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
                    (n[(n.GUTTER_LINE_DECORATIONS = 4)] =
                        'GUTTER_LINE_DECORATIONS'),
                    (n[(n.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
                    (n[(n.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
                    (n[(n.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
                    (n[(n.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
                    (n[(n.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
                    (n[(n.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
                    (n[(n.SCROLLBAR = 11)] = 'SCROLLBAR'),
                    (n[(n.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
                    (n[(n.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR');
            })((f = r.MouseTargetType || (r.MouseTargetType = {})));
            var u;
            (function (n) {
                (n[(n.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
                    (n[(n.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
                    (n[(n.TOP_CENTER = 2)] = 'TOP_CENTER');
            })(
                (u =
                    r.OverlayWidgetPositionPreference ||
                    (r.OverlayWidgetPositionPreference = {}))
            );
            var _;
            (function (n) {
                (n[(n.Left = 1)] = 'Left'),
                    (n[(n.Center = 2)] = 'Center'),
                    (n[(n.Right = 4)] = 'Right'),
                    (n[(n.Full = 7)] = 'Full');
            })((_ = r.OverviewRulerLane || (r.OverviewRulerLane = {})));
            var b;
            (function (n) {
                (n[(n.Left = 0)] = 'Left'),
                    (n[(n.Right = 1)] = 'Right'),
                    (n[(n.None = 2)] = 'None');
            })((b = r.PositionAffinity || (r.PositionAffinity = {})));
            var A;
            (function (n) {
                (n[(n.Off = 0)] = 'Off'),
                    (n[(n.On = 1)] = 'On'),
                    (n[(n.Relative = 2)] = 'Relative'),
                    (n[(n.Interval = 3)] = 'Interval'),
                    (n[(n.Custom = 4)] = 'Custom');
            })((A = r.RenderLineNumbersType || (r.RenderLineNumbersType = {})));
            var P;
            (function (n) {
                (n[(n.None = 0)] = 'None'),
                    (n[(n.Text = 1)] = 'Text'),
                    (n[(n.Blocks = 2)] = 'Blocks');
            })((P = r.RenderMinimap || (r.RenderMinimap = {})));
            var D;
            (function (n) {
                (n[(n.Smooth = 0)] = 'Smooth'),
                    (n[(n.Immediate = 1)] = 'Immediate');
            })((D = r.ScrollType || (r.ScrollType = {})));
            var k;
            (function (n) {
                (n[(n.Auto = 1)] = 'Auto'),
                    (n[(n.Hidden = 2)] = 'Hidden'),
                    (n[(n.Visible = 3)] = 'Visible');
            })((k = r.ScrollbarVisibility || (r.ScrollbarVisibility = {})));
            var R;
            (function (n) {
                (n[(n.LTR = 0)] = 'LTR'), (n[(n.RTL = 1)] = 'RTL');
            })((R = r.SelectionDirection || (r.SelectionDirection = {})));
            var I;
            (function (n) {
                (n[(n.Invoke = 1)] = 'Invoke'),
                    (n[(n.TriggerCharacter = 2)] = 'TriggerCharacter'),
                    (n[(n.ContentChange = 3)] = 'ContentChange');
            })(
                (I =
                    r.SignatureHelpTriggerKind ||
                    (r.SignatureHelpTriggerKind = {}))
            );
            var F;
            (function (n) {
                (n[(n.File = 0)] = 'File'),
                    (n[(n.Module = 1)] = 'Module'),
                    (n[(n.Namespace = 2)] = 'Namespace'),
                    (n[(n.Package = 3)] = 'Package'),
                    (n[(n.Class = 4)] = 'Class'),
                    (n[(n.Method = 5)] = 'Method'),
                    (n[(n.Property = 6)] = 'Property'),
                    (n[(n.Field = 7)] = 'Field'),
                    (n[(n.Constructor = 8)] = 'Constructor'),
                    (n[(n.Enum = 9)] = 'Enum'),
                    (n[(n.Interface = 10)] = 'Interface'),
                    (n[(n.Function = 11)] = 'Function'),
                    (n[(n.Variable = 12)] = 'Variable'),
                    (n[(n.Constant = 13)] = 'Constant'),
                    (n[(n.String = 14)] = 'String'),
                    (n[(n.Number = 15)] = 'Number'),
                    (n[(n.Boolean = 16)] = 'Boolean'),
                    (n[(n.Array = 17)] = 'Array'),
                    (n[(n.Object = 18)] = 'Object'),
                    (n[(n.Key = 19)] = 'Key'),
                    (n[(n.Null = 20)] = 'Null'),
                    (n[(n.EnumMember = 21)] = 'EnumMember'),
                    (n[(n.Struct = 22)] = 'Struct'),
                    (n[(n.Event = 23)] = 'Event'),
                    (n[(n.Operator = 24)] = 'Operator'),
                    (n[(n.TypeParameter = 25)] = 'TypeParameter');
            })((F = r.SymbolKind || (r.SymbolKind = {})));
            var O;
            (function (n) {
                n[(n.Deprecated = 1)] = 'Deprecated';
            })((O = r.SymbolTag || (r.SymbolTag = {})));
            var V;
            (function (n) {
                (n[(n.Hidden = 0)] = 'Hidden'),
                    (n[(n.Blink = 1)] = 'Blink'),
                    (n[(n.Smooth = 2)] = 'Smooth'),
                    (n[(n.Phase = 3)] = 'Phase'),
                    (n[(n.Expand = 4)] = 'Expand'),
                    (n[(n.Solid = 5)] = 'Solid');
            })(
                (V =
                    r.TextEditorCursorBlinkingStyle ||
                    (r.TextEditorCursorBlinkingStyle = {}))
            );
            var K;
            (function (n) {
                (n[(n.Line = 1)] = 'Line'),
                    (n[(n.Block = 2)] = 'Block'),
                    (n[(n.Underline = 3)] = 'Underline'),
                    (n[(n.LineThin = 4)] = 'LineThin'),
                    (n[(n.BlockOutline = 5)] = 'BlockOutline'),
                    (n[(n.UnderlineThin = 6)] = 'UnderlineThin');
            })((K = r.TextEditorCursorStyle || (r.TextEditorCursorStyle = {})));
            var $;
            (function (n) {
                (n[(n.AlwaysGrowsWhenTypingAtEdges = 0)] =
                    'AlwaysGrowsWhenTypingAtEdges'),
                    (n[(n.NeverGrowsWhenTypingAtEdges = 1)] =
                        'NeverGrowsWhenTypingAtEdges'),
                    (n[(n.GrowsOnlyWhenTypingBefore = 2)] =
                        'GrowsOnlyWhenTypingBefore'),
                    (n[(n.GrowsOnlyWhenTypingAfter = 3)] =
                        'GrowsOnlyWhenTypingAfter');
            })(
                ($ =
                    r.TrackedRangeStickiness || (r.TrackedRangeStickiness = {}))
            );
            var z;
            (function (n) {
                (n[(n.None = 0)] = 'None'),
                    (n[(n.Same = 1)] = 'Same'),
                    (n[(n.Indent = 2)] = 'Indent'),
                    (n[(n.DeepIndent = 3)] = 'DeepIndent');
            })((z = r.WrappingIndent || (r.WrappingIndent = {})));
        });
    var oe =
        (this && this.__awaiter) ||
        function (U, r, E, e) {
            function N(o) {
                return o instanceof E
                    ? o
                    : new E(function (w) {
                          w(o);
                      });
            }
            return new (E || (E = Promise))(function (o, w) {
                function g(S) {
                    try {
                        m(e.next(S));
                    } catch (t) {
                        w(t);
                    }
                }
                function c(S) {
                    try {
                        m(e.throw(S));
                    } catch (t) {
                        w(t);
                    }
                }
                function m(S) {
                    S.done ? o(S.value) : N(S.value).then(g, c);
                }
                m((e = e.apply(U, r || [])).next());
            });
        };
    Y(Q[41], Z([0, 1, 6, 8]), function (U, r, E, e) {
        'use strict';
        Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.TokenizationRegistry = void 0);
        class N {
            constructor() {
                (this._map = new Map()),
                    (this._factories = new Map()),
                    (this._onDidChange = new E.Emitter()),
                    (this.onDidChange = this._onDidChange.event),
                    (this._colorMap = null);
            }
            fire(g) {
                this._onDidChange.fire({
                    changedLanguages: g,
                    changedColorMap: !1,
                });
            }
            register(g, c) {
                return (
                    this._map.set(g, c),
                    this.fire([g]),
                    (0, e.toDisposable)(() => {
                        this._map.get(g) === c &&
                            (this._map.delete(g), this.fire([g]));
                    })
                );
            }
            registerFactory(g, c) {
                var m;
                (m = this._factories.get(g)) === null ||
                    m === void 0 ||
                    m.dispose();
                const S = new o(this, g, c);
                return (
                    this._factories.set(g, S),
                    (0, e.toDisposable)(() => {
                        const t = this._factories.get(g);
                        !t ||
                            t !== S ||
                            (this._factories.delete(g), t.dispose());
                    })
                );
            }
            getOrCreate(g) {
                return oe(this, void 0, void 0, function* () {
                    const c = this.get(g);
                    if (c) return c;
                    const m = this._factories.get(g);
                    return !m || m.isResolved
                        ? null
                        : (yield m.resolve(), this.get(g));
                });
            }
            get(g) {
                return this._map.get(g) || null;
            }
            isResolved(g) {
                if (this.get(g)) return !0;
                const m = this._factories.get(g);
                return !!(!m || m.isResolved);
            }
            setColorMap(g) {
                (this._colorMap = g),
                    this._onDidChange.fire({
                        changedLanguages: Array.from(this._map.keys()),
                        changedColorMap: !0,
                    });
            }
            getColorMap() {
                return this._colorMap;
            }
            getDefaultBackground() {
                return this._colorMap && this._colorMap.length > 2
                    ? this._colorMap[2]
                    : null;
            }
        }
        r.TokenizationRegistry = N;
        class o extends e.Disposable {
            constructor(g, c, m) {
                super();
                (this._registry = g),
                    (this._languageId = c),
                    (this._factory = m),
                    (this._isDisposed = !1),
                    (this._resolvePromise = null),
                    (this._isResolved = !1);
            }
            get isResolved() {
                return this._isResolved;
            }
            dispose() {
                (this._isDisposed = !0), super.dispose();
            }
            resolve() {
                return oe(this, void 0, void 0, function* () {
                    return (
                        this._resolvePromise ||
                            (this._resolvePromise = this._create()),
                        this._resolvePromise
                    );
                });
            }
            _create() {
                return oe(this, void 0, void 0, function* () {
                    const g = yield Promise.resolve(
                        this._factory.createTokenizationSupport()
                    );
                    (this._isResolved = !0),
                        g &&
                            !this._isDisposed &&
                            this._register(
                                this._registry.register(this._languageId, g)
                            );
                });
            }
        }
    }),
        Y(Q[42], Z([0, 1, 9, 4, 41, 18]), function (U, r, E, e, N, o) {
            'use strict';
            Object.defineProperty(r, '__esModule', { value: !0 }),
                (r.TokenizationRegistry =
                    r.InlayHintKind =
                    r.Command =
                    r.FoldingRangeKind =
                    r.SymbolKinds =
                    r.isLocationLink =
                    r.DocumentHighlightKind =
                    r.SignatureHelpTriggerKind =
                    r.InlineCompletionTriggerKind =
                    r.CompletionItemKinds =
                    r.EncodedTokenizationResult =
                    r.TokenizationResult =
                    r.Token =
                    r.TokenMetadata =
                        void 0);
            class w {
                static getLanguageId(i) {
                    return (i & 255) >>> 0;
                }
                static getTokenType(i) {
                    return (i & 768) >>> 8;
                }
                static getFontStyle(i) {
                    return (i & 15360) >>> 10;
                }
                static getForeground(i) {
                    return (i & 8372224) >>> 14;
                }
                static getBackground(i) {
                    return (i & 4286578688) >>> 23;
                }
                static getClassNameFromMetadata(i) {
                    const a = this.getForeground(i);
                    let l = 'mtk' + a;
                    const f = this.getFontStyle(i);
                    return (
                        f & 1 && (l += ' mtki'),
                        f & 2 && (l += ' mtkb'),
                        f & 4 && (l += ' mtku'),
                        f & 8 && (l += ' mtks'),
                        l
                    );
                }
                static getInlineStyleFromMetadata(i, a) {
                    const l = this.getForeground(i),
                        f = this.getFontStyle(i);
                    let u = `color: ${a[l]};`;
                    f & 1 && (u += 'font-style: italic;'),
                        f & 2 && (u += 'font-weight: bold;');
                    let _ = '';
                    return (
                        f & 4 && (_ += ' underline'),
                        f & 8 && (_ += ' line-through'),
                        _ && (u += `text-decoration:${_};`),
                        u
                    );
                }
                static getPresentationFromMetadata(i) {
                    const a = this.getForeground(i),
                        l = this.getFontStyle(i);
                    return {
                        foreground: a,
                        italic: Boolean(l & 1),
                        bold: Boolean(l & 2),
                        underline: Boolean(l & 4),
                        strikethrough: Boolean(l & 8),
                    };
                }
            }
            r.TokenMetadata = w;
            class g {
                constructor(i, a, l) {
                    (this._tokenBrand = void 0),
                        (this.offset = i),
                        (this.type = a),
                        (this.language = l);
                }
                toString() {
                    return '(' + this.offset + ', ' + this.type + ')';
                }
            }
            r.Token = g;
            class c {
                constructor(i, a) {
                    (this._tokenizationResultBrand = void 0),
                        (this.tokens = i),
                        (this.endState = a);
                }
            }
            r.TokenizationResult = c;
            class m {
                constructor(i, a) {
                    (this._encodedTokenizationResultBrand = void 0),
                        (this.tokens = i),
                        (this.endState = a);
                }
            }
            r.EncodedTokenizationResult = m;
            var S;
            (function (s) {
                const i = new Map();
                i.set(0, o.Codicon.symbolMethod),
                    i.set(1, o.Codicon.symbolFunction),
                    i.set(2, o.Codicon.symbolConstructor),
                    i.set(3, o.Codicon.symbolField),
                    i.set(4, o.Codicon.symbolVariable),
                    i.set(5, o.Codicon.symbolClass),
                    i.set(6, o.Codicon.symbolStruct),
                    i.set(7, o.Codicon.symbolInterface),
                    i.set(8, o.Codicon.symbolModule),
                    i.set(9, o.Codicon.symbolProperty),
                    i.set(10, o.Codicon.symbolEvent),
                    i.set(11, o.Codicon.symbolOperator),
                    i.set(12, o.Codicon.symbolUnit),
                    i.set(13, o.Codicon.symbolValue),
                    i.set(15, o.Codicon.symbolEnum),
                    i.set(14, o.Codicon.symbolConstant),
                    i.set(15, o.Codicon.symbolEnum),
                    i.set(16, o.Codicon.symbolEnumMember),
                    i.set(17, o.Codicon.symbolKeyword),
                    i.set(27, o.Codicon.symbolSnippet),
                    i.set(18, o.Codicon.symbolText),
                    i.set(19, o.Codicon.symbolColor),
                    i.set(20, o.Codicon.symbolFile),
                    i.set(21, o.Codicon.symbolReference),
                    i.set(22, o.Codicon.symbolCustomColor),
                    i.set(23, o.Codicon.symbolFolder),
                    i.set(24, o.Codicon.symbolTypeParameter),
                    i.set(25, o.Codicon.account),
                    i.set(26, o.Codicon.issues);
                function a(u) {
                    let _ = i.get(u);
                    return (
                        _ ||
                            (console.info(
                                'No codicon found for CompletionItemKind ' + u
                            ),
                            (_ = o.Codicon.symbolProperty)),
                        _
                    );
                }
                s.toIcon = a;
                const l = new Map();
                l.set('method', 0),
                    l.set('function', 1),
                    l.set('constructor', 2),
                    l.set('field', 3),
                    l.set('variable', 4),
                    l.set('class', 5),
                    l.set('struct', 6),
                    l.set('interface', 7),
                    l.set('module', 8),
                    l.set('property', 9),
                    l.set('event', 10),
                    l.set('operator', 11),
                    l.set('unit', 12),
                    l.set('value', 13),
                    l.set('constant', 14),
                    l.set('enum', 15),
                    l.set('enum-member', 16),
                    l.set('enumMember', 16),
                    l.set('keyword', 17),
                    l.set('snippet', 27),
                    l.set('text', 18),
                    l.set('color', 19),
                    l.set('file', 20),
                    l.set('reference', 21),
                    l.set('customcolor', 22),
                    l.set('folder', 23),
                    l.set('type-parameter', 24),
                    l.set('typeParameter', 24),
                    l.set('account', 25),
                    l.set('issue', 26);
                function f(u, _) {
                    let b = l.get(u);
                    return typeof b == 'undefined' && !_ && (b = 9), b;
                }
                s.fromString = f;
            })((S = r.CompletionItemKinds || (r.CompletionItemKinds = {})));
            var t;
            (function (s) {
                (s[(s.Automatic = 0)] = 'Automatic'),
                    (s[(s.Explicit = 1)] = 'Explicit');
            })(
                (t =
                    r.InlineCompletionTriggerKind ||
                    (r.InlineCompletionTriggerKind = {}))
            );
            var d;
            (function (s) {
                (s[(s.Invoke = 1)] = 'Invoke'),
                    (s[(s.TriggerCharacter = 2)] = 'TriggerCharacter'),
                    (s[(s.ContentChange = 3)] = 'ContentChange');
            })(
                (d =
                    r.SignatureHelpTriggerKind ||
                    (r.SignatureHelpTriggerKind = {}))
            );
            var h;
            (function (s) {
                (s[(s.Text = 0)] = 'Text'),
                    (s[(s.Read = 1)] = 'Read'),
                    (s[(s.Write = 2)] = 'Write');
            })((h = r.DocumentHighlightKind || (r.DocumentHighlightKind = {})));
            function v(s) {
                return (
                    s &&
                    E.URI.isUri(s.uri) &&
                    e.Range.isIRange(s.range) &&
                    (e.Range.isIRange(s.originSelectionRange) ||
                        e.Range.isIRange(s.targetSelectionRange))
                );
            }
            r.isLocationLink = v;
            var L;
            (function (s) {
                const i = new Map();
                i.set(0, o.Codicon.symbolFile),
                    i.set(1, o.Codicon.symbolModule),
                    i.set(2, o.Codicon.symbolNamespace),
                    i.set(3, o.Codicon.symbolPackage),
                    i.set(4, o.Codicon.symbolClass),
                    i.set(5, o.Codicon.symbolMethod),
                    i.set(6, o.Codicon.symbolProperty),
                    i.set(7, o.Codicon.symbolField),
                    i.set(8, o.Codicon.symbolConstructor),
                    i.set(9, o.Codicon.symbolEnum),
                    i.set(10, o.Codicon.symbolInterface),
                    i.set(11, o.Codicon.symbolFunction),
                    i.set(12, o.Codicon.symbolVariable),
                    i.set(13, o.Codicon.symbolConstant),
                    i.set(14, o.Codicon.symbolString),
                    i.set(15, o.Codicon.symbolNumber),
                    i.set(16, o.Codicon.symbolBoolean),
                    i.set(17, o.Codicon.symbolArray),
                    i.set(18, o.Codicon.symbolObject),
                    i.set(19, o.Codicon.symbolKey),
                    i.set(20, o.Codicon.symbolNull),
                    i.set(21, o.Codicon.symbolEnumMember),
                    i.set(22, o.Codicon.symbolStruct),
                    i.set(23, o.Codicon.symbolEvent),
                    i.set(24, o.Codicon.symbolOperator),
                    i.set(25, o.Codicon.symbolTypeParameter);
                function a(l) {
                    let f = i.get(l);
                    return (
                        f ||
                            (console.info(
                                'No codicon found for SymbolKind ' + l
                            ),
                            (f = o.Codicon.symbolProperty)),
                        f
                    );
                }
                s.toIcon = a;
            })((L = r.SymbolKinds || (r.SymbolKinds = {})));
            class C {
                constructor(i) {
                    this.value = i;
                }
            }
            (r.FoldingRangeKind = C),
                (C.Comment = new C('comment')),
                (C.Imports = new C('imports')),
                (C.Region = new C('region'));
            var y;
            (function (s) {
                function i(a) {
                    return !a || typeof a != 'object'
                        ? !1
                        : typeof a.id == 'string' && typeof a.title == 'string';
                }
                s.is = i;
            })((y = r.Command || (r.Command = {})));
            var p;
            (function (s) {
                (s[(s.Type = 1)] = 'Type'),
                    (s[(s.Parameter = 2)] = 'Parameter');
            })((p = r.InlayHintKind || (r.InlayHintKind = {}))),
                (r.TokenizationRegistry = new N.TokenizationRegistry());
        }),
        Y(
            Q[43],
            Z([0, 1, 27, 6, 22, 9, 3, 4, 30, 42, 40]),
            function (U, r, E, e, N, o, w, g, c, m, S) {
                'use strict';
                Object.defineProperty(r, '__esModule', { value: !0 }),
                    (r.createMonacoBaseAPI = r.KeyMod = void 0);
                class t {
                    static chord(v, L) {
                        return (0, N.KeyChord)(v, L);
                    }
                }
                (r.KeyMod = t),
                    (t.CtrlCmd = 2048),
                    (t.Shift = 1024),
                    (t.Alt = 512),
                    (t.WinCtrl = 256);
                function d() {
                    return {
                        editor: void 0,
                        languages: void 0,
                        CancellationTokenSource: E.CancellationTokenSource,
                        Emitter: e.Emitter,
                        KeyCode: S.KeyCode,
                        KeyMod: t,
                        Position: w.Position,
                        Range: g.Range,
                        Selection: c.Selection,
                        SelectionDirection: S.SelectionDirection,
                        MarkerSeverity: S.MarkerSeverity,
                        MarkerTag: S.MarkerTag,
                        Uri: o.URI,
                        Token: m.Token,
                    };
                }
                r.createMonacoBaseAPI = d;
            }
        ),
        Y(
            Q[45],
            Z([0, 1, 12, 5, 9, 3, 4, 32, 37, 15, 33, 34, 43, 7, 11, 39]),
            function (U, r, E, e, N, o, w, g, c, m, S, t, d, h, v, L) {
                'use strict';
                Object.defineProperty(r, '__esModule', { value: !0 }),
                    (r.create = r.EditorSimpleWorker = r.MirrorModel = void 0);
                class C extends c.MirrorTextModel {
                    get uri() {
                        return this._uri;
                    }
                    get eol() {
                        return this._eol;
                    }
                    getValue() {
                        return this.getText();
                    }
                    getLinesContent() {
                        return this._lines.slice(0);
                    }
                    getLineCount() {
                        return this._lines.length;
                    }
                    getLineContent(i) {
                        return this._lines[i - 1];
                    }
                    getWordAtPosition(i, a) {
                        const l = (0, m.getWordAtText)(
                            i.column,
                            (0, m.ensureValidWordDefinition)(a),
                            this._lines[i.lineNumber - 1],
                            0
                        );
                        return l
                            ? new w.Range(
                                  i.lineNumber,
                                  l.startColumn,
                                  i.lineNumber,
                                  l.endColumn
                              )
                            : null;
                    }
                    words(i) {
                        const a = this._lines,
                            l = this._wordenize.bind(this);
                        let f = 0,
                            u = '',
                            _ = 0,
                            b = [];
                        return {
                            *[Symbol.iterator]() {
                                for (;;)
                                    if (_ < b.length) {
                                        const A = u.substring(
                                            b[_].start,
                                            b[_].end
                                        );
                                        (_ += 1), yield A;
                                    } else if (f < a.length)
                                        (u = a[f]),
                                            (b = l(u, i)),
                                            (_ = 0),
                                            (f += 1);
                                    else break;
                            },
                        };
                    }
                    getLineWords(i, a) {
                        const l = this._lines[i - 1],
                            f = this._wordenize(l, a),
                            u = [];
                        for (const _ of f)
                            u.push({
                                word: l.substring(_.start, _.end),
                                startColumn: _.start + 1,
                                endColumn: _.end + 1,
                            });
                        return u;
                    }
                    _wordenize(i, a) {
                        const l = [];
                        let f;
                        for (
                            a.lastIndex = 0;
                            (f = a.exec(i)) && f[0].length !== 0;

                        )
                            l.push({
                                start: f.index,
                                end: f.index + f[0].length,
                            });
                        return l;
                    }
                    getValueInRange(i) {
                        if (
                            ((i = this._validateRange(i)),
                            i.startLineNumber === i.endLineNumber)
                        )
                            return this._lines[i.startLineNumber - 1].substring(
                                i.startColumn - 1,
                                i.endColumn - 1
                            );
                        const a = this._eol,
                            l = i.startLineNumber - 1,
                            f = i.endLineNumber - 1,
                            u = [];
                        u.push(this._lines[l].substring(i.startColumn - 1));
                        for (let _ = l + 1; _ < f; _++) u.push(this._lines[_]);
                        return (
                            u.push(
                                this._lines[f].substring(0, i.endColumn - 1)
                            ),
                            u.join(a)
                        );
                    }
                    offsetAt(i) {
                        return (
                            (i = this._validatePosition(i)),
                            this._ensureLineStarts(),
                            this._lineStarts.getPrefixSum(i.lineNumber - 2) +
                                (i.column - 1)
                        );
                    }
                    positionAt(i) {
                        (i = Math.floor(i)),
                            (i = Math.max(0, i)),
                            this._ensureLineStarts();
                        const a = this._lineStarts.getIndexOf(i),
                            l = this._lines[a.index].length;
                        return {
                            lineNumber: 1 + a.index,
                            column: 1 + Math.min(a.remainder, l),
                        };
                    }
                    _validateRange(i) {
                        const a = this._validatePosition({
                                lineNumber: i.startLineNumber,
                                column: i.startColumn,
                            }),
                            l = this._validatePosition({
                                lineNumber: i.endLineNumber,
                                column: i.endColumn,
                            });
                        return a.lineNumber !== i.startLineNumber ||
                            a.column !== i.startColumn ||
                            l.lineNumber !== i.endLineNumber ||
                            l.column !== i.endColumn
                            ? {
                                  startLineNumber: a.lineNumber,
                                  startColumn: a.column,
                                  endLineNumber: l.lineNumber,
                                  endColumn: l.column,
                              }
                            : i;
                    }
                    _validatePosition(i) {
                        if (!o.Position.isIPosition(i))
                            throw new Error('bad position');
                        let { lineNumber: a, column: l } = i,
                            f = !1;
                        if (a < 1) (a = 1), (l = 1), (f = !0);
                        else if (a > this._lines.length)
                            (a = this._lines.length),
                                (l = this._lines[a - 1].length + 1),
                                (f = !0);
                        else {
                            const u = this._lines[a - 1].length + 1;
                            l < 1
                                ? ((l = 1), (f = !0))
                                : l > u && ((l = u), (f = !0));
                        }
                        return f ? { lineNumber: a, column: l } : i;
                    }
                }
                r.MirrorModel = C;
                class y {
                    constructor(i, a) {
                        (this._host = i),
                            (this._models = Object.create(null)),
                            (this._foreignModuleFactory = a),
                            (this._foreignModule = null);
                    }
                    dispose() {
                        this._models = Object.create(null);
                    }
                    _getModel(i) {
                        return this._models[i];
                    }
                    _getModels() {
                        const i = [];
                        return (
                            Object.keys(this._models).forEach((a) =>
                                i.push(this._models[a])
                            ),
                            i
                        );
                    }
                    acceptNewModel(i) {
                        this._models[i.url] = new C(
                            N.URI.parse(i.url),
                            i.lines,
                            i.EOL,
                            i.versionId
                        );
                    }
                    acceptModelChanged(i, a) {
                        if (!this._models[i]) return;
                        this._models[i].onEvents(a);
                    }
                    acceptRemovedModel(i) {
                        !this._models[i] || delete this._models[i];
                    }
                    computeUnicodeHighlights(i, a, l) {
                        return oe(this, void 0, void 0, function* () {
                            const f = this._getModel(i);
                            return f
                                ? L.UnicodeTextModelHighlighter.computeUnicodeHighlights(
                                      f,
                                      a,
                                      l
                                  )
                                : {
                                      ranges: [],
                                      hasMore: !1,
                                      ambiguousCharacterCount: 0,
                                      invisibleCharacterCount: 0,
                                      nonBasicAsciiCharacterCount: 0,
                                  };
                        });
                    }
                    computeDiff(i, a, l, f) {
                        return oe(this, void 0, void 0, function* () {
                            const u = this._getModel(i),
                                _ = this._getModel(a);
                            if (!u || !_) return null;
                            const b = u.getLinesContent(),
                                A = _.getLinesContent(),
                                D = new g.DiffComputer(b, A, {
                                    shouldComputeCharChanges: !0,
                                    shouldPostProcessCharChanges: !0,
                                    shouldIgnoreTrimWhitespace: l,
                                    shouldMakePrettyDiff: !0,
                                    maxComputationTime: f,
                                }).computeDiff(),
                                k =
                                    D.changes.length > 0
                                        ? !1
                                        : this._modelsAreIdentical(u, _);
                            return {
                                quitEarly: D.quitEarly,
                                identical: k,
                                changes: D.changes,
                            };
                        });
                    }
                    _modelsAreIdentical(i, a) {
                        const l = i.getLineCount(),
                            f = a.getLineCount();
                        if (l !== f) return !1;
                        for (let u = 1; u <= l; u++) {
                            const _ = i.getLineContent(u),
                                b = a.getLineContent(u);
                            if (_ !== b) return !1;
                        }
                        return !0;
                    }
                    computeMoreMinimalEdits(i, a) {
                        return oe(this, void 0, void 0, function* () {
                            const l = this._getModel(i);
                            if (!l) return a;
                            const f = [];
                            let u;
                            a = a.slice(0).sort((_, b) => {
                                if (_.range && b.range)
                                    return w.Range.compareRangesUsingStarts(
                                        _.range,
                                        b.range
                                    );
                                const A = _.range ? 0 : 1,
                                    P = b.range ? 0 : 1;
                                return A - P;
                            });
                            for (let { range: _, text: b, eol: A } of a) {
                                if (
                                    (typeof A == 'number' && (u = A),
                                    w.Range.isEmpty(_) && !b)
                                )
                                    continue;
                                const P = l.getValueInRange(_);
                                if (
                                    ((b = b.replace(/\r\n|\n|\r/g, l.eol)),
                                    P === b)
                                )
                                    continue;
                                if (
                                    Math.max(b.length, P.length) > y._diffLimit
                                ) {
                                    f.push({ range: _, text: b });
                                    continue;
                                }
                                const D = (0, E.stringDiff)(P, b, !1),
                                    k = l.offsetAt(
                                        w.Range.lift(_).getStartPosition()
                                    );
                                for (const R of D) {
                                    const I = l.positionAt(k + R.originalStart),
                                        F = l.positionAt(
                                            k +
                                                R.originalStart +
                                                R.originalLength
                                        ),
                                        O = {
                                            text: b.substr(
                                                R.modifiedStart,
                                                R.modifiedLength
                                            ),
                                            range: {
                                                startLineNumber: I.lineNumber,
                                                startColumn: I.column,
                                                endLineNumber: F.lineNumber,
                                                endColumn: F.column,
                                            },
                                        };
                                    l.getValueInRange(O.range) !== O.text &&
                                        f.push(O);
                                }
                            }
                            return (
                                typeof u == 'number' &&
                                    f.push({
                                        eol: u,
                                        text: '',
                                        range: {
                                            startLineNumber: 0,
                                            startColumn: 0,
                                            endLineNumber: 0,
                                            endColumn: 0,
                                        },
                                    }),
                                f
                            );
                        });
                    }
                    computeLinks(i) {
                        return oe(this, void 0, void 0, function* () {
                            const a = this._getModel(i);
                            return a ? (0, S.computeLinks)(a) : null;
                        });
                    }
                    textualSuggest(i, a, l, f) {
                        return oe(this, void 0, void 0, function* () {
                            const u = new v.StopWatch(!0),
                                _ = new RegExp(l, f),
                                b = new Set();
                            e: for (let A of i) {
                                const P = this._getModel(A);
                                if (!!P) {
                                    for (let D of P.words(_))
                                        if (
                                            !(D === a || !isNaN(Number(D))) &&
                                            (b.add(D),
                                            b.size > y._suggestionsLimit)
                                        )
                                            break e;
                                }
                            }
                            return {
                                words: Array.from(b),
                                duration: u.elapsed(),
                            };
                        });
                    }
                    computeWordRanges(i, a, l, f) {
                        return oe(this, void 0, void 0, function* () {
                            const u = this._getModel(i);
                            if (!u) return Object.create(null);
                            const _ = new RegExp(l, f),
                                b = Object.create(null);
                            for (
                                let A = a.startLineNumber;
                                A < a.endLineNumber;
                                A++
                            ) {
                                const P = u.getLineWords(A, _);
                                for (const D of P) {
                                    if (!isNaN(Number(D.word))) continue;
                                    let k = b[D.word];
                                    k || ((k = []), (b[D.word] = k)),
                                        k.push({
                                            startLineNumber: A,
                                            startColumn: D.startColumn,
                                            endLineNumber: A,
                                            endColumn: D.endColumn,
                                        });
                                }
                            }
                            return b;
                        });
                    }
                    navigateValueSet(i, a, l, f, u) {
                        return oe(this, void 0, void 0, function* () {
                            const _ = this._getModel(i);
                            if (!_) return null;
                            const b = new RegExp(f, u);
                            a.startColumn === a.endColumn &&
                                (a = {
                                    startLineNumber: a.startLineNumber,
                                    startColumn: a.startColumn,
                                    endLineNumber: a.endLineNumber,
                                    endColumn: a.endColumn + 1,
                                });
                            const A = _.getValueInRange(a),
                                P = _.getWordAtPosition(
                                    {
                                        lineNumber: a.startLineNumber,
                                        column: a.startColumn,
                                    },
                                    b
                                );
                            if (!P) return null;
                            const D = _.getValueInRange(P);
                            return t.BasicInplaceReplace.INSTANCE.navigateValueSet(
                                a,
                                A,
                                P,
                                D,
                                l
                            );
                        });
                    }
                    loadForeignModule(i, a, l) {
                        const f = (b, A) => this._host.fhr(b, A),
                            _ = {
                                host: h.createProxyObject(l, f),
                                getMirrorModels: () => this._getModels(),
                            };
                        return this._foreignModuleFactory
                            ? ((this._foreignModule =
                                  this._foreignModuleFactory(_, a)),
                              Promise.resolve(
                                  h.getAllMethodNames(this._foreignModule)
                              ))
                            : new Promise((b, A) => {
                                  U(
                                      [i],
                                      (P) => {
                                          (this._foreignModule = P.create(
                                              _,
                                              a
                                          )),
                                              b(
                                                  h.getAllMethodNames(
                                                      this._foreignModule
                                                  )
                                              );
                                      },
                                      A
                                  );
                              });
                    }
                    fmr(i, a) {
                        if (
                            !this._foreignModule ||
                            typeof this._foreignModule[i] != 'function'
                        )
                            return Promise.reject(
                                new Error(
                                    'Missing requestHandler or method: ' + i
                                )
                            );
                        try {
                            return Promise.resolve(
                                this._foreignModule[i].apply(
                                    this._foreignModule,
                                    a
                                )
                            );
                        } catch (l) {
                            return Promise.reject(l);
                        }
                    }
                }
                (r.EditorSimpleWorker = y),
                    (y._diffLimit = 1e5),
                    (y._suggestionsLimit = 1e4);
                function p(s) {
                    return new y(s, null);
                }
                (r.create = p),
                    typeof importScripts == 'function' &&
                        (e.globals.monaco = (0, d.createMonacoBaseAPI)());
            }
        ),
        (function () {
            var U, r;
            const E = self.MonacoEnvironment,
                e = E && E.baseUrl ? E.baseUrl : '../../../',
                N =
                    typeof ((U = self.trustedTypes) === null || U === void 0
                        ? void 0
                        : U.createPolicy) == 'function'
                        ? (r = self.trustedTypes) === null || r === void 0
                            ? void 0
                            : r.createPolicy('amdLoader', {
                                  createScriptURL: (S) => S,
                                  createScript: (S, ...t) => {
                                      const d = t.slice(0, -1).join(','),
                                          h = t.pop().toString();
                                      return `(function anonymous(${d}) {
${h}
})`;
                                  },
                              })
                        : void 0;
            function o() {
                try {
                    return (
                        (N
                            ? self.eval(N.createScript('', 'true'))
                            : new Function('true')
                        ).call(self),
                        !0
                    );
                } catch {
                    return !1;
                }
            }
            function w() {
                return new Promise((S, t) => {
                    if (typeof self.define == 'function' && self.define.amd)
                        return S();
                    const d = e + 'vs/loader.js';
                    if (
                        !(
                            /^((http:)|(https:)|(file:))/.test(d) &&
                            d.substring(0, self.origin.length) !== self.origin
                        ) &&
                        o()
                    ) {
                        fetch(d)
                            .then((v) => {
                                if (v.status !== 200)
                                    throw new Error(v.statusText);
                                return v.text();
                            })
                            .then((v) => {
                                (v = `${v}
//# sourceURL=${d}`),
                                    (N
                                        ? self.eval(N.createScript('', v))
                                        : new Function(v)
                                    ).call(self),
                                    S();
                            })
                            .then(void 0, t);
                        return;
                    }
                    N ? importScripts(N.createScriptURL(d)) : importScripts(d),
                        S();
                });
            }
            const g = function (S) {
                w().then(() => {
                    require.config({
                        baseUrl: e,
                        catchError: !0,
                        trustedTypesPolicy: N,
                        amdModulesPattern: /^vs\//,
                    }),
                        require([S], function (t) {
                            setTimeout(function () {
                                let d = t.create((h, v) => {
                                    self.postMessage(h, v);
                                }, null);
                                for (
                                    self.onmessage = (h) =>
                                        d.onmessage(h.data, h.ports);
                                    m.length > 0;

                                )
                                    self.onmessage(m.shift());
                            }, 0);
                        });
                });
            };
            let c = !0,
                m = [];
            self.onmessage = (S) => {
                if (!c) {
                    m.push(S);
                    return;
                }
                (c = !1), g(S.data);
            };
        })();
}).call(this);

//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
