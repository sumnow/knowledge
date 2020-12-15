# 与App的交互发现的问题

1. ios里的webview 的url不能够出现中文,否则打不开

2. 安卓里的webview必须有完整的url以https开头,否则无法使用location.href跳转

3. location.href 无法跳转还有可能是因为Native没有在webview里支持该方法