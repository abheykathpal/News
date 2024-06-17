import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types' 
export class News extends Component {
  static defaultProps = { 
    country: 'in',  
    pageSize: 5,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

    constructor(){
        super();
        console.log("Hello I am a constructor from news component");
        this.state= {
           articles: [],
           loading: false,
           page : 1
        }
    }
    
   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b19f1108793c4b2fa6731e1c610e8f4e&page1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({articles: parseData.articles,
           totalResults: parseData.totalResults,
          loading: false})
    }
        
    handlePrev = async ()=>{
      console.log("prev");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b19f1108793c4b2fa6731e1c610e8f4e&page=${this.state.page - 1}&pageZize=${this.props.pageSize}`;
      this.setState({loading: true});  
      let data = await fetch(url);
        let parseData = await data.json()
      this.setState({
        page: this.state.page - 1,
        articles: parseData.articles,
        loading: false
      })
    }

    handleNext = async ()=>{
      console.log("Next");
      if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b19f1108793c4b2fa6731e1c610e8f4e&page=${this.state.page + 1} &pageZize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parseData = await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    
    }
  }
    
  render() {
    return (
        <div className='container my-3'>
       <h1 className='text-center' style={{margin:'35px 0'}}>NewsDaily - Top Headlines</h1>
       {this.state.loading && <Spinner />}
       <div className='row'>
         {!this.state.loading && this.state.articles.map((e)=>{
            return <div className='col-md-4' key={e.url}>
            <NewsItem title={e.title} description={e.description} imageurl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
            </div>
         })}
       </div>

         
       <div className='cobtainer d-flex justify-content-between my-5'>
        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}
export default News;