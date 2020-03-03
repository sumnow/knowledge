const fs = require('fs');
var callfile = require('child_process');

fs.readdir('../codes', function (err, files) {
    const resultArr = [];
    files.forEach(filename => {
        let oldname = './codes/' + filename;
        const engNameReg = /(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))\d([\w\-\'\:]+)\[([0-9A-Z-]+)\]\.md/g
        const reg = /(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))\d([\S\s]+)\[([\S\s]+)\]\.md/
        if (!engNameReg.test(filename)) {
            resultArr.push(filename)
        }
    })
    if (resultArr.length > 0) {
        console.log('以下文件名存在问题:')
        resultArr.forEach(e => {
            console.log(e)
        })
    } else {
        callfile.execFile('./update.sh', [], function (err) { console.log(err) })
    }
})

