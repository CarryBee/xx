<template>
    <div id="app">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1" :style="{display: 'flex'}">
                    <div class="logo-big">
                      <img src="@/assets/logo.png" />
                    </div>
                    <div class="layout-nav">
                        <menu-item name="3">
                            <Icon type="ios-analytics"></Icon>
                            admin
                        </menu-item>
                        <menu-item name="4">
                            <Icon type="ios-paper"></Icon>
                            退出登录
                        </menu-item>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menulist></Menulist>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '800px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import Menulist from "./components/Menulist.vue";
export default {
  components: {
    Menulist
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
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.logo-big {
  flex: 200px;
  width: 200px;
  height: auto;
  padding: 12px 0px;
}
.logo-big img {
  height: 30px;
}
.layout-nav{
    width: 220px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>