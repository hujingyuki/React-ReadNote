# React 设计模式与最佳实践

## 1、React 基础

<details>
    
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

</details>

## 2、整理代码

<details>

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

#### 2.2.4 Airbnb 的配置

> React 领域最流行的配置之一莫过于 Airbnb 的那一套。Airbnb 的开发者按照 React 的最佳实践创建了一套规则集，你可以直接在代码库中使用，无须自己手动判断启用哪条规则

```
npm install --global eslint-config-airbnbeslint@^2.9.0 eslint-plugin-jsx-a11y@^1.2.0 eslint-plugin-import@^1.7.0 eslint-plugin-react@^5.0.1

// .eslintrc中配置
{
    "extends": "airbnb"
}
```

### 2.3 函数式编程基础

> 函数式编程是一种声明式范式，能够避免代码副作用，同时它推崇数据不可变，以便更易维护和考量代码

#### 2.3.1 一等对象

-   一等对象：可以赋给变量，也可以作为参数传递给其他函数
-   高阶函数：接受一个函数作为参数，也可以传入其他参数，最后返回另一个函数

```
const add = (x, y) => x + y
const log = func => (...args) => {
    console.log(...args)
    return func(...args)
}
const logAdd = log(add)
```

#### 2.3.2 纯粹性

> 纯函数是指它不产生副作用，也就是说它不会改变自身作用域以外的任何东西。
> 每次输入都能得到相同的输出

```
const add = (x, y) => x + y
```

非纯函数如下（改变了全局变量）

```
let x = 0
const add = y => (x = x + y)
```

#### 2.3.3 不可变性

> 不可变性: 在函数式编程中，函数不会修改变量值，而是创建新的变量，赋新值后再返回变量

```
const add3 = arr => arr.concat(3)
const myArr = [1, 2]
const result1 = add3(myArr) // [1, 2, 3]
const result2 = add3(myArr) // [1, 2, 3]
```

#### 2.3.4 柯里化

> 柯里化过程就是将多参数函数转换成单参数函数，这些单参数函数的返回值也是函数

```
const add = x => y => x + y

const add1 = add(1)
add1(2) // 3
add1(3) // 4
```

#### 2.3.5 组合

> 函数（和组件）可以结合产生新函数，从而提供更高级的功能与属性

```
const add = (x, y) => x + y
const square = x => x * x
// 组合后
const addAndSquare = (x, y) => square(add(x, y))
```

#### 2.3.6 函数式编程与 UI

> 将创建 UI 的组件看作传入应用状态的函数，组件可以组合形成最后的 UI

</details>

## 3、开发真正可复用的组件

<details>

### 3.1 创建类

#### 3.1.1 createClass 工厂方法

```
const Button = React.createClass({
    render() {
        return <button />
    }
})
```

#### 3.1.2 继承 React.Component

```
const Button = React.Component({
    render() {
        return <button />
    }
})
```

#### 3.1.3 主要区别

-   prop 参数接受方式

```
// 1、createClass
const Button = React.createClass({
    propTypes: {
        text: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            text: 'Click me!'
        }
    }
    render() {
        return <button>{this.props.text}</button>
    }
})

// 2、Component
class Button extends React.Component {
    render() {
        return <button>{this.props.text}</button>
    }
}　

Button.propTypes = {
    text: React.PropTypes.string
}　

Button.defaultProps = {  text: 'Click me!'}
```

> 因为类属性仍处于草案阶段，所以若想定义类的属性，则需要在创建类之后再写入属性(babel 插件支持)

使用类的好处在于，只需要在 JavaScript 对象上定义属性，无须使用 getDefaultProps 这种 React 特有的函数

-   状态

```
// 1、createClass
const Button = React.createClass({
    getInitialState() {
        return {
            text: 'Click me!'
        }
    }

    render() {
        return <button>{this.state.text}</button>
    }
})

// 2、Component
class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'Click me!'
        }
    }

    render() {
        return <button>{this.state.text}</button>
    }
}
```

> 在 ES2015 中，若想在子类中使用 this，必须先调用 super 方法.React 还会将 props 对象传给父组件。

使用类的好处与前面所说的一样，即无须使用 React 特有的 API，直接在实例上定义属性

-   自动绑定

createClass 允许我们创建事件处理器，并且当调用事件处理器时，`this`会指向组件本身

```
const Button = React.createClass({
    handleClick() {
        console.log(this)
    }

    render() {
        return <button onClick={this.handleClick} />
    }
})
```

> 解决 Component 函数绑定问题的最佳方案是在构造器内进行绑定操作，这样即使多次渲染组件，它也不会发生任何改变

```
class Button extends React.Component {
    constructor(props) {
        super(props)　
        this.handleClick = this.handleClick.bind(this)
    }　

    handleClick() {
        console.log(this)
    }　

    render() {
        return <button onClick={this.handleClick} />
    }
}
```

另一种方式可以将 handleClick 使用箭头函数命名

```
handleClick = () => {
    console.log(this)
}
```

#### 3.1.4 　无状态函数式组件

```
() => <button />
```

### 3.2 状态

#### 3.2.1 外部库

常用的外部库: `redux` 和 `mobx`

#### 3.2.2 工作原理

> 每个有状态的 React 应用都可以拥有初始状态

-   在组件的生命周期中，可以使用生命周期方法或者事件处理器中的 setState 多次修改状态。当状态发生变化时，React 就用新状态渲染组件
-   将任意函数作为 setState 的第二个参数传递，状态更新完成时会触发该函数，同时组件完成渲染

#### 3.2.3 　异步

> setState 方法是异步的

发生这种情况的原因在于 React 知道如何优化事件处理器内部的状态更新，并进行批处理，以获得更好的性能。

React 无法优化执行过程，只能尝试尽快更新状态:

```
handleClick() {
    setTimeout(() => {
        this.setState({
            clicked: true,
        })　
        console.log('the state is now', this.state)
    })
}
```

结果将是：the state is now Object {clicked: true}

#### 3.2.4 　 React lumberjack

引入 react-lumberjack 包后可以调试应用的某个特殊状态

```
// 回退并撤销状态的改变
Lumberjack.back()
// 前进并重新应用状态的改变
Lumberjack.forward()
```

#### 3.2.5 　使用状态

> 应该牢记只能将满足需求的最少数据放到状态中

在以下场景下应该避免使用状态

-   可派生的值

    > 只要能根据 props 计算最终值，就不应该将任何数据保存在状态中

-   渲染方法
    > 始终牢记，设置状态会触发组件重新渲染。因此，应该只将渲染方法要用到的值保存在状态中

