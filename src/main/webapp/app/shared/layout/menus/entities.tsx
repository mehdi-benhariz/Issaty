import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/profile">
      <Translate contentKey="global.menu.entities.profile" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/teacher">
      <Translate contentKey="global.menu.entities.teacher" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/department">
      <Translate contentKey="global.menu.entities.department" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/subject">
      <Translate contentKey="global.menu.entities.subject" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/group">
      <Translate contentKey="global.menu.entities.group" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/student">
      <Translate contentKey="global.menu.entities.student" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/admin">
      <Translate contentKey="global.menu.entities.admin" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/demand">
      <Translate contentKey="global.menu.entities.demand" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/document">
      <Translate contentKey="global.menu.entities.document" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/major">
      <Translate contentKey="global.menu.entities.major" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
