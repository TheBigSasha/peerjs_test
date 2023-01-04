import React from 'react';
import { useJoinPeerSession } from '../hooks/usePeer';
import styles from '../styles/Home.module.css'

interface PeerComponentProps {
    peerID?: string;
}

interface StateInterface {
    message: string;
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponentJoin: React.FC<PeerComponentProps> = ({peerID: peerIDInit}) => {

    const [peerID, setPeerID] = React.useState<string>(peerIDInit || "")

    const [partnerState, myState, setMyState, isConnected] = useJoinPeerSession<StateInterface>(peerID)
    const [localState, setLocalState] = React.useState<StateInterface>({message: "Hello World!"})
    
    
    return (
        <div className={styles.card}>
            <h2>Peer Component (joining)</h2>
            <label>Peer ID: <input type="text" value={peerID} onChange={(e) => setPeerID(e.target.value)}/></label>
            {isConnected && <>
                <p>Partner State: <code>{JSON.stringify(partnerState)}</code> </p>
                <p>My State: <code>{JSON.stringify(myState)}</code> </p>
            <label>Local State: <input type="text" value={localState.message} onChange={(e) => setLocalState({message: e.target.value})}/></label>
                        {/*@ts-ignore*/ } 
            <button onClick={() => setMyState(localState)}>Set Shared State</button>
                        </>}

        </div>
    );
}

export default PeerComponentJoin;