![image](https://cdn.cnbj1.fds.api.mi-img.com/book/images/8efef8c34898bff17c9b92a6f5c93fcb?thumb=1&w=512&h=512)

### 3.3 prop 类型

> 为了开发真正可复用的组件，需要尽可能清晰地定义组件接口

```
const Button = ({ text }) => <button>{text}</button>　

Button.propTypes = {
    text: React.PropTypes.string.isRequired
}
```

React 提供了多种开箱即用的验证器：从数组到数字类型，再到组件类型.某些情况下不可避免地要传递对象，此时需要用模型来定义 propType。模型函数允许我们声明包含嵌套属性的对象，并为每个属性定义类型。

```
const Profile = ({ user }) =>(
<div>{user.name} {user.surname}</div>
)　

Profile.propTypes = {
    user: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        surname: React.PropTypes.string,
    }).isRequired
}

```

如果 React 现有的 propTypes 无法满足需求，那么我们可以创建自定义函数来验证属性

```
user: React.PropTypes.shape({
    age: (props, propName) => {
        if (!(props[propName] > 0 && props[propName] < 100)) {
            return new Error(`${propName} must be between 1 and 99`)
        }
        return null
    }
})
```

-   React Docgen 插件可以读取组件并生成文档形式

### 3.4 可复用组件

```
class PostList extends React.Component {
    constructor(props) {
        super(props)　
        this.state = {
            posts: [],
        }
    }

    const List = ({ collection, textKey, titleKey }) => (
        <ul>
            {collection.map(item =>
                <Item
                    key={item.id}
                    text={item[textKey]}
                    title={item[titleKey]}
                />
            )}
        </ul>
    )

    List.propTypes = {
        collection: React.PropTypes.array,
        textKey: React.PropTypes.string,
        titleKey: React.PropTypes.string
    }

    const Item = ({ text, title }) => (
        <li>
            <h1>{title}</h1>
            {text && <p>{text}</p>}
        </li>
    )　

    Item.propTypes = {
        text: React.PropTypes.string,
        title: React.PropTypes.string
    }

    const UserList = ({ users }) => (
        <List
            collection={users}
            textKey="bio"
            titleKey="username"
        />
    )

    render() {
        return (
            <List
                collection={this.state.posts}
                textKey="excerpt"
                titleKey="title"
            />
        )
    }
}
```

### 3.5 　可用的风格指南

> 创建接受清晰的 prop 并与数据解耦的简洁组件是与团队其他成员共享基础组件库的最佳方式。

`React Storybook`插件分离了组件，因此无须运行整个应用就能渲染单个组件，以上文 list 为例

```
npm install --save @kadira/react-storybook-addon

import { storiesOf } from '@kadira/storybook'

storiesOf('List', module)
    .add('without text field', () => (
        <List collection={posts} titleKey="title" />
    ))

// 先在应用的根文件夹下创建.storybook文件夹。
// 然后在.storybook文件夹下创建config.js文件来加载故事文档：

import { configure } from '@kadira/storybook'　

function loadStories() {
    require('../src/stories/list')
}　

configure(loadStories, module)

// 从库中导入配置函数，然后定义另一个函数按照每条故事文档的路径加载它们。接着将该函数传给配置函数

"storybook": "start-storybook -p 9001"
```

</details>

## 4、组合一切

<details>

### 4.1 组件间的通信

> children 是一个特殊的 prop，拥有者组件可以将它传递给渲染方法内定义的组件

```
const Button = ({ children }) => (
    <button className="btn">{children}</button>
)　

Button.propTypes = {
    children: React.PropTypes.array
}
```

Button 组件就不再局限于简单的单个文本属性了，现在我们可以将任何元素传递给它，然后在 children 属性的位置上渲染出来

### 4.2 容器组件与表现组件模式

> React 组件通常包含杂合在一起的逻辑与表现。逻辑一般指与 UI 无关的那些东西，如 API 的调用、数据操作以及事件处理器。表现则是指渲染方法中创建元素用来显示 UI 的部分

按照`容器组件`与`表现组件`的模式创建组件可以帮助我们分离上述两个关注点

我们在组件文件夹下创建 geolocation.js 并定义 Geolocation 组件

```
class Geolocation extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            latitude: null,
            longitude: null
        }　

        this.handleSuccess = this.handleSuccess.bind(this)
    }

    componentDidMount() {
        if (navigator.geolocation) {                     navigator.geolocation.getCurrentPosition(this.handleSuccess)
        }
    }

    handleSuccess({ coords }) {
        this.setState({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    render() {
        return (
            <div>
                <div>Latitude: {this.state.latitude}</div>
                <div>Longitude: {this.state.longitude}</div>
            </div>
        )
    }

}
```

我们将逻辑处理放在 container 容器组件中，表现组件靠传入的 prop 渲染

```
// 容器组件
class GeolocationContainer extends React.Component{
    render() {
        return (
            <Geolocation {...this.state} />
        )
    }
}

// 表现组件
const Geolocation = ({ latitude, longitude }) => (
    <div>
        <div>Latitude: {latitude}</div>
        <div>Longitude: {longitude}</div>
    </div>
)

Geolocation.propTypes = {
    latitude: React.PropTypes.number,
    longitude: React.PropTypes.number
}
```

**容器组件**

-   更关心行为部分；
-   负责渲染对应的表现组件；
-   发起 API 请求并操作数据；
-   定义事件处理器；
-   写作类的形式。

**表现组件**

-   更关心视觉表现；
-   负责渲染 HTML 标记（或其他组件）；
-   以 props 的形式从父组件接收数据；
-   通常写作无状态函数式组件。

### 4.3 mixin

> 当需要在不同组件间共享功能时，可以使用 mixin

**mixin 只能和`createClass`工厂方法搭配使用，因此如果你用的是类，那么就不能使用 mixin，这也正是不推荐使用它们的原因之一**

```
const WindowResize = {...}

getInitialState() {
    return {
        innerWidth: window.innerWidth
    }
}

componentDidMount() {
    window.addEventListener('resize', this.handleResize)
}

componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
}

handleResize() {
    this.setState({
        innerWidth: window.innerWidth
    })
}
```

在组件中使用

```
const MyComponent = React.createClass({　
    mixins: [WindowResize],　
    render() {
        console.log('window.innerWidth', this.state.innerWidth)
    }
})
```

> mixin 具有一项很棒的特性，这个特性允许它们合并生命周期方法和初始状态

**存在的问题**

-   可维护性差
-   可能存在**冲突**
-   mixin 间的耦合导致组件重构和应用扩展变得非常困难

### 4.4 高阶组件

> 当高阶函数概念应用在组件上时，我们将它简称为高阶组件。

```
const HoC = Component => EnhancedComponent

const withClassName = Component => props => (
    <Component {...props} className="my-class" />
)

const MyComponent = ({ className }) => (
    <div className={className} />
)

MyComponent.propTypes = {
    className: React.PropTypes.string
}

const MyComponentWithClassName = withClassName(MyComponent)

// 使用高阶函数实现mixin

const withInnerWidth = Component => (
    class extends React.Component {
        constructor(props) {
            super(props)　
            this.state = {
                innerWidth: window.innerWidth
            }　
            this.handleResize = this.handleResize.bind(this)
        }

        componentDidMount() {
            window.addEventListener('resize', this.handleResize)
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize)
        }

        handleResize() {
            this.setState({
                innerWidth: window.innerWidth
            })
        }

        render() {
            return <Component {...this.props} {...this.state} />
        }
    }
)

const MyComponent = ({ innerWidth }) => {
    console.log('window.innerWidth', innerWidth)
}

MyComponent.propTypes = {
    innerWidth: React.PropTypes.number
}

const MyComponentWithInnerWidth = withInnerWidth(MyComponent)
```

优点：

-   没有污染任何状态
-   不需要组件来实现任何方法

### 4.5 recompose

> recompose 提供了许多有用的高阶组件，而且可以优雅地`组合`它们

```
const Profile = ({ username, age }) => (
    <div>
        <div>Username: {username}</div>
        <div>Age: {age}</div>
    </div>
)　

Profile.propTypes = {
    username: React.PropTypes.string,
    age: React.PropTypes.number
}

// 然后用高阶组件进行增强：
const ProfileWithFlattenUser = flattenProp('user')(Profile)

// compose 可以将多个高阶组件传给该函数，最终会得到单个增强后的高阶组件
const enhance = compose(
    flattenProp('user'),
    renameProp('username', 'name'),
    withInnerWidth
)

const EnhancedProfile = enhance(Profile)
```

compose 可以将多个高阶组件传给该函数，最终会得到单个增强后的高阶组件，大大提升了代码可读性。

> 不要滥用高阶组件，因为每层抽象都会带来一些问题(`性能问题`）。

**`context`**

> 高阶组件可以很方便地处理 context，建议谨慎使用 context，因为它仍处于试验阶段，未来可能会改变。

context 的最广泛用法就是将通用配置从根节点向下传递到叶节点

```
const Price = ({ value }, { currency }) => (
    <div>{currency}{value}</div>
)

Price.propTypes = {
    value: React.PropTypes.number
}　

Price.contextTypes = {
    currency: React.PropTypes.string
}
```

修改后

```
const Price = ({ currency, value }) => (
    <div>{currency}{value}</div>
)　

Price.propTypes = {
    currency: React.PropTypes.string,
    value: React.PropTypes.number
}

// 再次用到偏函数写法对高阶组件进行特殊化处理，然后多次复用它
const withCurrency = getContext({
    currency: React.PropTypes.string
})

const PriceWithCurrency = withCurrency(Price)
```

这样我们不需要修改父组件，还可以利用 context 特性且无须担心 API 未来会发生变化，而且 Price 组件也实现了可复用性

### 4.6 函数子组件

> 函数子组件模式：不按组件的形式传递子组件，而是定义一个可以从父组件接收参数的函数

```
const FunctionAsChild = ({ children }) => children()　

FunctionAsChild.propTypes = {
    children: React.PropTypes.func.isRequired
}

// 用法
<FunctionAsChild>
    {() => <div>Hello, World!</div>}
</FunctionAsChild>
```

父组件向子组件传递参数

```
const Name = ({ children }) => children('World')　

Name.propTypes = {
    children: React.PropTypes.func.isRequired
}

// 上述组件的用法如下所示：
<Name>
    {name => <div>Hello, {name}!</div>}
</Name>
```

优点：

-   可以像高阶组件那样封装组件，在运行时为它们传递变量而不是固定属性
-   不要求 children 函数使用预定义的 prop 名称
-   封装器的可复用程度很高，因为它不关心子组件要接收什么，只期望传入一个函数

</details>

## 5、恰当地获取数据

<details>

### 5.1 　数据流

> 单向数据流允许数据从根节点流向叶节点,它简化了组件行为以及组件间的关系，增强了代码的可预测性和可维护性

创建一个 counter 类

```
class Counter extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            counter: 0
        }　
        this.handleDecrement = this.handleDecrement.bind(this)
        this.handleIncrement = this.handleIncrement.bind(this)
    }

    handleDecrement() {
        this.setState({
            counter: this.state.counter - 1
        })
    }　

    handleIncrement() {
        this.setState({
            counter: this.state.counter
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleDecrement}>-</button>
                <button onClick={this.handleIncrement}>+</button>
            </div>
        )
    }
}
```

#### 5.1.1 　子组件与父组件的通信（回调函数）

Counter 组件职责：

-   将计数器的值保存在状态中
-   负责显示数据
-   包含增加和减少计数器值的逻辑

组件化，先创建 button 组件

```
const Buttons = ({ onDecrement, onIncrement }) => (
    <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
    </div>
)　

Buttons.propTypes = {
    onDecrement: React.PropTypes.func,
    onIncrement: React.PropTypes.func
}

// 新组件替换原有标记即可
render() {
    return (
        <div>
            <h1>{this.state.counter}</h1>
            <Buttons
                onDecrement={this.handleDecrement}
                onIncrement={this.handleIncrement}
            />
        </div>
    )
}
```

每当子组件需要向父组件推送数据或者通知父组件发生了某个事件时，可以传递回调函数，同时将其余逻辑放在父组件中

#### 5.1.2 　公有父组件

创建一个 Display 组件来接收所需的值并在屏幕上显示

```
onst Display = ({ counter }) => <h1>{counter}</h1>　

Display.propTypes = {
    counter: React.PropTypes.number
}

// 用Display组件替换旧标记
render() {
    return (
        <div>
            <Display counter={this.state.counter} />
            <Buttons
                onDecrement={this.handleDecrement}
                onIncrement={this.handleIncrement}
            />
        </div>
    )
}
```

Buttons 组件会通知父组件，然后父组件会将更新后的值发送给 Display 组件。这种模式在 React 中很常见，而且它可以有效地在没有直接联系的组件间共享数据

> 数据始终从父组件流向子组件，但子组件可以发送通知给父组件，以便组件树按照新的数据重新渲染

### 5.2 　数据获取

我们创建一个简单的 gists 列表

```
class Gists extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            gists: []
        }
    }

    componentDidMount() {
        fetch('https://api.github.com/users/gaearon/gists')
            .then(response => response.json())
            .then(gists => this.setState({ gists }))
    }

    render() {
        return (
            <ul>
                {this.state.gists.map(gist => (
                    <li key={gist.id}>{gist.description}</li>
                ))}
            </ul>
        )
    }
}
```

高阶组件实现

```
const withData = url => Component => (
    class extends React.Component{
        constructor(props) {
            super(props)　
            this.state = {
                data: []
            }
        }

        componentDidMount() {
            fetch(url)
                .then(response => response.json())
                .then(data => this.setState({ data }))
        }

        render() {
            return <Component {...this.props} {...this.state} />
        }
    }
)

const List = ({ data: gists }) => (
    <ul>
        {gists.map(gist => (
            <li key={gist.id}>{gist.description}</li>
        ))}
    </ul>
)　

List.propTypes = {
    data: React.PropTypes.array
}

const withGists = withData('https://api.github.com/users/gaearon/gists')
```

`动态加载url`

> 修改高阶组件，让它接受两种类型的 URL 参数：一种是当前实现的字符串类型，另一种是函数，它接受组件的 prop 并根据传入的参数返回 URL

```
componentDidMount() {
    const endpoint = typeof url === 'function' ? url(this.props) : url　  fetch(endpoint)
        .then(response => response.json())
        .then(data => this.setState({ data }))
}

const withGists = withData(
    props => `https://api.github.com/users/${props.username}/gists`
)

<ListWithGists username="gaearon" />
```

### 5.3 　 react-refetch

**使用 react-refetch 有效地替换高阶组件**

```
npm install react-refetch --save
// 接着导入该模块的connect函数：
import { connect } from 'react-refetch'

const connectWithGists = connect(({ username }) => ({
    gists: `https://api.github.com/users/${username}/gists`
}))

const ListWithGists = connectWithGists(List)
```

react-refetch 库注入的属性与我们在 connect 函数中指定的键同名

```
// gists是一个promise对象，拥有pending和fulfilled、rejected状态
const List = ({ gists }) => (
    gists.fulfilled && (
        <ul>
            {gists.value.map(gist => (
                <li key={gist.id}>{gist.description}</li>
            ))}
        </ul>
    )
)
```

为链接加星

```
const List = ({ gists }) => (
    gists.fulfilled && (
        <ul>
            {gists.value.map(gist => (
               Gist key={gist.id} {...gist} />
            ))}
        </ul>
    )
)

const Gist = ({ description }) => (
    <li>
        {description}
        <button>+1</button>
    </li>
)

Gist.propTypes = {
    description: React.PropTypes.string
}


const token = 'access_token=123'　
const connectWithStar = connect(({ id }) => ({
    star: () => ({
        starResponse: {
            url: `https://api.github.com/gists/${id}/star?${token}`,
            method: 'PUT'
        }
    })
}))

const GistWithStar = connectWithStar(Gist)

const Gist = ({ description, star }) => (
    <li>
        {description}
        <button onClick={star}>+1</button>
    </li>
)　

Gist.propTypes = {
    description: React.PropTypes.string，
    star: React.PropTypes.func
}
```

</details>

## 6、为浏览器编写代码

<details>

### 6.1 表单

#### 6.1.1 自由组件

> 不设置状态值，让组件内部自己管理状态

简单示例

```
const Uncontrolled = () => (
    <form>
        <input type="text" />
        <button>Submit</button>
    </form>
)
```

增加监听函数

```
class Uncontrolled extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            value: ''
        }　
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange({ target }) {
        this.setState({
            value: target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()　
        console.log(this.state.value)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} />      <button>Submit</button>
            </form>
        )
    }
}
```

处理多个输入框

```
class Uncontrolled extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            firstName: ''，
            lastName: ''
        }　
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()　
        console.log(`${this.state.firstName} ${this.state.lastName}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    onChange={this.handleChange}
                />
                <button>Submit</button>
            </form>
        )
    }
}
```

#### 6.1.2 受控组件

> 受控组件使我们完全掌控表单元素的值。

```
class Controlled extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            firstName: 'Dan'，
            lastName: 'John'
        }　
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()　
        console.log(`${this.state.firstName} ${this.state.lastName}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                <button>Submit</button>
            </form>
        )
    }
}
```

#### 6.1.3 JSON schema

> 接下来使用 react-jsonschema-form 库自动创建表单

```
npm install --save react-jsonschema-form

