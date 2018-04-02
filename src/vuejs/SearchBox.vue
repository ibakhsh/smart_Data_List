<template>
    <div class="form-group" style="margin: 5px; margin-bottom:10px;" > 
        <div class="input-group"> 
            <span class="input-group-addon glyphicon glyphicon-filter" style="top:0px;"></span> 
            <input type="text" id="SearchText_{{lovName}}" lov-for="{{lovName}}" class="form-control keySearchInput" /> 
            <div class="input-group-addon keySearch btn btn-info glyphicon glyphicon-repeat" style="top:0px; color:#fff;"></div> 
        </div> 
    </div>
</template>



<script>
    import ListItem from './ListItem.vue';
    export default {
        name: 'SearchBox',
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
