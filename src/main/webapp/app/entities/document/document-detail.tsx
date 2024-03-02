import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './document.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentDetail = (props: IDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { documentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="documentDetailsHeading">
          <Translate contentKey="issatyApp.document.detail.title">Document</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="issatyApp.document.id">Id</Translate>
            </span>
          </dt>
          <dd>{documentEntity.id}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="issatyApp.document.status">Status</Translate>
            </span>
          </dt>
          <dd>{documentEntity.status}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="issatyApp.document.type">Type</Translate>
            </span>
          </dt>
          <dd>{documentEntity.type}</dd>
          <dt>
            <span id="file">
              <Translate contentKey="issatyApp.document.file">File</Translate>
            </span>
          </dt>
          <dd>{documentEntity.file}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="issatyApp.document.url">Url</Translate>
            </span>
          </dt>
          <dd>{documentEntity.url}</dd>
          <dt>
            <Translate contentKey="issatyApp.document.owner">Owner</Translate>
          </dt>
          <dd>{documentEntity.owner ? documentEntity.owner.id : ''}</dd>
          <dt>
            <Translate contentKey="issatyApp.document.teacher">Teacher</Translate>
          </dt>
          <dd>{documentEntity.teacher ? documentEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/document" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/document/${documentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ document }: IRootState) => ({
  documentEntity: document.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetail);
