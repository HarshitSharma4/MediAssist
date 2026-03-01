import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { useAuthStore } from '../../store/useAuthStore';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const { login, isLoading } = useAuthStore();

    const validate = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };
        if (!email) { newErrors.email = 'Email is required'; isValid = false; }
        if (!password) { newErrors.password = 'Password is required'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        try {
            await login(email, password);
            Toast.show({ type: 'success', text1: 'Login Successful', text2: 'Welcome back to MediAssist!' });
        } catch (e: any) {
            Toast.show({ type: 'error', text1: 'Login Failed', text2: e.message || 'Please check your credentials.' });
        }
    };

    return (
        <ScreenWrapper style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={(t) => { setEmail(t); setErrors({ ...errors, email: '' }); }}
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
            />
            <HelperText type="error" visible={!!errors.email}>{errors.email}</HelperText>

            <TextInput
                label="Password"
                value={password}
                onChangeText={(t) => { setPassword(t); setErrors({ ...errors, password: '' }); }}
                mode="outlined"
                style={styles.input}
                secureTextEntry
                error={!!errors.password}
            />
            <HelperText type="error" visible={!!errors.password}>{errors.password}</HelperText>

            <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                loading={isLoading}
                disabled={isLoading}
            >
                Login
            </Button>

            <Button onPress={() => navigation.navigate('Register')} style={styles.link}>
                Don't have an account? Register
            </Button>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, justifyContent: 'center' },
    title: { marginBottom: 20, textAlign: 'center' },
    input: { marginTop: 5 },
    button: { marginTop: 10, padding: 6 },
    link: { marginTop: 10 },
});

export default LoginScreen;
