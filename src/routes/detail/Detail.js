import React from 'react';
import { connect } from 'dva';
import style from './Detail.css';


class Detail extends React.Component{
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
      <div className={style.detail}>
        <div className={style.num}>详情页里的计数为{this.props.counter}</div>
      </div>
    );
  }
}

Detail.propTypes = {
};


export default connect(({ counter }) => ({
  counter
}))(Detail);
