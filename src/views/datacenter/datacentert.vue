<template>
    <div class="wrapper clearboth" id='container'>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import Echerts from 'echarts';
    let AMap = require('AMap')// 引入高德地图
    import lineData from '../../util/line'
    @Component
    export default class DateCenter extends Vue{
        private dataCount:number = 0;
        private CHUNK_COUNT:number = 32;
        private map:any
        points = [{
            path:[
                new AMap.LngLat(116.400433, 39.908084),
                new AMap.LngLat(113.52412, 34.777709),
                new AMap.LngLat(108.821972, 34.270829),
                new AMap.LngLat(104.067108, 30.65769)
            ]
        },{
            path:[
                new AMap.LngLat(114.400433, 39.908084),
                new AMap.LngLat(111.52412, 30.777709),
                new AMap.LngLat(106.821972, 30.270829),
                new AMap.LngLat(102.067108, 30.65769)
            ]
        }];
        constructor(){
            super();
        }
        mounted () {
            this.initMap();
            console.log(lineData)
        }
        initMap(){
            this.map = new AMap.Map('container', {
                center: [108.011931, 37.071694],
                zoom: 6,
                viewMode: '3D',
                pitch: 70,
                mapStyle:'amap://styles/macaron'
            });
            //添加3d图层
            let object3Dlayer = new AMap.Object3DLayer({ zIndex: 10 });
            let numberOfPoints = 180;
            let minHeight = 20;
            // 用于创建支持宽度和高度的3D线段
            this.points.forEach(item=>{
                console.log(item)
                let meshLine =  new AMap.Object3D.MeshLine({
                    path: this.computeBezier(item.path, numberOfPoints, minHeight),
                    height: this.getEllipseHeight(numberOfPoints, 2000000, minHeight),
                    color: 'rgba(55,129,240, 0.9)',
                    width:20,
                })
                meshLine.transparent = true;
                object3Dlayer.add(meshLine);
                meshLine['backOrFront'] = 'both';
            })
            
            
            this.map.add(object3Dlayer);
        }
        //配置路径
        computeBezier(points, numberOfPoints,minHeight) {
            let dt;
            let i;
            let curve = [];
            dt = 1.0 / (numberOfPoints - 1);
            for (i = 0; i < numberOfPoints; i++) {
                curve[i] = this.pointOnCubicBezier(points, i * dt);
            }
            return curve;
        }
        //配置高度
        getEllipseHeight(count, maxHeight, minHeight) {
            let height = [];
            let radionUnit = Math.PI / 180;
            for (let i = 0; i < count; i++) {
                let radion = i * radionUnit;
                height.push(minHeight + Math.sin(radion) * maxHeight);
            }
            return height;
        }
        pointOnCubicBezier(cp, t) {
            let ax, bx, cx;
            let ay, by, cy;
            let tSquared, tCubed;
            cx = 3.0 * (cp[1].lng - cp[0].lng);
            bx = 3.0 * (cp[2].lng - cp[1].lng) - cx;
            ax = cp[3].lng - cp[0].lng - cx - bx;
            cy = 3.0 * (cp[1].lat - cp[0].lat);
            by = 3.0 * (cp[2].lat - cp[1].lat) - cy;
            ay = cp[3].lat - cp[0].lat - cy - by;
            tSquared = t * t;
            tCubed = tSquared * t;
            let lng = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].lng;
            let lat = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].lat;
            return new AMap.LngLat(lng, lat);
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