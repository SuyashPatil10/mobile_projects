function convertExifGpsToDecimal(gps) {
    const [latD, latM, latS] = gps["2"];
    const [lonD, lonM, lonS] = gps["4"];

    const toDecimal = ([deg, d], [min, m], [sec, s]) =>
        deg / d + min / m / 60 + sec / s / 3600;

    let lat = toDecimal(latD, latM, latS);
    let lon = toDecimal(lonD, lonM, lonS);

    if (gps["1"] === "S") lat *= -1;
    if (gps["3"] === "W") lon *= -1;

    return { latitude: lat, longitude: lon };
}

export { convertExifGpsToDecimal };