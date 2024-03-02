import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './major.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMajorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MajorDetail = (props: IMajorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { majorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="majorDetailsHeading">
          <Translate contentKey="issatyApp.major.detail.title">Major</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{majorEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="issatyApp.major.name">Name</Translate>
            </span>
          </dt>
          <dd>{majorEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="issatyApp.major.description">Description</Translate>
            </span>
          </dt>
          <dd>{majorEntity.description}</dd>
        </dl>
        <Button tag={Link} to="/major" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/major/${majorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ major }: IRootState) => ({
  majorEntity: major.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MajorDetail);
