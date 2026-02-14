import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, List, Switch, Divider, useTheme, Button } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { useAuthStore } from '../../store/useAuthStore';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const { user, logout } = useAuthStore();
    const [isDarkMode, setIsDarkMode] = React.useState(false); // Mock

    const personalInfo = [
        { label: 'Age', value: '28' },
        { label: 'Gender', value: 'Male' },
        { label: 'Blood Group', value: 'O+' },
        { label: 'Height', value: '175 cm' },
        { label: 'Weight', value: '70 kg' },
    ];

    const medicalInfo = [
        { label: 'Chronic Diseases', value: 'None' },
        { label: 'Allergies', value: 'Peanuts' },
        { label: 'Emergency Contact', value: '+91 9876543210' },
    ];

    const handleLogout = () => {
        logout();
        // Navigation will auto-switch due to auth state change
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Avatar.Text size={80} label={user?.name?.substring(0, 2).toUpperCase() || 'HA'} style={{ backgroundColor: theme.colors.primary }} />
                    <Text variant="headlineSmall" style={styles.name}>{user?.name || 'Harshit'}</Text>
                    <Text variant="bodyMedium" style={{ color: theme.colors.outline }}>{user?.email || 'harshit@example.com'}</Text>
                    <Button mode="outlined" style={styles.editBtn}>Edit Profile</Button>
                </View>

                {/* Personal Info Grid */}
                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Personal Details</Text>
                    <View style={styles.infoGrid}>
                        {personalInfo.map((item, index) => (
                            <View key={index} style={[styles.infoCard, { backgroundColor: theme.colors.surfaceVariant }]}>
                                <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>{item.label}</Text>
                                <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Medical History */}
                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Medical Info</Text>
                    {medicalInfo.map((item, index) => (
                        <List.Item
                            key={index}
                            title={item.label}
                            description={item.value}
                            left={props => <List.Icon {...props} icon="information-outline" />}
                            style={{ backgroundColor: theme.colors.surface, marginBottom: 5, borderRadius: 10 }}
                        />
                    ))}
                </View>

                {/* Settings */}
                <View style={styles.section}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Settings</Text>
                    <List.Section>
                        <List.Item
                            title="Dark Mode"
                            left={props => <List.Icon {...props} icon="theme-light-dark" />}
                            right={props => <Switch value={isDarkMode} onValueChange={setIsDarkMode} />}
                        />
                        <List.Item
                            title="Notifications"
                            left={props => <List.Icon {...props} icon="bell-outline" />}
                            right={props => <Switch value={true} />}
                        />
                        <List.Item
                            title="Privacy Policy"
                            left={props => <List.Icon {...props} icon="shield-account" />}
                            onPress={() => { }}
                        />
                        <Divider />
                        <List.Item
                            title="Logout"
                            titleStyle={{ color: theme.colors.error }}
                            left={props => <List.Icon {...props} icon="logout" color={theme.colors.error} />}
                            onPress={handleLogout}
                        />
                    </List.Section>
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    name: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    editBtn: {
        marginTop: 10,
        borderColor: '#ccc'
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    infoCard: {
        width: '30%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default ProfileScreen;
