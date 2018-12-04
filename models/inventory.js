const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const inventorySchema = mongoose.Schema({
	item:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	itemCategory:{
		type: String,
		required: true
	}
})

inventorySchema.methods.serialize = function() {
	return {
		id: this._id,
		item: this.item,
		description: this.description,
		itemCategory: this.itemCategory
	}
}

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = { Inventory };