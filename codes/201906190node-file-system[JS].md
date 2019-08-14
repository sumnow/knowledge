# node file system

Node.js 文件系统(fs 模块)模块中的方法均有异步和同步版本, 例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync(). 

异步的方法函数最后一个参数为回调函数, 回调函数的第一个参数包含了错误信息(error). 

建议大家使用异步方法, 比起同步, 异步方法性能更高, 速度更快, 而且没有阻塞. 

## 文件模块

``` js
var fs = require('fs')
```

引入文件系统管理模块

``` js
console.log(fs)
```

的结果如下

``` bash
{ constants: 
   { O_RDONLY: 0,
     O_WRONLY: 1,
     O_RDWR: 2,
     S_IFMT: 61440,
     S_IFREG: 32768,
     S_IFDIR: 16384,
     S_IFCHR: 8192,
     S_IFBLK: 24576,
     S_IFIFO: 4096,
     S_IFLNK: 40960,
     S_IFSOCK: 49152,
     O_CREAT: 512,
     O_EXCL: 2048,
     O_NOCTTY: 131072,
     O_TRUNC: 1024,
     O_APPEND: 8,
     O_DIRECTORY: 1048576,
     O_NOFOLLOW: 256,
     O_SYNC: 128,
     O_DSYNC: 4194304,
     O_SYMLINK: 2097152,
     O_NONBLOCK: 4,
     S_IRWXU: 448,
     S_IRUSR: 256,
     S_IWUSR: 128,
     S_IXUSR: 64,
     S_IRWXG: 56,
     S_IRGRP: 32,
     S_IWGRP: 16,
     S_IXGRP: 8,
     S_IRWXO: 7,
     S_IROTH: 4,
     S_IWOTH: 2,
     S_IXOTH: 1,
     F_OK: 0,
     R_OK: 4,
     W_OK: 2,
     X_OK: 1,
     UV_FS_COPYFILE_EXCL: 1,
     COPYFILE_EXCL: 1 },
  Stats: [Function: Stats],
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  access: [Function],
  accessSync: [Function],
  exists: [Function],
  existsSync: [Function],
  readFile: [Function],
  readFileSync: [Function],
  close: [Function],
  closeSync: [Function],
  open: [Function],
  openSync: [Function],
  read: [Function],
  readSync: [Function],
  write: [Function],
  writeSync: [Function],
  rename: [Function],
  renameSync: [Function],
  truncate: [Function],
  truncateSync: [Function],
  ftruncate: [Function],
  ftruncateSync: [Function],
  rmdir: [Function],
  rmdirSync: [Function],
  fdatasync: [Function],
  fdatasyncSync: [Function],
  fsync: [Function],
  fsyncSync: [Function],
  mkdir: [Function],
  mkdirSync: [Function],
  readdir: [Function],
  readdirSync: [Function],
  fstat: [Function],
  lstat: [Function],
  stat: [Function],
  fstatSync: [Function],
  lstatSync: [Function],
  statSync: [Function],
  readlink: [Function],
  readlinkSync: [Function],
  symlink: [Function],
  symlinkSync: [Function],
  link: [Function],
  linkSync: [Function],
  unlink: [Function],
  unlinkSync: [Function],
  fchmod: [Function],
  fchmodSync: [Function],
  lchmod: [Function],
  lchmodSync: [Function],
  chmod: [Function],
  chmodSync: [Function],
  lchown: [Function],
  lchownSync: [Function],
  fchown: [Function],
  fchownSync: [Function],
  chown: [Function],
  chownSync: [Function],
  _toUnixTimestamp: [Function: toUnixTimestamp],
  utimes: [Function],
  utimesSync: [Function],
  futimes: [Function],
  futimesSync: [Function],
  writeFile: [Function],
  writeFileSync: [Function],
  appendFile: [Function],
  appendFileSync: [Function],
  watch: [Function],
  watchFile: [Function],
  unwatchFile: [Function],
  realpathSync: [Function: realpathSync],
  realpath: [Function: realpath],
  mkdtemp: [Function],
  mkdtempSync: [Function],
  copyFile: [Function],
  copyFileSync: [Function],
  createReadStream: [Function],
  ReadStream: 
   { [Function: ReadStream]
     super_: 
      { [Function: Readable]
        ReadableState: [Function: ReadableState],
        super_: [Object],
        _fromList: [Function: fromList] } },
  FileReadStream: 
   { [Function: ReadStream]
     super_: 
      { [Function: Readable]
        ReadableState: [Function: ReadableState],
        super_: [Object],
        _fromList: [Function: fromList] } },
  createWriteStream: [Function],
  WriteStream: 
   { [Function: WriteStream]
     super_: { [Function: Writable] WritableState: [Function: WritableState], super_: [Object] } },
  FileWriteStream: 
   { [Function: WriteStream]
     super_: { [Function: Writable] WritableState: [Function: WritableState], super_: [Object] } } }
```

## 常用方法

### 重命名

``` js
// javascript
fs.rename(oldPath, newPath, callback)
```

异步 rename(). 回调函数没有参数, 但可能抛出异常. 

### 删除

``` js
// javascript
fs.unlink(path, callback)
```

### 新建目录

``` js
fs.mkdir(path[, options], callback)
```

path - 文件路径. 

options 参数可以是: 

recursive - 是否以递归的方式创建目录, 默认为 false. 

mode - 设置目录权限, 默认为 0777. 

``` js
var fs = require("fs");
// tmp 目录必须存在
console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test/", function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("目录创建成功。");
});
```

以上代码执行结果如下: 

``` 
$ node file.js
创建目录 / tmp / test /
    目录创建成功.
```

可以添加 recursive: true 参数, 不管创建的目录 /tmp 和 /tmp/a 是否存在: 

``` js
fs.mkdir('/tmp/a/apple', {
    recursive: true
}, (err) => {
    if (err) throw err;
});
```

### 读取目录

``` js
fs.readdir(path, callback)
```

callback - 回调函数, 回调函数带有两个参数err, files, err 为错误信息, files 为 目录下的文件数组列表. 

``` js
var fs = require("fs");

console.log("查看 /tmp 目录");
fs.readdir("/tmp/", function(err, files) {
    if (err) {
        return console.error(err);
    }
    files.forEach(function(file) {
        console.log(file);
    });
});
```

