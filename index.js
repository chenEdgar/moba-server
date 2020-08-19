const express = require('express')

const app = express()

// 跨域模块
app.use(require('cors')())
// a
app.use(express.json())

// 静态资源托管
// 让`${__dirname}/uploads`的资源可以通过/uploads路由访问
app.use('/uploads', express.static(`${__dirname}/uploads`))
require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000');
})

