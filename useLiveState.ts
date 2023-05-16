import LiveState from 'phx-live-state';
import { useState, useEffect, useCallback } from 'react';

const useLiveState = (liveState: LiveState, intialState: any) => {
  const [state, setState] = useState(intialState);
  useEffect(() => {
    liveState.connect();
    const handleStateChange = ({detail: {state}}) => setState(state);
    liveState.addEventListener('livestate-change', handleStateChange);
    return () => {
      liveState.removeEventListener('livestate-change', handleStateChange);
    };
  }, [liveState]);

  const pushEvent = useCallback((event: string, payload: any) => {
    liveState.pushEvent(event, payload);
  }, [liveState]);

  return [state, pushEvent];
}

export default useLiveState