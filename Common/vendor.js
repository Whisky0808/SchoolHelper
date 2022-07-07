(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"learningDemo01","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"learningDemo01","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"learningDemo01","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"learningDemo01","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"learningDemo01","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 33:
/*!*************************************************************************!*\
  !*** D:/HB-builder-project/demo01/learningDemo01/pages/js/allSchool.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * Created by admin on 2020/2/16.
                                                                                                      */
var province = [
["00", "北京市"],
["01", "重庆市"],
["02", "福建省"],
["03", "江苏省"],
["04", "广东省"],
["05", "辽宁省"],
["06", "内蒙古"],
["07", "山西省"],
["08", "青海省"],
["09", "四川省"],
["10", "贵州省"],
["11", "云南省"],
["12", "陕西省"],
["13", "西藏"],
["14", "宁夏"],
["15", "新疆"],
["16", "广西"],
["17", "海南省"],
["18", "湖南省"],
["19", "湖北省"],
["20", "河南省"],
["21", "山东省"],
["22", "江西省"],
["23", "安徽省"],
["24", "浙江省"],
["25", "上海市"],
["26", "黑龙江省"],
["27", "吉林省"],
["28", "甘肃省"],
["29", "天津市"],
["30", "河北省"]];

var city = {
  "28": [
  ["000", "张掖市"],
  ["001", "武威市"],
  ["002", "天水市"],
  ["003", "庆阳市"],
  ["004", "平凉市"],
  ["005", "陇南市"],
  ["006", "临夏州"],
  ["007", "兰州市"],
  ["008", "酒泉市"],
  ["009", "金昌市"],
  ["010", "嘉峪关市"],
  ["011", "甘南藏族自治州"],
  ["012", "定西市"],
  ["013", "白银市"]],

  "01": [
  ["014", "重庆市"]],

  "02": [
  ["015", "漳州市"],
  ["016", "厦门市"],
  ["017", "三明市"],
  ["018", "泉州市"],
  ["019", "莆田市"],
  ["020", "宁德市"],
  ["021", "南平市"],
  ["022", "龙岩市"],
  ["023", "福州市"]],

  "03": [
  ["024", "镇江市"],
  ["025", "张家港市"],
  ["026", "扬州市"],
  ["027", "盐城市"],
  ["028", "徐州市"],
  ["029", "宿迁市"],
  ["030", "无锡市"],
  ["031", "泰州市"],
  ["032", "苏州市"],
  ["033", "南通市"],
  ["034", "南京市"],
  ["035", "连云港市"],
  ["036", "淮安市"],
  ["037", "常州市"]],

  "04": [
  ["038", "珠海市"],
  ["039", "中山市"],
  ["040", "肇庆市"],
  ["041", "湛江市"],
  ["042", "云浮市"],
  ["043", "阳江市"],
  ["044", "深圳市"],
  ["045", "韶关市"],
  ["046", "汕尾市"],
  ["047", "汕头市"],
  ["048", "清远市"],
  ["049", "梅州市"],
  ["050", "茂名市"],
  ["051", "揭阳市"],
  ["052", "江门市"],
  ["053", "惠州市"],
  ["054", "河源市"],
  ["055", "广州市"],
  ["056", "佛山市"],
  ["057", "东莞市"],
  ["058", "潮州市"]],

  "05": [
  ["059", "营口市"],
  ["060", "铁岭市"],
  ["061", "沈阳市"],
  ["062", "盘锦市"],
  ["063", "辽阳市"],
  ["064", "锦州市"],
  ["065", "葫芦岛市"],
  ["066", "阜新市"],
  ["067", "抚顺市"],
  ["068", "丹东市"],
  ["069", "大连市"],
  ["070", "朝阳市"],
  ["071", "本溪市"],
  ["072", "鞍山市"]],

  "06": [
  ["073", "兴安盟"],
  ["074", "锡林郭勒盟"],
  ["075", "乌兰察布市"],
  ["076", "乌海市"],
  ["077", "通辽市"],
  ["078", "呼伦贝尔市"],
  ["079", "呼和浩特市"],
  ["080", "鄂尔多斯市"],
  ["081", "赤峰市"],
  ["082", "包头市"],
  ["083", "巴彦淖尔市"],
  ["084", "阿拉善盟"]],

  "07": [
  ["085", "长治市"],
  ["086", "运城市"],
  ["087", "阳泉市"],
  ["088", "忻州市"],
  ["089", "太原市"],
  ["090", "朔州市"],
  ["091", "吕梁市"],
  ["092", "临汾市"],
  ["093", "晋中市"],
  ["094", "晋城市"],
  ["095", "大同市"]],

  "08": [
  ["096", "西宁市"],
  ["097", "海东市"],
  ["098", "海西蒙古族藏族自治州"]],

  "09": [
  ["099", "自贡市"],
  ["100", "资阳市"],
  ["101", "宜宾市"],
  ["102", "雅安市"],
  ["103", "遂宁市"],
  ["104", "攀枝花市"],
  ["105", "内江市"],
  ["106", "南充市"],
  ["107", "绵阳市"],
  ["108", "眉山市"],
  ["109", "泸州市"],
  ["110", "凉山州"],
  ["111", "凉山彝族自治州"],
  ["112", "乐山市"],
  ["113", "广元市"],
  ["114", "广安市"],
  ["115", "甘孜藏族自治州"],
  ["116", "德阳市"],
  ["117", "达州市"],
  ["118", "成都市"],
  ["119", "巴中市"],
  ["120", "阿坝藏族羌族自治州"]],

  "10": [
  ["121", "贵阳市"],
  ["122", "遵义市"],
  ["123", "铜仁市"],
  ["124", "黔西南布依族苗族自治州"],
  ["125", "黔南布依族苗族自治州"],
  ["126", "黔东南苗族侗族自治州"],
  ["127", "六盘水市"],
  ["128", "毕节市"],
  ["129", "安顺市"]],

  "11": [
  ["130", "昭通市"],
  ["131", "玉溪市"],
  ["132", "西双版纳傣族自治州"],
  ["133", "文山壮族苗族自治州"],
  ["134", "曲靖市"],
  ["135", "普洱市"],
  ["136", "临沧市"],
  ["137", "丽江市"],
  ["138", "昆明市"],
  ["139", "红河哈尼族彝族自治州"],
  ["140", "德宏傣族景颇族自治州"],
  ["141", "大理白族自治州"],
  ["142", "楚雄彝族自治州"],
  ["143", "保山市"]],

  "12": [
  ["144", "榆林市"],
  ["145", "延安市"],
  ["146", "咸阳市"],
  ["147", "西安市"],
  ["148", "渭南市"],
  ["149", "铜川市"],
  ["150", "商洛市"],
  ["151", "汉中市"],
  ["152", "宝鸡市"],
  ["153", "安康市"]],

  "13": [
  ["154", "咸阳市"],
  ["155", "拉萨市"]],

  "14": [
  ["156", "银川市"],
  ["157", "吴忠市"],
  ["158", "石嘴山市"],
  ["159", "固原市"]],

  "15": [
  ["160", "乌鲁木齐市"],
  ["161", "阿拉尔市"],
  ["162", "伊犁哈萨克自治州"],
  ["163", "五家渠市"],
  ["164", "吐鲁番市"],
  ["165", "石河子市"],
  ["166", "克拉玛依市"],
  ["167", "喀什地区"],
  ["168", "和田地区"],
  ["169", "哈密市"],
  ["170", "昌吉回族自治州"],
  ["171", "巴音郭楞蒙古自治州"],
  ["172", "阿克苏地区"]],

  "16": [
  ["173", "玉林市"],
  ["174", "梧州市"],
  ["175", "钦州市"],
  ["176", "南宁市"],
  ["177", "柳州市"],
  ["178", "来宾市"],
  ["179", "贺州市"],
  ["180", "河池市"],
  ["181", "桂林市"],
  ["182", "崇左市"],
  ["183", "北海市"],
  ["184", "百色市"]],

  "17": [
  ["185", "文昌市"],
  ["186", "三亚市"],
  ["187", "琼海市"],
  ["188", "海口市"]],

  "18": [
  ["189", "株洲市"],
  ["190", "长沙市"],
  ["191", "张家界市"],
  ["192", "岳阳市"],
  ["193", "永州市"],
  ["194", "益阳市"],
  ["195", "湘西土家族苗族自治州"],
  ["196", "湘潭市"],
  ["197", "邵阳市"],
  ["198", "娄底市"],
  ["199", "怀化市"],
  ["200", "衡阳市"],
  ["201", "郴州市"],
  ["202", "常德市"]],

  "19": [
  ["203", "宜昌市"],
  ["204", "孝感市"],
  ["205", "襄阳市"],
  ["206", "咸宁市"],
  ["207", "仙桃市"],
  ["208", "武汉市"],
  ["209", "天门市"],
  ["210", "随州市"],
  ["211", "十堰市"],
  ["212", "潜江市"],
  ["213", "荆州市"],
  ["214", "荆门市"],
  ["215", "黄石市"],
  ["216", "黄冈市"],
  ["217", "恩施土家族苗族自治州"],
  ["218", "鄂州市"]],

  "20": [
  ["220", "驻马店市"],
  ["221", "周口市"],
  ["222", "郑州市"],
  ["223", "许昌市"],
  ["224", "信阳市"],
  ["225", "新乡市"],
  ["227", "商丘市"],
  ["228", "三门峡市"],
  ["229", "濮阳市"],
  ["230", "平顶山市"],
  ["231", "南阳市"],
  ["232", "漯河市"],
  ["233", "洛阳市"],
  ["234", "开封市"],
  ["235", "焦作市"],
  ["236", "济源市"],
  ["237", "鹤壁市"],
  ["238", "安阳市"]],

  "21": [
  ["239", "淄博市"],
  ["240", "枣庄市"],
  ["241", "烟台市"],
  ["242", "潍坊市"],
  ["243", "威海市"],
  ["244", "泰安市"],
  ["245", "日照市"],
  ["246", "青岛市"],
  ["247", "临沂市"],
  ["248", "聊城市"],
  ["249", "莱芜市"],
  ["250", "济宁市"],
  ["251", "济南市"],
  ["252", "菏泽市"],
  ["253", "东营市"],
  ["254", "德州市"],
  ["255", "滨州市"]],

  "22": [
  ["256", "鹰潭市"],
  ["257", "宜春市"],
  ["258", "新余市"],
  ["259", "上饶市"],
  ["260", "萍乡市"],
  ["261", "南昌市"],
  ["262", "九江市"],
  ["263", "景德镇市"],
  ["264", "吉安市"],
  ["265", "赣州市"],
  ["266", "抚州市"]],

  "23": [
  ["267", "宣城市"],
  ["268", "宿州市"],
  ["269", "芜湖市"],
  ["270", "铜陵市"],
  ["271", "马鞍山市"],
  ["272", "六安市"],
  ["273", "黄山市"],
  ["274", "淮南市"],
  ["275", "淮北市"],
  ["276", "合肥市"],
  ["277", "阜阳市"],
  ["278", "滁州市"],
  ["279", "池州市"],
  ["280", "亳州市"],
  ["281", "蚌埠市"],
  ["282", "安庆市"]],

  "24": [
  ["283", "舟山市"],
  ["284", "温州市"],
  ["285", "台州市"],
  ["286", "绍兴市"],
  ["287", "衢州市"],
  ["288", "宁波市"],
  ["289", "丽水市"],
  ["290", "金华市"],
  ["291", "嘉兴市"],
  ["292", "湖州市"],
  ["293", "杭州市"]],

  "25": [
  ["294", "上海市"]],

  "26": [
  ["295", "伊春市"],
  ["296", "绥化市"],
  ["297", "双鸭山市"],
  ["298", "齐齐哈尔市"],
  ["299", "七台河市"],
  ["300", "牡丹江市"],
  ["301", "佳木斯市"],
  ["302", "鸡西市"],
  ["303", "黑河市"],
  ["304", "鹤岗市"],
  ["305", "哈尔滨市"],
  ["306", "大兴安岭地区"],
  ["307", "大庆市"]],

  "27": [
  ["308", "长春市"],
  ["309", "延边朝鲜族自治州"],
  ["310", "通化市"],
  ["311", "松原市"],
  ["312", "四平市"],
  ["313", "辽源市"],
  ["314", "吉林市"],
  ["315", "白山市"],
  ["316", "白城市"]],

  "00": [
  ["317", "北京市"]],

  "29": [
  ["318", "天津市"]],

  "30": [
  ["319", "张家口市"],
  ["320", "邢台市"],
  ["322", "唐山市"],
  ["323", "石家庄市"],
  ["324", "秦皇岛市"],
  ["325", "廊坊市"],
  ["326", "衡水市"],
  ["327", "邯郸市"],
  ["328", "承德市"],
  ["329", "沧州市"],
  ["330", "保定市"]] };


var allschool = {
  "000": [
  [0, 0, "河西学院"]],

  "001": [
  [1, 0, "武威职业学院"],
  [1, 0, "甘肃畜牧工程职业技术学院"]],

  "002": [
  [0, 0, "天水师范学院"],
  [1, 0, "甘肃林业职业技术学院"],
  [1, 0, "甘肃工业职业技术学院"],
  [1, 0, "甘肃机电职业技术学院"]],

  "003": [
  [0, 0, "陇东学院"],
  [1, 0, "庆阳职业技术学院"]],

  "004": [
  [0, 0, "甘肃医学院"],
  [1, 0, "平凉职业技术学院"]],

  "005": [
  [1, 0, "陇南师范高等专科学校"]],

  "006": [
  [1, 0, "临夏现代职业学院"]],

  "007": [
  [0, 0, "兰州大学"],
  [0, 0, "兰州理工大学"],
  [0, 0, "兰州交通大学"],
  [0, 0, "甘肃农业大学"],
  [0, 0, "甘肃中医药大学"],
  [0, 0, "西北师范大学"],
  [0, 0, "兰州城市学院"],
  [0, 0, "兰州财经大学"],
  [0, 0, "西北民族大学"],
  [0, 0, "甘肃政法学院"],
  [0, 0, "兰州文理学院"],
  [0, 0, "兰州工业学院"],
  [0, 1, "西北师范大学知行学院"],
  [0, 1, "兰州财经大学陇桥学院"],
  [0, 1, "兰州财经大学长青学院"],
  [0, 1, "兰州交通大学博文学院"],
  [0, 1, "兰州理工大学技术工程学院"],
  [1, 0, "兰州石化职业技术学院"],
  [1, 0, "甘肃建筑职业技术学院"],
  [1, 1, "兰州外语职业学院"],
  [1, 0, "兰州职业技术学院"],
  [1, 0, "甘肃警察职业学院"],
  [1, 0, "甘肃交通职业技术学院"],
  [1, 0, "兰州资源环境职业技术学院"],
  [1, 0, "甘肃农业职业技术学院"],
  [1, 0, "甘肃卫生职业学院"],
  [1, 1, "兰州科技职业学院"],
  [1, 0, "甘肃能源化工职业学院"],
  [1, 0, "兰州现代职业学院"],
  [1, 0, "甘肃财贸职业学院"]],

  "008": [
  [1, 0, "酒泉职业技术学院"]],

  "009": [
  [1, 0, "甘肃有色冶金职业技术学院"]],

  "010": [
  [1, 0, "甘肃钢铁职业技术学院"]],

  "011": [
  [0, 0, "甘肃民族师范学院"]],

  "012": [
  [1, 0, "定西师范高等专科学校"]],

  "013": [
  [1, 0, "白银矿冶职业技术学院"]],

  "014": [
  [0, 0, "重庆大学"],
  [0, 0, "重庆邮电大学"],
  [0, 0, "重庆交通大学"],
  [0, 0, "重庆医科大学"],
  [0, 0, "西南大学"],
  [0, 0, "重庆师范大学"],
  [0, 0, "重庆文理学院"],
  [0, 0, "重庆三峡学院"],
  [0, 0, "长江师范学院"],
  [0, 0, "四川外国语大学"],
  [0, 0, "西南政法大学"],
  [0, 0, "四川美术学院"],
  [0, 0, "重庆科技学院"],
  [0, 0, "重庆理工大学"],
  [0, 0, "重庆工商大学"],
  [0, 1, "重庆工程学院"],
  [0, 1, "重庆大学城市科技学院"],
  [0, 0, "重庆警察学院"],
  [0, 1, "重庆人文科技学院"],
  [0, 1, "四川外国语大学重庆南方翻译学院"],
  [0, 1, "重庆师范大学涉外商贸学院"],
  [0, 1, "重庆工商大学融智学院"],
  [0, 1, "重庆工商大学派斯学院"],
  [0, 1, "重庆邮电大学移通学院"],
  [0, 0, "重庆第二师范学院"],
  [1, 0, "重庆航天职业技术学院"],
  [1, 0, "重庆电力高等专科学校"],
  [1, 0, "重庆工业职业技术学院"],
  [1, 0, "重庆三峡职业学院"],
  [1, 0, "重庆工贸职业技术学院"],
  [1, 1, "重庆机电职业技术学院"],
  [1, 0, "重庆电子工程职业学院"],
  [1, 1, "重庆海联职业技术学院"],
  [1, 1, "重庆信息技术职业学院"],
  [1, 1, "重庆传媒职业学院"],
  [1, 0, "重庆城市管理职业学院"],
  [1, 0, "重庆工程职业技术学院"],
  [1, 1, "重庆房地产职业学院"],
  [1, 0, "重庆城市职业学院"],
  [1, 0, "重庆水利电力职业技术学院"],
  [1, 0, "重庆工商职业学院"],
  [1, 1, "重庆应用技术职业学院"],
  [1, 0, "重庆三峡医药高等专科学校"],
  [1, 0, "重庆医药高等专科学校"],
  [1, 0, "重庆青年职业技术学院"],
  [1, 0, "重庆财经职业学院"],
  [1, 1, "重庆科创职业学院"],
  [1, 0, "重庆建筑工程职业学院"],
  [1, 1, "重庆电讯职业学院"],
  [1, 1, "重庆能源职业学院"],
  [1, 0, "重庆商务职业学院"],
  [1, 1, "重庆交通职业学院"],
  [1, 0, "重庆化工职业学院"],
  [1, 0, "重庆旅游职业学院"],
  [1, 0, "重庆安全技术职业学院"],
  [1, 1, "重庆公共运输职业学院"],
  [1, 1, "重庆艺术工程职业学院"],
  [1, 1, "重庆轻工职业学院"],
  [1, 1, "重庆电信职业学院"],
  [1, 1, "重庆经贸职业学院"],
  [1, 0, "重庆幼儿师范高等专科学校"],
  [1, 0, "重庆文化艺术职业学院"],
  [1, 1, "重庆服装工程职业学院"],
  [1, 1, "重庆资源与环境保护职业学院"],
  [1, 1, "庆护理职业学院"]],

  "015": [
  [0, 0, "闽南师范大学"],
  [0, 1, "厦门大学嘉庚学院"],
  [1, 0, "漳州职业技术学院"],
  [1, 0, "漳州城市职业学院"],
  [1, 1, "漳州科技职业学院"],
  [1, 1, "漳州理工职业学院"],
  [1, 0, "漳州卫生职业学院"]],

  "016": [
  [0, 0, "厦门大学"],
  [0, 0, "集美大学"],
  [0, 0, "厦门理工学院"],
  [0, 0, "厦门医学院"],
  [0, 1, "厦门华厦学院"],
  [0, 1, "厦门工学院"],
  [0, 1, "集美大学诚毅学院"],
  [1, 0, "厦门海洋职业技术学院"],
  [1, 1, "厦门演艺职业学院"],
  [1, 1, "厦门华天涉外职业技术学院"],
  [1, 0, "厦门城市职业学院"],
  [1, 1, "厦门兴才职业技术学院"],
  [1, 1, "厦门软件职业技术学院"],
  [1, 1, "厦门南洋职业学院"],
  [1, 1, "厦门东海职业技术学院"],
  [1, 1, "厦门安防科技职业学院"]],

  "017": [
  [0, 0, "三明学院"],
  [1, 0, "福建水利电力职业技术学院"],
  [1, 0, "三明职业技术学院"]],

  "018": [
  [0, 0, "华侨大学"],
  [0, 0, "泉州师范学院"],
  [0, 1, "仰恩大学"],
  [0, 1, "闽南理工学院"],
  [0, 1, "福建师范大学闽南科技学院"],
  [0, 1, "泉州信息工程学院"],
  [1, 0, "黎明职业大学"],
  [1, 0, "福建电力职业技术学院"],
  [1, 0, "泉州医学高等专科学校"],
  [1, 1, "泉州纺织服装职业学院"],
  [1, 1, "泉州华光职业学院"],
  [1, 1, "泉州理工职业学院"],
  [1, 0, "泉州经贸职业技术学院"],
  [1, 0, "泉州工艺美术职业学院"],
  [1, 1, "泉州工程职业技术学院"],
  [1, 1, "泉州海洋职业学院"],
  [1, 1, "泉州轻工职业学院"],
  [1, 0, "泉州幼儿师范高等专科学校"]],

  "019": [
  [0, 0, "莆田学院"],
  [1, 0, "湄洲湾职业技术学院"]],

  "020": [
  [0, 0, "宁德师范学院"],
  [1, 0, "宁德职业技术学院"]],

  "021": [
  [0, 0, "武夷学院"],
  [1, 0, "福建林业职业技术学院"],
  [1, 0, "闽北职业技术学院"],
  [1, 1, "武夷山职业学院"]],

  "022": [
  [0, 0, "龙岩学院"],
  [1, 0, "闽西职业技术学院"]],

  "023": [
  [0, 0, "福州大学"],
  [0, 0, "福建工程学院"],
  [0, 0, "福建农林大学"],
  [0, 0, "福建医科大学"],
  [0, 0, "福建中医药大学"],
  [0, 0, "福建师范大学"],
  [0, 0, "闽江学院"],
  [0, 0, "福建商学院"],
  [0, 0, "福建警察学院"],
  [0, 1, "福建农林大学东方学院"],
  [0, 1, "阳光学院"],
  [0, 1, "福州大学至诚学院"],
  [0, 1, "福建师范大学协和学院"],
  [0, 1, "福州外语外贸学院"],
  [0, 0, "福建江夏学院"],
  [0, 1, "福州理工学院"],
  [0, 1, "福建农林大学金山学院"],
  [1, 0, "福建船政交通职业学院"],
  [1, 1, "福建华南女子职业学院"],
  [1, 0, "福州职业技术学院"],
  [1, 0, "福建信息职业技术学院"],
  [1, 0, "福建农业职业技术学院"],
  [1, 0, "福建卫生职业技术学院"],
  [1, 1, "福州英华职业学院"],
  [1, 0, "福建警官职业学院"],
  [1, 1, "福州黎明职业技术学院"],
  [1, 1, "福州科技职业技术学院"],
  [1, 0, "福建对外经济贸易职业技术学院"],
  [1, 0, "福建生物工程职业技术学院"],
  [1, 0, "福建艺术职业学院"],
  [1, 0, "福建幼儿师范高等专科学校"],
  [1, 1, "福州软件职业技术学院"],
  [1, 0, "福建体育职业技术学院"],
  [1, 0, "闽江师范高等专科学校"]],

  "024": [
  [0, 1, "江苏大学京江学院"],
  [0, 1, "南京财经大学红山学院"],
  [1, 1, "金山职业技术学院"],
  [0, 0, "江苏科技大学"],
  [0, 0, "江苏大学"],
  [1, 0, "镇江市高等专科学校"],
  [1, 0, "江苏农林职业技术学院"],
  [1, 0, "江苏航空职业技术学院"]],

  "025": [
  [0, 1, "江苏科技大学苏州理工学院"]],

  "026": [
  [0, 1, "扬州大学广陵学院"],
  [0, 1, "南京邮电大学通达学院"],
  [1, 1, "江海职业技术学院"],
  [1, 1, "扬州中瑞酒店职业学院"],
  [0, 0, "扬州大学"],
  [1, 0, "扬州市职业大学"],
  [1, 0, "扬州环境资源职业技术学院"],
  [1, 0, "扬州工业职业技术学院"]],

  "027": [
  [1, 1, "民办明达职业技术学院"],
  [0, 0, "盐城工学院"],
  [0, 0, "盐城师范学院"],
  [1, 0, "盐城幼儿师范高等专科学校"],
  [1, 0, "盐城卫生职业技术学院"],
  [1, 0, "盐城工业职业技术学院"]],

  "028": [
  [0, 1, "中国矿业大学徐海学院"],
  [0, 1, "江苏师范大学科文学院"],
  [1, 1, "九州职业技术学院"],
  [0, 0, "中国矿业大学"],
  [0, 0, "徐州医科大学"],
  [0, 0, "江苏师范大学"],
  [0, 0, "徐州工程学院"],
  [1, 0, "江苏建筑职业技术学院"],
  [1, 0, "徐州工业职业技术学院"],
  [1, 0, "徐州幼儿师范高等专科学校"],
  [1, 0, "徐州生物工程职业技术学院"],
  [1, 0, "江苏安全技术职业学院"]],

  "029": [
  [0, 1, "宿迁学院"],
  [1, 1, "宿迁泽达职业技术学院"],
  [1, 0, "宿迁职业技术学院"]],

  "030": [
  [0, 1, "无锡太湖学院"],
  [1, 1, "太湖创意职业技术学院"],
  [1, 1, "无锡南洋职业技术学院"],
  [1, 1, "江南影视艺术职业学院"],
  [0, 0, "江南大学"],
  [1, 0, "无锡职业技术学院"],
  [1, 0, "无锡科技职业学院"],
  [1, 0, "无锡商业职业技术学院"],
  [1, 0, "江苏信息职业技术学院"],
  [1, 0, "江阴职业技术学院"],
  [1, 0, "无锡城市职业技术学院"],
  [1, 0, "无锡工艺职业技术学院"]],

  "031": [
  [0, 1, "南京理工大学泰州科技学院"],
  [0, 1, "南京师范大学泰州学院"],
  [0, 1, "南京中医药大学翰林学院"],
  [0, 1, "常州大学怀德学院"],
  [0, 0, "泰州学院"],
  [1, 0, "泰州职业技术学院"],
  [1, 0, "江苏农牧科技职业学院"]],

  "032": [
  [0, 2, "昆山杜克大学"],
  [0, 1, "苏州大学文正学院"],
  [0, 1, "苏州大学应用技术学院"],
  [0, 1, "苏州科技大学天平学院"],
  [1, 1, "硅湖职业技术学院"],
  [0, 2, "西交利物浦大学"],
  [1, 1, "苏州托普信息职业技术学院"],
  [1, 1, "苏州港大思培科技职业学院"],
  [1, 1, "昆山登云科技职业学院"],
  [1, 1, "苏州高博软件技术职业学院"],
  [0, 0, "苏州大学"],
  [0, 0, "苏州科技大学"],
  [0, 0, "常熟理工学院"],
  [1, 0, "苏州幼儿师范高等专科学校"],
  [1, 0, "苏州工艺美术职业技术学院"],
  [1, 0, "苏州职业大学"],
  [1, 0, "沙洲职业工学院"],
  [1, 0, "苏州经贸职业技术学院"],
  [1, 0, "苏州工业职业技术学院"],
  [1, 0, "苏州卫生职业技术学院"],
  [1, 0, "苏州农业职业技术学院"],
  [1, 0, "苏州工业园区职业技术学院"],
  [1, 0, "苏州健雄职业技术学院"],
  [1, 0, "苏州信息职业技术学院"],
  [1, 0, "苏州工业园区服务外包职业学院"]],

  "033": [
  [0, 1, "南通理工学院"],
  [0, 1, "南通大学杏林学院"],
  [0, 0, "南通大学"],
  [1, 0, "江苏工程职业技术学院"],
  [1, 0, "南通职业大学"],
  [1, 0, "南通科技职业学院"],
  [1, 0, "南通航运职业技术学院"],
  [1, 0, "江苏商贸职业学院"],
  [1, 0, "南通师范高等专科学校"]],

  "034": [
  [0, 1, "三江学院"],
  [0, 1, "东南大学成贤学院"],
  [0, 1, "南京大学金陵学院"],
  [0, 1, "南京理工大学紫金学院"],
  [0, 1, "南京航空航天大学金城学院"],
  [0, 1, "中国传媒大学南广学院"],
  [0, 1, "南京工业大学浦江学院"],
  [0, 1, "南京师范大学中北学院"],
  [0, 1, "南京信息工程大学滨江学院"],
  [0, 1, "南京审计大学金审学院"],
  [1, 1, "应天职业技术学院"],
  [1, 1, "正德职业技术学院"],
  [1, 1, "钟山职业技术学院"],
  [1, 1, "金肯职业技术学院"],
  [1, 1, "南京视觉艺术职业学院"],
  [0, 0, "南京大学"],
  [0, 0, "东南大学"],
  [0, 0, "南京航空航天大学"],
  [0, 0, "南京理工大学"],
  [0, 0, "南京工业大学"],
  [0, 0, "南京邮电大学"],
  [0, 0, "河海大学"],
  [0, 0, "南京林业大学"],
  [0, 0, "南京信息工程大学"],
  [0, 0, "南京农业大学"],
  [0, 0, "南京医科大学"],
  [0, 0, "南京中医药大学"],
  [0, 0, "中国药科大学"],
  [0, 0, "南京师范大学"],
  [0, 0, "南京财经大学"],
  [0, 0, "江苏警官学院"],
  [0, 0, "南京体育学院"],
  [0, 0, "南京艺术学院"],
  [0, 0, "南京工程学院"],
  [0, 0, "南京审计大学"],
  [0, 0, "南京晓庄学院"],
  [0, 0, "南京特殊教育师范学院"],
  [0, 0, "南京森林警察学院"],
  [0, 0, "金陵科技学院"],
  [0, 0, "江苏第二师范学院"],
  [1, 0, "南京工业职业技术学院"],
  [1, 0, "江苏经贸职业技术学院"],
  [1, 0, "江苏联合职业技术学院"],
  [1, 0, "江苏海事职业技术学院"],
  [1, 0, "南京交通职业技术学院"],
  [1, 0, "南京科技职业学院"],
  [1, 0, "南京铁道职业技术学院"],
  [1, 0, "南京信息职业技术学院"],
  [1, 0, "江苏城市职业学院"],
  [1, 0, "南京城市职业学院"],
  [1, 0, "南京机电职业技术学院"],
  [1, 0, "南京旅游职业学院"],
  [1, 0, "江苏建康职业学院"]],

  "035": [
  [0, 1, "南京医科大学康达学院"],
  [0, 0, "淮海工学院"],
  [1, 0, "连云港职业技术学院"],
  [1, 0, "连云港师范高等专科学校"],
  [1, 0, "江苏财会职业学院"]],

  "036": [
  [1, 1, "炎黄职业技术学院"],
  [0, 0, "淮阴师范学院"],
  [0, 0, "淮阴工学院"],
  [1, 0, "淮安信息职业技术学院"],
  [1, 0, "江苏食品药品职业技术学院"],
  [1, 0, "江苏财经职业技术学院"],
  [1, 0, "江苏护理职业学院"]],

  "037": [
  [1, 1, "建东职业技术学院"],
  [0, 0, "常州大学"],
  [0, 0, "常州工学院"],
  [0, 0, "江苏理工学院"],
  [1, 0, "常州信息职业技术学院"],
  [1, 0, "常州纺织服装职业技术学院"],
  [1, 0, "常州轻工职业技术学院"],
  [1, 0, "常州工程职业技术学院"],
  [1, 0, "常州机电职业技术学院"],
  [1, 0, "江苏城乡建设职业学院"]],

  "038": [
  [0, 1, "北京师范大学珠海分校"],
  [0, 1, "北京理工大学珠海学院"],
  [0, 1, "吉林大学珠海学院"],
  [0, 3, "北京师范大学-香港浸会大学联合国际学院"],
  [1, 1, "珠海艺术职业学院"],
  [1, 0, "珠海城市职业技术学院"]],

  "039": [
  [0, 1, "电子科技大学中山学院"],
  [1, 0, "中山火炬职业技术学院"],
  [1, 0, "中山职业技术学院"]],

  "040": [
  [0, 0, "肇庆学院"],
  [0, 1, "广东理工学院"],
  [1, 1, "广东工商职业学院"],
  [1, 0, "肇庆医学高等专科学校"],
  [1, 1, "广东信息工程职业学院"]],

  "041": [
  [0, 0, "广东海洋大学"],
  [0, 0, "广东医科大学"],
  [0, 0, "岭南师范学院"],
  [0, 1, "广东海洋大学寸金学院"],
  [1, 1, "广东文理职业学院"],
  [1, 0, "湛江幼儿师范专科学校"]],

  "042": [
  [1, 0, "罗定职业技术学院"]],

  "043": [
  [1, 0, "阳江职业技术学院"]],

  "044": [
  [0, 0, "深圳大学"],
  [0, 0, "南方科技大学"],
  [0, 3, "香港中文大学（深圳）"],
  [1, 0, "深圳职业技术学院"],
  [1, 1, "广东新安职业技术学院"],
  [1, 0, "深圳信息职业技术学院"]],

  "045": [
  [0, 0, "韶关学院"],
  [1, 0, "广东松山职业技术学院"]],

  "046": [
  [1, 0, "汕尾职业技术学院"]],

  "047": [
  [0, 0, "汕头大学"],
  [1, 0, "汕头职业技术学院"]],

  "048": [
  [1, 0, "清远职业技术学院"],
  [1, 1, "广东碧桂园职业学院"]],

  "049": [
  [0, 0, "嘉应学院"]],

  "050": [
  [0, 0, "广东石油化工学院"],
  [1, 0, "茂名职业技术学院"],
  [1, 0, "广东茂名健康职业学院"],
  [1, 0, "广东茂名幼儿师范专科学校"]],

  "051": [
  [1, 1, "潮汕职业技术学院"],
  [1, 0, "揭阳职业技术学院"]],

  "052": [
  [0, 0, "五邑大学"],
  [1, 0, "江门职业技术学院"],
  [1, 1, "广东南方职业学院"]],

  "053": [
  [0, 0, "惠州学院"],
  [1, 1, "惠州经济职业技术学院"],
  [1, 0, "惠州卫生职业技术学院"],
  [1, 0, "惠州城市职业学院"]],

  "054": [
  [1, 0, "河源职业技术学院"]],

  "055": [
  [0, 0, "中山大学"],
  [0, 0, "暨南大学"],
  [0, 0, "华南理工大学"],
  [0, 0, "华南农业大学"],
  [0, 0, "广州医科大学"],
  [0, 0, "广州中医药大学"],
  [0, 0, "广东药科大学"],
  [0, 0, "华南师范大学"],
  [0, 0, "广州体育学院"],
  [0, 0, "广州美术学院"],
  [0, 0, "星海音乐学院"],
  [0, 0, "广东技术师范大学"],
  [0, 0, "广东财经大学"],
  [0, 1, "广东白云学院"],
  [0, 0, "广州大学"],
  [0, 0, "广州航海学院"],
  [0, 0, "广东警官学院"],
  [0, 0, "仲恺农业工程学院"],
  [0, 0, "广东金融学院"],
  [0, 0, "广东工业大学"],
  [0, 0, "广东外语外贸大学"],
  [0, 1, "广东培正学院"],
  [0, 0, "南方医科大学"],
  [0, 1, "华南理工大学广州学院"],
  [0, 1, "广州大学华软软件学院"],
  [0, 1, "中山大学南方学院"],
  [0, 1, "广东外语外贸大学南国商学院"],
  [0, 1, "广东财经大学华商学院"],
  [0, 1, "华南农业大学珠江学院"],
  [0, 1, "广东技术师范学院天河学院"],
  [0, 1, "广东工业大学华立学院"],
  [0, 1, "广州大学松田学院"],
  [0, 1, "广州商学院"],
  [0, 1, "广州工商学院"],
  [0, 1, "中山大学新华学院"],
  [0, 0, "广东第二师范学院"],
  [1, 0, "广东轻工职业技术学院"],
  [1, 0, "广东交通职业技术学院"],
  [1, 0, "广东水利电力职业技术学院"],
  [1, 1, "民办南华工商学院"],
  [1, 1, "私立华联学院"],
  [1, 0, "广州民航职业技术学院"],
  [1, 0, "广州番禺职业技术学院"],
  [1, 0, "广东农工商职业技术学院"],
  [1, 0, "广东科学技术职业学院"],
  [1, 0, "广东食品药品职业学院"],
  [1, 1, "广州康大职业技术学院"],
  [1, 0, "广东行政职业学院"],
  [1, 0, "广东体育职业技术学院"],
  [1, 0, "广东建设职业技术学院"],
  [1, 0, "广东女子职业技术学院"],
  [1, 0, "广东机电职业技术学院"],
  [1, 1, "广东岭南职业技术学院"],
  [1, 0, "广东邮电职业技术学院"],
  [1, 0, "广东工贸职业技术学院"],
  [1, 0, "广东司法警官职业学院"],
  [1, 0, "广东省外语艺术职业学院"],
  [1, 0, "广东文艺职业学院"],
  [1, 0, "广州体育职业技术学院"],
  [1, 0, "广州工程技术职业学院"],
  [1, 1, "广州涉外经济职业技术学院"],
  [1, 1, "广州南洋理工职业学院"],
  [1, 1, "广州科技职业技术学院"],
  [1, 1, "广州现代信息工程职业技术学院"],
  [1, 0, "广东理工职业学院"],
  [1, 1, "广州华南商贸职业学院"],
  [1, 1, "广州华立科技职业学院"],
  [1, 0, "广州城市职业学院"],
  [1, 0, "广东工程职业技术学院"],
  [1, 0, "广州铁路职业技术学院"],
  [1, 0, "广东科贸职业学院"],
  [1, 0, "广州科技贸易职业学院"],
  [1, 1, "广州珠江职业技术学院"],
  [1, 1, "广州松田职业学院"],
  [1, 1, "广州城建职业学院"],
  [1, 1, "广州华商职业学院"],
  [1, 1, "广州华夏职业学院"],
  [1, 0, "广东青年职业学院"],
  [1, 1, "广州东华职业学院"],
  [1, 0, "广东舞蹈戏剧职业学院"],
  [1, 0, "广东生态工程职业学院"],
  [1, 0, "公安边防部队高等专科学校"],
  [1, 0, "广州卫生职业技术学院"]],

  "056": [
  [0, 0, "佛山科学技术学院"],
  [0, 1, "广东东软学院"],
  [1, 0, "顺德职业技术学院"],
  [1, 0, "佛山职业技术学院"],
  [1, 0, "广东职业技术学院"],
  [1, 0, "广东环境保护工程职业学院"]],

  "057": [
  [0, 0, "东莞理工学院"],
  [0, 1, "广东科技学院"],
  [0, 1, "东莞理工学院城市学院"],
  [1, 1, "广东亚视演艺职业学院"],
  [1, 0, "东莞职业技术学院"],
  [1, 1, "广东创新科技职业学院"],
  [1, 1, "广东酒店管理职业技术学院"]],

  "058": [
  [0, 0, "韩山师范学院"]],

  "059": [
  [0, 0, "营口理工学院"],
  [1, 0, "营口职业技术学院"],
  [1, 0, "辽宁农业职业技术学院"]],

  "060": [
  [1, 0, "铁岭师范高等专科学校"],
  [1, 0, "辽宁职业学院"],
  [1, 0, "辽宁工程职业学院"],
  [1, 0, "铁岭卫生职业学院"]],

  "061": [
  [0, 0, "辽宁大学"],
  [0, 0, "沈阳工业大学"],
  [0, 0, "沈阳航空航天大学"],
  [0, 0, "沈阳理工大学"],
  [0, 0, "东北大学"],
  [0, 0, "沈阳化工大学"],
  [0, 0, "沈阳建筑大学"],
  [0, 0, "沈阳农业大学"],
  [0, 0, "中国医科大学"],
  [0, 0, "辽宁中医药大学"],
  [0, 0, "沈阳药科大学"],
  [0, 0, "沈阳医学院"],
  [0, 0, "沈阳师范大学"],
  [0, 0, "中国刑事警察学院"],
  [0, 0, "沈阳体育学院"],
  [0, 0, "沈阳音乐学院"],
  [0, 0, "鲁迅美术学院"],
  [0, 0, "沈阳大学"],
  [0, 0, "沈阳工程学院"],
  [0, 1, "沈阳航空航天大学北方科技学院"],
  [0, 1, "沈阳工学院"],
  [0, 1, "沈阳城市建设学院"],
  [0, 1, "中国医科大学临床医药学院"],
  [0, 1, "辽宁师范大学海华学院"],
  [0, 1, "沈阳城市学院"],
  [0, 1, "辽宁中医药大学杏林学院"],
  [0, 1, "辽宁何氏医学院"],
  [0, 1, "沈阳科技学院"],
  [0, 1, "辽宁传媒学院"],
  [1, 0, "辽宁省交通高等专科学校"],
  [1, 0, "沈阳航空职业技术学院"],
  [1, 0, "辽宁体育运动职业技术学院"],
  [1, 0, "辽宁林业职业技术学院"],
  [1, 0, "沈阳职业技术学院"],
  [1, 0, "辽宁金融职业学院"],
  [1, 0, "辽宁轨道交通职业学院"],
  [1, 1, "辽宁广告职业学院"],
  [1, 0, "辽宁经济职业技术学院"],
  [1, 0, "辽宁商贸职业学院"],
  [1, 0, "辽宁装备制造职业技术学院"],
  [1, 0, "辽宁现代服务职业技术学院"],
  [1, 0, "辽宁城市建设职业技术学院"],
  [1, 0, "辽宁医药职业学院"],
  [1, 1, "沈阳北软信息职业技术学院"],
  [1, 0, "辽宁政法职业学院"],
  [1, 0, "辽宁民族师范高等专科学校"],
  [1, 0, "辽宁水利职业学院"],
  [1, 0, "辽宁特殊教育师范高等专科学校"]],

  "062": [
  [1, 0, "盘锦职业技术学院"],
  [1, 0, "辽河石油职业技术学院"]],

  "063": [
  [0, 1, "沈阳工业大学工程学院"],
  [1, 0, "辽阳职业技术学院"],
  [1, 0, "辽宁建筑职业学院"]],

  "064": [
  [0, 0, "辽宁工业大学"],
  [0, 0, "锦州医科大学"],
  [0, 0, "渤海大学"],
  [0, 1, "锦州医科大学医疗学院"],
  [0, 1, "辽宁理工学院"],
  [1, 0, "锦州师范高等专科学校"],
  [1, 1, "辽宁理工职业学院"],
  [1, 0, "辽宁石化职业技术学院"],
  [1, 0, "辽宁铁道职业技术学院"]],

  "065": [
  [0, 1, "辽宁财贸学院"],
  [1, 0, "渤海船舶职业学院"]],

  "066": [
  [0, 0, "辽宁工程技术大学"],
  [1, 0, "阜新高等专科学校"]],

  "067": [
  [0, 0, "辽宁石油化工大学"],
  [0, 1, "辽宁石油化工大学顺华能源学院"],
  [1, 0, "抚顺师范高等专科学校"],
  [1, 0, "抚顺职业技术学院"]],

  "068": [
  [0, 0, "辽东学院"],
  [1, 0, "辽宁机电职业技术学院"],
  [1, 0, "辽宁地质工程职业学院"]],

  "069": [
  [0, 0, "大连理工大学"],
  [0, 0, "大连交通大学"],
  [0, 0, "大连海事大学"],
  [0, 0, "大连工业大学"],
  [0, 0, "大连海洋大学"],
  [0, 0, "大连医科大学"],
  [0, 0, "辽宁师范大学"],
  [0, 0, "大连外国语大学"],
  [0, 0, "东北财经大学"],
  [0, 1, "辽宁对外经贸学院"],
  [0, 0, "大连大学"],
  [0, 0, "辽宁警察学院"],
  [0, 0, "大连民族大学"],
  [0, 1, "大连理工大学城市学院"],
  [0, 1, "大连工业大学艺术与信息工程学院"],
  [0, 1, "大连科技学院"],
  [0, 1, "大连医科大学中山学院"],
  [0, 1, "大连财经学院"],
  [0, 1, "大连艺术学院"],
  [0, 1, "大连东软信息学院"],
  [1, 0, "大连职业技术学院"],
  [1, 0, "辽宁税务高等专科学校"],
  [1, 1, "大连商务职业学院"],
  [1, 1, "大连软件职业学院"],
  [1, 1, "大连翻译职业学院"],
  [1, 1, "大连枫叶职业技术学院"],
  [1, 1, "大连航运职业技术学院"],
  [1, 1, "大连装备制造职业技术学院"],
  [1, 1, "大连汽车职业技术学院"],
  [1, 0, "辽宁轻工职业学院"]],

  "070": [
  [1, 0, "朝阳师范高等专科学校"]],

  "071": [
  [0, 0, "辽宁科技学院"],
  [1, 0, "辽宁冶金职业技术学院"]],

  "072": [
  [0, 0, "辽宁科技大学"],
  [0, 0, "鞍山师范学院"],
  [0, 1, "辽宁科技大学信息技术学院"]],

  "073": [
  [1, 0, "兴安职业技术学院"]],

  "074": [
  [1, 0, "锡林郭勒职业学院"]],

  "075": [
  [0, 0, "集宁师范学院"],
  [1, 0, "乌兰察布职业学院"],
  [1, 0, "乌兰察布医学高等专科学校"]],

  "076": [
  [1, 0, "乌海职业技术学院"]],

  "077": [
  [0, 0, "内蒙古民族大学"],
  [1, 0, "通辽职业学院"],
  [1, 0, "科尔沁艺术职业学院"]],

  "078": [
  [0, 0, "呼伦贝尔学院"],
  [1, 0, "呼伦贝尔职业技术学院"],
  [1, 0, "满洲里俄语职业学院"],
  [1, 0, "扎兰屯职业学院"]],

  "079": [
  [0, 0, "内蒙古大学"],
  [0, 0, "内蒙古工业大学"],
  [0, 0, "内蒙古农业大学"],
  [0, 0, "内蒙古医科大学"],
  [0, 0, "内蒙古师范大学"],
  [0, 0, "内蒙古财经大学"],
  [0, 0, "呼和浩特民族学院"],
  [0, 1, "内蒙古大学创业学院"],
  [0, 1, "内蒙古师范大学鸿德学院"],
  [0, 0, "内蒙古艺术学院"],
  [1, 0, "内蒙古建筑职业技术学院"],
  [1, 1, "内蒙古丰州职业学院"],
  [1, 0, "呼和浩特职业学院"],
  [1, 0, "内蒙古电子信息职业技术学院"],
  [1, 0, "内蒙古机电职业技术学院"],
  [1, 0, "内蒙古化工职业学院"],
  [1, 0, "内蒙古商贸职业学院"],
  [1, 0, "内蒙古警察职业学院"],
  [1, 0, "内蒙古体育职业学院"],
  [1, 1, "内蒙古科技职业学院"],
  [1, 1, "内蒙古北方职业技术学院"],
  [1, 1, "内蒙古经贸外语职业学院"],
  [1, 1, "内蒙古工业职业学院"],
  [1, 1, "内蒙古能源职业学院"]],

  "080": [
  [0, 0, "鄂尔多斯应用技术学院"],
  [1, 0, "鄂尔多斯职业学院"],
  [1, 0, "内蒙古民族幼儿师范高等专科学校"],
  [1, 0, "鄂尔多斯生态环境职业学院"]],

  "081": [
  [0, 0, "赤峰学院"],
  [1, 0, "内蒙古交通职业技术学院"],
  [1, 1, "赤峰职业技术学院"],
  [1, 0, "赤峰工业职业技术学院"]],

  "082": [
  [0, 0, "内蒙古科技大学"],
  [1, 0, "包头职业技术学院"],
  [1, 0, "包头轻工职业技术学院"],
  [1, 0, "包头钢铁职业技术学院"],
  [1, 0, "包头铁道职业技术学院"]],

  "083": [
  [0, 0, "河套学院"],
  [1, 1, "内蒙古美术职业学院"]],

  "084": [
  [1, 0, "阿拉善职业技术学院"]],

  "085": [
  [0, 0, "长治医学院"],
  [0, 0, "长治学院"],
  [1, 0, "长治职业技术学院"],
  [1, 0, "山西机电职业技术学院"],
  [1, 0, "潞安职业技术学院"]],

  "086": [
  [0, 0, "运城学院"],
  [1, 0, "山西水利职业技术学院"],
  [1, 0, "山西运城农业职业技术学院"],
  [1, 0, "运城幼儿师范高等专科学校"],
  [1, 1, "运城职业技术学院"],
  [1, 0, "运城护理职业学院"],
  [1, 0, "运城师范高等专科学校"]],

  "087": [
  [0, 0, "山西工程技术学院"],
  [1, 0, "阳泉职业技术学院"],
  [1, 0, "阳泉师范高等专科学校"]],

  "088": [
  [0, 0, "忻州师范学院"],
  [1, 0, "忻州职业技术学院"]],

  "089": [
  [0, 0, "山西大学"],
  [0, 0, "太原科技大学"],
  [0, 0, "中北大学"],
  [0, 0, "太原理工大学"],
  [0, 0, "山西医科大学"],
  [0, 0, "太原师范学院"],
  [0, 0, "山西财经大学"],
  [0, 0, "山西中医学院"],
  [0, 0, "太原学院"],
  [0, 0, "山西警察学院"],
  [0, 1, "山西应用科技学院"],
  [0, 1, "山西大学商务学院"],
  [0, 1, "太原理工大学现代科技学院"],
  [0, 1, "中北大学信息商务学院"],
  [0, 1, "太原科技大学华科学院"],
  [0, 1, "山西医科大学晋祠学院"],
  [0, 1, "山西财经大学华商学院"],
  [0, 1, "山西工商学院"],
  [0, 0, "太原工业学院"],
  [0, 0, "山西传媒学院"],
  [1, 0, "山西省财政税务专科学校"],
  [1, 0, "山西艺术职业学院"],
  [1, 0, "山西建筑职业技术学院"],
  [1, 0, "山西药科职业学院"],
  [1, 0, "山西工程职业技术学院"],
  [1, 0, "山西交通职业技术学院"],
  [1, 0, "山西戏剧职业学院"],
  [1, 0, "山西财贸职业技术学院"],
  [1, 0, "山西林业职业技术学院"],
  [1, 0, "山西职业技术学院"],
  [1, 0, "山西煤炭职业技术学院"],
  [1, 0, "山西金融职业学院"],
  [1, 0, "太原城市职业技术学院"],
  [1, 0, "山西体育职业学院"],
  [1, 0, "山西警官职业学院"],
  [1, 0, "山西国际商务职业学院"],
  [1, 0, "太原旅游职业学院"],
  [1, 0, "山西旅游职业学院"],
  [1, 0, "山西电力职业技术学院"],
  [1, 1, "山西老区职业技术学院"],
  [1, 0, "山西经贸职业学院"],
  [1, 0, "山西轻工职业技术学院"],
  [1, 0, "山西青年职业学院"]],

  "090": [
  [1, 0, "朔州职业技术学院"],
  [1, 0, "朔州师范高等专科学校"]],

  "091": [
  [0, 0, "吕梁学院"],
  [1, 0, "吕梁职业技术学院"]],

  "092": [
  [0, 0, "山西师范大学"],
  [0, 1, "山西师范大学现代文理学院"],
  [1, 0, "临汾职业技术学院"],
  [1, 1, "山西信息职业技术学院"],
  [1, 0, "山西管理职业学院"]],

  "093": [
  [0, 0, "山西农业大学"],
  [0, 0, "晋中学院"],
  [0, 1, "山西农业大学信息学院"],
  [0, 0, "山西能源学院"],
  [1, 1, "山西同文职业技术学院"],
  [1, 0, "晋中职业技术学院"],
  [1, 1, "山西华澳商贸职业学院"],
  [1, 0, "晋中师范高等专科学校"]],

  "094": [
  [1, 0, "晋城职业技术学院"]],

  "095": [
  [0, 0, "山西大同大学"],
  [1, 0, "大同煤炭职业技术学院"]],

  "096": [
  [0, 0, "青海大学"],
  [0, 0, "青海师范大学"],
  [0, 0, "青海民族大学"],
  [0, 1, "青海大学昆仑学院"],
  [1, 0, "青海卫生职业技术学院"],
  [1, 0, "青海警官职业学院"],
  [1, 0, "青海畜牧兽医职业技术学院"],
  [1, 0, "青海交通职业技术学院"],
  [1, 0, "青海建筑职业技术学院"],
  [1, 0, "西宁城市职业技术学院"]],

  "097": [
  [1, 0, "青海高等职业技术学院"]],

  "098": [
  [1, 0, "青海柴达木职业技术学院"]],

  "099": [
  [0, 0, "四川理工学院"],
  [1, 0, "四川卫生康复职业学院"]],

  "100": [
  [1, 1, "四川希望汽车职业学院"]],

  "101": [
  [
  [0, 0, "宜宾学院"],
  [1, 0, "宜宾职业技术学院"]]],


  "102": [
  [0, 0, "四川农业大学"],
  [1, 0, "雅安职业技术学院"]],

  "103": [
  [1, 0, "四川职业技术学院"]],

  "104": [
  [0, 0, "攀枝花学院"],
  [1, 0, "四川机电职业技术学院"]],

  "105": [
  [0, 0, "内江师范学院"],
  [1, 0, "内江职业技术学院"],
  [1, 0, "川南幼儿师范高等1专科学校"]],

  "106": [
  [0, 0, "川北医学院"],
  [0, 0, "西华师范大学"],
  [0, 1, "西南交通大学希望学院"],
  [1, 0, "南充职业技术学院"]],

  "107": [
  [0, 0, "西南科技大学"],
  [0, 0, "绵阳师范学院"],
  [0, 1, "西南财经大学天府学院"],
  [0, 1, "四川文化艺术学院"],
  [0, 1, "西南科技大学城市学院"],
  [1, 0, "绵阳职业技术学院"],
  [1, 0, "四川中医药高等专科学校"],
  [1, 0, "四川幼儿师范高等专科学校"],
  [1, 1, "四川汽车职业技术学院"],
  [1, 1, "四川电子机械职业技术学院"]],

  "108": [
  [0, 1, "四川大学锦江学院"],
  [1, 0, "眉山职业技术学院"]],

  "109": [
  [0, 0, "西南医科大学"],
  [0, 0, "四川警察学院"],
  [1, 0, "四川化工职业技术学院"],
  [1, 0, "泸州职业技术学院"],
  [1, 1, "四川三河职业学院"]],

  "110": [
  [1, 1, "四川应用技术职业学院"]],

  "111": [
  [0, 0, "西昌学院"]],

  "112": [
  [0, 0, "乐山师范学院"],
  [0, 1, "成都理工大学工程技术学院"],
  [1, 0, "乐山职业技术学院"]],

  "113": [
  [1, 0, "四川信息职业技术学院"],
  [1, 0, "川北幼儿师范高等专科学校"]],

  "114": [
  [1, 0, "广安职业技术学院"]],

  "115": [
  [0, 0, "四川民族学院"]],

  "116": [
  [0, 0, "中国民用航空飞行学院"],
  [0, 1, "四川工业科技学院"],
  [1, 0, "四川工程职业技术学院"],
  [1, 0, "四川建筑职业技术学院"],
  [1, 0, "四川司法警官职业学院"],
  [1, 0, "四川护理职业学院"]],

  "117": [
  [0, 0, "四川文理学院"],
  [1, 0, "达州职业技术学院"]],

  "118": [
  [0, 0, "四川大学"],
  [0, 0, "西南交通大学"],
  [0, 0, "电子科技大学"],
  [0, 0, "西南石油大学"],
  [0, 0, "成都理工大学"],
  [0, 0, "成都信息工程大学"],
  [0, 0, "西华大学"],
  [0, 0, "成都中医药大学"],
  [0, 0, "四川师范大学"],
  [0, 0, "西南财经大学"],
  [0, 0, "成都体育学院"],
  [0, 0, "四川音乐学院"],
  [0, 0, "西南民族大学"],
  [0, 0, "成都学院"],
  [0, 0, "成都工业学院"],
  [0, 0, "四川旅游学院"],
  [0, 1, "成都东软学院"],
  [0, 1, "电子科技大学成都学院"],
  [0, 1, "四川传媒学院"],
  [0, 1, "成都信息工程大学银杏酒店管理学院"],
  [0, 1, "成都文理学院"],
  [0, 1, "四川工商学院"],
  [0, 1, "四川外国语大学成都学院"],
  [0, 0, "成都医学院"],
  [0, 1, "四川大学锦城学院"],
  [0, 0, "成都师范学院"],
  [0, 1, "四川电影电视学院"],
  [1, 0, "成都纺织高等专科学校"],
  [1, 1, "民办四川天一学院"],
  [1, 0, "成都航空职业技术学院"],
  [1, 0, "四川电力职业技术学院"],
  [1, 0, "成都职业技术学院"],
  [1, 0, "四川水利职业技术学院"],
  [1, 0, "四川航天职业技术学院"],
  [1, 0, "四川邮电职业技术学院"],
  [1, 0, "四川交通职业技术学院"],
  [1, 0, "四川工商职业技术学院"],
  [1, 1, "四川托普信息技术职业学院"],
  [1, 1, "四川国际标榜职业学院"],
  [1, 0, "成都农业科技职业学院"],
  [1, 1, "成都艺术职业学院"],
  [1, 0, "四川商务职业学院"],
  [1, 1, "四川文化传媒职业学院"],
  [1, 1, "四川华新现代职业学院"],
  [1, 0, "四川管理职业学院"],
  [1, 0, "四川艺术职业学院"],
  [1, 1, "四川科技职业学院"],
  [1, 0, "四川文化产业职业学院"],
  [1, 0, "四川财经职业学院"],
  [1, 1, "四川城市职业学院"],
  [1, 1, "四川现代职业学院"],
  [1, 1, "四川长江职业学院"],
  [1, 1, "四川文轩职业学院"],
  [1, 0, "成都工业职业技术学院"],
  [1, 1, "四川西南航空职业学院"],
  [1, 0, "成都工贸职业技术学院"]],

  "119": [
  [1, 1, "巴中职业技术学院"]],

  "120": [
  [0, 0, "阿坝师范学院"]],

  "121": [
  [0, 0, "贵州医科大学"],
  [0, 0, "贵阳中医学院"],
  [0, 0, "贵州师范大学"],
  [0, 0, "贵州财经大学"],
  [0, 0, "贵州民族大学"],
  [0, 0, "贵阳学院"],
  [0, 0, "贵州商学院"],
  [0, 1, "贵阳中医学院时珍学院"],
  [0, 1, "贵州财经大学商务学院"],
  [0, 1, "贵州大学科技学院"],
  [0, 1, "贵州大学明德学院"],
  [0, 1, "贵州民族大学人文科技学院"],
  [0, 1, "贵州师范大学求是学院"],
  [0, 1, "贵州医科大学神奇民族医药学院"],
  [0, 0, "贵州师范学院"],
  [0, 0, "贵州理工学院"],
  [1, 0, "贵州警官职业学院"],
  [1, 0, "贵州交通职业技术学院"],
  [1, 1, "贵州城市职业学院"],
  [1, 0, "贵州工业职业技术学院"],
  [1, 0, "贵州电力职业技术学院"],
  [1, 0, "贵州轻工职业技术学院"],
  [1, 0, "贵阳护理职业学院"],
  [1, 0, "贵阳职业技术学院"],
  [1, 0, "贵州职业技术学院"],
  [1, 1, "贵州工商职业学院"],
  [1, 0, "贵阳幼儿师范高等专科学校"],
  [1, 0, "贵州建设职业技术学院"],
  [1, 0, "贵州农业职业学院"],
  [1, 0, "贵州水利水电职业技术学院"],
  [1, 0, "贵州电子商务职业技术学院"],
  [1, 0, "贵州电子科技职业学院"],
  [1, 0, "贵州航空职业技术学院"],
  [0, 0, "贵州大学"]],

  "122": [
  [0, 0, "遵义医学院"],
  [0, 0, "遵义师范学院"],
  [0, 1, "遵义医学院医学与科技学院"],
  [1, 0, "贵州航天职业技术学院"],
  [1, 0, "遵义职业技术学院"],
  [1, 0, "遵义医药高等专科学校"]],

  "123": [
  [0, 0, "铜仁学院"],
  [1, 0, "铜仁职业技术学院"],
  [1, 0, "铜仁幼儿师范高等专科学校"],
  [1, 1, "贵州工程职业学院"]],

  "124": [
  [0, 0, "兴义民族师范学院"],
  [1, 0, "黔西南民族职业技术学院"]],

  "125": [
  [0, 0, "黔南民族师范学院"],
  [1, 0, "黔南民族医学高等专科学校"],
  [1, 0, "黔南民族职业技术学院"],
  [1, 1, "贵州盛华职业学院"],
  [1, 0, "黔南民族幼儿师范高等专科学校"],
  [1, 1, "贵州应用技术职业学院"]],

  "126": [
  [0, 0, "凯里学院"],
  [1, 0, "贵州电子信息职业技术学院"],
  [1, 0, "黔东南民族职业技术学院"]],

  "127": [
  [0, 0, "六盘水师范学院"],
  [1, 0, "六盘水职业技术学院"]],

  "128": [
  [0, 0, "贵州工程应用技术学院"],
  [1, 0, "毕节职业技术学院"],
  [1, 0, "毕节医学高等专科学校"],
  [1, 0, "毕节幼儿师范高等专科学校"],
  [1, 1, "贵州工贸职业学院"]],

  "129": [
  [0, 0, "安顺学院"],
  [1, 0, "安顺职业技术学院"]],

  "130": [
  [0, 0, "昭通学院"],
  [1, 0, "昭通卫生职业学院"]],

  "131": [
  [0, 0, "玉溪师范学院"],
  [1, 0, "玉溪农业职业技术学院"]],

  "132": [
  [1, 0, "西双版纳职业技术学院"]],

  "133": [
  [0, 0, "文山学院"],
  [1, 1, "云南三鑫职业技术学院"]],

  "134": [
  [0, 0, "曲靖师范学院"],
  [1, 0, "云南能源职业技术学院"],
  [1, 0, "曲靖医学高等专科学校"]],

  "135": [
  [0, 0, "普洱学院"]],

  "136": [
  [0, 0, "滇西科技师范学院"]],

  "137": [
  [0, 1, "云南大学旅游文化学院"],
  [1, 0, "丽江师范高等专科学校"]],

  "138": [
  [0, 0, "云南大学"],
  [0, 0, "昆明理工大学"],
  [0, 0, "云南农业大学"],
  [0, 0, "西南林业大学"],
  [0, 0, "昆明医科大学"],
  [0, 0, "云南中医学院"],
  [0, 0, "云南师范大学"],
  [0, 0, "云南财经大学"],
  [0, 0, "云南艺术学院"],
  [0, 0, "云南民族大学"],
  [0, 0, "云南警官学院"],
  [0, 0, "昆明学院"],
  [0, 1, "云南经济管理学院"],
  [0, 1, "云南大学滇池学院"],
  [0, 1, "昆明理工大学津桥学院"],
  [0, 1, "云南师范大学商学院"],
  [0, 1, "云南师范大学文理学院"],
  [0, 1, "昆明医科大学海源学院"],
  [0, 1, "云南艺术学院文华学院"],
  [0, 1, "云南工商学院"],
  [1, 0, "昆明冶金高等专科学校"],
  [1, 0, "云南国土资源职业学院"],
  [1, 0, "云南交通职业技术学院"],
  [1, 0, "昆明工业职业技术学院"],
  [1, 0, "云南农业职业技术学院"],
  [1, 0, "云南司法警官职业学院"],
  [1, 0, "云南文化艺术职业学院"],
  [1, 0, "云南体育运动职业技术学院"],
  [1, 1, "云南科技信息职业学院"],
  [1, 1, "昆明艺术职业学院"],
  [1, 0, "云南国防工业职业技术学院"],
  [1, 0, "云南机电职业技术学院"],
  [1, 0, "云南林业职业技术学院"],
  [1, 1, "云南城市建设职业学院"],
  [1, 1, "云南工程职业学院"],
  [1, 1, "云南新兴职业学院"],
  [1, 1, "云南经贸外事职业学院"],
  [1, 1, "云南商务职业学院"],
  [1, 1, "昆明卫生职业学院"],
  [1, 0, "云南旅游职业学院"],
  [1, 1, "云南外事外语职业学院"],
  [1, 0, "公安消防部队高等专科学校"],
  [1, 0, "云南财经职业学院"],
  [1, 0, "昆明铁道职业技术学院"],
  [1, 0, "云南水利水电职业学院"]],

  "139": [
  [0, 0, "红河学院"],
  [1, 0, "云南锡业职业技术学院"],
  [1, 0, "红河卫生职业学院"]],

  "140": [
  [1, 0, "德宏师范高等专科学校"],
  [1, 0, "德宏职业学院"]],

  "141": [
  [0, 0, "大理大学"],
  [1, 0, "大理农林职业技术学院"],
  [1, 0, "大理护理职业学院"]],

  "142": [
  [0, 0, "楚雄师范学院"],
  [1, 0, "楚雄医药高等专科学校"],
  [1, 1, "云南现代职业技术学院"]],

  "143": [
  [0, 0, "保山学院"],
  [1, 0, "保山中医药高等专科学校"]],

  "144": [
  [0, 0, "榆林学院"],
  [1, 0, "榆林职业技术学院"]],

  "145": [
  [0, 0, "延安大学"],
  [1, 0, "延安职业技术学院"]],

  "146": [
  [0, 0, "西北农林科技大学"],
  [0, 0, "陕西中医药大学"],
  [0, 0, "咸阳师范学院"],
  [0, 0, "西藏民族大学"],
  [0, 1, "陕西国际商贸学院"],
  [0, 1, "陕西服装工程学院"],
  [0, 1, "陕西科技大学镐京学院"],
  [1, 0, "陕西工业职业技术学院"],
  [1, 0, "杨凌职业技术学院"],
  [1, 0, "陕西能源职业技术学院"],
  [1, 0, "陕西财经职业技术学院"],
  [1, 0, "陕西邮电职业技术学院"],
  [1, 0, "咸阳职业技术学院"]],

  "147": [
  [0, 0, "西北大学"],
  [0, 0, "西安交通大学"],
  [0, 0, "西北工业大学"],
  [0, 0, "西安理工大学"],
  [0, 0, "西安电子科技大学"],
  [0, 0, "西安工业大学"],
  [0, 0, "西安建筑科技大学"],
  [0, 0, "西安科技大学"],
  [0, 0, "西安石油大学"],
  [0, 0, "陕西科技大学"],
  [0, 0, "西安工程大学"],
  [0, 0, "长安大学"],
  [0, 0, "陕西师范大学"],
  [0, 0, "西安外国语大学"],
  [0, 0, "西北政法大学"],
  [0, 0, "西安体育学院"],
  [0, 0, "西安音乐学院"],
  [0, 0, "西安美术学院"],
  [0, 0, "西安文理学院"],
  [0, 1, "西安培华学院"],
  [0, 0, "西安财经学院"],
  [0, 0, "西安邮电大学"],
  [0, 0, "西安航空学院"],
  [0, 0, "西安医学院"],
  [0, 1, "西安欧亚学院"],
  [0, 1, "西安外事学院"],
  [0, 1, "西安翻译学院"],
  [0, 1, "西京学院"],
  [0, 1, "西安思源学院"],
  [0, 1, "西安交通工程学院"],
  [0, 1, "西安交通大学城市学院"],
  [0, 1, "西北大学现代学院"],
  [0, 1, "西安建筑科技大学华清学院"],
  [0, 1, "西安财经学院行知学院"],
  [0, 1, "西安工业大学北方信息工程学院"],
  [0, 1, "延安大学西安创新学院"],
  [0, 1, "西安电子科技大学长安学院"],
  [0, 1, "西北工业大学明德学院"],
  [0, 1, "长安大学兴华学院"],
  [0, 1, "西安理工大学高科学院"],
  [0, 1, "西安科技大学高新学院"],
  [0, 0, "陕西学前师范学院"],
  [1, 0, "西安电力高等专科学校"],
  [1, 0, "陕西国防工业职业技术学院"],
  [1, 0, "西安航空职业技术学院"],
  [1, 0, "陕西交通职业技术学院"],
  [1, 0, "陕西职业技术学院"],
  [1, 1, "西安高新科技职业学院"],
  [1, 1, "西安城市建设职业学院"],
  [1, 1, "陕西电子信息职业技术学院"],
  [1, 1, "西安海棠职业学院"],
  [1, 1, "西安汽车科技职业学院"],
  [1, 1, "西安东方亚太职业技术学院"],
  [1, 0, "陕西警官职业学院"],
  [1, 0, "陕西经济管理职业技术学院"],
  [1, 0, "西安铁路职业技术学院"],
  [1, 0, "西安职业技术学院"],
  [1, 0, "陕西青年职业学院"],
  [1, 0, "陕西工商职业学院"],
  [1, 1, "陕西电子科技职业学院"],
  [1, 1, "陕西旅游烹饪职业学院"],
  [1, 1, "西安医学高等专科学校"],
  [1, 0, "陕西艺术职业学院"]],

  "148": [
  [0, 0, "渭南师范学院"],
  [1, 0, "陕西铁路工程职业技术学院"],
  [1, 0, "渭南职业技术学院"]],

  "149": [
  [1, 0, "铜川职业技术学院"]],

  "150": [
  [0, 0, "商洛学院"],
  [1, 0, "商洛职业技术学院"]],

  "151": [
  [0, 0, "陕西理工学院"],
  [1, 0, "陕西航空职业技术学院"],
  [1, 0, "汉中职业技术学院"]],

  "152": [
  [0, 0, "宝鸡文理学院"],
  [1, 0, "宝鸡职业技术学院"],
  [1, 0, "陕西机电职业技术学院"]],

  "153": [
  [0, 0, "安康学院"],
  [1, 0, "安康职业技术学院"]],

  "154": [
  [0, 0, "西藏民族大学"]],

  "155": [
  [0, 0, "西藏大学"],
  [0, 0, "西藏藏医学院"],
  [1, 0, "西藏警官高等专科学校"],
  [1, 0, "拉萨师范高等专科学校"],
  [1, 0, "西藏职业技术学院"]],

  "156": [
  [0, 0, "宁夏大学"],
  [0, 0, "宁夏医科大学"],
  [0, 0, "北方民族大学"],
  [0, 1, "宁夏大学新华学院"],
  [0, 1, "银川能源学院"],
  [0, 1, "中国矿业大学银川学院"],
  [1, 0, "宁夏工业职业学院"],
  [1, 0, "宁夏职业技术学院"],
  [1, 0, "宁夏工商职业技术学院"],
  [1, 0, "宁夏财经职业技术学院"],
  [1, 0, "宁夏司法警官职业学院"],
  [1, 0, "宁夏建设职业技术学院"],
  [1, 0, "宁夏葡萄酒与防沙治沙职业技术学院"],
  [1, 0, "宁夏幼儿师范高等专科学校"],
  [1, 0, "宁夏艺术职业学院"]],

  "157": [
  [1, 0, "宁夏民族职业技术学院"]],

  "158": [
  [0, 1, "宁夏理工学院"]],

  "159": [
  [0, 0, "宁夏师范学院"]],

  "160": [
  [0, 0, "新疆大学"],
  [0, 0, "新疆医科大学"],
  [0, 0, "新疆师范大学"],
  [0, 0, "新疆财经大学"],
  [0, 0, "新疆艺术学院"],
  [0, 0, "新疆工程学院"],
  [0, 0, "新疆警察学院"],
  [0, 1, "新疆大学科学技术学院"],
  [0, 1, "新疆农业大学科学技术学院"],
  [0, 1, "新疆医科大学厚博学院"],
  [0, 1, "新疆财经大学商务学院"],
  [1, 0, "乌鲁木齐职业大学"],
  [1, 0, "新疆机电职业技术学院"],
  [1, 0, "新疆轻工职业技术学院"],
  [1, 1, "新疆能源职业技术学院"],
  [1, 0, "新疆建设职业技术学院"],
  [1, 1, "新疆现代职业技术学院"],
  [1, 1, "新疆天山职业技术学院"],
  [1, 0, "新疆交通职业技术学院"],
  [1, 0, "新疆职业大学"],
  [1, 0, "新疆体育职业技术学院"],
  [1, 0, "新疆师范高等专科学校"],
  [1, 0, "新疆铁道职业技术学院"],
  [1, 0, "新疆生产建设兵团兴新职业技术学院"],
  [1, 1, "新疆科技职业技术学院"],
  [0, 0, "新疆农业大学"],
  [1, 0, "新疆工业职业技术学院"]],

  "161": [
  [0, 0, "塔里木大学"]],

  "162": [
  [0, 0, "伊犁师范学院"],
  [1, 0, "伊犁职业技术学院"],
  [1, 0, "新疆应用职业技术学院"]],

  "163": [
  [1, 0, "新疆兵团警官高等专科学校"]],

  "164": [
  [1, 0, "吐鲁番职业技术学院"]],

  "165": [
  [0, 0, "石河子大学"],
  [0, 1, "石河子大学科技学院"],
  [1, 0, "新疆石河子职业技术学院"]],

  "166": [
  [1, 0, "克拉玛依职业技术学院"]],

  "167": [
  [0, 0, "喀什大学"]],

  "168": [
  [1, 0, "和田师范专科学校"],
  [1, 0, "新疆维吾尔医学专科学校"]],

  "169": [
  [1, 0, "哈密职业技术学院"]],

  "170": [
  [0, 0, "昌吉学院"],
  [1, 0, "新疆农业职业技术学院"],
  [1, 0, "昌吉职业技术学院"]],

  "171": [
  [1, 0, "巴音郭楞职业技术学院"]],

  "172": [
  [1, 0, "阿克苏职业技术学院"]],

  "173": [
  [0, 0, "玉林师范学院"],
  [1, 1, "玉柴职业技术学院"]],

  "174": [
  [0, 0, "梧州学院"],
  [1, 0, "梧州职业学院"]],

  "175": [
  [0, 0, "钦州学院"],
  [1, 1, "广西英华国际职业学院"]],

  "176": [
  [0, 0, "广西大学"],
  [0, 0, "广西医科大学"],
  [0, 0, "广西中医药大学"],
  [0, 0, "广西师范学院"],
  [0, 0, "广西艺术学院"],
  [0, 0, "广西民族大学"],
  [0, 0, "广西财经学院"],
  [0, 1, "南宁学院"],
  [0, 0, "广西警察学院"],
  [0, 1, "广西大学行健文理学院"],
  [0, 1, "广西民族大学相思湖学院"],
  [0, 1, "广西师范学院师园学院"],
  [0, 1, "广西中医药大学赛恩斯新医药学院"],
  [0, 1, "广西外国语学院"],
  [1, 0, "广西机电职业技术学院"],
  [1, 0, "广西体育高等专科学校"],
  [1, 0, "南宁职业技术学院"],
  [1, 0, "广西水利电力职业技术学院"],
  [1, 0, "广西职业技术学院"],
  [1, 0, "广西交通职业技术学院"],
  [1, 0, "广西工业职业技术学院"],
  [1, 0, "广西国际商务职业技术学院"],
  [1, 0, "广西农业职业技术学院"],
  [1, 0, "广西建设职业技术学院"],
  [1, 0, "广西经贸职业技术学院"],
  [1, 0, "广西工商职业技术学院"],
  [1, 1, "广西演艺职业学院"],
  [1, 0, "广西电力职业技术学院"],
  [1, 1, "广西经济职业学院"],
  [1, 0, "广西幼儿师范高等专科学校"],
  [1, 0, "广西卫生职业技术学院"],
  [1, 0, "广西金融职业技术学院"]],

  "177": [
  [0, 0, "广西科技大学"],
  [0, 1, "广西科技大学鹿山学院"],
  [1, 0, "柳州职业技术学院"],
  [1, 0, "广西生态工程职业技术学院"],
  [1, 0, "柳州铁道职业技术学院"],
  [1, 0, "柳州城市职业学院"]],

  "178": [
  [0, 0, "广西科技师范学院"],
  [1, 1, "广西蓝天航空职业学院"]],

  "179": [
  [0, 0, "贺州学院"]],

  "180": [
  [0, 0, "河池学院"],
  [1, 0, "广西现代职业技术学院"]],

  "181": [
  [0, 0, "桂林电子科技大学"],
  [0, 0, "桂林理工大学"],
  [0, 0, "桂林医学院"],
  [0, 0, "广西师范大学"],
  [0, 0, "桂林航天工业学院"],
  [0, 0, "桂林旅游学院"],
  [0, 1, "广西师范大学漓江学院"],
  [0, 1, "桂林电子科技大学信息科技学院"],
  [0, 1, "桂林理工大学博文管理学院"],
  [1, 0, "桂林师范高等专科学校"],
  [1, 1, "桂林山水职业学院"]],

  "182": [
  [0, 0, "广西民族师范学院"],
  [1, 1, "广西城市职业学院"],
  [1, 1, "广西理工职业技术学院"],
  [1, 1, "广西科技职业学院"],
  [1, 1, "广西中远职业学院"]],

  "183": [
  [0, 1, "北海艺术设计学院"],
  [0, 1, "北京航空航天大学北海学院"],
  [1, 0, "北海职业学院"]],

  "184": [
  [0, 0, "右江民族医学院"],
  [0, 0, "百色学院"],
  [1, 0, "百色职业学院"],
  [1, 1, "广西工程职业学院"],
  [1, 1, "广西培贤国际职业学院"]],

  "185": [
  [1, 0, "海南外国语职业学院"]],

  "186": [
  [0, 0, "海南热带海洋学院"],
  [0, 1, "三亚学院"],
  [1, 1, "三亚城市职业学院"],
  [1, 1, "三亚航空旅游职业学院"],
  [1, 1, "三亚理工职业学院"]],

  "187": [
  [1, 0, "海南软件职业技术学院"]],

  "188": [
  [0, 0, "海南大学"],
  [0, 0, "海南师范大学"],
  [0, 0, "海南医学院"],
  [0, 1, "海口经济学院"],
  [0, 0, "琼台师范学院"],
  [1, 0, "海南职业技术学院"],
  [1, 0, "海南政法职业学院"],
  [1, 0, "海南经贸职业技术学院"],
  [1, 1, "海南工商职业学院"],
  [1, 1, "海南科技职业学院"],
  [1, 0, "海南体育职业技术学院"]],

  "189": [
  [0, 0, "湖南工业大学"],
  [0, 1, "湖南工业大学科技学院"],
  [1, 0, "株洲师范高等专科学校"],
  [1, 0, "湖南冶金职业技术学院"],
  [1, 0, "湖南铁道职业技术学院"],
  [1, 0, "湖南化工职业技术学院"],
  [1, 0, "湖南中医药高等专科学校"],
  [1, 0, "湖南汽车工程职业学院"],
  [1, 0, "湖南铁路科技职业技术学院"],
  [1, 0, "湖南有色金属职业技术学院"]],

  "190": [
  [0, 0, "湖南大学"],
  [0, 0, "中南大学"],
  [0, 0, "长沙理工大学"],
  [0, 0, "湖南农业大学"],
  [0, 0, "中南林业科技大学"],
  [0, 0, "湖南中医药大学"],
  [0, 0, "湖南师范大学"],
  [0, 0, "湖南商学院"],
  [0, 1, "长沙医学院"],
  [0, 0, "长沙学院"],
  [0, 0, "湖南财政经济学院"],
  [0, 0, "湖南警察学院"],
  [0, 0, "湖南女子学院"],
  [0, 0, "湖南第一师范学院"],
  [0, 1, "湖南涉外经济学院"],
  [0, 1, "湖南商学院北津学院"],
  [0, 1, "湖南师范大学树达学院"],
  [0, 1, "湖南农业大学东方科技学院"],
  [0, 1, "中南林业科技大学涉外学院"],
  [0, 1, "湖南中医药大学湘杏学院"],
  [0, 1, "长沙理工大学城南学院"],
  [0, 0, "长沙师范学院"],
  [0, 1, "湖南信息学院"],
  [1, 0, "长沙民政职业技术学院"],
  [1, 0, "湖南工业职业技术学院"],
  [1, 0, "湖南信息职业技术学院"],
  [1, 0, "湖南税务高等专科学校"],
  [1, 0, "长沙航空职业技术学院"],
  [1, 0, "湖南大众传媒职业技术学院"],
  [1, 0, "湖南科技职业学院"],
  [1, 0, "湖南生物机电职业技术学院"],
  [1, 0, "湖南交通职业技术学院"],
  [1, 0, "湖南商务职业技术学院"],
  [1, 0, "湖南体育职业学院"],
  [1, 0, "湖南工程职业技术学院"],
  [1, 0, "保险职业学院"],
  [1, 0, "湖南外贸职业学院"],
  [1, 0, "湖南网络工程职业学院"],
  [1, 0, "湖南司法警官职业学院"],
  [1, 0, "长沙商贸旅游职业技术学院"],
  [1, 0, "湖南邮电职业技术学院"],
  [1, 0, "长沙环境保护职业技术学院"],
  [1, 0, "湖南艺术职业学院"],
  [1, 0, "湖南机电职业技术学院"],
  [1, 0, "长沙职业技术学院"],
  [1, 1, "长沙南方职业学院"],
  [1, 0, "长沙电力职业技术学院"],
  [1, 0, "湖南水利水电职业技术学院"],
  [1, 0, "湖南现代物流职业技术学院"],
  [1, 0, "湖南安全技术职业学院"],
  [1, 1, "湖南外国语职业学院"],
  [1, 1, "湖南都市职业学院"],
  [1, 1, "湖南电子科技职业学院"],
  [1, 1, "湖南三一工业职业技术学院"],
  [1, 0, "长沙卫生职业学院"],
  [1, 0, "湖南食品药品职业学院"],
  [1, 0, "湖南劳动人事职业学院"]],

  "191": [
  [0, 1, "吉首大学张家界学院"],
  [1, 0, "张家界航空工业职业技术学院"]],

  "192": [
  [0, 0, "湖南理工学院"],
  [0, 1, "湖南理工学院南湖学院"],
  [1, 0, "岳阳职业技术学院"],
  [1, 0, "湖南石油化工职业技术学院"],
  [1, 0, "湖南民族职业学院"]],

  "193": [
  [0, 0, "湖南科技学院"],
  [1, 0, "永州职业技术学院"],
  [1, 1, "湖南九嶷职业技术学院"]],

  "194": [
  [0, 0, "湖南城市学院"],
  [1, 0, "益阳职业技术学院"],
  [1, 0, "湖南工艺美术职业学院"],
  [1, 0, "益阳医学高等专科学校"]],

  "195": [
  [0, 0, "吉首大学"],
  [1, 0, "湘西民族职业技术学院"]],

  "196": [
  [0, 0, "湘潭大学"],
  [0, 0, "湖南科技大学"],
  [0, 0, "湖南工程学院"],
  [0, 1, "湘潭大学兴湘学院"],
  [0, 1, "湖南科技大学潇湘学院"],
  [0, 1, "湖南工程学院应用技术学院"],
  [1, 0, "湘潭医卫职业技术学院"],
  [1, 0, "湖南城建职业技术学院"],
  [1, 0, "湖南理工职业技术学院"],
  [1, 1, "湖南软件职业学院"],
  [1, 0, "湖南电气职业技术学院"],
  [1, 0, "湖南国防工业职业技术学院"],
  [1, 1, "湖南吉利汽车职业技术学院"]],

  "197": [
  [0, 0, "邵阳学院"],
  [1, 0, "邵阳职业技术学院"]],

  "198": [
  [0, 0, "湖南人文科技学院"],
  [1, 0, "娄底职业技术学院"],
  [1, 1, "潇湘职业学院"]],

  "199": [
  [0, 0, "怀化学院"],
  [0, 0, "湖南医药学院"],
  [1, 0, "怀化职业技术学院"]],

  "200": [
  [0, 0, "衡阳师范学院"],
  [0, 0, "南华大学"],
  [0, 0, "湖南工学院"],
  [0, 1, "南华大学船山学院"],
  [0, 1, "衡阳师范学院南岳学院"],
  [0, 1, "湖南交通工程学院"],
  [1, 0, "湖南环境生物职业技术学院"],
  [1, 0, "湖南财经工业职业技术学院"],
  [1, 0, "湖南高速铁路职业技术学院"],
  [1, 1, "湖南工商职业学院"]],

  "201": [
  [0, 0, "湘南学院"],
  [1, 0, "郴州职业技术学院"],
  [1, 0, "湘南幼儿师范高等专科学校"]],

  "202": [
  [0, 0, "湖南文理学院"],
  [0, 1, "湖南文理学院芙蓉学院"],
  [0, 1, "湖南应用技术学院"],
  [1, 0, "常德职业技术学院"],
  [1, 1, "湖南高尔夫旅游职业学院"],
  [1, 0, "湖南幼儿师范高等专科学校"]],

  "203": [
  [0, 0, "三峡大学"],
  [0, 1, "三峡大学科技学院"],
  [1, 0, "湖北三峡职业技术学院"],
  [1, 0, "三峡电力职业学院"],
  [1, 0, "三峡旅游职业技术学院"]],

  "204": [
  [0, 0, "湖北工程学院"],
  [0, 1, "湖北工程学院新技术学院"],
  [1, 0, "湖北职业技术学院"]],

  "205": [
  [0, 0, "湖北文理学院"],
  [0, 1, "湖北文理学院理工学院"],
  [1, 0, "襄阳职业技术学院"],
  [1, 0, "襄阳汽车职业技术学院"]],

  "206": [
  [0, 0, "湖北科技学院"],
  [1, 0, "咸宁职业技术学院"]],

  "207": [
  [1, 0, "仙桃职业学院"]],

  "208": [
  [0, 0, "武汉大学"],
  [0, 0, "华中科技大学"],
  [0, 0, "武汉科技大学"],
  [0, 0, "武汉工程大学"],
  [0, 0, "中国地质大学（武汉）"],
  [0, 0, "武汉纺织大学"],
  [0, 0, "武汉轻工大学"],
  [0, 0, "武汉理工大学"],
  [0, 0, "湖北工业大学"],
  [0, 0, "华中农业大学"],
  [0, 0, "湖北中医药大学"],
  [0, 0, "华中师范大学"],
  [0, 0, "湖北大学"],
  [0, 0, "中南财经政法大学"],
  [0, 0, "武汉体育学院"],
  [0, 0, "湖北美术学院"],
  [0, 0, "中南民族大学"],
  [0, 0, "江汉大学"],
  [0, 0, "湖北警官学院"],
  [0, 0, "武汉音乐学院"],
  [0, 0, "湖北经济学院"],
  [0, 0, "武汉商学院"],
  [0, 1, "武汉东湖学院"],
  [0, 1, "汉口学院"],
  [0, 1, "武昌首义学院"],
  [0, 1, "武昌理工学院"],
  [0, 1, "武汉生物工程学院"],
  [1, 0, "武汉铁路桥梁职业学院"],
  [0, 1, "武汉晴川学院"],
  [0, 1, "湖北大学知行学院"],
  [0, 1, "武汉科技大学城市学院"],
  [0, 1, "江汉大学文理学院"],
  [0, 1, "湖北工业大学工程技术学院"],
  [0, 1, "武汉工程大学邮电与信息工程学院"],
  [0, 1, "武汉纺织大学外经贸学院"],
  [0, 1, "武昌工学院"],
  [0, 1, "武汉工商学院"],
  [0, 1, "湖北商贸学院"],
  [0, 1, "湖北经济学院法商学院"],
  [0, 1, "武汉体育学院体育科技学院"],
  [0, 1, "文华学院"],
  [0, 1, "武汉学院"],
  [0, 1, "武汉工程科技学院"],
  [0, 1, "武汉华夏理工学院"],
  [0, 1, "武汉传媒学院"],
  [0, 1, "武汉设计工程学院"],
  [0, 0, "湖北第二师范学院"],
  [1, 0, "武汉职业技术学院"],
  [1, 0, "长江职业学院"],
  [1, 0, "武汉城市职业学院"],
  [1, 0, "武汉船舶职业技术学院"],
  [1, 1, "武汉工贸职业学院"],
  [1, 0, "武汉工程职业技术学院"],
  [1, 0, "湖北轻工职业技术学院"],
  [1, 0, "湖北交通职业技术学院"],
  [1, 0, "武汉航海职业技术学院"],
  [1, 0, "武汉铁路职业技术学院"],
  [1, 0, "武汉软件工程职业学院"],
  [1, 0, "武汉电力职业技术学院"],
  [1, 0, "湖北水利水电职业技术学院"],
  [1, 0, "湖北城市建设职业技术学院"],
  [1, 0, "武汉警官职业学院"],
  [1, 0, "湖北生物科技职业学院"],
  [1, 1, "湖北开放职业学院"],
  [1, 1, "武汉科技职业学院"],
  [1, 1, "武汉外语外事职业学院"],
  [1, 1, "武汉信息传播职业技术学院"],
  [1, 1, "武昌职业学院"],
  [1, 1, "武汉商贸职业学院"],
  [1, 0, "湖北艺术职业学院"],
  [1, 0, "武汉交通职业学院"],
  [1, 0, "长江工程职业技术学院"],
  [1, 0, "武汉工业职业技术学院"],
  [1, 0, "武汉民政职业学院"],
  [1, 0, "湖北财税职业学院"],
  [1, 0, "湖北国土资源职业学院"],
  [1, 0, "湖北生态工程职业技术学院"],
  [1, 1, "湖北科技职业学院"],
  [1, 0, "湖北青年职业学院"],
  [1, 0, "湖北体育职业学院"],
  [1, 0, "湖北幼儿师范高等专科学校"],
  [1, 0, "湖北铁道运输职业学院"],
  [1, 0, "武汉海事职业学院"]],

  "209": [
  [1, 1, "天门职业学院"]],

  "210": [
  [1, 0, "随州职业技术学院"]],

  "211": [
  [0, 0, "汉江师范学院"],
  [0, 0, "湖北汽车工业学院"],
  [0, 0, "湖北医药学院"],
  [0, 1, "湖北汽车工业学院科技学院"],
  [0, 1, "湖北医药学院药护学院"],
  [1, 0, "湖北工业职业技术学院"],
  [1, 1, "武当职业学院"]],

  "212": [
  [1, 0, "江汉艺术职业学院"]],

  "213": [
  [0, 0, "长江大学"],
  [0, 1, "长江大学工程技术学院"],
  [0, 1, "长江大学文理学院"],
  [1, 0, "荆州理工职业学院"],
  [1, 0, "荆州职业技术学院"],
  [1, 0, "湖北中医药高等专科学校"]],

  "214": [
  [0, 0, "荆楚理工学院"],
  [1, 0, "荆门职业学院"]],

  "215": [
  [0, 0, "湖北师范大学"],
  [0, 0, "湖北理工学院"],
  [0, 1, "湖北师范大学文理学院"],
  [1, 0, "湖北工程职业学院"]],

  "216": [
  [0, 0, "黄冈师范学院"],
  [1, 0, "黄冈职业技术学院"],
  [1, 0, "鄂东职业技术学院"],
  [1, 1, "黄冈科技职业学院"]],

  "217": [
  [0, 0, "湖北民族学院"],
  [0, 1, "湖北民族学院科技学院"],
  [1, 0, "恩施职业技术学院"]],

  "218": [
  [1, 0, "鄂州职业大学"]],

  "220": [
  [0, 0, "黄淮学院"],
  [1, 0, "驻马店职业技术学院"]],

  "221": [
  [0, 0, "周口师范学院"],
  [1, 0, "周口职业技术学院"],
  [1, 1, "周口科技职业学院"]],

  "222": [
  [0, 0, "华北水利水电大学"],
  [0, 0, "郑州大学"],
  [0, 0, "郑州轻工业学院"],
  [0, 0, "河南工业大学"],
  [0, 0, "中原工学院"],
  [0, 0, "河南农业大学"],
  [0, 0, "河南牧业经济学院"],
  [0, 0, "河南中医药大学"],
  [0, 0, "河南财经政法大学"],
  [0, 0, "郑州航空工业管理学院"],
  [0, 0, "郑州工程技术学院"],
  [0, 0, "河南工程学院"],
  [0, 0, "河南财政金融学院"],
  [0, 0, "河南警察学院"],
  [0, 1, "黄河科技学院"],
  [0, 0, "铁道警察学院"],
  [0, 1, "郑州科技学院"],
  [0, 1, "郑州工业应用技术学院"],
  [0, 0, "郑州师范学院"],
  [0, 1, "郑州财经学院"],
  [0, 1, "河南师范大学新联学院"],
  [0, 1, "郑州工商学院"],
  [0, 1, "中原工学院信息商务学院"],
  [0, 1, "郑州成功财经学院"],
  [0, 1, "郑州升达经贸管理学院"],
  [1, 0, "河南职业技术学院"],
  [1, 0, "郑州铁路职业技术学院"],
  [1, 0, "郑州电力高等专科学校"],
  [1, 0, "河南水利与环境职业学院"],
  [1, 0, "河南司法警官职业学院"],
  [1, 1, "郑州澍青医学高等专科学校"],
  [1, 0, "河南检察职业学院"],
  [1, 0, "郑州信息科技职业学院"],
  [1, 1, "郑州电子信息职业技术学院"],
  [1, 1, "嵩山少林武术职业学院"],
  [1, 0, "郑州工业安全职业学院"],
  [1, 0, "河南经贸职业学院"],
  [1, 0, "河南交通职业技术学院"],
  [1, 0, "河南农业职业学院"],
  [1, 0, "郑州旅游职业学院"],
  [1, 0, "郑州职业技术学院"],
  [1, 0, "河南信息统计职业学院"],
  [1, 0, "河南工业贸易职业学院"],
  [1, 1, "郑州电力职业技术学院"],
  [1, 0, "河南建筑职业技术学院"],
  [1, 1, "郑州城市职业学院"],
  [1, 1, "郑州理工职业学院"],
  [1, 1, "郑州信息工程职业学院"],
  [1, 0, "河南应用技术职业学院"],
  [1, 0, "河南艺术职业学院"],
  [1, 0, "河南机电职业学院"],
  [1, 1, "郑州商贸旅游职业学院"],
  [1, 0, "郑州幼儿师范高等专科学校"],
  [1, 1, "郑州黄河护理职业学院"],
  [1, 0, "河南医学高等专科学校"],
  [1, 0, "郑州财税金融职业学院"]],

  "223": [
  [0, 0, "许昌学院"],
  [1, 0, "许昌职业技术学院"],
  [1, 1, "许昌陶瓷职业学院"],
  [1, 0, "许昌电气职业学院"]],

  "224": [
  [0, 0, "信阳师范学院"],
  [0, 0, "信阳农林学院"],
  [0, 1, "信阳学院"],
  [1, 0, "信阳职业技术学院"],
  [1, 1, "信阳涉外职业技术学院"]],

  "225": [
  [0, 0, "河南科技学院"],
  [0, 0, "新乡医学院"],
  [0, 0, "河南师范大学"],
  [0, 0, "新乡学院"],
  [0, 0, "河南工学院"],
  [0, 1, "新乡医学院三全学院"],
  [0, 1, "河南科技学院新科学院"],
  [1, 0, "新乡职业技术学院"],
  [1, 1, "长垣烹饪职业技术学院"]],

  "226": [],
  "227": [
  [0, 0, "商丘师范学院"],
  [0, 1, "商丘工学院"],
  [0, 1, "商丘学院"],
  [1, 0, "商丘职业技术学院"],
  [1, 0, "商丘医学高等专科学校"],
  [1, 0, "永城职业学院"]],

  "228": [
  [1, 0, "三门峡职业技术学院"]],

  "229": [
  [1, 0, "濮阳职业技术学院"]],

  "230": [
  [0, 0, "平顶山学院"],
  [0, 0, "河南城建学院"],
  [1, 0, "平顶山工业职业技术学院"],
  [1, 0, "河南质量工程职业学院"],
  [1, 1, "平顶山文化艺术职业学院"]],

  "231": [
  [0, 0, "南阳师范学院"],
  [0, 0, "南阳理工学院"],
  [1, 0, "河南工业职业技术学院"],
  [1, 0, "南阳医学高等专科学校"],
  [1, 1, "南阳职业学院"],
  [1, 0, "南阳农业职业学院"]],

  "232": [
  [1, 0, "漯河职业技术学院"],
  [1, 0, "漯河医学高等专科学校"],
  [1, 1, "漯河食品职业学院"]],

  "233": [
  [0, 0, "河南科技大学"],
  [0, 0, "洛阳师范学院"],
  [0, 0, "洛阳理工学院"],
  [1, 0, "河南林业职业学院"],
  [1, 0, "河南推拿职业学院"],
  [1, 0, "洛阳职业技术学院"]],

  "234": [
  [1, 1, "洛阳科技职业学院"],
  [0, 0, "河南大学"],
  [0, 1, "河南大学民生学院"],
  [1, 0, "开封大学"],
  [1, 0, "黄河水利职业技术学院"],
  [1, 0, "开封文化艺术职业学院"]],

  "235": [
  [0, 0, "河南理工大学"],
  [0, 1, "黄河交通学院"],
  [1, 0, "焦作大学"],
  [1, 0, "河南工业和信息化职业学院"],
  [1, 0, "焦作师范高等专科学校"],
  [1, 1, "焦作工贸职业学院"]],

  "236": [
  [1, 0, "济源职业技术学院"]],

  "237": [
  [1, 0, "鹤壁职业技术学院"],
  [1, 1, "鹤壁汽车工程职业学院"],
  [1, 1, "鹤壁能源化工职业学院"]],

  "238": [
  [0, 0, "安阳师范学院"],
  [0, 0, "安阳工学院"],
  [0, 1, "安阳学院"],
  [1, 0, "安阳职业技术学院"],
  [1, 0, "河南护理职业学院"],
  [1, 0, "安阳幼儿师范高等专科学校"]],

  "239": [
  [0, 0, "山东理工大学"],
  [0, 1, "齐鲁医药学院"],
  [1, 0, "淄博职业学院"],
  [1, 0, "山东工业职业学院"],
  [1, 0, "山东化工职业学院"],
  [1, 0, "淄博师范高等专科学校"],
  [1, 0, "山东铝业职业学院"],
  [1, 0, "山东轻工职业学院"]],

  "240": [
  [0, 0, "枣庄学院"],
  [1, 0, "枣庄科技职业学院"],
  [1, 0, "枣庄职业学院"]],

  "241": [
  [0, 0, "鲁东大学"],
  [0, 0, "烟台大学"],
  [0, 0, "山东工商学院"],
  [0, 1, "烟台南山学院"],
  [0, 1, "烟台大学文经学院"],
  [0, 1, "青岛农业大学海都学院"],
  [1, 0, "烟台职业学院"],
  [1, 0, "烟台工程职业技术学院"],
  [1, 0, "山东中医药高等专科学校"],
  [1, 0, "山东商务职业学院"],
  [1, 0, "烟台汽车工程职业学院"],
  [1, 1, "山东文化产业职业学院"],
  [1, 1, "烟台黄金职业学院"]],

  "242": [
  [0, 0, "潍坊医学院"],
  [0, 0, "潍坊学院"],
  [0, 1, "潍坊科技学院"],
  [1, 0, "潍坊职业学院"],
  [1, 0, "山东科技职业学院"],
  [1, 0, "山东畜牧兽医职业学院"],
  [1, 0, "山东交通职业学院"],
  [1, 0, "山东信息职业技术学院"],
  [1, 0, "山东经贸职业学院"],
  [1, 1, "潍坊工商职业学院"],
  [1, 1, "山东海事职业学院"],
  [1, 0, "潍坊护理职业学院"],
  [1, 0, "潍坊工程职业学院"]],

  "243": [
  [1, 0, "威海职业学院"],
  [1, 1, "山东外事翻译职业学院"],
  [1, 0, "山东药品食品职业学院"],
  [1, 0, "威海海洋职业学院"]],

  "244": [
  [0, 0, "山东农业大学"],
  [0, 0, "泰山医学院"],
  [0, 0, "泰山学院"],
  [0, 1, "山东科技大学泰山科技学院"],
  [0, 1, "山东财经大学东方学院"],
  [1, 0, "山东服装职业学院"],
  [1, 1, "山东力明科技职业学院"],
  [1, 0, "泰山职业技术学院"],
  [1, 0, "泰山护理职业学院"]],

  "245": [
  [1, 0, "日照职业技术学院"],
  [1, 0, "山东水利职业学院"],
  [1, 1, "山东外国语职业学院"]],

  "246": [
  [0, 0, "中国海洋大学"],
  [0, 0, "山东科技大学"],
  [0, 0, "中国石油大学（华东）"],
  [0, 0, "青岛科技大学"],
  [0, 0, "青岛理工大学"],
  [0, 0, "青岛农业大学"],
  [0, 1, "青岛滨海学院"],
  [0, 0, "青岛大学"],
  [0, 1, "青岛恒星科技学院"],
  [0, 1, "青岛黄海学院"],
  [0, 1, "青岛理工大学琴岛学院"],
  [0, 1, "青岛工学院"],
  [0, 1, "北京电影学院现代创意媒体学院"],
  [1, 0, "青岛职业技术学院"],
  [1, 1, "青岛飞洋职业技术学院"],
  [1, 0, "山东外贸职业学院"],
  [1, 0, "青岛酒店管理职业技术学院"],
  [1, 0, "青岛港湾职业技术学院"],
  [1, 1, "青岛求实职业技术学院"],
  [1, 0, "青岛远洋船员职业学院"]],

  "247": [
  [0, 0, "临沂大学"],
  [1, 0, "山东医学高等专科学校"],
  [1, 0, "临沂职业学院"]],

  "248": [
  [0, 0, "聊城大学"],
  [0, 1, "聊城大学东昌学院"],
  [1, 0, "聊城职业技术学院"]],

  "249": [
  [1, 0, "莱芜职业技术学院"]],

  "250": [
  [0, 0, "济宁医学院"],
  [0, 0, "曲阜师范大学"],
  [0, 0, "济宁学院"],
  [1, 1, "曲阜远东职业技术学院"],
  [1, 0, "济宁职业技术学院"],
  [1, 0, "山东理工职业学院"]],

  "251": [
  [0, 0, "山东大学"],
  [0, 0, "济南大学"],
  [0, 0, "山东建筑大学"],
  [0, 0, "齐鲁工业大学"],
  [0, 0, "山东中医药大学"],
  [0, 0, "山东师范大学"],
  [0, 0, "山东财经大学"],
  [0, 0, "山东体育学院"],
  [0, 0, "山东艺术学院"],
  [0, 0, "山东工艺美术学院"],
  [0, 0, "山东警察学院"],
  [0, 0, "山东交通学院"],
  [0, 0, "山东女子学院"],
  [0, 1, "山东英才学院"],
  [0, 1, "山东现代学院"],
  [0, 1, "山东协和学院"],
  [0, 1, "山东师范大学历山学院"],
  [0, 1, "山东财经大学燕山学院"],
  [0, 1, "齐鲁理工学院"],
  [0, 1, "济南大学泉城学院"],
  [0, 0, "山东政法学院"],
  [0, 0, "齐鲁师范学院"],
  [0, 0, "山东青年政治学院"],
  [0, 0, "山东管理学院"],
  [0, 0, "山东农业工程学院"],
  [1, 0, "山东商业职业技术学院"],
  [1, 0, "山东电力高等专科学校"],
  [1, 0, "山东职业学院"],
  [1, 0, "山东劳动职业技术学院"],
  [1, 1, "山东圣翰财贸职业学院"],
  [1, 0, "济南职业学院"],
  [1, 1, "山东凯文科技职业学院"],
  [1, 0, "济南工程职业技术学院"],
  [1, 0, "山东电子职业技术学院"],
  [1, 0, "山东旅游职业学院"],
  [1, 1, "山东杏林科技职业学院"],
  [1, 0, "山东城市建设职业学院"],
  [1, 0, "山东司法警官职业学院"],
  [1, 0, "山东传媒职业学院"],
  [1, 0, "济南幼儿师范高等专科学校"],
  [1, 0, "济南护理职业学院"],
  [1, 1, "山东艺术设计职业学院"],
  [1, 0, "山东特殊教育职业学院"]],

  "252": [
  [0, 0, "菏泽学院"],
  [1, 0, "菏泽医学专科学校"],
  [1, 0, "菏泽家政职业学院"],
  [1, 0, "菏泽职业学院"]],

  "253": [
  [0, 1, "中国石油大学胜利学院"],
  [1, 0, "东营职业学院"],
  [1, 1, "东营科技职业学院"],
  [1, 0, "山东胜利职业学院"]],

  "254": [
  [0, 0, "德州学院"],
  [0, 1, "山东华宇工学院"],
  [1, 1, "德州科技职业学院"],
  [1, 0, "德州职业技术学院"]],

  "255": [
  [0, 0, "滨州医学院"],
  [0, 0, "滨州学院"],
  [1, 0, "滨州职业学院"]],

  "256": [
  [1, 0, "鹰潭职业技术学院"],
  [1, 0, "江西师范高等专科学校"]],

  "257": [
  [0, 0, "宜春学院"],
  [1, 0, "宜春职业技术学院"],
  [1, 0, "江西农业工程职业学院"],
  [1, 0, "宜春幼儿师范高等专科学校"],
  [1, 1, "江西洪州职业学院"]],

  "258": [
  [0, 0, "新余学院"],
  [0, 1, "江西工程学院"],
  [1, 1, "赣西科技职业学院"],
  [1, 1, "江西新能源科技职业学院"],
  [1, 0, "江西冶金职业技术学院"]],

  "259": [
  [0, 0, "上饶师范学院"],
  [1, 0, "江西医学高等专科学校"],
  [1, 0, "上饶职业技术学院"]],

  "260": [
  [0, 0, "萍乡学院"],
  [1, 0, "江西工业工程职业技术学院"],
  [1, 0, "江西应用工程职业学院"]],

  "261": [
  [0, 0, "南昌大学"],
  [0, 0, "华东交通大学"],
  [0, 0, "南昌航空大学"],
  [0, 0, "江西农业大学"],
  [0, 0, "江西中医药大学"],
  [0, 0, "江西师范大学"],
  [0, 0, "江西财经大学"],
  [0, 1, "江西科技学院"],
  [0, 0, "江西科技师范大学"],
  [0, 0, "南昌工程学院"],
  [0, 0, "江西警察学院"],
  [0, 1, "南昌理工学院"],
  [0, 1, "江西应用科技学院"],
  [0, 1, "江西服装学院"],
  [0, 1, "南昌工学院"],
  [0, 1, "南昌大学科学技术学院"],
  [0, 1, "华东交通大学理工学院"],
  [0, 1, "南昌航空大学科技学院"],
  [0, 1, "江西农业大学南昌商学院"],
  [0, 1, "江西中医药大学科技学院"],
  [0, 1, "江西师范大学科学技术学院"],
  [0, 1, "江西科技师范大学理工学院"],
  [0, 1, "江西财经大学现代经济管理学院"],
  [0, 0, "南昌师范学院"],
  [1, 0, "江西工业职业技术学院"],
  [1, 0, "江西司法警官职业学院"],
  [1, 0, "江西旅游商贸职业学院"],
  [1, 0, "江西电力职业技术学院"],
  [1, 0, "江西艺术职业学院"],
  [1, 0, "江西信息应用职业技术学院"],
  [1, 0, "江西交通职业技术学院"],
  [1, 0, "江西现代职业技术学院"],
  [1, 0, "江西机电职业技术学院"],
  [1, 1, "江西科技职业学院"],
  [1, 1, "南昌职业学院"],
  [1, 0, "江西外语外贸职业学院"],
  [1, 0, "江西工业贸易职业技术学院"],
  [1, 0, "江西生物科技职业学院"],
  [1, 0, "江西建设职业技术学院"],
  [1, 0, "南昌师范高等专科学校"],
  [1, 1, "江西先锋软件职业技术学院"],
  [1, 0, "江西经济管理职业学院"],
  [1, 0, "江西制造职业技术学院"],
  [1, 0, "江西工程职业学院"],
  [1, 0, "江西青年职业学院"],
  [1, 0, "江西航空职业技术学院"],
  [1, 0, "江西卫生职业学院"],
  [1, 1, "江西泰豪动漫职业学院"],
  [1, 0, "江西管理职业学院"],
  [1, 0, "江西传媒职业学院"],
  [1, 1, "江西工商职业技术学院"],
  [1, 0, "江西水利职业学院"],
  [1, 1, "南昌影视传播职业学院"]],

  "262": [
  [0, 0, "九江学院"],
  [0, 1, "南昌大学共青学院"],
  [1, 0, "九江职业大学"],
  [1, 0, "九江职业技术学院"],
  [1, 0, "江西财经职业学院"],
  [1, 1, "江西枫林涉外经贸职业学院"],
  [1, 1, "共青科技职业学院"]],

  "263": [
  [0, 0, "景德镇陶瓷大学"],
  [0, 0, "景德镇学院"],
  [0, 1, "景德镇陶瓷大学科技艺术学院"],
  [1, 0, "江西陶瓷工艺美术职业技术学院"],
  [1, 1, "景德镇陶瓷职业技术学院"]],

  "264": [
  [0, 0, "井冈山大学"],
  [1, 0, "吉安职业技术学院"]],

  "265": [
  [0, 0, "江西理工大学"],
  [0, 0, "赣南医学院"],
  [0, 0, "赣南师范大学"],
  [0, 1, "江西理工大学应用科学学院"],
  [0, 1, "赣南师范大学科技学院"],
  [1, 0, "江西环境工程职业学院"],
  [1, 0, "江西应用技术职业学院"],
  [1, 0, "赣州师范高等专科学校"],
  [1, 0, "赣南卫生健康职业学院"]],

  "266": [
  [0, 0, "东华理工大学"],
  [0, 1, "东华理工大学长江学院"][(1, 0, "抚州职业技术学院")],
  [1, 0, "江西中医药高等专科学校"]],

  "267": [
  [1, 0, "宣城职业技术学院"]],

  "268": [
  [0, 0, "宿州学院"],
  [1, 0, "宿州职业技术学院"],
  [1, 0, "皖北卫生职业学院"]],

  "269": [
  [0, 0, "安徽工程大学"],
  [0, 0, "皖南医学院"],
  [0, 0, "安徽师范大学"],
  [0, 1, "安徽信息工程学院"],
  [0, 1, "安徽师范大学皖江学院"],
  [1, 0, "芜湖职业技术学院"],
  [1, 0, "安徽商贸职业技术学院"],
  [1, 0, "安徽中医药高等专科学校"],
  [1, 0, "安徽机电职业技术学院"],
  [1, 1, "安徽扬子职业技术学院"]],

  "270": [
  [0, 0, "铜陵学院"],
  [1, 0, "铜陵职业技术学院"],
  [1, 0, "安徽工业职业技术学院"]],

  "271": [
  [0, 0, "安徽工业大学"],
  [0, 1, "安徽工业大学工商学院"],
  [0, 1, "河海大学文天学院"],
  [1, 0, "安徽冶金科技职业学院"],
  [1, 0, "马鞍山师范高等专科学校"],
  [1, 0, "马鞍山职业技术学院"]],

  "272": [
  [0, 0, "皖西学院"],
  [1, 0, "六安职业技术学院"],
  [1, 0, "安徽国防科技职业学院"],
  [1, 1, "安徽现代信息工程职业学院"],
  [1, 0, "皖西卫生职业学院"]],

  "273": [
  [0, 0, "黄山学院"],
  [1, 0, "黄山职业技术学院"]],

  "274": [
  [0, 0, "安徽理工大学"],
  [0, 0, "淮南师范学院"],
  [1, 0, "淮南联合大学"],
  [1, 0, "淮南职业技术学院"],
  [1, 0, "安徽工贸职业技术学院"]],

  "275": [
  [0, 0, "淮北师范大学"],
  [0, 1, "淮北师范大学信息学院"],
  [1, 0, "淮北职业技术学院"],
  [1, 1, "安徽矿业职业技术学院"]],

  "276": [
  [0, 0, "安徽大学"],
  [0, 0, "中国科学技术大学"],
  [0, 0, "合肥工业大学"],
  [0, 0, "安徽农业大学"],
  [0, 0, "安徽医科大学"],
  [0, 0, "安徽中医药大学"],
  [0, 0, "巢湖学院"],
  [0, 0, "安徽建筑大学"],
  [0, 1, "安徽三联学院"],
  [0, 0, "合肥学院"],
  [0, 1, "安徽新华学院"],
  [0, 1, "安徽文达信息工程学院"],
  [0, 1, "安徽外国语学院"],
  [0, 1, "安徽大学江淮学院"],
  [0, 1, "安徽建筑大学城市建设学院"],
  [0, 1, "安徽农业大学经济技术学院"],
  [0, 1, "安徽医科大学临床医学院"],
  [0, 0, "合肥师范学院"],
  [1, 0, "安徽职业技术学院"],
  [1, 0, "安徽水利水电职业技术学院"],
  [1, 1, "民办万博科技职业学院"],
  [1, 0, "安徽警官职业学院"],
  [1, 0, "安徽工业经济职业技术学院"],
  [1, 0, "合肥通用职业技术学院"],
  [1, 1, "民办合肥经济技术职业学院"],
  [1, 0, "安徽交通职业技术学院"],
  [1, 0, "安徽体育运动职业技术学院"],
  [1, 0, "安徽医学高等专科学校"],
  [1, 0, "合肥职业技术学院"],
  [1, 0, "安徽广播影视职业技术学院"],
  [1, 1, "民办合肥滨湖职业技术学院"],
  [1, 0, "安徽电气工程职业技术学院"],
  [1, 0, "安徽城市管理职业学院"],
  [1, 0, "安徽工商职业学院"],
  [1, 0, "安徽中澳科技职业学院"],
  [1, 0, "安徽艺术职业学院"],
  [1, 0, "安徽财贸职业学院"],
  [1, 0, "安徽国际商务职业学院"],
  [1, 0, "安徽公安职业学院"],
  [1, 0, "安徽林业职业技术学院"],
  [1, 0, "安徽审计职业学院"],
  [1, 0, "安徽新闻出版职业技术学院"],
  [1, 0, "安徽邮电职业技术学院"],
  [1, 1, "民办合肥财经职业学院"],
  [1, 1, "安徽涉外经济职业学院"],
  [1, 1, "安徽绿海商务职业学院"],
  [1, 1, "合肥共达职业技术学院"],
  [1, 0, "徽商职业学院"],
  [1, 1, "合肥信息技术职业学院"],
  [1, 0, "安徽汽车职业技术学院"],
  [1, 0, "合肥幼儿师范高等专科学校"],
  [1, 1, "安徽长江职业学院"],
  [1, 0, "安徽粮食工程职业学院"],
  [1, 1, "合肥科技职业学院"]],

  "277": [
  [0, 0, "阜阳师范学院"],
  [0, 1, "阜阳师范学院信息工程学院"],
  [1, 0, "阜阳职业技术学院"],
  [1, 1, "阜阳科技职业学院"],
  [1, 1, "民办安徽旅游职业学院"],
  [1, 0, "阜阳幼儿师范高等专科学校"]],

  "278": [
  [0, 0, "滁州学院"],
  [0, 0, "安徽科技学院"],
  [1, 0, "滁州职业技术学院"],
  [1, 0, "滁州城市职业学院"]],

  "279": [
  [0, 0, "池州学院"],
  [1, 0, "池州职业技术学院"],
  [1, 0, "安徽人口职业学院"]],

  "280": [
  [0, 0, "亳州学院"],
  [1, 0, "亳州职业技术学院"]],

  "281": [
  [0, 0, "蚌埠医学院"],
  [0, 0, "安徽财经大学"],
  [0, 0, "蚌埠学院"],
  [0, 1, "安徽财经大学商学院"],
  [1, 0, "安徽电子信息职业技术学院"],
  [1, 1, "蚌埠经济技术职业学院"]],

  "282": [
  [0, 0, "安庆师范大学"],
  [1, 0, "安庆职业技术学院"],
  [1, 0, "安庆医药高等专科学校"],
  [1, 0, "桐城师范高等专科学校"],
  [1, 0, "安徽黄梅戏艺术职业学院"]],

  "283": [
  [0, 0, "浙江海洋大学"],
  [0, 1, "浙江海洋大学东海科学技术学院"],
  [1, 0, "浙江国际海运职业技术学院"],
  [1, 0, "浙江舟山群岛新区旅游与健康职业学院"]],

  "284": [
  [0, 0, "温州医科大学"],
  [0, 0, "温州大学"],
  [0, 1, "温州医科大学仁济学院"],
  [0, 1, "温州大学瓯江学院"],
  [0, 1, "温州商学院"],
  [0, 2, "温州肯恩大学"],
  [1, 0, "温州职业技术学院"],
  [1, 0, "浙江工贸职业技术学院"],
  [1, 1, "浙江东方职业技术学院"],
  [1, 0, "温州科技职业学院"],
  [1, 0, "浙江安防职业技术学院"]],

  "285": [
  [0, 0, "台州学院"],
  [1, 0, "台州职业技术学院"],
  [1, 0, "台州科技职业学院"],
  [1, 1, "浙江汽车职业技术学院"]],

  "286": [
  [0, 0, "绍兴文理学院"],
  [0, 1, "浙江越秀外国语学院"],
  [0, 1, "浙江农林大学暨阳学院"],
  [0, 1, "绍兴文理学院元培学院"],
  [1, 0, "浙江工业职业技术学院"],
  [1, 1, "绍兴职业技术学院"],
  [1, 0, "浙江邮电职业技术学院"],
  [1, 0, "浙江农业商贸职业学院"]],

  "287": [
  [0, 0, "衢州学院"],
  [1, 0, "衢州职业技术学院"]],

  "288": [
  [0, 0, "公安海警学院"],
  [0, 0, "浙江万里学院"],
  [0, 0, "宁波工程学院"],
  [0, 0, "宁波大学"],
  [0, 1, "宁波大红鹰学院"],
  [0, 1, "浙江大学宁波理工学院"],
  [0, 1, "宁波大学科学技术学院"],
  [0, 2, "宁波诺丁汉大学"],
  [1, 0, "宁波职业技术学院"],
  [1, 0, "宁波城市职业技术学院"],
  [1, 0, "浙江工商职业技术学院"],
  [1, 0, "浙江医药高等专科学校"],
  [1, 0, "浙江纺织服装职业技术学院"],
  [1, 0, "宁波卫生职业技术学院"]],

  "289": [
  [0, 0, "丽水学院"],
  [1, 0, "丽水职业技术学院"]],

  "290": [
  [0, 0, "浙江师范大学"],
  [0, 1, "浙江师范大学行知学院"],
  [0, 1, "上海财经大学浙江学院"],
  [1, 0, "金华职业技术学院"],
  [1, 0, "义乌工商职业技术学院"],
  [1, 1, "浙江广厦建设职业技术学院"],
  [1, 1, "浙江横店影视职业学院"]],

  "291": [
  [0, 0, "嘉兴学院"],
  [0, 1, "嘉兴学院南湖学院"],
  [0, 1, "浙江财经大学东方学院"],
  [0, 1, "同济大学浙江学院"],
  [1, 0, "嘉兴职业技术学院"],
  [1, 1, "嘉兴南洋职业技术学院"]],

  "292": [
  [0, 0, "湖州师范学院"],
  [0, 1, "湖州师范学院求真学院"],
  [1, 0, "湖州职业技术学院"]],

  "293": [
  [0, 0, "浙江大学"],
  [0, 0, "杭州电子科技大学"],
  [0, 0, "浙江工业大学"],
  [0, 0, "浙江理工大学"],
  [0, 0, "浙江农林大学"],
  [0, 0, "浙江中医药大学"],
  [0, 0, "杭州师范大学"],
  [0, 0, "浙江工商大学"],
  [0, 0, "中国美术学院"],
  [0, 0, "中国计量大学"],
  [0, 0, "浙江科技学院"],
  [0, 0, "浙江水利水电学院"],
  [0, 0, "浙江财经大学"],
  [0, 0, "浙江警察学院"],
  [0, 0, "浙江传媒学院"],
  [0, 1, "浙江树人学院"],
  [0, 1, "浙江大学城市学院"],
  [0, 0, "杭州医学院"],
  [0, 1, "浙江工业大学之江学院"],
  [0, 1, "杭州电子科技大学信息工程学院"],
  [0, 1, "浙江理工大学科技与艺术学院"],
  [0, 1, "浙江中医药大学滨江学院"],
  [0, 1, "杭州师范大学钱江学院"],
  [0, 1, "浙江工商大学杭州商学院"],
  [0, 1, "中国计量大学现代科技学院"],
  [0, 0, "浙江外国语学院"],
  [0, 0, "浙江音乐学院"],
  [1, 0, "浙江交通职业技术学院"],
  [1, 0, "浙江电力职业技术学院"],
  [1, 0, "浙江同济科技职业学院"],
  [1, 0, "浙江机电职业技术学院"],
  [1, 0, "浙江建设职业技术学院"],
  [1, 0, "浙江艺术职业学院"],
  [1, 0, "浙江经贸职业技术学院"],
  [1, 0, "浙江商业职业技术学院"],
  [1, 0, "浙江经济职业技术学院"],
  [1, 0, "浙江旅游职业学院"],
  [1, 1, "浙江育英职业技术学院"],
  [1, 0, "浙江警官职业学院"],
  [1, 0, "浙江金融职业学院"],
  [1, 0, "杭州职业技术学院"],
  [1, 0, "杭州科技职业技术学院"],
  [1, 1, "浙江长征职业技术学院"],
  [1, 1, "杭州万向职业技术学院"],
  [1, 0, "浙江体育职业技术学院"],
  [1, 0, "浙江特殊教育职业学院"]],

  "294": [
  [0, 0, "复旦大学"],
  [0, 0, "同济大学"],
  [0, 0, "上海交通大学"],
  [0, 0, "华东理工大学"],
  [0, 0, "上海理工大学"],
  [0, 0, "上海海事大学"],
  [0, 0, "东华大学"],
  [0, 0, "上海电力学院"],
  [0, 0, "上海应用技术大学"],
  [0, 0, "上海健康医学院"],
  [0, 0, "上海海洋大学"],
  [0, 0, "上海中医药大学"],
  [0, 0, "华东师范大学"],
  [0, 0, "上海师范大学"],
  [0, 0, "上海外国语大学"],
  [0, 0, "上海财经大学"],
  [0, 0, "上海对外经贸大学"],
  [0, 0, "上海海关学院"],
  [0, 0, "华东政法大学"],
  [0, 0, "上海体育学院"],
  [0, 0, "上海音乐学院"],
  [0, 0, "上海戏剧学院"],
  [0, 0, "上海大学"],
  [0, 0, "上海公安学院"],
  [0, 0, "上海工程技术大学"],
  [0, 0, "上海立信会计金融学院"],
  [0, 0, "上海电机学院"],
  [0, 1, "上海杉达学院"],
  [0, 0, "上海政法学院"],
  [0, 0, "上海第二工业大学"],
  [0, 0, "上海商学院"],
  [0, 1, "上海建桥学院"],
  [0, 1, "上海兴伟学院"],
  [0, 1, "上海视觉艺术学院"],
  [0, 1, "上海外国语大学贤达经济人文学院"],
  [0, 1, "上海师范大学天华学院"],
  [0, 0, "上海科技大学"],
  [0, 2, "  上海纽约大学"],
  [1, 0, "上海旅游高等专科学校"],
  [1, 1, "上海东海职业技术学院"],
  [1, 1, "上海工商职业技术学院"],
  [1, 0, "上海出版印刷高等专科学校"],
  [1, 0, "上海行健职业学院"],
  [1, 0, "上海城建职业学院"],
  [1, 0, "上海交通职业技术学院"],
  [1, 0, "上海海事职业技术学院"],
  [1, 0, "上海电子信息职业技术学院"],
  [1, 1, "上海震旦职业学院"],
  [1, 1, "上海民远职业技术学院"],
  [1, 1, "上海欧华职业技术学院"],
  [1, 1, "上海思博职业技术学院"],
  [1, 1, "上海立达职业技术学院"],
  [1, 0, "上海工艺美术职业学院"],
  [1, 1, "上海济光职业技术学院"],
  [1, 1, "上海工商外国语职业学院"],
  [1, 0, "上海科学技术职业学院"],
  [1, 0, "上海农林职业技术学院"],
  [1, 1, "上海邦德职业技术学院"],
  [1, 1, "上海中侨职业技术学院"],
  [1, 1, "上海电影艺术职业学院"],
  [1, 1, "上海中华职业技术学院"],
  [1, 0, "上海工会管理职业学院"],
  [1, 0, "上海体育职业学院"],
  [1, 0, "上海民航职业技术学院"]],

  "295": [
  [1, 0, "伊春职业学院"]],

  "296": [
  [0, 0, "绥化学院"]],

  "297": [
  [1, 0, "黑龙江煤炭职业技术学院"]],

  "298": [
  [0, 0, "齐齐哈尔大学"],
  [0, 0, "齐齐哈尔医学院"],
  [0, 1, "齐齐哈尔工程学院"],
  [1, 0, "齐齐哈尔高等师范专科学校"],
  [1, 0, "黑龙江交通职业技术学院"],
  [1, 1, "齐齐哈尔理工职业学院"]],

  "299": [
  [1, 0, "七台河职业学院"]],

  "300": [
  [0, 0, "牡丹江医学院"],
  [0, 0, "牡丹江师范学院"],
  [1, 0, "牡丹江大学"],
  [1, 0, "黑龙江林业职业技术学院"],
  [1, 0, "黑龙江农业经济职业学院"],
  [1, 0, "黑龙江商业职业学院"],
  [1, 0, "黑龙江幼儿师范高等专科学校"]],

  "301": [
  [0, 0, "佳木斯大学"],
  [1, 0, "黑龙江农业职业技术学院"],
  [1, 1, "黑龙江三江美术职业学院"],
  [1, 0, "佳木斯职业学院"]],

  "302": [
  [0, 0, "黑龙江工业学院"]],

  "303": [
  [0, 0, "黑河学院"]],

  "304": [
  [1, 0, "鹤岗师范高等专科学校"]],

  "305": [
  [0, 0, "黑龙江大学"],
  [0, 0, "哈尔滨工业大学"],
  [0, 0, "哈尔滨理工大学"],
  [0, 0, "哈尔滨工程大学"],
  [0, 0, "黑龙江科技大学"],
  [0, 0, "东北农业大学"],
  [0, 0, "东北林业大学"],
  [0, 0, "哈尔滨医科大学"],
  [0, 0, "黑龙江中医药大学"],
  [0, 0, "哈尔滨师范大学"],
  [0, 0, "哈尔滨学院"],
  [0, 0, "哈尔滨商业大学"],
  [0, 0, "哈尔滨体育学院"],
  [0, 0, "哈尔滨金融学院"],
  [0, 1, "黑龙江东方学院"],
  [0, 1, "哈尔滨信息工程学院"],
  [0, 0, "黑龙江工程学院"],
  [0, 1, "黑龙江外国语学院"],
  [0, 1, "黑龙江财经学院"],
  [0, 1, "哈尔滨石油学院"],
  [0, 1, "黑龙江工商学院"],
  [0, 1, "哈尔滨远东理工学院"],
  [0, 1, "哈尔滨剑桥学院"],
  [0, 1, "黑龙江工程学院昆仑旅游学院"],
  [0, 1, "哈尔滨广厦学院"],
  [0, 1, "哈尔滨华德学院"],
  [0, 0, "哈尔滨音乐学院"],
  [1, 0, "黑龙江职业学院"],
  [1, 0, "黑龙江建筑职业技术学院"],
  [1, 0, "黑龙江艺术职业学院"],
  [1, 0, "黑龙江农业工程职业学院"],
  [1, 0, "黑龙江农垦职业学院"],
  [1, 0, "黑龙江司法警官职业学院"],
  [1, 0, "哈尔滨电力职业技术学院"],
  [1, 0, "哈尔滨铁道职业技术学院"],
  [1, 0, "哈尔滨职业技术学院"],
  [1, 1, "哈尔滨传媒职业学院"],
  [1, 0, "黑龙江生物科技职业学院"],
  [1, 0, "黑龙江公安警官职业学院"],
  [1, 0, "黑龙江信息技术职业学院"],
  [1, 1, "哈尔滨江南职业技术学院"],
  [1, 0, "黑龙江农垦科技职业学院"],
  [1, 0, "黑龙江旅游职业技术学院"],
  [1, 0, "黑龙江生态工程职业学院"],
  [1, 0, "黑龙江民族职业学院"],
  [1, 1, "哈尔滨应用职业技术学院"],
  [1, 0, "哈尔滨科学技术职业学院"],
  [1, 0, "黑龙江粮食职业学院"],
  [1, 0, "黑龙江护理高等专科学校"],
  [1, 1, "哈尔滨工程技术职业学院"],
  [1, 0, "哈尔滨幼儿师范高等专科学校"],
  [1, 0, "黑龙江冰雪体育职业学院"]],

  "306": [
  [1, 0, "大兴安岭职业学院"]],

  "307": [
  [0, 0, "东北石油大学"],
  [0, 0, "黑龙江八一农垦大学"],
  [0, 0, "大庆师范学院"],
  [1, 0, "大庆职业学院"],
  [1, 0, "大庆医学高等专科学校"]],

  "308": [
  [0, 0, "吉林大学"],
  [0, 0, "长春理工大学"],
  [0, 0, "长春工业大学"],
  [0, 0, "吉林建筑大学"],
  [0, 0, "吉林农业大学"],
  [0, 0, "长春中医药大学"],
  [0, 0, "东北师范大学"],
  [0, 0, "吉林工程技术师范学院"],
  [0, 0, "长春师范大学"],
  [0, 0, "吉林财经大学"],
  [0, 0, "吉林体育学院"],
  [0, 0, "吉林艺术学院"],
  [0, 1, "吉林华桥外国语学院"],
  [0, 0, "吉林工商学院"],
  [0, 0, "长春工程学院"],
  [0, 0, "吉林警察学院"],
  [0, 0, "长春大学"],
  [0, 1, "长春光华学院"],
  [0, 1, "长春工业大学人文信息学院"],
  [0, 1, "长春理工大学光电信息学院"],
  [0, 1, "长春财经学院"],
  [0, 1, "吉林建筑大学城建学院"],
  [0, 1, "长春建筑学院"],
  [0, 1, "长春科技学院"],
  [0, 1, "吉林动画学院"],
  [0, 1, "长春大学旅游学院"],
  [0, 1, "东北师范大学人文学院"],
  [1, 0, "长春师范高等专科学校"],
  [1, 0, "长春汽车工业高等专科学校"],
  [1, 0, "长春金融高等专科学校"],
  [1, 0, "长春医学高等专科学校"],
  [1, 0, "吉林交通职业技术学院"],
  [1, 1, "长春东方职业学院"],
  [1, 0, "吉林司法警官职业学院"],
  [1, 0, "长春职业技术学院"],
  [1, 1, "长春信息技术职业学院"],
  [1, 1, "吉林科技职业技术学院"],
  [1, 1, "吉林城市职业技术学院"]],

  "309": [
  [0, 0, "延边大学"],
  [1, 0, "延边职业技术学院"],
  [1, 1, "吉林职业技术学院"]],

  "310": [
  [0, 0, "通化师范学院"]],

  "311": [
  [1, 0, "松原职业技术学院"]],

  "312": [
  [0, 0, "吉林师范大学"],
  [0, 1, "吉林师范大学博达学院"],
  [1, 0, "四平职业大学"],
  [1, 0, "吉林工程职业学院"]],

  "313": [
  [1, 0, "辽源职业技术学院"]],

  "314": [
  [0, 0, "东北电力大学"],
  [0, 0, "吉林化工学院"],
  [0, 0, "北华大学"],
  [0, 0, "吉林农业科技学院"],
  [0, 0, "吉林医药学院"],
  [1, 0, "吉林电子信息职业技术学院"],
  [1, 0, "吉林工业职业技术学院"],
  [1, 0, "吉林铁道职业技术学院"]],

  "315": [
  [1, 0, "长白山职业技术学院"]],

  "316": [
  [0, 0, "白城师范学院"],
  [1, 0, "白城医学高等专科学校"],
  [1, 0, "白城职业技术学院"]],

  "317": [
  [0, 0, "北京大学"],
  [0, 0, "中国人民大学"],
  [0, 0, "清华大学"],
  [0, 0, "北京交通大学"],
  [0, 0, "北京工业大学"],
  [0, 0, "北京航空航天大学"],
  [0, 0, "北京理工大学"],
  [0, 0, "北京科技大学"],
  [0, 0, "北方工业大学"],
  [0, 0, "北京化工大学"],
  [0, 0, "北京工商大学"],
  [0, 0, "北京服装学院"],
  [0, 0, "北京邮电大学"],
  [0, 0, "北京印刷学院"],
  [0, 0, "北京建筑大学"],
  [0, 0, "北京石油化工学院"],
  [0, 0, "北京电子科技学院"],
  [0, 0, "中国农业大学"],
  [0, 0, "北京农学院"],
  [0, 0, "北京林业大学"],
  [0, 0, "北京协和医学院"],
  [0, 0, "首都医科大学"],
  [0, 0, "北京中医药大学"],
  [0, 0, "北京师范大学"],
  [0, 0, "首都师范大学"],
  [0, 0, "首都体育学院"],
  [0, 0, "北京外国语大学"],
  [0, 0, "北京第二外国语学院"],
  [0, 0, "北京语言大学"],
  [0, 0, "中国传媒大学"],
  [0, 0, "中央财经大学"],
  [0, 0, "对外经济贸易大学"],
  [0, 0, "北京物资学院"],
  [0, 0, "首都经济贸易大学"],
  [0, 0, "外交学院"],
  [0, 0, "中国人民公安大学"],
  [0, 0, "国际关系学院"],
  [0, 0, "北京体育大学"],
  [0, 0, "中央音乐学院"],
  [0, 0, "中国音乐学院"],
  [0, 0, "中央美术学院"],
  [0, 0, "中央戏剧学院"],
  [0, 0, "中国戏曲学院"],
  [0, 0, "北京电影学院"],
  [0, 0, "北京舞蹈学院"],
  [0, 0, "中央民族大学"],
  [0, 0, "中国政法大学"],
  [0, 0, "华北电力大学"],
  [0, 0, "中华女子学院"],
  [0, 0, "北京信息科技大学"],
  [0, 0, "中国矿业大学（北京）"],
  [0, 0, "中国石油大学（北京）"],
  [0, 0, "中国地质大学（北京）"],
  [0, 0, "北京联合大学"],
  [0, 1, "北京城市学院"],
  [0, 0, "中国青年政治学院"],
  [0, 0, "首钢工学院"],
  [0, 0, "中国劳动关系学院"],
  [0, 1, "北京吉利学院"],
  [0, 1, "首都师范大学科德学院"],
  [0, 1, "北京工商大学嘉华学院"],
  [0, 1, "北京邮电大学世纪学院"],
  [0, 1, "北京工业大学耿丹学院"],
  [0, 0, "北京警察学院"],
  [0, 1, "北京第二外国语学院中瑞酒店管理学院"],
  [0, 0, "中国科学院大学"],
  [1, 0, "北京工业职业技术学院"],
  [1, 0, "北京信息职业技术学院"],
  [1, 0, "北京电子科技职业学院"],
  [1, 0, "北京京北职业技术学院"],
  [1, 0, "北京交通职业技术学院"],
  [1, 0, "北京青年政治学院"],
  [1, 0, "北京农业职业学院"],
  [1, 0, "北京政法职业学院"],
  [1, 0, "北京财贸职业学院"],
  [1, 1, "北京北大方正软件职业技术学院"],
  [1, 1, "北京经贸职业学院"],
  [1, 1, "北京经济技术职业学院"],
  [1, 0, "北京戏曲艺术职业学院"],
  [1, 1, "北京汇佳职业学院"],
  [1, 1, "北京科技经营管理学院"],
  [1, 1, "北京科技职业学院"],
  [1, 1, "北京培黎职业学院"],
  [1, 0, "北京经济管理职业学院"],
  [1, 0, "北京劳动保障职业学院"],
  [1, 0, "北京社会管理职业学院"],
  [1, 1, "北京艺术传媒职业学院"],
  [1, 0, "北京体育职业学院"],
  [1, 0, "北京交通运输职业学院"],
  [1, 0, "北京卫生职业学院"],
  [1, 1, "北京网络职业学院"]],

  "318": [
  [0, 0, "南开大学"],
  [0, 0, "天津大学"],
  [0, 0, "天津科技大学"],
  [0, 0, "天津工业大学"],
  [0, 0, "中国民航大学"],
  [0, 0, "河北工业大学"],
  [0, 0, "天津理工大学"],
  [0, 0, "天津农学院"],
  [0, 0, "天津医科大学"],
  [0, 0, "天津中医药大学"],
  [0, 0, "天津师范大学"],
  [0, 0, "天津职业技术师范大学"],
  [0, 0, "天津外国语大学"],
  [0, 0, "天津商业大学"],
  [0, 0, "天津财经大学"],
  [0, 0, "天津体育学院"],
  [0, 0, "天津音乐学院"],
  [0, 0, "天津美术学院"],
  [0, 0, "天津城建大学"],
  [0, 1, "天津天狮学院"],
  [0, 0, "天津中德应用技术大学"],
  [0, 1, "天津外国语大学滨海外事学院"],
  [0, 1, "天津体育学院运动与文化艺术学院"],
  [0, 1, "天津商业大学宝德学院"],
  [0, 1, "天津医科大学临床医学院"],
  [0, 1, "南开大学滨海学院"],
  [0, 1, "天津师范大学津沽学院"],
  [0, 1, "天津理工大学中环信息学院"],
  [0, 1, "北京科技大学天津学院"],
  [0, 1, "天津大学仁爱学院"],
  [0, 1, "天津财经大学珠江学院"],
  [1, 0, "天津市职业大学"],
  [1, 0, "天津滨海职业学院"],
  [1, 0, "天津工程职业技术学院"],
  [1, 0, "天津青年职业学院"],
  [1, 0, "天津渤海职业技术学院"],
  [1, 0, "天津电子信息职业技术学院"],
  [1, 0, "天津机电职业技术学院"],
  [1, 0, "天津现代职业技术学院"],
  [1, 0, "天津公安警官职业学院"],
  [1, 0, "天津轻工职业技术学院"],
  [1, 0, "天津商务职业学院"],
  [1, 0, "天津国土资源和房屋职业学院"],
  [1, 0, "天津医学高等专科学校"],
  [1, 0, "天津开发区职业技术学院"],
  [1, 0, "天津艺术职业学院"],
  [1, 0, "天津交通职业学院"],
  [1, 0, "天津冶金职业技术学院"],
  [1, 0, "天津石油职业技术学院"],
  [1, 0, "天津城市职业学院"],
  [1, 0, "天津铁道职业技术学院"],
  [1, 0, "天津工艺美术职业学院"],
  [1, 0, "天津城市建设管理职业技术学院"],
  [1, 0, "天津生物工程职业技术学院"],
  [1, 0, "天津海运职业学院"],
  [1, 0, "天津广播影视职业学院"]],

  "319": [
  [0, 0, "河北建筑工程学院"],
  [0, 0, "河北北方学院"],
  [0, 0, "张家口学院"],
  [1, 0, "张家口职业技术学院"],
  [1, 0, "宣化科技职业学院"]],

  "320": [
  [0, 0, "邢台学院"],
  [1, 0, "邢台职业技术学院"],
  [1, 0, "邢台医学高等专科学校"],
  [1, 0, "河北机电职业技术学院"]],

  "322": [
  [0, 0, "华北理工大学"],
  [0, 0, "唐山师范学院"],
  [0, 0, "唐山学院"],
  [0, 1, "华北理工大学轻工学院"],
  [0, 1, "华北理工大学冀唐学院"],
  [1, 0, "河北能源职业技术学院"],
  [1, 0, "唐山职业技术学院"],
  [1, 0, "唐山工业职业技术学院"],
  [1, 0, "唐山科技职业技术学院"],
  [1, 0, "唐山幼儿师范高等专科学校"]],

  "323": [
  [0, 0, "河北地质大学"],
  [0, 0, "河北科技大学"],
  [0, 0, "河北医科大学"],
  [0, 0, "河北师范大学"],
  [0, 0, "石家庄学院"],
  [0, 0, "石家庄铁道大学"],
  [0, 0, "河北体育学院"],
  [0, 0, "河北经贸大学"],
  [0, 1, "河北传媒学院"],
  [0, 1, "河北工程技术学院"],
  [0, 1, "河北美术学院"],
  [0, 1, "河北外国语学院"],
  [0, 1, "河北科技大学理工学院"],
  [0, 1, "河北师范大学汇华学院"],
  [0, 1, "河北经贸大学经济管理学院"],
  [0, 1, "河北医科大学临床学院"],
  [0, 1, "石家庄铁道大学四方学院"],
  [0, 1, "河北地质大学华信学院"],
  [0, 0, "河北中医学院"],
  [1, 0, "河北工业职业技术学院"],
  [1, 0, "石家庄职业技术学院"],
  [1, 0, "河北政法职业学院"],
  [1, 0, "石家庄铁路职业技术学院"],
  [1, 1, "石家庄工程职业学院"],
  [1, 1, "石家庄城市经济职业学院"],
  [1, 0, "河北省艺术职业学院"],
  [1, 1, "石家庄财经职业学院"],
  [1, 0, "河北交通职业技术学院"],
  [1, 0, "河北化工医药职业技术学院"],
  [1, 0, "石家庄信息工程职业学院"],
  [1, 0, "石家庄邮电职业技术学院"],
  [1, 0, "河北公安警察职业学院"],
  [1, 1, "石家庄工商职业学院"],
  [1, 1, "石家庄理工职业学院"],
  [1, 1, "石家庄科技信息职业学院"],
  [1, 0, "河北女子职业技术学院"],
  [1, 1, "石家庄医学高等专科学校"],
  [1, 1, "石家庄经济职业学院"],
  [1, 1, "石家庄人民医学高等专科学校"],
  [1, 0, "石家庄科技工程职业学院"],
  [1, 0, "河北劳动关系职业学院"],
  [1, 1, "石家庄科技职业学院"],
  [1, 0, "石家庄幼儿师范高等专科学校"],
  [1, 0, "河北轨道运输职业技术学院"]],

  "324": [
  [0, 0, "燕山大学"],
  [0, 0, "河北科技师范学院"],
  [0, 1, "燕山大学里仁学院"],
  [0, 0, "河北环境工程学院"],
  [1, 0, "河北建材职业技术学院"],
  [1, 0, "秦皇岛职业技术学院"],
  [1, 0, "河北对外经贸职业学院"]],

  "325": [
  [0, 0, "廊坊师范学院"],
  [0, 0, "华北科技学院"],
  [0, 0, "中国人民武装警察部队学院"],
  [0, 0, "北华航天工业学院"],
  [0, 0, "防灾科技学院"],
  [0, 1, "河北工业大学城市学院"],
  [0, 1, "燕京理工学院"],
  [0, 1, "北京中医药大学东方学院"],
  [0, 1, "河北东方学院"],
  [1, 0, "河北石油职业技术学院"],
  [1, 0, "廊坊职业技术学院"],
  [1, 0, "廊坊燕京职业技术学院"],
  [1, 0, "廊坊卫生职业学院"]],

  "326": [
  [0, 0, "衡水学院"],
  [1, 0, "衡水职业技术学院"]],

  "327": [
  [0, 0, "河北工程大学"],
  [0, 0, "邯郸学院"],
  [0, 1, "河北工程大学科信学院"],
  [1, 0, "邯郸职业技术学院"],
  [1, 0, "河北司法警官职业学院"]],

  "328": [
  [0, 0, "承德医学院"],
  [0, 0, "河北民族师范学院"],
  [1, 0, "承德石油高等专科学校"],
  [1, 0, "河北旅游职业学院"],
  [1, 0, "承德护理职业学院"]],

  "329": [
  [0, 0, "河北水利电力学院"],
  [0, 0, "沧州师范学院"],
  [0, 1, "北京交通大学海滨学院"],
  [1, 0, "沧州职业技术学院"],
  [1, 0, "渤海石油职业学院"],
  [1, 0, "沧州医学高等专科学校"],
  [1, 0, "泊头职业学院"],
  [1, 1, "渤海理工职业学院"]],

  "330": [
  [0, 0, "河北大学"],
  [0, 0, "河北农业大学"],
  [0, 0, "保定学院"],
  [0, 0, "河北金融学院"],
  [0, 0, "中央司法警官学院"],
  [0, 1, "河北科技学院"],
  [0, 1, "河北大学工商学院"],
  [0, 1, "华北电力大学科技学院"],
  [0, 1, "河北农业大学现代科技学院"],
  [0, 1, "中国地质大学长城学院"],
  [1, 0, "河北软件职业技术学院"],
  [1, 0, "保定职业技术学院"],
  [1, 0, "保定电力职业技术学院"],
  [1, 0, "冀中职业学院"],
  [1, 0, "保定幼儿师范高等专科学校"],
  [1, 0, "河北工艺美术职业学院"]] };var _default =




{
  province: province,
  city: city,
  allschool: allschool };exports.default = _default;

/***/ }),

/***/ 4:
/*!**************************************************************!*\
  !*** D:/HB-builder-project/demo01/learningDemo01/pages.json ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
