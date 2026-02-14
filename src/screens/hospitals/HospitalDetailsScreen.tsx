import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Chip, List, useTheme, Card } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const HospitalDetailsScreen = ({ route, navigation }: any) => {
    const { hospitalId } = route.params || {};
    const theme = useTheme();

    // Mock Data
    const hospital = {
        id: hospitalId,
        name: 'Apollo Hospital',
        address: 'Sector 26, Noida, Uttar Pradesh',
        rating: 4.5,
        phone: '+91 11 2345 6789',
        specialties: ['Cardiology', 'Neurology', 'Orthopedics'],
        doctors: ['Dr. Sharma', 'Dr. Gupta', 'Dr. Lee']
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                <Card style={styles.imageCard}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700/400' }} />
                </Card>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text variant="headlineMedium" style={{ fontWeight: 'bold', flex: 1 }}>{hospital.name}</Text>
                        <View style={styles.ratingBox}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>{hospital.rating} ★</Text>
                        </View>
                    </View>
                    <Text variant="bodyMedium" style={{ color: theme.colors.outline, marginBottom: 15 }}>{hospital.address}</Text>

                    <View style={styles.actions}>
                        <Button mode="contained" icon="phone" style={{ flex: 1 }}>Call</Button>
                        <Button mode="outlined" icon="directions" style={{ flex: 1 }}>Directions</Button>
                    </View>

                    <View style={styles.section}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>Specialties</Text>
                        <View style={styles.chipRow}>
                            {hospital.specialties.map(spec => (
                                <Chip key={spec} style={styles.chip}>{spec}</Chip>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text variant="titleMedium" style={styles.sectionTitle}>Available Doctors</Text>
                        {hospital.doctors.map((doc, index) => (
                            <List.Item
                                key={index}
                                title={doc}
                                left={props => <Avatar.Text {...props} label={doc.substring(4, 6)} size={40} />}
                                right={props => <Button mode="text">Book</Button>}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};
import { Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20
    },
    imageCard: {
        marginBottom: 0,
        borderRadius: 0
    },
    content: {
        padding: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5
    },
    ratingBox: {
        backgroundColor: '#4caf50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 25
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    chip: {
        backgroundColor: '#e0f7fa'
    }
});

export default HospitalDetailsScreen;
