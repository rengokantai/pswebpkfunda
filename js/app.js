/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */
//require("expose?$!jquery");
var config = require('../config/config.json')
import {x} from './sub';
x();
var img = document.createElement('img');
img.style.height = "10%";
img.style.width = "10%";
img.src = require('../images/1.jpg');
console.log(img);
//document.getElementById('span').appendChild(img); //still cannot fix
$('#span').text('span');
console.log($('#span').text());
document.write('hernan.');
console.log(`write`);
require('../css/app.css');