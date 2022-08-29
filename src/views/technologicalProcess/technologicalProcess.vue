<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: chenkang
 * @Date: 2021-06-01 14:09:50
 * @LastEditors: chenkang
 * @LastEditTime: 2021-06-02 09:48:26
-->
<template>
    <div class="wrapper">
        <nav>
            <el-button plain @click="modlHandler('default')">默认模式</el-button>
            <el-button type="primary" plain @click="modlHandler('addNode')">添加节点</el-button>
            <el-button type="success" plain @click="modlHandler('addEdge')">添加关联</el-button>
        </nav>
       <div id="mountNode" ref="content"></div>
       <!-- 节点信息设置 -->
       <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="content">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="节点名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="节点信息">
                        <el-input v-model="form.message"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="nodeinformmation">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import login from '../../api/login'
    import G6 from '@antv/g6';
    @Component
    export default class Process extends Vue{
        constructor(){
            super()

        }
        /**设置模式 */
        public 
        public initDate:object = {}
        public graph:any = null
        public addedCount:number = 0
        public dialogVisible:boolean = false
        public form:any = {
            name:'',
            message:''
        }
        public nodeinformmations:any = {};
        public Cnodegraph:any = null
        async mounted () {
            this.initDate = {
                nodes:[
                    {
                        id:'nodes',
                        x:100,
                        y:100,
                        label:'1'
                    },
                    {
                        id:'nodes',
                        x:200,
                        y:200,
                        label:'2'
                    },
                ],
                edges:[
                    {
                        source:'node1',
                        target:'node2',
                        label:'我是连线'
                    }
                ]
            }
            await this.registerBehavior();
            await this.initG6();
            await this.setbehavior();
        }
        /**注册行为模式 */
        registerBehavior(){
            let _this = this
            G6.registerBehavior('click-add-node',{
                getEvents(){
                    return {
                        'canvas:click':'onClick'
                    }
                },
                onClick(ev){
                    console.log('this.addedCount',this.addedCount)
                    _this.dialogVisible = true;
                    // return 
                    const self = this
                    const graph = self.graph
                    _this.Cnodegraph = graph
                    _this.nodeinformmations = {
                        x: ev.canvasX,
                        y: ev.canvasY,
                        id: `node-${_this.addedCount}`, // Generate the unique id
                        label:`${_this.addedCount}`
                    }
                    // graph.addItem('node', );
                    // _this.addedCount++;
                    // console.log('this',_this.graph.save())
                }
            })
        }
        setbehavior(){
            // 鼠标进入节点
            this.graph.on('node:mouseenter', (e) => {
            const nodeItem = e.item; // 获取鼠标进入的节点元素对象
            this.graph.setItemState(nodeItem, 'hover', true); // 设置当前节点的 hover 状态为 true
            });

            // 鼠标离开节点
            this.graph.on('node:mouseleave', (e) => {
            const nodeItem = e.item; // 获取鼠标离开的节点元素对象
            this.graph.setItemState(nodeItem, 'hover', false); // 设置当前节点的 hover 状态为 false
            });

            // 点击节点
            this.graph.on('node:click', (e) => {
            // 先将所有当前是 click 状态的节点置为非 click 状态
            const clickNodes = this.graph.findAllByState('node', 'click');
            clickNodes.forEach((cn) => {
                this.graph.setItemState(cn, 'click', false);
            });
            const nodeItem = e.item; // 获取被点击的节点元素对象
                this.graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
            });

            // 点击边
            this.graph.on('edge:click', (e) => {
            // 先将所有当前是 click 状态的边置为非 click 状态
            const clickEdges = this.graph.findAllByState('edge', 'click');
            clickEdges.forEach((ce) => {
                this.graph.setItemState(ce, 'click', false);
            });
            const edgeItem = e.item; // 获取被点击的边元素对象
            this.graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
            });
        }
        initG6(){
            // 实例化 minimap 插件
            const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate',
            });

            let {clientWidth,clientHeight} = (this.$refs.content as any)
            console.log(this.$refs,clientWidth,clientHeight);
            this.graph = new G6.Graph({
                container: 'mountNode', // 指定挂载容器
                width: clientWidth, // 图的宽度
                height: clientHeight - 160, // 图的高度
                defaultNode:{
                    size:30,
                    style:{
                        fill:'steelblue',
                        stroke:'#666',
                        lineWidth: 1, // 节点描边粗细
                    },
                    // 节点上的标签文本配置
                    labelCfg: {
                        // 节点上的标签文本样式配置
                        style: {
                            fill: '#fff', // 节点标签文字颜色
                        },
                    },
                },
                defaultEdge:{
                    style: {
                        opacity: 0.6, // 边透明度
                        stroke: 'grey', // 边描边颜色
                        },
                        // 边上的标签文本配置
                        labelCfg: {
                        autoRotate: true, // 边上的标签文本根据边的方向旋转
                    },
                },
                nodeStateStyles: {
                    // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
                    hover: {
                    fill: 'lightsteelblue',
                    },
                    // 鼠标点击节点，即 click 状态为 true 时的样式
                    click: {
                    stroke: '#000',
                    lineWidth: 3,
                    },
                },
                edgeStateStyles: {
                    // 鼠标点击边，即 click 状态为 true 时的样式
                    click: {
                        stroke: 'steelblue',
                    },
                },
                // fitView: true,
                fitViewPadding: [ 20, 40, 50, 20 ],
                layout: {
                    // Object，可选，布局的方法及其配置项，默认为 random 布局。
                    type: 'force', // 指定为力导向布局
                    preventOverlap: true, // 防止节点重叠
                    linkDistance:100,
                    // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
                },
                modes: {
                    default: [
                        'zoom-canvas', 
                        'drag-node',
                        'click-select',
                        {
                            type: 'tooltip', // 提示框
                            formatText(model) {
                            // 提示框文本内容
                            const text = 'label: ' + model.label + '<br/> class: ' + model.class;
                            return text;
                            },
                        },
                    ], // 允许拖拽画布、放缩画布、拖拽节点
                    addNode: ['click-add-node','click-select',]
                },
                plugins: [minimap]
            })
            this.graph.data(this.initDate); // 加载数据
            this.graph.render(); // 渲染
        }
        /**节点信息设置 */
        nodeinformmation(){
            let {x,y,id} = this.nodeinformmations
            let {name,message} = this.form
            this.Cnodegraph.addItem('node',{
                x,
                y,
                id,
                label:name,
                message,
            })
            this.addedCount++;
            console.log('this',this.graph.save())
            this.handleClose()
        }
        handleClose(){
            this.form = {
                name:"",
                message:''
            }
            this.dialogVisible = false
        }
        /**修改模式 */
        modlHandler(data){
            this.graph.setMode(data);
        }
    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100vw;
    height: 100%;
    
    #mountNode{
        width: 100%;
        height: calc(100% - 80px);

    }
    nav{
        height: 60px;
        line-height: 60px;
        text-align: left;
    }
}
</style>