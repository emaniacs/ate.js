ate.js
======
Advanced template engine.
If you can code about javascript you can use this code.

Usage
=====

You can rendering a string with `ate.render(template, data)` or using method *render* in a string variable like this `template.render(data)`.


### Using with object data

```js
var template = '{{one}} {{two}}';
var data = {one:'satu', two:'dua'};
var output = ate.render(template, data);
// output is "satu dua"
```

### Using with array data
```js
var template = 'one is "{{0}}", two is "{{1}}".';
var data = ['satu', 'dua'];
var output = ate.render(template, data);
```

### Using dot notation on data

To display value of data from descendant context, use `.`.
```js
var template = 'one in indonesian language is "{{one.idn}}"';
var data = {one: {idn: 'satu', esp:'uno'}};
var output = ate.render(template, data);
// output ->
//    "one in indonesian language is "satu"
```

### Using function as data

In your data which passed into `render` can be contained a function, and that will be executed .

```js
var template = 'Date is {{fn}}';
var data = {
    fn: function() {
        var date = new Date();
        return date.toLocaleString();
    }
};
var output = ate.render(template, data);
```

In `fn` scope value of `this` is the entire of data which passed into `render`.
There some arguments will be passed into the function, view the source to see how a function executed.

Filters
=======

While processing value of data, it can be filtering using character `|` after the value.

All of filter located in filters directory.

### Register a filter

Use 'filter' method to register your filter.
```js
ate.filter('upper', function() {
    return this.toUpperCase();
});
```

### Use a filter

In a template filter can be used with append a `|` and name of filter.
```js
var template = '{{one|upper}}';
var data = {one:'satu'};
var output = ate.render(template, data);
// output is SATU
```


### Available filters

* **i** ignore the brackets.
```js
var template = '{{ignore|i}}';
var output = ate.render(template);
// output is "{{ignore}}"
```

* **length** return length of data.
```js
var template = '{{word|length}}';
var data = {word: 'four'};
var output = ate.render(template, data);
// output is "4"
```
* **lower** convert value into lowercase.
* **upper** convert value into uppercase.
* **ternary** Do a ternary operation about the value
```js
var template = '{{ok|ternary this is true,this is false}}';
var data = {ok: true};
var output = ate.render(template, data);
  // output is "this is true"
```
* **each** Loop based on value
```js
var template = '{{words|each 
                  <td>:idn</td><td>:esp</td>
                }}'
var data = {words: [{idn:'satu': esp:'uno'},{idn:'dua': esp:'dos'}]};
var output = ate.render(template, data);
// output is "<td>satu</td><td>uno</td> <td>dua</td><td>dos</td>"
```

* ***sum*** Sum a value of an object
```js
var template = 'Sum of value is {{data|sum value}}';
var data = {data:[{no:1, value:5},{no:2, value:4}]};
var output = ate.render(template, data);
// output is "Total value is 9"
```

* ***count*** Count the value of an object
```js
var template = 'Count of value is {{data|count value}}';
var data = {data:[{no:1, value:5},{no:2, value:4}]};
var output = ate.render(template, data);
// output is "Total value is 2"
```

License
=======

BSD License

