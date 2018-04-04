<template>
    <div class="col-sm-10"> 
        <div class="input-group lovContainer"> 
            <div class="input-group-addon btn btn-info inputLovBtn fa fa-search" style="top:0px; color: #FFF"></div>  
            <div> <input type="text" class="form-control" :id='id+"_DESC"' disabled="true" :value="value_DESC" /> </div>
            <div class="input-group-addon hidden-xs"> 
                <input :id='id' :name='id'
                        type='text'
                        :value="value"
                        class="form-control inputLovValue hidden-xs" 
                        disabled="true"
                        /> 
            </div>
            <div class="input-group-addon btn btn-info lov_Clear fa fa-ban" style="top:0px; color: #FFF"></div> 
        </div> 
        <!--<div id="{{lovName}}_Lov" class="lovContainer close"></div> -->
    </div> 
</template>



<script>
    var dir = document.getElementsByTagName('html')[0].getAttribute("dir");
    if (dir==null) dir = "ltr";
    console.log(dir);
    export default {
        name: 'InputLov',
        props: ["id"],
        data() {
            return {
                value: "0",
                value_DESC: "Please Choose .."
            }
        },
        created() {
            
        }
    };
</script>



<style scoped>
    
</style>     
