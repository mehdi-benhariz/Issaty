// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Document = (props: IDocumentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { documentList, match, loading } = props;
  return (
    <div>
      <h2 id="document-heading" data-cy="DocumentHeading">
        <Translate contentKey="issatyApp.document.home.title">Documents</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="issatyApp.document.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="issatyApp.document.home.createLabel">Create new Document</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {documentList && documentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="issatyApp.document.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.document.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.document.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.document.file">File</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.document.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.document.owner">Owner</Translate>
                </th>
                <th>
                  <Translate contentKey="issatyApp.document.teacher">Teacher</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {documentList.map((document, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${document.id}`} color="link" size="sm">
                      {document.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`issatyApp.Status.${document.status}`} />
                  </td>
                  <td>
                    <Translate contentKey={`issatyApp.DocType.${document.type}`} />
                  </td>
                  <td>
                    <Translate contentKey={`issatyApp.FileType.${document.file}`} />
                  </td>
                  <td>{document.url}</td>
                  <td>{document.owner ? <Link to={`teacher/${document.owner.id}`}>{document.owner.id}</Link> : ''}</td>
                  <td>{document.teacher ? <Link to={`teacher/${document.teacher.id}`}>{document.teacher.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${document.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${document.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${document.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="issatyApp.document.home.notFound">No Documents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ document }: IRootState) => ({
  documentList: document.entities,
  loading: document.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Document);
