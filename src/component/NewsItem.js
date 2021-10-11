import React, { Component } from 'react'
export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsURL, author, date, source } = this.props;
        return (
            <div>
                <div className="card">
                    <img src={imgUrl ? imgUrl : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p><span className="badge bg-danger">{source}</span>
                        <p className="card-text">
                            <small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsURL} target="__blank" className="btn btn-primary btn-sm">Deep dive</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
