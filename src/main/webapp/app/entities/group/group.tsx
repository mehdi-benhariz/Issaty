// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './group.reducer';
import { IGroup } from 'app/shared/model/group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Group = (props: IGroupProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { groupList, match, loading } = props;
  return (
    <div>
      <h2 id="group-heading" data-cy="GroupHeading">
        <Translate contentKey="issatyApp.group.home.title">Groups</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="issatyApp.group.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="issatyApp.group.home.createLabel">Create new Group</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {groupList && groupList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="issatyApp.group.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.group.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.group.emploi">Emploi</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.group.subject">Subject</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.group.document">Document</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.group.major">Major</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {groupList.map((group, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${group.id}`} color="link" size="sm">
                      {group.id}
                    </Button>
                  </td>
                  <td>{group.name}</td>
                  <td>{group.emploi ? <Link to={`document/${group.emploi.id}`}>{group.emploi.id}</Link> : ''}</td>
                  <td>{group.subject ? <Link to={`subject/${group.subject.id}`}>{group.subject.id}</Link> : ''}</td>
                  <td>{group.document ? <Link to={`document/${group.document.id}`}>{group.document.id}</Link> : ''}</td>
                  <td>{group.major ? <Link to={`major/${group.major.id}`}>{group.major.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${group.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${group.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${group.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="issatyApp.group.home.notFound">No Groups found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ group }: IRootState) => ({
  groupList: group.entities,
  loading: group.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Group);
