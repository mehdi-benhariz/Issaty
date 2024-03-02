import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profile.reducer';
import { IProfile } from 'app/shared/model/profile.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfileUpdate = (props: IProfileUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { profileEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/profile');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.birthDate = convertDateTimeToServer(values.birthDate);

    if (errors.length === 0) {
      const entity = {
        ...profileEntity,
        ...values,
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
          <h2 id="issatyApp.profile.home.createOrEditLabel" data-cy="ProfileCreateUpdateHeading">
            <Translate contentKey="issatyApp.profile.home.createOrEditLabel">Create or edit a Profile</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : profileEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="profile-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="profile-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="profile-firstName">
                  <Translate contentKey="issatyApp.profile.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="profile-firstName"
                  data-cy="firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="profile-lastName">
                  <Translate contentKey="issatyApp.profile.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="profile-lastName"
                  data-cy="lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="birthDateLabel" for="profile-birthDate">
                  <Translate contentKey="issatyApp.profile.birthDate">Birth Date</Translate>
                </Label>
                <AvInput
                  id="profile-birthDate"
                  data-cy="birthDate"
                  type="datetime-local"
                  className="form-control"
                  name="birthDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.profileEntity.birthDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="profile-address">
                  <Translate contentKey="issatyApp.profile.address">Address</Translate>
                </Label>
                <AvField id="profile-address" data-cy="address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="profilePicLabel" for="profile-profilePic">
                  <Translate contentKey="issatyApp.profile.profilePic">Profile Pic</Translate>
                </Label>
                <AvField id="profile-profilePic" data-cy="profilePic" type="text" name="profilePic" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="profile-email">
                  <Translate contentKey="issatyApp.profile.email">Email</Translate>
                </Label>
                <AvField id="profile-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/profile" replace color="info">
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
  profileEntity: storeState.profile.entity,
  loading: storeState.profile.loading,
  updating: storeState.profile.updating,
  updateSuccess: storeState.profile.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);
