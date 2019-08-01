import React from 'react';
import useSmartAudio from '../hooks/useSmartAudio';

const SmartAudio = props => {
  const { src, autoplay, loop, pauseWhenHidden } = props;
  const audioState = useSmartAudio({
    src,
    autoplay,
    loop,
    pauseWhenHidden
  });
  return <>{props.children && props.children(audioState)}</>;
};

export default SmartAudio;
