export const calculateErrorSpace = (errArray) => {
    const space = errArray.length * 30
    if (space) return space
    else return 0
}