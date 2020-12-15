<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: #333;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
ul,
ol {
  padding: 0;
  margin: 0;
  list-style: none;
}
#app {
  height: 100vh;
}
.ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{
        min-height: 300px;
    }
.avatar-uploader .el-upload{
        border: 1px dashed #ddd;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
</style>
