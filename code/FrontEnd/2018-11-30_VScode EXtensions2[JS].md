# vscode markdown格式化的插件编写

这是一个markdown格式化的vscode插件的详细编写过程, 之前的准备和之后的发布, 都在[这里]()

## 脚手架分析

我们从脚手架开始, 目录如下

    file: {
        out: {
            dir: '输出文件目录', 
            cd: {
                src: {
                    dir: '输出转换后的代码'
                }, 
                test: {
                    dir: '输出测试代码'
                }
            }
        }, 
        src: {
            dir: '代码目录', 
            cd: {
                extension.ts: {
                    file: '代码入口'
                }
            }
        }
    }

其实, 基本只需要编写 `extension.ts` (如果你使用的是js模版, 就是 `extension.js` ), 其实都一样了~

模版里已经实现了一个命令行工具

    // 注册事件
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // 页面提示
        vscode.window.showInformationMessage('Hello World!'); 
    }); 
    // 在订阅者里放入注册事件
    context.subscriptions.push(disposable); 

再看package.json

    // 触发注册事件的行为
    "activationEvents": ["onCommand:extension.sayHello"], "contributes": {
        // 命令行触发
        "commands": [{
            "command": "extension.sayHello", 
            "title": "Hello World"
        }]
    }

你可以 `command+shift+D` 进入调试模式, 在自动打开的窗口里用 `command+shift+p` , 在命令行里输入 `sayHello` 会出现'hello world', 点击后, 会弹出 `hello, world` 的信息框 

## 开发

然后

    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('markdown', {
        provideDocumentFormattingEdits(document, options, token) {}
    }))

