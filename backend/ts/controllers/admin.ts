import * as express from 'express'

let router = express.Router()

//登录验证
router.use('/login/verify', (req, res) => {
	const phone = req.body.phone || req.query.phone;
	const code = req.body.code || req.query.code;
	const loginUser = {
		id: phone,
		name: phone,
		role: 'admin'
	}
	let result = {
		status: true,
		msg: "登录成功",
		user: loginUser
	}
	req.session!.user = loginUser
	res.json(result)
})

//登录
router.use('/login', (req, res) => {

	let d = new Date()
	let subDir: string
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
		appName: 'OA登录',
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
	res.render('admin/login', obj)
})

//退出登录
router.use('/logout', (req, res) => {
	delete req.session!.user
	res.redirect('./login');
	return;
})

//退出登录
router.use('/menu', (req, res) => {
	let data =
		{
			"data": {
				"items": [{
					"id": 1000,
					"icon": "",
					"title": "Group",
					"url": "",
					"status": true,
					"children": [{
						"id": 1001,
						"icon": "",
						"title": "Page1 ",
						"url": "/test/page1",
						"status": true
					}, {
						"id": 1002,
						"icon": "search",
						"title": "search",
						"url": "/test/search?searchText=1234",
						"status": true
					}]
				}, {
					"id": 2000,
					"icon": "android-share",
					"title": "Iframe兼容旧版",
					"url": "",
					"status": true,
					"children": [{
						"id": 2001,
						"icon": "",
						"title": "新浪",
						"url": "http://www.sina.com.cn",
						"status": true
					}, {
						"id": 2002,
						"icon": "",
						"title": "百度",
						"url": "http://www.baidu.com",
						"status": true
					}]
				}, {
					"id": 3000,
					"icon": "",
					"title": "OnePage",
					"url": "/admin/home",
					"status": true
				}]
			}
		}
	res.json(data)
})

//master模板页
router.use('/', (req, res) => {

	//判断是否登录
	if (!req.session!.user) {
		//res.redirect(C.baseUrl + '/admin/login')
		//return;
		const loginUser = {
			id: 0,
			name: "test",
			role: 'admin'
		}
		req.session!.user = loginUser;
	}

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
		appName: 'OA管理后台',
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
	res.render('admin/master', obj)
})


export = router