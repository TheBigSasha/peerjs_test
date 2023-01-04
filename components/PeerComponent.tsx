import React from 'react';
import { useHostPeerSession } from '../hooks/usePeer';

interface PeerComponentProps {

}

interface StateInterface {
    message: string;
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponent: React.FC<PeerComponentProps> = () => {

    const [myPeerID, sharedState, setSharedState] = useHostPeerSession<StateInterface>()
    const [localState, setLocalState] = React.useState<StateInterface>({message: "Hello World!"})
    
    
    return (
        <div>
            <h2>Peer Component (hosting)</h2>
            <p>My Peer ID: <code>{myPeerID}</code> </p>
            <p>Shared State: <code>{JSON.stringify(sharedState)}</code> </p>
            <label>Local State: <input type="text" value={localState.message} onChange={(e) => setLocalState({message: e.target.value})}/></label>
            <button onClick={() => setSharedState(localState)}>Set Shared State</button>
        </div>
    );
}

export default PeerComponent;