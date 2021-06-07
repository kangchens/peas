<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: chenkang
 * @Date: 2021-06-01 14:09:50
 * @LastEditors: chenkang
 * @LastEditTime: 2021-06-02 15:24:46
-->
<template>
    <div class="wrapper">
        <aside>
            
        </aside>
        <main>
             <nav>
                <el-button plain>添加流程</el-button>
                <el-button type="primary" plain>修改流程</el-button>
                <el-button type="success" plain>保存流程</el-button>
            </nav>
            <div id="content" ref="content"></div>
        </main>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import login from '../../api/login'
    import G6, { ModeOption } from '@antv/g6';
    @Component
    export default class Approval extends Vue{
        constructor(){
            super()

        }
        public graph:any = null;
        public addedCount:number = 0
        public initDate:any = {
            nodes: [
                {
                x: 150,
                y: 150,
                description: 'ant_type_name_...',
                label: 'Type / ReferType',
                color: '#2196f3',
                meta: {
                    creatorName: 'a_creator',
                },
                id: 'test',
                },
            ],
        }
        async mounted () {
            await this.registerBehavior();
            this.initg6();
        }
        handler(){
            alert(11111)
        }
        /**初始化G6 */
        initg6(){
            let _this = this
            // 实例化 minimap 插件
            const minimap = new G6.Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate',
            });
            G6.registerNode('dom-node', {
                draw: (cfg, group) => {
                    const stroke = cfg.style ? cfg.style.stroke || '#5B8FF9' : '#5B8FF9';
                    const shape = group.addShape('dom', {
                    attrs: {
                        width: cfg.size[0],
                        height: cfg.size[1],
                        html: `
                        <div
                        onClick='${_this.handler}'
                        id=${
                        cfg.id
                        } class='dom-node' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; width: ${
                        cfg.size[0] - 5
                        }px; height: ${cfg.size[1] - 5}px; display: flex;">
                        <div style="height: 100%; width: 33%; background-color: #CDDDFD">
                            <img alt="" style="line-height: 100%; margin-left: 7px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />  
                        </div>
                        <span style="margin:auto; padding:auto; color: #5B8FF9">${cfg.label}</span>
                        </div>
                        `,
                    },
                    draggable: true,
                    });
                    return shape;
                },
            });
            // jsx节点
            // G6.registerNode('rect-xml', {
            //     jsx: (cfg) => `
            //         <group>
            //         <rect style={{
            //             width: 200,
            //             height: 75,
            //         }}>
            //             <rect style={{
            //             width: 150,
            //             height: 20,
            //             fill: ${cfg.color},
            //             radius: [6, 6, 0, 0],
            //             cursor: 'move'，
            //             stroke: ${cfg.color}
            //             }} draggable="true">
            //             <text style={{
            //                 marginTop: 2,
            //                 marginLeft: 75,
            //                 textAlign: 'center',
            //                 fontWeight: 'bold',
            //                 fill: '#fff' }}>{{label}}</text>
            //             </rect>
            //             <rect style={{
            //             width: 150,
            //             height: 55,
            //             stroke: ${cfg.color},
            //             fill: #ffffff,
            //             radius: [0, 0, 6, 6],
            //             }}>
            //             <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
            //             <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>创建者: {{meta.creatorName}}</text>
            //             </rect>
            //         </rect>
            //         <circle style={{
            //             stroke: ${cfg.color},
            //             r: 10,
            //             fill: '#fff',
            //             marginLeft: 75,
            //             cursor: 'pointer'
            //         }} name="circle">
            //             <image onclick="alert('Hi')" name="img" style={{ img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png', width: 12, height: 12,  marginLeft: 69,  marginTop: -5 }} />
            //         </circle>
            //         </group>
            //     `,
            //     afterDraw: (cfg, group) => {
            //         console.log(group);
            //         const img = group.findAllByName('img');
            //         if (img[0]) {
            //         img[0].animate(
            //             (ratio) => {
            //             return {
            //                 opacity: Math.abs(0.5 - ratio),
            //             };
            //             },
            //             {
            //             duration: 3000,
            //             repeat: true,
            //             },
            //         );
            //         }
            //     },
            // });
            let {clientWidth,clientHeight} = (this.$refs.content as any)
            this.graph = new G6.Graph({
                container: 'content', // 指定挂载容器
                width: clientWidth, // 图的宽度
                height: clientHeight - 80, // 图的高度
                fitCenter: true,
                renderer: 'svg',
                linkCenter: true,
                defaultNode: {
                    type: 'dom-node',
                    size: [120, 40],
                },
            })
            this.graph.data(this.initDate); // 加载数据
            this.graph.render(); // 渲染
        }
        /**自定义事件 */
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
                    // return 
                    const self = this
                    const graph = self.graph
                    graph.addItem('node', {
                        x: ev.canvasX,
                        y: ev.canvasY,
                        id: `node-${_this.addedCount}`, // Generate the unique id
                        label:`${_this.addedCount}`,
                        meta: {
                            creatorName: 'a_creator'+_this.addedCount,
                        },
                        type: 'rect-xml',
                    });
                    _this.addedCount++;
                    // console.log('this',_this.graph.save())
                }
            })
        }
    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    aside{
        width: 280px;
        height: 100%;
        background-color: #fff;
        float: left;
        padding: 10px;
        box-sizing: border-box;
    }
    main{
        padding: 10px;
        margin-left: 300px;
        height: 100%;
        background-color: #fff;
        box-sizing: border-box;
        nav{
            text-align: left;
            height: 50px;
            line-height: 50px;
        }
        #content{
            margin-top: 10px;
            width: 100%;
            height: calc(100% - 70px);
            border: 1px solid rgb(233, 225, 225);
        }
    }
}
</style>