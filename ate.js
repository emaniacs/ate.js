/**
 * ate.js
 *
 * @author Ardi <noone.nu1@gmail.com>
 * @license BSD
 *
 * Advanced templating engine.
 * Example:
 *  <script type="text/javascript">
 *     var str = '<b>{{title}}</b> this is {{content}}. Date is {{date}}',
 *       data = {
 *          title: 'This is title',
 *          content: 'Contents was here...',
 *          date: function() {
 *              var date = new Date();
 *              return date.toLocaleString();
 *          }
 *      };
 *     console.log(str.render(data))
 *  </script>
 */

(function(window) {
    "use strict"
    // filter container
    var F = {},

        // regex cui.
        R = /{{ *([\w\.]+)(?:\|([\w\.]+)(?:\s([^}]+)?)?)? *}}/gm,

        // this is the ate
        EE = {
            /**
             * Wrapper to E (replace) function.
             */
            render: function(tpl, data) {
                return tpl.replace(R, function(match, value, filter, index) {
                    var val = EE.get(data, value, match);

                    return (typeof(F[filter]) === 'function')?
                            F[filter].call(val, index, value, match):
                        EE.value.call(val, data, value, match)
                    ;
                })
            },

            /**
             * Un/Register a filter
             */
            filter: function(name, fn) {
                F[name] = fn;
                return this;
            },

            /**
             * Get a value based on index (checking for dot)
             * return the value or def
             */
            get: function(data, index, def) {
                return index.split('.').reduce(function(obj, i){
                    if ((typeof(obj) === 'object') && obj.hasOwnProperty(i))
                        return obj[i];
                    return def
                }, data);
            },

            /**
             * Get the real value(executed if value is function).
             * must be called with call or apply
             * ate.value.call(value, nextthis, args1, args2)
             */
            value: function(){
                var args = Array.prototype.slice.call(arguments,0);
                return (typeof(this) === 'function') ?
                    this.apply(args.shift(), args) :
                    this
            },
            __version__: '1'
        }
    ;

    // expose to global
    window.ate = EE;

})(window);
