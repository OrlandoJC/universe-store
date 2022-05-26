const data = [
    {
        id : 1,
        title : "Nike Sportswear",
        description: "Men's T-Shirt",
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

export default getProducts;