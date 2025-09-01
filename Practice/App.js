import { StatusBar } from 'expo-status-bar';
import CameraScreen from './screens/CameraScreen';
import MediaFiles from './components/MediaFiles';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <CameraScreen />
      <MediaFiles />
    </>
  );
}