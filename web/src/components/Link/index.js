import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, NavLink } from 'react-router-dom';

const Link = forwardRef(
  ({ activeClassName, children, className, label, newTab, onClick, tabIndex, title, to }, ref) => {
    const isInternal = /^\/(?!\/)/.test(to);
    const isFile = /\.[0-9a-z]+$/i.test(to);
    const isInternalLink = isInternal && !isFile;

    const props = {
      className,
      onClick,
      tabIndex,
      ref,
    };

    if (label) {
      props['aria-label'] = label;
    }

    if (title) {
      props.title = title;
    }

    if (!to) {
      return <div {...props}>{children}</div>;
    } else if (isInternalLink) {
      props.to = to;
      if (activeClassName) {
        return (
          <NavLink activeClassName={activeClassName} {...props}>
            {children}
          </NavLink>
        );
      }
      return <RouterLink {...props}>{children}</RouterLink>;
    } else if (newTab || isFile) {
      props.target = '_blank';
    }

    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';

Link.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
  newTab: PropTypes.bool,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  activeClassName: '',
  className: '',
  label: '',
  newTab: false,
  tabIndex: 0,
  title: '',
};

export default Link;
