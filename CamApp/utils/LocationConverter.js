// Convert degrees to DMS (degrees, minutes, seconds)
const toDMS = (deg) => {
    const d = Math.floor(deg);
    const minFloat = (deg - d) * 60;
    const m = Math.floor(minFloat);
    const s = Math.round((minFloat - m) * 60 * 100);
    return [[d, 1], [m, 1], [s, 100]];
};

export { toDMS };