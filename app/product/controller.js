const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');
const Categories = require('../categories/model');
const Tag = require('../tag/model');

const store = async (req, res, next) => { 
    try{
        let payload = req.body;

        // Relation with categories
        if(payload.categories) {
            let categories = await Categories.findOne({name: {$regex: payload.categories, $options: 'i'}})
            if(categories) {
                payload = {...payload, categories: categories._id}
            }else {
                delete payload.categories
            }

        }

        // Relation with Tags
        if(payload.tags && payload.length > 0) {
            let tags = await Tag.findOne({name: {$regex: payload.categories, $options: 'i'}})
            if(categories) {
                payload = {...payload, categories: categories._id}
            }else {
                delete payload.categories
            }

        }

        if(req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {

                    let product = new Product({ ...payload, img_path: filename})
                    await product.save()
                    return res.json(product);
                } catch(err) {
                    fs.unlinkSync(target_path);
                    if(err && err.name == 'ValidationError') {
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    next(err);
                }
            });
            src.on('error', async () =>{
                next(err)
            });
        }else{
            let product = new Product(payload);
            await product.save();
            return res.json(product)

        }
    } catch(err){
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

const index = async (req, res, next) => {
    try {
        let { skip = 0, limit = 10 } = req.query;
        let product = await Product
        .find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('categories');
        return res.json(product);
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try{
        let { id }= req.params;
        let payload = req.body;

        // Relation with categories
        if(payload.categories) {
            let categories = await Categories.findOne({name: {$regex: payload.categories, $options: 'i'}})
            if(categories) {
                payload = {...payload, categories: categories._id}
            }else {
                delete payload.categories
            }

        }

        if(req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {

                    let product = await Product.findById(id)
                    let currImg = `${config.rootPath}/public/images/products/${product.img_path}`

                    if(fs.existsSync(currImg)) {
                        fs.unlinkSync(currImg);
                    }

                    product = await Product.findByIdAndUpdate(id, payload, {
                        new: true,
                        runValidators: true
                    });
                    return res.json(product);
                } catch(err) {
                    fs.unlinkSync(target_path);
                    if(err && err.name == 'ValidationError') {
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }

                    next(err);
                }
            });
            src.on('error', async () =>{
                next(err)
            });
        }else{
            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true
            });
            return res.json(product)

        }
    } catch(err){
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

const destroy = async (req, res, next) => {
    try {
        let product = await Product.findByIdAndDelete(req.params.id)
        let currImg = `${config.rootPath}/public/images/products/${product.img_path}`

        if(fs.existsSync(currImg)) {
            fs.unlinkSync(currImg);
        }
        return res.json(product);
    } catch(err) {
        next(err);
    }
}

module.exports = {
    store,
    index,
    update,
    destroy
}