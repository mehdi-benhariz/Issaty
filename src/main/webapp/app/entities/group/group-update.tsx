import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDocument } from 'app/shared/model/document.model';
import { getEntities as getDocuments } from 'app/entities/document/document.reducer';
import { ISubject } from 'app/shared/model/subject.model';
import { getEntities as getSubjects } from 'app/entities/subject/subject.reducer';
import { IMajor } from 'app/shared/model/major.model';
import { getEntities as getMajors } from 'app/entities/major/major.reducer';
import { getEntity, updateEntity, createEntity, reset } from './group.reducer';
import { IGroup } from 'app/shared/model/group.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GroupUpdate = (props: IGroupUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { groupEntity, documents, subjects, majors, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/group');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDocuments();
    props.getSubjects();
    props.getMajors();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...groupEntity,
        ...values,
        emploi: documents.find(it => it.id.toString() === values.emploiId.toString()),
        document: documents.find(it => it.id.toString() === values.documentId.toString()),
        subject: subjects.find(it => it.id.toString() === values.subjectId.toString()),
        major: majors.find(it => it.id.toString() === values.majorId.toString()),
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
          <h2 id="issatyApp.group.home.createOrEditLabel" data-cy="GroupCreateUpdateHeading">
            <Translate contentKey="issatyApp.group.home.createOrEditLabel">Create or edit a Group</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : groupEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="group-id">
                    <Translate contentKey="issatyApp.group.id">Id</Translate>
                  </Label>
                  <AvInput id="group-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="group-name">
                  <Translate contentKey="issatyApp.group.name">Name</Translate>
                </Label>
                <AvField id="group-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="group-emploi">
                  <Translate contentKey="issatyApp.group.emploi">Emploi</Translate>
                </Label>
                <AvInput id="group-emploi" data-cy="emploi" type="select" className="form-control" name="emploiId">
                  <option value="" key="0" />
                  {documents
                    ? documents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="group-subject">
                  <Translate contentKey="issatyApp.group.subject">Subject</Translate>
                </Label>
                <AvInput id="group-subject" data-cy="subject" type="select" className="form-control" name="subjectId">
                  <option value="" key="0" />
                  {subjects
                    ? subjects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="group-document">
                  <Translate contentKey="issatyApp.group.document">Document</Translate>
                </Label>
                <AvInput id="group-document" data-cy="document" type="select" className="form-control" name="documentId">
                  <option value="" key="0" />
                  {documents
                    ? documents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="group-major">
                  <Translate contentKey="issatyApp.group.major">Major</Translate>
                </Label>
                <AvInput id="group-major" data-cy="major" type="select" className="form-control" name="majorId">
                  <option value="" key="0" />
                  {majors
                    ? majors.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/group" replace color="info">
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
  documents: storeState.document.entities,
  subjects: storeState.subject.entities,
  majors: storeState.major.entities,
  groupEntity: storeState.group.entity,
  loading: storeState.group.loading,
  updating: storeState.group.updating,
  updateSuccess: storeState.group.updateSuccess,
});

const mapDispatchToProps = {
  getDocuments,
  getSubjects,
  getMajors,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GroupUpdate);
