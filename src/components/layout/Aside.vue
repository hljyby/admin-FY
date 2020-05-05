<template>
  <div class="aside">
    <div class="logo" style="height:60px;background:#002140;font-size:0;">
      <img src="../../../public/img/logo.png" alt />
      <span class="cai" v-if="open">龙江微统汇管理后台</span>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#242f42"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="router"
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">
                  <i :class="subItem.icon"></i>
                  <span slot="title">{{ subItem.title }}</span>
                  {{ subItem.title }}
                </template>
                <!--三级菜单-->
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Aside",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: true,
      items: [
        {
          icon: "el-icon-view",
          index: "usermanagement",
          title: "用户管理"
        },
        {
          icon: "el-icon-edit-outline",
          index: "companymanagement",
          title: "单位管理"
        },
          {
            icon: "el-icon-document",
            index: "2",
            title: "省级出入口",
            subs: [
              {
                index: "allBasicInformationManagement",
                title: "基础信息管理"
              },
              {
                index: "allStatisticsInformationManagement",
                title: "统计信息管理"
              }
            ]
          },
        {
          icon: "el-icon-tickets",
          index: "1",
          title: "普通干线省级出入口",
          subs: [
            {
              index: "ordinaryBasicInformationManagement",
              title: "基础信息管理"
            },
            {
              index: "ordinaryStatisticsInformationManagement",
              title: "统计信息管理"
            }
          ]
        },
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
    router(){
      return this.$route.path.substring(1)
    },

  },
  mounted(){
  },
  watch: {
    isCollapse(news) {
      if (news) {
        this.open = !news;
      } else {
        setTimeout(() => {
          this.open = !news;
        }, 300);
      }
    },

  }
};
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.aside {
  overflow: hidden;
}
.active {
  width: 65px;
}
</style>
