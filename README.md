# React 设计模式与最佳实践

## 1、React 基础

### 1.1 声明式编程

传统命令式函数

```
const toLowerCase = input => {
  const output = []
  for (let i = 0; i < input.length; i++){
    output.push(input[i].toLowerCase())
  }
}
```

声明式函数

```
const toLowerCase = input => input.map(inp=>inp.toLowerCase)
```

> 声明式优点: 更加简洁、易读、无须使用变量、便于维护

### 1.2 React 元素

> 元素描述了屏幕上需要显示的内容

`type`: **必选**，用于告诉 React 如何处理元素本身

> 如果 type 是字符串，表示元素为 DOM 节点，如果是函数，元素则是组件

`children`: **可选**，用于实现节点的嵌套

```
{
    type: Title,
    props: {
        color: 'red',
        children: {
            type: 'h1',
            props: {
                children: 'Hello, H1!'
            }
        }
    }
}
```

> 当元素的 type 属性是函数时，React 会调用它，传入 props 来取回底层元素。React 会一直对返回结果递归地执行相同的操作，直到取回完整的 DOM 节点树，然后就可以将它渲染到屏幕。

### 1.3 忘掉所学的一切

> 传统的模板方案实现的的分离大多数情况下只是一种假象。真相是，无论 JavaScript 和 HTML 写在什么地方，它们都是紧密耦合的。

**React 尝试将模板渲染与逻辑控制放在一起处理**

React 组件的渲染方法如下

```
render() {
    return (
        <button style={{ color: 'red' }} onClick={this.handleClick}>
            Click me!
        </button>
    )
}
```

另外有一种 Css in JavaScript 的方案饱受争议

```
var divStyle = {
    color: 'white',
    backgroundImage: 'url(' + imgUrl + ')',
    WebkitTransition: 'all', // 注意此处大写的'W'
    msTransition: 'all' // 'ms'是唯一小写的厂商前缀
}

ReactDOM.render(
    <div style={divStyle}>Hello World!</div>,
    mountNode
);
```

### 1.4 常见误解

-   React 是一个庞大的技术和工具集，要想使用它，就必须与包管理器、转译器、模块打包器以及无数的库打交道。

> React 其实是一个很小的库。像之前使用 jQuery 或 Backbone 那样，我们可以在任何页面（甚至 JSFiddle）中使用它：只要在关闭主体元素前引入脚本即可

React 拆分成了两个包：核心包 react 实现了 React 库的核心特性，react-dom 则包含了与浏览器相关的所有特性.

> 我们可以使用 create-react-app 快速创建 React 应用

```
npm install -g create-react-app

create-react-app hello-world

npm start
```

---

## 2、整理代码

### 2.1 JSX

> React 中两种定义元素的方式： JavaScript、 JSX

