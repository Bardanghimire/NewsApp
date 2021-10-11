import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    static defaultProps = {
        pagesize: 8,
        country: "in",
        category: "general"

    };
    static propTypes = {
        pagesize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }
    capitalize = (string) => {
        let lowercase = string.toLowerCase()
        return lowercase.charAt(0).toUpperCase() + lowercase.slice(1)
    }
    constructor(props) {
        super(props)
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - iNews`
    }
    async update() {
        this.props.setProgress(20)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state}&pagesize=${this.props.pagesize}`
        this.props.setProgress(50)
        this.setState({loading: true})
        let data = await fetch(url);
        this.props.setProgress(75)
        let parsedData = await data.json();
        this.setState({
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state}&pagesize=${this.props.pagesize}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            article: this.state.article.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };
    async componentDidMount() {
        this.update()
    }
    render() {
        return (
            <>
                <div className="text-center my-3">
                    {this.state.loading && <Spinner />}
                </div>
                <div className="container my-3">
                    <h1 className="text-center my-4">iNews - Top {this.capitalize(this.props.category)} headlings</h1>
                    <InfiniteScroll
                        dataLength={this.state.article.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.article.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">

                            <div className="row">
                                {this.state.article.map((e) => {
                                    return <div className="col-md-4" key={e.url}>
                                        <NewsItem
                                            title={e.title}
                                            description={e.description}
                                            imgUrl={e.urlToImage}
                                            newsURL={e.url}
                                            author={e.author}
                                            date={e.publishedAt}
                                            source={e.source.name}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}

export default News
