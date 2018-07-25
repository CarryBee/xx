<template>
  <Menu active-name="1-2" :open-names="['1','2','3','4','5']" theme="light" width="auto">
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper"></Icon><span>用户管理</span>
      </template>
      <menu-item name="1-1"><span>用户列表</span></menu-item>
      <menu-item name="1-2"><span>用户资金</span></menu-item>
      <menu-item name="1-3"><span>机器情况</span></menu-item>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-people"></Icon><span>授权代理</span>
      </template>
      <menu-item name="2-1"><span>授权用户</span></menu-item>
      <menu-item name="2-2"><span>代理列表</span></menu-item>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="stats-bars"></Icon><span>商城业务</span>
      </template>
      <menu-group title="订单">
        <menu-item name="3-1"><span>订单统计</span></menu-item>
        <menu-item name="3-2"><span>订单查询</span></menu-item>
      </menu-group>
      <menu-group title="商城">
        <menu-item name="3-4"><span>物品上架</span></menu-item>
        <menu-item name="3-5"><span>物品管理</span></menu-item>
      </menu-group>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="ios-people"></Icon><span>分成设置</span>
      </template>
      <menu-item name="4-1"><span>刷卡管理</span></menu-item>
      <menu-item name="4-2"><span>提现管理</span></menu-item>
    </Submenu>
    <Submenu name="5">
      <template slot="title">
        <Icon type="ios-people"></Icon><span>报表系统</span>
      </template>
      <menu-item name="4-1"><span>刷卡流水</span></menu-item>
      <menu-item name="4-2"><span>提现流水</span></menu-item>
    </Submenu>
  </Menu>
</template>

<script>
export default {
};
</script>

<style>

</style>
