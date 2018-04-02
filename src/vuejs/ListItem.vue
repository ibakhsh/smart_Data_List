<template>
    <div>
        <a class="list-group-item">{{item}}</a>
    </div>
</template>


<script>
    export default {
        name: 'item',
        data() {
            return {
                item: "initial value"
            }
        },
        created() {
            this.item = "First Item";
        }
    };
</script>



<style scoped>
    
</style>     
