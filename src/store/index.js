import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from "object-path"
import saveStorage from '../lib/saveStorage'
import getStorage from '../lib/getStorage'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selected: 'workHistory',
        user: {
            id: '',
            username: '',
            objectId: ''
        },
        config: [
            { field: 'profile', icon: 'id', keys: ['name', 'city', 'title', 'birthday'] },
            { field: 'workHistory', icon: 'work', keys: ['company', 'details'] },
            { field: 'education', icon: 'book', keys: ['school', 'details'] },
            { field: 'projects', icon: 'heart', keys: ['name', 'details'] },
            { field: 'awards', icon: 'cup', keys: ['name', 'details'] },
            { field: 'contacts', icon: 'phone', keys: ['contact', 'content'] }
        ],
        resume: {
            // profile: [{
            //     name: '你的名字',
            //     city: '城市',
            //     title: '应聘职业',
            //     birthday: '出生日期'
            // }],
            // workHistory: [
            //     {company: '公司1', content: 'My First Job'},
            //     {company: '公司2', content: 'My Second Job'}
            // ],
            // education: [
            //     { school: '学校1', content: '教育经历1'},
            //     { school: '学校2', content: '教育经历2'},
            // ],
            // projects: [
            //     { name: 'project A', content: '项目经历1'},
            //     { name: 'project B', content: '项目经历2'},
            // ],
            // awards: [
            //     { name: 'awards A', content: '获奖经历A'},
            //     { name: 'awards B', content: '获奖经历B'},
            // ],
            // contacts: [
            //     { contact: 'Phone', content: '123456789'},
            //     { contact: 'QQ', content: '123456789'},
            // ]
        }
    },
    actions: {
        update({state,commit},{path,value}){
            commit('updateResume',{path,value})
            if (state.user.id) {
                saveStorage(state.resume, state.user.objectId)
                    .then((val)=>{
                        commit('setObjId',val.id);
                        console.log('Success! ObjectId is',val.id)
                    });
            }
        },
        setUser(context,user){
            console.log(user);
            getStorage().then(({content,objId})=>{
                console.log(content,objId);  
                user.objectId = objId;
                context.commit('SET',{user,content});
            },()=>{
                context.commit('SET',{user});
                context.commit('initState');
            })
        },
        removeAll(context){
            let user = {
                id: '',
                username: '',
                objectId: ''
            }
            context.commit('initState');
            context.commit('SET',{user});
        }
    },
    mutations: {
        initState (state){
            state.resume = {};
            state.config.map((item)=>{
                Vue.set(state.resume, item.field, [{}]);
                item.keys.map((key)=>{
                    Vue.set(state.resume[item.field][0],key,'');
                });
            });
        },
        addData (state,{item,tab}){
            let len = item.length;
            item.push({});
            state.config.map((val)=>{
                if (val.field === tab){
                    val.keys.map((key)=>{
                        Vue.set(item[len],key,'');
                    });
                }
            })
        },
        setObjId(state,objId){
            state.user.objectId = objId;
        },
        delData (state,{item,tab}){
            item.pop();
        },
        switchTab (state,val){
            state.selected = val;
        },
        SET(state,{user,content}){
            state.user = user;
            if (content) {
                state.resume = content;
            }
            
        },
        updateResume(state,{path,value}){
            objectPath.set(state.resume, path, value);
        }
    }
})