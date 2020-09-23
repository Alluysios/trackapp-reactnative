import React, { useState } from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, buttonText }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <>
            <Spacer>
                <Text h3 style={styles.heading}>{headerText}</Text>
            </Spacer>
            <Input label="Email" value={email} onChangeText={setEmail} autoCorrect={false} />
            <Input secureTextEntry label="Password" value={password} onChangeText={setPassword} autoCorrect={false} />
            {errorMessage ? (<Text style={styles.errorMessage}>{errorMessage}</Text>) : null}
            <Spacer>
                <Button title={buttonText} onPress={() => onSubmit({email, password})} />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    heading: {
        marginBottom: 30
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    }
});

export default AuthForm;