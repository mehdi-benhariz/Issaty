import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './group.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GroupDetail = (props: IGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { groupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="groupDetailsHeading">
          <Translate contentKey="issatyApp.group.detail.title">Group</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="issatyApp.group.id">Id</Translate>
            </span>
          </dt>
          <dd>{groupEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="issatyApp.group.name">Name</Translate>
            </span>
          </dt>
          <dd>{groupEntity.name}</dd>
          <dt>
            <Translate contentKey="issatyApp.group.emploi">Emploi</Translate>
          </dt>
          <dd>{groupEntity.emploi ? groupEntity.emploi.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.group.subject">Subject</Translate>
          </dt>
          <dd>{groupEntity.subject ? groupEntity.subject.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.group.document">Document</Translate>
          </dt>
          <dd>{groupEntity.document ? groupEntity.document.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.group.major">Major</Translate>
          </dt>
          <dd>{groupEntity.major ? groupEntity.major.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/group" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/group/${groupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ group }: IRootState) => ({
  groupEntity: group.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
