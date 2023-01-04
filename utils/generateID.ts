
export const generateID: () => string = () => {
    return `TBS-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`
}