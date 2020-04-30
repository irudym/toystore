import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import DeleteIcon from './delete_icon';
import RestoreIcon from './restore_icon';


// cell value representation
const cellIcon = ({ value }) => (
  <Icon name={value} />
);

const cellText = ({ value }) => (
  <span>{value}</span>
);


const colorBoxStyle = value => (
  {
    background: `#${value}`,
    width: '3rem',
    height: '1rem',
  }
);

const cellColorBox = ({ value }) => (
  <div style={colorBoxStyle(value)}/>
);


class RecordsHolder extends React.Component {

  static Icon = cellIcon;
  static Text = cellText;
  static ColourBox = cellColorBox;

  render() {
    const {
      records,
      onDelete,
      onRestore,
      editable,
      fields,
      modelName,
    } = this.props;
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            { editable ? <Table.HeaderCell>Edit</Table.HeaderCell> : null }
            {fields.map(field => (
              <Table.HeaderCell>
                {field.title}
              </Table.HeaderCell>
            ))}
            <Table.HeaderCell>Delete</Table.HeaderCell>
            {onRestore
              ? <Table.HeaderCell>Restore</Table.HeaderCell>
              : null
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            records.map(record => (
              <Table.Row key={record.id} positive={record.recent === true}>
                { editable
                  ? (
                    <Table.Cell>
                      <Link key={record.id} to={{ pathname: `/director/${modelName}/edit/${record.id}`, state: { modal: true } }}>
                        <Icon name="pencil" />
                      </Link>
                    </Table.Cell>
                  )
                  : null
                }
                {fields.map(field => (
                  <Table.Cell>
                    <field.Component value={typeof field.name === 'function' ? field.name(record) : record[field.name]} />
                  </Table.Cell>
                ))}
                <Table.Cell><DeleteIcon onDelete={() => onDelete(record.id)} /></Table.Cell>
                {onRestore
                  ? <Table.Cell><RestoreIcon onRestore={() => onRestore(record.id)} /></Table.Cell>
                  : null
                }
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    );
  }
}

RecordsHolder.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRestore: PropTypes.func,
  editable: PropTypes.bool,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    Component: PropTypes.node, // text, color box, icon, ..
    title: PropTypes.string, // how to show it in the table header
  })).isRequired,
  modelName: PropTypes.string.isRequired,
};

RecordsHolder.defaultProps = {
  onRestore: null,
  editable: true,
};

export default RecordsHolder;
