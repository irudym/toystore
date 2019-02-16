import React from 'react';
import { Switch, Route } from 'react-router-dom';

export function withSwitch({ component, componentTrash, addComponent, editComponent, name }) {
  return class extends React.Component {
    previousLocation = this.props.location;

    componentWillUpdate(nextProps) {
      const { location } = this.props;

      // set previousLocation if props.location is not modal
      if (
        nextProps.history.action !== 'POP'
        && (!location.state || !location.state.modal)
      ) {
        this.previousLocation = location;
      }
    }

    render() {
      const { location } = this.props;

      const isModal = !!(
        location.state
        && location.state.modal
        && this.previousLocation !== location
      ); // not initial render

      return (
        <>
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path={`/director/${name}`} component={component} />
            <Route excat path={`/director/${name}/trash`} component={componentTrash} />
          </Switch>
          {isModal ? <Route path={`/director/${name}/add`} component={addComponent} /> : null}
          {isModal ? <Route path={`/director/${name}/edit/:id`} component={editComponent} /> : null}
        </>
      );
    }
  };
}
