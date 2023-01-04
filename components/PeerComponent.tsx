import styles from '../styles/Home.module.css'
import React from 'react';



export interface StateInterface {
    message: string;
    color: string;
}

interface PeerComponentProps {
    partnerState?: StateInterface;
    myState?: StateInterface;
    setMyState: (state: StateInterface) => void;
    isConnected: boolean;
    
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponent: React.FC<PeerComponentProps> = ({
    partnerState,
    myState,
    setMyState,
    isConnected
}) => {    
    
    return (
        <div className={styles.card}>
            {/*@ts-ignore*/ } 
                        {!isConnected && <p>Waiting for Peer</p>}
           
            {isConnected && <>
                        {/**@ts-ignore*/}
            {partnerState && <p>Partner State <code style={{color: partnerState.color}}>{partnerState.message}</code></p>}
                        {/**@ts-ignore*/}
            {myState &&<> <p>My State <code style={{color: myState.color}}>{myState.message}</code> </p>
            <label>Message: <input type="text" value={myState.message} onChange={(e) => setMyState({...myState, message: e.target.value})}/></label>
            <label>Color: <input type="color" value={myState.color} onChange={(e) => setMyState({...myState, color: e.target.value})}/></label></>}
                        {/*@ts-ignore*/ }         
            </>}



            
       </div>
    );
}

export default PeerComponent;