import Form from 'react-jsonschema-form'

const schema = {
    type: 'object',
    properties: {
        firstName: { type: 'string', default: 'Dan' },
        lastName: { type: 'string', default: 'Abramov' }
    }
}

const JSONSchemaForm = () => (
    <Form schema={schema} />
)
```

增加处理事件

```
class JSONSchemaForm extends React.Component{
    constructor(props) {
        super(props)　
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit({ formData }) {
        console.log(formData)
    }

    render() {
        return (
            <Form schema={schema} onSubmit={this.handleSubmit} />
        )
    }
}
```

#### 6.2 事件

> react 引入**合成事件**，让其在不同的浏览器中都有相同的属性

```
class Button extends React.Component{
    constructor(props) {
        super(props)　
        this.handleClick =this.handleClick.bind(this)
    }

    handleClick(syntheticEvent) {
        console.log(syntheticEvent instanceof MouseEvent)  console.log(syntheticEvent.nativeEvent instanceof MouseEvent)
    }

    render() {
        return (
            <button onClick={this.handleClick}>Click me!</button>
        )
    }
}
```

通用的事件处理器

```
class Button extends React.Component{
    constructor(props) {
        super(props)　
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent(event) {
        switch (event.type) {
            case 'click':
                console.log('clicked')
                break　
            case 'dblclick':
                console.log('double clicked')
                break　
            default:
                console.log('unhandled', event.type)
        }
    }

    render() {
        return (
            <button
                onClick={this.handleEvent}
                onDoubleClick={this.handleEvent}
            >
                Click me!
            </button>
        )
    }
}
```

合成事件会被回收(不能保存事件稍后再用，操作完成后会变为 null)，并且存在**唯一的全局处理器**

> React 利用**事件冒泡机制**在根元素上添加单个事件处理器，**代理**子元素的事件处理，可以优化内存和速度。

#### 6.3 ref

> 应该尽量避免访问底层 DOM 节点

场景:监听按钮的点击事件，使输入框获得焦点

```
class Focus extends React.Component{
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.element.focus()
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    ref={element => (this.element = element)}
                />
                <button onClick={this.handleClick}>Focus</button>
            </form>
        )
    }
}
```

这个回调函数会在组件挂载时被调用，元素参数表示输入的 DOM 实例。卸载组件时也会调用这个回调，并传入 null 参数来释放内存。

> 设置自定义组件的 ref 回调时，接收到的回调参数引用是**组件本身的实例**

#### 6.4 动画

> 本节目的是提供 React 组件最常用的动画解决方案

react-addons-css-transition-group 插件使用

```
npm install --save react-addons-css-transition-group

