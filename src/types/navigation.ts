import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    ReportMetadata: { fileUri: string; type: 'pdf' | 'image' };
    HospitalDetails: { id: string };
    ReportDetails: { reportId: string };
    History: undefined;
    EditProfile: undefined;
    Notifications: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Upload: undefined;
    Ask: undefined;
    Hospitals: undefined;
    Profile: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};
