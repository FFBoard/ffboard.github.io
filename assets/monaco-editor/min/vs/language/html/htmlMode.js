/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.33.0(4b1abad427e58dbedc1215d99a0902ffc885fcd4)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/language/html/htmlMode', ['require', 'require'], (require) => {
    var moduleExports = (() => {
        var nn = Object.create;
        var $ = Object.defineProperty;
        var tn = Object.getOwnPropertyDescriptor;
        var rn = Object.getOwnPropertyNames;
        var on = Object.getPrototypeOf,
            an = Object.prototype.hasOwnProperty;
        var le = (n) => $(n, '__esModule', { value: !0 });
        var sn = ((n) =>
            typeof require != 'undefined'
                ? require
                : typeof Proxy != 'undefined'
                ? new Proxy(n, {
                      get: (t, i) =>
                          (typeof require != 'undefined' ? require : t)[i],
                  })
                : n)(function (n) {
            if (typeof require != 'undefined')
                return require.apply(this, arguments);
            throw new Error('Dynamic require of "' + n + '" is not supported');
        });
        var un = (n, t) => () => (
                t || n((t = { exports: {} }).exports, t), t.exports
            ),
            dn = (n, t) => {
                for (var i in t) $(n, i, { get: t[i], enumerable: !0 });
            },
            q = (n, t, i, r) => {
                if ((t && typeof t == 'object') || typeof t == 'function')
                    for (let e of rn(t))
                        !an.call(n, e) &&
                            (i || e !== 'default') &&
                            $(n, e, {
                                get: () => t[e],
                                enumerable: !(r = tn(t, e)) || r.enumerable,
                            });
                return n;
            },
            ge = (n, t) =>
                q(
                    le(
                        $(
                            n != null ? nn(on(n)) : {},
                            'default',
                            !t && n && n.__esModule
                                ? { get: () => n.default, enumerable: !0 }
                                : { value: n, enumerable: !0 }
                        )
                    ),
                    n
                ),
            cn = (
                (n) => (t, i) =>
                    (n && n.get(t)) ||
                    ((i = q(le({}), t, 1)), n && n.set(t, i), i)
            )(typeof WeakMap != 'undefined' ? new WeakMap() : 0);
        var pe = un((Dn, fe) => {
            var ln = ge(sn('vs/editor/editor.api'));
            fe.exports = ln;
        });
        var Pn = {};
        dn(Pn, {
            CompletionAdapter: () => te,
            DefinitionAdapter: () => qe,
            DiagnosticsAdapter: () => $e,
            DocumentColorAdapter: () => Ye,
            DocumentFormattingEditProvider: () => N,
            DocumentHighlightAdapter: () => K,
            DocumentLinkAdapter: () => O,
            DocumentRangeFormattingEditProvider: () => V,
            DocumentSymbolAdapter: () => j,
            FoldingRangeAdapter: () => z,
            HoverAdapter: () => H,
            ReferenceAdapter: () => Ge,
            RenameAdapter: () => U,
            SelectionRangeAdapter: () => X,
            WorkerManager: () => E,
            fromPosition: () => C,
            fromRange: () => ue,
            setupMode: () => Rn,
            setupMode1: () => En,
            toRange: () => y,
            toTextEdit: () => D,
        });
        var d = {};
        q(d, ge(pe()));
        var gn = 2 * 60 * 1e3,
            E = class {
                _defaults;
                _idleCheckInterval;
                _lastUsedTime;
                _configChangeListener;
                _worker;
                _client;
                constructor(t) {
                    (this._defaults = t),
                        (this._worker = null),
                        (this._client = null),
                        (this._idleCheckInterval = window.setInterval(
                            () => this._checkIfIdle(),
                            30 * 1e3
                        )),
                        (this._lastUsedTime = 0),
                        (this._configChangeListener =
                            this._defaults.onDidChange(() =>
                                this._stopWorker()
                            ));
                }
                _stopWorker() {
                    this._worker &&
                        (this._worker.dispose(), (this._worker = null)),
                        (this._client = null);
                }
                dispose() {
                    clearInterval(this._idleCheckInterval),
                        this._configChangeListener.dispose(),
                        this._stopWorker();
                }
                _checkIfIdle() {
                    if (!this._worker) return;
                    Date.now() - this._lastUsedTime > gn && this._stopWorker();
                }
                _getClient() {
                    return (
                        (this._lastUsedTime = Date.now()),
                        this._client ||
                            ((this._worker = d.editor.createWebWorker({
                                moduleId: 'vs/language/html/htmlWorker',
                                createData: {
                                    languageSettings: this._defaults.options,
                                    languageId: this._defaults.languageId,
                                },
                                label: this._defaults.languageId,
                            })),
                            (this._client = this._worker.getProxy())),
                        this._client
                    );
                }
                getLanguageServiceWorker(...t) {
                    let i;
                    return this._getClient()
                        .then((r) => {
                            i = r;
                        })
                        .then((r) => {
                            if (this._worker)
                                return this._worker.withSyncedResources(t);
                        })
                        .then((r) => i);
                }
            };
        var me;
        (function (n) {
            (n.MIN_VALUE = -2147483648), (n.MAX_VALUE = 2147483647);
        })(me || (me = {}));
        var G;
        (function (n) {
            (n.MIN_VALUE = 0), (n.MAX_VALUE = 2147483647);
        })(G || (G = {}));
        var x;
        (function (n) {
            function t(r, e) {
                return (
                    r === Number.MAX_VALUE && (r = G.MAX_VALUE),
                    e === Number.MAX_VALUE && (e = G.MAX_VALUE),
                    { line: r, character: e }
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.objectLiteral(e) &&
                    s.uinteger(e.line) &&
                    s.uinteger(e.character)
                );
            }
            n.is = i;
        })(x || (x = {}));
        var v;
        (function (n) {
            function t(r, e, o, a) {
                if (
                    s.uinteger(r) &&
                    s.uinteger(e) &&
                    s.uinteger(o) &&
                    s.uinteger(a)
                )
                    return { start: x.create(r, e), end: x.create(o, a) };
                if (x.is(r) && x.is(e)) return { start: r, end: e };
                throw new Error(
                    'Range#create called with invalid arguments[' +
                        r +
                        ', ' +
                        e +
                        ', ' +
                        o +
                        ', ' +
                        a +
                        ']'
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return s.objectLiteral(e) && x.is(e.start) && x.is(e.end);
            }
            n.is = i;
        })(v || (v = {}));
        var re;
        (function (n) {
            function t(r, e) {
                return { uri: r, range: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    v.is(e.range) &&
                    (s.string(e.uri) || s.undefined(e.uri))
                );
            }
            n.is = i;
        })(re || (re = {}));
        var he;
        (function (n) {
            function t(r, e, o, a) {
                return {
                    targetUri: r,
                    targetRange: e,
                    targetSelectionRange: o,
                    originSelectionRange: a,
                };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    v.is(e.targetRange) &&
                    s.string(e.targetUri) &&
                    (v.is(e.targetSelectionRange) ||
                        s.undefined(e.targetSelectionRange)) &&
                    (v.is(e.originSelectionRange) ||
                        s.undefined(e.originSelectionRange))
                );
            }
            n.is = i;
        })(he || (he = {}));
        var ie;
        (function (n) {
            function t(r, e, o, a) {
                return { red: r, green: e, blue: o, alpha: a };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.numberRange(e.red, 0, 1) &&
                    s.numberRange(e.green, 0, 1) &&
                    s.numberRange(e.blue, 0, 1) &&
                    s.numberRange(e.alpha, 0, 1)
                );
            }
            n.is = i;
        })(ie || (ie = {}));
        var ve;
        (function (n) {
            function t(r, e) {
                return { range: r, color: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return v.is(e.range) && ie.is(e.color);
            }
            n.is = i;
        })(ve || (ve = {}));
        var Te;
        (function (n) {
            function t(r, e, o) {
                return { label: r, textEdit: e, additionalTextEdits: o };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.string(e.label) &&
                    (s.undefined(e.textEdit) || _.is(e)) &&
                    (s.undefined(e.additionalTextEdits) ||
                        s.typedArray(e.additionalTextEdits, _.is))
                );
            }
            n.is = i;
        })(Te || (Te = {}));
        var P;
        (function (n) {
            (n.Comment = 'comment'),
                (n.Imports = 'imports'),
                (n.Region = 'region');
        })(P || (P = {}));
        var ye;
        (function (n) {
            function t(r, e, o, a, u) {
                var l = { startLine: r, endLine: e };
                return (
                    s.defined(o) && (l.startCharacter = o),
                    s.defined(a) && (l.endCharacter = a),
                    s.defined(u) && (l.kind = u),
                    l
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.uinteger(e.startLine) &&
                    s.uinteger(e.startLine) &&
                    (s.undefined(e.startCharacter) ||
                        s.uinteger(e.startCharacter)) &&
                    (s.undefined(e.endCharacter) ||
                        s.uinteger(e.endCharacter)) &&
                    (s.undefined(e.kind) || s.string(e.kind))
                );
            }
            n.is = i;
        })(ye || (ye = {}));
        var oe;
        (function (n) {
            function t(r, e) {
                return { location: r, message: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return s.defined(e) && re.is(e.location) && s.string(e.message);
            }
            n.is = i;
        })(oe || (oe = {}));
        var b;
        (function (n) {
            (n.Error = 1), (n.Warning = 2), (n.Information = 3), (n.Hint = 4);
        })(b || (b = {}));
        var xe;
        (function (n) {
            (n.Unnecessary = 1), (n.Deprecated = 2);
        })(xe || (xe = {}));
        var ke;
        (function (n) {
            function t(i) {
                var r = i;
                return r != null && s.string(r.href);
            }
            n.is = t;
        })(ke || (ke = {}));
        var J;
        (function (n) {
            function t(r, e, o, a, u, l) {
                var f = { range: r, message: e };
                return (
                    s.defined(o) && (f.severity = o),
                    s.defined(a) && (f.code = a),
                    s.defined(u) && (f.source = u),
                    s.defined(l) && (f.relatedInformation = l),
                    f
                );
            }
            n.create = t;
            function i(r) {
                var e,
                    o = r;
                return (
                    s.defined(o) &&
                    v.is(o.range) &&
                    s.string(o.message) &&
                    (s.number(o.severity) || s.undefined(o.severity)) &&
                    (s.integer(o.code) ||
                        s.string(o.code) ||
                        s.undefined(o.code)) &&
                    (s.undefined(o.codeDescription) ||
                        s.string(
                            (e = o.codeDescription) === null || e === void 0
                                ? void 0
                                : e.href
                        )) &&
                    (s.string(o.source) || s.undefined(o.source)) &&
                    (s.undefined(o.relatedInformation) ||
                        s.typedArray(o.relatedInformation, oe.is))
                );
            }
            n.is = i;
        })(J || (J = {}));
        var L;
        (function (n) {
            function t(r, e) {
                for (var o = [], a = 2; a < arguments.length; a++)
                    o[a - 2] = arguments[a];
                var u = { title: r, command: e };
                return s.defined(o) && o.length > 0 && (u.arguments = o), u;
            }
            n.create = t;
            function i(r) {
                var e = r;
                return s.defined(e) && s.string(e.title) && s.string(e.command);
            }
            n.is = i;
        })(L || (L = {}));
        var _;
        (function (n) {
            function t(o, a) {
                return { range: o, newText: a };
            }
            n.replace = t;
            function i(o, a) {
                return { range: { start: o, end: o }, newText: a };
            }
            n.insert = i;
            function r(o) {
                return { range: o, newText: '' };
            }
            n.del = r;
            function e(o) {
                var a = o;
                return (
                    s.objectLiteral(a) && s.string(a.newText) && v.is(a.range)
                );
            }
            n.is = e;
        })(_ || (_ = {}));
        var R;
        (function (n) {
            function t(r, e, o) {
                var a = { label: r };
                return (
                    e !== void 0 && (a.needsConfirmation = e),
                    o !== void 0 && (a.description = o),
                    a
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e !== void 0 &&
                    s.objectLiteral(e) &&
                    s.string(e.label) &&
                    (s.boolean(e.needsConfirmation) ||
                        e.needsConfirmation === void 0) &&
                    (s.string(e.description) || e.description === void 0)
                );
            }
            n.is = i;
        })(R || (R = {}));
        var T;
        (function (n) {
            function t(i) {
                var r = i;
                return typeof r == 'string';
            }
            n.is = t;
        })(T || (T = {}));
        var I;
        (function (n) {
            function t(o, a, u) {
                return { range: o, newText: a, annotationId: u };
            }
            n.replace = t;
            function i(o, a, u) {
                return {
                    range: { start: o, end: o },
                    newText: a,
                    annotationId: u,
                };
            }
            n.insert = i;
            function r(o, a) {
                return { range: o, newText: '', annotationId: a };
            }
            n.del = r;
            function e(o) {
                var a = o;
                return (
                    _.is(a) && (R.is(a.annotationId) || T.is(a.annotationId))
                );
            }
            n.is = e;
        })(I || (I = {}));
        var Y;
        (function (n) {
            function t(r, e) {
                return { textDocument: r, edits: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    Z.is(e.textDocument) &&
                    Array.isArray(e.edits)
                );
            }
            n.is = i;
        })(Y || (Y = {}));
        var S;
        (function (n) {
            function t(r, e, o) {
                var a = { kind: 'create', uri: r };
                return (
                    e !== void 0 &&
                        (e.overwrite !== void 0 ||
                            e.ignoreIfExists !== void 0) &&
                        (a.options = e),
                    o !== void 0 && (a.annotationId = o),
                    a
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e &&
                    e.kind === 'create' &&
                    s.string(e.uri) &&
                    (e.options === void 0 ||
                        ((e.options.overwrite === void 0 ||
                            s.boolean(e.options.overwrite)) &&
                            (e.options.ignoreIfExists === void 0 ||
                                s.boolean(e.options.ignoreIfExists)))) &&
                    (e.annotationId === void 0 || T.is(e.annotationId))
                );
            }
            n.is = i;
        })(S || (S = {}));
        var F;
        (function (n) {
            function t(r, e, o, a) {
                var u = { kind: 'rename', oldUri: r, newUri: e };
                return (
                    o !== void 0 &&
                        (o.overwrite !== void 0 ||
                            o.ignoreIfExists !== void 0) &&
                        (u.options = o),
                    a !== void 0 && (u.annotationId = a),
                    u
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e &&
                    e.kind === 'rename' &&
                    s.string(e.oldUri) &&
                    s.string(e.newUri) &&
                    (e.options === void 0 ||
                        ((e.options.overwrite === void 0 ||
                            s.boolean(e.options.overwrite)) &&
                            (e.options.ignoreIfExists === void 0 ||
                                s.boolean(e.options.ignoreIfExists)))) &&
                    (e.annotationId === void 0 || T.is(e.annotationId))
                );
            }
            n.is = i;
        })(F || (F = {}));
        var M;
        (function (n) {
            function t(r, e, o) {
                var a = { kind: 'delete', uri: r };
                return (
                    e !== void 0 &&
                        (e.recursive !== void 0 ||
                            e.ignoreIfNotExists !== void 0) &&
                        (a.options = e),
                    o !== void 0 && (a.annotationId = o),
                    a
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e &&
                    e.kind === 'delete' &&
                    s.string(e.uri) &&
                    (e.options === void 0 ||
                        ((e.options.recursive === void 0 ||
                            s.boolean(e.options.recursive)) &&
                            (e.options.ignoreIfNotExists === void 0 ||
                                s.boolean(e.options.ignoreIfNotExists)))) &&
                    (e.annotationId === void 0 || T.is(e.annotationId))
                );
            }
            n.is = i;
        })(M || (M = {}));
        var ae;
        (function (n) {
            function t(i) {
                var r = i;
                return (
                    r &&
                    (r.changes !== void 0 || r.documentChanges !== void 0) &&
                    (r.documentChanges === void 0 ||
                        r.documentChanges.every(function (e) {
                            return s.string(e.kind)
                                ? S.is(e) || F.is(e) || M.is(e)
                                : Y.is(e);
                        }))
                );
            }
            n.is = t;
        })(ae || (ae = {}));
        var Q = (function () {
                function n(t, i) {
                    (this.edits = t), (this.changeAnnotations = i);
                }
                return (
                    (n.prototype.insert = function (t, i, r) {
                        var e, o;
                        if (
                            (r === void 0
                                ? (e = _.insert(t, i))
                                : T.is(r)
                                ? ((o = r), (e = I.insert(t, i, r)))
                                : (this.assertChangeAnnotations(
                                      this.changeAnnotations
                                  ),
                                  (o = this.changeAnnotations.manage(r)),
                                  (e = I.insert(t, i, o))),
                            this.edits.push(e),
                            o !== void 0)
                        )
                            return o;
                    }),
                    (n.prototype.replace = function (t, i, r) {
                        var e, o;
                        if (
                            (r === void 0
                                ? (e = _.replace(t, i))
                                : T.is(r)
                                ? ((o = r), (e = I.replace(t, i, r)))
                                : (this.assertChangeAnnotations(
                                      this.changeAnnotations
                                  ),
                                  (o = this.changeAnnotations.manage(r)),
                                  (e = I.replace(t, i, o))),
                            this.edits.push(e),
                            o !== void 0)
                        )
                            return o;
                    }),
                    (n.prototype.delete = function (t, i) {
                        var r, e;
                        if (
                            (i === void 0
                                ? (r = _.del(t))
                                : T.is(i)
                                ? ((e = i), (r = I.del(t, i)))
                                : (this.assertChangeAnnotations(
                                      this.changeAnnotations
                                  ),
                                  (e = this.changeAnnotations.manage(i)),
                                  (r = I.del(t, e))),
                            this.edits.push(r),
                            e !== void 0)
                        )
                            return e;
                    }),
                    (n.prototype.add = function (t) {
                        this.edits.push(t);
                    }),
                    (n.prototype.all = function () {
                        return this.edits;
                    }),
                    (n.prototype.clear = function () {
                        this.edits.splice(0, this.edits.length);
                    }),
                    (n.prototype.assertChangeAnnotations = function (t) {
                        if (t === void 0)
                            throw new Error(
                                'Text edit change is not configured to manage change annotations.'
                            );
                    }),
                    n
                );
            })(),
            Ie = (function () {
                function n(t) {
                    (this._annotations =
                        t === void 0 ? Object.create(null) : t),
                        (this._counter = 0),
                        (this._size = 0);
                }
                return (
                    (n.prototype.all = function () {
                        return this._annotations;
                    }),
                    Object.defineProperty(n.prototype, 'size', {
                        get: function () {
                            return this._size;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (n.prototype.manage = function (t, i) {
                        var r;
                        if (
                            (T.is(t) ? (r = t) : ((r = this.nextId()), (i = t)),
                            this._annotations[r] !== void 0)
                        )
                            throw new Error('Id ' + r + ' is already in use.');
                        if (i === void 0)
                            throw new Error(
                                'No annotation provided for id ' + r
                            );
                        return (this._annotations[r] = i), this._size++, r;
                    }),
                    (n.prototype.nextId = function () {
                        return this._counter++, this._counter.toString();
                    }),
                    n
                );
            })(),
            Hn = (function () {
                function n(t) {
                    var i = this;
                    (this._textEditChanges = Object.create(null)),
                        t !== void 0
                            ? ((this._workspaceEdit = t),
                              t.documentChanges
                                  ? ((this._changeAnnotations = new Ie(
                                        t.changeAnnotations
                                    )),
                                    (t.changeAnnotations =
                                        this._changeAnnotations.all()),
                                    t.documentChanges.forEach(function (r) {
                                        if (Y.is(r)) {
                                            var e = new Q(
                                                r.edits,
                                                i._changeAnnotations
                                            );
                                            i._textEditChanges[
                                                r.textDocument.uri
                                            ] = e;
                                        }
                                    }))
                                  : t.changes &&
                                    Object.keys(t.changes).forEach(function (
                                        r
                                    ) {
                                        var e = new Q(t.changes[r]);
                                        i._textEditChanges[r] = e;
                                    }))
                            : (this._workspaceEdit = {});
                }
                return (
                    Object.defineProperty(n.prototype, 'edit', {
                        get: function () {
                            return (
                                this.initDocumentChanges(),
                                this._changeAnnotations !== void 0 &&
                                    (this._changeAnnotations.size === 0
                                        ? (this._workspaceEdit.changeAnnotations =
                                              void 0)
                                        : (this._workspaceEdit.changeAnnotations =
                                              this._changeAnnotations.all())),
                                this._workspaceEdit
                            );
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (n.prototype.getTextEditChange = function (t) {
                        if (Z.is(t)) {
                            if (
                                (this.initDocumentChanges(),
                                this._workspaceEdit.documentChanges === void 0)
                            )
                                throw new Error(
                                    'Workspace edit is not configured for document changes.'
                                );
                            var i = { uri: t.uri, version: t.version },
                                r = this._textEditChanges[i.uri];
                            if (!r) {
                                var e = [],
                                    o = { textDocument: i, edits: e };
                                this._workspaceEdit.documentChanges.push(o),
                                    (r = new Q(e, this._changeAnnotations)),
                                    (this._textEditChanges[i.uri] = r);
                            }
                            return r;
                        } else {
                            if (
                                (this.initChanges(),
                                this._workspaceEdit.changes === void 0)
                            )
                                throw new Error(
                                    'Workspace edit is not configured for normal text edit changes.'
                                );
                            var r = this._textEditChanges[t];
                            if (!r) {
                                var e = [];
                                (this._workspaceEdit.changes[t] = e),
                                    (r = new Q(e)),
                                    (this._textEditChanges[t] = r);
                            }
                            return r;
                        }
                    }),
                    (n.prototype.initDocumentChanges = function () {
                        this._workspaceEdit.documentChanges === void 0 &&
                            this._workspaceEdit.changes === void 0 &&
                            ((this._changeAnnotations = new Ie()),
                            (this._workspaceEdit.documentChanges = []),
                            (this._workspaceEdit.changeAnnotations =
                                this._changeAnnotations.all()));
                    }),
                    (n.prototype.initChanges = function () {
                        this._workspaceEdit.documentChanges === void 0 &&
                            this._workspaceEdit.changes === void 0 &&
                            (this._workspaceEdit.changes = Object.create(null));
                    }),
                    (n.prototype.createFile = function (t, i, r) {
                        if (
                            (this.initDocumentChanges(),
                            this._workspaceEdit.documentChanges === void 0)
                        )
                            throw new Error(
                                'Workspace edit is not configured for document changes.'
                            );
                        var e;
                        R.is(i) || T.is(i) ? (e = i) : (r = i);
                        var o, a;
                        if (
                            (e === void 0
                                ? (o = S.create(t, r))
                                : ((a = T.is(e)
                                      ? e
                                      : this._changeAnnotations.manage(e)),
                                  (o = S.create(t, r, a))),
                            this._workspaceEdit.documentChanges.push(o),
                            a !== void 0)
                        )
                            return a;
                    }),
                    (n.prototype.renameFile = function (t, i, r, e) {
                        if (
                            (this.initDocumentChanges(),
                            this._workspaceEdit.documentChanges === void 0)
                        )
                            throw new Error(
                                'Workspace edit is not configured for document changes.'
                            );
                        var o;
                        R.is(r) || T.is(r) ? (o = r) : (e = r);
                        var a, u;
                        if (
                            (o === void 0
                                ? (a = F.create(t, i, e))
                                : ((u = T.is(o)
                                      ? o
                                      : this._changeAnnotations.manage(o)),
                                  (a = F.create(t, i, e, u))),
                            this._workspaceEdit.documentChanges.push(a),
                            u !== void 0)
                        )
                            return u;
                    }),
                    (n.prototype.deleteFile = function (t, i, r) {
                        if (
                            (this.initDocumentChanges(),
                            this._workspaceEdit.documentChanges === void 0)
                        )
                            throw new Error(
                                'Workspace edit is not configured for document changes.'
                            );
                        var e;
                        R.is(i) || T.is(i) ? (e = i) : (r = i);
                        var o, a;
                        if (
                            (e === void 0
                                ? (o = M.create(t, r))
                                : ((a = T.is(e)
                                      ? e
                                      : this._changeAnnotations.manage(e)),
                                  (o = M.create(t, r, a))),
                            this._workspaceEdit.documentChanges.push(o),
                            a !== void 0)
                        )
                            return a;
                    }),
                    n
                );
            })();
        var _e;
        (function (n) {
            function t(r) {
                return { uri: r };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return s.defined(e) && s.string(e.uri);
            }
            n.is = i;
        })(_e || (_e = {}));
        var Ce;
        (function (n) {
            function t(r, e) {
                return { uri: r, version: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return s.defined(e) && s.string(e.uri) && s.integer(e.version);
            }
            n.is = i;
        })(Ce || (Ce = {}));
        var Z;
        (function (n) {
            function t(r, e) {
                return { uri: r, version: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    s.string(e.uri) &&
                    (e.version === null || s.integer(e.version))
                );
            }
            n.is = i;
        })(Z || (Z = {}));
        var be;
        (function (n) {
            function t(r, e, o, a) {
                return { uri: r, languageId: e, version: o, text: a };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    s.string(e.uri) &&
                    s.string(e.languageId) &&
                    s.integer(e.version) &&
                    s.string(e.text)
                );
            }
            n.is = i;
        })(be || (be = {}));
        var A;
        (function (n) {
            (n.PlainText = 'plaintext'), (n.Markdown = 'markdown');
        })(A || (A = {}));
        (function (n) {
            function t(i) {
                var r = i;
                return r === n.PlainText || r === n.Markdown;
            }
            n.is = t;
        })(A || (A = {}));
        var se;
        (function (n) {
            function t(i) {
                var r = i;
                return s.objectLiteral(i) && A.is(r.kind) && s.string(r.value);
            }
            n.is = t;
        })(se || (se = {}));
        var p;
        (function (n) {
            (n.Text = 1),
                (n.Method = 2),
                (n.Function = 3),
                (n.Constructor = 4),
                (n.Field = 5),
                (n.Variable = 6),
                (n.Class = 7),
                (n.Interface = 8),
                (n.Module = 9),
                (n.Property = 10),
                (n.Unit = 11),
                (n.Value = 12),
                (n.Enum = 13),
                (n.Keyword = 14),
                (n.Snippet = 15),
                (n.Color = 16),
                (n.File = 17),
                (n.Reference = 18),
                (n.Folder = 19),
                (n.EnumMember = 20),
                (n.Constant = 21),
                (n.Struct = 22),
                (n.Event = 23),
                (n.Operator = 24),
                (n.TypeParameter = 25);
        })(p || (p = {}));
        var ee;
        (function (n) {
            (n.PlainText = 1), (n.Snippet = 2);
        })(ee || (ee = {}));
        var we;
        (function (n) {
            n.Deprecated = 1;
        })(we || (we = {}));
        var Ee;
        (function (n) {
            function t(r, e, o) {
                return { newText: r, insert: e, replace: o };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e &&
                    s.string(e.newText) &&
                    v.is(e.insert) &&
                    v.is(e.replace)
                );
            }
            n.is = i;
        })(Ee || (Ee = {}));
        var Re;
        (function (n) {
            (n.asIs = 1), (n.adjustIndentation = 2);
        })(Re || (Re = {}));
        var Pe;
        (function (n) {
            function t(i) {
                return { label: i };
            }
            n.create = t;
        })(Pe || (Pe = {}));
        var We;
        (function (n) {
            function t(i, r) {
                return { items: i || [], isIncomplete: !!r };
            }
            n.create = t;
        })(We || (We = {}));
        var ne;
        (function (n) {
            function t(r) {
                return r.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
            }
            n.fromPlainText = t;
            function i(r) {
                var e = r;
                return (
                    s.string(e) ||
                    (s.objectLiteral(e) &&
                        s.string(e.language) &&
                        s.string(e.value))
                );
            }
            n.is = i;
        })(ne || (ne = {}));
        var De;
        (function (n) {
            function t(i) {
                var r = i;
                return (
                    !!r &&
                    s.objectLiteral(r) &&
                    (se.is(r.contents) ||
                        ne.is(r.contents) ||
                        s.typedArray(r.contents, ne.is)) &&
                    (i.range === void 0 || v.is(i.range))
                );
            }
            n.is = t;
        })(De || (De = {}));
        var Le;
        (function (n) {
            function t(i, r) {
                return r ? { label: i, documentation: r } : { label: i };
            }
            n.create = t;
        })(Le || (Le = {}));
        var Se;
        (function (n) {
            function t(i, r) {
                for (var e = [], o = 2; o < arguments.length; o++)
                    e[o - 2] = arguments[o];
                var a = { label: i };
                return (
                    s.defined(r) && (a.documentation = r),
                    s.defined(e) ? (a.parameters = e) : (a.parameters = []),
                    a
                );
            }
            n.create = t;
        })(Se || (Se = {}));
        var W;
        (function (n) {
            (n.Text = 1), (n.Read = 2), (n.Write = 3);
        })(W || (W = {}));
        var Fe;
        (function (n) {
            function t(i, r) {
                var e = { range: i };
                return s.number(r) && (e.kind = r), e;
            }
            n.create = t;
        })(Fe || (Fe = {}));
        var m;
        (function (n) {
            (n.File = 1),
                (n.Module = 2),
                (n.Namespace = 3),
                (n.Package = 4),
                (n.Class = 5),
                (n.Method = 6),
                (n.Property = 7),
                (n.Field = 8),
                (n.Constructor = 9),
                (n.Enum = 10),
                (n.Interface = 11),
                (n.Function = 12),
                (n.Variable = 13),
                (n.Constant = 14),
                (n.String = 15),
                (n.Number = 16),
                (n.Boolean = 17),
                (n.Array = 18),
                (n.Object = 19),
                (n.Key = 20),
                (n.Null = 21),
                (n.EnumMember = 22),
                (n.Struct = 23),
                (n.Event = 24),
                (n.Operator = 25),
                (n.TypeParameter = 26);
        })(m || (m = {}));
        var Me;
        (function (n) {
            n.Deprecated = 1;
        })(Me || (Me = {}));
        var Ae;
        (function (n) {
            function t(i, r, e, o, a) {
                var u = { name: i, kind: r, location: { uri: o, range: e } };
                return a && (u.containerName = a), u;
            }
            n.create = t;
        })(Ae || (Ae = {}));
        var He;
        (function (n) {
            function t(r, e, o, a, u, l) {
                var f = {
                    name: r,
                    detail: e,
                    kind: o,
                    range: a,
                    selectionRange: u,
                };
                return l !== void 0 && (f.children = l), f;
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e &&
                    s.string(e.name) &&
                    s.number(e.kind) &&
                    v.is(e.range) &&
                    v.is(e.selectionRange) &&
                    (e.detail === void 0 || s.string(e.detail)) &&
                    (e.deprecated === void 0 || s.boolean(e.deprecated)) &&
                    (e.children === void 0 || Array.isArray(e.children)) &&
                    (e.tags === void 0 || Array.isArray(e.tags))
                );
            }
            n.is = i;
        })(He || (He = {}));
        var Ke;
        (function (n) {
            (n.Empty = ''),
                (n.QuickFix = 'quickfix'),
                (n.Refactor = 'refactor'),
                (n.RefactorExtract = 'refactor.extract'),
                (n.RefactorInline = 'refactor.inline'),
                (n.RefactorRewrite = 'refactor.rewrite'),
                (n.Source = 'source'),
                (n.SourceOrganizeImports = 'source.organizeImports'),
                (n.SourceFixAll = 'source.fixAll');
        })(Ke || (Ke = {}));
        var Ue;
        (function (n) {
            function t(r, e) {
                var o = { diagnostics: r };
                return e != null && (o.only = e), o;
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    s.typedArray(e.diagnostics, J.is) &&
                    (e.only === void 0 || s.typedArray(e.only, s.string))
                );
            }
            n.is = i;
        })(Ue || (Ue = {}));
        var je;
        (function (n) {
            function t(r, e, o) {
                var a = { title: r },
                    u = !0;
                return (
                    typeof e == 'string'
                        ? ((u = !1), (a.kind = e))
                        : L.is(e)
                        ? (a.command = e)
                        : (a.edit = e),
                    u && o !== void 0 && (a.kind = o),
                    a
                );
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e &&
                    s.string(e.title) &&
                    (e.diagnostics === void 0 ||
                        s.typedArray(e.diagnostics, J.is)) &&
                    (e.kind === void 0 || s.string(e.kind)) &&
                    (e.edit !== void 0 || e.command !== void 0) &&
                    (e.command === void 0 || L.is(e.command)) &&
                    (e.isPreferred === void 0 || s.boolean(e.isPreferred)) &&
                    (e.edit === void 0 || ae.is(e.edit))
                );
            }
            n.is = i;
        })(je || (je = {}));
        var Oe;
        (function (n) {
            function t(r, e) {
                var o = { range: r };
                return s.defined(e) && (o.data = e), o;
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    v.is(e.range) &&
                    (s.undefined(e.command) || L.is(e.command))
                );
            }
            n.is = i;
        })(Oe || (Oe = {}));
        var Ne;
        (function (n) {
            function t(r, e) {
                return { tabSize: r, insertSpaces: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    s.uinteger(e.tabSize) &&
                    s.boolean(e.insertSpaces)
                );
            }
            n.is = i;
        })(Ne || (Ne = {}));
        var Ve;
        (function (n) {
            function t(r, e, o) {
                return { range: r, target: e, data: o };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    s.defined(e) &&
                    v.is(e.range) &&
                    (s.undefined(e.target) || s.string(e.target))
                );
            }
            n.is = i;
        })(Ve || (Ve = {}));
        var ze;
        (function (n) {
            function t(r, e) {
                return { range: r, parent: e };
            }
            n.create = t;
            function i(r) {
                var e = r;
                return (
                    e !== void 0 &&
                    v.is(e.range) &&
                    (e.parent === void 0 || n.is(e.parent))
                );
            }
            n.is = i;
        })(ze || (ze = {}));
        var Xe;
        (function (n) {
            function t(o, a, u, l) {
                return new fn(o, a, u, l);
            }
            n.create = t;
            function i(o) {
                var a = o;
                return !!(
                    s.defined(a) &&
                    s.string(a.uri) &&
                    (s.undefined(a.languageId) || s.string(a.languageId)) &&
                    s.uinteger(a.lineCount) &&
                    s.func(a.getText) &&
                    s.func(a.positionAt) &&
                    s.func(a.offsetAt)
                );
            }
            n.is = i;
            function r(o, a) {
                for (
                    var u = o.getText(),
                        l = e(a, function (w, B) {
                            var ce = w.range.start.line - B.range.start.line;
                            return ce === 0
                                ? w.range.start.character -
                                      B.range.start.character
                                : ce;
                        }),
                        f = u.length,
                        g = l.length - 1;
                    g >= 0;
                    g--
                ) {
                    var h = l[g],
                        k = o.offsetAt(h.range.start),
                        c = o.offsetAt(h.range.end);
                    if (c <= f)
                        u =
                            u.substring(0, k) +
                            h.newText +
                            u.substring(c, u.length);
                    else throw new Error('Overlapping edit');
                    f = k;
                }
                return u;
            }
            n.applyEdits = r;
            function e(o, a) {
                if (o.length <= 1) return o;
                var u = (o.length / 2) | 0,
                    l = o.slice(0, u),
                    f = o.slice(u);
                e(l, a), e(f, a);
                for (var g = 0, h = 0, k = 0; g < l.length && h < f.length; ) {
                    var c = a(l[g], f[h]);
                    c <= 0 ? (o[k++] = l[g++]) : (o[k++] = f[h++]);
                }
                for (; g < l.length; ) o[k++] = l[g++];
                for (; h < f.length; ) o[k++] = f[h++];
                return o;
            }
        })(Xe || (Xe = {}));
        var fn = (function () {
                function n(t, i, r, e) {
                    (this._uri = t),
                        (this._languageId = i),
                        (this._version = r),
                        (this._content = e),
                        (this._lineOffsets = void 0);
                }
                return (
                    Object.defineProperty(n.prototype, 'uri', {
                        get: function () {
                            return this._uri;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(n.prototype, 'languageId', {
                        get: function () {
                            return this._languageId;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    Object.defineProperty(n.prototype, 'version', {
                        get: function () {
                            return this._version;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (n.prototype.getText = function (t) {
                        if (t) {
                            var i = this.offsetAt(t.start),
                                r = this.offsetAt(t.end);
                            return this._content.substring(i, r);
                        }
                        return this._content;
                    }),
                    (n.prototype.update = function (t, i) {
                        (this._content = t.text),
                            (this._version = i),
                            (this._lineOffsets = void 0);
                    }),
                    (n.prototype.getLineOffsets = function () {
                        if (this._lineOffsets === void 0) {
                            for (
                                var t = [], i = this._content, r = !0, e = 0;
                                e < i.length;
                                e++
                            ) {
                                r && (t.push(e), (r = !1));
                                var o = i.charAt(e);
                                (r =
                                    o === '\r' ||
                                    o ===
                                        `
`),
                                    o === '\r' &&
                                        e + 1 < i.length &&
                                        i.charAt(e + 1) ===
                                            `
` &&
                                        e++;
                            }
                            r && i.length > 0 && t.push(i.length),
                                (this._lineOffsets = t);
                        }
                        return this._lineOffsets;
                    }),
                    (n.prototype.positionAt = function (t) {
                        t = Math.max(Math.min(t, this._content.length), 0);
                        var i = this.getLineOffsets(),
                            r = 0,
                            e = i.length;
                        if (e === 0) return x.create(0, t);
                        for (; r < e; ) {
                            var o = Math.floor((r + e) / 2);
                            i[o] > t ? (e = o) : (r = o + 1);
                        }
                        var a = r - 1;
                        return x.create(a, t - i[a]);
                    }),
                    (n.prototype.offsetAt = function (t) {
                        var i = this.getLineOffsets();
                        if (t.line >= i.length) return this._content.length;
                        if (t.line < 0) return 0;
                        var r = i[t.line],
                            e =
                                t.line + 1 < i.length
                                    ? i[t.line + 1]
                                    : this._content.length;
                        return Math.max(Math.min(r + t.character, e), r);
                    }),
                    Object.defineProperty(n.prototype, 'lineCount', {
                        get: function () {
                            return this.getLineOffsets().length;
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    n
                );
            })(),
            s;
        (function (n) {
            var t = Object.prototype.toString;
            function i(c) {
                return typeof c < 'u';
            }
            n.defined = i;
            function r(c) {
                return typeof c > 'u';
            }
            n.undefined = r;
            function e(c) {
                return c === !0 || c === !1;
            }
            n.boolean = e;
            function o(c) {
                return t.call(c) === '[object String]';
            }
            n.string = o;
            function a(c) {
                return t.call(c) === '[object Number]';
            }
            n.number = a;
            function u(c, w, B) {
                return t.call(c) === '[object Number]' && w <= c && c <= B;
            }
            n.numberRange = u;
            function l(c) {
                return (
                    t.call(c) === '[object Number]' &&
                    -2147483648 <= c &&
                    c <= 2147483647
                );
            }
            n.integer = l;
            function f(c) {
                return (
                    t.call(c) === '[object Number]' && 0 <= c && c <= 2147483647
                );
            }
            n.uinteger = f;
            function g(c) {
                return t.call(c) === '[object Function]';
            }
            n.func = g;
            function h(c) {
                return c !== null && typeof c == 'object';
            }
            n.objectLiteral = h;
            function k(c, w) {
                return Array.isArray(c) && c.every(w);
            }
            n.typedArray = k;
        })(s || (s = {}));
        var $e = class {
            constructor(t, i, r) {
                this._languageId = t;
                this._worker = i;
                let e = (a) => {
                        let u = a.getLanguageId();
                        if (u !== this._languageId) return;
                        let l;
                        (this._listener[a.uri.toString()] =
                            a.onDidChangeContent(() => {
                                window.clearTimeout(l),
                                    (l = window.setTimeout(
                                        () => this._doValidate(a.uri, u),
                                        500
                                    ));
                            })),
                            this._doValidate(a.uri, u);
                    },
                    o = (a) => {
                        d.editor.setModelMarkers(a, this._languageId, []);
                        let u = a.uri.toString(),
                            l = this._listener[u];
                        l && (l.dispose(), delete this._listener[u]);
                    };
                this._disposables.push(d.editor.onDidCreateModel(e)),
                    this._disposables.push(d.editor.onWillDisposeModel(o)),
                    this._disposables.push(
                        d.editor.onDidChangeModelLanguage((a) => {
                            o(a.model), e(a.model);
                        })
                    ),
                    this._disposables.push(
                        r((a) => {
                            d.editor.getModels().forEach((u) => {
                                u.getLanguageId() === this._languageId &&
                                    (o(u), e(u));
                            });
                        })
                    ),
                    this._disposables.push({
                        dispose: () => {
                            d.editor.getModels().forEach(o);
                            for (let a in this._listener)
                                this._listener[a].dispose();
                        },
                    }),
                    d.editor.getModels().forEach(e);
            }
            _disposables = [];
            _listener = Object.create(null);
            dispose() {
                this._disposables.forEach((t) => t && t.dispose()),
                    (this._disposables.length = 0);
            }
            _doValidate(t, i) {
                this._worker(t)
                    .then((r) => r.doValidation(t.toString()))
                    .then((r) => {
                        let e = r.map((a) => hn(t, a)),
                            o = d.editor.getModel(t);
                        o &&
                            o.getLanguageId() === i &&
                            d.editor.setModelMarkers(o, i, e);
                    })
                    .then(void 0, (r) => {
                        console.error(r);
                    });
            }
        };
        function mn(n) {
            switch (n) {
                case b.Error:
                    return d.MarkerSeverity.Error;
                case b.Warning:
                    return d.MarkerSeverity.Warning;
                case b.Information:
                    return d.MarkerSeverity.Info;
                case b.Hint:
                    return d.MarkerSeverity.Hint;
                default:
                    return d.MarkerSeverity.Info;
            }
        }
        function hn(n, t) {
            let i = typeof t.code == 'number' ? String(t.code) : t.code;
            return {
                severity: mn(t.severity),
                startLineNumber: t.range.start.line + 1,
                startColumn: t.range.start.character + 1,
                endLineNumber: t.range.end.line + 1,
                endColumn: t.range.end.character + 1,
                message: t.message,
                code: i,
                source: t.source,
            };
        }
        var te = class {
            constructor(t, i) {
                this._worker = t;
                this._triggerCharacters = i;
            }
            get triggerCharacters() {
                return this._triggerCharacters;
            }
            provideCompletionItems(t, i, r, e) {
                let o = t.uri;
                return this._worker(o)
                    .then((a) => a.doComplete(o.toString(), C(i)))
                    .then((a) => {
                        if (!a) return;
                        let u = t.getWordUntilPosition(i),
                            l = new d.Range(
                                i.lineNumber,
                                u.startColumn,
                                i.lineNumber,
                                u.endColumn
                            ),
                            f = a.items.map((g) => {
                                let h = {
                                    label: g.label,
                                    insertText: g.insertText || g.label,
                                    sortText: g.sortText,
                                    filterText: g.filterText,
                                    documentation: g.documentation,
                                    detail: g.detail,
                                    command: yn(g.command),
                                    range: l,
                                    kind: Tn(g.kind),
                                };
                                return (
                                    g.textEdit &&
                                        (vn(g.textEdit)
                                            ? (h.range = {
                                                  insert: y(g.textEdit.insert),
                                                  replace: y(
                                                      g.textEdit.replace
                                                  ),
                                              })
                                            : (h.range = y(g.textEdit.range)),
                                        (h.insertText = g.textEdit.newText)),
                                    g.additionalTextEdits &&
                                        (h.additionalTextEdits =
                                            g.additionalTextEdits.map(D)),
                                    g.insertTextFormat === ee.Snippet &&
                                        (h.insertTextRules =
                                            d.languages.CompletionItemInsertTextRule.InsertAsSnippet),
                                    h
                                );
                            });
                        return { isIncomplete: a.isIncomplete, suggestions: f };
                    });
            }
        };
        function C(n) {
            if (!!n) return { character: n.column - 1, line: n.lineNumber - 1 };
        }
        function ue(n) {
            if (!!n)
                return {
                    start: {
                        line: n.startLineNumber - 1,
                        character: n.startColumn - 1,
                    },
                    end: {
                        line: n.endLineNumber - 1,
                        character: n.endColumn - 1,
                    },
                };
        }
        function y(n) {
            if (!!n)
                return new d.Range(
                    n.start.line + 1,
                    n.start.character + 1,
                    n.end.line + 1,
                    n.end.character + 1
                );
        }
        function vn(n) {
            return typeof n.insert < 'u' && typeof n.replace < 'u';
        }
        function Tn(n) {
            let t = d.languages.CompletionItemKind;
            switch (n) {
                case p.Text:
                    return t.Text;
                case p.Method:
                    return t.Method;
                case p.Function:
                    return t.Function;
                case p.Constructor:
                    return t.Constructor;
                case p.Field:
                    return t.Field;
                case p.Variable:
                    return t.Variable;
                case p.Class:
                    return t.Class;
                case p.Interface:
                    return t.Interface;
                case p.Module:
                    return t.Module;
                case p.Property:
                    return t.Property;
                case p.Unit:
                    return t.Unit;
                case p.Value:
                    return t.Value;
                case p.Enum:
                    return t.Enum;
                case p.Keyword:
                    return t.Keyword;
                case p.Snippet:
                    return t.Snippet;
                case p.Color:
                    return t.Color;
                case p.File:
                    return t.File;
                case p.Reference:
                    return t.Reference;
            }
            return t.Property;
        }
        function D(n) {
            if (!!n) return { range: y(n.range), text: n.newText };
        }
        function yn(n) {
            return n && n.command === 'editor.action.triggerSuggest'
                ? { id: n.command, title: n.title, arguments: n.arguments }
                : void 0;
        }
        var H = class {
            constructor(t) {
                this._worker = t;
            }
            provideHover(t, i, r) {
                let e = t.uri;
                return this._worker(e)
                    .then((o) => o.doHover(e.toString(), C(i)))
                    .then((o) => {
                        if (!!o)
                            return {
                                range: y(o.range),
                                contents: kn(o.contents),
                            };
                    });
            }
        };
        function xn(n) {
            return n && typeof n == 'object' && typeof n.kind == 'string';
        }
        function Be(n) {
            return typeof n == 'string'
                ? { value: n }
                : xn(n)
                ? n.kind === 'plaintext'
                    ? {
                          value: n.value.replace(
                              /[\\`*_{}[\]()#+\-.!]/g,
                              '\\$&'
                          ),
                      }
                    : { value: n.value }
                : {
                      value:
                          '```' +
                          n.language +
                          `
` +
                          n.value +
                          '\n```\n',
                  };
        }
        function kn(n) {
            if (!!n) return Array.isArray(n) ? n.map(Be) : [Be(n)];
        }
        var K = class {
            constructor(t) {
                this._worker = t;
            }
            provideDocumentHighlights(t, i, r) {
                let e = t.uri;
                return this._worker(e)
                    .then((o) => o.findDocumentHighlights(e.toString(), C(i)))
                    .then((o) => {
                        if (!!o)
                            return o.map((a) => ({
                                range: y(a.range),
                                kind: In(a.kind),
                            }));
                    });
            }
        };
        function In(n) {
            switch (n) {
                case W.Read:
                    return d.languages.DocumentHighlightKind.Read;
                case W.Write:
                    return d.languages.DocumentHighlightKind.Write;
                case W.Text:
                    return d.languages.DocumentHighlightKind.Text;
            }
            return d.languages.DocumentHighlightKind.Text;
        }
        var qe = class {
            constructor(t) {
                this._worker = t;
            }
            provideDefinition(t, i, r) {
                let e = t.uri;
                return this._worker(e)
                    .then((o) => o.findDefinition(e.toString(), C(i)))
                    .then((o) => {
                        if (!!o) return [Qe(o)];
                    });
            }
        };
        function Qe(n) {
            return { uri: d.Uri.parse(n.uri), range: y(n.range) };
        }
        var Ge = class {
                constructor(t) {
                    this._worker = t;
                }
                provideReferences(t, i, r, e) {
                    let o = t.uri;
                    return this._worker(o)
                        .then((a) => a.findReferences(o.toString(), C(i)))
                        .then((a) => {
                            if (!!a) return a.map(Qe);
                        });
                }
            },
            U = class {
                constructor(t) {
                    this._worker = t;
                }
                provideRenameEdits(t, i, r, e) {
                    let o = t.uri;
                    return this._worker(o)
                        .then((a) => a.doRename(o.toString(), C(i), r))
                        .then((a) => _n(a));
                }
            };
        function _n(n) {
            if (!n || !n.changes) return;
            let t = [];
            for (let i in n.changes) {
                let r = d.Uri.parse(i);
                for (let e of n.changes[i])
                    t.push({
                        resource: r,
                        edit: { range: y(e.range), text: e.newText },
                    });
            }
            return { edits: t };
        }
        var j = class {
            constructor(t) {
                this._worker = t;
            }
            provideDocumentSymbols(t, i) {
                let r = t.uri;
                return this._worker(r)
                    .then((e) => e.findDocumentSymbols(r.toString()))
                    .then((e) => {
                        if (!!e)
                            return e.map((o) => ({
                                name: o.name,
                                detail: '',
                                containerName: o.containerName,
                                kind: Cn(o.kind),
                                range: y(o.location.range),
                                selectionRange: y(o.location.range),
                                tags: [],
                            }));
                    });
            }
        };
        function Cn(n) {
            let t = d.languages.SymbolKind;
            switch (n) {
                case m.File:
                    return t.Array;
                case m.Module:
                    return t.Module;
                case m.Namespace:
                    return t.Namespace;
                case m.Package:
                    return t.Package;
                case m.Class:
                    return t.Class;
                case m.Method:
                    return t.Method;
                case m.Property:
                    return t.Property;
                case m.Field:
                    return t.Field;
                case m.Constructor:
                    return t.Constructor;
                case m.Enum:
                    return t.Enum;
                case m.Interface:
                    return t.Interface;
                case m.Function:
                    return t.Function;
                case m.Variable:
                    return t.Variable;
                case m.Constant:
                    return t.Constant;
                case m.String:
                    return t.String;
                case m.Number:
                    return t.Number;
                case m.Boolean:
                    return t.Boolean;
                case m.Array:
                    return t.Array;
            }
            return t.Function;
        }
        var O = class {
                constructor(t) {
                    this._worker = t;
                }
                provideLinks(t, i) {
                    let r = t.uri;
                    return this._worker(r)
                        .then((e) => e.findDocumentLinks(r.toString()))
                        .then((e) => {
                            if (!!e)
                                return {
                                    links: e.map((o) => ({
                                        range: y(o.range),
                                        url: o.target,
                                    })),
                                };
                        });
                }
            },
            N = class {
                constructor(t) {
                    this._worker = t;
                }
                provideDocumentFormattingEdits(t, i, r) {
                    let e = t.uri;
                    return this._worker(e).then((o) =>
                        o.format(e.toString(), null, Je(i)).then((a) => {
                            if (!(!a || a.length === 0)) return a.map(D);
                        })
                    );
                }
            },
            V = class {
                constructor(t) {
                    this._worker = t;
                }
                provideDocumentRangeFormattingEdits(t, i, r, e) {
                    let o = t.uri;
                    return this._worker(o).then((a) =>
                        a.format(o.toString(), ue(i), Je(r)).then((u) => {
                            if (!(!u || u.length === 0)) return u.map(D);
                        })
                    );
                }
            };
        function Je(n) {
            return { tabSize: n.tabSize, insertSpaces: n.insertSpaces };
        }
        var Ye = class {
                constructor(t) {
                    this._worker = t;
                }
                provideDocumentColors(t, i) {
                    let r = t.uri;
                    return this._worker(r)
                        .then((e) => e.findDocumentColors(r.toString()))
                        .then((e) => {
                            if (!!e)
                                return e.map((o) => ({
                                    color: o.color,
                                    range: y(o.range),
                                }));
                        });
                }
                provideColorPresentations(t, i, r) {
                    let e = t.uri;
                    return this._worker(e)
                        .then((o) =>
                            o.getColorPresentations(
                                e.toString(),
                                i.color,
                                ue(i.range)
                            )
                        )
                        .then((o) => {
                            if (!!o)
                                return o.map((a) => {
                                    let u = { label: a.label };
                                    return (
                                        a.textEdit &&
                                            (u.textEdit = D(a.textEdit)),
                                        a.additionalTextEdits &&
                                            (u.additionalTextEdits =
                                                a.additionalTextEdits.map(D)),
                                        u
                                    );
                                });
                        });
                }
            },
            z = class {
                constructor(t) {
                    this._worker = t;
                }
                provideFoldingRanges(t, i, r) {
                    let e = t.uri;
                    return this._worker(e)
                        .then((o) => o.getFoldingRanges(e.toString(), i))
                        .then((o) => {
                            if (!!o)
                                return o.map((a) => {
                                    let u = {
                                        start: a.startLine + 1,
                                        end: a.endLine + 1,
                                    };
                                    return (
                                        typeof a.kind < 'u' &&
                                            (u.kind = bn(a.kind)),
                                        u
                                    );
                                });
                        });
                }
            };
        function bn(n) {
            switch (n) {
                case P.Comment:
                    return d.languages.FoldingRangeKind.Comment;
                case P.Imports:
                    return d.languages.FoldingRangeKind.Imports;
                case P.Region:
                    return d.languages.FoldingRangeKind.Region;
            }
        }
        var X = class {
            constructor(t) {
                this._worker = t;
            }
            provideSelectionRanges(t, i, r) {
                let e = t.uri;
                return this._worker(e)
                    .then((o) => o.getSelectionRanges(e.toString(), i.map(C)))
                    .then((o) => {
                        if (!!o)
                            return o.map((a) => {
                                let u = [];
                                for (; a; )
                                    u.push({ range: y(a.range) }),
                                        (a = a.parent);
                                return u;
                            });
                    });
            }
        };
        var de = class extends te {
            constructor(t) {
                super(t, ['.', ':', '<', '"', '=', '/']);
            }
        };
        function En(n) {
            let t = new E(n),
                i = (...e) => t.getLanguageServiceWorker(...e),
                r = n.languageId;
            d.languages.registerCompletionItemProvider(r, new de(i)),
                d.languages.registerHoverProvider(r, new H(i)),
                d.languages.registerDocumentHighlightProvider(r, new K(i)),
                d.languages.registerLinkProvider(r, new O(i)),
                d.languages.registerFoldingRangeProvider(r, new z(i)),
                d.languages.registerDocumentSymbolProvider(r, new j(i)),
                d.languages.registerSelectionRangeProvider(r, new X(i)),
                d.languages.registerRenameProvider(r, new U(i)),
                r === 'html' &&
                    (d.languages.registerDocumentFormattingEditProvider(
                        r,
                        new N(i)
                    ),
                    d.languages.registerDocumentRangeFormattingEditProvider(
                        r,
                        new V(i)
                    ));
        }
        function Rn(n) {
            let t = [],
                i = [],
                r = new E(n);
            t.push(r);
            let e = (...a) => r.getLanguageServiceWorker(...a);
            function o() {
                let { languageId: a, modeConfiguration: u } = n;
                en(i),
                    u.completionItems &&
                        i.push(
                            d.languages.registerCompletionItemProvider(
                                a,
                                new de(e)
                            )
                        ),
                    u.hovers &&
                        i.push(d.languages.registerHoverProvider(a, new H(e))),
                    u.documentHighlights &&
                        i.push(
                            d.languages.registerDocumentHighlightProvider(
                                a,
                                new K(e)
                            )
                        ),
                    u.links &&
                        i.push(d.languages.registerLinkProvider(a, new O(e))),
                    u.documentSymbols &&
                        i.push(
                            d.languages.registerDocumentSymbolProvider(
                                a,
                                new j(e)
                            )
                        ),
                    u.rename &&
                        i.push(d.languages.registerRenameProvider(a, new U(e))),
                    u.foldingRanges &&
                        i.push(
                            d.languages.registerFoldingRangeProvider(
                                a,
                                new z(e)
                            )
                        ),
                    u.selectionRanges &&
                        i.push(
                            d.languages.registerSelectionRangeProvider(
                                a,
                                new X(e)
                            )
                        ),
                    u.documentFormattingEdits &&
                        i.push(
                            d.languages.registerDocumentFormattingEditProvider(
                                a,
                                new N(e)
                            )
                        ),
                    u.documentRangeFormattingEdits &&
                        i.push(
                            d.languages.registerDocumentRangeFormattingEditProvider(
                                a,
                                new V(e)
                            )
                        );
            }
            return o(), t.push(Ze(i)), Ze(t);
        }
        function Ze(n) {
            return { dispose: () => en(n) };
        }
        function en(n) {
            for (; n.length; ) n.pop().dispose();
        }
        return cn(Pn);
    })();
    return moduleExports;
});
