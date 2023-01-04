import styles from "../styles/Home.module.css";
import React from "react";
import { StateInterface, defaultState } from "../utils/sharedState";

interface PeerComponentProps {
  partnerState?: StateInterface;
  myState: StateInterface;
  setMyState: (state: StateInterface) => void;
  isConnected: boolean;
}

// Peerjs is a peer-to-peer connection library
// This component enables a simple peer-to-peer connection
const PeerComponent: React.FC<PeerComponentProps> = ({
  partnerState,
  myState,
  setMyState,
  isConnected,
}) => {
  const { dragger: myCoords } = myState || { dragger: defaultState.dragger };
  const { dragger: partnerCoords } = partnerState || {
    dragger: defaultState.dragger,
  };

  const myDraggerDiv = (
    <div
      style={{
        position: "absolute",
        left: myCoords.x,
        top: myCoords.y,
        width: myCoords.width,
        height: myCoords.height,
        borderRadius: myCoords.borderRadius,
        backgroundColor: myState?.color,
        opacity: 0.5,
        rotate: `${myCoords.rotation}deg`,
      }}
      draggable
      onDrag={(e) => {
        const newState = {
          ...myState,
          dragger: { ...myCoords, x: e.clientX, y: e.clientY },
        };
        setMyState(newState);
      }}
    ></div>
  );

  const partnerDraggerDiv = (
    <div
      style={{
        position: "absolute",
        left: partnerCoords.x,
        top: partnerCoords.y,
        width: partnerCoords.width,
        height: partnerCoords.height,
        borderRadius: partnerCoords.borderRadius,
        backgroundColor: partnerState?.color,
        opacity: 0.5,
        pointerEvents: "none",
        rotate: `${partnerCoords.rotation}deg`,
      }}
    ></div>
  );

  return (
    <div className={styles.card}>
      {myDraggerDiv}
      {partnerState && partnerDraggerDiv}

      {/*@ts-ignore*/}
      {!isConnected && <p>Waiting for Peer</p>}

      {isConnected && (
        <>
          {/**@ts-ignore*/}
          {partnerState && (
            <p>
              Partner{" "}
              <code style={{ color: partnerState.color }}>
                {partnerState.message}
              </code>
            </p>
          )}
          {/**@ts-ignore*/}
          {myState && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {" "}
              <p>
                Me{" "}
                <code style={{ color: myState.color }}>{myState.message}</code>{" "}
              </p>
              <label>
                Message{" "}
                <input
                  type="text"
                  value={myState.message}
                  onChange={(e) =>
                    setMyState({ ...myState, message: e.target.value })
                  }
                />
              </label>
              <label>
                Color{" "}
                <input
                  type="color"
                  value={myState.color}
                  onChange={(e) =>
                    setMyState({ ...myState, color: e.target.value })
                  }
                />
              </label>
              <label>
                Border Radius{" "}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={myCoords.borderRadius}
                  onChange={(e) =>
                    setMyState({
                      ...myState,
                      dragger: {
                        ...myCoords,
                        borderRadius: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </label>
              <label>
                Width{" "}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={myCoords.width}
                  onChange={(e) =>
                    setMyState({
                      ...myState,
                      dragger: { ...myCoords, width: parseInt(e.target.value) },
                    })
                  }
                />
              </label>
              <label>
                Height{" "}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={myCoords.height}
                  onChange={(e) =>
                    setMyState({
                      ...myState,
                      dragger: {
                        ...myCoords,
                        height: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </label>
              <label>
                Rotation{" "}
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={myCoords.rotation}
                  onChange={(e) =>
                    setMyState({
                      ...myState,
                      dragger: {
                        ...myCoords,
                        rotation: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </label>
            </div>
          )}
          {/*@ts-ignore*/}
        </>
      )}
    </div>
  );
};

export default PeerComponent;
