import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
  Icon,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

import { elements } from '../../styles/colors';

const backgroundStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.35)',
};

const modalView = {
  position: 'absolute',
  background: 'transparent',
  top: 25,
  left: '10%',
  right: '10%',
  padding: 15,
  // border: '2px solid #444',
};

const headerStyle = {
  background: elements.header,
  fontFamily: 'Lato',
  fontSize: '1.5rem',
  fontWeight: 400,
};

const actionsStyle = {
  background: elements.header,
};

const closeButtonStyle = {
  position: 'absolute',
  top: 15,
  right: 10,
};

const closeButtonIconStyle = {
  color: elements.closeButton,
  cursor: 'pointer',
};

const ModalViewHeader = ({ children, onClose }) => (
  <Segment style={headerStyle}>
    <div style={closeButtonStyle} onClick={onClose}>
      <Icon className="candone-close-button" name="cancel" style={closeButtonIconStyle} />
    </div>
    {children}
  </Segment>
);

const ModalViewContent = ({ children }) => (
  <Segment>
    {children}
  </Segment>
);

const ModalViewActions = ({ children }) => (
  <Segment style={actionsStyle}>
    {children}
  </Segment>
);

class ModalView extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    header: PropTypes.string.isRequired,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    loading: false,
  }

  static Header = ModalViewHeader;

  static Content = ModalViewContent;

  static Actions = ModalViewActions;

  render() {
    const { header, children, onClose, loading } = this.props;
    return (
      <div style={backgroundStyle}>
      {loading
        ?
        <Dimmer active>
          <Loader />
        </Dimmer>
        : null
      }
        <div style={modalView} onClick={e => e.stopPropagation()}>
          <Segment.Group>
            <ModalViewHeader onClose={onClose}>{header}</ModalViewHeader>
            {children}
          </Segment.Group>
        </div>
      </div>
    );
  }
}


export default ModalView;
