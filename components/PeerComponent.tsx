import styles from '../styles/Home.module.css'
import React from 'react';
import { useHostPeerSession } from '../hooks/usePeer';
import { getJoinURL } from '../utils/getJoinURL';

interface PeerComponentProps {

}

interface StateInterface {
    message: string;
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponent: React.FC<PeerComponentProps> = () => {

    const [partnerState, myState, setMyState, isConnected, myID] = useHostPeerSession<StateInterface>()
    const [localState, setLocalState] = React.useState<StateInterface>({message: "Hello World!"})
    
    
    return (
        <div className={styles.card}>
            <h2 >Peer Component (hosting)</h2>
            {myID && <p>Join link: <a className={styles.code}>{getJoinURL(myID)}</a></p>}
            {isConnected && <>
                <p>Partner State: <code>{JSON.stringify(partnerState)}</code> </p>
                <p>My State: <code>{JSON.stringify(myState)}</code> </p>
            <label>Local State: <input type="text" value={localState.message} onChange={(e) => setLocalState({message: e.target.value})}/></label>
            <button onClick={() => setMyState(localState)}>Set Shared State</button>
        
            </>}



            
       </div>
    );
}

export default PeerComponent;