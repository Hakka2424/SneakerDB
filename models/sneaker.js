var mongoose = require("mongoose");

var sneakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: Date, required: true }
});

// A helper method to list all sneakers
sneakerSchema.statics.listAllSneakers = function() {
    return this.find({});
};

var sneakerModel = mongoose.model('sneaker', sneakerSchema);

module.exports = sneakerModel;
