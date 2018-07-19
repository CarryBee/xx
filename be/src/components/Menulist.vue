<template>
  <Menu theme="light" :open-names="['1']" active-name="1-2">
    <Submenu name="1">
      <template slot="title">
        <icon type="ios-paper"></icon>资金系统
      </template>
      <menu-item name="1-1">用户管理</menu-item>
      <menu-item name="1-2">流水管理</menu-item>
      <menu-item name="1-3">分成管理</menu-item>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-people"></Icon>用户管理
      </template>
      <menu-item name="2-1">新增用户</menu-item>
      <menu-item name="2-2">活跃用户</menu-item>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="stats-bars"></Icon>统计分析
      </template>
      <menu-group title="使用">
        <menu-item name="3-1">新增和启动</menu-item>
        <menu-item name="3-2">活跃分析</menu-item>
        <menu-item name="3-3">时段分析</menu-item>
      </menu-group>
      <menu-group title="留存">
        <menu-item name="3-4">用户留存</menu-item>
        <menu-item name="3-5">流失用户</menu-item>
      </menu-group>
    </Submenu>
  </Menu>
</template>

<script>
import { Menu, Submenu, Icon, MenuItem, MenuGroup } from 'iview';
export default {
  name: "menulist",
  components: {
    Menu,
    Submenu,
    Icon,
    MenuItem,
    MenuGroup
  }
};
</script>

<style>

</style>
