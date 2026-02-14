import { create } from 'zustand';

export interface Report {
    id: string;
    type: string; // 'Prescription' | 'Lab Report' | 'X-Ray' | 'Invoice'
    doctorName?: string;
    hospitalName?: string;
    date: string;
    fileUri: string;
    summary?: string;
    diagnosis?: string;
    medicines?: string; // Comma separated for now
}

interface ReportState {
    reports: Report[];
    addReport: (report: Report) => void;
    getReportById: (id: string) => Report | undefined;
}

export const useReportStore = create<ReportState>((set, get) => ({
    reports: [
        {
            id: '1',
            type: 'Lab Report',
            doctorName: 'Dr. Smith',
            hospitalName: 'Apollo Hospital',
            date: '2024-02-12',
            fileUri: '',
            summary: 'Blood sugar levels are slightly high. Cholesterol is normal.',
            diagnosis: 'Pre-diabetic',
            medicines: 'Metformin'
        },
        {
            id: '2',
            type: 'X-Ray',
            doctorName: 'Dr. House',
            hospitalName: 'City General',
            date: '2024-02-10',
            fileUri: '',
            summary: 'Clear lungs, no signs of infection.',
            diagnosis: 'Healthy',
        }
    ],
    addReport: (report) => set((state) => ({ reports: [report, ...state.reports] })),
    getReportById: (id) => get().reports.find((r) => r.id === id),
}));
