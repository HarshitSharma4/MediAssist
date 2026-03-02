// Base URL — update this to your machine's IP when testing on a physical device
// For Android emulator use: http://10.0.2.2:8000
// For iOS simulator / Expo Go on real device: http://<your-local-ip>:8000
export const BASE_URL = 'http://10.186.96.1:8000';
const API_URL = `${BASE_URL}/api/v1`;

// ─── Token storage (in-memory; persisted via Zustand + AsyncStorage) ─────────
let _accessToken: string | null = null;
let _refreshToken: string | null = null;

export function setTokens(access: string, refresh: string) {
    _accessToken = access;
    _refreshToken = refresh;
}

export function clearTokens() {
    _accessToken = null;
    _refreshToken = null;
}

export function getAccessToken() {
    return _accessToken;
}

// ─── Core fetch wrapper ────────────────────────────────────────────────────────
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiOptions {
    method?: HttpMethod;
    body?: object | FormData;
    token?: string | null;
    isFormData?: boolean;
}

async function apiFetch<T>(path: string, opts: ApiOptions = {}): Promise<T> {
    const { method = 'GET', body, isFormData = false } = opts;
    const token = opts.token !== undefined ? opts.token : _accessToken;

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (body && !isFormData) headers['Content-Type'] = 'application/json';

    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body
            ? isFormData
                ? (body as FormData)
                : JSON.stringify(body)
            : undefined,
    });

    if (!response.ok) {
        let errMsg = `HTTP ${response.status}`;
        try {
            const err = await response.json();
            errMsg = err?.detail || err?.message || errMsg;
        } catch { }
        throw new Error(errMsg);
    }

    // 204 No Content
    if (response.status === 204) return undefined as T;

    return response.json();
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
    register: (name: string, email: string, password: string) =>
        apiFetch<{ access_token: string; refresh_token: string; token_type: string }>(
            '/auth/register',
            { method: 'POST', body: { name, email, password }, token: null }
        ),

    login: (email: string, password: string) =>
        apiFetch<{ access_token: string; refresh_token: string; token_type: string }>(
            '/auth/login',
            { method: 'POST', body: { email, password }, token: null }
        ),

    refresh: (refreshToken: string) =>
        apiFetch<{ access_token: string; refresh_token: string; token_type: string }>(
            '/auth/refresh',
            { method: 'POST', body: { refresh_token: refreshToken }, token: null }
        ),

    me: () =>
        apiFetch<{ id: string; name: string; email: string; avatar_url?: string; phone?: string; blood_group?: string }>('/auth/me'),

    logout: () => apiFetch<{ message: string }>('/auth/logout', { method: 'POST' }),
};

// ─── Profile ──────────────────────────────────────────────────────────────────
export const profileApi = {
    get: () =>
        apiFetch<{
            id: string; name: string; email: string; avatar_url?: string;
            phone?: string; date_of_birth?: string; blood_group?: string;
            address?: string; emergency_contact?: string; created_at: string;
        }>('/profile/'),

    update: (data: Partial<{ name: string; phone: string; date_of_birth: string; blood_group: string; address: string; emergency_contact: string }>) =>
        apiFetch('/profile/', { method: 'PATCH', body: data }),

    uploadAvatar: (formData: FormData) =>
        apiFetch('/profile/avatar', { method: 'POST', body: formData, isFormData: true }),
};

// ─── Reports ─────────────────────────────────────────────────────────────────
export const reportsApi = {
    list: (page = 1, pageSize = 20) =>
        apiFetch<{ reports: any[]; total: number; page: number; page_size: number }>(
            `/reports/?page=${page}&page_size=${pageSize}`
        ),

    get: (id: string) => apiFetch<any>(`/reports/${id}`),

    upload: (formData: FormData) =>
        apiFetch<any>('/reports/upload', { method: 'POST', body: formData, isFormData: true }),

    analyze: (reportId: string, question?: string) =>
        apiFetch<{ report_id: string; analysis: string }>(
            `/reports/${reportId}/analyze`,
            { method: 'POST', body: question ? { question } : {} }
        ),

    delete: (id: string) =>
        apiFetch<{ message: string }>(`/reports/${id}`, { method: 'DELETE' }),
};

// ─── Chat / AI ────────────────────────────────────────────────────────────────
export const chatApi = {
    ask: (message: string, sessionId?: string) =>
        apiFetch<{ session_id: string; reply: string; model_used: string }>(
            '/chat/ask',
            { method: 'POST', body: { message, session_id: sessionId } }
        ),

    history: (page = 1, pageSize = 20) =>
        apiFetch<{ sessions: any[]; total: number }>(
            `/chat/history?page=${page}&page_size=${pageSize}`
        ),

    getSession: (sessionId: string) => apiFetch<any>(`/chat/history/${sessionId}`),
};

// ─── Hospitals ────────────────────────────────────────────────────────────────
export const hospitalsApi = {
    list: (params?: { query?: string; city?: string; specialty?: string; page?: number }) => {
        const q = new URLSearchParams();
        if (params?.query) q.set('query', params.query);
        if (params?.city) q.set('city', params.city);
        if (params?.specialty) q.set('specialty', params.specialty);
        q.set('page', String(params?.page ?? 1));
        return apiFetch<{ hospitals: any[]; total: number; page: number; page_size: number }>(
            `/hospitals/?${q.toString()}`
        );
    },

    get: (id: string) => apiFetch<any>(`/hospitals/${id}`),
};

// ─── Notifications ────────────────────────────────────────────────────────────
export const notificationsApi = {
    list: () =>
        apiFetch<{ notifications: any[]; unread_count: number }>('/notifications/'),

    markRead: (id: string) =>
        apiFetch(`/notifications/${id}/read`, { method: 'PATCH' }),

    delete: (id: string) =>
        apiFetch(`/notifications/${id}`, { method: 'DELETE' }),
};

// ─── Vitals ───────────────────────────────────────────────────────────────────
export const vitalsApi = {
    add: (data: Record<string, number>) =>
        apiFetch('/vitals/', { method: 'POST', body: data }),

    history: (limit = 30) =>
        apiFetch<any[]>(`/vitals/?limit=${limit}`),

    latest: () =>
        apiFetch<any>('/vitals/latest'),
};
