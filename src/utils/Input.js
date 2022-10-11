import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';

const Input = (props) => {
  return (
    <View style={[props.style, styles.view]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.textInfo}>{props.titleInfo}</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.icon, props.error && styles.iconError]}>
          <FontAwesome5 name={props.icon} size={24} color={'#14D39A'} />
        </View>
        <TextInput
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#7E7E7E"
          secureTextEntry={props.secureTextEntry ? true : false}
          onChangeText={(value) => props.onChangeText(value)}
          style={[styles.input, props.error && styles.inputError]}
        />
      </View>
      <Text style={styles.textError}>{props.textError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '500',
    marginRight: 10,
    textAlign: 'center',
  },
  textInfo: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '100',
    fontStyle: 'italic',
    marginRight: 10,
  },
  textError: {
    color: '#B21F28',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 40,
    marginTop: 15
  },
  row: {
    height: 50,
    flexDirection: 'row',
  },
  input: {
    width: '75%',
    height: 50,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    color: '#000000',
    marginTop: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  inputError: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    borderRightWidth: 2,
    borderRightColor: 'red',
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
  icon: {
    width: 60,
    height: 50,
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginLeft: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconError: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    borderTopWidth: 2,
    borderTopColor: 'red',
  },
});

export default Input;
