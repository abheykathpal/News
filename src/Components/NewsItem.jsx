import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsUrl, author, date, source} = this.props;
    return (
        <div className="card">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
               {source}</span>
        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-body-secondary">By {!author?"UnKnown": author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className="btn btn-dark" target='_blank'>Read more</a>
        </div>
      </div>
    )
  }
}

export default NewsItem