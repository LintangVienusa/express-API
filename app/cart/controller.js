const Product = require('../product/model')
const cartItem = require('../cartItem/model')

const update = async (req, res, next) => {
    try {
        const {items} = req.body
        const productIds = items.map(item => item.product._id)
        const products = Product.find({_id: {$in: productIds}})
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item.product._id)
            return {
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_path: relatedProduct.img_path,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        });
        await cartItem.deleteMany({user: req.user._id});
        await cartItem.bulkWrite(cartItems.map(item => {
            return{
                updateOne: {
                    filter: {
                        user: req.user._id,
                        product: item.product
                    },
                    update: item,
                    upsert: true
                }
            }
        }));

        return res.json(cartItem)

    } catch(err) {
        if(err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
    }
}

const index = async(req, res, next) => {
    try {
        let items = await cartItem.find({user: req.user._id}).populate('product')
        return res.json(items)
    }catch(err) {
        if(err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

module.exports = {
    update,
    index
}