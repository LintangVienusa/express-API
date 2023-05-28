const { subject } = require('@casl/ability')
const { policyFor } = require('../../utils')
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

const index = async (req, res, next) =>  {
    try {
        let { skip = 0, limit = 10 } = req.query
        let count = await deliveryAddress.find().countDocuments()
        let addresses = await deliveryAddress
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        return res.json({
            data: addresses,
            count: count
        })
    } catch (err) {
        next(err)
    }
}

const update = async(req, res, next) => {
    try {
        let { _id, ...payload } = req.body;
        let { id } = req.params;
        let address = await deliveryAddress.findById(id);
        let policy = policyFor(req.user);
        let subjectAddress = subject('deliveryAdress', {...address, user_id: address.user});

        if(!policy.can('update', subjectAddress)) {
            return res.json({
                error: 1,
                message: `You're not allowed to modify this resource`
            });
        }

        address = await deliveryAddress.findByIdAndUpdate(id, payload, {new: true});
        res.json(address);
    } catch (err) {
        if(err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err)
    }
}

const destroy = async(req, res, next) => {
    try {
        let { _id, ...payload } = req.body;
        let { id } = req.params;
        let address = await deliveryAddress.findById(id);
        let policy = policyFor(req.user);
        let subjectAddress = subject('deliveryAdress', {...address, user_id: address.user});

        if(!policy.can('update', subjectAddress)) {
            return res.json({
                error: 1,
                message: `You're not allowed to delete this resource`
            });
        }

        address = await deliveryAddress.findByIdAndDelete(id);
        res.json(address);
    } catch (err) {
        if(err && err.name == 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err)
    }
}

module.exports = {
    store,
    index,
    update,
    destroy
}