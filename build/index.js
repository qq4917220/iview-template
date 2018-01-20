const childProcess = require('child_process');
const path = require('path');

const buildHelper = require('./helper');

var root = path.join(__dirname, '..');

//backend的js编译目录
var backendOutDir = 'backend/js';

//清除原有backend生成的js文件
buildHelper.clear(path.join(root, backendOutDir));

var isWin32 = process.platform === 'win32',
    isDebug = false,
    isLocal = false,
    // runCmd = 'run-s', //串行
    runCmd = 'run-p',
    buildBackend = 'build:backend --outDir ' + backendOutDir, //tsc里outDir必须使用linux路径形式
    buildFrontend = 'build:frontend';

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'prod') {
    isDebug = true;
}

if (process.env.COMPILE_ENV && process.env.COMPILE_ENV === 'local') {
    isDebug = true;
    isLocal = true;
}

if (isDebug) {
    buildBackend += ' --sourceMap';
    //buildFrontend += ' --env.isDebug true';
}

if (isLocal) {
    // runCmd = 'run-p'; //并行
    buildBackend += ' --pretty -w';
    //buildFrontend += ' --env.isLocal true -w';
}

if (isWin32) {
    buildBackend = '"' + buildBackend + '"';
    buildFrontend = '"' + buildFrontend + '"';
}

const yarn = childProcess.spawn('yarn', [runCmd, buildBackend, buildFrontend], {
    stdio: 'inherit',
    shell: isWin32
});