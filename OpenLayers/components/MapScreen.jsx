import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MapScreen = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol/ol.css" />
      <script src="https://cdn.jsdelivr.net/npm/ol/ol.js"></script>
      <style>
        html, body, #map {
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
        }

        #map {
            background-color: lightblue;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([77.2090, 28.6139]),
            zoom: 4
          })
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
webview: {
    flex: 1,
    borderWidth: 10,
    borderColor: "#333",
    borderRadius: 28,
  },
});

export default MapScreen;

















































// import { SafeAreaView } from "react-native";
// import TileLayer from "ol/layer/Tile";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
// import { Map, View as olView } from "ol"
// import { OSM } from "ol/source";
// import { useEffect, useRef } from "react";
// import WebView from "react-native-webview";

// function MapScreen() {
//     const mapRef = useRef(null);
//     const tileLayer = new TileLayer({
//         source: new OSM(),
//     });

//     const vectorSource = new VectorSource();
//     const vectorLayer = new VectorLayer({
//         source: vectorSource,
//         // style
//     });


//     useEffect(()=>{
//         const map = new Map({
//             target: mapRef.current,
//             layers: [tileLayer, vectorLayer],
//             view: new olView({
//                 center: [0, 0],
//                 zoom: 2,

//             }),
//         });
//     }, []);

//     return (
//         <WebView ref={mapRef}>
            
//         </WebView>
//     )
// }

// export default MapScreen;
