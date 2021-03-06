!function(e, a) {
    for (var i in a) e[i] = a[i];
}(window, function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports;
    }
    var installedModules = {};
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "https://www.paypalobjects.com/api/";
    return __webpack_require__(__webpack_require__.s = "./src/loader/index.js");
}({
    "./src/loader/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _interface = __webpack_require__("./src/loader/interface.js");
        !function(xports) {
            for (var namespaces = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], childnamespaces = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], _iterator = namespaces, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var name = _ref, namespace = window[name];
                if (namespace) for (var _iterator3 = childnamespaces, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _extends2, _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var childname = _ref3, childnamespace = xports[childname];
                    namespace[childname] && (childnamespace = _extends({}, namespace[childname], childnamespace));
                    xports = _extends({}, namespace, xports, (_extends2 = {}, _extends2[childname] = childnamespace, 
                    _extends2));
                }
            }
            for (var _iterator2 = namespaces, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var _name = _ref2;
                window[_name] = xports;
            }
        }(_interface, [ "paypal" ]);
    },
    "./src/loader/interface.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isCheckoutXComponent() {
            if (window.name) {
                var seg = window.name.split(config.name_separator);
                if (seg[0] === config.xcomponent && seg[1] === config.ppcheckout) return !0;
            }
            return !1;
        }
        function getVersion() {
            if (!isCheckoutXComponent()) throw new Error("Can not get version for non-xcomponent");
            return window.name.split(config.name_separator)[2].replace(/_/g, ".");
        }
        function isLatest() {
            if (!isCheckoutXComponent()) return !1;
            var version = getVersion();
            return Boolean(version === config.major_version || version === config.latest_version);
        }
        function loadScript(url, prop, attrs, callback) {
            if (window[prop]) return callback(null, window[prop]);
            var container = document.body || document.head;
            if (!container) return callback(new Error("Can not find container to insert script into"));
            var script = document.createElement("script");
            script.src = url;
            script.onload = function() {
                return window[prop] ? callback(null, window[prop]) : callback(new Error("Expected " + prop + " to be present on window"));
            };
            script.onerror = function(err) {
                return callback(err);
            };
            for (var _iterator = Object.keys(attrs), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var attr = _ref;
                script.setAttribute(attr, attrs[attr]);
            }
            container.appendChild(script);
        }
        function warn() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            var message = args.join(" ");
            window.console && window.console.warn ? window.console.warn(message) : window.console && window.console.log && window.console.log(message);
        }
        function parseQuery() {
            var queryString = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.search, params = {};
            queryString && 0 === queryString.indexOf("?") && (queryString = queryString.slice(1));
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
            for (var _iterator2 = queryString.split("&"), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var pair = _ref2;
                pair = pair.split("=");
                pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        }
        function onLoadCheckoutIntegration(callback) {
            return integrationResponder.listen(callback);
        }
        function getIntegrationURLs() {
            return {
                latest: isLatest(),
                major: config.checkoutjs_url.replace("{version}", ""),
                minor: config.checkoutjs_url.replace("{version}", "." + getVersion())
            };
        }
        function getIntegrationProps() {
            var props = _extends({}, config.script_props), query = parseQuery();
            query.env && (props["data-env"] = query.env);
            query.stage && (props["data-stage"] = query.stage);
            return props;
        }
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var config = {
            checkoutjs_url: "https://www.paypalobjects.com/api/checkout{version}.js",
            major_version: "4",
            latest_version: "latest",
            xcomponent: "xcomponent",
            ppcheckout: "ppcheckout",
            xchild_global: "xchild",
            name_separator: "__",
            script_props: {
                "data-paypal-checkout": "",
                "data-no-bridge": "",
                "data-state": "ppxo_checkout"
            }
        }, _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, integrationResponder = function() {
            function flush() {
                if (loaded) for (;callbacks.length; ) callbacks.shift()(err, res);
            }
            function respond(error, result) {
                loaded = !0;
                err = error;
                res = result;
                flush();
            }
            function listen(callback) {
                callbacks.push(callback);
                flush();
            }
            var callbacks = [], loaded = !1, err = void 0, res = void 0;
            return {
                respond: respond,
                listen: listen
            };
        }();
        !function(callback) {
            if (!isCheckoutXComponent()) return callback(null, null);
            var urls = getIntegrationURLs(), props = getIntegrationProps();
            loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, props, function(err, result) {
                return err && !urls.latest ? loadScript(urls.major + "?t=" + Date.now(), config.xchild_global, props, callback) : callback(err, result);
            });
        }(function(err, result) {
            err && warn("Failed to load checkout.js", err.stack || err.toString());
            if (err || result) return integrationResponder.respond(err, result);
        });
        __webpack_require__.d(__webpack_exports__, "onLoadCheckoutIntegration", function() {
            return onLoadCheckoutIntegration;
        });
        __webpack_require__.d(__webpack_exports__, "isCheckoutXComponent", function() {
            return isCheckoutXComponent;
        });
    }
}));
//# sourceMappingURL=checkout.child.loader.js.map