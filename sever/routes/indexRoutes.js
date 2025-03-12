const { notFound, errHandler } = require('../middlewares/errHandler');
const userRouter = require('./userRoutes');
const productRouter = require('./productRoutes');
const stockRouter = require('./stockRoutes');
const brandRouter = require('./brandRoutes');
const categoryRouter = require('./categoryRoutes');
const toneRouter = require('./toneRoutes');




const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/stock', stockRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/tone', toneRouter)



    app.use(notFound);
    app.use(errHandler);
}

module.exports = initRoutes;