<template>
    <div>
        <a class="list-group-item">{{item}}</a>
    </div>
</template>


<script>
    export default {
        name: 'item',
        props: ["id"],
        data() {
            return {
                item: "initial value"
            }
        },
        created() {
            this.item = "First Item "+ this.id;
        }
    };
</script>



<style scoped>
    
</style>     
