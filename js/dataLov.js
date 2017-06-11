/* 
 * This script created by Ibrahim Bakhsh 
 * On: 19/2015
 * as an atom for a much large scale dynamic smart list AI
 */

var systemInfo = {
      system: "HR",
      object:"login",
      command:"faces/urlToJson",
      action:"insert/update/delete",
      data:[]
    };

_.templateSettings = {
      evaluate : /\{\[([\s\S]+?)\]\}/g,
      interpolate : /\{\{([\s\S]+?)\}\}/g
};



_.mixin({
  toJson: function(string) {
    var result = string;
    try {
        result = JSON.parse(result);
    } catch (e) {
    }
    return result;
  },
  smartLov: function(inputName,params){
    _smartLov(inputName,params);
  },
  findAttribute: function(elementId,attribute){
    var element = document.getElementById(elementId);
    var result = undefined;
    if(element !== undefined){
        for (var i = 0; i < element.attributes.length; i++){
            // Store reference to current attr
            var attr = element.attributes[i];
            // If attribute nodeName starts with 'attribute'
            if(attr.nodeName.startsWith(attribute)){
                var keyVal = attr.nodeValue;
                if(keyVal.toString().length <1){
                    result= true;
                } else {
                    result= keyVal.toString();
                }
            }
          //console.log(attr.nodeName+i+" Done.");
        }
    }
    return result;
    },
    whereLike:function(data,search){
        var dataA = data;

        //if(!_.isArray(dataA)) dataA = [dataA];

        
        var result = _.filter(dataA, function (obj) {
            return _.values(obj).some(function (el) {
                //return el.indexOf(searchStr) > -1;
                return el.match(search) !== null;
            });
        });
        return result;
    },
    likeFrom:function(searchText,data){
        var dataA = data;

        if(!_.isArray(dataA)) dataA = [dataA];
        
        var searchStr=searchText;

        var searchStr1 = searchStr;
        searchStr1 = searchStr1.replace(/٪/g,"%");
        searchStr1 = searchStr1.replace(/٠/g,"0");
        searchStr1 = searchStr1.replace(/١/g,"1");
        searchStr1 = searchStr1.replace(/٢/g,"2");
        searchStr1 = searchStr1.replace(/٣/g,"3");
        searchStr1 = searchStr1.replace(/٤/g,"4");
        searchStr1 = searchStr1.replace(/٥/g,"5");
        searchStr1 = searchStr1.replace(/٦/g,"6");
        searchStr1 = searchStr1.replace(/٧/g,"7");
        searchStr1 = searchStr1.replace(/٨/g,"8");
        searchStr1 = searchStr1.replace(/٩/g,"9");
        
        searchStr1 = searchStr1.replace(/%/g,".*");
        searchStr1 = searchStr1.replace(/_/g,".");
        //console.log("search text:"+searchStr1);
        var search = new RegExp(searchStr1, 'g');
        
        return this.whereLike(dataA,search);

    },
    inArray:function(obj,array){
        var result = false;
        _.each(array,function(row){
            var objType = typeof obj;
            if(objType === 'string'){
                if(obj===row) {
                    console.log("yes!!");
                    result= true;
                    return result;
                } 
            } else {
                if(_(obj).isEqual(row)) result= true; return result;
            }
        });
        return result;
    },
    fetchRange:function(list,fromIndex,fetchLength,callback){
        var s = fromIndex;
        var l = fetchLength;
        
        var newList = [];

        for(var i=s;i<s+l & i<list.length;i++){
          newList.push(list[i]);
        }
        if(callback === undefined) {
            return newList;
        } else {
            callback(newList);
        }
    },
    arrayOf: function(mainObj,att){
        var newArray = [];
        _(mainObj).each(function(row){
          if(row[att] !== undefined) newArray.push(row[att]);
        });
        return newArray;
    },
    smartLovModel: function(inputName,paramName,paramValue){
        var found = false;
        var foundRow = null;
        _(_allSmartLovs).each(function(row){
            if(row.input == inputName) {
                found = true;
                foundRow = row;
                return found;
            }
        });
        if(found){
            var lovObj = foundRow.lovModel;
            lovObj.set(paramName,paramValue);
        }
    }
});


