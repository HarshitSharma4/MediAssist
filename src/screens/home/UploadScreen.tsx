import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Surface, useTheme, Button, Avatar } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const UploadScreen = ({ navigation }: any) => {
    const theme = useTheme();

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'image/*'],
        });
        if (!result.canceled) {
            navigation.navigate('ReportMetadata', { fileUri: result.assets[0].uri, type: 'pdf' });
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            navigation.navigate('ReportMetadata', { fileUri: result.assets[0].uri, type: 'image' });
        }
    };

    const scanCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });
        if (!result.canceled) {
            navigation.navigate('ReportMetadata', { fileUri: result.assets[0].uri, type: 'image' });
        }
    };

    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text variant="headlineSmall" style={styles.title}>Secure Upload</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>Our AI will extract health insights from your reports automatically.</Text>
                </View>

                {/* Primary Upload Card */}
                <Surface style={styles.mainDropZone} elevation={2}>
                    <View style={styles.dropZoneIcon}>
                        <Icon name="cloud-upload-outline" size={60} color={theme.colors.primary} />
                    </View>
                    <Text variant="titleLarge" style={styles.dropZoneTitle}>Drop your reports here</Text>
                    <Text variant="bodySmall" style={styles.dropZoneSub}>Supports PDF, JPG, PNG up to 10MB</Text>

                    <Button
                        mode="contained"
                        onPress={pickDocument}
                        style={styles.primaryBtn}
                        contentStyle={{ height: 50 }}
                    >
                        Browser Files
                    </Button>
                </Surface>

                <Text variant="titleMedium" style={styles.sectionTitle}>Other Options</Text>

                <View style={styles.optionRow}>
                    <TouchableOpacity style={styles.optionCard} onPress={scanCamera}>
                        <Surface style={styles.optionSurface} elevation={1}>
                            <Avatar.Icon size={48} icon="camera-outline" style={{ backgroundColor: '#E1F5FE' }} color="#0288D1" />
                            <Text variant="labelLarge" style={styles.optionLabel}>Scan Report</Text>
                        </Surface>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={pickImage}>
                        <Surface style={styles.optionSurface} elevation={1}>
                            <Avatar.Icon size={48} icon="image-outline" style={{ backgroundColor: '#FFF3E0' }} color="#F57C00" />
                            <Text variant="labelLarge" style={styles.optionLabel}>Gallery</Text>
                        </Surface>
                    </TouchableOpacity>
                </View>

                <Surface style={styles.securityInfo} elevation={0}>
                    <Icon name="shield-check-outline" size={24} color="#4CAF50" />
                    <View style={{ flex: 1 }}>
                        <Text variant="labelMedium" style={{ color: '#2E7D32', fontWeight: 'bold' }}>Privacy Protected</Text>
                        <Text variant="bodySmall" style={{ color: '#666' }}>All medical data is encrypted and HIPAA compliant.</Text>
                    </View>
                </Surface>

                {/* History Quick Link */}
                <Button
                    mode="text"
                    onPress={() => navigation.navigate('History')}
                    style={{ marginTop: 20 }}
                    icon="history"
                >
                    View Upload History
                </Button>

            </ScrollView>
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
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    subtitle: {
        textAlign: 'center',
        color: '#666',
        marginTop: 8,
        lineHeight: 20,
    },
    mainDropZone: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
    },
    dropZoneIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    dropZoneTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    dropZoneSub: {
        color: '#999',
        marginBottom: 24,
    },
    primaryBtn: {
        width: '100%',
        borderRadius: 15,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    optionRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 30,
    },
    optionCard: {
        flex: 1,
    },
    optionSurface: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        gap: 12,
    },
    optionLabel: {
        fontWeight: 'bold',
    },
    securityInfo: {
        flexDirection: 'row',
        backgroundColor: '#E8F5E9',
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        gap: 12,
    }
});

export default UploadScreen;
