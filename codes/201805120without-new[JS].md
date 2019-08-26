<!--
Created: Mon Aug 26 2019 15:19:53 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:53 GMT+0800 (China Standard Time)
-->
# 无new 构造

``` js
(function(window, undefined) {
    // ...
    jQuery = function(selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            return new jQuery.fn.init(selector, context, rootjQuery);
        },
        jQuery.fn = jQuery.prototype = {
            init: function(selector, context, rootjQuery) {
                // ...
            }
        }
    jQuery.fn.init.prototype = jQuery.fn;
})(window);
```

