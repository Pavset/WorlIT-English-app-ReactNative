import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import {url, styles} from "../App.js"
import { useState } from 'react';
export default function Accept({navigation}) {



    return(
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={[styles.orange,styles.font40]}>WORLD</Text>
              <Text style={[styles.white,styles.font40]}>IT</Text>
          </View>
  
          <View style={{height: '100%',width: "100%", alignItems: "center", justifyContent: "center"}}>
                    <View style={{width: '90%', height: "20%", backgroundColor: '#252124',borderColor: '#E19A38',borderWidth: 2,borderRadius: 15, justifyContent: 'space-evenly',alignItems: 'center'}}>
                        <Text style={{fontSize: 24, color: "#E19A38"}}>Ви зареєструвались!</Text>
                        <Text style={{color: 'white', fontSize: 20}}>Очікуйте дзвінок.</Text>
                    </View>
                </View>

      </View>
    )
  }
  