var _dataLovSetting = {
    serverURL: "renderLov",
    isRenderLov: false,
    templateURL:"resources/components/dataLov/template.html",
    dataLovTemplate:{},
    AllDataLovs:[],
    tempateBodyId:"body",
    landingTemplateID:"dataLovLandingHTML",
    firstOpenDiv_suffix:"_Lov",
    rowsDiv_prefix:"lovContent_",
    searchTempateId:"dataLovSearchBar",
    rowsListTemplateId:"dataLovListHTML",
    oneRowTemplateId:"dataLovListRowHTML",
    closeCssClass:"close",
    formSelector:".formClass",
    formName:"formClass",
    valueDesc_Suffix: "_DESC",
    autoGetFirstRow:-1,
    rowsToFetch:10,
    searchTextId_perfix:"SearchText_"
};

var _dataLovInputType = "hidden";


function _isLovClosed(loveId){
    if($("#"+loveId+_dataLovSetting["firstOpenDiv_suffix"]).text().length > 0 ){
        return false;
    } else {
        return true;
    }
}

function _closeLov(loveId){
    if($("[id$='"+loveId+"']").attr("id") !== undefined){
        var val = $("[id$='"+loveId+"']").val();
        if (val.length<1){
            if(_.findAttribute($("[id$='"+loveId+"']").attr("id"),"required") !== undefined){
                alert('Must Chose an item from the list.');
                return;
            } 
        }
    }
    
    $("#"+loveId+_dataLovSetting["firstOpenDiv_suffix"]).html("");
    $("#"+loveId+_dataLovSetting["firstOpenDiv_suffix"]).addClass(_dataLovSetting["closeCssClass"]);
}

function _dataLov(callback,obj){
    if(_.isEmpty(_dataLovSetting.dataLovTemplate)){
        var ajaxType = obj.ajaxType;
        var ajaxURL = obj.ajaxURL;
        if(obj.ajaxType ==undefined) ajaxType = "GET";
        if(obj.templateURL == undefined) templateURL = _dataLovSetting["templateURL"];
        $.ajax({
            type:ajaxType,
            url:templateURL,
            success: function(result){
                            if(_.isEmpty(_dataLovSetting.dataLovTemplate)){
                                _dataLovSetting.dataLovTemplate = result;
                                $(_dataLovSetting["tempateBodyId"]).append(_dataLovSetting.dataLovTemplate);
                            }
                        if(callback !== undefined) callback(obj);
            },
            error:function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                            alert('fail');
            }
        });
    } else {
        var dataLovExists = document.getElementById(_dataLovSetting["landingTemplateID"]);
        if(dataLovExists === undefined) {
            if(_.isEmpty(_dataLovSetting.dataLovTemplate)){
                _dataLov(callback);
            } else {
                $(_dataLovSetting["tempateBodyId"]).append(_dataLovSetting.dataLovTemplate);
            }
        }
        if(callback !== undefined) callback(obj);
    }
}
var _allSmartLovs = [];
//var _allSmartLovNames = [];

var _smartLov = function (inputName,params){
    var found = false;
    var foundRow = null;
    _(_allSmartLovs).each(function(row){
        if(row.input == inputName) {
            found = true;
            foundRow = row;
            return found;
        }
    });
    if(inputName !=undefined) params.input = inputName;
    if(!found) {
        console.log(params);
        var errArray = [];
        if(inputName ==undefined) errArray.push("must set Lov input");
        if(params.label==undefined) params.label = "Label";
        if(params.desc==undefined) if(params.input != undefined) params.desc = "";
        if(params.value ==undefined) params.value = "";
        if(errArray.length<1){
            params.newLov = function(){
                params.lovModel = new _dataLovModel({
                                    lovName:params.input,
                                    lovLabel:params.label,
                                    value:params.value,
                                    value_DESC:params.desc,
                                    ajaxURL:params.ajaxURL
                                });
                params.lovView = new _dataLovView({model:params.lovModel,el:$('#'+params.input+'_Container')});
                _allSmartLovs.push(params);
            };
            _dataLov(params.newLov,params);
        } else {
            alert("Rendering Lov has issues:"+JSON.stringify(errArray));
        }
    } else {
        return foundRow;
    }
};

