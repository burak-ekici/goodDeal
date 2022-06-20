const { model } = require('mongoose')

const ItemListModel = model(
  "AmazonWarehouseitemsListCollection", //nom du model
  { // model pour chaque document
    itemName: {
      type: String,
      required: true
    },
    maxPrice : {
      type: Number,
      required : true
    }
  },
  "itemList" // selection de la table
);

module.exports = { ItemListModel }