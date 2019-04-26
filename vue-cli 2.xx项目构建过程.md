[TOC]





### **vue项目构建过程**

#### **#项目初始化**

1.全局安装vue-cli    (Vue脚手架)  （-g代表全局范围内）

```
npm install vue-cli -g 或者  cnpm install vue-cli -g（推荐）
```

2.初始化项目

```
vue init webpack my-project             -->  my-project为工程文件名(自定义)
```

3.进入工程项目的根目录（也就是）

```
cd  my-project
```

4.安装依赖（根目录会产生一个``node_modules``文件夹）

```
npm install		或者    cnpm install（推荐）
```

5.启动项目(开发环境)

```
npm run dev
```

#### **#项目上线**

```
npm run build 
```

> 解释：
>
> 使用webpack打包
>
> 打包结果在工程目录下面的``dist``文件夹中
>
> 只需将dist目录放到tomcat(或者其他服务器)中并设置主页为dist/index.html即可在线上环境运行



#### **#项目目录结构**


##### **1.一级目录**

build:	webpack 配置相关的目录

config:	webpack相关配置文件

src:	存放源码，我们开发的所有代码都放在src目录下

static:	存放第三方静态资源的目录

#####**2.一级文件**

.babelrc:  babel的一些配置，(将es6编译成es5的一些配置)

.editorconfig:  编辑器的一些配置(包括编码格式，缩进风格，换行格式)

.eslintignore:  配置我们不会对build文件和config文件进行语法检查。

.eslintrc.js:  eslint的配置文件，主要是定义一些代码编写风格的规则。

.gitignore:  配置Git仓库忽略的一些文件(不会上传)

index.html:  入口html 文件。

package.json:  项目的一些配置信息(项目的一些具体信息)