var _dataLovReqModel = Backbone.Model.extend({
  defaults: {
    reqStr:"",
    request:{},
    response:[]
  },
  initialize: function(){
          console.log("_dataLovReqModel is initiated");
  }
});

var _dataLovAllRequests = Backbone.Collection.extend({
  model: _dataLovReqModel,
  totalRows:-1,
  dbRowCount:-1,
  resultSize:-1,
  allData:[],
  initialize: function(){
          //console.log("_dataLovAllRequests is initiated");
          this.bind("add",this.setAllRows);
          this.bind("remove",this.setAllRows);
          this.bind("reset",this.setAllRows);
  },
  setAllRows: function(){
      var total = 0;
      var data = [];
      var dbRowCount = this.dbRowCount;
      var resultSize = this.searchResultSize;
      var lovId = "";
      _.each(this.models,function(row){
          //console.log(row);
          var response = row.get("response");
          //console.log("response.totalRows:"+response.totalRows);
          if(dbRowCount <0) dbRowCount = response.totalRows;
          if(response.data !== undefined) if(_.isArray(response.data)) {
              total = total + response.data.length;
              _.each(response.data,function(obj){
                  if(_.findLastIndex(data,{key:obj.key})<0) data.push(obj);
                  //if(!_(obj).inArray(data)) data.push(obj);
              });
          }
          if(response !== undefined) if(response.resultSize !== undefined) resultSize = response.resultSize;
          var request = row.get("request");
          request = _.toJson(request);
          lovId = request.lov_id;
      });
      this.totalRows = total;
      this.allData = data;
      this.dbRowCount = dbRowCount;
      if(resultSize <0) resultSize = this.dbRowCount;
      this.resultSize = resultSize;
  }
});