import CSSTransitionGroup from 'react-addons-css-transition-group'

const Transition = () => (
    <CSSTransitionGroup
        transitionName="fade"
        transitionAppear
        transitionAppearTimeout={500}
    >
        <h1>Hello React</h1>
    </CSSTransitionGroup>
)

// css
.fade-appear {
    opacity: 0.01;
}

.fade-appear.fade-appear-active {
    opacity: 1;
    transition: opacity .5s ease-in;
}
```

react-motion 实现

```
npm install --save react-motion

import { Motion, spring } from 'react-motion'

const Transition = () => (
    <Motion
        defaultStyle={{ opacity: 0.01 }}
        style={{ opacity: spring(1) }}
    >
        {interpolatingStyle => (
            <h1 style={interpolatingStyle}>Hello React</h1>
        )}
    </Motion>
)
```

#### 6.5 可扩展矢量图形

**可扩展矢量图形**（scalable vector graphic，SVG）可以用于在浏览器中绘制图标和图形

```
const Circle = ({ x, y, radius, fill }) => (
    <svg>
        <circle cx={x} cy={y} r={radius} fill={fill} />
    </svg>
)

Circle.propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    radius: React.PropTypes.number,
    fill: React.PropTypes.string
}

// 使用方式
<Circle x={20} y={20} radius={20} fill="blue" />

