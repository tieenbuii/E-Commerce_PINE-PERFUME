const { notFound, errHandler } = require('../middlewares/errHandler');
const userRouter = require('./userRoutes');
const productRouter = require('./productRoutes');
const stockRouter = require('../routes/stockRoutes');


const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/stock', stockRouter)

    app.use(notFound);
    app.use(errHandler);
}

module.exports = initRoutes;