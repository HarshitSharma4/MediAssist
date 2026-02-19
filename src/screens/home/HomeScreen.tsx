import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Text, Card, Avatar, useTheme, Button, ProgressBar, Surface, Badge } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const user = useAuthStore((state) => state.user);

    // Mock Data
    const alerts = [
        { id: '1', title: 'Medication Reminder', body: 'Take Amoxicillin in 30 mins', type: 'pill', color: '#FF7043' },
        { id: '2', title: 'Report Ready', body: 'Blood Test analysis is complete', type: 'check-circle', color: '#00695C' },
    ];

    const stats = [
        { label: 'Heart Rate', value: '72', unit: 'bpm', icon: 'heart-pulse', color: '#F44336' },
        { label: 'Sleep', value: '7.5', unit: 'hrs', icon: 'bed-outline', color: '#3F51B5' },
    ];

    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Modern Header */}
                <View style={styles.header}>
                    <View>
                        <Text variant="bodyLarge" style={{ color: theme.colors.outline, fontWeight: '500' }}>Good Morning,</Text>
                        <Text variant="headlineSmall" style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
                            {user?.name || 'Harshit'}
                        </Text>
                    </View>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Icon name="bell-outline" size={26} color={theme.colors.onSurface} />
                            <Badge size={8} style={styles.badge} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Avatar.Image
                                size={45}
                                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshit' }}
                                style={{ backgroundColor: theme.colors.surfaceVariant }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Notification / Alert Carousel (Integrated instead of separate screen) */}
                <View style={styles.alertSection}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Daily Alerts</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alertScroll}>
                        {alerts.map(alert => (
                            <Surface key={alert.id} style={[styles.alertCard, { backgroundColor: alert.color + '15' }]} elevation={0}>
                                <View style={[styles.alertIcon, { backgroundColor: alert.color }]}>
                                    <Icon name={alert.type as any} size={20} color="white" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text variant="labelLarge" style={{ color: alert.color, fontWeight: 'bold' }}>{alert.title}</Text>
                                    <Text variant="bodySmall" numberOfLines={1}>{alert.body}</Text>
                                </View>
                            </Surface>
                        ))}
                    </ScrollView>
                </View>

                {/* Health Overview Glass Card */}
                <Surface style={[styles.healthCard, { backgroundColor: theme.colors.primary }]} elevation={5}>
                    <View style={styles.healthHeader}>
                        <Text variant="titleMedium" style={{ color: 'white', opacity: 0.9 }}>Health Score</Text>
                        <Chip textStyle={{ color: 'white', fontSize: 12 }} style={styles.healthChip}>EXCELLENT</Chip>
                    </View>
                    <View style={styles.healthScoreRow}>
                        <Text style={styles.healthScoreText}>85</Text>
                        <Text style={styles.healthScoreSub}>/100</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Icon name="trending-up" size={40} color="rgba(255,255,255,0.4)" />
                        </View>
                    </View>
                    <ProgressBar progress={0.85} color="white" style={styles.healthProgress} />
                </Surface>

                {/* Vitals Grid */}
                <View style={styles.vitalsGrid}>
                    {stats.map(stat => (
                        <Card key={stat.label} style={styles.vitalCard}>
                            <Card.Content>
                                <Icon name={stat.icon as any} size={24} color={stat.color} />
                                <Text style={styles.vitalValue}>{stat.value}</Text>
                                <Text style={styles.vitalLabel}>{stat.label} ({stat.unit})</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                {/* Quick Shortcuts */}
                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Main Services</Text>
                    <View style={styles.shortcutGrid}>
                        <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate('Upload')}>
                            <Surface style={[styles.shortcutIcon, { backgroundColor: '#E0F2F1' }]} elevation={1}>
                                <Icon name="cloud-upload" size={24} color="#00695C" />
                            </Surface>
                            <Text variant="labelSmall" style={styles.shortcutText}>Upload</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate('Ask')}>
                            <Surface style={[styles.shortcutIcon, { backgroundColor: '#E3F2FD' }]} elevation={1}>
                                <Icon name="robot" size={24} color="#0277BD" />
                            </Surface>
                            <Text variant="labelSmall" style={styles.shortcutText}>AI Ask</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shortcut} onPress={() => navigation.navigate('Hospitals')}>
                            <Surface style={[styles.shortcutIcon, { backgroundColor: '#FCE4EC' }]} elevation={1}>
                                <Icon name="hospital-marker" size={24} color="#C2185B" />
                            </Surface>
                            <Text variant="labelSmall" style={styles.shortcutText}>Clinics</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.shortcut} onPress={() => alert('Emergency SOS')}>
                            <Surface style={[styles.shortcutIcon, { backgroundColor: '#FFEBEE' }]} elevation={1}>
                                <Icon name="ambulance" size={24} color="#D32F2F" />
                            </Surface>
                            <Text variant="labelSmall" style={styles.shortcutText}>SOS</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Recent Activities Section (Cleaner) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>Medical Timeline</Text>
                        <Button mode="text" labelStyle={{ fontSize: 12 }} onPress={() => navigation.navigate('History')}>View All</Button>
                    </View>
                    <Card style={styles.timelineCard}>
                        <List.Item
                            title="Blood Analysis Result"
                            description="Updated 2 hours ago"
                            left={props => <Avatar.Icon {...props} icon="flask-outline" size={40} style={{ backgroundColor: '#E0F2F1' }} color="#00695C" />}
                            right={props => <Icon name="chevron-right" size={20} style={{ alignSelf: 'center' }} color={theme.colors.outline} />}
                            onPress={() => navigation.navigate('History')}
                        />
                    </Card>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </ScreenWrapper>
    );
};

import { Chip, List } from 'react-native-paper';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F5F5F5',
    },
    container: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 10,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconBtn: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 12,
        backgroundColor: '#FF7043',
    },
    alertSection: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 12,
    },
    alertScroll: {
        flexDirection: 'row',
    },
    alertCard: {
        width: 200,
        marginRight: 15,
        padding: 12,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    alertIcon: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    healthCard: {
        padding: 20,
        borderRadius: 24,
        marginBottom: 20,
    },
    healthHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    healthChip: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: 24,
    },
    healthScoreRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 10,
    },
    healthScoreText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'white',
    },
    healthScoreSub: {
        fontSize: 18,
        color: 'white',
        opacity: 0.7,
        marginLeft: 4,
    },
    healthProgress: {
        height: 8,
        borderRadius: 4,
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    vitalsGrid: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 25,
    },
    vitalCard: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'white',
    },
    vitalValue: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
    },
    vitalLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    section: {
        marginBottom: 25,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shortcutGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shortcut: {
        alignItems: 'center',
        gap: 8,
    },
    shortcutIcon: {
        width: 55,
        height: 55,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shortcutText: {
        fontWeight: '600',
    },
    timelineCard: {
        borderRadius: 20,
        backgroundColor: 'white',
        overflow: 'hidden',
    }
});

export default HomeScreen;
