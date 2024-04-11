import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Profile from './profile';
import Teacher from './teacher';
import Department from './department';
import Subject from './subject';
import Group from './group';
import Student from './student';
import Admin from './admin';
import Demand from './demand';
import Document from './document';
import Major from './major';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}profile`} component={Profile} />
      <ErrorBoundaryRoute path={`${match.url}teacher`} component={Teacher} />
      <ErrorBoundaryRoute path={`${match.url}department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}subject`} component={Subject} />
      <ErrorBoundaryRoute path={`${match.url}group`} component={Group} />
      <ErrorBoundaryRoute path={`${match.url}student`} component={Student} />
      <ErrorBoundaryRoute path={`${match.url}admin`} component={Admin} />
      <ErrorBoundaryRoute path={`${match.url}demand`} component={Demand} />
      <ErrorBoundaryRoute path={`${match.url}document`} component={Document} />
      <ErrorBoundaryRoute path={`${match.url}major`} component={Major} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
