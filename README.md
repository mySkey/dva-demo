### dva的使用<a href="https://dvajs.com/guide" target="_blank>官方文档</a>

* <a href="https://github.com/mySkey/dva-demo" target="_blank>GIT仓库demo地址</a>

### 一、安装 dva-cli

```npm
npm install dva-cli -g
```

### 二、创建新应用

```npm
dva new example
cd example
npm start
```

### 三、文件目录结构

```
\mock       mock的数据
\pulic      存放index.html
\src
  \assets             存放一些静态文件，会被webpack打包
  \components         存放一些公用的组件
  \models             存放公用状态
  \routes             页面
  \services           存放复用性高的接口获取
  \utils              存放一些模块
  index.css
  index.js            页面入口
  router.js           配置路由
.roadhogrc.mock.js    配置接口数据，来模拟
.webpackrc            配置webpack

```

### 四、配置alias来使用路径

* 在根目录新建 webpack.config.js，dva项目会自动识别该文件
>
```javascript
// webpack.config.js

module.exports = (webpackConfig, env) => { 
  // 别名配置
  webpackConfig.resolve.alias = { 
    '@': `${__dirname}/src`, 
  } 
  return webpackConfig
}
```

### 五、路由和model的懒加载

* 不使用懒加载，首页加载速度会非常慢，懒加载会将路由拆成多个文件打包，使用dva的dynamic函数

```javascript
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const routes = [
    { path: '/', name: 'home', component: ()=>import('./routes/home/IndexPage') },
    { path: '/detail', name: 'detail', component: () => import('./routes/detail/Detail') },
  ]
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({path, name, component}) => {
            return(
              <Route path={path} key={name} exact component={dynamic({ app, models:[], component })} />
            )
          })
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
```

### 六、model的使用

* 1、编写一个计数器的model

```javascript
// /models/counter.js

export default {

  namespace: 'counter',

  state: 5,   // 状态，和vuex中state一样

  subscriptions: {  // 监听，当发生变化时能dispach相应操作
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {    // 异步action，与vuex中的actions一样
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {   // 同步action，与vuex中的mutations一样
    add(state) {
      return state + 1
    },
    reduce(state) {
      return state - 1
    }
  },

};
```

* 2、引入到index.js中

```javascript
app.model(require('./models/counter').default);
```

* 3、到页面中使用，使用connect（类似react-redux）后，直接使用this.props.dispatch()来分发就是了

```javascript
import React from 'react';
import style from './Counter.css'
import { connect } from 'dva'

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  add(){
    this.props.dispatch({ type: 'counter/add' })
  }
  reduce(){
    if (this.props.counter <= 0){
      alert('我也是有底线的！')
      return;
    }
    this.props.dispatch({ type: 'counter/reduce' })
  }
  render(){
    return (
      <div className={style.counter}>
        <div className={style.reduce} onClick={()=>this.reduce()}>-</div>
        <div className={style.num}>{this.props.counter}</div>
        <div className={style.add} onClick={()=>this.add()}>+</div>
      </div>
    );
  }
};

export default connect(({counter})=>({
  counter
}))(Counter);
```

### 七、按需加载使用antd

* 1、安装

```npm
npm install antd babel-plugin-import --save

如果安装不上使用国内的镜像

npm install cnpm -g
cnmp install antd babel-plugin-import --save
```

* 2、按需引入，更改.webpackrc

```javascript
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```