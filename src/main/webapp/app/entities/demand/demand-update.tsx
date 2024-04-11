import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudent } from 'app/shared/model/student.model';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { getEntity, updateEntity, createEntity, reset } from './demand.reducer';
import { IDemand } from 'app/shared/model/demand.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDemandUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DemandUpdate = (props: IDemandUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { demandEntity, students, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/demand');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getStudents();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...demandEntity,
        ...values,
        student: students.find(it => it.id.toString() === values.studentId.toString()),
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
          <h2 id="issatyApp.demand.home.createOrEditLabel" data-cy="DemandCreateUpdateHeading">
            <Translate contentKey="issatyApp.demand.home.createOrEditLabel">Create or edit a Demand</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : demandEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="demand-id">
                    <Translate contentKey="issatyApp.demand.id">Id</Translate>
                  </Label>
                  <AvInput id="demand-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="demand-status">
                  <Translate contentKey="issatyApp.demand.status">Status</Translate>
                </Label>
                <AvInput
                  id="demand-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && demandEntity.status) || 'PENDING'}
                >
                  <option value="PENDING">{translate('issatyApp.Status.PENDING')}</option>
                  <option value="APPROVED">{translate('issatyApp.Status.APPROVED')}</option>
                  <option value="REJECTED">{translate('issatyApp.Status.REJECTED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="demand-student">
                  <Translate contentKey="issatyApp.demand.student">Student</Translate>
                </Label>
                <AvInput id="demand-student" data-cy="student" type="select" className="form-control" name="studentId">
                  <option value="" key="0" />
                  {students
                    ? students.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/demand" replace color="info">
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
  students: storeState.student.entities,
  demandEntity: storeState.demand.entity,
  loading: storeState.demand.loading,
  updating: storeState.demand.updating,
  updateSuccess: storeState.demand.updateSuccess,
});

const mapDispatchToProps = {
  getStudents,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DemandUpdate);
