<template>
    <div id="topbar">
        <div class="wrapper">
            <div v-if="logined" class="userActions" >
                <span class="welcome">Hello! {{user.username}}</span>
                <a href="#" class="button"
                    @click.prevent="signOut">登出</a>
                <span v-show="isSaved">已保存</span>
                <span class="error" v-show="isSaved === 'wrong'">保存失败，请检查网络是否正常</span>
            </div>
            <div v-else class="userActions" >
                <span class="logo">在线简历编辑器</span>
                <a href="#" class="button primary" @click.prevent="signUpDialogVisible = true">注册</a>
                <a class="button" @click.prevent="signInDialogVisible = true" href="#" >登录</a> 
            </div> 
        </div>
        <MyDialog title="注册" 
            :visible="signUpDialogVisible" 
            @close="signUpDialogVisible = false">
            <SignUpForm @success="signIn($event)"/>
        </MyDialog>
        <MyDialog title="登录" 
            :visible="signInDialogVisible" 
            @close="signInDialogVisible = false">
            <SignInForm @success="signIn($event)"/>
        </MyDialog>
    </div>
</template>

<script>
import MyDialog from './MyDialog'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import AV from '../lib/leancloud'

const SaveInterval = 12000;

export default {
    name: 'Topbar',
    created(){
        setInterval(()=>{
            if (this.$store.state.user.id && !this.$store.state.isSaved){
                this.$store.dispatch('saveTodos');
            }
        },SaveInterval);
    },
    data(){
        return {
            saveClock: '',
            signUpDialogVisible: false,
            signInDialogVisible: false,
        }
    },
    computed: {
        isSaved(){
            return this.$store.state.isSaved;
        },
        user(){
            return this.$store.state.user;
        },
        logined(){
            return this.$store.state.user.id;
        }
    },
    components: { MyDialog,SignUpForm,SignInForm },
    methods: {
        signIn(user){
            this.$store.dispatch('setUser',user);
            this.signUpDialogVisible = false;
            this.signInDialogVisible = false;       
        },
        signOut(user){
            AV.User.logOut();
            this.$store.dispatch('removeAll');
        }
    }
}
</script>

<style lang="scss">
    .button {
        width: 72px;
        height: 32px;
        border: none;
        cursor: pointer;
        font-size: 20px;
        background: #ddd;
        color: #222;
        text-decoration: none;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        margin-right: .5em;
        &:hover {
            box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
        }
        &.primary {
            background: #02af5f;
            color: #fff;
        }
    }
    #topbar {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);

    >.wrapper {
        margin: 0 auto;
        height: 64px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px; 
        .error {
            color: red;
        }
        .userActions {
            display: flex;
            align-items: center;
            .welcome, .logo {
                margin-right: 1em;
                font-size: 24px;
                color: #000;
            }
            
        }
    }
}

</style>