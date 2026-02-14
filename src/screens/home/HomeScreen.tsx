import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, useTheme, Button, ProgressBar } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const user = useAuthStore((state) => state.user);

    // Mock Data
    const recentReports = [
        { id: '1', title: 'Blood Test Results', date: '12 Feb, 2024', status: 'Normal' },
        { id: '2', title: 'Chest X-Ray', date: '10 Feb, 2024', status: 'Review Needed' },
    ];

    const activeMedicines = [
        { id: '1', name: 'Paracetamol', dosage: '500mg', time: 'After Lunch' },
        { id: '2', name: 'Amoxicillin', dosage: '250mg', time: 'Night' },
    ];

    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Header / Greeting */}
                <View style={styles.header}>
                    <View>
                        <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>Welcome Back,</Text>
                        <Text variant="headlineMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>
                            {user?.name || 'Harshit'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Avatar.Text size={45} label={user?.name?.substring(0, 2).toUpperCase() || 'HA'} style={{ backgroundColor: theme.colors.secondaryContainer }} />
                    </TouchableOpacity>
                </View>

                {/* Quick Health Summary */}
                <Card style={[styles.summaryCard, { backgroundColor: theme.colors.primaryContainer }]}>
                    <Card.Content>
                        <Text variant="titleMedium" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>Health Score</Text>
                        <View style={styles.scoreRow}>
                            <Text variant="displayMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>85</Text>
                            <Text variant="titleSmall" style={{ color: theme.colors.primary, marginBottom: 8 }}>/100</Text>
                        </View>
                        <ProgressBar progress={0.85} color={theme.colors.primary} style={styles.progressBar} />
                        <Text variant="bodySmall" style={{ marginTop: 5, color: theme.colors.onPrimaryContainer }}>
                            You're doing great! Keep up the good work.
                        </Text>
                    </Card.Content>
                </Card>

                {/* Emergency & Hospital Shortcut */}
                <View style={styles.shortcutRow}>
                    <TouchableOpacity
                        style={[styles.shortcutBtn, { backgroundColor: '#ffebee', borderColor: '#ffcdd2', borderWidth: 1 }]}
                        onPress={() => alert('Emergency SOS Triggered!')}
                    >
                        <Icon name="ambulance" size={24} color="#d32f2f" />
                        <Text style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: 5 }}>Emergency</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.shortcutBtn, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline, borderWidth: 1 }]}
                        onPress={() => navigation.navigate('Hospitals')}
                    >
                        <Icon name="hospital-marker" size={24} color={theme.colors.primary} />
                        <Text style={{ color: theme.colors.primary, fontWeight: 'bold', marginTop: 5 }}>Nearby Hospitals</Text>
                    </TouchableOpacity>
                </View>

                {/* AI Suggestions */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="titleLarge" style={styles.sectionTitle}>AI Suggestions</Text>
                        <Icon name="creation" size={20} color={theme.colors.tertiary} />
                    </View>
                    <Card style={styles.aiCard}>
                        <Card.Content style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Icon name="lightbulb-on-outline" size={30} color="#fbc02d" />
                            <View style={{ flex: 1 }}>
                                <Text variant="bodyMedium">Based on your recent reports, increase water intake to 3L daily.</Text>
                            </View>
                        </Card.Content>
                    </Card>
                </View>

                {/* Active Medicines */}
                <View style={styles.section}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>Active Medicines</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {activeMedicines.map((med) => (
                            <Card key={med.id} style={[styles.medCard, { backgroundColor: theme.colors.surface }]}>
                                <Card.Content>
                                    <View style={styles.medIcon}>
                                        <Icon name="pill" size={20} color={theme.colors.primary} />
                                    </View>
                                    <Text variant="titleMedium" style={{ fontWeight: 'bold', marginTop: 5 }}>{med.name}</Text>
                                    <Text variant="bodySmall">{med.dosage}</Text>
                                    <View style={[styles.timeBadge, { backgroundColor: theme.colors.secondaryContainer }]}>
                                        <Text variant="labelSmall" style={{ color: theme.colors.onSecondaryContainer }}>{med.time}</Text>
                                    </View>
                                </Card.Content>
                            </Card>
                        ))}
                        <TouchableOpacity style={[styles.medCard, { justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.surfaceVariant }]}>
                            <Icon name="plus" size={30} color={theme.colors.onSurfaceVariant} />
                            <Text variant="labelSmall">Add New</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Recent Reports */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="titleLarge" style={styles.sectionTitle}>Recent Reports</Text>
                        <Button mode="text" onPress={() => navigation.navigate('Upload')}>See All</Button>
                    </View>
                    {recentReports.map((report) => (
                        <Card key={report.id} style={styles.reportItem} onPress={() => navigation.navigate('ReportDetails', { reportId: report.id })}>
                            <Card.Title
                                title={report.title}
                                subtitle={report.date}
                                left={(props) => <Icon name="file-document-outline" size={24} color={theme.colors.primary} style={{ marginRight: 10 }} />}
                                right={(props) => <Text style={{ color: report.status === 'Normal' ? 'green' : 'orange', marginRight: 15 }}>{report.status}</Text>}
                            />
                        </Card>
                    ))}
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    screen: {
        paddingTop: 10
    },
    container: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    summaryCard: {
        marginBottom: 20,
        borderRadius: 15,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
        marginTop: 5,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    shortcutRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        gap: 15
    },
    shortcutBtn: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    sectionTitle: {
        fontWeight: 'bold',
    },
    aiCard: {
        backgroundColor: '#fff9c4', // Light Yellow
    },
    medCard: {
        width: 140,
        marginRight: 12,
        borderRadius: 12,
    },
    medIcon: {
        backgroundColor: '#e0f7fa',
        width: 35,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    timeBadge: {
        marginTop: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start'
    },
    reportItem: {
        marginBottom: 10,
        backgroundColor: 'white'
    }
});

export default HomeScreen;
