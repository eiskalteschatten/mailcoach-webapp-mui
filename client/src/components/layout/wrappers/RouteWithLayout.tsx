import React, { ComponentType } from 'react';
import { Route } from 'react-router-dom';

interface Props {
  layout: ComponentType;
  component: ComponentType;
  path: string;
  exact?: boolean;
}

const RouteWithLayout: React.FC<Props> = (props) => {
  const { layout: Layout, component: Component, path, exact } = props;

  const routeWithLayout: React.FC = () => <Layout>
    <Component />
  </Layout>;

  return (<Route path={path} component={routeWithLayout} exact={exact} />);
}

export default RouteWithLayout;
