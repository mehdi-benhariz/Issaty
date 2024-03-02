// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './admin.reducer';
import { IAdmin } from 'app/shared/model/admin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdminProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Admin = (props: IAdminProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { adminList, match, loading } = props;
  return (
    <div>
      <h2 id="admin-heading" data-cy="AdminHeading">
        <Translate contentKey="issatyApp.admin.home.title">Admins</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="issatyApp.admin.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="issatyApp.admin.home.createLabel">Create new Admin</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {adminList && adminList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="issatyApp.admin.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.admin.isSuper">Is Super</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.admin.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.admin.profile">Profile</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.admin.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {adminList.map((admin, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${admin.id}`} color="link" size="sm">
                      {admin.id}
                    </Button>
                  </td>
                  <td>{admin.isSuper ? 'true' : 'false'}</td>
                  <td>
                    <Translate contentKey={`issatyApp.AdminRole.${admin.role}`} />
                  </td>
                  <td>{admin.profile ? <Link to={`profile/${admin.profile.id}`}>{admin.profile.id}</Link> : ''}</td>
                  <td>{admin.user ? admin.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${admin.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${admin.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${admin.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="issatyApp.admin.home.notFound">No Admins found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ admin }: IRootState) => ({
  adminList: admin.entities,
  loading: admin.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
