import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Searchbar, Chip, Card, useTheme, Button, Surface, Avatar } from 'react-native-paper';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const HospitalsScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    const filters = ['General', 'Specialist', 'Emergency', 'Pharmacy'];

    return (
        <ScreenWrapper style={styles.screen}>
            <View style={styles.container}>
                <Surface style={styles.topSection} elevation={2}>
                    <Text variant="headlineSmall" style={styles.pageTitle}>Nearby Clinics</Text>
                    <Searchbar
                        placeholder="Find hospitals or doctors..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        style={styles.searchBar}
                        inputStyle={{ minHeight: 0 }}
                    />
                    <View style={styles.filterRow}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {filters.map(item => (
                                <Chip
                                    key={item}
                                    selected={selectedFilter === item}
                                    onPress={() => setSelectedFilter(selectedFilter === item ? null : item)}
                                    style={styles.chip}
                                    selectedColor="white"
                                    showSelectedOverlay
                                >
                                    {item}
                                </Chip>
                            ))}
                        </ScrollView>
                    </View>
                </Surface>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Map Preview */}
                    <View style={styles.mapContainer}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: 28.57,
                                longitude: 77.32,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05,
                            }}
                        >
                            <Marker coordinate={{ latitude: 28.57, longitude: 77.32 }} title="City Medical" />
                        </MapView>
                        <TouchableOpacity style={styles.expandBtn}>
                            <Icon name="arrow-expand-all" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* hospital list */}
                    <View style={styles.listSection}>
                        <Text variant="titleMedium" style={styles.listHeader}>Recommended For You</Text>

                        <Card style={styles.hospitalCard} onPress={() => navigation.navigate('HospitalDetails', { id: '1' })}>
                            <View style={styles.cardInner}>
                                <Avatar.Image size={70} source={{ uri: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200' }} />
                                <View style={styles.hospitalInfo}>
                                    <View style={styles.hospitalMeta}>
                                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Apollo Medical</Text>
                                        <Surface style={styles.ratingBadge} elevation={0}>
                                            <Icon name="star" size={12} color="#FFB300" />
                                            <Text style={styles.ratingText}>4.8</Text>
                                        </Surface>
                                    </View>
                                    <Text variant="bodySmall" style={{ color: '#666' }}>2.5 km away • Opens 24/7</Text>
                                    <View style={styles.tagRow}>
                                        <View style={styles.tag}><Text style={styles.tagText}>Emergency</Text></View>
                                        <View style={[styles.tag, { backgroundColor: '#E1F5FE' }]}><Text style={[styles.tagText, { color: '#0288D1' }]}>Multi-specialty</Text></View>
                                    </View>
                                </View>
                            </View>
                        </Card>

                        <Card style={styles.hospitalCard}>
                            <View style={styles.cardInner}>
                                <Avatar.Image size={70} source={{ uri: 'https://images.unsplash.com/photo-1586773860418-d319a39ec55e?w=200' }} />
                                <View style={styles.hospitalInfo}>
                                    <View style={styles.hospitalMeta}>
                                        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Max Health Care</Text>
                                        <Surface style={styles.ratingBadge} elevation={0}>
                                            <Icon name="star" size={12} color="#FFB300" />
                                            <Text style={styles.ratingText}>4.5</Text>
                                        </Surface>
                                    </View>
                                    <Text variant="bodySmall" style={{ color: '#666' }}>4.1 km away • Closes 9 PM</Text>
                                    <View style={styles.tagRow}>
                                        <View style={styles.tag}><Text style={styles.tagText}>Cardiology</Text></View>
                                    </View>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F8F9FA',
    },
    container: {
        flex: 1,
    },
    topSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    pageTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15,
    },
    searchBar: {
        backgroundColor: '#F0F2F5',
        borderRadius: 15,
        elevation: 0,
        height: 50,
    },
    filterRow: {
        flexDirection: 'row',
        marginTop: 15,
    },
    chip: {
        marginRight: 10,
        borderRadius: 12,
    },
    mapContainer: {
        height: 200,
        margin: 20,
        borderRadius: 24,
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    expandBtn: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#00695C',
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listSection: {
        paddingHorizontal: 20,
    },
    listHeader: {
        fontWeight: '700',
        marginBottom: 15,
    },
    hospitalCard: {
        marginBottom: 15,
        borderRadius: 24,
        backgroundColor: 'white',
        elevation: 1,
    },
    cardInner: {
        flexDirection: 'row',
        padding: 15,
        gap: 15,
        alignItems: 'center',
    },
    hospitalInfo: {
        flex: 1,
    },
    hospitalMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FF8F00',
    },
    tagRow: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 6,
    },
    tag: {
        backgroundColor: '#E0F2F1',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#00695C',
    }
});

export default HospitalsScreen;
