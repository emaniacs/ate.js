ate.filter('count', function(name) {
    var value = 0;
    this.map(function(data) {
        value += data.hasOwnProperty(name) ? 1 : 0
    });
    return value;
})
