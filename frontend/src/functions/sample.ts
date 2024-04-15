export const sample = <T>(arr: Array<T>): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};
