<template>
    <div class="list-item">
        <a class="list-group-item" @click="setSelectedRow(item)">{{description}} <slot/></a>
    </div>
</template>


<script>
    export default {
        name: "listItem",
        props: ["id","description", "item"],
        data() {
            return {
                index: -1
            }
        },
        beforeUpdate() {
            //console.log(description);
        },
        methods: {
            setSelectedRow: function(item) {
                this.$emit('setSelectedRow',item);
            }
        }
    };
</script>



<style scoped>
    .list-item{
        padding:0.09em; 
        cursor: pointer;
    }

    .list-item>a:hover{
        background-color: #cce5ff;
        color: #004085;
        border-color: #b8daff;
    }
</style>     
