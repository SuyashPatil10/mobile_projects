import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import piexif from 'piexifjs';

// async function readExif(uri) {
//   try {
//     const fileInfo = await FileSystem.getInfoAsync(uri);
//     if (fileInfo.exists) {
//       const exifData = await ImageManipulator.manipulateAsync(
//         uri,
//         [],
//         { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: false, exif: true }
//       );
//       console.log('EXIF:', exifData.exif);
//     }
//   } catch (error) {
//     console.error('Error reading EXIF', error);
//   }
// }

// piexif expects [deg, min, sec] tuples for rational tags
function toDmsRational(dec) {
  dec = Math.abs(dec);
  const deg = Math.floor(dec);
  const minf = (dec - deg) * 60;
  const min = Math.floor(minf);
  const sec = Math.round((minf - min) * 60 * 100);
  return [
    [deg, 1],
    [min, 1],
    [sec, 100],
  ];
}

async function saveGeoTaggedPhoto(base64Jpeg, { latitude, longitude }) {
  // 1) build EXIF GPS dictionary
  const zeroth = {};
  const exif = {};
  const gpsIfd = {};
  const latRef = latitude >= 0 ? 'N' : 'S';
  const lonRef = longitude >= 0 ? 'E' : 'W';


  gpsIfd[piexif.GPSIFD.GPSLatitudeRef]  = latRef;
  gpsIfd[piexif.GPSIFD.GPSLatitude]     = toDmsRational(latitude);
  gpsIfd[piexif.GPSIFD.GPSLongitudeRef] = lonRef;
  gpsIfd[piexif.GPSIFD.GPSLongitude]    = toDmsRational(longitude);

  const exifObj = { '0th': zeroth, Exif: exif, GPS: gpsIfd };
  const exifBytes = piexif.dump(exifObj);

  // 2) insert EXIF into your base64 JPEG
  const dataUri = 'data:image/jpeg;base64,' + base64Jpeg;
  const newDataUri = piexif.insert(exifBytes, dataUri);

  // 3) strip the prefix and write back out to a file
  const newBase64 = newDataUri.split(',')[1];
  const fileUri = `${FileSystem.cacheDirectory}geo-tagged.jpg`;
  await FileSystem.writeAsStringAsync(fileUri, newBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // 4) save to gallery and get back its asset object (with id!)
  const asset = await MediaLibrary.createAssetAsync(fileUri);
  return asset;
}

export { saveGeoTaggedPhoto };