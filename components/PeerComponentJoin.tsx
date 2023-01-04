import React from 'react';
import { useJoinPeerSession } from '../hooks/usePeer';
import styles from '../styles/Home.module.css'

interface PeerComponentProps {
    peerID?: string;
}

interface StateInterface {
    message: string;
    color: string;
}
// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponentJoin: React.FC<PeerComponentProps> = ({peerID: peerIDInit}) => {

    const [peerID, setPeerID] = React.useState<string>(peerIDInit || "")

    const [partnerState, myState, setMyState, isConnected] = useJoinPeerSession<StateInterface>(peerID)
    const [localState, setLocalState] = React.useState<StateInterface>({message: "Hello World!", color: "rgb(120,0,0)"})

    
    
    return (
        <div className={styles.card}>
            <h2>Peer Component (joining)</h2>
            <label>Peer ID: <input type="text" value={peerID} onChange={(e) => setPeerID(e.target.value)}/></label>
            {isConnected && <>
            {/**@ts-ignore*/}
            {partnerState &&                 <p>Partner State: <code style={{color: partnerState.color}}>{partnerState.message}</code> </p>}
            {/**@ts-ignore*/}
            {myState && <p>My State: <code style={{color: myState.color}}>{myState.message}</code> </p> }
            <label>Message: <input type="text" value={localState.message} onChange={(e) => setLocalState({...localState, message: e.target.value})}/></label>
            <label>Color: <input type="color" value={localState.color} onChange={(e) => setLocalState({...localState, color: e.target.value})}/></label>
                        {/*@ts-ignore*/ } 
            <button onClick={() => setMyState(localState)}>Set Shared State</button>
                        </>}

        </div>
    );
}

export default PeerComponentJoin;