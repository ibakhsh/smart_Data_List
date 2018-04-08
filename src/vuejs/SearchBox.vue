<template>
    <div class="input-group"> 
        <span class="input-group-btn btn btn-default fa fa-filter" ></span> 
        <div class="input-group-addon"><input type="text" :id="'SearchText_'+lovId" class="form-control" /></div>
        <div class="input-group-btn btn btn-default fa fa-repeat" style="top:0px;"></div> 
    </div> 
</template>



<script>
    export default {
        name: 'SearchBox',
        props: ["lovId","setSelectedRow", "item"],
        mounted() {
            var newRow = {value: "", description: "search mode.."};
            this.$emit('setSelectedRow',newRow);
        }
    };
</script>



<style scoped>
    input {
        border-radius: 0em;
    }

    .btn {
        color: #000;
        width: 2.5em;
        border: 1px solid rgba(0, 0, 0, 0.125);
    }

    .input-group {
        display: inline-table;
        vertical-align: middle;
        position: relative;
        border-collapse: separate;
        box-sizing: border-box;
    }

    .input-group .form-control:not(:first-child):not(:last-child), .input-group-addon:not(:first-child):not(:last-child), .input-group-btn:not(:first-child):not(:last-child) {
        border-radius: 0;
    }

    .input-group>.form-control{
        width: 100%;
    }

    .input-group .form-control, .input-group-addon, .input-group-btn{
        display: table-cell;
    }

    .input-group .input-group-addon {
        width: auto;
    }

    .input-group-addon:last-child {
        border-left: 0;
    }

    /** left to right group btns style */
    html:not([dir*="rtl"]).input-group-btn:first-child, 
    body:not([dir*="rtl"]).input-group-btn:first-child ,
    form:not([dir*="rtl"]).input-group-btn:first-child ,
    .input-group-btn:not([dir*="rtl"]):first-child
      {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    html:not([dir*="rtl"]).input-group-btn:last-child,
    body:not([dir*="rtl"]).input-group-btn:last-child,
    form:not([dir*="rtl"]).input-group-btn:first-child ,
    .input-group-btn:not([dir*="rtl"]):last-child  {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    
    /** right to left group btns style */
    html[dir*="rtl"] .input-group-btn:first-child,
    body[dir*="rtl"] .input-group-btn:first-child,
    form[dir*="rtl"] .input-group-btn:first-child,
    .input-group-btn[dir*="rtl"]:last-child
      {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    html[dir*="rtl"] .input-group-btn:last-child,
    body[dir*="rtl"] .input-group-btn:last-child,
    form[dir*="rtl"] .input-group-btn:last-child,
    .input-group-btn[dir*="rtl"]:first-child  {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
    }

    /** end ltr/rtl style */

</style>     
