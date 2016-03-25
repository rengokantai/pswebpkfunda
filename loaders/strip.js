/**
 * Created by Hernan Y.Ke on 2016/3/25.
 */
var stripComments = require('strip-json-comments')
module.exports = function (source) {
    this.cacheable();
    console.log("source", source)
    console.log("strippedsource", stripComments(source))
    return stripComments(source);
}