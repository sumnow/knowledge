# 纯css回弹效果

html:

    <div id="pinStarWrapper">
        <input type="checkbox" id="pinStarCenterChkBox">
        <div class="pinStarLeaf"></div>
        <div class="pinStarLeaf"></div>
        <div class="pinStarLeaf"></div>
        <div class="pinStarLeaf"></div>
        <div class="pinStarLeaf"></div>
        <div id="pinStarCenter"></div>
    </div>

css:

    <style type="text/css">
    #pinStarWrapper {
        width: 300px;
        height: 300px;
        position: relative;
        margin: auto;
    }

    .pinStarLeaf {
        width: 60px;
        height: 120px;
        position: absolute;
        border-radius: 50%/30% 30% 70% 70%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        opacity: .5;
        transform-origin: 30px 30px;
        transition: transform 1s cubic-bezier(.8, .5, .2, 1.4);
    }

    .pinStarLeaf:nth-of-type(1) {
        background-color: #B8F0F5;
    }

    .pinStarLeaf:nth-of-type(2) {
        background-color: #9CF3DC;
    }

    .pinStarLeaf:nth-of-type(3) {
        background-color: #94F3B0;
    }

    .pinStarLeaf:nth-of-type(4) {
        background-color: #D2F8A1;
    }

    .pinStarLeaf:nth-of-type(5) {
        background-color: #F3EDA2;
    }

    #pinStarCenter,
    #pinStarCenterChkBox {
        width: 45px;
        height: 50px;
        position: absolute;
        left: 0;
        right: 0;
        top: -60px;
        bottom: 0;
        margin: auto;
        background-color: #fff;
        border-radius: 50%;
        cursor: pointer;
    }

    #pinStarCenter,
    .pinStarLeaf {
        pointer-events: none;
    }

    #pinStarCenter > input[type="checkbox"] {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    #pinStarCenterChkBox:checked ~ .pinStarLeaf {
        transition: transform 1s cubic-bezier(.8, -.5, .2, 1.4);
    }

    #pinStarCenterChkBox:checked ~ .pinStarLeaf:nth-of-type(5) {
        transform: rotatez(35deg);
    }

    #pinStarCenterChkBox:checked ~ .pinStarLeaf:nth-of-type(4) {
        transform: rotatez(105deg);
    }

    #pinStarCenterChkBox:checked ~ .pinStarLeaf:nth-of-type(3) {
        transform: rotatez(180deg);
    }

    #pinStarCenterChkBox:checked ~ .pinStarLeaf:nth-of-type(2) {
        transform: rotatez(255deg);
    }

    #pinStarCenterChkBox:checked ~ .pinStarLeaf:nth-of-type(1) {
        transform: rotatez(325deg);
    }
    </style>

主要利用了贝塞尔曲线，同时虽然css无法触发点击事件，但是可以使用input:checked完成点击判定。