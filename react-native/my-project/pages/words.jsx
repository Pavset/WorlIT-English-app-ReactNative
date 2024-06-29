import { StyleSheet, Text, View, LogBox, TouchableOpacity, TextInput, Image, Linking, ScrollView, StatusBar,ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import NavigationPanelTest from "../components/navPanelTest"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url, styles} from "../App.js"

export default function Words({navigation, route}) {
    const [error, setError] = useState();
    const moduleName = route.params.moduleName;
    const [noun, setNouns] = useState([]);
    const [adj, setAdjs] = useState([]);
    const [verb, setVerbs] = useState([]);
    const [words, setWords] = useState([]);

    async function handleSubmit() {
        try {
            const response = await fetch(`${url}/wordCounters/${route.params.words}`, {
                method: 'GET',
                headers: {
                    "token": await AsyncStorage.getItem('apikey')
                }
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setWords(data.listOfWords);
                const nounList = [];
                const adjList = [];
                const verbList = [];

                data.listOfWords.forEach((v) => {
                    let images = [];
                    for (let a = 0; a < v.counter; a++) {
                        images.push(
                            <Image 
                                key={a}
                                source={{ uri: "https://i.postimg.cc/x1GJ8qSr/Ellipse-5.png" }} 
                                style={{ width: 16, height: 16 }} 
                            />
                        );
                    }
                    if (v.role === 'Іменник') {
                        nounList.push([v.word, v.translation, v.counter, images]);
                    } else if (v.role === 'Прикметник') {
                        adjList.push([v.word, v.translation, v.counter, images]);
                    } else if (v.role === "Дієслово") {
                        verbList.push([v.word, v.translation, v.counter, images]);
                    }
                });

                setNouns(nounList);
                setAdjs(adjList);
                setVerbs(verbList);
            }
        } catch (err) {
            navigation.navigate("Error");
        }
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <View style={styles.profileContainer}>
            <View style={{backgroundColor: "#252124", width: '100%', height: 50, justifyContent: 'center', alignItems: "center"}}>
                <Text style={{color: "white", fontSize: 24}}>{moduleName}</Text>
            </View>
            {!words.length && !error && (
                <View style={{height: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large" color="#e19a38"/>
                </View>
            )}
            {error && (
                <View style={{height: '100%',width: "100%", alignItems: "center", justifyContent: "center"}}>
                    <View style={{width: '90%', height: "20%", backgroundColor: '#252124',borderColor: '#E19A38',borderWidth: 2,borderRadius: 15, justifyContent: 'space-evenly',alignItems: 'center'}}>
                        <Text style={{fontSize: 24, color: "#E19A38"}}>Виникла помилка!</Text>
                        <Text style={{color: 'white', fontSize: 20}}>{error}</Text>
                        <TouchableOpacity style={{width: '90%',height:'30%',backgroundColor: '#3B3B3B',borderColor: '#4F4F4F',borderWidth: 2,borderRadius: 15,justifyContent: 'center', alignItems: 'center'}} onPress={()=>{navigation.goBack()}}>
                            <Text style={{color: 'white', fontSize: 20}}>Повернутися назад</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {words.length > 0 && (
                <ScrollView style={styles.scroll100}>
                    <View style={{width: "100%", height: '100%', flexDirection: 'column', alignItems: 'center', paddingTop: 10, gap: 20}}>
                        {noun.length > 0 && (
                            <View style={{width: "90%", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 20}}>
                                <View style={styles.roleBorder}>
                                    <Text style={styles.roleText}>Іменник</Text>
                                </View>
                                {noun.map((v, i) => (
                                    <View key={i} style={styles.roleExample}>
                                        <Text style={{color: 'white', fontSize: 16,  textAlign: 'left'}}>{v[0]}</Text>
                                        <View style={{flexDirection: 'row', gap: 10}}>
                                            {v[3]}
                                        </View>
                                        <Text style={{color: 'white', fontSize: 16,  textAlign: "right"}}>{v[1]}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        {adj.length > 0 && (
                            <View style={{width: "90%", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 20}}>
                                <View style={styles.roleBorder}>
                                    <Text style={styles.roleText}>Прикметник</Text>
                                </View>
                                {adj.map((v, i) => (
                                    <View key={i} style={styles.roleExample}>
                                        <Text style={{color: 'white', fontSize: 16, width: '30%', textAlign: 'left'}}>{v[0]}</Text>
                                        <View style={{flexDirection: 'row', gap: 10}}>
                                            {v[3]}
                                        </View>
                                        <Text style={{color: 'white', fontSize: 16, width: '30%', textAlign: "right"}}>{v[1]}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                        {verb.length > 0 && (
                            <View style={{width: "90%", flexDirection: "column", alignItems: 'center', justifyContent: 'center', gap: 20}}>
                                <View style={styles.roleBorder}>
                                    <Text style={styles.roleText}>Дієслово</Text>
                                </View>
                                {verb.map((v, i) => (
                                    <View key={i} style={styles.roleExample}>
                                        <Text style={{color: 'white', fontSize: 16, width: '30%', textAlign: 'left'}}>{v[0]}</Text>
                                        <View style={{flexDirection: 'row', gap: 10}}>
                                            {v[3]}
                                        </View>
                                        <Text style={{color: 'white', fontSize: 16, width: '30%', textAlign: "right"}}>{v[1]}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
            <NavigationPanelTest word={false} navigation={navigation}/>
        </View>
    );
}
