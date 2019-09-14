import React from 'react';
import axios from 'axios';
import './App.css';
import Loader from './Loader'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      data: []
    }
  }

  async componentDidMount() {
    let url = "https://www.reddit.com/r/dota2.json"
    let res = await axios.get(url);
    
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

  render() {
    if (this.state.loading) {
      return (
        <Loader/>
      )
    }else{
      return (
        <div style={{marginLeft: "20%",marginRight: "20%"}}>
          <h2>r/dota2</h2>
          <h4>Subscribers count: {this.state.data[0].data.subreddit_subscribers.toLocaleString()}</h4>
          {
            this.state.data.map((post,index) => (
              <div key={index} style={{borderBottom: "1px solid black"}}>
                <a href={post.data.url}><strong><p>{post.data.title}</p></strong></a>
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
      );
    }
  }
}


export default App;
