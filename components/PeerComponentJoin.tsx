import React from 'react';
import { useHostPeerSession, useJoinPeerSession } from '../hooks/usePeer';

interface PeerComponentProps {

}

interface StateInterface {
    message: string;
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponentJoin: React.FC<PeerComponentProps> = () => {

    const [peerID, setPeerID] = React.useState<string>("")

    const [sharedState, setSharedState, isConnected] = useJoinPeerSession<StateInterface>(peerID)
    const [localState, setLocalState] = React.useState<StateInterface>({message: "Hello World!"})
    
    
    return (
        <div>
            <h2>Peer Component (hosting)</h2>
            {isConnected && <>
                <p>Shared State: <code>{JSON.stringify(sharedState)}</code> </p>
            <label>Local State: <input type="text" value={localState.message} onChange={(e) => setLocalState({message: e.target.value})}/></label>
            <button onClick={() => setSharedState(localState)}>Set Shared State</button>
            </>}
            <label>Peer ID: <input type="text" value={peerID} onChange={(e) => setPeerID(e.target.value)}/></label>
            
        </div>
    );
}

export default PeerComponentJoin;