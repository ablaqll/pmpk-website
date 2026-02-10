
import { v4 as uuidv4 } from 'uuid';

// Types
export interface NewsItem {
    id: string;
    title: string;
    content: string;
    category: 'news' | 'press_release' | 'announcement';
    imageUrl?: string;
    createdAt: string;
    published: boolean;
}

export interface StaffMember {
    id: string;
    name: string;
    position: string;
    department: string; // e.g., "Director", "Specialists", "Administration"
    email?: string;
    phone?: string;
    photoUrl?: string;
    bio?: string; // Enhanced for Director
    rank?: number; // For sorting
}

export interface Vacancy {
    id: string;
    title: string;
    salary?: string;
    requirements?: string; // Newline separated
    createdAt: string;
    published: boolean;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    createdAt: string;
    published: boolean;
}

export interface GeneralInfo {
    directorName: string;
    directorBio: string;
    directorPhoto: string | null;
    address: string;
    phone: string;
    email: string;
    whatsapp?: string;
    schedule?: string;
    instagram?: string;
}

const API_URL = 'http://localhost:3001/api';

class StorageService {
    // Helpers
    private async get<T>(endpoint: string, initialValue: T): Promise<T> {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data as T;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            return initialValue;
        }
    }

    private async save(type: 'news' | 'staff' | 'info' | 'vacancies' | 'faq', data: any) {
        try {
            await fetch(`${API_URL}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, data })
            });
            window.dispatchEvent(new Event('storage-update'));
        } catch (error) {
            console.error(`Error saving ${type}:`, error);
        }
    }

    // --- Image Upload ---
    async uploadImage(file: File): Promise<string | null> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    }

    // --- News ---
    async getNews(): Promise<NewsItem[]> {
        return this.get<NewsItem[]>('news', []);
    }

    async saveNewsItem(item: NewsItem) {
        const current = await this.getNews();
        if (!item.id) {
            item.id = crypto.randomUUID();
            item.createdAt = new Date().toISOString();
        }
        const updated = current.some(i => i.id === item.id)
            ? current.map(i => i.id === item.id ? { ...i, ...item } : i)
            : [item, ...current];

        await this.save('news', updated);
    }

    async deleteNewsItem(id: string) {
        const current = await this.getNews();
        const updated = current.filter(i => i.id !== id);
        await this.save('news', updated);
    }

    // --- Staff ---
    async getStaff(): Promise<StaffMember[]> {
        return this.get<StaffMember[]>('staff', []);
    }

    async saveStaffMember(item: StaffMember) {
        const current = await this.getStaff();
        if (!item.id) {
            item.id = crypto.randomUUID();
        }
        const updated = current.some(i => i.id === item.id)
            ? current.map(i => i.id === item.id ? { ...i, ...item } : i)
            : [...current, item];

        await this.save('staff', updated);
    }

    async deleteStaffMember(id: string) {
        const current = await this.getStaff();
        const updated = current.filter(i => i.id !== id);
        await this.save('staff', updated);
    }

    // --- Vacancies ---
    async getVacancies(): Promise<Vacancy[]> {
        return this.get<Vacancy[]>('vacancies', []);
    }

    async saveVacancy(item: Vacancy) {
        const current = await this.getVacancies();
        if (!item.id) {
            item.id = crypto.randomUUID();
            item.createdAt = new Date().toISOString();
        }
        const updated = current.some(i => i.id === item.id)
            ? current.map(i => i.id === item.id ? { ...i, ...item } : i)
            : [item, ...current];

        await this.save('vacancies', updated);
    }

    async deleteVacancy(id: string) {
        const current = await this.getVacancies();
        const updated = current.filter(i => i.id !== id);
        await this.save('vacancies', updated);
    }

    // --- FAQ ---
    async getFaq(): Promise<FaqItem[]> {
        return this.get<FaqItem[]>('faq', []);
    }

    async saveFaq(item: FaqItem) {
        const current = await this.getFaq();
        if (!item.id) {
            item.id = crypto.randomUUID();
            item.createdAt = new Date().toISOString();
        }
        const updated = current.some(i => i.id === item.id)
            ? current.map(i => i.id === item.id ? { ...i, ...item } : i)
            : [item, ...current];

        await this.save('faq', updated);
    }

    async deleteFaq(id: string) {
        const current = await this.getFaq();
        const updated = current.filter(i => i.id !== id);
        await this.save('faq', updated);
    }

    // --- General Info ---
    async getGeneralInfo(): Promise<GeneralInfo> {
        const defaultInfo: GeneralInfo = {
            directorName: '',
            directorBio: '',
            directorPhoto: null,
            address: '',
            phone: '',
            email: ''
        };
        return this.get<GeneralInfo>('info', defaultInfo);
    }

    async saveGeneralInfo(info: GeneralInfo) {
        await this.save('info', info);
    }

    // --- Export / Import ---
    async exportData(): Promise<string> {
        try {
            const response = await fetch(`${API_URL}/data`);
            const data = await response.json();
            return JSON.stringify(data, null, 2);
        } catch (e) {
            return JSON.stringify({});
        }
    }

    async importData(jsonString: string): Promise<boolean> {
        try {
            const data = JSON.parse(jsonString);
            const response = await fetch(`${API_URL}/restore`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data })
            });
            return response.ok;
        } catch (e) {
            console.error("Import failed:", e);
            return false;
        }
    }
}

export const storage = new StorageService();