var _dataLovModel = Backbone.Model.extend({
  defaults: {
    lovName:"default_lov_name",
    requests:_dataLovAllRequests,
    isRecall:false,
    lovLabel:"",
    viewInjectionMap:[],
    idReturnMap:null,
    ajaxURL:_dataLovSetting["serverURL"],
    ajaxType:"GET",
    value:"",
    valueDesc:""
  },
  initialize: function(){
    this.requests = new _dataLovAllRequests();
      //dataLov is declared once in the app
      var lovObj = this;
      if(lovObj.get("idReturnMap") == null) lovObj.set("idReturnMap",{"key":[lovObj.get('lovName')]});
      var data = this.getLovJsonToSend();
      var ajaxType = lovObj.get("ajaxType");
      var ajaxURL = lovObj.get("ajaxURL");
      $.ajax({
          type:ajaxType,
          url:ajaxURL,
          data:data,
          success:function(result){
                    if(result.idReturnMap !== undefined) lovObj.set('idReturnMap',result.idReturnMap) ;
                    if(result.viewInjectionMap !== undefined) {
                        //var viewColMap = lovObj.get("viewInjectionMap");
                        if(lovObj.get("viewInjectionMap") !== undefined){
                           if(_.isArray(lovObj.get("viewInjectionMap"))){
                               if(lovObj.get("viewInjectionMap").length<1){
                                   var lovName = lovObj.get('lovName');
                                   var divName = "#"+_dataLovSetting["rowsDiv_prefix"]+lovName;
                                   lovObj.set('viewInjectionMap',result.viewInjectionMap);
                                   //console.log(lovName+", map is:"+JSON.stringify(lovObj.get("viewInjectionMap")));
                                   _.each(lovObj.get("viewInjectionMap"),function(column){
                                        $("[id$='"+column+"']").bind( "change", function() {
                                            console.log( column+" value has changed, efecting LOV of:"+lovName);
                                            $(divName).html("");
                                            if(!_isLovClosed(lovName)) _closeLov(lovName);
                                            lovObj.requests.reset();
                                            lovObj.requests.dbRowCount = -1;
                                            lovObj.requests.totalRows = -1;
                                        });
                                    });
                               }
                           } 
                        }
                    }
                    //console.log("lov:"+lovObj.attributes.lovName+", ViewMap:"+lovObj.attributes.viewInjectionMap);
                    if(result.isRecall !== undefined) if(result.isRecall) lovObj.isRecall = true;
                    if(result.lovLabel !== undefined) lovObj.lovLabel = result.lovLabel;
                    var x = _.findLastIndex(_dataLovSetting["AllDataLovs"],{lovName:lovObj.get('lovName')});
                    if(x !== -1) _dataLovSetting["AllDataLovs"].splice(x,1);
                    _dataLovSetting["AllDataLovs"].push(lovObj);
        },
        error:function(jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                            alert('fail getting list of value');
        }
      }); //end of ajax
  },
  processGetData: function(lovModel, request,result){
        var reqString = JSON.stringify(request);
        var foundRequest = lovModel.requests.findWhere({reqStr: reqString});
        if(foundRequest !== undefined) lovModel.requests.remove(foundRequest);
        var newModel = new _dataLovReqModel({reqStr:reqString,request:request,response:result});
        lovModel.requests.add(newModel);
        if(lovModel.attributes.idReturnMap === undefined) lovModel.attributes.idReturnMap = result.idReturnMap;
        if(_.isEmpty(lovModel.attributes.idReturnMap)) lovModel.attributes.idReturnMap = result.idReturnMap;
        if(lovModel.attributes.viewInjectionMap === undefined) lovModel.attributes.viewInjectionMap = result.viewInjectionMap;
        if(_.isEmpty(lovModel.attributes.viewInjectionMap)) lovModel.attributes.viewInjectionMap = result.viewInjectionMap;
        //if(result.viewInjectionMap.length >0) console.log(result.viewInjectionMap);
        var newX = lovModel.requests.indexOf(newModel);
        return newX;
  },
  getRows: function(lovModel,requestData, renderRowsCallback){
        var commandRow=0;
        var searchText="";
        if(requestData.commandRow !== undefined) commandRow = requestData.commandRow;
        if(requestData.searchText !== undefined) searchText = requestData.searchText;
        var allData = lovModel.requests.allData;
        if(searchText !== undefined) if(searchText.length>0) allData = _(searchText).likeFrom(lovModel.requests.allData);
        var resultSize = lovModel.requests.resultSize;
        if(commandRow<1) if(lovModel.requests.dbRowCount <= lovModel.requests.totalRows) resultSize = allData.length;
        if(resultSize ===undefined) resultSize = lovModel.requests.dbRowCount;
        if(resultSize !==undefined) if(resultSize<1) resultSize = lovModel.requests.dbRowCount;
        var output = {resultSize:resultSize,
                      totalRows:lovModel.requests.totalRows,
                      allData_length:allData.length,
                      commandRow:commandRow,
                      dbRowCount:lovModel.requests.dbRowCount};
        //console.log(output);
        if((resultSize > lovModel.requests.totalRows && ((allData.length-commandRow) < _dataLovSetting["rowsToFetch"]) && commandRow>0) &&resultSize>0 || lovModel.requests.dbRowCount <0 ){
            if(searchText.length>0) requestData["clientData"] = JSON.stringify(_(lovModel.requests.allData).arrayOf("key"));
             var ajaxURL = lovModel.attributes.ajaxURL;
             if(lovModel.attributes.ajaxURL ==undefined) ajaxURL = _dataLovSetting["serverURL"];
             $.post( ajaxURL,
                      requestData,
                      function(postResult){
                          lovModel.processGetData(lovModel,requestData,postResult);
                          if(renderRowsCallback !== undefined)      renderRowsCallback(lovModel);
                      });
        } else {
            if(renderRowsCallback !== undefined)  renderRowsCallback(lovModel);
        }
  },
  searchRows: function(lovModel,data,renderRowsCallback){
      //console.log(data);
      this.getRows(lovModel,data,renderRowsCallback);
     
  },
  DataLovRow: function(obj) {
    var defaults = {
      lovName:"",
      key:"",
      value:"",
      commandRow:0,
      value_DESC:"",
      row:{}
    };

    for(key in obj){
      var isFound = false;
      for(keyDefault in defaults){
        if(key == keyDefault) {
          isFound = true;
          defaults[key] = obj[key];
        }
      }
      defaults[key] = obj[key];  
    }
      return defaults;
  },
  getLovJsonToSend: function(commandRow, searchText,xisJson){
    //console.log(lovModel);
    var lovModel = this;
    var lovId = lovModel.attributes.lovName;
    var viewInjectionMap = lovModel.attributes.viewInjectionMap;
    
    //var vUniqueId = uniqueId;
    var vCommandRow = commandRow;
    var vSearchText = searchText;
    var visJson = true;
    
    //if(uniqueId === undefined) vUniqueId = '';
    //if(vUniqueId==='null') vUniqueId = '';
    if(vSearchText === undefined) vSearchText = 'null';
    if(vSearchText==='null') vSearchText = '';
    if(xisJson !== undefined) if(xisJson) visJson = true; 
    
    if(commandRow === undefined) if(_dataLovSetting["autoGetFirstRow"] !== undefined) vCommandRow = _dataLovSetting["autoGetFirstRow"];
    if(vCommandRow===undefined) vCommandRow = 0;
    if(vCommandRow !== undefined) if(vCommandRow.length ===0) vCommandRow = 0;
    
    
    
    var jsonData = [];
    var data = "";
    if(!_.isEmpty(viewInjectionMap)){
        var myform = $(_dataLovSetting["formSelector"]);
        var disabled = myform.find('#fieldset:disabled, :input:disabled');
        disabled.removeAttr('disabled');
        var arrayData = myform.serializeArray();
        data = JSON.stringify(arrayData);
        data = _.toJson(data);
        
        _.each(data,function(row){
            _.each(viewInjectionMap,function(mapStr){
                if(row.name.indexOf(mapStr)>-1) {
                  var obj = {name:mapStr,value:row.value};
                  jsonData.push(obj);
                }
            });
        });
      jsonData = JSON.stringify(jsonData);
      //jsonData = data;
        disabled.attr('disabled','disabled');
    }
    var jsonToSend = {action:systemInfo.action,
                      command:systemInfo.command,
                      object:systemInfo.object,
                      system:systemInfo.system,
                      formData:jsonData,
                      lov_id:lovId,
                      /*rowUniqueId:vUniqueId,*/
                      commandRow:vCommandRow,
                      searchText:vSearchText,
                      isJson:visJson,
                      rowsToFetch:_dataLovSetting["rowsToFetch"]};
    
    
    return jsonToSend;
}
});


