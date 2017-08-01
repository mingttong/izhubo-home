<template>
    <div id="app">
        <h1>Hello iZhubo!</h1>
        <div>
            <router-view></router-view>
        </div>
        <Page :current="1" :total="100"></Page>
    </div>
</template>
<script>
  export default {

  }
</script>
