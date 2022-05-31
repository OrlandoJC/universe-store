const data = [
    {
        id : 1,
        title : "Nike Sportswear",
        description: "Men's T-Shirt",
        descriptionText : "La playera Nike Sportswear tiene un tejido estilo jersey de alta densidad, elaborada con una mezcla de materiales reciclados. El estampado 'from Beaverton with Love' en el pecho se acentúa con una flor bordada y un logotipo Futura. El estampado Have a Nike Day en la parte inferior de la espalda completa el look.",
        price : 1400,
        pictureUrl : "images/shirt.jpg"
    }, 
    {
        id: 2,
        title: "Liverpool F.C. 2022/23",
        description : "Men's Nike Dri-FIT ",
        price: 1200,
        pictureUrl : "images/liverpool.jpg"
    }, 
    {
        id: 3,
        title: "NikeCourt Dri-FIT",
        description : "Men's Tennis T-Shirt",
        price: 1400,
        pictureUrl : "images/koala.jpg"
    }, 
    {
        id: 4,
        title: "Paris Saint-Germain 2022",
        description : "Men's Nike",
        price: 1500,
        pictureUrl : "images/paris.jpg"
    }
]

const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 2000)
    })
}

export const getProduct = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = data.find(product => product.id === id)
            resolve(product)
        }, 1000)
    })
}

export default getProducts;