import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Searchbar, Chip, useTheme, Surface, Avatar, Button } from 'react-native-paper';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useReportStore, Report } from '../../../store/useReportStore';

const HistoryScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const reports = useReportStore((state) => state.reports);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');

    const filters = ['All', 'Lab Report', 'Prescription', 'X-Ray', 'Invoice'];

    const filteredReports = reports.filter(r => {
        const matchesSearch = r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.doctorName?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filter === 'All' || r.type === filter;
        return matchesSearch && matchesType;
    });

    const renderReportItem = ({ item }: { item: Report }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ReportDetails', { reportId: item.id })}
            activeOpacity={0.7}
        >
            <Surface style={styles.card} elevation={1}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.primaryContainer }]}>
                    <Icon
                        name={item.type === 'Prescription' ? 'pill' : 'file-document-outline'}
                        size={24}
                        color={theme.colors.primary}
                    />
                </View>
                <View style={styles.content}>
                    <View style={styles.cardHeader}>
                        <Text variant="titleMedium" style={styles.reportType}>{item.type}</Text>
                        <Text variant="labelSmall" style={styles.date}>{item.date}</Text>
                    </View>
                    <Text variant="bodySmall" style={styles.hospital}>{item.hospitalName || 'Health Center'}</Text>
                    <View style={styles.footer}>
                        <View style={styles.doctorRow}>
                            <Icon name="doctor" size={12} color="#666" />
                            <Text variant="labelSmall" style={styles.doctorName}>{item.doctorName || 'General Staff'}</Text>
                        </View>
                        <Surface style={styles.statusBadge} elevation={0}>
                            <Text variant="labelSmall" style={styles.statusText}>Analyzed</Text>
                        </Surface>
                    </View>
                </View>
                <Icon name="chevron-right" size={20} color={theme.colors.outline} style={{ marginLeft: 10 }} />
            </Surface>
        </TouchableOpacity>
    );

    return (
        <ScreenWrapper style={styles.screen}>
            <View style={styles.header}>
                <Text variant="headlineSmall" style={styles.title}>Medical Records</Text>
                <Searchbar
                    placeholder="Search reports, doctors..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    inputStyle={{ minHeight: 0 }}
                />
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                        {filters.map(item => (
                            <Chip
                                key={item}
                                selected={filter === item}
                                onPress={() => setFilter(item)}
                                style={[styles.chip, filter === item && { backgroundColor: theme.colors.primary }]}
                                selectedColor="white"
                                textStyle={{ fontSize: 12 }}
                            >
                                {item}
                            </Chip>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <FlatList
                data={filteredReports}
                renderItem={renderReportItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="file-search-outline" size={80} color="#DDD" />
                        <Text variant="titleMedium" style={{ color: '#999', marginTop: 15 }}>No matching records found</Text>
                        <Button mode="text" onPress={() => { setSearchQuery(''); setFilter('All'); }}>Clear Filters</Button>
                    </View>
                }
            />
            <View style={{ height: 50 }} />
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
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
    filterContainer: {
        marginTop: 15,
    },
    filterScroll: {
        flexDirection: 'row',
    },
    chip: {
        marginRight: 8,
        borderRadius: 12,
        backgroundColor: '#F0F2F5',
    },
    list: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        marginLeft: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportType: {
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    date: {
        color: '#999',
    },
    hospital: {
        color: '#666',
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    doctorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    doctorName: {
        color: '#666',
    },
    statusBadge: {
        backgroundColor: '#E0F2F1',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
    },
    statusText: {
        color: '#00695C',
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    }
});

export default HistoryScreen;
