import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, Avatar, Surface, HelperText } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { useAuthStore } from '../../store/useAuthStore';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const EditProfileScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { user, updateProfile } = useAuthStore() as any; // Assuming updateProfile exists or we add it

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [bloodGroup, setBloodGroup] = useState('O+');
    const [weight, setWeight] = useState('70');
    const [height, setHeight] = useState('175');

    const handleSave = () => {
        // Mock update
        Toast.show({
            type: 'success',
            text1: 'Profile Updated',
            text2: 'Your information has been saved successfully.',
        });
        navigation.goBack();
    };

    return (
        <ScreenWrapper style={styles.screen}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
            >
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                    <View style={styles.avatarSection}>
                        <View style={styles.avatarWrapper}>
                            <Avatar.Image size={120} source={{ uri: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}` }} style={{ backgroundColor: '#E0F2F1' }} />
                            <TouchableOpacity style={styles.cameraIcon}>
                                <Icon name="camera" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text variant="labelLarge" style={{ marginTop: 10, color: theme.colors.primary }}>Change Photo</Text>
                    </View>

                    <Surface style={styles.formCard} elevation={1}>
                        <View style={styles.inputGroup}>
                            <Text variant="labelMedium" style={styles.label}>Full Name</Text>
                            <TextInput
                                mode="flat"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                                underlineColor="transparent"
                                activeUnderlineColor={theme.colors.primary}
                                left={<TextInput.Icon icon="account-outline" />}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text variant="labelMedium" style={styles.label}>Email Address</Text>
                            <TextInput
                                mode="flat"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                underlineColor="transparent"
                                activeUnderlineColor={theme.colors.primary}
                                keyboardType="email-address"
                                left={<TextInput.Icon icon="email-outline" />}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text variant="labelMedium" style={styles.label}>Blood Group</Text>
                                <TextInput
                                    mode="flat"
                                    value={bloodGroup}
                                    onChangeText={setBloodGroup}
                                    style={styles.input}
                                    underlineColor="transparent"
                                    activeUnderlineColor={theme.colors.primary}
                                    placeholder="e.g. O+"
                                />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text variant="labelMedium" style={styles.label}>Weight (kg)</Text>
                                <TextInput
                                    mode="flat"
                                    value={weight}
                                    onChangeText={setWeight}
                                    style={styles.input}
                                    underlineColor="transparent"
                                    activeUnderlineColor={theme.colors.primary}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text variant="labelMedium" style={styles.label}>Height (cm)</Text>
                            <TextInput
                                mode="flat"
                                value={height}
                                onChangeText={setHeight}
                                style={styles.input}
                                underlineColor="transparent"
                                activeUnderlineColor={theme.colors.primary}
                                keyboardType="numeric"
                                left={<TextInput.Icon icon="human-male-height" />}
                            />
                        </View>
                    </Surface>

                    <Button
                        mode="contained"
                        onPress={handleSave}
                        style={styles.saveBtn}
                        contentStyle={{ height: 50 }}
                    >
                        Save Changes
                    </Button>

                    <View style={{ height: 50 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F8F9FA',
    },
    container: {
        padding: 24,
    },
    avatarSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarWrapper: {
        position: 'relative',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#00695C',
        padding: 8,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: 'white',
    },
    formCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        gap: 15,
        marginBottom: 30,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: '#666',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F0F2F5',
        borderRadius: 12,
        height: 55,
    },
    row: {
        flexDirection: 'row',
        gap: 15,
    },
    saveBtn: {
        borderRadius: 15,
    }
});

export default EditProfileScreen;
