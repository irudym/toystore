import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DeleteIcon from './delete_icon';
import RestoreIcon from './restore_icon';


const CategoriesHolder = ({
  records,
  onDelete,
  onRestore,
  editable,
}) => (
  <Table celled selectable>
    <Table.Header>
      <Table.Row>
        { editable ? <Table.HeaderCell>Edit</Table.HeaderCell> : null }
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>English name</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
        {onRestore
          ? <Table.HeaderCell>Restore</Table.HeaderCell>
          : null
        }
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        records.map(category => (
          <Table.Row key={category.id} positive={category.recent === true}>
            { editable
              ? (
                <Table.Cell>
                  <Link key={category.id} to={{ pathname: `/director/categories/edit/${category.id}`, state: { modal: true } }}>
                    <Icon name="pencil" />
                  </Link>
                </Table.Cell>
              )
              : null
            }
            <Table.Cell>{category.name}</Table.Cell>
            <Table.Cell>{category.name_eng}</Table.Cell>
            <Table.Cell><DeleteIcon onDelete={() => onDelete(category.id)} /></Table.Cell>
            {onRestore
              ? <Table.Cell><RestoreIcon onRestore={() => onRestore(category.id)} /></Table.Cell>
              : null
            }
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);

CategoriesHolder.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRestore: PropTypes.func,
  editable: PropTypes.bool,
};

CategoriesHolder.defaultProps = {
  onRestore: null,
  editable: true,
};

export default CategoriesHolder;