Circle.defaultProps = {
    fill: 'red'
}

// 自行封装
const RedCircle = ({ x, y, radius }) => (
    <Circle x={x} y={y} radius={radius} fill="red" />
)

RedCircle.propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    radius: React.PropTypes.number
}
```

</details>

## 7、美化组件

<details>

### 7.1 CSS in JavaScript

CSS 的主要问题

![image](https://cdn.cnbj1.fds.api.mi-img.com/book/images/321fd2d58c8d897f522a2a56405e0b86?thumb=1&w=512&h=512)

结论是：为了解决 Facebook 在使用大型 CSS 代码库时遇到的所有问题，可以采用**行内样式**

### 7.2 行内样式

> React 官方文档推荐开发者在 React 组件上使用行内样式。

行内样式书写规则

-   属性名为 CSS 规则名
-   属性值必须是字符串
-   连字符的 CSS 规则名必须采用驼峰式
-   厂商前缀必须以大写字母开头，ms 前缀要小写
-   属性值为数字值时，可以不带引号或度量单位，默认是 px

**优点：** 可以很好的与逻辑进行交互

**缺点：**

-   不能使用伪选择器和伪元素
-   不能使用媒体查询
-   不能使用样式回退
-   不能 CSS 动画属性
-   覆盖常规属性时只能使用 important
-   调试困难
-   如果使用服务端渲染应用，行内样式会使页面体积变大

### 7.3 Radium

> Radium 函数是一个高阶组件,其工作原理就是为触发伪类行为的每个事件添加事件处理器，并监听这些事件

```
npm install --save radium

import radium,  { StyleRoot }  from 'radium'　

const styles = {
    backgroundColor: '#ff0000',
    width: 320,
    padding: 20,
    borderRadius: 5,
    border: 'none',
    outline: 'none',
    ':hover': {
        color: '#fff'
    },
    ':active': {
        position: 'relative',
        top: 2
    },
    '@media (max-width: 480px)': {
        width: 160
    },
}

