ate.filter('each', function(template) {
    var data = this,
        loop = 0,
        str = [],
        regex = /(?::)([\w.]+)/gm
    ;
    for(var key in data) {
        var context = data[key];
        str.push(
            template.replace(regex, function(match, value) {
                if (value == 'loop')
                    return loop;

                if(typeof(context) === 'object')
                    return ate.value.call(ate.get(context, value), context, value, match);

                if (value==key || value=='value') {
                    return context;
                }
                else if (value == 'key') {
                    return key;
                }

                return match;
            })
        )
        loop++;
    }
    return str.join('');
})
