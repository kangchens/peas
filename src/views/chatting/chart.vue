<template>
    <div class="wrapper clearboth">
        <aside class="turn-left">
            <header class="clearboth">
                <div class="seacher turn-left">
                    <el-autocomplete
                    class="inline-input"
                    v-model="state2"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    ></el-autocomplete>
                    <i class="el-icon-search" ></i>
                </div>
                <i class="icons el-icon-more"></i>
            </header>
            <ul class="chartlist" v-for="item in chartlist" :key='item.id'>
                <li class="clearboth">
                    <img :src="item.img" alt="">
                    <div class="message">
                        <p>{{item.name}}</p>
                        <span>{{item.message}}</span>
                    </div>
                </li>
            </ul>
        </aside>
        <div class="chart">
            <div class="title">
                <div class="user_detail">
                    <img src="/element.JPG" alt="">
                    <span>陈康</span>
                </div>
                <div class="set">
                    <i class="el-icon-share"></i>
                    <i class="el-icon-menu"></i>
                    <i class="el-icon-s-promotion"></i>
                </div>
            </div>
            <main>
                <p></p>
            </main>
            <footer>
                <i class="el-icon-microphone"></i>
                <i class="el-icon-folder"></i>
                <input type="text" placeholder="Type in what you want to say">
                <el-button type="primary" icon='el-icon-s-promotion' circle></el-button>
            </footer>
        </div>
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from "vue-property-decorator";  
    import { State, Action, Mutation } from "vuex-class";
    import socketio from 'socket.io-client'
    import '../../assect/element.JPG'
    import login_api from '../../api/login'
    import chat_api from '../../api/chat'
    @Component
    export default class ChartComponent extends Vue{
        @State(state => state.user) user
        private chartlist:Array<object> =[]
        state2 = ''
        private socket:any;
        private seacherList:any
        async mounted () {
            console.log('userInfo',this.user)
            let res = await login_api.getUserList({
                name:'',
                id:'',
                mobile:'',
                roleId:'',
                offset:0,
                limit:10000
            })
            this.seacherList = res.data.rows.map(item=>{
                return {
                    value:item.username,
                    id:item.id
                }
            });
        }
        chatInit(){
            this.socket = socketio('http://127.0.0.1:7001');
            this.socket.on('connect', () => {
                console.log('connect!');
                this.socket.emit('chat', 'hello world!');
            });
            //接收消息通知
            this.socket.on('res', msg => {
            console.log('res from server: %s!', msg);
            });

            // 接收上线通知
            this.socket.on('online', msg=>{
            console.log('online from server: %s!', msg);
            });
        }
        querySearch(queryString, cb) {
            var restaurants = this.seacherList;
            console.log('queryString',queryString)
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        }
        createFilter(queryString) {
            return (restaurant) => {
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        }
        async handleSelect(item) {
            console.log(item);
            item.userId = this.user.id
            let res = await chat_api.selectChat(item);
            
        }
    }
    
</script>

<style lang="less" scoped>
@r:18.75rem;
.wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    aside{
        width: 350 / @r;
        height: 100%;
        background-color: #fdfdfd;
        header{
            text-align: left;
            padding-left:30px ;
            height: 70px;
            line-height: 70px;
            box-shadow: 0 1px 5px #e8e8e8;
            position: relative;
            .icons{
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translate(0,-50%) rotate(90deg);
                color: #8e8e8e;
            }
            .seacher{
                position: relative;
                .inline-input{
                    width: 200 / @r;
                    height: 30px;
                    padding: 0 20px;
                    border-radius: 15px;
                    border: none;
                    box-shadow: 0 0 5px #e8e8e8;
                }
                i{
                    position: absolute;
                    top:50%;
                    right:0;
                    transform: translate(-30px,-50%);
                    color: #bbb;
                }
            }
        }
        .chartlist{
            width: 100%;
            color: #666;
            li{
                font-family: '微软雅黑';
                padding: 10 / @r;
                border-bottom: 1px solid #f1f1f1;
                cursor: pointer;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    float: left;
                    margin-right: 20px;
                    
                }
                .message{
                    float: left;
                    text-align: left;
                    p{
                        margin-bottom: 10px;
                        font-weight: 600;
                    }
                }

            }
        }
    }
    .chart{
        @aside:350  /@r;
        width: calc(~"100% - @{aside}" );
        height: 100%;
        float: left;
        .title{
            padding: 0 20px ;
            height: 100 / @r;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user_detail{
                display: flex;
                justify-content: start;
                align-items: center;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
                span{
                    vertical-align:middle;
                    color: #000;
                    font-size: 24 / @r;
                }
            }
            .set{
                i{
                    margin-left: 20 / @r;
                    color: #8e8e8e;
                }
            }
        }
        main{
            width: 100%;
            height: 780 / @r;
            background-color: #edf5f8;
        }
        footer{
            @other:880 / @r;
            width: 100%;
            height: calc(~"100% - @{other}" );
            line-height:calc(~"100% - @{other}" ) ;
            display: flex;
            align-items: center;
            padding: 0 40px;
            i{
                font-size: 24px;
                margin-right: 40px;
            }
            input{
                width: 80%;
                height: 40px;
                background: #edf5f8;
                border-radius: 20px;
                border: none;
                padding: 0 20px;
                margin: 0 30 / @r;
                
            }
            ::-webkit-input-placeholder{
                font-size: 18px;
            }
        }
    }
}
</style>