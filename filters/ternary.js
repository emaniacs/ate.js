ate.filter('ternary', function(args) {
    var yesorno = args.split(',');
    return this.valueOf() ? yesorno[0] : yesorno[1];
})
