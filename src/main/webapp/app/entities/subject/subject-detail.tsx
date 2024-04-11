import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './subject.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubjectDetail = (props: ISubjectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subjectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subjectDetailsHeading">
          <Translate contentKey="issatyApp.subject.detail.title">Subject</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="issatyApp.subject.id">Id</Translate>
            </span>
          </dt>
          <dd>{subjectEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="issatyApp.subject.name">Name</Translate>
            </span>
          </dt>
          <dd>{subjectEntity.name}</dd>
          <dt>
            <Translate contentKey="issatyApp.subject.teacher">Teacher</Translate>
          </dt>
          <dd>{subjectEntity.teacher ? subjectEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/subject" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/subject/${subjectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subject }: IRootState) => ({
  subjectEntity: subject.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetail);