![image](https://cdn.cnbj1.fds.api.mi-img.com/book/images/b1ff4acb01a865971821d06b74fe2680?thumb=1&w=512&h=512)

> JSX 将 JavaScript 和 HTML 写在一起,标签的开始和闭合让 DOM 树结构更加便于阅读

#### 2.1.2 Babel

> Babel 是目前最流行的 JavaScript 编译器，可以将 JSX 和 ES6 语法转译成标准 ES5 语法

安装方式

```
npm install --global babel-cli
```

使用 Babel 转译

```
babel source.js -o output.js
```

Babel 强大之处在与可以灵活配置，也有很多非常有用的预设配置

```
npm install --global babel-preset-es2015 babel-preset-react
```

安装后新建.babelrc 配置文件

```
{
    "presets": [
        "es2015",
        "react"
    ]
}
```

配置完成

#### 2.1.2 Hello, World!

#### 2.1.3 DOM 元素与 React 组件

> HTML 元素和 React 元素的区别是，React 组件以大写字母开头

```
<button />  =>  React.createELement('button')

<Button />  =>  React.createELement(Button)
```

React 组件支持自闭合标签

#### 2.1.4 属性

> JSX 可以非常方便地书写包含属性的 DOM 元素或 React 组件。实际上，用 XML 设置元素属性就很简单

JSX:

```
<img src="https://facebook.github.io/react/img/logo.svg" alt="React.js" />
```

等效 JavaScript 为

```
React.createElement("img", {
    src: "https://facebook.github.io/react/img/logo.svg",
    alt: "React.js"
})
```

这种写法可读性较差

#### 2.1.5 子元素

JSX 实现方式为

```
<div>
    <a href="https://facebook.github.io/react/">Click me!</a>
</div>
```

等效 JavaScript 方式为

```
React.createElement(
    "div",
    null,
    React.createElement(
        "a",
        { href: "https://facebook.github.io/react/" },
        "Click me!"
    )
)
```

> JSX 中可以使用函数和变量，使用花括号包裹表达式即可

```
<a href={this.makeHref()}>Click me!</a>
```

#### 2.1.6 JSX 和 HTML 的区别

-   属性

> 我们需要使用 className 代替 Class，htmlFor 代替 for

-   样式

> style 接受 JavaScript 对象，样式属性名写法为驼峰式命名

```
<div style={{ backgroundColor: 'red' }} />
```

-   根元素

> JSX 最终会被转译成 JavaScript 函数,因为不能同时返回两个函数，所以 JSX 只能有一个根元素包裹

-   空格

> DOM 换行不会被解析成空格，需要显示插入空格 {' '}

-   布尔值属性

> 如果一个属性没有赋值，那么其默认值为 true

```
<button disabled />
=>
React.createElement("button", { disabled: true });
```

#### 2.1.7 展开属性

> 来源于 ECMAScript 提案中的对象剩余/展开属性，该特性可以非常方便地为元素传递 JavaScript 对象的全部属性

**向子元素传递数据时，不要以引用方式传递，提倡传值方式**

用法如下

```
const foo = { id: 'bar' }
return <div {...foo} />
```

#### 2.1.8 JavaScript 模板

> 将模板移到组件内部而不用外部模板库可以利用 JavaScript 的完整功能,如展开属性、用花括号封装 JavaScript 表达式

#### 2.1.9 常见模式

-   多行书写

```
<div>
    <Header />
    <div>
        <Main content={...} />
    </div>
</div>
```

-   多个属性的书写

> 常见的解决方案是一行书写一个属性，同时缩进一个层级，并保持结尾括号和开始标签对齐

```
<button
    foo="bar"
    veryLongPropertyName="baz"
    onSomething={this.handleSomething}
/>
```

-   条件语句

```
<div>
    {isLoggedIn && <LoginButton />}
</div>

// 三元条件运算
<div>
    {isLoggedIn ? <LogoutButton /> : <LoginButton />}
</div>

// 复杂判断 使用getter函数或普通函数
get canShowSecretData() {
    const { dataIsReady, isAdmin, userHasPermissions } = this.props
    return dataIsReady && (isAdmin || userHasPermissions)
}

<div>
    {this.canShowSecretData && <SecretData />}
</div>
```

也可以引入外部依赖库 render-if

```
npm install --save render-if

const { dataIsReady, isAdmin, userHasPermissions } = this.props
const canShowSecretData = renderIf(
    dataIsReady && (isAdmin || userHasPermissions)
)

<div>
    {canShowSecretData(<SecretData />)}
</div>
```

另一个工具库 react-only-if

```
npm install --save react-only-if

const SecretDataOnlyIf = onlyIf(
 ({ dataIsReady, isAdmin, userHasPermissions }) => {
    return dataIsReady && (isAdmin || userHasPermissions)
 })(SecretData)

<div>
    <SecretDataOnlyIf
        dataIsReady={...}
        isAdmin={...}
        userHasPermissions={...}
    />
</div>
```

-   循环

```
<ul>
    {users.map(user =><li>{user.name}</li>)}
</ul>
```

-   控制语句

> 使用 Babel 插件 jsx-control-statements 可以提高代码的可读性

```
npm install --save jsx-control-statements
```

在.babelrc 中加入插件列表

```
"plugins": ["jsx-control-statements"]
```

使用方式

```
<If condition={this.canShowSecretData}>
    <SecretData />
</If>
```

循环中使用

```
<ul>
    <For each="user" of={this.props.users}>
        <li>{user.name}</li>
    </For>
</ul>
```

-   次级渲染

> 代码量多到难以维护时，可以将其拆分成更小的方法，同时又将所有逻辑都保留在原有组件内部

```
renderUserMenu() {
    // JSX用于用户菜单
}

renderAdminMenu() {
    // JSX用于管理员菜单
}

render() {
    return (
        <div>
            <h1>Welcome back!</h1>
            {this.userExists && this.renderUserMenu()}
            {this.userIsAdmin && this.renderAdminMenu()}
        </div>
    )
}
```

> 这种方案并不总是可以当作最佳实践，因为显然拆分组件的做法更好。有时这样做只是为了保持渲染方法简洁

### 2.2 ESLint

> 可以帮助我们在输入过程中检查代码的正确性,避免语法错误  
> linter 不仅能帮助我们更少犯错，或者至少更早发现错误，它还能强制推行一些常见的编程风格指南

#### 2.2.1 安装

```
npm install --global eslint

eslint source.js
```

#### 2.2.2 配置

根目录创建.eslintrc 配置 rules

```
{
    "rules": {
        "semi": [2, "never"]
    }
}
```

> "semi"是规则名，[2, "never"]是规则的值

ESLint 规则具有决定问题严重程度的三个等级：

-   off（或者 0）：禁用规则
-   warn（或者 1）：规则会产生警告
-   error（或者 2）：规则会抛出错误

#### 2.2.3 React 插件

ESLint 支持使用插件进行扩展

```
npm install --global eslint-plugin-react
```

配置中加入插件列表

```
"plugins": ["react"]
```

可以使用 extends 加入默认配置项

```
"extends": [
    "eslint:recommended",
    "plugin:react/recommended"
]
```

## 3、开发真正可复用的组件

## 4、组合一切

## 5、恰当地获取数据

## 6、为浏览器编写代码

## 7、美化组件

## 8、服务单渲染的乐趣与益处

## 9、提升应用性能

## 10、测试与调试

## 11、需要避免的反模式

## 12、未来的行动
