import React, { forwardRef } from 'react';
// import { APP_HEADER_H } from '@constants/styleConst';

const Anchor = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      // style={{ position: 'absolute', top: `-${APP_HEADER_H}px` }}
    ></div>
  );
});

export default Anchor;
