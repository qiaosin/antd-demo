import React, {PropTypes} from 'react';
import { Router, Route,IndexRoute, Link ,hashHistory} from 'react-router';
import App from '../components/app';
import NotFound from '../components/notFound';
import UserList from '../components/user/userList.jsx';
import UserEdit from '../components/user/userEdit.jsx';
import Test from '../components/test';
import Home from '../components/home';
import Report from '../components/reports/report'
import * as path from '../constant/uriConfig';

const Routes = ({}) =>
  <Router history={hashHistory}>
        <Route path="/xxxx" component={Home}/>
        <Route path="/" component={App}>
            ＜IndexRedirect to={path.URI_HOME} />
            <Route path={path.URI_HOME} component={Home} />
            // <IndexRoute component={Home} />
            <Route path={path.URI_USER_LIST} component={UserList}/>
            <Route path={path.URI_SAVE_OR_UPDATE_USER + '(/:id)'} component={UserEdit} />
            <Route path={path.URI_REPORTS} component={Report} />
            <Route path="*" component={NotFound}/>
        </Route>
  </Router>

Routes.propTypes = {

};

export default Routes;
