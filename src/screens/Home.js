import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function Home({ navigation }) {
  useEffect(() => {}, []);
  return (
    <View style={styles.body}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3D67FF',
    flex: 1,
  },
});
export default Home;
