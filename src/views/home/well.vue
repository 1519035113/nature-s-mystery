<template>
  <div class="gaine">
    <div class="header">
      <p>Home</p>
    </div>
    <div class="content">Welcome</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.gaine {
  width: 100%;
  height: 100%;
}
.header {
  width: 95%;
  margin: 0 25px;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
  p {
    font-size: 28px;
    color: #666;
  }
}
.content {
  width: 95%;
  margin: 0 25px;
  padding: 15px 0;
}
</style>
