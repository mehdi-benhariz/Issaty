import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './demand.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDemandDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DemandDetail = (props: IDemandDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { demandEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="demandDetailsHeading">
          <Translate contentKey="issatyApp.demand.detail.title">Demand</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="issatyApp.demand.id">Id</Translate>
            </span>
          </dt>
          <dd>{demandEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="issatyApp.demand.status">Status</Translate>
            </span>
          </dt>
          <dd>{demandEntity.status}</dd>
          <dt>
            <Translate contentKey="issatyApp.demand.student">Student</Translate>
          </dt>
          <dd>{demandEntity.student ? demandEntity.student.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/demand" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/demand/${demandEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ demand }: IRootState) => ({
  demandEntity: demand.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DemandDetail);
