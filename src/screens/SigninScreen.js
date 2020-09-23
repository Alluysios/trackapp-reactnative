import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const SigninScreen = ({ navigation }) => {
    return (
        <>
            <Text>SigninScreen</Text>
            <Button title="Go to Main Flow" onPress={() => navigation.navigate('mainFlow') } />
        </>
    )
}

const styles = StyleSheet.create({});

export default SigninScreen;