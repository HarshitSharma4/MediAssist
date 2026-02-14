import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Searchbar, Chip, Card, useTheme, Button } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface Hospital {
    id: string;
    name: string;
    address: string;
    distance: string;
    rating: number;
    type: 'General' | 'Specialist' | 'Emergency';
    latitude: number;
    longitude: number;
}

const mockHospitals: Hospital[] = [
    {
        id: '1',
        name: 'Apollo Hospital',
        address: 'Sector 26, Noida',
        distance: '2.5 km',
        rating: 4.5,
        type: 'General',
        latitude: 28.57,
        longitude: 77.32,
    },
    {
        id: '2',
        name: 'Max Super Speciality',
        address: 'Saket, New Delhi',
        distance: '12 km',
        rating: 4.8,
        type: 'Specialist',
        latitude: 28.52,
        longitude: 77.21,
    },
    {
        id: '3',
        name: 'City Care Emergency',
        address: 'Sector 62, Noida',
        distance: '5.0 km',
        rating: 4.0,
        type: 'Emergency',
        latitude: 28.62,
        longitude: 77.37,
    },
];

const HospitalsScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const filters = ['General', 'Specialist', 'High Rating', 'Emergency'];

    const filteredHospitals = mockHospitals.filter(hospital => {
        const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter
            ? (selectedFilter === 'High Rating' ? hospital.rating > 4.5 : hospital.type === selectedFilter)
            : true;
        return matchesSearch && matchesFilter;
    });

    const renderHospitalCard = ({ item }: { item: Hospital }) => (
        <Card style={styles.card} onPress={() => navigation.navigate('HospitalDetails', { hospitalId: item.id })}>
            <Card.Content>
                <View style={styles.cardHeader}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{item.rating} ★</Text>
                    </View>
                </View>
                <Text variant="bodySmall" style={{ color: theme.colors.outline }}>{item.address}</Text>

                <View style={styles.cardFooter}>
                    <Chip icon="map-marker-distance" textStyle={{ fontSize: 10 }} style={{ height: 28 }}>{item.distance}</Chip>
                    <Chip textStyle={{ fontSize: 10 }} style={{ height: 28, backgroundColor: item.type === 'Emergency' ? '#ffebee' : theme.colors.secondaryContainer }}>
                        {item.type}
                    </Chip>
                </View>
            </Card.Content>
            <Card.Actions>
                <Button mode="text">Call</Button>
                <Button mode="contained" buttonColor={theme.colors.primary}>Directions</Button>
            </Card.Actions>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* Search Bar */}
                <Searchbar
                    placeholder="Search hospitals, doctors..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                />

                {/* Filters */}
                <View style={styles.filtersContainer}>
                    <FlatList
                        horizontal
                        data={filters}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Chip
                                selected={selectedFilter === item}
                                onPress={() => setSelectedFilter(selectedFilter === item ? null : item)}
                                style={styles.filterChip}
                                showSelectedOverlay
                            >
                                {item}
                            </Chip>
                        )}
                        keyExtractor={(item) => item}
                    />
                </View>

                {/* Map View Placeholder/Component */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 28.57,
                            longitude: 77.32,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {mockHospitals.map(hospital => (
                            <Marker
                                key={hospital.id}
                                coordinate={{ latitude: hospital.latitude, longitude: hospital.longitude }}
                                title={hospital.name}
                                description={hospital.address}
                            />
                        ))}
                    </MapView>
                    <TouchableOpacity style={styles.locateBtn}>
                        <Icon name="crosshairs-gps" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* List View */}
                <View style={styles.listContainer}>
                    <Text variant="titleMedium" style={styles.listTitle}>Nearby Results</Text>
                    <FlatList
                        data={filteredHospitals}
                        renderItem={renderHospitalCard}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        margin: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 2
    },
    filtersContainer: {
        paddingHorizontal: 15,
        marginBottom: 10,
        height: 40
    },
    filterChip: {
        marginRight: 8,
    },
    mapContainer: {
        height: 250,
        marginHorizontal: 15,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        elevation: 3,
        backgroundColor: '#e0e0e0', // Fallback
        position: 'relative'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    locateBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
        elevation: 4
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    listTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 10,
        backgroundColor: 'white'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5
    },
    ratingBadge: {
        backgroundColor: '#4caf50',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4
    },
    cardFooter: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 10
    }
});

export default HospitalsScreen;
