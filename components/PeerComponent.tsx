import styles from '../styles/Home.module.css'
import React from 'react';
import { useHostPeerSession } from '../hooks/usePeer';
import { getJoinURL } from '../utils/getJoinURL';

interface PeerComponentProps {

}

interface StateInterface {
    message: string;
    color: string;
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponent: React.FC<PeerComponentProps> = () => {

    const [partnerState, myState, setMyState, isConnected, myID] = useHostPeerSession<StateInterface>()
    const [localState, setLocalState] = React.useState<StateInterface>({message: "Hello World!", color: "rgb(120,0,0)"})
    
    
    return (
        <div className={styles.card}>
            <h2 >Peer Component (hosting)</h2>
            {/*@ts-ignore*/ } 
            {!myID && <p>Loading...</p>}
            {/**@ts-ignore*/}
            {myID && <p>Join link: <a href={getJoinURL(myID)} className={styles.code}>{myID}</a></p>}
            {isConnected && partnerState && <>
                        {/**@ts-ignore*/}
            {partnerState && <p>Partner State: <code style={{color: partnerState.color}}>{partnerState.message}</code> </p>}
                        {/**@ts-ignore*/}
            {myState && <p>My State: <code style={{color: myState.color}}>{myState.message}</code> </p>}
            <label>Message: <input type="text" value={localState.message} onChange={(e) => setLocalState({...localState, message: e.target.value})}/></label>
            <label>Color: <input type="color" value={localState.color} onChange={(e) => setLocalState({...localState, color: e.target.value})}/></label>
                        {/*@ts-ignore*/ } 
            <button onClick={() => setMyState(localState)}>Set Shared State</button>
        
            </>}



            
       </div>
    );
}

export default PeerComponent;