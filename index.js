var debug = require('debug')('component:jade-static')
  , fs = require('fs')
  , jade = require('jade')
  , path = require('path')


module.exports = function(locals) {
  locals || (locals = {})

  return function(builder) {
    builder.hook('before scripts', function(pkg, callback) {
      ;(pkg.config.scripts || []).slice().forEach(function(file) {
        if (path.extname(file) !== '.jade') return

        debug('compiling "%s"', file)

        var fullName = pkg.path(file)
          , src = fs.readFileSync(fullName, 'utf8')
          , tmpl = jade.compile(src,
            { compileDebug: false
            , filename: fullName
            })
          , str = tmpl(locals)
          , contents = 'module.exports = ' + JSON.stringify(str) + ';'
          , jsFile = file.replace(/\.jade$/, '.js')

        pkg.addFile('scripts', jsFile, contents)
        pkg.removeFile('scripts', file)
        debug('compiled "%s" -> "%s"', file, jsFile)
      })

      callback()
    })
  }
}
