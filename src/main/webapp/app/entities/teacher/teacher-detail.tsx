import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './teacher.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TeacherDetail = (props: ITeacherDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { teacherEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="teacherDetailsHeading">
          <Translate contentKey="issatyApp.teacher.detail.title">Teacher</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="issatyApp.teacher.id">Id</Translate>
            </span>
          </dt>
          <dd>{teacherEntity.id}</dd>
          <dt>
            <span id="grade">
              <Translate contentKey="issatyApp.teacher.grade">Grade</Translate>
            </span>
          </dt>
          <dd>{teacherEntity.grade}</dd>
          <dt>
            <span id="isChef">
              <Translate contentKey="issatyApp.teacher.isChef">Is Chef</Translate>
            </span>
          </dt>
          <dd>{teacherEntity.isChef ? 'true' : 'false'}</dd>
          <dt>
            <span id="bureau">
              <Translate contentKey="issatyApp.teacher.bureau">Bureau</Translate>
            </span>
          </dt>
          <dd>{teacherEntity.bureau}</dd>
          <dt>
            <Translate contentKey="issatyApp.teacher.profile">Profile</Translate>
          </dt>
          <dd>{teacherEntity.profile ? teacherEntity.profile.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.teacher.user">User</Translate>
          </dt>
          <dd>{teacherEntity.user ? teacherEntity.user.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.teacher.chefOfDepartment">Chef Of Department</Translate>
          </dt>
          <dd>{teacherEntity.chefOfDepartment ? teacherEntity.chefOfDepartment.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/teacher" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/teacher/${teacherEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ teacher }: IRootState) => ({
  teacherEntity: teacher.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetail);
