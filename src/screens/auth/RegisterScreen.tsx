import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { useAuthStore } from '../../store/useAuthStore';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }: any) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const login = useAuthStore((state) => state.login);

    const validate = () => {
        let isValid = true;
        let newErrors = { name: '', email: '', password: '' };

        if (!name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleRegister = () => {
        if (validate()) {
            // Simulate API call
            setTimeout(() => {
                login({ id: '1', name, email });
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful',
                    text2: `Welcome, ${name}!`
                });
            }, 500);
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Create Account</Text>

            <TextInput
                label="Full Name"
                value={name}
                onChangeText={(text) => { setName(text); setErrors({ ...errors, name: '' }) }}
                mode="outlined"
                style={styles.input}
                error={!!errors.name}
            />
            <HelperText type="error" visible={!!errors.name}>
                {errors.name}
            </HelperText>

            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => { setEmail(text); setErrors({ ...errors, email: '' }) }}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
            />
            <HelperText type="error" visible={!!errors.email}>
                {errors.email}
            </HelperText>

            <TextInput
                label="Password"
                value={password}
                onChangeText={(text) => { setPassword(text); setErrors({ ...errors, password: '' }) }}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                error={!!errors.password}
            />
            <HelperText type="error" visible={!!errors.password}>
                {errors.password}
            </HelperText>

            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Register
            </Button>

            <Button onPress={() => navigation.navigate('Login')} style={styles.link}>
                Already have an account? Login
            </Button>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginTop: 5,
    },
    button: {
        marginTop: 10,
        padding: 6,
    },
    link: {
        marginTop: 10,
    }
});

export default RegisterScreen;
