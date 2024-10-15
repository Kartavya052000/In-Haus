import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Profile() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing("front");
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flip_camera_btn} onPress={() => {console.log('take picture')}}>
          <FontAwesome6 name="camera" size={44} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.take_photo_btn} onPress={() => {facing=='back'?setFacing('front'):setFacing('back')}}>
          <FontAwesome6 name="camera-rotate" size={44} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  flip_camera_btn: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:30,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
  },
  take_photo_btn: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:30,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});