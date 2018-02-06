import * as path from 'path'

global['C'] = {}

let gc = {
    root: path.join(__dirname, '..', '..'),
    baseUrl: '//localhost:8080',
    port: 8080,
    session: {
        name: 'ADMINSESSION',
        secret: 'SYS$SESSION*secret#100',
        maxAge: 7000 * 60 * 1000 //过期时间：7000分钟
    }
}

global['C'] = gc


// console.log('--------------C----------------')
// console.log(C)
// console.log('--------------global["C"]----------------')
// console.log(global["C"])