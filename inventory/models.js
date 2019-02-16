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
	location:{
		type: String,
		required: true
	},
	category:{
		type: String,
		required: true
	},
	decision:{
		type: String,
		required: true
	}

})

inventorySchema.methods.serialize = function() {
	return {
		id: this._id,
		item: this.item,
		description: this.description,
		location: this.location,
		category: this.category,
		decision: this.decision
	}
}

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = { Inventory };