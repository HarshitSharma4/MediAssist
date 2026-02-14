import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, useTheme, Searchbar, Chip } from 'react-native-paper';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { useReportStore, Report } from '../../../store/useReportStore';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const HistoryScreen = ({ navigation }: any) => {
    const theme = useTheme();
    const reports = useReportStore((state) => state.reports);
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredReports = reports.filter(r =>
        r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderReportItem = ({ item }: { item: Report }) => (
        <Card style={styles.card} onPress={() => navigation.navigate('ReportDetails', { reportId: item.id })}>
            <Card.Content style={styles.cardContent}>
                <View style={[styles.iconBox, { backgroundColor: theme.colors.secondaryContainer }]}>
                    <Icon name={item.type.includes('Lab') ? 'flask' : 'file-document'} size={24} color={theme.colors.secondary} />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>{item.type}</Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.outline }}>{item.doctorName} • {item.date}</Text>
                    <Chip textStyle={{ fontSize: 10, height: 16 }} style={{ alignSelf: 'flex-start', marginTop: 5, height: 24 }}>{item.hospitalName}</Chip>
                </View>
                <Icon name="chevron-right" size={24} color={theme.colors.outline} />
            </Card.Content>
        </Card>
    );

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <Text variant="headlineMedium" style={styles.title}>My Medical Records</Text>

                <Searchbar
                    placeholder="Search reports..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    inputStyle={{ minHeight: 0 }}
                />

                <FlatList
                    data={filteredReports}
                    renderItem={renderReportItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Icon name="file-document-outline" size={60} color={theme.colors.outline} />
                            <Text style={{ color: theme.colors.outline, marginTop: 10 }}>No reports found</Text>
                        </View>
                    }
                />
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 15
    },
    searchBar: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 45,
    },
    list: {
        paddingBottom: 20
    },
    card: {
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 12
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 50
    }
});

export default HistoryScreen;
