ate.filter('sum', function(name) {
    var value = 0;
    this.map(function(data) {
        value += data.hasOwnProperty(name) ? parseInt(data[name]) : 0
    });
    return value;
})
