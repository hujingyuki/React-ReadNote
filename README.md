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
