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
import { getEntity, updateEntity, createEntity, reset } from './admin.reducer';
import { IAdmin } from 'app/shared/model/admin.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAdminUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdminUpdate = (props: IAdminUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { adminEntity, profiles, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/admin');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProfiles();
    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...adminEntity,
        ...values,
        profile: profiles.find(it => it.id.toString() === values.profileId.toString()),
        user: users.find(it => it.id.toString() === values.userId.toString()),
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
          <h2 id="issatyApp.admin.home.createOrEditLabel" data-cy="AdminCreateUpdateHeading">
            <Translate contentKey="issatyApp.admin.home.createOrEditLabel">Create or edit a Admin</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : adminEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="admin-id">
                    <Translate contentKey="issatyApp.admin.id">Id</Translate>
                  </Label>
                  <AvInput id="admin-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="isSuperLabel">
                  <AvInput id="admin-isSuper" data-cy="isSuper" type="checkbox" className="form-check-input" name="isSuper" />
                  <Translate contentKey="issatyApp.admin.isSuper">Is Super</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="roleLabel" for="admin-role">
                  <Translate contentKey="issatyApp.admin.role">Role</Translate>
                </Label>
                <AvInput
                  id="admin-role"
                  data-cy="role"
                  type="select"
                  className="form-control"
                  name="role"
                  value={(!isNew && adminEntity.role) || 'IT'}
                >
                  <option value="IT">{translate('issatyApp.AdminRole.IT')}</option>
                  <option value="FINANCE">{translate('issatyApp.AdminRole.FINANCE')}</option>
                  <option value="STUDENT">{translate('issatyApp.AdminRole.STUDENT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="admin-profile">
                  <Translate contentKey="issatyApp.admin.profile">Profile</Translate>
                </Label>
                <AvInput id="admin-profile" data-cy="profile" type="select" className="form-control" name="profileId">
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
                <Label for="admin-user">
                  <Translate contentKey="issatyApp.admin.user">User</Translate>
                </Label>
                <AvInput id="admin-user" data-cy="user" type="select" className="form-control" name="userId">
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
              <Button tag={Link} id="cancel-save" to="/admin" replace color="info">
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
  adminEntity: storeState.admin.entity,
  loading: storeState.admin.loading,
  updating: storeState.admin.updating,
  updateSuccess: storeState.admin.updateSuccess,
});

const mapDispatchToProps = {
  getProfiles,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdate);
