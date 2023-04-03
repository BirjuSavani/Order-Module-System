import { DECIMAL, INTEGER } from 'sequelize';
import { createValidationResponse } from '../../../utils/helper/indx.js';
import isLength from 'validator/lib/isLength.js';

class ProductValidation {
    add(req, res, next) {
        let {
            title,
            price,
            // discount_percentage,
            // rating,
            stock,
            brand,
            category,
            thumbnail,
            images
        } = req.body;
        let errors = {};

        if (!title) {
            errors.title = res.__('PRODUCT.VALIDATIONS.title.required');
        } else if (!isLength(title, { min: 1, max: 255 })) {
            errors.title = res.__('PRODUCT.VALIDATIONS.title.valid');
        } else if (typeof title !== 'string') {
            errors.title = res.__('PRODUCT.VALIDATIONS.title.type');
        }

        if (!price) {
            errors.price = res.__('PRODUCT.VALIDATIONS.price.required');
        } else if (!DECIMAL(price)) {
            errors.price = res.__('PRODUCT.VALIDATIONS.price.valid');
        } else if (typeof title !== 'DECIMAL') {
            errors.price = res.__('PRODUCT.VALIDATIONS.price.type');
        }

        if (!stock) {
            errors.stock = res.__('PRODUCT.VALIDATIONS.stock.required');
        } else if (!INTEGER(stock)) {
            errors.stock = res.__('PRODUCT.VALIDATIONS.stock.valid');
        } else if (typeof stock !== 'INTEGER') {
            errors.stock = res.__('PRODUCT.VALIDATIONS.stock.type');
        }

        if (!brand) {
            errors.brand = res.__('PRODUCT.VALIDATIONS.brand.required');
        } else if (!isLength(brand, { min: 1, max: 300 })) {
            errors.brand = res.__('PRODUCT.VALIDATIONS.brand.valid');
        } else if (typeof brand !== 'string') {
            errors.brand = res.__('PRODUCT.VALIDATIONS.brand.type');
        }

        if (!category) {
            errors.category = res.__('PRODUCT.VALIDATIONS.category.required');
        } else if (!isLength(category, { min: 1, max: 350 })) {
            errors.category = res.__('PRODUCT.VALIDATIONS.category.valid');
        } else if (typeof category !== 'string') {
            errors.category = res.__('PRODUCT.VALIDATIONS.category.type');
        }

        if (!thumbnail) {
            errors.thumbnail = res.__('PRODUCT.VALIDATIONS.thumbnail.required');
        } else if (!isLength(thumbnail, { min: 1, max: 355 })) {
            errors.thumbnail = res.__('PRODUCT.VALIDATIONS.thumbnail.valid');
        } else if (typeof thumbnail !== 'string') {
            errors.thumbnail = res.__('PRODUCT.VALIDATIONS.thumbnail.type');
        }

        // if (!images) {
        //     errors.images = res.__('PRODUCT.VALIDATIONS.images.required');
        // } else if (!isLength(images, { min: 1, max: 355 })) {
        //     errors.images = res.__('PRODUCT.VALIDATIONS.images.valid');
        // } else if (typeof images !== 'string') {
        //     errors.images = res.__('PRODUCT.VALIDATIONS.images.type');
        // }

        if (Object.keys(errors).length > 0) {
            createValidationResponse(res, errors);
        } else {
            next();
        }
    }

    update(req, res, next) {
        let {
            title,
            price,
            stock,
            brand,
            category,
            thumbnail,
            images
        } = req.body;
        let errors = {};

        if (!title) {
            errors.title = res.__('PRODUCT.VALIDATIONS.title.required');
        } else if (!isLength(title, { min: 1, max: 255 })) {
            errors.title = res.__('PRODUCT.VALIDATIONS.title.valid');
        } else if (typeof title !== 'string') {
            errors.title = res.__('PRODUCT.VALIDATIONS.title.type');
        }

        if (!price) {
            errors.price = res.__('PRODUCT.VALIDATIONS.price.required');
        } else if (!DECIMAL(price)) {
            errors.price = res.__('PRODUCT.VALIDATIONS.price.valid');
        } else if (typeof title !== 'DECIMAL') {
            errors.price = res.__('PRODUCT.VALIDATIONS.price.type');
        }

        if (!stock) {
            errors.stock = res.__('PRODUCT.VALIDATIONS.stock.required');
        } else if (!INTEGER(stock)) {
            errors.stock = res.__('PRODUCT.VALIDATIONS.stock.valid');
        } else if (typeof stock !== 'INTEGER') {
            errors.stock = res.__('PRODUCT.VALIDATIONS.stock.type');
        }

        if (!brand) {
            errors.brand = res.__('PRODUCT.VALIDATIONS.brand.required');
        } else if (!isLength(brand, { min: 1, max: 300 })) {
            errors.brand = res.__('PRODUCT.VALIDATIONS.brand.valid');
        } else if (typeof brand !== 'string') {
            errors.brand = res.__('PRODUCT.VALIDATIONS.brand.type');
        }

        if (!category) {
            errors.category = res.__('PRODUCT.VALIDATIONS.category.required');
        } else if (!isLength(category, { min: 1, max: 350 })) {
            errors.category = res.__('PRODUCT.VALIDATIONS.category.valid');
        } else if (typeof category !== 'string') {
            errors.category = res.__('PRODUCT.VALIDATIONS.category.type');
        }

        if (!thumbnail) {
            errors.thumbnail = res.__('PRODUCT.VALIDATIONS.thumbnail.required');
        } else if (!isLength(thumbnail, { min: 1, max: 355 })) {
            errors.thumbnail = res.__('PRODUCT.VALIDATIONS.thumbnail.valid');
        } else if (typeof thumbnail !== 'string') {
            errors.thumbnail = res.__('PRODUCT.VALIDATIONS.thumbnail.type');
        }

        // if (!images) {
        //     errors.images = res.__('PRODUCT.VALIDATIONS.images.required');
        // } else if (!isLength(images, { min: 1, max: 355 })) {
        //     errors.images = res.__('PRODUCT.VALIDATIONS.images.valid');
        // } else if (typeof images !== 'string') {
        //     errors.images = res.__('PRODUCT.VALIDATIONS.images.type');
        // }

        if (Object.keys(errors).length > 0) {
            createValidationResponse(res, errors);
        } else {
            next();
        }
    }
}

export default new ProductValidation();