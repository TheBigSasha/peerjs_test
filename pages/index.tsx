import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import PeerComponent, { StateInterface } from '../components/PeerComponent'
import { useHostPeerSession } from '../hooks/usePeer'
import { getJoinURL } from '../utils/getJoinURL';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // Get peerid from url args

  const [partnerState, myState, setMyState, isConnected, myID] = useHostPeerSession<StateInterface>({message: "Hello World", color: "rgb(255,255,100)"})


  return (
    <>
      <Head>
        <title>PeerJS Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <main className={styles.main}>
      <h1 className={styles.code}>Peerjs Test (hosting)</h1>
      <div className={styles.description}>
      {!myID && <p>Loading...</p>}
            {/**@ts-ignore*/}
            {myID && <p>Join link <a href={getJoinURL(myID)} className={styles.code}>{myID}</a></p>}
      <PeerComponent partnerState={partnerState} myState={myState} setMyState={setMyState} isConnected={isConnected}/>
      </div>
      <a  href="/join">Join Existing Session</a>

     </main>
    </>
  )
}
