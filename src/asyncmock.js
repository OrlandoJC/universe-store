const data = [
    {
        id : 1,
        title : "Nike Sportswear",
        description: "Men's T-Shirt",
        descriptionText : "La playera Nike Sportswear tiene un tejido estilo jersey de alta densidad, elaborada con una mezcla de materiales reciclados. El estampado 'from Beaverton with Love' en el pecho se acentúa con una flor bordada y un logotipo Futura. El estampado Have a Nike Day en la parte inferior de la espalda completa el look.",
        price : 1400,
        pictureUrl : "/images/shirt.jpg",
        category : "playera"
    }, 
    {
        id: 2,
        title: "Liverpool F.C. 2022/23",
        description : "Men's Nike Dri-FIT ",
        descriptionText: "Como otros jerseys de nuestra colección Stadium, este combina detalles del diseño tipo réplica con una tela absorbente de sudor para darte un look listo para el partido inspirado en tu equipo favorito. Este producto está fabricado al 100% con fibras de poliéster reciclado.",
        price: 1200,
        pictureUrl : "/images/liverpool.jpg",
        category : "playera"
    }, 
    {
        id: 3,
        title: "NikeCourt Dri-FIT",
        description : "Men's Tennis T-Shirt",
        descriptionText : " El diseño reformado de las mangas permite golpear, sacar y tirar por encima de la cabeza sin tener que preocuparte de que la tela se arrugue o te limite en los hombros. El Swoosh celebra su aniversario al unir el pasado y el presente. El Swoosh original aparece sobre la versión actual para representar el camino que ha recorrido Nike. Este producto está fabricado al 100% con fibras de poliéster reciclado",
        price: 1400,
        pictureUrl : "/images/koala.jpg",
        category : "jersey"

    }, 
    {
        id: 4,
        title: "Paris Saint-Germain 2022",
        description : "Men's Nike",
        descriptionText: "Como otros jerseys de nuestra colección Stadium, este combina detalles del diseño tipo réplica con tecnología absorbente de sudor para darte un look listo para el partido inspirado en tu equipo favorito. Este producto está fabricado al 100% con fibras de poliéster reciclado.",
        price: 1500,
        pictureUrl : "/images/paris.jpg",
        category : "sudadera"
    }
]

export const getProducts = () => {
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


export const getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const products = data.filter(product => product.category === category)
            resolve(products)
        }, 1000)
    })
}


