import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ClickOutside = props => {
  const { onClickOutside, as, ...restProps } = props;
  const containerRef = useRef();
  const cbRef = useRef();
  useLayoutEffect(() => {
    cbRef.current = onClickOutside;
  });
  useLayoutEffect(() => {
    function docClick(e) {
      if (!containerRef.current.contains(e.target)) {
        cbRef.current && cbRef.current();
      }
    }

    document.addEventListener('click', docClick, false);
    return () => {
      document.removeEventListener('click', docClick, false);
    };
  }, []);

  const Tag = `${as}`;
  return (
    <Tag ref={containerRef} {...restProps}>
      {props.children}
    </Tag>
  );
};

ClickOutside.defaultProps = {
  as: 'div'
};

ClickOutside.propTypes = {
  as: PropTypes.string,
  onClickOutside: PropTypes.func.isRequired
};

export default ClickOutside;
