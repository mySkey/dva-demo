import React from 'react';
// import PropTypes from 'prop-types';
import style from './Counter.css'
import { connect } from 'dva'

class Counter extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  add(){
    this.props.dispatch({ type: 'counter/add' })
  }
  reduce(){
    if (this.props.counter <= 0){
      alert('我也是有底线的！')
      return;
    }
    this.props.dispatch({ type: 'counter/reduce' })
  }
  render(){
    return (
      <div className={style.counter}>
        <div className={style.reduce} onClick={()=>this.reduce()}>-</div>
        <div className={style.num}>{this.props.counter}</div>
        <div className={style.add} onClick={()=>this.add()}>+</div>
      </div>
    );
  }
};

// Counter.propTypes = {
//   counter: PropTypes.number.isRequired
// };

export default connect(({counter})=>({
  counter
}))(Counter);