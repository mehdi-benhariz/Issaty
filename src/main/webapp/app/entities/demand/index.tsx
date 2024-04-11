import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Demand from './demand';
import DemandDetail from './demand-detail';
import DemandUpdate from './demand-update';
import DemandDeleteDialog from './demand-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DemandUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DemandUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DemandDetail} />
      <ErrorBoundaryRoute path={match.url} component={Demand} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DemandDeleteDialog} />
  </>
);

export default Routes;
