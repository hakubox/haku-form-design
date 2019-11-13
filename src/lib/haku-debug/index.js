import Vue from "vue";
import router from "@/router";

const hakuDebug = {
    XMLHttpRequest: window.XMLHttpRequest,
    targetTypes_mousedown: ["a", "input", "button", "textarea", "i"],
    targetTypes_keydown: ["a", "input", "button", "textarea"],
    message: {
        JSERR: { code: "01", msg: "JS异常" },
        EVENTERR: { code: "02", msg: "静态资源加载异常" },
        AJAXERR: { code: "03", msg: "AJAX请求异常" },
        AJAXTIMEOUTERR: { code: "04", msg: "AJAX请求超时" }
    },
    config: {}
};

/**
 * @method 将异常发送给服务器
 */
hakuDebug.send = function() {
    navigator.sendBeacon("/log", {});
};

/**
 * @method 通用XMLHttpRequest事件
 */
hakuDebug.XMLTYPE = function(event) {
    let target = event.target;

    if ("readystatechange" === event.type) {
        // console.log('请求状态码改变')
        if (target.readyState == 4) {
            if (target.status == 404) {
                console.log({
                    errMsg: "错误码：" + event.target.status,
                    errUrl: target.responseURL,
                    errType: hakuDebug.message.AJAXERR
                });
            }
        }
    }

    if ("error" === event.typ) {
        // console.log('请求出错')
        console.log({
            errMsg: "错误码：" + event.target.status,
            errUrl: target.responseURL,
            errType: hakuDebug.message.AJAXERR
        });
    }

    if ("timeout" === event.type) {
        // console.log('请求超时')
        console.log({
            errMsg: "错误码：" + event.target.status,
            errUrl: target.responseURL,
            errType: hakuDebug.message.AJAXTIMEOUTERR
        });
    }
};

/**
 * 计算加载时间
 */
hakuDebug.getPerformanceTiming = function() {
    let performance = window.performance;

    if (!performance) {
        // 当前浏览器不支持
        console.log("你的浏览器不支持 performance 接口");
        return;
    }

    let t = performance.timing;
    let times = {};

    //【重要】页面加载完成的时间
    //【原因】这几乎代表了用户等待页面可用的时间
    times.loadPage = t.loadEventEnd - t.navigationStart;

    //【重要】解析 DOM 树结构的时间
    //【原因】反省下你的 DOM 树嵌套是不是太多了！
    times.domReady = t.domComplete - t.responseEnd;

    //【重要】重定向的时间
    //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
    times.redirect = t.redirectEnd - t.redirectStart;

    //【重要】DNS 查询时间
    //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
    // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

    //【重要】读取页面第一个字节的时间
    //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    // TTFB 即 Time To First Byte 的意思
    // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
    times.ttfb = t.responseStart - t.navigationStart;

    //【重要】内容加载完成的时间
    //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
    times.request = t.responseEnd - t.requestStart;

    //【重要】执行 onload 回调函数的时间
    //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    times.loadEvent = t.loadEventEnd - t.loadEventStart;

    // DNS 缓存时间
    times.appcache = t.domainLookupStart - t.fetchStart;

    // 卸载页面的时间
    times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;

    return times;
};

//全局点击事件捕获
window.addEventListener("mousedown", function(e) {
    if (
        hakuDebug.targetTypes_mousedown.indexOf(
            e.target.tagName.toLowerCase()
        ) >= 0
    ) {
        console.log("鼠标点击", e);
    }
});

//全局按键事件捕获
window.addEventListener("keydown", function(e) {
    if (
        [27, 13, 116].indexOf(e.keyCode) >= 0 &&
        hakuDebug.targetTypes_keydown.indexOf(e.target.tagName.toLowerCase()) >=
            0
    ) {
        console.log("键盘按键", e);
    }
});

//全局页面跳转
window.addEventListener("popstate", function(event) {
    console.log("页面跳转", event);
});

//全局Vue路由跳转
router.afterEach((to, from) => {
    //Vue路由中跳转
    console.log("Vue路由跳转", from, to);
});

/******************************/

//全局js错误
window.addEventListener("error", function(msg, url, row, col, error) {
    console.error("全局错误", msg, url, row, col, error);
});

//监听静态资源加载错误
window.addEventListener(
    "error",
    function(event) {
        let errorTarget = event.target;

        if (errorTarget && errorTarget.baseURI) {
            let a = {
                errMsg: errorTarget.outerHTML,
                errUrl: errorTarget.baseURI,
                errType: ""
            };
            console.log(a);
        }
    },
    true
);

/**
 * 全局异步错误
 */
window.addEventListener("unhandledrejection", function(event) {
    console.error("异步错误", event);
});

/**
 * Vue内部错误监控
 */
Vue.config.errorHandler = function(err, vm, info) {
    console.error("Vue内部错误", err, vm, info);
};

/**
 * 监听页面所有AJAX请求
 */
window.XMLHttpRequest = function() {
    let XML = new hakuDebug.XMLHttpRequest();
    XML.addEventListener("readystatechange", hakuDebug.XMLTYPE);
    XML.addEventListener("error", hakuDebug.XMLTYPE);
    XML.addEventListener("timeout", hakuDebug.XMLTYPE);
    XML.addEventListener("loadstart", hakuDebug.XMLTYPE);
    XML.addEventListener("loadend", hakuDebug.XMLTYPE);

    return XML;
};

/**
 * 页面初始加载后自动计算加载时间
 */
window.addEventListener("load", function() {
    setTimeout(() => {
        console.log(hakuDebug.getPerformanceTiming());
    }, 10);
});

export default function(cfg) {
    if (cfg && toString.call(cfg) === "[object Object]") {
        hakuDebug.config = {
            ...hakuDebug.config,
            ...cfg
        };
    }
}
