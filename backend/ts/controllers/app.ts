import * as express from 'express'

let router = express.Router()

//主页 iview
router.use('/', (req, res) => {
    let d = new Date()
    let subDir: string;
    subDir = (C.subDir) ? '/' + C.subDir : '';

    let user: globalUserModel = {
        id: '',
        name: '',
        role: ''
    }

    if (req.session!.user) {
        user.id = req.session!.user.userid
        user.name = req.session!.user.name
        user.role = req.session!.user.role
    }

    let globalConfig: globalConfigStatic = {
        appName: 'webapp',
        appVersion: C.version,
        user: user,
        prefixPath: subDir,
        ip: req.ip
    }

    let obj = {
        appname: globalConfig.appName,
        unix: '?' + Math.round(d.getTime() / 1000).toString(),
        subDir: globalConfig.prefixPath,
        globalConfig: JSON.stringify(globalConfig)
    }
    res.render('app', obj)
})

export = router