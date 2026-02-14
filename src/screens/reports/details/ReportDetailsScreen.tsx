import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Chip, useTheme, Card, Button } from 'react-native-paper';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { useReportStore } from '../../../store/useReportStore';

const ReportDetailsScreen = ({ route, navigation }: any) => {
    const { reportId } = route.params || {};
    const theme = useTheme();
    const getReportById = useReportStore((state) => state.getReportById);
    const report = getReportById(reportId);

    if (!report) {
        return (
            <ScreenWrapper style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>Report not found!</Text>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Text variant="headlineSmall" style={styles.title}>{report.type} Details</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.row}>
                            <Text variant="labelLarge">Date:</Text>
                            <Text variant="bodyMedium">{report.date}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text variant="labelLarge">Doctor:</Text>
                            <Text variant="bodyMedium">{report.doctorName || 'N/A'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text variant="labelLarge">Hospital:</Text>
                            <Text variant="bodyMedium">{report.hospitalName || 'N/A'}</Text>
                        </View>
                    </Card.Content>
                </Card>

                {report.summary && (
                    <Card style={[styles.card, { backgroundColor: theme.colors.secondaryContainer }]}>
                        <Card.Title title="AI Summary" left={(props) => <Text style={{ fontSize: 24 }}>🤖</Text>} />
                        <Card.Content>
                            <Text variant="bodyMedium">{report.summary}</Text>
                        </Card.Content>
                    </Card>
                )}

                <View style={styles.actions}>
                    <Button
                        mode="contained"
                        icon="chat-processing"
                        onPress={() => navigation.navigate('Ask', { context: `Regarding report from ${report.date}: ${report.summary}` })}
                        style={styles.actionBtn}
                    >
                        Chat with Report
                    </Button>
                    <Button
                        mode="outlined"
                        icon="translate"
                        onPress={() => alert('Translation feature coming soon!')}
                        style={styles.actionBtn}
                    >
                        Translate
                    </Button>
                </View>

                <Button mode="text" style={{ marginTop: 20 }}>View Original File</Button>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    card: {
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    actions: {
        gap: 10,
        marginTop: 10
    },
    actionBtn: {
        marginBottom: 10
    }
});

export default ReportDetailsScreen;