const Button = () => <button style={styles>>Click me!</button>

export default radium(Button)

// 使用媒体查询时需要引入StyleRoot对元素进行包裹
class App extends Component {
    render() {
        return (
            <StyleRoot>
                {Button()}
            </StyleRoot>
        )
    }
}
```

### 7.4 CSS 模块

#### 7.4.1 Webpack

> Webpack 模块打包器十分流行，它的工作就是将应用的所有依赖加载到单个打包文件中，以便于在浏览器中运行

理论上只要有对应的**加载器**就可以加载除 JavaScript 以外的任何依赖。比如 JSON 文件、图片以及其他资源、还能打包导入 CSS

#### 7.4.2 搭建项目

```
// 新建一个空文件夹
npm init
// 生成package.json

// 安装webpack插件依赖
npm install --save-dev webpack webpack-dev-server webpack-cli
// 安装Babel及其加载器
npm install --save-dev babel-loader@7.0 babel-core babel-preset-es2015 babel-preset-react

// 安装css加载器
npm install --save-dev style-loader css-loader

npm install --save-dev html-webpack-plugin

npm install --save react react-dom

// package.json中加入以下脚本
"scripts": {
    "start": "webpack-dev-server"
}
```

新建一个`webpack.config.js`文件

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.js',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
```

`npm run start`启动项目

#### 7.4.3 局部作用域的 CSS

新建 index.js 和 index.css 文件

```
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './index.css'

const Button = () => <button className={styles.button}>Click me!</button>

ReactDOM.render(<Button />, document.body)

// index.css
.button {
  background-color: #ff0000;
  width: 320px;
  padding: 20px;
  border-radius: 5px;
  border: none;
  outline: none;
}

.button:hover {
  color: #fff;
}

.button:active {
  position: relative;
  top: 2px;
}

@media (max-width: 480px) {
  .button {
    width: 160px
  }
}
```

css 模块特性

-   **global** 给任何类添加:global 前缀，意味着请求 CSS 模块不要为当前选择器加上局部作用域。
-   **组合** 可以从同个文件或者外部依赖中引用类名，将其他类的所有样式应用于一个元素。

```
.background-red {
    background-color: #ff0000;
}

.button {
    composes: background-red; // 看这里
    width: 320px;
}
```

#### 7.4.4 原子级 CSS 模块

> 原子级 CSS 是 CSS 的一种使用方式，即每个类只有一条规则

这种方式很高效，但会导致标记上有太多类，很难预测结果

**原子级 CSS 模块** 是指用 CSS 模块来解决原子级 CSS 的问题。

```
.title {
    composes: mb0 fw6;
}

<h2 className={styles.title}>Hello React</h2>
```

#### 7.4.5 React CSS 模块

使用第三方包来更好的使用 CSS 模块

```
npm install --save react-css-modules

import cssModules from 'react-css-modules'

const EnhancedButton = cssModules(Button, styles)

// styleName会被转化成字符串形式的类名
const Button = () => <button styleName="button">Click me!</button>
```

### 7.5 Styled Component

> 用现代手段解决组件样式问题，并在 React 中运用了 ES2015 的最新特性和其他高级技巧，实现了完善的样式方案

需要用到 ES2015 的**标签模板字面量**特性，它可以向函数传递未经插值的模板字符串

它支持所有 CSS 特性，伪类，伪元素、媒体查询等等

```
npm install --save styled-components

import styled from 'styled-components'

const Button = styled.button`
    background-color: #ff0000;
    width: 320px;
    padding: 20px;
    border-radius: 5px;
    border: none;
    outline: none;
    &:hover {
        color: #fff;
    }
    &:active {
        position: relative;
        top: 2px;
    }
    @media (max-width: 480px) {
        width: 160px;
    }
`
```

优点

-   很方便的覆盖其样式
-   可以设置不同属性来多次复用该组件
-   还可以接受 props 更改样式
-   拥有**主题**

</details>

## 8、服务端渲染的乐趣与益处

<details>

**通用应用**更有利于搜索引擎优化（SEO），能显著提升 Web 应用的感知速度，有助于提升用户转化率

### 8.1 通用应用

React 在服务端渲染相同的组件称作 **服务端渲染** （server-side rendering，SSR）

**同构应用** 就是指应用在服务端和客户端看起来一模一样

**通用应用** 是指应用的代码可以同时用于服务端和客户端

### 8.2 使用服务端渲染的原因

#### 8.2.1 SEO

-   为方便主流搜索引擎的爬虫
-   如果分别维护服务端代码供爬虫用、客户端供用户所用难度较大，且不够灵活
-   避免分享空壳 HTML

#### 8.2.2 通用代码库

-   在客户端和服务端共享逻辑后，变更操作会变得更简单，不必再重复工作，错误和问题也大大减少
-   在服务端引入 JavaScript 可以让前后端开发人员共享知识
-   两端复用代码能够使合作变得更加方便，整个团队采用同种语言也有利于快速决策和修改

#### 8.2.3 性能更强

比起服务端托管的只有空的 HTML 和 script 标签，服务端渲染网站能让用户在访问页面时就能看到部分内容，从而增加留下来的可能性

> 可以用服务端渲染极大地提升感知性能，因为我们可以在服务端输出组件并直接为用户返回一些信息

#### 8.2.4 不要低估复杂度

-   搭建和维护带有路由和逻辑的服务器、管理服务端数据流等
-   可能需要缓存服务器内容，以便更快地输出页面
-   维护功能完整的通用应用还有许多其他任务要完成

> 建议先开发客户端版本，还有当 Web 应用能良好运行时，才应该采用服务端渲染改善体验

应用场景：SEO、定制社交分享信息、提升感知速度

### 8.3 基础示例

-   环境安装

```
// 新建一个空文件夹
npm init
// 生成package.json

// 安装webpack插件依赖
npm install --save-dev webpack  webpack-cli
// 安装Babel及其加载器
npm install --save-dev babel-loader@7.0 babel-core babel-preset-es2015 babel-preset-react

// 安装服务端加载依赖
npm install --save-dev webpack-node-externals

npm install --save react react-dom express path

// package.json中加入以下脚本
"scripts": {
    "build": "webpack",
    "start": "node ./dist/server"
}
```

-   新建一个`webpack.config.js`文件

```
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const rules = [{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015', 'react']
  }
}]

const client = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, './dist/public'),
    filename: 'bundle.js'
  },
  module: {
    rules
  },
  mode: 'production'
}

const server = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  module: {
    rules
  },
  target: 'node',
  mode: 'production',
  externals: [nodeExternals()]
}

module.exports = [client, server]

```

-   新建 src 目录，目录下新建 app.js

```
import React from 'react'

const App = () => <div> Hello React </div>

export default App

```

-   新建 clent.js

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(<App />, document.getElementById('app'))

```

-   template.js

```
export default body => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app">${body}</div>
      <script src="/bundle.js"></script>
    </body>
  </html>`

```

-   server.js

```
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import App from './app'
import template from './template'

const app = express()

app.use(express.static('dist/public'))

app.get('/', (req, res) => {
  const body = ReactDOM.renderToString(<App />)
  const html = template(body)
  res.send(html)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

```

运行命令  
`npm run build`  
`npm start`

### 8.4 数据获取示例

引入新的依赖

`npm install --save isomorphic-fetch prop-types`

修改 app.js

```
import React from 'react'
import PropTypes from 'prop-types'

const App = ({ gists }) => (
  <ul>
    {gists.map(gist => (
      <li key={gist.id}>{gist.description}</li>
    ))}
  </ul>
)

App.propTypes = { gists: PropTypes.array }

export default App

```

修改 template.js

```
// 增加参数
export default (body, gists) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app">${body}</div>
      <script>window.gists = ${JSON.stringify(gists)}</script>     // 增加这一行
      <script src="/bundle.js"></script>
    </body>
  </html>`

```

修改 server.js

```
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import App from './app'
import template from './template'
// 引入新的依赖
import fetch from 'isomorphic-fetch'

const app = express()

app.use(express.static('dist/public'))

app.get('/', (req, res) => {
  // 实现数据处理
  fetch('https://api.github.com/users/gaearon/gists')
    .then(response => response.json())
    .then(gists => {
      const body = ReactDOM.renderToString(<App gists={gists} />)
      const html = template(body, gists)
      res.send(html)
    })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

```

修改 client.js

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// 更改这里
ReactDOM.render(
  <App gists={window.gists} />,
  document.getElementById('app')
)

```

运行命令  
`npm run build`  
`npm start`

访问 view-source:http://localhost:3000/ 可以看见 gist 数据，但页面会报错，因为客户端渲染时 gists 为 undefined

### 8.5 Next.js

> `Next.js`可以极其方便地生成通用应用，无须关心配置文件。此外，它还大大减少了模板代码

新文件加下  
`npm init`  
`npm install --save next react react-dom prop-types isomorphic-fetch`

package.json 中配置

```
"scripts": {
    "dev": "next"
}
```

创建 pages/index.js

```
import React from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'

class App extends React.Component {
  static async getInitialProps () {
    const url = 'https://api.github.com/users/gaearon/gists'
    const response = await fetch(url)
    const gists = await response.json()
    return {
      gists
    }
  }

  render () {
    return (
      <ul>
        {this.props.gists.map(gist => (
          <li key={gist.id}>{gist.description}</li>))}
      </ul>
    )
  }
}

App.propTypes = { gists: PropTypes.array, }

export default App

```

然后运行`npm run dev`

</details>

## 9、提升应用性能

<details>

### 9.1 一致性比较与 key 属性

> 显示组件时，React 会调用自己的`渲染方法`，还会递归调用子组件的渲染方法会返回 React 元素树,当组件状态发生变化时，通过`一致性比较`将渲染结果与之前的元素树进行比较，计算出最小操作集合。

对比两个元素树时

-   如果类型不同，则认为渲染的树也不同
-   可以设置 key 标记子组件，使他们在不同渲染过程中得以保留

> key 可以帮助 React 更快的渲染视图

`react-addons-perf`在 React16 以下可以监测性能，16 以上版本可以直接在浏览器调试工具中查看

> 为列表项设置`唯一确定`的 key 可以帮助 React 提高渲染性能

### 9.2 优化手段

-   构建打包时要将 NODE_ENV 环境变量设置为 production
-   压缩最终代码来减小体积，以便应用可以更快加载
-   过早优化往往会带来不必要的复杂度

#### 9.2.1 是否要更新组件

`shouldComponentUpdate` 返回 false 时组件在父组件更新过程中不会重新渲染

`React.PureComponent` 组件可以浅比较所有 props 和状态属性。它不会检查对象中嵌套的深层属性，并且有时会给出意外结果。

> **只有检查过应用性能并找到瓶颈所在后**，才能使用 PureComponent，因为深度比较复杂对象所需要的开销可能比渲染方法本身更大

#### 9.2.2 无状态函数式组件

> 无状态组件实际上不会带来任何性能上的提升,也无法使用 shouldComponentUpdate 帮助 React 更快地渲染元素树

### 9.3 常用解决方案

> 解决重渲染问题的一些常用工具和解决方案，找出可以进行优化的组件、学习如何重构复杂组件，将它们拆分成小型组件以获得更好的性能

#### 9.3.1 why-did-you-update

使用插件找出不需要更新的组件

```
npm install --save-dev why-did-you-update

// 只在开发模式下使用
if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}
// 运行后会输出可以避免渲染的组件信息，将不必要的组件设置为PureComponent以优化渲染性能
```

#### 9.3.2 在渲染方法中创建函数

```
render() {
    return (
        <div>
            <ul>
                {this.state.items.map(item => (
                    <Item
                        key={item}
                        item={item}
                        onClick={() => console.log(item)}
                    />
                ))}
            </ul>
        </div>
    )
}
```

使用`箭头函数`作为处理函数，每次渲染都会返回一个全新创建的函数

因为需要知道函数是由那个组件触发所以不能再父组件之定义一次，解决方案是挪到 item 组件中实现

```
class Item extends React.PureComponent{
    constructor(props) {
        super(props)　
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.props.onClick(this.props.item)
    }

    render() {
        return (
            <li onClick={this.handleClick}>
                {this.props.item}
            </li>
        )
    }
}
```

> 在渲染方法中使用箭头函数（甚至在 constructor 方法中用 bind 绑定 this）的做法本身没什么问题，只不过实际使用 PureComponent 时要小心谨慎，确保不会引发不必要的重渲染

#### 9.3.3 props 常量

现在为 list 加入新的属性

```
render() {
    return (
        <div>
            <ul>
                {this.state.items.map(item => (
                    <Item
                        key={item}
                        item={item}
                        onClick={() => console.log(item)}
                        status={['open','close']}
                    />
                ))}
            </ul>
             <button onClick={this.handleClick}>+</button>
        </div>
    )
}
```

每次点击添加子元素时，status 传入的都是新的对象

解决方案是创建一个 status 数组，每次传入相同的实例

```
const status=['open','close']
render() {
    return (
        <div>
            <ul>
                {this.state.items.map(item => (
                    <Item
                        key={item}
                        item={item}
                        onClick={() => console.log(item)}
                        status={status}
                    />
                ))}
            </ul>
             <button onClick={this.handleClick}>+</button>
        </div>
    )
}
```

#### 9.3.4 重构与良好设计

先创建一个基础的 todo 组件

```
class Todos extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            items: ['foo', 'bar'],
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange({ target }) {
        this.setState({
            value: target.value
        })
    }

    handleClick() {
        const items = this.state.items.slice()
        items.unshift(this.state.value)　
        this.setState({
            items
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map(item => <li key={item}>{item}</li>)}
                </ul>
                <div>
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>+</button>
                </div>
            </div>
        )
    }
}
```

列表项数量增多后，每次用户输入时都要渲染整个列表

将组件拆分成更小的组件，分别完成列表项的渲染以及表单值的更改

```
// 父组件
class Todos extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            items: ['foo', 'bar']
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(value) {
        const items = this.state.items.slice()
        items.unshift(value)　
        this.setState({
            items
        })
    }

    render() {
        return (
            <div>
                <List items={this.state.items} />
                <Form onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

// 列表
class List extends React.PureComponent{
    render() {
        return (
            <ul>
                {this.props.items.map(item => <li key={item}>{item}</li>)}
            </ul>
        )
    }
}

// 表单
class Form extends React.PureComponent{
    constructor(props) {
        super(props)　
        this.state = {
            value: ''
        }　
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange({ target }) {
        this.setState({
            value: target.value
        })
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <button
                    onClick={() => this.props.onSubmit(this.state.value)}
                >+</button>
            </div>
        )
    }
}
```

### 9.4 工具与库

#### 9.4.1 不可变性

传入 prop 时，如果属性为对象可能无法检测到属性值得变化，解决方案是传入不可变数据，每次传入新的对象

```
const obj = { ...this.state.obj, foo: 'bar' }
this.setState({ obj })
```

也可以使用插件`immutable.js`

#### 9.4.2 性能监控工具

上文中有提到 Perf 插件（在新版的 react 中已经不支持了),更好的解决方案是使用 chrome 浏览器的 chrome-react-perf 扩展

react-perf-tool 可以为我们在浏览器窗口中提供一个美观的界面管理 perf 插件

#### 9.4.3 Babel 插件

-   **React 常量元素转换器** babel-plugin-transform-react-constant-elements
-   **React 行内元素转换器** babel-plugin-transform-react-inline-elements

这两个插件都只应该在生产环境中启用，因为它们会使开发环境中的调试变得很困难

</details>

## 10、测试与调试

<details>

### 10.1 测试的好处

-   能使开发人员对自己的代码开发速度和质量更有信心
-   使代码重构更简单
-   有助于避免代码回退
-   使代码库更加稳固
-   可以用 Node 和控制台运行测试

> `测试驱动开发`（test driven devel-opment，TDD） 意味着先编写测试， 然后再编写能够通过测试的代码。这种模式可以帮助我们写出更好的代码，因为它促使我们在实现功能前花更多精力思考设计，这往往会带来更高的质量。

### 10.2 用 Jest 轻松测试 JavaScript

```
// 新建文件夹
npm init

npm i -D babel-loader @babel/core @babel/preset-env @babel/preset-react babel-jest jest react-addons-test-utils

// 新建.babelrc
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}

npm install --save react react-dom

```

> 官方文档已将测试工具类移入 react-dom/test-utils，渲染方法移入 react-test-renderer

```
npm remove react-addons-test-utils
```

新建 button.js

```
import React from 'react'

class Button extends React.Component {
  render () {
    return <div />
  }
}

export default Button

```

新建 button.spec.js

```
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Button from './button'

test('works', () => {
  expect(true).toBe(true)
})

```

执行 `npm test` 控制台输出结果 pass

测试 React 组件的方式一般有两种

-   浅渲染
-   将组件挂载到独立 DOM 中

> `浅渲染`允许你按**一级深度**渲染组件，然后根据它返回的渲染结果进行一些预测

**一级深度渲染**指将组件隔离出来测试，即使其中包含一些很复杂的子组件，它们也不会被渲染，就算它们发生变化或者加载失败，也不影响测试结果

```
import React from 'react'

class Button extends React.Component {
  render () {
    return <button> {this.props.text} </button>
  }
}

export default Button

```

```
import React from 'react'
import TestRenderer from 'react-test-renderer'
import Button from './button'

test('renders with text', () => {
  const text = '123'
  const testRenderer = TestRenderer.create(<Button text={text} />)
  const testInstance = testRenderer.root
  expect(testInstance.props.text).toBe(text)
  // expect(testInstance.type).toBe('[Function Button]')
})

```

测试点击事件，需要用到 mock 函数

```

import React from 'react'

class Button extends React.Component {
  render () {
    return <button onClick={this.props.onClick}> {this.props.text} </button>
  }
}

export default Button

```

```
npm i -D jest-mock

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import TestRenderer from 'react-test-renderer'
import jest from 'jest-mock'
import Button from './button'


test('fires the onClick callback', () => {
  const onClick = jest.fn()
  const tree = TestUtils.renderIntoDocument(<Button onClick={onClick} />)
  const button = TestUtils.findRenderedDOMComponentWithTag(tree, 'button')
  TestUtils.Simulate.click(button)
  expect(onClick).toBeCalled()
})

```

### 10.3 灵活的测试框架 Mocha

### 10.4 React JavaScript 测试工具

### 10.5 真实测试示例

### 10.6 React 组件树快照测试

### 10.7 代码覆盖率工具

### 10.8 常用测试方案

#### 10.8.1 测试高阶组件

#### 10.8.2 页面对象模式

### 10.9 React 开发者工具

### 10.10 React 错误处理

</details>

## 11、需要避免的反模式

<details>

### 11.1 用 prop 初始化状态

> 用父组件传来的 prop 初始化状态**往往**是一种反模式

```
class Counter extends React.Component{
    constructor(props) {
        super(props)　
        this.state = {
            count: props.count
        }　
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            count: this.state.count + 1,
        })
    }
    render() {
        return (
            <div>
                {this.state.count}
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}
```

以上代码的问题

-   我们违背了单一数据源原则；
-   传给组件的 count 属性发生变化时，状态不会相应地更新

props 命名时带有明确含义，表明该属性只在初始化时有用

### 11.2 修改状态

必须使用 setState 进行状态的修改，否则可能出现以下问题

-   状态改变不会触发组件重渲染
-   以后无论何时调用 setState，之前修改的状态都会渲染到页面上
-   直接修改状态会严重影响性能

### 11.3 将数组索引作为 key

> key 属性唯一标识了 DOM 中的某个元素，所以 React 用其判断元素是否为新的，以及组件属性和状态改变时是否要更新元素

通过对比得知，使用数组索引作为 key 和没有用 key 属性时一模一样

因此我们使用 key 是最好能提供唯一且稳定的标识，以帮助 dom 更好的检查更新

### 11.4 在 DOM 元素上展开 props 对象

> 我们常常会在元素上展开 props 对象，以避免手动编写每个属性，这种模式成为`反模式`

```
<Component {...props} />
```

缺点:

-   添加未知 HTML 属性的风险
-   展开符隐藏了我们所要传递的属性值，变得不清晰

一种解决方式是创建一个专门用来存放有效 DOM 属性的对象,然后展开它

```
const Spread = props => <div {...props.domProps} />

<Spread foo="bar" domProps={{ className: 'baz' }} />
```

</details>

## 12、未来的行动

<details>

### 12.1 为 React 做贡献

> React 开源，任何人都能参与修复 bug、编写文档，甚至添加新特性

-   提交问题前先使用 JSFiddle 模板进行问题的复现
-   排除 React 版本问题，遵循提交问题的准则
-   贡献代码前遵循代码风格指南，并为补丁编写全面的测试
-   确保新代码能通过现有所有测试，避免引入新的问题
-   如果想加入新特性，需要先和 React 团队交流，避免和正在开发的功能冲突或者新特性不再对方的规划内

### 12.2 分发代码

> 发布一个解决复杂问题的 React 组件也是做贡献的一种方式

-   共享代码需要你遵循最佳实践，编写更好的代码
-   代码要接受其他开发人员的反馈和评论
-   承担维护仓库的责任
-   修复漏洞，编写补丁并发布
-   审查他人的 pull request

一些优秀的实践：  
1、编写全面的测试集  
2、添加描述组件的 README 文件，其中包括使用示例、API 文档以及可用的 prop  
3、在仓库中添加 LICENSE 文件，它可以提醒人们如何恰当地使用你的代码  
4、尽量减小软件包并少用依赖  
5、尽量少提供样式，允许用户自由配置组件

### 12.3 发布 npm 包

开发完组件后，在 package.json 中配置好包名及版本等描述信息

```
// 必须拥有npm账户，以下命令创建账户
npm adduser $username

// 登录账户
npm login

// 发布组件
npm publish

// 修改库并发布新版
npm version $type

// 再次发布组件
npm publish
```

</details>
