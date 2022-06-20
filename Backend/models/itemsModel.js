const { model } = require('mongoose')

const TimeNow = new Date(Date.now())

const ItemsModel = model(
  "AmazonWarehouseitemsCollection", //nom du model
  { // model pour chaque document
    item: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    information : {
      type : String,
      required : false
    },
    seller:{
      type: String,
      required: true
    },
    date: {
      type: String,
      default : `${ TimeNow.toDateString() } ${ TimeNow.toLocaleTimeString() } `
    }
  },
  "items" // selection de la table
);

module.exports = { ItemsModel }