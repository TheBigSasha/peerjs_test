export interface StateInterface {
  message: string;
  color: string;
  profile: {
    name: string;
    score: number;
  };
  dragger: {
    x: number;
    y: number;
    borderRadius: number;
    width: number;
    height: number;
    rotation: number;
  }
}

//TODO: Shared state which is combined from partner and local state
// send shared state to partner on change
// receive shared state from partner on change

// fake shared state by using operations like sum, union, intersection, etc on local and partner state
//IE:
// local state: {a: 1, b: 2, c: 3}
// partner state: {a: 1, b: 2, d: 4}
// shared state: {a: 1, b: 2, c: 3, d: 4}

export const defaultState: StateInterface = {
  message: "Hello World",
  color: "red",
  profile: {
    name: "John Doe",
    score: 0,
  },
  dragger: {
    x: 10,
    y: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    rotation: 0,
  }
};
