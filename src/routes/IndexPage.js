import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Example from '../components/Example.js'

@connect(({ counter }) => ({
  counter
}))
class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount(){
    global.ajax.get('/api/user', {}).then(res=>{
      console.log(res.users)
    })
  }
  add(){
    this.props.dispatch({ type: 'counter/add' })
  }
  reduce(){
    this.props.dispatch({ type: 'counter/reduce' })
  }
  render(){
    return (
      <div className={styles.normal}>
        <h1 onClick={()=>this.add()} className={styles.title}>Yay! Welcome to dva!</h1>
        <div onClick={()=>this.reduce()} className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
        <Example counter={this.props.counter}></Example>
      </div>
    );
  }
}

IndexPage.propTypes = {
};


export default IndexPage;
