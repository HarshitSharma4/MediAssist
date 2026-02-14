import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Chip, useTheme, Card, ProgressBar } from 'react-native-paper';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { useReportStore } from '../../../store/useReportStore';
import Toast from 'react-native-toast-message';

const ReportMetadataScreen = ({ route, navigation }: any) => {
    const { fileUri, type } = route.params || {};
    const theme = useTheme();
    const addReport = useReportStore((state) => state.addReport);

    const [loading, setLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);

    const [doctorName, setDoctorName] = useState('');
    const [hospitalName, setHospitalName] = useState('');
    const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
    const [summary, setSummary] = useState('');

    const handleAnalyze = () => {
        setLoading(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setLoading(false);
            setAnalyzed(true);
            setSummary("Based on the uploaded report, the patient shows signs of mild infection. White blood cell count is slightly elevated. Suggested rest and hydration.");
            Toast.show({
                type: 'success',
                text1: 'Analysis Complete',
                text2: 'AI has generated a summary.'
            });
        }, 2000);
    };

    const handleSave = () => {
        const newReport = {
            id: Date.now().toString(),
            type: type === 'pdf' ? 'Report' : 'Image',
            doctorName,
            hospitalName,
            date: reportDate,
            fileUri,
            summary,
            diagnosis: 'Viral Fever',
            medicines: 'Paracetamol'
        };
        addReport(newReport);
        Toast.show({
            type: 'success',
            text1: 'Report Saved',
            text2: 'Added to your medical history.'
        });
        navigation.navigate('History');
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text variant="headlineMedium" style={styles.title}>Report Details</Text>

                {/* File Preview Placeholder */}
                <Card style={styles.previewCard}>
                    <Card.Content style={{ alignItems: 'center', padding: 20 }}>
                        <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>{type?.toUpperCase()} UPLOADED</Text>
                        <Text variant="bodySmall" style={{ color: theme.colors.outline }}>{fileUri}</Text>
                    </Card.Content>
                </Card>

                {/* Metadata Form */}
                <View style={styles.form}>
                    <TextInput
                        label="Doctor Name"
                        value={doctorName}
                        onChangeText={setDoctorName}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Hospital Name"
                        value={hospitalName}
                        onChangeText={setHospitalName}
                        mode="outlined"
                        style={styles.input}
                    />
                    <TextInput
                        label="Date (YYYY-MM-DD)"
                        value={reportDate}
                        onChangeText={setReportDate}
                        mode="outlined"
                        style={styles.input}
                    />
                </View>

                {/* AI Section */}
                <View style={styles.aiSection}>
                    {!analyzed ? (
                        <View>
                            {loading && <ProgressBar indeterminate color={theme.colors.primary} style={{ marginBottom: 10 }} />}
                            <Button mode="contained-tonal" icon="robot" onPress={handleAnalyze} disabled={loading}>
                                {loading ? 'Analyzing...' : 'Analyze with AI'}
                            </Button>
                        </View>
                    ) : (
                        <Card style={[styles.summaryCard, { backgroundColor: theme.colors.secondaryContainer }]}>
                            <Card.Title title="AI Summary" left={(props) => <Text style={{ fontSize: 24 }}>🤖</Text>} />
                            <Card.Content>
                                <Text variant="bodyMedium">{summary}</Text>
                                <View style={styles.chipRow}>
                                    <Chip icon="translate" onPress={() => alert('Translating to Hindi...')} style={styles.actionChip}>Translate</Chip>
                                    <Chip icon="chat-processing" onPress={() => navigation.navigate('Ask', { context: summary })} style={styles.actionChip}>Chat</Chip>
                                </View>
                            </Card.Content>
                        </Card>
                    )}
                </View>

                <Button mode="contained" onPress={handleSave} style={styles.saveBtn} disabled={!analyzed}>
                    Save to History
                </Button>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    previewCard: {
        marginBottom: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    form: {
        marginBottom: 20
    },
    input: {
        marginBottom: 10
    },
    aiSection: {
        marginBottom: 20
    },
    summaryCard: {
        padding: 10
    },
    chipRow: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 10
    },
    actionChip: {
        backgroundColor: 'white'
    },
    saveBtn: {
        padding: 5
    }
});

export default ReportMetadataScreen;
