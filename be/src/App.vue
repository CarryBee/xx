<template>
  <div id="app">
    <Header :style="{padding: 0}" class="layout-header-bar">
      <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '15px 15px'}" type="navicon-round" size="24"></Icon>
      <div class="logo-big">
        <img src="@/assets/logo.png" />
      </div>
    </Header>
    <Layout>
      <Sider :style="{background: '#fff'}" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :style="{marginRight: '-1px'}" active-name="1-2" :open-names="['1','2']" theme="light" width="auto" :class="menuitemClasses">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon><span>文章管理</span>
            </template>
            <menu-item name="1-1"><span>文章管理</span></menu-item>
            <menu-item name="1-2"><span>文章管理</span></menu-item>
            <menu-item name="1-3"><span>文章管理</span></menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
            <Icon type="ios-people"></Icon><span>文章管理</span>
            </template>
            <menu-item name="2-1"><span>文章管理</span></menu-item>
            <menu-item name="2-2"><span>文章管理</span></menu-item>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="stats-bars"></Icon><span>文章管理</span>
            </template>
            <menu-group title="使用">
              <menu-item name="3-1"><span>文章管理</span></menu-item>
              <menu-item name="3-2"><span>文章管理</span></menu-item>
              <menu-item name="3-3"><span>文章管理</span></menu-item>
            </menu-group>
            <menu-group title="留存">
              <menu-item name="3-4"><span>文章管理</span></menu-item>
              <menu-item name="3-5"><span>文章管理</span></menu-item>
            </menu-group>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{margin: '20px', minHeight: '800px'}">
          Content
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f5f7f9;
  overflow: hidden;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  display: flex;
  background: #49505F;
  color: #fff;
  height: 55px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.logo-big {
  padding: 4px 10px;
  height: auto;
}
.logo-big img {
  height: 30px;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(9px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>