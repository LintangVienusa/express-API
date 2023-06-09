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
        if(payload.tags && payload.tags.length > 0) {
            let tags = await Tag.find({name: {$in: payload.tags }})
            if(tags.length) {
                payload = {...payload, tags: tags.map(tags => tags._id)}
            }else {
                delete payload.tags
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
        let { skip = 0, limit = 10, q = '', categories = '', tags = [''] } = req.query;

        let criteria = {};

        if(q.length) {
            criteria = {
                ...criteria,
                productName: {$regex: `${q}`, $options: 'i'}
            }
        }

        if(categories.length) {
            let categoryResults = await Categories.findOne({name: {$regex: categories, $options: 'i'}})

            if(categories) {
                criteria = {...criteria, categories: categoryResults._id}
            }
        }

        if(tags.length) {
            let tagResult = await Tag.find({name: {$in: tags }})
            if(tagResult.length > 0) {
                criteria = {
                    ...criteria, 
                    tags: {$in: tagResult.map(tags => tags._id)}
                }
            }
        }
        
        let count = await Product.find().countDocuments()
        let product = await Product
        .find(criteria)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('categories')
        .populate('tags');
        return res.json({
            data: product,
            count: count
        });
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

        // Relation with tags
        if(payload.tags && payload.tags.length > 0) {
            let tags = await Tag.find({name: {$in: payload.tags }})
            if(tags.length) {
                payload = {...payload, tags: tags.map(tags => tags._id)}
            }else {
                delete payload.tags
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