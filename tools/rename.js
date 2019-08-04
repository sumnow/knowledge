const fs = require('fs');

fs.readdir('./codes', function (err, files) {
    // console.log(files)
    files.forEach(filename => {
        let oldname = './codes/' + filename;
        const reg = /(?:(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9]))0([\S\s]+)\[([\S\s]+)\]\.md/
        const as = filename.match(reg)[5].toUpperCase()
        let newname = './codes/' + filename.replace(reg, `$1$2$30$4[${as}].md`)
        // console.log(newname)
        fs.rename(oldname, newname, err => {
            if (!err) {
                console.log(filename + 'success')
            }
        })
    })
})