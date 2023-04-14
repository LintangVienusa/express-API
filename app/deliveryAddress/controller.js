const deliveryAddress = require('./model')

const store = async (req, res, next) => {
    try {
        let payload = req.body
        let user = req.user
        let address = new deliveryAddress({...payload, user: user._id})
        await address.save()

        return res.json(address)

    } catch(err) {
        if(err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err); 
    }
}

module.exports = {
    store
}