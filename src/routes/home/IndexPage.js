import React from 'react';
import { connect } from 'dva';
import style from './IndexPage.css';
import Counter from '@/components/counter/Counter.js'
import { Link } from 'dva/router'


class IndexPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  UNSAFE_componentWillMount(){
    
  }
  componentDidMount(){
    global.ajax.get('/api/user', {}).then(res=>{
      let users = res.users;
      this.setState({
        users
      })
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
      <div className={style.container}>
        <div className={style.num}>{this.props.counter}</div>
        <Counter></Counter>
        <Link to='/detail'>详情</Link>
      </div>
    );
  }
}

IndexPage.propTypes = {
};


export default connect(({ counter }) => ({
  counter
}))(IndexPage);
