const data = require('../data.json')
let products = data.products

function getProducts(req, res) {
    res.send(products)
}

function getProductById(req, res) {
    const id = +req.params.id
    const product = products.find((product) => product.id === id)
    console.log(product)
    res.send(product)
}

function addProduct(req, res) {
    let productToBeSaved = {
        ...req.body,
        id: products.length + 1
    }
    products.push(productToBeSaved)
    res.send(productToBeSaved)
}

module.exports = { getProducts, getProductById, addProduct }