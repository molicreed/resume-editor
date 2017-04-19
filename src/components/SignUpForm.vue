<template>
    <div  class="sign">
        <form @submit.prevent="signUp">
            <div class="row">
                <label for="">用户名</label>
                <input type="text" v-model="formData.username" required>
            </div>
            <div class="row">
                <label for="">密码</label>
                <input type="password" v-model="formData.password" required>
            </div>
            <div class="actions">
                <input class="button primary"type="submit" value="提交">
                <span class="errorMessage">{{errorMessage}}</span>
            </div>
        </form>
    </div>
</template>

<script>
    import AV from '../lib/leancloud'
    import getAVUser from '../lib/getAVUser'
    import getErrorMessage from '../lib/getErrorMessage'

    export default {
        name: 'SignUpForm',
        data(){
            return {
                formData: {
                    username: '',
                    password: ''
                },
                errorMessage: ''
            }
        },
        created: ()=>{

        },
        methods: {
            signUp(){
                let {username,password} = this.formData;
                let user = new AV.User();
                user.setUsername(username);
                user.setPassword(password);
                user.signUp().then(()=>{
                    this.formData = {
                        username: '',
                        password: ''
                    };
                    this.$emit('success', getAVUser())
                }),(error)=>{
                    this.errorMessage = getErrorMessage(error);
                }
            }
        }
    }
</script>

<style lang="scss">
    .sign {
        .row {
            display: flex;
            margin-bottom: .5em;
            label {
                margin-right: .5em;
                flex: 0.3;
            }
            input {
                flex: 0.7;
            }
        }
    }
</style>