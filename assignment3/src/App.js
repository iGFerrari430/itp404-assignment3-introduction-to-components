import React from 'react';
import axios from 'axios';
import './App.css';
import Loader from './Loader'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      searchText: '',
      searchHistory: [],
      clickCount: 0,
      subredditName: ''
    }
  }

  async componentDidMount() {

  }

  handleInputChange = e => {
    this.setState({
      searchText: e.target.value
    })
  }
  handleSearch = async(str,isAdd) => {
    let val = str.trim();
    let url = `https://www.reddit.com/r/${val}.json`
    let res = null;
    if (isAdd) this.state.searchHistory.push(val);
    try {
      await this.setState({
        loading: true
      })
      res = await axios.get(url);
      console.log(res);
    }catch(e){
      return;
    }
    
    
    await this.setState({
      data: res.data.data.children,
      loading: false
    })
    console.log(this.state);

    this.state.data.map((post,index) => {
      console.log(index);
      console.log(post);
    })
  }

  renderSearchHistory = () => {
    let {searchHistory} = this.state;
    return (
      <div>
        <h4>Your Search History: </h4>
        {searchHistory.length == 0 ? <div>{"you didn't make any search yet!"}</div>
          : <div>
              {
                searchHistory.map((val,index) => (
                  <div key={index}>
                    <div style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer"
                    }} onClick={() => this.handleSearch(val,false)}>
                      {val}
                    </div>
                  </div>
                ))
              }
            </div>
        }
        <h4>Also, post click count: {this.state.clickCount}</h4>
      </div>
    );
  }
  onLinkClick = () => {
    let cc = this.state.clickCount+1;
    this.setState({
      clickCount: cc
    })
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="container" style={{marginLeft: "20%",marginRight: "20%"}}>
          {this.renderSearchHistory()}
          <input type="text" value={this.state.searchText} onChange={this.handleInputChange} />
          <button onClick={() => this.handleSearch(this.state.searchText,true)}>search subreddit</button>
          <Loader/>
        </div>
      )
    }else{
      return (
        <div className="container">
          <div style={{marginLeft: "20%",marginRight: "20%"}}>
            {this.renderSearchHistory()}
            <input type="text" value={this.state.searchText} onChange={this.handleInputChange} />
            <button onClick={() => this.handleSearch(this.state.searchText,true)}>search subreddit</button>
            {this.state.data.length != 0 && <div><h4>Subscribers count: {this.state.data[0].data.subreddit_subscribers.toLocaleString()}</h4></div>}
            {
              this.state.data.map((post,index) => (
                <div key={index} style={{borderBottom: "1px solid black"}}>
                  <a href={post.data.url} target="_blank" onClick={this.onLinkClick}><strong><p>{post.data.title}</p></strong></a>
                  <p>Author: {post.data.author}</p>
                  <p>ups: {post.data.ups.toLocaleString()}</p>
                  {
                    post.data.num_comments > 0 ? "comment count: "+post.data.num_comments.toLocaleString()
                    : "No comments"
                  }
                </div>
              ))
            }
          </div>
        </div>

      );
    }
  }
}


export default App;
