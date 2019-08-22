
# canvas 的圆角矩形

## 绘制圆角矩形

``` js
var rect = {
    x: 50,
    y: 50,
    w: 300,
    h: 200,
    r: 40
}

// class Rect {
//     x: number,
//     y: number,
//     w: number,
//     h: number,
//     r: number,
// }
// drawUsingArc({
//     ctx,
//     rect,
//     color,
//     lineWidth,
//     isWxMiniProgram
// }: {
//     ctx: object,
//     rect: Rect,
//     color: string,
//     lineWidth: nummber,
//     isWxMiniProgram: boolean
// })

function drawUsingArc({
    ctx,
    rect,
    color,
    lineWidth,
    isWxMiniProgram
}) {
    ctx.save();
    if (isWxMiniProgram) {
        ctx.setStrokeStyle(color);
        ctx.setLineWidth(lineWidth)
    } else {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
    }
    var path = ctx;
    path.moveTo(rect.x + rect.r, rect.y);
    path.lineTo(rect.x + rect.w - rect.r, rect.y);
    path.arc(rect.x + rect.w - rect.r, rect.y + rect.r, rect.r, Math.PI / 180 * 270, 0, false);
    path.lineTo(rect.x + rect.w, rect.y + rect.h - rect.r);
    path.arc(rect.x + rect.w - rect.r, rect.y + rect.h - rect.r, rect.r, 0, Math.PI / 180 * 90, 0, false);
    path.lineTo(rect.x + rect.r, rect.y + rect.h);
    path.arc(rect.x + rect.r, rect.y + rect.h - rect.r, rect.r, Math.PI / 180 * 90, Math.PI / 180 * 180, false);
    path.lineTo(rect.x, rect.y + rect.r);
    path.arc(rect.x + rect.r, rect.y + rect.r, rect.r, Math.PI / 180 * 180, Math.PI / 180 * 270, false);
    ctx.stroke();

    ctx.restore();

}
```

``` js
 function drawBrightPoints(txt, fontSize, lineHeight, color, x, y, padding = [2, 2, 2, 2]) {
     ctx.save()
     ctx.textBaseline = "middle";
     ctx.setTextAlign('left')
     ctx.setFontSize(fontSize)
     ctx.setFillStyle(color)
     ctx.setStrokeStyle(color)
     drawUsingArc({
         ctx,
         rect: {
             x,
             // 可能有偏差
             y: y - lineHeight / 2,
             w: ctx.measureText(txt).width + padding[1] + padding[3],
             h: lineHeight + padding[0] + padding[2],
             r: 5
         },
         color,
         lineWidth: 1,
         isWxMiniProgram: true
     });
     ctx.fillText(txt, x + padding[1], y)
     ctx.restore()
 }
```

