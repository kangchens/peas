<template>
	<div class="home">
		<nav><h3>后台管理系统</h3></nav>
		<main class="clearboth">
			<aside class="turn-left">
				<el-menu
					default-active="/home/datacenter"
					class="el-menu-vertical-demo"
					background-color="#409EFF"
					text-color="#fff"
					active-text-color="#fff"
					mode="vertical"
					@open="handleOpen"
					:router="true"
					@close="handleClose"
					menu-trigge="click"
					:collapse="isCollapse"
				>
					<Aside :list="asideList"></Aside>
				</el-menu>
			</aside>
			<div class="content turn-left">
				<router-view></router-view>
			</div>
		</main>
	</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import Aside from '../components/aside.vue'
import {routes} from '../router'

@Component({
	components: {
		Aside,
	},
})
export default class HomePage extends Vue {
	private isCollapse: boolean = false
	private asideList: object[]
	constructor() {
		super()
		this.asideList = routes ? routes : []
	}
	private mounted() {
        console.log('this', routes)
	}
	private handleOpen() {}
	private handleClose() {}
}
</script>
<style lang="less">
.is-active {
	background-color: rgb(22, 107, 193) !important;
}
</style>
<style lang="less" scoped>
.home {
	background-color: #409eff;
	nav {
		height: 70px;
		background-color: #409eff;
		padding: 0 30px;
		line-height: 70px;
		h3 {
			font-family: cursive;
			font-size: 24px;
			color: white;
			text-align: left;
		}
	}
	aside {
		background-color: #409eff;
		height: calc(100vh - 70px);
		width: 200px;
		.el-menu-vertical-demo {
			height: 100%;
			.item {
				padding: 0;
			}
		}
	}
	.content {
		background-color: #f0f5fc;
		padding: 20px;
		height: calc(100vh - 70px);
		width: calc(100% - 200px);
		border-radius: 5px;
	}
}
</style>