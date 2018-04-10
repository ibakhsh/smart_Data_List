<template>
    <div class="">
        <div class="input-group">
            <div class="input-group-btn btn btn-primary fa fa-search" @click="switchState()"></div>
            <div class="input-group-addon"> <input type="text" class="form-control" :id='id+"_DESC"' disabled="true" :value="displayVal()"/> </div>
            <input :id='id' :name='id'
                    type='hidden'
                    :value="activeRow.value"
                    class="form-control"
                    disabled="true"
                    />
            <div class="input-group-btn btn btn-primary fa fa-ban"></div>
        </div>
        <div :id="containerId" class="lovOpenContainer">
            <search-box :lovId='id' @setSelectedRow="setSelectedRow" @searchDataset="searchDataset"></search-box>
            <div v-for="item in getItems()" :key="item.value">
                <list-item id="item1" @setSelectedRow="setSelectedRow" @loadMore="loadMore" :description="item.description" :item="item"></list-item>
            </div>
        </div>
    </div>
</template>

 

<script>

    import ListItem from './ListItem.vue';
    import SearchBox from './SearchBox.vue';

    export default {
        name: 'InputLov',
        props: ["id"],
        components: {
            'list-item': ListItem,
            'search-box': SearchBox
        },
        data() {
            return {
                scrolled: false,
                activeRow: {value: "0", description: "Lolo"},
                items: [
                    {value: "1", description: "First item on the list 1"},
                    {value: "2", description: "second row 2"},
                    {value: "3", description: "third line 3"},
                    {value: "4", description: "forth item 4"},
                    {value: "5", description: "First item on the list 5"},
                    {value: "6", description: "second row 6"},
                    {value: "7", description: "third line 7"},
                    {value: "8", description: "forth item 8"},
                    {value: "9", description: "First item on the list 9", info:"igb"},
                    {value: "10", description: "second row 10"},
                    {value: "11", description: "third line 11"},
                    {value: "12", description: "forth item 12"},
                    {value: "13", description: "First item on the list 13"},
                    {value: "14", description: "second row 14"},
                    {value: "15", description: "third line 15"},
                    {value: "16", description: "forth item 16"}
                ],
                state: "close",
                dataset: [],
                containerId: ""
            }
        },
        created() {
            this.dataset = this.items;
            this.containerId = this.id+"_Container";
        }, 
        mounted() {
            document.getElementById(this.containerId).addEventListener('scroll', this.handleScroll);
            console.log('scrolling Injected');
        },
        beforeDestroy() {
            document.getElementById(this.containerId).removeEventListener('scroll', this.handleScroll);
            console.log('scrolling Destroyed');
        },
        methods: {
            handleScroll () {
                this.scrolled = window.scrollY > 0;
                // var sh = $(".lovOpenContainer").scrollHeight;
                // var st = $(".lovOpenContainer").scrollTop;
                var sh = document.getElementById(this.containerId).scrollHeight;
                var st = document.getElementById(this.containerId).scrollTop;
                var oh = document.getElementById(this.containerId).offsetHeight;
                console.log('scrolling..'+(sh-st-oh+1)); 
                if(sh-st-oh+1<1) {
                    //TODO: call the loadMore function to load additional data
                    var n = this.items.length+1;
                    this.items.push({value: n, description: "New loaded content #:"+n});
                }
            },
            getItems: function(){
                return this.dataset;
            }, 
            searchDataset: function(searchText){
                console.log('in searchDataset we are now, searchText:'+searchText);
                if(searchText.length>0){
                    this.dataset = [];
                    this.dataset = _(searchText).likeFrom(this.items).value();
                    
                } else {
                    this.dataset = this.items;
                }
            },
            switchState: function(newState){
                if(newState == undefined) newState = (this.state=="open")? "close":"open";
                //console.log('we are here & newState:'+newState);
                if(this.state == "open" || newState == "close") {
                    $('.lovOpenContainer').css('display','none');
                    this.state = newState;
                } else if(this.state == "close" || newState == "open") {
                    $('.lovOpenContainer').css('display','block');
                    this.state = newState;
                }
            },
            displayVal: function(){
                if(this.activeRow.value.toString().length) {
                    return "(" + this.activeRow.value + ") " +this.activeRow.description;
                } else {
                    return this.activeRow.description;
                }
            },
            setSelectedRow: function(newRow){
                if(newRow.hasOwnProperty('value') && newRow.hasOwnProperty('description')) {
                    this.activeRow = newRow;
                } else {
                    console.err('Value passed from search-box or list-item has no value or description');
                }
                this.switchState("close");
            },
            loadMore: function(e){

            }
        }
    };
</script>



<style scoped>
    .lovOpenContainer {
        margin-bottom:10px; 
        padding-left: 10px; 
        padding-right: 10px;
        border: 1px solid rgba(0, 0, 0, 0.125);
        padding-bottom:10px;
        padding-top: 10px;
        border-radius: 0.2em;
        border-top: 0;
        overflow: auto;
        height: 200px;
    }
    input {
        border-radius: 0em;
    }

    .btn {
        color: #FFF;
        width: 2.5em;
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
