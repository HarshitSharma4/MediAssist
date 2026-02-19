import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Text, useTheme, Card, Button, Surface, Avatar, Chip, IconButton, List } from 'react-native-paper';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useReportStore } from '../../../store/useReportStore';

const { width } = Dimensions.get('window');

const ReportDetailsScreen = ({ route, navigation }: any) => {
    const theme = useTheme();
    const { reportId } = route.params;
    const report = useReportStore((state) => state.getReportById(reportId));

    if (!report) {
        return (
            <ScreenWrapper style={styles.screen}>
                <View style={styles.emptyContainer}>
                    <Text variant="titleLarge">Report not found</Text>
                    <Button onPress={() => navigation.goBack()}>Go Back</Button>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Visual Header / Preview */}
                <Surface style={styles.previewSurface} elevation={2}>
                    <Image
                        source={{ uri: report.fileUri || 'https://images.unsplash.com/photo-1576091160550-217359f42f8c?w=400' }}
                        style={styles.previewImage}
                        resizeMode="cover"
                    />
                    <View style={styles.previewOverlay}>
                        <IconButton icon="fullscreen" iconColor="white" onPress={() => { }} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} />
                    </View>
                </Surface>

                {/* Main Info Card */}
                <Surface style={styles.infoCard} elevation={1}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text variant="headlineSmall" style={styles.reportType}>{report.type}</Text>
                            <Text variant="bodyMedium" style={styles.hospital}>{report.hospitalName || 'City Hospital'}</Text>
                        </View>
                        <Chip icon="calendar" style={styles.dateChip}>{report.date}</Chip>
                    </View>

                    <View style={styles.metaGrid}>
                        <View style={styles.metaItem}>
                            <Text variant="labelSmall" style={styles.metaLabel}>Doctor</Text>
                            <Text variant="bodyMedium" style={styles.metaValue}>{report.doctorName || 'Dr. Smith'}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Text variant="labelSmall" style={styles.metaLabel}>Reference</Text>
                            <Text variant="bodyMedium" style={styles.metaValue}>#{report.id.substring(0, 8)}</Text>
                        </View>
                    </View>
                </Surface>

                {/* AI Insights Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>AI Health Analysis</Text>
                        <Chip icon="creation" textStyle={{ fontSize: 10 }} style={styles.aiChip}>SMART EXTRACT</Chip>
                    </View>

                    <Card style={styles.analysisCard}>
                        <Card.Content>
                            <Text variant="bodyMedium" style={styles.summaryText}>
                                {report.summary || "Summary generation in progress... Our AI is analyzing the text for clinical markers."}
                            </Text>

                            <List.Section style={{ marginTop: 10 }}>
                                <List.Item
                                    title="Diagnosis"
                                    description={report.diagnosis || "No critical diagnosis found."}
                                    left={props => <List.Icon {...props} icon="check-decagram-outline" color="#00695C" />}
                                />
                                <List.Item
                                    title="Recommended Medicines"
                                    description={report.medicines || "Follow doctor's prescription."}
                                    left={props => <List.Icon {...props} icon="pill" color="#FF7043" />}
                                />
                            </List.Section>
                        </Card.Content>
                    </Card>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionSection}>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]}
                        onPress={() => navigation.navigate('Ask', { context: `Report: ${report.type} from ${report.hospitalName}` })}
                    >
                        <Icon name="robot" size={24} color="white" />
                        <Text style={styles.btnText}>Explain with AI</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: theme.colors.secondary }]}
                        onPress={() => alert('Translation Feature: Available in 12 languages.')}
                    >
                        <Icon name="translate" size={24} color="white" />
                        <Text style={styles.btnText}>Translate</Text>
                    </TouchableOpacity>
                </View>

                {/* Download / Share */}
                <Button
                    mode="outlined"
                    icon="share-variant"
                    onPress={() => { }}
                    style={styles.shareBtn}
                    labelStyle={{ fontWeight: 'bold' }}
                >
                    Share with Doctor
                </Button>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F8F9FA',
    },
    container: {
        padding: 20,
    },
    previewSurface: {
        height: 180,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    previewOverlay: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginBottom: 25,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    reportType: {
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    hospital: {
        color: '#666',
        marginTop: 2,
    },
    dateChip: {
        backgroundColor: '#F0F2F5',
        borderRadius: 10,
    },
    metaGrid: {
        flexDirection: 'row',
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 15,
        gap: 30,
    },
    metaItem: {
        flex: 1,
    },
    metaLabel: {
        color: '#999',
        fontWeight: 'bold',
    },
    metaValue: {
        fontWeight: 'bold',
        color: '#333',
        marginTop: 2,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    aiChip: {
        backgroundColor: '#E0F2F1',
    },
    analysisCard: {
        backgroundColor: 'white',
        borderRadius: 24,
    },
    summaryText: {
        lineHeight: 22,
        color: '#444',
    },
    actionSection: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15,
    },
    actionBtn: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        elevation: 2,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    shareBtn: {
        borderRadius: 18,
        borderColor: '#00695C',
        borderWidth: 1.5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ReportDetailsScreen;
