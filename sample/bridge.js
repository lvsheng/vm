"use strict";
(function (window) {
    var DEBUG = false;
    var OBJECT_NAME = "lc_bridge";
    var METHOD_LIST = ["callQueue"];
    var INJECT_PREFIX = 'injekt:';

    var slice = [].slice;
    var prompt = window.prompt;

    //TODO UA判断
    var injectObj = window[OBJECT_NAME] = window[OBJECT_NAME] || {};
    inject(injectObj, OBJECT_NAME, METHOD_LIST);

    function inject(obj, name, methods) {
				console.log("inject");
        obj = obj || {};
        var count = methods.length;
        var index;
        var key;

        for (index = 0; index < count; index++) {
            key = methods[index];
            obj[key] = bindNative(name, key);
        }
        return obj;
    }

    function bindNative(name, method) {
				console.log("bindNative");
        var isO2O = navigator.userAgent.indexOf("BaiduRuntimeO2OZone") > -1;

        function trace() {
            if (!DEBUG) {
                return;
            }
            var args = [];
            var count = arguments.length;
            var index = 0;

            for (index = 0; index < count; index++) {
                args.push(JSON.stringify(arguments[index], null, 2));
            }

            console.log(name + "." + method + "(" + args.join(", ") + ");");
        }

        return isO2O ? function () {
            //trace.apply(this, arguments);
						console.log("postO2O  " + JSON.stringify(slice.call(arguments)));
            return prompt(JSON.stringify(slice.call(arguments)),
                INJECT_PREFIX + JSON.stringify([name, method]));
        } : trace;
    }

})(window);
