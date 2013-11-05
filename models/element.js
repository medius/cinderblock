module.exports = function(mongoose) {
  var collection = 'elements';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    elementID: ObjectId,
    className: String,
    idName: String,
    posX: Number,
    posY: Number
  });

  this.model = mongoose.model(collection, schema);

  return this;
};