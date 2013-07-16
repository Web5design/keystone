/*!
 * Module dependencies.
 */

var util = require('util'),
	moment = require('moment'),
	utils = require('../utils'),
	super_ = require('../field');

/**
 * Date FieldType Constructor
 * @extends Field
 * @api public
 */

function date(list, path, options) {
	this._nativeType = Date;
	date.super_.call(this, list, path, options);
};

/*!
 * Inherit from Field
 */
 
util.inherits(date, super_);

/**
 * Formats the field value
 * 
 * @api public
 */
date.prototype.format = function(item, format) {
	return item.get(this.path) ? moment(item.get(this.path)).format(format || 'YYYY-MM-DD') : '';
}

/**
 * Validates that a valid date has been provided in a data object
 * 
 * @api public
 */
date.prototype.validateInput = function(data) {
	if (data[this.path])
		return moment(data[this.path]).isValid();
	else
		return false;
}

/**
 * Updates the value for this field in the item from a data object
 * 
 * @api public
 */
date.prototype.updateItem = function(item, data) {
	if (data[this.path]) {
		var newValue = moment(data[this.path]);
		item.set(this.path, newValue.isValid() ? newValue.toDate() : null);
	} else if (item.get(this.path)) {
		item.set(this.path, null);
	}
}

exports = module.exports = date;