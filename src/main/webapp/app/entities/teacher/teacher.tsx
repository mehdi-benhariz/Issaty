// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Teacher = (props: ITeacherProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { teacherList, match, loading } = props;
  return (
    <div>
      <h2 id="teacher-heading" data-cy="TeacherHeading">
        <Translate contentKey="issatyApp.teacher.home.title">Teachers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="issatyApp.teacher.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="issatyApp.teacher.home.createLabel">Create new Teacher</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {teacherList && teacherList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="issatyApp.teacher.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.teacher.grade">Grade</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.teacher.isChef">Is Chef</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.teacher.bureau">Bureau</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.teacher.profile">Profile</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.teacher.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.teacher.chefOfDepartment">Chef Of Department</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${teacher.id}`} color="link" size="sm">
                      {teacher.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`issatyApp.Grade.${teacher.grade}`} />
                  </td>
                  <td>{teacher.isChef ? 'true' : 'false'}</td>
                  <td>{teacher.bureau}</td>
                  <td>{teacher.profile ? <Link to={`profile/${teacher.profile.id}`}>{teacher.profile.id}</Link> : ''}</td>
                  <td>{teacher.user ? teacher.user.id : ''}</td>
                  <td>
                    {teacher.chefOfDepartment ? (
                      <Link to={`department/${teacher.chefOfDepartment.id}`}>{teacher.chefOfDepartment.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${teacher.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${teacher.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${teacher.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="issatyApp.teacher.home.notFound">No Teachers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherList: teacher.entities,
  loading: teacher.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
