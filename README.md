# component-jade-static

A plugin to transpile Jade files to strings for the component builder.


## Install

```
$ npm install component-jade-static
```


## Usage

Add your `.jade` files to the `scripts` array in your `component.json`:

```js
{
  "scripts": [
    "template.jade"
  ]
}
```

Use the plugin during your build process:

```js
var fs = require('fs')
  , Builder = require('component-builder')
  , jade = require('component-jade-static');

var builder = new Builder(__dirname);

builder.use(jade(locals));

builder.build(function(err, res){
  if (err) throw err;
  fs.writeFileSync('build/build.js', res.require + res.js);
  if (res.css) fs.writeFileSync('build/build.css', res.css);
});
```

And then require the files (containing rendered html) in your js:

```js
var html = require('template');
```
