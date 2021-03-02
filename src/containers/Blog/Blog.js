import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from 'axios'
class Blog extends Component {
    state = {
        posts: [],
        selectedId : null
    }
    componentDidMount(){
        Axios.get("/posts").then(
            response => {
                const shortData = response.data.slice(0,4)
                const updatedData = shortData.map(post =>(
                    {
                        ...post,
                        author:"suhas"
                    }
                ))
                this.setState({posts:updatedData})
                }
                
                
            
        )
    }
    postDetailhandler = (id) => {
        this.setState({selectedId:id})
    }

    render () {
        let posts  = this.state.posts.map(
            post => (
                <Post title={post.title} 
                key={post.id} 
                clicked={()=>this.postDetailhandler(post.id)}
                author={post.author}/>
            )
        )
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;