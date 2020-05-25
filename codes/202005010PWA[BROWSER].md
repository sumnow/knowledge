<!--
Created: Mon May 25 2020 14:35:00 GMT+0800 (China Standard Time)
Modified: Mon May 25 2020 14:37:10 GMT+0800 (China Standard Time)
-->

# Progressive Web Applications (PWA) 

chrome里的pwa主要靠 `manifest.json` 来处理

``` JS
// JavaScript
{
  "name": "Tally",
  "short_name": "Tally",
  "description": "A simply app.",
  "icons": [{
    "src": "/img/icons/icon-128x128.png",
    "sizes": "128x128",
    "type": "image/png"
  }, {
    "src": "/img/icons/icon-256x256.png",
    "sizes": "256x256",
    "type": "image/png"
  }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#fff",
  "theme_color": "#fff"
}
```

而iOS上只能使用 `safari` 

``` HTML
<!-- HTML -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-1242x2688.png">
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-828x1792.png">
<!-- iPhone X, Xs (1125px x 2436px) -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-1125x2436.png">
<!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/apple-launch-1242x2208.png">
<!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/apple-launch-750x1334.png">
```
