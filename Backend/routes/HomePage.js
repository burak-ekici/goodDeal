const express = require('express')
const router = express.Router()
const puppeteer = require('puppeteer');
const { ItemsModel } = require('../models/itemsModel.js')
const { ItemListModel } = require('../models/itemListModel.js')

router.get('/item/:name/:price', async(req, res)=>{
  let itemsFound = []
  let itemsUnderPrice = []
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://amazon.fr', {waitUntil: "networkidle2"});
  await page.type('#twotabsearchtextbox', req.params.name)
  await page.select('#searchDropdownBox', 'search-alias=warehouse-deals')
  await page.keyboard.press('Enter')
  await page.waitForSelector('.sg-row .sg-col .sg-col-inner div .a-size-base.a-color-secondary span.a-color-base')
  const b = await page.$$eval('.sg-row .sg-col .sg-col-inner div .a-size-base.a-color-secondary span.a-color-base' , spans => {
    return [...spans].map(span => {
      return span.innerHTML.split(',')[0]
    })
  })
  console.log(b.length)
  const c = await page.$$eval('span.a-size-medium.a-color-base.a-text-normal' , items => {
    return [...items].map(item => {
      return item.innerHTML
    })
  })
  console.log(c.length)
  for(let i = 0; i < c.length ; i++){
    itemsFound.push({ itemName : c[i] , price : b[i]})
  }
  itemsFound.map(el => {
    +req.params.price > +el.price ? itemsUnderPrice.push(el) : ''
  })
  console.log(itemsUnderPrice)
  // await browser.close()
  res.send('ok')
})


router.post('/addItem', async (req,res)=>{
  const itemToAdd = new ItemListModel({
    itemName: req.body.itemName,
    maxPrice: req.body.maxPrice,
  })

  itemToAdd.save((err, docs)=>{
    if(!err) res.send(docs)
    else console.log('error creating new Data :' , err)
  })
})

router.get('/getItems', async (req,res)=>{
  const items = await ItemListModel.find({})
  if(items && items.length > 0){
    res.send(items)
  }
  
})

router.delete('/item/:item', (req,res)=> {

  ItemListModel.findOneAndDelete({itemName : req.params.item}, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted item : ", docs);
        res.send(docs)
    }
  })

})
  
  


module.exports = router