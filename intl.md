# noah开发笔记
## noah 国际化
### [react-intl-universal](https://github.com/alibaba/react-intl-universal)
使用
初始化：（Header.jsx）
```javascript
import intl from 'react-intl-universal';
// locale data
const locales = {
  "en-US": require('./locales/en-US.js'),
  "zh-CN": require('./locales/zh-CN.js'),
};
intl.init({
      currentLocale: 'en-US', // TODO: determine locale here
      locales,
    })
    .then(() => {
      // After loading CLDR locale data, start to render
      this.setState({initDone: true});
    });
```
引用：

```javascript
intl.get(‘SIMPLE’)
intl.getHTML('TIP');
```
设置默认值:

```javascript
intl.get('not-exist-key').defaultMessage('default message') // "default message"
```
简写形式:

```javascript
intl.get('not-exist-key').d('default message') // "default message"
```
html形式：

```javascript
intl.getHTML('not-exist-key').d(<div>hello</div>) // React.Element with “<div>hello</div>"
```
支持变量：

```javascript
//设置格式：
{ "HELLO": "Hello, {name}. Welcome to {where}!" }

//引用：
intl.get('HELLO', {name:'Tony', where:'Alibaba'}) // "Hello, Tony. Welcome to Alibaba!"
```
支持多元表达式：

```javascript
//设置格式：
{ "PHOTO": "You have {num, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}" }

//引用：
intl.get('PHOTO', {num:0}); // "You have no photos."
intl.get('PHOTO', {num:1}); // "You have one photo."
intl.get('PHOTO', {num:1000000}); // "You have 1,000,000 photos."
```
显示货币：

```javascript
//设置格式：
{ "SALE_PRICE": "The price is {price, number, USD}" }

//引用：
intl.get('SALE_PRICE', {price:123456.78}); // The price is $123,456.78
```
货币代号表格数据：
https://www.currency-iso.org/en/home/tables/table-a1.html

显示日期：

```javascript
//设置格式：
{
	"SALE_START": "Sale begins {start, date}",
	"SALE_END": "Sale ends {end, date, long}"
}

//引用：
intl.get('SALE_START', {start:new Date()}); // Sale begins 4/19/2017
intl.get('SALE_END', {end:new Date()}); // Sale ends April 19, 2017

//format:short,medium,long,full
```
显示时间：

```javascript
//设置格式：
{
	"COUPON": "Coupon expires at {expires, time, medium}"
}

//引用：
intl.get('COUPON', {expires:new Date()}); // Coupon expires at 6:45:44 PM

//format:short,medium,long
```
### [React-intl](https://github.com/mihuartuanr/React-intl)

React-intl是FormatJS的一部分，内置实现Date/Number/Time的国际格式化；
可以自定义映射关系，完成值对之间的替换（这是这篇文章的主要内容）；
通过获取浏览器的language来设置显示中文/英文（通过自定义映射，而非自动全文转换）；
常用于实现静态内容，如按钮文字，公司名称的转换；

##### 缺陷：
* 国际化只能用于View层，也就是只能是React.Componet。如果有一些通用型的utility就不能使用。像是一些表单效验的错误提示如下，这样单纯的js是无法使用react-intl的。

```javascript
const rules = {
        noSpace(value) {
    		if (value.includes(' ')) {
     		return '不允许空白或者tab';
		    }
	    }
    };
```
* 无法通过refs属性获取组件实例，需要用getWrappedInstance()代替

```javascript
//无法使用：
class App {
  render() {
    <MyComponent ref="my"/>
  }
  getMyInstance() {
    console.log('getMyInstance', this.refs.my);
  }
}
class MyComponent {...}
export default injectIntl(MyComponent, {withRef: true});

//需要使用：
class App {
  render() {
    <MyComponent ref="my"/>
  }
  getMyInstance() {
    console.log('getMyInstance', this.refs.my.getWrappedInstance());
  }
}
```
##### 附：

* react高阶组件
https://segmentfault.com/a/1190000008112017?_ea=1553893
* ref 简介
https://segmentfault.com/a/1190000008665915

    `React提供的这个ref属性，表示为对组件真正实例的引用，其实就是ReactDOM.render()返回的组件实例；需要区分一下，ReactDOM.render()渲染组件时返回的是组件实例；而渲染dom元素时，返回是具体的dom节点。`

* FormatJS
https://formatjs.io/

* Intl 对象
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

```javascript
var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
// Results below assume UTC timezone - your results may vary

console.log(new Intl.DateTimeFormat('en-US').format(date));
// expected output: "12/20/2012"

console.log(new Intl.DateTimeFormat('en-GB').format(date));
// expected output: "20/12/2012"

// Include a fallback language, in this case Indonesian
console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
// expected output: “20/12/2012"
```

### patchLanguage.js，Translate.jsx
app初始化时调用patchLanguage.js，改写React.createElement方法，对string节点调用Translate方法。
对需要全局匹配替换语言的组件调用antTranlateWrappedComponent方法，antTranlateWrappedComponent完成两个操作：
调用蚂蚁金服的国际化组件，对组件内的语音进行国际化操作；
使用react的context上下文设置language参数，在已被改写的createElement方法中会获取该参数进行判断是否需要进行国际化操作。
##### 附：
* 上下文（context）http://www.css88.com/react/docs/context.html

    `使用方法：
    export default antTranlateWrappedComponent(Header)
    插件会把组件内所有中文过滤匹配，如果不想对某个文字执行翻译功能，可以用span包裹，并且设置data-translated属性为true`
    
##### 课外：

```javascript
 /[^\u4e00-\u9fa5]/g.test("为什么很多女生希望嫁给程序员");
 false
 /[^\u4e00-\u9fa5]/g.test("为什么很多女生希望嫁给程序员!!!");
 true
 /^[\u4e00-\u9fa5]/g.test("因为他们赚得多花的少");
 true
 /^[\u4e00-\u9fa5]/g.test("因为他们赚得多花的少!!!");
 true
 
```
### ofoI18n.js

用于非组件的国际化
react-intl-universal的简化版，只支持获取字符串，与react-intl-universal共享翻译文件。

使用方法：

```javascript
//引入 
import i18n from './ofoI18n';
//使用：
i18n('bikeMap_menuTitle');
```

# Webpack相关

Webpack 中 css import 使用 alias 相对路径:
https://wiki.zthxxx.me/wiki/%E6%8A%80%E6%9C%AF%E5%BC%80%E5%8F%91/%E5%89%8D%E7%AB%AF/Webpack-%E4%B8%AD-css-import-%E4%BD%BF%E7%94%A8-alias-%E7%9B%B8%E5%AF%B9%E8%B7%AF%E5%BE%84/

```javascript

// Alias
  webpackConfig.resolve.alias = {
    src: `${__dirname}/src`,
    assets: `${__dirname}/src/imgs`,
  }
  background: url(~assets/illustrator_empty.png) center 40% no-repeat;
  background-position: center calc(~ '50% - 40px');
  
```
但是需要补充一点的是：引用这种加~的路径时，必须使用了css预处理器。例如sass，less等
