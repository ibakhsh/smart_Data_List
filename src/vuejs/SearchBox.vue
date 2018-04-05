<template>
    <div class="form-group" style="margin: 5px; margin-bottom:10px;" > 
        <div class="input-group"> 
            <span class="input-group-addon glyphicon glyphicon-filter" ></span> 
            <input type="text" id="SearchText_{{lovName}}" lov-for="{{lovName}}" class="form-control keySearchInput" /> 
            <div class="input-group-addon keySearch btn btn-info glyphicon glyphicon-repeat" style="top:0px; color:#fff;"></div> 
        </div> 
    </div>
</template>



<script>
    import ListItem from './ListItem.vue';
    export default {
        name: 'SearchBox',
        props: ["dir"],
        data() {
            return {
                item: {}
            }
        },
        created: function(e) {
            //معالجة الصفحة من اليمين إلى اليسار 
            let direction = "ltr";
            if(this.dir != undefined && this.dir != null) {
                direction = this.dir;
            } else {
                let isRTL = document.getElementsByTagName("html")[0].getAttribute("dir");
                if(isRTL ==null) isRTL = direction;
                if(isRTL == "rtl") {
                    direction = isRTL;
                }
            }

            if(direction.toUpperCase() == "RTL") {
                console.log('document is right to left direction');
                console.log('TODO:to be implemented rtl');
            }       
        }
    };
</script>



<style scoped>
    
</style>     
