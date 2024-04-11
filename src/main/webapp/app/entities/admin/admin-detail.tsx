import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './admin.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAdminDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdminDetail = (props: IAdminDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { adminEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="adminDetailsHeading">
          <Translate contentKey="issatyApp.admin.detail.title">Admin</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="issatyApp.admin.id">Id</Translate>
            </span>
          </dt>
          <dd>{adminEntity.id}</dd>
          <dt>
            <span id="isSuper">
              <Translate contentKey="issatyApp.admin.isSuper">Is Super</Translate>
            </span>
          </dt>
          <dd>{adminEntity.isSuper ? 'true' : 'false'}</dd>
          <dt>
            <span id="role">
              <Translate contentKey="issatyApp.admin.role">Role</Translate>
            </span>
          </dt>
          <dd>{adminEntity.role}</dd>
          <dt>
            <Translate contentKey="issatyApp.admin.profile">Profile</Translate>
          </dt>
          <dd>{adminEntity.profile ? adminEntity.profile.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.admin.user">User</Translate>
          </dt>
          <dd>{adminEntity.user ? adminEntity.user.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/admin" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/admin/${adminEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ admin }: IRootState) => ({
  adminEntity: admin.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail);
