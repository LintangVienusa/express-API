const Categories = require('./model');

const store = async(req, res, next) => {
    try {
        let payload = req.body;
        let categories = new Categories(payload);
        await categories.save();
        return res.json();
    }catch(err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

const update = async(req, res, next) => {
    try {
        let payload = req.body
        let categories = await Categories.findByIdAndUpdate(req.params.id, payload, {new: true, runValidators: true});
        return res.json(categories);
    }catch(err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

const destroy = async(req, res, next) => {
    try {
        let categories = await Categories.findByIdAndDelete(req.params.id)
        return res.json(categories);
    } catch(err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}

const index = async(req, res, next) => {
    try {
        let categories = await Categories.find();
        return res.json(categories);
    }catch(err) {
        if(err && err.name === 'ValidationError') {
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
    store,
    index,
    update,
    destroy
}