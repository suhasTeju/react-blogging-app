import React, { Component } from 'react';

import './FullPost.css';
import axios from '../../axios';

class FullPost extends Component {
    state= {
        title:null,
        body:null,
        id: null,
        error:false
    }
    componentDidUpdate() {
        if((this.props.id && this.state.id === null && !this.state.error)|| (this.state.id !== this.props.id && !this.state.error)){
            axios.get("/posts/"+ this.props.id).then(
                response => {
                    this.setState({title:response.data.title,body:response.data.body,id:response.data.id})
                }
            ).catch(error => {
                    this.setState({error:true})
            })
        }
    }
    render () {
        let post = <p>loading</p>
        if (this.state.error){
            post= <p>somethign went wrong</p>

        }
        else{
           post =  this.props.id ?(
                <div className="FullPost">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            ): <p style={{textAlign: "center"}}>Please select a Post!</p>
        }
        return post;
    }
}

export default FullPost;