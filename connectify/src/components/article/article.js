import './article.css';

function Articles({ children, title, image, side }) {

    let displayImage = <img src={image} alt="actu" />
    if (side === "left") {
        return (
            <div className="articlePart">
                <div className="divImage">{displayImage}</div>
                <div className="divText left">
                    <h2>{title}</h2>
                    <div className="paragraph">{children}</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="articlePart">
                <div className="divText right">
                    <h2>{title}</h2>
                    <div className="paragraph">{children}</div>
                </div>
                <div className="divImage">{displayImage}</div>
            </div>
        )
    }
}

export default Articles;