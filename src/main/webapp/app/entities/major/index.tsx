import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Major from './major';
import MajorDetail from './major-detail';
import MajorUpdate from './major-update';
import MajorDeleteDialog from './major-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MajorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MajorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MajorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Major} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MajorDeleteDialog} />
  </>
);

export default Routes;
