import React, { ComponentType, useEffect } from 'react';
import { Route } from 'react-router-dom';

interface Props {
  layout: ComponentType;
  component: ComponentType;
  path: string;
  exact?: boolean;
  title?: string;
}

const RouteWithLayout: React.FC<Props> = (props) => {
  const { layout: Layout, component: Component, path, exact, title } = props;

  useEffect(() => {
    document.title = title ? `${title} - MailCoach` : 'MailCoach';
  }, [title]);

  const routeWithLayout: React.FC = () => <Layout>
    <Component />
  </Layout>;

  return (<Route path={path} component={routeWithLayout} exact={exact} />);
}

export default RouteWithLayout;
