import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profile.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProfileDetail = (props: IProfileDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { profileEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="profileDetailsHeading">
          <Translate contentKey="issatyApp.profile.detail.title">Profile</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{profileEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="issatyApp.profile.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{profileEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="issatyApp.profile.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{profileEntity.lastName}</dd>
          <dt>
            <span id="birthDate">
              <Translate contentKey="issatyApp.profile.birthDate">Birth Date</Translate>
            </span>
          </dt>
          <dd>{profileEntity.birthDate ? <TextFormat value={profileEntity.birthDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="issatyApp.profile.address">Address</Translate>
            </span>
          </dt>
          <dd>{profileEntity.address}</dd>
          <dt>
            <span id="profilePic">
              <Translate contentKey="issatyApp.profile.profilePic">Profile Pic</Translate>
            </span>
          </dt>
          <dd>{profileEntity.profilePic}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="issatyApp.profile.email">Email</Translate>
            </span>
          </dt>
          <dd>{profileEntity.email}</dd>
        </dl>
        <Button tag={Link} to="/profile" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/profile/${profileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ profile }: IRootState) => ({
  profileEntity: profile.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);
