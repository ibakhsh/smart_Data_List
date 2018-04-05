<template>
    <div class="col-sm-10" style="margin: 10px;"> 
        <div class="input-group"> 
            <div class="input-group-addon btn btn-info inputLovBtn fa fa-search" style="border-radius: 0 em 0.25rem; top:0px;"></div>  
            <div class="input-group-addon"> <input type="text" class="form-control" :id='id+"_DESC"' disabled="true" :value="value_DESC" style="width: 100%;" /> </div>
            <div class="input-group-addon hidden-xs"> 
                <input :id='id' :name='id'
                        type='text'
                        :value="value"
                        class="form-control inputLovValue hidden-xs" 
                        disabled="true"
                        />  
            </div>
            <div class="input-group-addon btn btn-info lov_Clear fa fa-ban" style="color: #FFF"></div> 
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
                value_DESC: "Choose one Lolo.."
            }
        },
        created() {
            
        }
    };
</script>



<style scoped>
    input {
        border-radius: 0em;
    }

    .btn {
        color: #FFF;
    }
</style>     
