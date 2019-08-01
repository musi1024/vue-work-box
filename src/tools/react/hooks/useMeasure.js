import ResizeObserver from 'resize-observer-polyfill';
import React from 'react';

/**
 * @return {[import('react').RefObject,{
 *  top:number;
 *  left:number;
 *  right:number;
 *  bottom:number;
 *  width:number;
 *  height:number;
 * }]}
 * @example
 * const [ref,{top,left,bottom,right,width,height}]=useMeasure()
 * <div ref={ref} >top:{top}</div>
 */

const useMeasure = () => {
  const [rect, set] = React.useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  });
  const observer = React.useRef(null);

  const ref = React.useCallback(node => {
    const ro = (observer.current =
      observer.current ||
      //https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver
      new ResizeObserver(entries => {
        const entry = entries[0];
        if (entry) {
          if (entry.target.getBoundingClientRect) {
            const {
              width,
              top,
              left,
              bottom,
              right,
              height
            } = entry.target.getBoundingClientRect();
            set({ width, top, left, bottom, right, height });
          } else {
            set(entry.contentRect);
          }
        }
      }));
    ro.disconnect();
    if (node !== null) {
      ro.observe(node);
    }
  }, []);

  return [ref, rect];
};

export default useMeasure;
