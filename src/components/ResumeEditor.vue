<template>
    <div id="resumeEditor">
        <ol class="nav">
            <li v-for="item in config"
                :class="{active: item.field === selected}"
                @click="selected=item.field">
                <svg class="icon">
                    <use :xlink:href="`#icon-${item.icon}`"></use>
                </svg>
            </li>
        </ol>
        <ol class="panels">
            <li v-for="(item,tab) in resume"
                v-show="tab === selected">
                <div class="subitem" v-for="(subitem,subTab) in item">
                    <hr v-show="subTab !== 0">
                    <div class="resumeField" v-for="(value,key) in subitem">
                        <label for="" >{{names[tab][key]}}</label>
                        <input type="text" :value="value" 
                            @input="changeResumeField([tab,subTab,key],$event.target.value)">
                    </div> 
                </div>
                <a href="#" class="button" v-show="tab!=='profile'"@click.prevent="addResume(tab)">增加</a>
                <a href="#" class="button" v-show="item.length>1"@click.prevent="delResume(tab)">删除</a>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'ResumeEditor',
    data(){
        return {
             names: {
                'profile': {
                    'name': '姓名',
                    'city': '城市',
                    'title': '职业',
                    'birthday': '生日'
                },
                'workHistory': {
                    'company': '公司名称',
                    'details': '描述'
                },
                'education': {
                    'school': '学校名称',
                    'details': '描述'
                },
                'projects': {
                    'name': '项目名称',
                    'details': '描述'
                },
                'awards': {
                    'name': '奖项名称',
                    'details': '描述'
                },
                'contacts': {
                    'contact': '联系方式',
                    'content': '具体内容'
                }
            }
        }
    },
    computed: {
        selected: {
            get(){
                return this.$store.state.selected
            },
            set(val){
                this.$store.commit('switchTab',val)
            }
        },
        resume (){
            return this.$store.state.resume
        },
        config(){
            return this.$store.state.config
        }
    },
    methods: {
        changeResumeField(path, value){
            this.$store.dispatch('update',{
                path,
                value
            })
        },
        addResume(tab){
            this.$store.commit('addData',tab)
        },
        delResume(tab){
            this.$store.commit('delData',tab)
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