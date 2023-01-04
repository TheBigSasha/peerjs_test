export interface StateInterface {
    message: string;
    color: string;
    profile: {
        name: string;
        score: number;
    }
    dragger: {
        x: number;
        y: number;
        borderRadius: number;
        width: number;
        height: number;
        rotation: number;
    }
}

export const defaultState: StateInterface = {
    message: "Hello World",
    color: "red",
    profile: {
        name: "John Doe",
        score: 0
    },
    dragger: {
        x: 0,
        y: 0,
        borderRadius: 15,
        width: 30,
        height: 30,
        rotation: 0
    }
}
