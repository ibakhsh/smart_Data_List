
const arr = ["JavaScript","Node","webpack"];
console.log(arr);


//import javascript files with aliases 
import $ from 'jquery';
import _ from 'underscore';
import Vue from 'vue';

//import javascripts without aliases
require('bootstrap');

//import stylesheets and fonts 
const css1 = require('bootstrap/dist/css/bootstrap.css');
//const css2 = require('../src/css/bootstrap-theme.min.css');
//const glyphicons = require('../src/css/glyphicons.css');
require('font-awesome/css/font-awesome.min.css');



console.log('index.js was loaded to the last line.');


import Item from '../src/vuejs/ListItem.vue';

$(document).ready(function(){
    //TODO: fix loading the main elemnt using vue components.. 
    new Vue({
        el: "#item",
        render: h => h(Item)
    })

});
