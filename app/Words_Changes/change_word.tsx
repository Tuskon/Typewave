import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, LogBox, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from '../StackNavigation';
import { Button } from '@rneui/themed';
import { useFonts } from 'expo-font';
import config from "../../backend/config/config";
import { Input, HStack, useToast } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

interface Word {
    word_id: string;
    word: string;
}


export function Change_word() {
    const [search, setSearch] = useState('');
    const [word_db, setWord] = useState<Word[]>([]);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [edit_word, setEdit] = useState('');
    const [currentWordId, setCurrentWordId] = useState('')
    const toast = useToast()


    const filteredData = word_db.filter(item =>
        item.word.toLowerCase().includes(search.toLowerCase())
    );

    async function handleUpdate(varible: string) {

        if (!edit_word) {

            toast.show({
                description: "Fill in all fields",
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
            })

        } else {

            try {

                let response = await fetch(config.urlRootRoute + '/words/WordUpdate', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        word_id: varible,
                        word: edit_word

                    })

                })

                let status = response.status

                if (status == 200 || status == 201) {

                    setModalVisible(false)
                    setEdit('')
                    handleGet()
                    toast.show({
                        description: "Word updated",
                        duration: 2500,
                        bg: 'emerald.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                } else if (status == 404) {

                    toast.show({
                        description: "Word not found",
                        duration: 3500,
                        bg: 'danger.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                } else {

                    toast.show({
                        description: `Error: ${status}`,
                        duration: 3500,
                        bg: 'danger.500',
                        px: '2',
                        py: '2',
                        rounded: 10
                    })

                }

            } catch (error) {

                toast.show({
                    description: `Error: ${error}`,
                    duration: 3500,
                    bg: 'danger.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })

            }
        }
    }

    async function handleDelete(varible: string) {

        try {
            let response = await fetch(config.urlRootRoute + '/words/WordDestroyer', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    word_id: varible
                })
            });

            let status = response.status;

            if (status == 200 || status == 201) {

                handleGet()
                toast.show({
                    description: "Word Deleted",
                    duration: 2500,
                    bg: 'emerald.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })

            } else if (status == 404) {

                toast.show({
                    description: "Words not founded",
                    duration: 3500,
                    bg: 'danger.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })

            } else {

                toast.show({
                    description: `Error: ${status}`,
                    duration: 3500,
                    bg: 'danger.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })
            }
        } catch (error) {

            toast.show({
                description: `Requesition error ${error}`,
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
            })

        }
    };

    const handleGet = async () => {

        try {
            let response = await fetch(config.urlRootRoute + '/words/WordFindAll', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            let status = response.status;
            let data = await response.json();

            if (status == 200 || status == 201) {

                setWord(data);

            } else if (status == 404) {

                toast.show({
                    description: "Missions not founded",
                    duration: 3500,
                    bg: 'danger.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })

            } else {

                toast.show({
                    description: `Error: ${status}`,
                    duration: 3500,
                    bg: 'danger.500',
                    px: '2',
                    py: '2',
                    rounded: 10
                })

            }
        } catch (error) {
            
            toast.show({
                description: `Requesition error ${error}`,
                duration: 3500,
                bg: 'danger.500',
                px: '2',
                py: '2',
                rounded: 10
            })

        }
    };

    useEffect(() => {
        handleGet();
    }, []);


    const [fontsLoaded] = useFonts({
        'Play-Bold': require('../../assets/fonts/Play-Bold.ttf'),
        'Play-Regular': require('../../assets/fonts/Play-Regular.ttf'),
        'PixelifySans-Bold': require('../../assets/fonts/PixelifySans-Bold.ttf'),
        'PixelifySans-Medium': require('../../assets/fonts/PixelifySans-Medium.ttf'),
        'PixelifySans-Regular': require('../../assets/fonts/PixelifySans-Regular.ttf'),
        'PixelifySans-SemiBold': require('../../assets/fonts/PixelifySans-SemiBold.ttf'),
        'PixelifySans-VariableFont_wght': require('../../assets/fonts/PixelifySans-VariableFont_wght.ttf'),
        'VT323-Regular': require('../../assets/fonts/VT323-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#242424',
        },
        view: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
        },
        word_view: {
            marginTop: '10%',
            alignItems: 'center',
            width: '100%',
        },
        scroll_view: {
            flex: 1,
            width: '100%',
        },
        roll_view: {
            marginTop: '4%',
            alignItems: 'center',
            width: '90%',
            backgroundColor: '#3D3D3D',
            borderRadius: 10,
            padding: 20,
        },
        elements_view: {
            width: '100%',
            flexDirection: 'row',
            flex: 1
        },
        ids_view: {
            alignItems: 'center',
            flex: 1
        },
        words_view: {
            alignItems: 'center',
            flex: 1
        },
        buttons_view: {
            justifyContent: 'center',
            flex: 1
        },
        centered_view: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modal_view: {
            width: '90%',
            backgroundColor: '#323232',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
        header_view: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 20,
        },
        headerText_view: {
            flex: 1,
        },
        content_view: {
            width: '100%',
            marginBottom: 20,
        },
        bottom_view: {
            width: '100%',
        },
        text_id: {
            color: '#ab20fd',
            fontSize: 18,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'green',
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 0.5,
        },
        text_worddb: {
            color: '#ab20fd',
            fontSize: 18,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'green',
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 0.5,
        },
        text_word: {
            color: '#ab20fd',
            fontSize: 33,
            fontFamily: "PixelifySans-SemiBold",
            textShadowColor: 'blue',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 1.5,
        },
        text_input: {
            fontFamily: 'PixelifySans-Regular',
            color: 'white',
            backgroundColor: '#3D3D3D',
            padding: 10,
            borderRadius: 5,
        },
        text_headerText: {
            fontFamily: 'PixelifySans-SemiBold',
            color: 'white',
            fontSize: 20,
        },
        text_buttonText: {
            fontFamily: 'PixelifySans-SemiBold',
            color: 'white',
            fontSize: 15,
        },
        button_closeButton: {
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        button_form: {
            flex: 1,
            backgroundColor: '#ab20fd',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
        }
    });

    return (
        <KeyboardAvoidingView style={styles.container}>

            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>

                <View style={styles.view}>

                    <View style={styles.word_view}>
                        <Text style={styles.text_word}>Destroy or Update?</Text>
                    </View>

                    <Input
                        fontFamily={'PixelifySans-Regular'}
                        color={'white'}
                        marginTop={"4%"}
                        borderRadius={"20"}

                        width={"90%"}
                        marginBottom={"1%"}
                        backgroundColor={'gray.600'}
                        borderColor={'gray.600'}
                        placeholder="Search..."
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />

                    <ScrollView contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        style={styles.scroll_view}>

                        {filteredData.map((word_db, index) => (
                            <View key={index} style={styles.roll_view}>

                                <View style={styles.elements_view} >

                                    <View style={styles.ids_view}>
                                        <Text style={styles.text_id}>ID: {word_db.word_id}</Text>
                                    </View>

                                    <View style={styles.words_view}>
                                        <Text style={styles.text_worddb}>{word_db.word}</Text>
                                    </View>

                                    <HStack space={4} style={styles.buttons_view}>

                                        <Pressable onPress={() => handleDelete(word_db.word_id)}>

                                            {({ pressed }) => (
                                                <MaterialIcons size={21}
                                                    color={'#ab20fd'}
                                                    name="delete"
                                                    style={{
                                                        textShadowColor: 'green',
                                                        textShadowOffset: { width: 0.5, height: 0.5 },
                                                        textShadowRadius: 0.5,
                                                        transform: [{ scale: pressed ? 0.83 : 1 }]
                                                    }} />
                                            )}

                                        </Pressable>

                                        <Pressable onPress={() => {
                                            setCurrentWordId(word_db.word_id);
                                            setModalVisible(true)
                                        }}>

                                            {({ pressed }) => (
                                                <MaterialIcons size={21}
                                                    color={'#ab20fd'}
                                                    name="edit"
                                                    style={{
                                                        textShadowColor: 'green',
                                                        textShadowOffset: { width: 0.5, height: 0.5 },
                                                        textShadowRadius: 0.5,
                                                        transform: [{ scale: pressed ? 0.83 : 1 }]
                                                    }} />
                                            )}

                                        </Pressable>

                                    </HStack>

                                    <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <View style={styles.centered_view}>

                                            <View style={styles.modal_view}>

                                                <View style={styles.header_view}>

                                                    <View style={styles.headerText_view}>

                                                        <Text style={styles.text_headerText}>Edit the word</Text>

                                                    </View>

                                                    <Pressable style={styles.button_closeButton} onPress={() => setModalVisible(false)}>
                                                        <MaterialIcons name="close" size={28} />
                                                    </Pressable>

                                                </View>


                                                <View style={styles.content_view}>

                                                    <Input
                                                        placeholder="Type a new word"
                                                        style={styles.text_input}
                                                        onChangeText={(text) => setEdit(text)}
                                                    />

                                                </View>


                                                <View style={styles.bottom_view}>

                                                    <HStack space={2}>

                                                        <Button onPress={() => setModalVisible(false)} style={styles.button_form}>
                                                            <Text style={styles.text_buttonText}>Cancel</Text>
                                                        </Button>

                                                        <Button onPress={() => handleUpdate(currentWordId)} style={styles.button_form}>
                                                            <Text style={styles.text_buttonText}>Save</Text>
                                                        </Button>

                                                    </HStack>

                                                </View>

                                            </View>

                                        </View>
                                    </Modal>

                                </View>

                            </View>

                        ))}

                    </ScrollView>

                </View>

            </ScrollView>

        </KeyboardAvoidingView >
    );
}
