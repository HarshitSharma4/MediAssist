import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Auth: undefined;
    Main: NavigatorScreenParams<MainTabParamList>;
    ReportDetails: { reportId: string };
    HospitalDetails: { hospitalId: string };
    ReportMetadata: { fileUri?: string; type?: 'image' | 'pdf' };
    AIAnalysis: { reportId: string };
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
