import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'components';
import { withRouter } from 'react-router-dom';
import styles from './page.module.scss';

const Page = ({ children }) => (
  <div className={styles.page}>
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <main className={styles.main}>{children}</main>
    <footer>&copy; 2019, Josh Pensky.</footer>
  </div>
);

Page.propTypes = {
  children: PropTypes.node,
};

export default withRouter(Page);
