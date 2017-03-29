<template>
    <div id="resumeEditor">
        <ol class="nav">
            <li v-for="(item,index) in resume"
                :class="{active: index === selected}"
                @click="selected = index">
                <svg class="icon">
                    <use :xlink:href="`#icon-${item.icon}`"></use>
                </svg>
            </li>
        </ol>
        <ol class="panels">
            <li v-for="(item,index) in resume"
                v-show="index === selected">
                <div v-if="item.items instanceof Array">
                    <div class="subitem" v-for="subitem in item.items">
                        <div class="resumeField" v-for="(value,key) in subitem">
                            <label for="">{{key}}</label>
                            <input type="text" :value="value">
                        </div>
                        <hr>
                    </div>
                </div>
                <div v-else class="resumeField" v-for="(value,key) in item.items">
                    <label> {{key}} </label>
                    <input type="text" :value="value">
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'ResumeEditor',
    data(){
        return {
            selected: 'profile',
            // config: [
            //     { field: 'profile', icon: 'id' },
            //     { field: 'workHistory', icon: 'work'},
            //     { field: 'education', icon: 'book' },
            //     { field: 'projects', icon: 'heart' },
            //     { field: 'awards', icon: 'cup' },
            //     { field: 'contacts', icon: 'phone' }
            // ],
            resume: {
                profile: {
                    icon: 'id',
                    items: {
                        name: '张三',
                        city: '',
                        title: ''
                    }
                },
                workHistory: {
                    icon: 'work',
                    items:[
                        {company: 'AL', content: 'My First Job'},
                        {company: 'TX', content: 'My Second Job'}
                    ]
                },
                education: { 
                    icon: 'book',
                    items:{

                    }
                },
                projects: { 
                    icon: 'heart',
                    items:{

                    }
                },
                awards: { 
                    icon: 'cup',
                    items: {

                    }
                },
                contacts: { 
                    icon: 'contacts', 
                    items:{

                    }
                },
            }
        }
    }
}
</script>

<style scoped lang="scss">
    ol {
        list-style: none;
    }
    #resumeEditor {
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
        display: flex;
        flex-direction: row;
        overflow: auto;
        > ol.nav {
            width: 80px;
            background: #000;
            color: #fff;
            > li {
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 16px;
                margin-bottom: 16px;
                cursor:pointer;
                &.active{
                    background: #fff;
                    color: #000;
                }
                svg.icon {
                    width: 24px;
                    height: 24px;
                }
            }
        }
        > ol.panels{
            flex-grow: 1;
            > li{
                padding: 24px;
                .resumeField {  
                    > label {
                        display: block;
                    }
                    input[type="text"] {
                        margin: 16px 0;
                        border: 1px solid #ddd;
                        box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.25);
                        width: 100%;
                        height: 40px;
                        padding: 0 8px;
                    }
                }
                hr{
                    border: none;
                    border-top: 1px solid #ddd;
                    margin: 24px 0;
                }
            }
        }
    }
</style>