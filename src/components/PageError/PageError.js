import './PageError.css'

const PageError = () => {
    return (
        <div className="PageError">
            <div className="container_image">
              <img style={{width: "400px"}}src="/images/error.png" alt="" />
              <h1>OPSS.. LA PAGINA QUE BUSCAS NO EXISTE</h1>
            </div>
        </div>
    )
}

export default PageError