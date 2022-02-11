<style>
th {
  font-weight: 500 !important;
}
label {
  font-weight: 500;
}
.pointer {
  cursor: pointer;
}
.font-weight-500 {
  font-weight: 500 !important;
}
.modal-title {
  font-size: 22px;
}
.modal-header,
.modal-footer {
  justify-content: center;
  border: none;
}
.modal-body {
  font-weight: 500;
  font-size: 18px;
}
.modal-content {
  border-radius: 15px !important;
}
.modal-footer button {
  border-radius: 15px;
  border: none;
  font-weight: 500;
}
.loading {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 40px;
}
</style>
<template>
  <div id="app">
    <div class="loading">
      <b-spinner variant="primary" v-if="loading"></b-spinner>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState(["loading"]),
})
export default class App extends Vue {}
</script>
