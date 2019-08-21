
# canvas web 和小程序的区别

``` js
if (isWxMiniProgram) {
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(lineWidth)
} else {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
}
```

