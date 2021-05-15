import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router';

// null means client ID does not exist in the URL.
// undefined means the client ID state is not in synced with the URL yet.
// initial state is undefined.
// this solves the issue of infinite loop between URL change and client ID change at page load.
type UrlParamState = string | null | undefined;

const displayText = (state: UrlParamState): string => {
  return typeof state === 'string' ? state : '';
}

export const Demo = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const [clientId, setClientId] = useState<UrlParamState>(undefined);

  // update state upon URL change
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    setClientId(params.get('clientId'));
  }, [location.search]);

  // update URL upon state change
  React.useEffect(() => {
    if (clientId === undefined) return; // prevents infinite loop
    const params = new URLSearchParams();
    clientId && params.set('clientId', clientId);
    history.push('?' + params.toString());
  }, [clientId]);

  return <>
    <p>
      <span>Enter Client ID:</span>
      <input
        type="text"
        value={displayText(clientId)}
        onChange={event => {
          setClientId(event.target.value);
        }}
      />
    </p>
    <p>
      <ul>
        <li>The client ID can also be updated in the URL.</li>
        <li>Feel free to refresh the page or copy the URL to a new tab.</li>
      </ul>
    </p>
  </>
}
