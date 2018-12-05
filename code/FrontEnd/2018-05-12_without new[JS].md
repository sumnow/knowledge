# 无new 构造

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

