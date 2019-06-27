const fs = require('fs');

fs.readdir('.', function (err, files) {
    console.log(files)
    files.forEach(filename => {
        let oldname = './' + filename;
        const reg = /\.\/(?:(\d{4})-(0[0-9]|1[0-2])-(3[0-1]|[0-2][0-9]))_([\S\s]+)\[([\S\s]+)\]\.md/
        const reg2 = /\]/g
        const reg4 = /\ /g
        const reg3 = /\[/g
        let newname = './'+oldname.replace(reg, '$1$2$30$4[$5].md').replace(reg3, '+').replace(reg2, '').replace(reg4,'_')
        fs.rename(oldname, newname, err => {
            if (!err) {
                console.log(filename + 'success')
            }
        })
    })
})