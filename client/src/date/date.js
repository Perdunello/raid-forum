export const normalize = (unit) => {//normalize time and date for bd
    return unit < 10 ? ('0' + (unit)) : (unit)
}