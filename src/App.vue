<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>
  import 'normalize.css/normalize.css'
  import './assets/reset.css'

  import Topbar from './components/Topbar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'

export default {
  name: 'app',
  data: function () {
    return {text: 'Hello'}
  },
  components: { Topbar, ResumeEditor, ResumePreview }
}
</script>

<style>
.page {
  min-width: 1024px;
  max-width: 1440px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #EAEBEC;
  margin: 0 auto;
}
.page>main{
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  flex-grow: 1;
}
#resumeEditor {
  width: 35%;
  background: #444;
}
#resumePreview{
  flex-grow: 1;
  margin-left: 16px;
  background: #777;
}
</style>
