import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { getEntity, updateEntity, createEntity, reset } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentUpdate = (props: IDocumentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { documentEntity, teachers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/document');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTeachers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...documentEntity,
        ...values,
        owner: teachers.find(it => it.id.toString() === values.ownerId.toString()),
        teacher: teachers.find(it => it.id.toString() === values.teacherId.toString()),
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
          <h2 id="issatyApp.document.home.createOrEditLabel" data-cy="DocumentCreateUpdateHeading">
            <Translate contentKey="issatyApp.document.home.createOrEditLabel">Create or edit a Document</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : documentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="document-id">
                    <Translate contentKey="issatyApp.document.id">Id</Translate>
                  </Label>
                  <AvInput id="document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="document-status">
                  <Translate contentKey="issatyApp.document.status">Status</Translate>
                </Label>
                <AvInput
                  id="document-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && documentEntity.status) || 'PENDING'}
                >
                  <option value="PENDING">{translate('issatyApp.Status.PENDING')}</option>
                  <option value="APPROVED">{translate('issatyApp.Status.APPROVED')}</option>
                  <option value="REJECTED">{translate('issatyApp.Status.REJECTED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="document-type">
                  <Translate contentKey="issatyApp.document.type">Type</Translate>
                </Label>
                <AvInput
                  id="document-type"
                  data-cy="type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && documentEntity.type) || 'EMPLOIS'}
                >
                  <option value="EMPLOIS">{translate('issatyApp.DocType.EMPLOIS')}</option>
                  <option value="COURSESUPPORT">{translate('issatyApp.DocType.COURSESUPPORT')}</option>
                  <option value="NEWS">{translate('issatyApp.DocType.NEWS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="fileLabel" for="document-file">
                  <Translate contentKey="issatyApp.document.file">File</Translate>
                </Label>
                <AvInput
                  id="document-file"
                  data-cy="file"
                  type="select"
                  className="form-control"
                  name="file"
                  value={(!isNew && documentEntity.file) || 'PDF'}
                >
                  <option value="PDF">{translate('issatyApp.FileType.PDF')}</option>
                  <option value="IMAGE">{translate('issatyApp.FileType.IMAGE')}</option>
                  <option value="VIDEO">{translate('issatyApp.FileType.VIDEO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="urlLabel" for="document-url">
                  <Translate contentKey="issatyApp.document.url">Url</Translate>
                </Label>
                <AvField id="document-url" data-cy="url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label for="document-owner">
                  <Translate contentKey="issatyApp.document.owner">Owner</Translate>
                </Label>
                <AvInput id="document-owner" data-cy="owner" type="select" className="form-control" name="ownerId">
                  <option value="" key="0" />
                  {teachers
                    ? teachers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="document-teacher">
                  <Translate contentKey="issatyApp.document.teacher">Teacher</Translate>
                </Label>
                <AvInput id="document-teacher" data-cy="teacher" type="select" className="form-control" name="teacherId">
                  <option value="" key="0" />
                  {teachers
                    ? teachers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/document" replace color="info">
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
  teachers: storeState.teacher.entities,
  documentEntity: storeState.document.entity,
  loading: storeState.document.loading,
  updating: storeState.document.updating,
  updateSuccess: storeState.document.updateSuccess,
});

const mapDispatchToProps = {
  getTeachers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUpdate);
