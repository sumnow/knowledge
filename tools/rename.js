const fs = require('fs');
var callfile = require('child_process');

fs.readdir('../codes', function (err, files) {
    const resultArr = [];
    files.forEach(filename => {
        let oldname = '../codes/' + filename;
        let newName = '../codes/' + filename;
        const reg = /(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))\d([\S\s]+)\[([\S\s]+)\]\.md/
        const engNameReg = /(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))\d([\w\-\'\:]+)\[([0-9A-Z-]+)\]\.md/g
        if (!engNameReg.test(filename)) {
            // 用脚本改名字大小写,git无法监测到
            // fs.rename(oldname, '../codes/' + filename.replace(reg, `$1$2$30$4[${filename.match(reg)[5].toUpperCase()}].md`), function (err) {
            //     if (err) {
            //         console.log(err)
            //         throw err;
            //     }
            // });
            resultArr.push(filename)
        }
    })
    if (resultArr.length > 0) {
        console.log('以下文件名存在问题:')
        resultArr.forEach(e => {
            console.log(e)
        })
    } else {
        // callfile.execFile('./update.sh', [], function (err) { console.log(err) })
    }
})

