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

        // replace function
        E = function(tpl, data) {
            return tpl.replace(R, function(match, value, filter, index) {
                var ret,
                    val = e.get(data, value, match)
                ;

                return (typeof(F[filter]) === 'function')?
                        F[filter].call(val, index, value, match):
                    e.value.call(val, data, value, match)
                ;
            })
        },
        // this is the ate
        e = {
            /**
             * Wrapper to E (replace) function.
             */
            render: function(tpl, data) {
                if (! data) {
                    // called with String object.
                    data = tpl;
                    tpl = this;
                }

                return E(tpl, data)
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
                var def = def || undefined,
                    d = index.split('.'),
                    val = data;

                // convert from laravel framework helper. (array_get)
                for(var i=0; i<d.length; i++) {
                    if (typeof(val) != 'object' || !val.hasOwnProperty(d[i]))
                        return def;
                    val = val[d[i]];
                }
                return val;
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
    window.ate = e;

    // add new method into string object.
    String.prototype.render = e.render;

})(window);
