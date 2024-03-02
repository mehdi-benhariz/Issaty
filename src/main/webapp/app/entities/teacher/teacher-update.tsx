import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProfile } from 'app/shared/model/profile.model';
import { getEntities as getProfiles } from 'app/entities/profile/profile.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './teacher.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITeacherUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TeacherUpdate = (props: ITeacherUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { teacherEntity, profiles, users, departments, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/teacher');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProfiles();
    props.getUsers();
    props.getDepartments();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...teacherEntity,
        ...values,
        profile: profiles.find(it => it.id.toString() === values.profileId.toString()),
        user: users.find(it => it.id.toString() === values.userId.toString()),
        chefOfDepartment: departments.find(it => it.id.toString() === values.chefOfDepartmentId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="issatyApp.teacher.home.createOrEditLabel" data-cy="TeacherCreateUpdateHeading">
            <Translate contentKey="issatyApp.teacher.home.createOrEditLabel">Create or edit a Teacher</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : teacherEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="teacher-id">
                    <Translate contentKey="issatyApp.teacher.id">Id</Translate>
                  </Label>
                  <AvInput id="teacher-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="gradeLabel" for="teacher-grade">
                  <Translate contentKey="issatyApp.teacher.grade">Grade</Translate>
                </Label>
                <AvInput
                  id="teacher-grade"
                  data-cy="grade"
                  type="select"
                  className="form-control"
                  name="grade"
                  value={(!isNew && teacherEntity.grade) || 'A'}
                >
                  <option value="A">{translate('issatyApp.Grade.A')}</option>
                  <option value="B">{translate('issatyApp.Grade.B')}</option>
                  <option value="C">{translate('issatyApp.Grade.C')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="isChefLabel">
                  <AvInput id="teacher-isChef" data-cy="isChef" type="checkbox" className="form-check-input" name="isChef" />
                  <Translate contentKey="issatyApp.teacher.isChef">Is Chef</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="bureauLabel" for="teacher-bureau">
                  <Translate contentKey="issatyApp.teacher.bureau">Bureau</Translate>
                </Label>
                <AvField id="teacher-bureau" data-cy="bureau" type="text" name="bureau" />
              </AvGroup>
              <AvGroup>
                <Label for="teacher-profile">
                  <Translate contentKey="issatyApp.teacher.profile">Profile</Translate>
                </Label>
                <AvInput id="teacher-profile" data-cy="profile" type="select" className="form-control" name="profileId">
                  <option value="" key="0" />
                  {profiles
                    ? profiles.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="teacher-user">
                  <Translate contentKey="issatyApp.teacher.user">User</Translate>
                </Label>
                <AvInput id="teacher-user" data-cy="user" type="select" className="form-control" name="userId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="teacher-chefOfDepartment">
                  <Translate contentKey="issatyApp.teacher.chefOfDepartment">Chef Of Department</Translate>
                </Label>
                <AvInput
                  id="teacher-chefOfDepartment"
                  data-cy="chefOfDepartment"
                  type="select"
                  className="form-control"
                  name="chefOfDepartmentId"
                >
                  <option value="" key="0" />
                  {departments
                    ? departments.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/teacher" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  profiles: storeState.profile.entities,
  users: storeState.userManagement.users,
  departments: storeState.department.entities,
  teacherEntity: storeState.teacher.entity,
  loading: storeState.teacher.loading,
  updating: storeState.teacher.updating,
  updateSuccess: storeState.teacher.updateSuccess,
});

const mapDispatchToProps = {
  getProfiles,
  getUsers,
  getDepartments,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TeacherUpdate);
