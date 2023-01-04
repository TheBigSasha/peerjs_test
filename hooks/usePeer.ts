import { useEffect, useState } from 'react'
import { generateID } from '../utils/generateID'



    // Hook usage:
    // const [partnerState, myState, setMyState, isConnected] = useJoinPeerSession<StateInterface>(peerID)

export function useJoinPeerSession<T> (peerID: string) {

    const [partnerState, setPartnerState] = useState<T>()
    const [myState, setMyState] = useState<T>()
    const [isConnected, setIsConnected] = useState(false)

    const [peer, setPeer] = useState<any>()

    useEffect(() => {
        import ('peerjs').then(({ default: Peer }) => {
            const peer = new Peer()
            setPeer(peer)
            peer.on('open', () => {
                const conn = peer.connect(peerID)
                conn.on('open', () => {
                    conn.on('data', (data: T) => {
                        setPartnerState(data)
                    })
                    setIsConnected(true)
                })
            })
        })
    }, [peerID])

    useEffect(() => {
        if (peer) {
            peer.on('connection', (conn) => {
                conn.on('data', (data: T) => {
                    setPartnerState(data)
                })
                setIsConnected(true)
            })

            peer.on('error', (err) => {
                console.error(err)
            })

            peer.on('close', () => {
                setIsConnected(false)
            })
        }
    }, [peer])

    useEffect(() => {
        if (isConnected && myState) {
            peer?.connections[peerID][0].send(myState)
        }
    }, [myState, isConnected, peer, peerID])


    return [partnerState, myState, setMyState, isConnected]
}


    // Hook usage:
    // const [partnerState, myState, setMyState, isConnected, myID] = useHostPeerSession<StateInterface>()

export function useHostPeerSession<T> () {
    
        const [partnerState, setPartnerState] = useState<T>()
        const [myState, setMyState] = useState<T>()
        const [isConnected, setIsConnected] = useState(false)
        const [myID, setMyID] = useState('')

    const [peer, setPeer] = useState<any>()

    useEffect(() => {
        import ('peerjs').then(({ default: Peer }) => {
            const peer = new Peer(generateID())
            setPeer(peer)
            peer.on('open', (id) => {
                setMyID(id)
                peer.on('connection', (conn) => {
                    conn.on('data', (data: T) => {
                        setPartnerState(data)
                    })
                    setIsConnected(true)
                })
            })
        })
    }
    , [])

    useEffect(() => {
        if (isConnected && myState && peer) {
            Object.values(peer.connections).forEach((conn: any) => {
                conn[0].send(myState)
            }
            )
        }
    }
    , [myState, isConnected, peer])

    return [partnerState, myState, setMyState, isConnected, myID]
}


