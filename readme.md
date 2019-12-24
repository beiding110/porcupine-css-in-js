# css-in-js

## porcupine

### 介绍

允许用户将css样式写在js中，是css-in-js的一个解决方案，其中样式名可以使用 `fontSize` 格式或 `font-size` 格式；

类库会根据用户输入的 `css样式JSON` 自动生成一套 `style标签` 插入在head末尾。

!> 由于js对象中的key顺序会被自动排列，因此生成样式的先后顺序无法保证；

!>生成结果为压缩后的格式

### 使用说明

#### 可以使用 `传统css样式写法`

```JavaScript
new PorCIJ({
    'html,body': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    'body': {
        background: 'rgba(0, 0, 0, .1)',
    },
    'body div div': {
        border: '1px solid #a789b6',
        padding: '1em',
    },
    'body div a': {
        textAlign: 'center'
    },
    'body div div:hover':{
        backgroundColor: '#a789b6',
        color: 'white',
        cursor: 'pointer'
    },
    ...
})
```

生成内容如下：

```css
body div div:hover { background-color:#a789b6; color:white; cursor:pointer; }
body div a { text-align:center; }
body div div { border:1px solid #a789b6; padding:1em; }
body { background:rgba(0, 0, 0, .1); }
html,body { width:100%; height:100%; overflow:hidden; position:relative; }
```

#### 亦可使用`sass语法`，同时支持 `&` 符号的使用

```JavaScript
new PorCIJ({
    'html,body': {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    'body': {
        background: 'rgba(0, 0, 0, .1)',
        div: {
            border: '1px solid #a789b6',
            padding: '1em',
            div: {
                '&:hover': {
                    backgroundColor: '#a789b6',
                    color: 'white',
                    cursor: 'pointer'
                }
            },
        },
        a: {
            textAlign: 'center'
        }
    },
    '.text': {
        fontWeight: 'normal',
        fontStretch: 'normal',
        color: '#a789b6',
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',

        '.font_404': {
            'font-size': '30px',
        },
        '.font_description': {
            'font-size': '20px'
        },
        '&:first-child': {
            background: 'white'
        }
    }
})
```

生成内容如下：

```css
html,body { width:100%; height:100%; overflow:hidden; position:relative; }
.text { font-weight:normal; font-stretch:normal; color:#a789b6; text-align:center; position:absolute; left:50%; top:40%; transform:translate(-50%, -50%); }
.text:first-child { background:white; }
.text .font_description { font-size:20px; }
.text .font_404 { font-size:30px; }
body { background:rgba(0, 0, 0, .1); }
body a { text-align:center; }
body div div:hover { background-color:#a789b6; color:white; cursor:pointer; }
body div div { }
body div { border:1px solid #a789b6; padding:1em; }
```
