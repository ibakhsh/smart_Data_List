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


_.mixin({
    whereLike: function (data, search) {
        var dataA = data;

        //if(!_.isArray(dataA)) dataA = [dataA];


        return _.filter(dataA, function (obj) {
            return _.values(obj).some(function (el) {
                //return el.indexOf(searchStr) > -1;
                return el.match(search) !== null;
            });
        });
    },
    likeFrom: function (searchText, data) {
        var dataA = data;

        if (!_.isArray(dataA)) dataA = [dataA];

        var searchStr = searchText;

        var searchStr1 = searchStr;
        searchStr1 = searchStr1.replace(/٪/g, "%");
        searchStr1 = searchStr1.replace(/٠/g, "0");
        searchStr1 = searchStr1.replace(/١/g, "1");
        searchStr1 = searchStr1.replace(/٢/g, "2");
        searchStr1 = searchStr1.replace(/٣/g, "3");
        searchStr1 = searchStr1.replace(/٤/g, "4");
        searchStr1 = searchStr1.replace(/٥/g, "5");
        searchStr1 = searchStr1.replace(/٦/g, "6");
        searchStr1 = searchStr1.replace(/٧/g, "7");
        searchStr1 = searchStr1.replace(/٨/g, "8");
        searchStr1 = searchStr1.replace(/٩/g, "9");

        searchStr1 = searchStr1.replace(/%/g, ".*");
        searchStr1 = searchStr1.replace(/_/g, ".");
        searchStr1 = searchStr1.replace(/\\/g, ".");
        //console.log("search text:"+searchStr1);
        var search = new RegExp(searchStr1, 'g');

        return this.whereLike(dataA, search);

    }
});

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

