import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Surface, Avatar, useTheme, IconButton } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface Notification {
    id: string;
    title: string;
    body: string;
    time: string;
    type: 'reminder' | 'report' | 'alert' | 'health';
    read: boolean;
}

const NotificationScreen = ({ navigation }: any) => {
    const theme = useTheme();

    const notifications: Notification[] = [
        {
            id: '1',
            title: 'Medication Reminder',
            body: 'It\'s time to take your Amoxicillin (500mg). Please take it with water.',
            time: '10 mins ago',
            type: 'reminder',
            read: false,
        },
        {
            id: '2',
            title: 'Report Analysis Complete',
            body: 'Your Blood Test (CBC) report has been analyzed by MediAssist AI.',
            time: '2 hours ago',
            type: 'report',
            read: false,
        },
        {
            id: '3',
            title: 'Weekly Health Wrap-up',
            body: 'Your average heart rate was 72 bpm this week. Looking great!',
            time: 'Yesterday',
            type: 'health',
            read: true,
        },
        {
            id: '4',
            title: 'Doctor Appointment',
            body: 'Upcoming checkup with Dr. Smith tomorrow at 10:00 AM.',
            time: 'Yesterday',
            type: 'alert',
            read: true,
        },
        {
            id: '5',
            title: 'New Feature: Audio Chat',
            body: 'You can now talk to MediAssist AI using voice messages!',
            time: '2 days ago',
            type: 'health',
            read: true,
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'reminder': return 'pill';
            case 'report': return 'file-document-outline';
            case 'alert': return 'calendar-check';
            case 'health': return 'heart-pulse';
            default: return 'bell-outline';
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'reminder': return '#FF7043';
            case 'report': return '#00695C';
            case 'alert': return '#0277BD';
            case 'health': return '#F44336';
            default: return theme.colors.primary;
        }
    };

    const renderItem = ({ item }: { item: Notification }) => (
        <Surface style={[styles.card, !item.read && styles.unreadCard]} elevation={item.read ? 1 : 2}>
            <TouchableOpacity style={styles.content} onPress={() => { }}>
                <View style={[styles.iconContainer, { backgroundColor: getColor(item.type) + '15' }]}>
                    <Icon name={getIcon(item.type) as any} size={24} color={getColor(item.type)} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                        <Text variant="titleMedium" style={[styles.title, !item.read && { fontWeight: 'bold' }]}>{item.title}</Text>
                        {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text variant="bodySmall" style={styles.body} numberOfLines={2}>{item.body}</Text>
                    <Text variant="labelSmall" style={styles.time}>{item.time}</Text>
                </View>
            </TouchableOpacity>
        </Surface>
    );

    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.header}>
                <IconButton icon="chevron-left" size={28} onPress={() => navigation.goBack()} />
                <Text variant="headlineSmall" style={styles.headerTitle}>Notifications</Text>
                <IconButton icon="check-all" size={24} onPress={() => { }} />
            </View>

            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="bell-off-outline" size={80} color={theme.colors.outline} />
                        <Text variant="titleLarge" style={styles.emptyText}>No notifications yet</Text>
                        <Text variant="bodyMedium" style={styles.emptySubText}>We'll let you know when something important happens.</Text>
                    </View>
                }
            />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerTitle: {
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    card: {
        marginBottom: 12,
        borderRadius: 20,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    unreadCard: {
        backgroundColor: '#F0F7F7',
    },
    content: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        gap: 15,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        color: '#1A1A1A',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00695C',
        marginLeft: 10,
    },
    body: {
        color: '#666',
        lineHeight: 18,
        marginBottom: 8,
    },
    time: {
        color: '#999',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        marginTop: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    emptySubText: {
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 40,
    }
});

export default NotificationScreen;
