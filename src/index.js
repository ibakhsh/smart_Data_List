//import javascript files with aliases 
global.jquery = require('jquery'); 
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


//import vue components 
import ListItem from '../src/vuejs/ListItem.vue';
import InputLov from '../src/vuejs/InputLov.vue';

$(document).ready(function(){
    new Vue({
        el: "#app",
        components: {
            'listitem': ListItem, 
            'inputlov': InputLov
        } 
    });

     

});


 
console.log('index.js was loaded to the last line.');