var _dataLovView = Backbone.View.extend({
  initialize: function(){
      this.render();
      var lovModel = this.lovmodel;
      this.listenTo(lovModel,'change:value',function(){
          var elementID= lovModel.get("lovName");
          var key = lovModel.get("value");
          console.log("element:"+elementID+",key:"+key);
          this.valueChanged(elementID,key);
          /*var template = this.template;
          if(template==null) template = _.template($("#"+_dataLovSetting["landingTemplateID"]).html());
          console.log("value now:"+lovModel.get("value"));
          var htmlOutput = template(this.lovmodel.attributes);
          this.$el.html(template(this.lovmodel.attributes));*/
      });
  },
  lovmodel:{},
  template:null,
  render: function() { 
        //var template = _.template($("#"+_dataLovSetting["landingTemplateID"]).html());
        var template = this.template;
        if(template==null) template = _.template($("#"+_dataLovSetting["landingTemplateID"]).html());
        this.lovmodel = this.model;
        var lovModel = this.lovmodel;
        var lovName = lovModel.attributes.lovName;
        var divName = "#"+_dataLovSetting["rowsDiv_prefix"]+lovName;
        var viewColMap = lovModel.get("viewInjectionMap");
        this.$el.html(template(this.lovmodel.attributes));
  },events: {
           "click .inputLovBtn": "inputLovBtnClick",
           "click .lov_hyperlink": "selectOneRow",
           "click .command_hyper_link": "getMoreRows",
           "click .keySearch": "searchRows",
           "keyup .keySearchInput": "searchRows",
           "keyup .keySearchInput ":"resetSearch",
           "click .lov_Clear":"clearSelection"
           },
  resetSearch: function(obj){ //just in case you need to seperate search from keyup put this always in keyup 
      var lovModel = this.lovmodel;
       lovModel.requests.resultSize = -1;
       //console.log("key up has been finished");
  },
  renderSearchBar: function(obj){
        var template = _.template($("#"+_dataLovSetting["searchTempateId"]).html());
        return template(obj);
  },
  renderListHTML: function(obj){
      var template = _.template($("#"+_dataLovSetting["rowsListTemplateId"]).html());
      return template(obj);
  },
  renderRowHTML: function(lovModel, requestData, renderSearchBar,renderListHTML){
      var processRenderRowHTML = function myself(lovModel, requestData,isCallback, renderSearchBar,renderListHTML){
        var isCallback = isCallback;
        if(_.isUndefined(isCallback)) isCallback = false;
        var renderRowHTML = this;
        var commandRow=0;
        var searchText="";
        if(requestData.commandRow !== undefined) commandRow = requestData.commandRow;
        if(requestData.searchText !== undefined) searchText = requestData.searchText;
        var template = _.template($("#"+_dataLovSetting["oneRowTemplateId"]).html());
        var lovName = lovModel.attributes.lovName;
        var divName = "#"+_dataLovSetting["rowsDiv_prefix"]+lovName;
        var DataLovRow = lovModel.DataLovRow;
        var allData = lovModel.requests.allData;
        if(commandRow <1) if(renderSearchBar !== undefined) $("#"+lovName+_dataLovSetting["firstOpenDiv_suffix"]).append(renderSearchBar(lovModel.attributes));
        if(commandRow <1) if(renderListHTML !== undefined) $("#"+lovName+_dataLovSetting["firstOpenDiv_suffix"]).append(renderListHTML(lovModel.attributes));
        //console.log(divName+commandRow);
        if(commandRow > 0) $(divName+commandRow).html("");
        if(commandRow <1) $(divName).html("");
        if(searchText.length>0) allData = _(searchText).likeFrom(lovModel.requests.allData);
        var resultSize = lovModel.requests.resultSize;
        if(commandRow<1) if(lovModel.requests.dbRowCount <= lovModel.requests.totalRows) resultSize = allData.length;
        if(resultSize ===undefined) resultSize = lovModel.requests.dbRowCount;
        if(resultSize !==undefined) if(resultSize<1) resultSize = lovModel.requests.dbRowCount;
        var sIndex = commandRow;
        if(sIndex > 1) sIndex-=1;
        var renderCount = 0;
        var requestKeys = [];
        if(requestData.clientData !== undefined) requestKeys = _.toJson(requestData.clientData);
        var currentKeys = _(allData).arrayOf("key");
        //console.log("allData.length:"+allData.length);
        if(requestKeys.length !== currentKeys.length && requestKeys.length >0) {
            var newData = [];
            _.each(allData,function(row){
               if(requestKeys.indexOf(row.key) <0) newData.push(row);
            });
            allData = newData;
            sIndex = 0;
        } 
        //console.log("newData.length:"+allData.length);
        _(allData).fetchRange(sIndex,_dataLovSetting["rowsToFetch"],function(result){
            renderCount = result.length;
            _(result).each(function(row){
                var data = new DataLovRow({lovName:lovName,key:row.key,value:row.value,commandRow:commandRow,row:row});
                var templateResult = template(data);
                $(divName).append(templateResult);
            });
        });
        
        if((commandRow + renderCount) < resultSize){
            var nextCommand = +commandRow + renderCount;
            if(commandRow < 1) nextCommand+= 1; 
            var data = new DataLovRow({lovName:lovName,value:'..',commandRow:(nextCommand)});
            var templateResult = template(data);
            $(divName).append(templateResult);
            var searchTextStr = searchText;
            searchTextStr = searchTextStr.replace(/%/g,'');
            searchTextStr = searchTextStr.replace(/_/g,'');
            searchTextStr = searchTextStr.replace(/٪/g,'');
            
            if(renderCount <_dataLovSetting["rowsToFetch"] && (!isCallback) && searchTextStr.length>1){
                //getMoreRows(undefined,nextCommand);
                console.log("rendering more rows ..");
                var value = $("#"+_dataLovSetting["searchTextId_perfix"]+lovName).val();
                var data = lovModel.getLovJsonToSend(nextCommand,value);
                var renderRows = function(lovModel){
                    myself(lovModel, data,true);
                };
                
                lovModel.getRows(lovModel,data,renderRows);
            }
        }
    };
    
    processRenderRowHTML(lovModel, requestData,false, renderSearchBar,renderListHTML);
    
  },
  inputLovBtnClick: function(event){
        var lovModel = this.lovmodel;
        lovModel.requests.resultSize = -1;
        var elementID = event.currentTarget.getAttribute("lov-for");
        var isJson = true;
        var lovContainer = "#"+elementID+_dataLovSetting["firstOpenDiv_suffix"];
        
        var data = lovModel.getLovJsonToSend(0,'null',isJson);
        var renderSearchBar = this.renderSearchBar;
        var renderListHTML = this.renderListHTML;
        var renderRowHTML = this.renderRowHTML;
        if(_isLovClosed(elementID)){
            $(lovContainer).removeClass(_dataLovSetting["closeCssClass"]);
            lovModel.getRows(lovModel,data,renderRows);
         } else {
             _closeLov(elementID);
         }
         
         function renderRows(lovModel){
             renderRowHTML(lovModel, data, renderSearchBar,renderListHTML);
         }
  },
  clearSelection: function(e){
        var elementID = e.currentTarget.getAttribute("lov-for");
        var lovModel = this.lovmodel;
        var returnMap = lovModel.attributes.idReturnMap;
        returnMap = _.toJson(returnMap);
        _.each(returnMap,function(array,id){
            _.each(array,function(col){
                $("[id$='"+col+"']").val("");
                $("[id$='"+col+_dataLovSetting["valueDesc_Suffix"]+"']").val("");
                $("[id$='"+col+"']").trigger( "change" );
            });
        });
        _closeLov(elementID);
  },
  selectOneRow: function(e){
    var elementID = e.currentTarget.getAttribute("lov-for");
    var key = e.currentTarget.getAttribute("lov-rowuniqueid");
    //var eventMap = e.currentTarget.getAttribute("lov-mappedTo");
    this.valueChanged(elementID,key);
  },
  valueChanged: function(elementID,keyFound){
        //if(key == undefined) key = e.currentTarget.getAttribute("value"); //needs implementing getOneRow but solved via server side for now..
        var x = _.findLastIndex(this.lovmodel.requests.allData,{key:keyFound});
        var row = this.lovmodel.requests.allData[x];
        console.log(row);
        var lovModel = this.lovmodel;
        var returnMap;
        _closeLov(elementID);
        returnMap = lovModel.attributes.idReturnMap;
        returnMap = _.toJson(returnMap);
        //console.log("returnMap:");
        //console.log(JSON.stringify(returnMap));
        _.each(returnMap,function(array,id){
            _.each(array,function(col){
                $("[id$='"+col+"']").val(row[id]);
                $("[id$='"+col+_dataLovSetting["valueDesc_Suffix"]+"']").val(row.value);
                $("[id$='"+col+"']").trigger( "change" );
            });
        });
  },
  searchRows: function(e){
      var lovModel = this.lovmodel;
      var renderRowHTML = this.renderRowHTML;
      var value = $("#"+_dataLovSetting["searchTextId_perfix"]+lovModel.attributes.lovName).val();
      var data= lovModel.getLovJsonToSend(0,value);
      lovModel.searchRows(lovModel,data,renderRows);
      
      function renderRows(lovModel){
             renderRowHTML(lovModel, data);
         }
         
         
  },
  getMoreRows: function(e,xcommandRow){
      var lovModel = this.lovmodel;
      var commandRow;
      if(xcommandRow!== undefined) commandRow  = xcommandRow;
      if(commandRow === undefined) if(e !== undefined) if(e.currentTarget !== undefined) commandRow = e.currentTarget.getAttribute("lov-commandRow");
      if(commandRow === undefined) commandRow = 0;
      var isJson = true;
      var value = $("#"+_dataLovSetting["searchTextId_perfix"]+lovModel.attributes.lovName).val();
      var data = lovModel.getLovJsonToSend(commandRow,value,isJson);
      var renderRowHTML = this.renderRowHTML;
      lovModel.getRows(lovModel,data,renderRows);
      
      function renderRows(lovModel){
        renderRowHTML(lovModel,data);
      }
  }
});




