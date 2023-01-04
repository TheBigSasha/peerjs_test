import { useEffect, useState } from 'react'

// Hook usage:
// const [myPeerID, sharedState, setSharedState] = useHostPeerSession<StateInterface>()

export function useHostPeerSession<T>() {
    const [myPeerID, setMyPeerID] = useState<string>()
    const [sharedState, setSharedState] = useState<T>()

    const [peer, setPeer] = useState<any>()
    
    useEffect(() => {
        import('peerjs').then(({ default: Peer }) => {
        const peer = new Peer()

        setPeer(peer)
    
        peer.on('open', (id) => {
        setMyPeerID(id)
        })
    
        peer.on('connection', (conn) => {
        conn.on('data', (data) => {
            setSharedState(data as T)
        })
        })
    })
    }, [])

    useEffect(() => {
        // send shared state to peer
        if (peer) {
        Object.values(peer.connections).forEach((connections) => {
            connections.forEach((conn) => {
                conn.send(sharedState)
            })
         }
         )
        }


    
    }, [peer, sharedState])


    
    return [myPeerID, sharedState, setSharedState] as const
    }

    // Hook usage:
    // const [sharedState, setSharedState, isConnected] = useJoinPeerSession<StateInterface>(peerID)

export function useJoinPeerSession<T> (peerID: string) {
    const [sharedState, setSharedState] = useState<T>()
    const [isConnected, setIsConnected] = useState(false)
    const [peer, setPeer] = useState<any>()
    
    useEffect(() => {
        import('peerjs').then(({ default: Peer }) => {
        const peer = new Peer()

        setPeer(peer)
    
        peer.on('open', (id) => {
        const conn = peer.connect(peerID)
    
        conn.on('open', () => {
            setIsConnected(true)
        })
    
        conn.on('data', (data) => {
            setSharedState(data as T)
        })

        conn.on('close', () => {
            setIsConnected(false)
        })

        conn.on('error', () => {
            setIsConnected(false)
        }
        )

        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                setSharedState(data as T)
            })
            })    


    })
    })
    }, [peerID])

    useEffect(() => {
        // send shared state to peer
        if (peer) {
            Object.values(peer.connections).forEach((connections) => {
                connections.forEach((conn) => {
                    conn.send(sharedState)
                })
             }
             )
            }
    }, [peer, sharedState, isConnected, peerID])


    
    return [sharedState, setSharedState, isConnected] as const
    }


