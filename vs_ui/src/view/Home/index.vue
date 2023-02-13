<template>
    <div class="home">
      <Mian :hotGoodsList = 'info.hotGoodsList'/>
      <Floor v-for="sort in info.hotSortGoodsList" :key="sort.id" :sortList = 'sort'/>
    </div>
</template>

<script>
import Mian from './main'
import Floor from './floor'
export default {
  name:'Home',
  components:{
    Mian,
    Floor
  },
  data() {
    return {
      info:{}
    }
  },
  mounted() {
    this.init();
  }
  ,
  methods:{
    async init() {
      const result = await this.$API.home.reqGetInfo();
      if(result.code == 200) {
        this.info = result.data;
      }else {
        this.$message(code.message);
      }
    }
  }
}
</script>

<style lang="less">
.home {
  background-color: #fafafa;
}
</style>