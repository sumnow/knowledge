<!--
Created: Mon Aug 26 2019 15:16:14 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:16:14 GMT+0800 (China Standard Time)
-->
# 纯css回弹效果

``` html
<div id="pinStarWrapper">
    <input type="checkbox" id="pinStarCenterChkBox">
    <div class="pinStarLeaf"></div>
    <div class="pinStarLeaf"></div>
    <div class="pinStarLeaf"></div>
    <div class="pinStarLeaf"></div>
    <div class="pinStarLeaf"></div>
    <div id="pinStarCenter"></div>
</div>
```

``` css
<style type="text/css">#pinStarWrapper {
    width: 300 px;
    height: 300 px;
    position: relative;
    margin: auto;
}

.pinStarLeaf {
    width: 60 px;
    height: 120 px;
    position: absolute;
    border - radius: 50 % /30% 30% 70% 70%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: .5;
    transform - origin: 30 px 30 px;
    transition: transform 1 s cubic - bezier(.8, .5, .2, 1.4);
}

.pinStarLeaf: nth - of -type(1) {
    background - color: #B8F0F5;
}

.pinStarLeaf: nth - of -type(2) {
    background - color: #9CF3DC;
}

.pinStarLeaf:nth-of-type(3) {
    background-color: # 94 F3B0;
}

.pinStarLeaf: nth - of -type(4) {
    background - color: #D2F8A1;
}

.pinStarLeaf: nth - of -type(5) {
    background - color: #F3EDA2;
}

#pinStarCenter,
#pinStarCenterChkBox {
    width: 45 px;
    height: 50 px;
    position: absolute;
    left: 0;
    right: 0;
    top: -60 px;
    bottom: 0;
    margin: auto;
    background - color: #fff;
    border - radius: 50 %;
    cursor: pointer;
}

#pinStarCenter,
.pinStarLeaf {
    pointer - events: none;
}

#pinStarCenter>input[type="checkbox"] {
    width: 100 %;
    height: 100 %;
    cursor: pointer;
}

#pinStarCenterChkBox: checked~.pinStarLeaf {
    transition: transform 1 s cubic - bezier(.8, -.5, .2, 1.4);
}

#pinStarCenterChkBox: checked~.pinStarLeaf: nth - of -type(5) {
    transform: rotatez(35 deg);
}

#pinStarCenterChkBox: checked~.pinStarLeaf: nth - of -type(4) {
    transform: rotatez(105 deg);
}

#pinStarCenterChkBox: checked~.pinStarLeaf: nth - of -type(3) {
    transform: rotatez(180 deg);
}

#pinStarCenterChkBox: checked~.pinStarLeaf: nth - of -type(2) {
    transform: rotatez(255 deg);
}

#pinStarCenterChkBox: checked~.pinStarLeaf: nth - of -type(1) {
    transform: rotatez(325 deg);
}

</style>
```

主要利用了贝塞尔曲线, 同时虽然css无法触发点击事件, 但是可以使用input:checked完成点击判定. 

