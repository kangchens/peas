<template>
    <div class="wrapper clearboth">
        <div class="mapDate turn-left" ref='map'></div>
        <div class="detail_msg turn-right"></div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import Echerts from 'echarts';
    @Component
    export default class DateCenter extends Vue{
        private dataCount:number = 0;
        private CHUNK_COUNT:number = 230;
        constructor(){
            super();
        }
        mounted () {
            console.log('this.echarts',Echerts)
        }
        initMap(){
            let map = this.$refs.map;
            let myChart = Echerts.init(document.getElementById('map'));
            // let option = {
            //     backgroundColor: '#000',
            //     title: {
            //         text: '10000000 GPS Points',
            //             left: 'center',
            //         textStyle: {
            //             color: '#fff'
            //         }
            //     },
            //     geo: {
            //         map: 'world',
            //         roam: true,
            //         label: {
            //             emphasis: {
            //                 show: false
            //             }
            //         },
            //         silent: true,
            //         itemStyle: {
            //             normal: {
            //                 areaColor: '#323c48',
            //                 borderColor: '#111'
            //             },
            //             emphasis: {
            //                 areaColor: '#2a333d'
            //             }
            //         }
            //     },
            //     series: [{
            //         name: '弱',
            //         type: 'scatterGL',
            //         progressive: 1e6,
            //         coordinateSystem: 'geo',
            //         symbolSize: 1,
            //         zoomScale: 0.002,
            //         blendMode: 'lighter',
            //         large: true,
            //         itemStyle: {
            //             color: 'rgb(20, 15, 2)'
            //         },
            //         postEffect: {
            //             enable: true
            //         },
            //         silent: true,
            //         dimensions: ['lng', 'lat'],
            //         data: new Float32Array()
            //     }]
            // };
            // myChart.setOption(option);
        }
    }
</script>

<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    .mapDate{
        width: 70%;
        height: 100%;
        border: 1px solid rgb(153, 149, 149);
    }
    .detail_msg{
        width: 30%;
        height: 100%;
    }
}
</style>