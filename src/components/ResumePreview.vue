<template>
    <div id="resumePreview">
        <section data-name="profile" v-show="resume.profile">
            <h1>{{resume.profile[0].name}}</h1>
            <h2>{{resume.profile[0].title}}</h2>
            <p>
                <small>{{resume.profile[0].city}}</small>
                <small>{{resume.profile[0].birthday}}</small>
            </p>
        </section>
        <section data-name="workHistory" v-show="resume.workHistory">
            <h2>工作经历</h2>
            <ol>
                <li v-for="item in resume.workHistory">
                    <div v-show="item.company">
                        <h3>{{item.company}}</h3>
                        <p> - {{item.details}}</p>
                    </div>
                </li>
            </ol>
        </section>
        <section data-name="education" v-show="resume.education.length>0">
            <h2>毕业院校</h2>
            <ol>
                <li v-for="item in resume.education" v-show="item.school !== ''">
                    <h3 v-show="item.school">{{item.school}}</h3>
                    <p v-show="item.content"> - {{item.details}}</p>
                </li>
            </ol>
        </section>
        <section data-name="projects" v-show="resume.projects.length>0">
            <h2>项目经历</h2>
            <ol>
                <li v-for="item in resume.projects">
                    <h3 v-show="item.name">{{item.name}}</h3>
                    <p v-show="item.content"> {{item.details}} </p>
                </li>
            </ol>
        </section>
        <section data-name="awards" v-show="resume.awards.length>0">
            <h2>获奖情况</h2>
            <ol>
                <li v-for="item in resume.awards">
                    <h3 v-show="item.name">{{item.name}}</h3>
                    <p v-show="item.content"> {{item.details}} </p>
                </li>
            </ol>
        </section>
    
        <section data-name="contacts" v-show="resume.contacts.length>0">
            <h2>联系方式</h2>
            <table>
                <tr v-for="item in resume.contacts">
                    <td>{{item.contact}}</td>
                    <td v-show="item.content"> {{item.content}} </td>
                </tr>
            </table>
        </section>
    </div>
</template>

<script>
export default {
    name: 'ResumePreview',
    computed: {
        resume(){
            return this.$store.state.resume
        }
    },
    created(){
        console.log('ResumePreview created');
    }
}
</script>

<style lang="scss">
#resumePreview{
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
    padding: 2em;
    color: #333;
    line-height: 1.2;
    overflow: auto;
    * {
        box-sizing: border-box;
        font-variant: normal;
        font-weight: normal;
    }
    ol {
        list-style: none;
    }
    p { white-space: pre-line;}
    section + section {
        margin-top: 2em;
    }
    section {
        >h2:first-child {
            background: #ddd;
            display: inline-block;
            padding: .2em;
            margin-bottom: .5em;
        }
        &[data-name="profile"] {
            >h1 {
                margin: .1em;
                font-size: 4em;
            }
        }
        &[data-name="workHistory"],
        &[data-name="education"],
        &[data-name="projects"],
        &[data-name="awards"] {
            li + li {
                margin-top: 1em;
            }
            li {
                line-height: 1.5;
                h3 {
                    border-bottom: 1px solid #999;
                    padding-bottom: .3em;
                    margin-bottom: .3em;
                }
            }
        }      
        &[data-name="contacts"]{
            td:first-child{
                padding-right: 1em;
            }
        }
    }
}
</style>