![img](https://images2017.cnblogs.com/blog/916533/201801/916533-20180118181001443-1283702699.png)

#### **#Vue基础**

##### **Vue组件**

	一、包含三个部分
	
		1.template：视图
	
		2.script：逻辑
	
		3.style：样式
			scoped:样式只在当前组件内生效
	二、父子级组件交互(通信)
		父 -> 子：props
		数据传递类型限制(验证)：数据类型验证，多数据类型验证，必选项，默认值，obj和arr数据类型的默认值
		子 -> 父：emit 
		子组件定义事件，事件通过$emit传递数据，有两个参数，key作为父组件自定义事件形式实现，函数里的参数的值来自于子组件传递的数据
	三、插槽
		单个插槽
		具名插槽
		作用域插槽：数据是子传父
	四、动态组件 
		keep-alive
		不能使用缓存的场景：实时更新数据的场景

##### **Mustache: 模板**   

		表现形式： {{  语法   }}  
	
		``{{}}``中可以放data中的变量、三元运算符，字符串需要声明在data中，只存在单行语句

##### **Vue基本指令**

	v-html：渲染文本
	
	v-text : 渲染文本      

> 区别：v-text不解释标签，v-html解释标签
>
> 解释html标签可能导致xss攻击，不要使用用户提供的内容插值

	v-bind 绑定属性, 如  ``<p v-bind:class="box"></p>``

##### **条件渲染**

	v-if
	
	v-else
	
	v-show
**列表渲染**

 	v-for  分为数组渲染和对象渲染

**事件监听**

	1. v-on   简写为 @
	2. methods 事件属性集合，与data同级
	3. 事件参数  事件函数中已有参数，事件对象前面加上 $
	4. 修饰符  .stop .prevent .once

**数组更新检测**

	变异方法：引起视图更新
	替换数组：不会引起视图更新

**显示过滤/排序过滤**

	filter

##### **计算属性**

	computed

> 计算属性和Methods区别
>
> computed计算的结果如果不发生改变就不会触发result这个函数。而methods中一般都是定义的需要事件触发的一些函数。每次只要触发事件，就会执行对应的方法。如果把computed中的方法写到method中会浪费性能。
>
> computed必须返回一个值页面绑定的才能取得值，而methods中可以只执行逻辑代码，可以有返回值，也可以没有。

##### **表单输入和绑定**

v-model 双向数据绑定

修饰符： .lazy   .number  .trim

##### **CSS过渡与动画**

```css
//在CSS过渡和动画中自动应用class
//过渡类名：
	v-enter：进入开始   v-enter-active：执行过程中  v-enter-to：结束动画
	v-leave：离开开始   v-leave-active：离开过程中  v-leave-to：离开结束
```

也可以配合 使用第三方CSS动画库，如 Animate.css

##### **自定义指令**

全局指令 局部指令

##### **Axios请求**

1.安装

```
$ npm install axios
```

2.引入加载(在main.js文件中)

	import Axios from "axios"

```
Vue.prototype.$axios = Axios
```

3.请求

get请求：``this.$axios(url).then(callback).catch(callback)``
	
post请求：注意：axios接收的post请求参数的格式是form-data格式，可以使用qs第三方库来转编码

`` this.$axios.post(url,this.qs.stringify({params}).then(callback)catch(callback))``

4.全局 axios默认值   (在main.js文件中 )

```
Axios.defaults.baseURL = "http://www.wwtliu.com";
Axios.defaults.headers.common['Authoriztion']= AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

5.拦截器

6.跨域处理：

- 修改config/index.js文件

```js
proxyTable: {
      "/api": {
           target: "http://localhost:3000",
           changeOrigin: true,
           pathRewrite: {
                '^api': ''
           }
      }
}	
```

- 添加host

		全局设置(main.js)  `` Vue.prototype.HOST = '/api'``

		请求处理：var url = this.HOST+"/login.php";

注意：此种跨域解决方案，只能适用于测试阶段，打包的时候，因为不具备服务器所以就不能跨域了，后端解决

##### **Mock：数据模拟**

	1.自己创建JSON文件，使用get请求形式访问数据
	
		优点： 方便，快捷	缺点：只能存在get请求
	
	2.项目中集成服务器，模拟各种接口
	
		优点：模拟真实线上环境		缺点：增加开发成本
	
	3.直接使用线上数据
	
		优点：真实  		缺点：不一定每个项目都存在
	
	4.模拟数据库 http://mockjs.com



##### **路由(vue-router)**

1.安装  ``npm install vue-router -D``

2.引入到项目中

```
import router from "vue-router"
Vue.use(router)
```

3.配置路由文件

```
var router = new VueRouter({
    routes: [{
        path:'/hello',
        component:Hello
    }]
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

4.视图加载的位置

``<router-view></router-view>``

5.src创建路由文件夹router 下创建index.js 

6.跳转(导航)

```
<router-link to="/"></router-link>
```

7.路由嵌套

- 	children
    给定显示的位置



#### **#Less**

1.安装 

```
cnpm i stylus stylus-loader style-loader less-loader -D
```

2.修改webpack.base.config中的配置

```
{
	test: /\.less$/,
	loader: "style-loader!css-loader!less-loader",
},
```

3.使用Less



#### **#Element-UI**

1.安装 element-ui

```
npm i element-ui -S
```

2.安装按需加载的依赖

```
npm install babel-plugin-component -D
```

3.修改 ``.babelrc`` 文件(plugins)

```json
"plugins": ["transform-vue-jsx", "transform-runtime",
    ["component",
    {
      "libraryName": "element-ui",
      "styleLibraryName": "theme-chalk"
    }
    ]
  ]
```

 4.进入组件

> 	如在main.js文件中添加：
>
> ```js
> import { Button, Select} from 'element-ui'
> 	Vue.use(Button)
> 	Vue.use(Select)
> ```

**#Echarts**

1.安装

```git
cnpm install echarts -S
```

2.全局引入（``main.js``）

```js
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件
```

3.``echarts.vue``中引用
