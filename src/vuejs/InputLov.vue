<template>
    <label  class="col-sm-2 control-label" for='{{lovName}}_DESC'>{{lovLabel}}</label> 
        <div class="col-sm-10 "> 
            <div class="input-group"> 
                <div class="input-group-addon btn btn-info inputLovBtn glyphicon glyphicon-search" lov-for="{{lovName}}" style="top:0px; color: #FFF" json="true"></div>  
                <input type="text" class="form-control" id='{{lovName}}_DESC' disabled="true" value="{{value_DESC}}" /> 
                <div class="input-group-addon {{_dataLovInputType}} hidden-xs"> 
                    <input id='{{_dataLovSetting.formName}}:{{lovName}}' name='{{_dataLovSetting.formName}}:{{lovName}}'
                         type='{{_dataLovInputType}}'
                         value="{{value}}"
                         class="inputLovValue hidden-xs" 
                         lov-for="{{lovName}}"
                         disabled="true"
                         /> 
                </div>
                <div class="input-group-addon btn btn-info lov_Clear glyphicon glyphicon-ban-circle" lov-for="{{lovName}}" style="top:0px; color: #FFF" json="true"></div> 
            </div> 
            <div id="{{lovName}}_Lov" class="lovContainer close"></div> 
        </div> 
</template>



<script>
    export default {
        name: 'item',
        data() {
            return {
                item: {}
            }
        },
        created() {
            
        }
    };
</script>



<style scoped>
    
</style>     
