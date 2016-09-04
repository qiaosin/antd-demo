import React, {Component, PropTypes} from 'react';
import { Button } from 'antd';
import styles from './notFound.less';
import { connect } from 'react-redux';
import {changeRoute} from '../actions/route';
import {URI_HOME} from '../constant/uriConfig';

class NotFound extends Component {
  gotoIndex(e){
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(changeRoute(URI_HOME));
  }

  render(){
    return(
      <div className={styles.normal}>
        <div className={styles.container}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.desc}>未找到该页面</p>
          <Button type="primary" style={{ marginTop: 5 }} onClick={this.gotoIndex.bind(this)}>返回首页</Button>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(NotFound)
