import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const UploadScreen = ({ navigation }: any) => {
    const theme = useTheme();

    const handlePickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });
            if (!result.canceled) {
                navigation.navigate('ReportMetadata', {
                    fileUri: result.assets[0].uri,
                    type: 'pdf'
                });
            }
        } catch (err) {
            console.log('Error picking document', err);
        }
    };

    const handlePickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

            if (!result.canceled) {
                navigation.navigate('ReportMetadata', {
                    fileUri: result.assets[0].uri,
                    type: 'image'
                });
            }
        } catch (err) {
            console.log('Error picking image', err);
        }
    };

    const handleCamera = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert("Permission Denied", "You've refused to allow this app to access your camera!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                quality: 0.8
            });

            if (!result.canceled) {
                navigation.navigate('ReportMetadata', {
                    fileUri: result.assets[0].uri,
                    type: 'image'
                });
            }

        } catch (err) {
            console.log('Error launching camera', err);
        }
    }

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                    Upload Reports
                </Text>
            </View>

            <View style={styles.container}>
                <View style={styles.actionsGrid}>
                    <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} onPress={handlePickDocument}>
                        <Card.Content style={styles.cardContent}>
                            <Icon name="file-pdf-box" size={40} color={theme.colors.primary} />
                            <Text variant="labelLarge" style={styles.cardText}>Upload PDF</Text>
                        </Card.Content>
                    </Card>

                    <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} onPress={handlePickImage}>
                        <Card.Content style={styles.cardContent}>
                            <Icon name="image" size={40} color={theme.colors.primary} />
                            <Text variant="labelLarge" style={styles.cardText}>Upload Image</Text>
                        </Card.Content>
                    </Card>

                    <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]} onPress={handleCamera}>
                        <Card.Content style={styles.cardContent}>
                            <Icon name="camera" size={40} color={theme.colors.primary} />
                            <Text variant="labelLarge" style={styles.cardText}>Scan Report</Text>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    },
    header: {
        padding: 20,
        alignItems: 'center'
    },
    actionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10
    },
    actionCard: {
        width: '30%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    cardText: {
        marginTop: 8,
        textAlign: 'center',
    }
});

export default UploadScreen;
