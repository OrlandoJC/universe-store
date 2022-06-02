import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSoccerBall } from "@fortawesome/free-solid-svg-icons"

const CategoryList = () => {
    return (
        <>
            {
                props.categories
                    .map(category => <div className="category"> <FontAwesomeIcon icon = {faSoccerBall}/> </div>)
            }
        </>
    )
}

CategoryList.defaultProps = {
    categories: [
        { name: "casual", icon: "" }, 
        { name: "depor", icon: "d" }
    ]
}


