import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, List, Switch, Divider, useTheme, Button, Surface } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { useAuthStore } from '../../store/useAuthStore';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const { user, logout } = useAuthStore();

    return (
        <ScreenWrapper style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Profile Card */}
                <Surface style={styles.profileHeader} elevation={2}>
                    <View style={styles.avatarWrapper}>
                        <Avatar.Image size={100} source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harshit' }} style={{ backgroundColor: '#E0F2F1' }} />
                        <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile')}>
                            <Icon name="pencil" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text variant="headlineSmall" style={styles.name}>{user?.name || 'Harshit'}</Text>
                    <Text variant="bodyMedium" style={styles.email}>{user?.email || 'harshit@example.com'}</Text>

                    <View style={styles.statBar}>
                        <View style={styles.statItem}>
                            <Text variant="titleMedium" style={styles.statValue}>O+</Text>
                            <Text variant="labelSmall" style={styles.statLabel}>Blood</Text>
                        </View>
                        <Divider style={styles.verticalDivider} />
                        <View style={styles.statItem}>
                            <Text variant="titleMedium" style={styles.statValue}>175</Text>
                            <Text variant="labelSmall" style={styles.statLabel}>Height</Text>
                        </View>
                        <Divider style={styles.verticalDivider} />
                        <View style={styles.statItem}>
                            <Text variant="titleMedium" style={styles.statValue}>70</Text>
                            <Text variant="labelSmall" style={styles.statLabel}>Weight</Text>
                        </View>
                    </View>
                </Surface>

                {/* Settings Groups */}
                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Medical Identity</Text>
                    <Surface style={styles.menuCard} elevation={1}>
                        <List.Item
                            title="Health Records"
                            description="Verified reports & history"
                            left={props => <List.Icon {...props} icon="file-certificate-outline" color={theme.colors.primary} />}
                            onPress={() => navigation.navigate('History')}
                        />
                        <Divider />
                        <List.Item
                            title="Emergency Profile"
                            description="Allergies & conditions"
                            left={props => <List.Icon {...props} icon="shield-alert-outline" color="#D32F2F" />}
                        />
                    </Surface>
                </View>

                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>App Settings</Text>
                    <Surface style={styles.menuCard} elevation={1}>
                        <List.Item
                            title="Notifications"
                            left={props => <List.Icon {...props} icon="bell-ring-outline" color="#0288D1" />}
                            right={() => <Switch value={true} color={theme.colors.primary} />}
                        />
                        <Divider />
                        <List.Item
                            title="Dark Appearance"
                            left={props => <List.Icon {...props} icon="theme-light-dark" color="#455A64" />}
                            right={() => <Switch value={false} />}
                        />
                        <Divider />
                        <List.Item
                            title="Language"
                            description="English (Primary)"
                            left={props => <List.Icon {...props} icon="translate" color="#7B1FA2" />}
                        />
                    </Surface>
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                    <Icon name="logout" size={20} color="#D32F2F" />
                    <Text variant="titleMedium" style={{ color: '#D32F2F', fontWeight: 'bold' }}>Sign Out</Text>
                </TouchableOpacity>

                <Text variant="labelSmall" style={styles.version}>MediAssist v1.4.2 (Stable)</Text>

                <View style={{ height: 120 }} />
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
    profileHeader: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 15,
    },
    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#00695C',
        padding: 6,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
    },
    name: {
        fontWeight: '800',
        color: '#1A1A1A',
    },
    email: {
        color: '#666',
        marginTop: 4,
    },
    statBar: {
        flexDirection: 'row',
        marginTop: 25,
        width: '100%',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontWeight: 'bold',
        color: '#00695C',
    },
    statLabel: {
        color: '#999',
        marginTop: 2,
    },
    verticalDivider: {
        width: 1,
        height: 30,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 12,
        marginLeft: 5,
    },
    menuCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        overflow: 'hidden',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 15,
        backgroundColor: '#FFEBEE',
        borderRadius: 20,
        marginTop: 10,
    },
    version: {
        textAlign: 'center',
        marginTop: 25,
        color: '#CCC',
    }
});

export default ProfileScreen;
