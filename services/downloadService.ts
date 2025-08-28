import { StoredFile } from '../types';

const DB_NAME = 'MathSafariDownloads';
const DB_VERSION = 1;
const STORE_NAME = 'files';

const getFileTypeFromMime = (mime: string | null): StoredFile['type'] => {
    if (!mime) return 'other';
    if (mime.startsWith('audio/')) return 'music';
    if (mime.startsWith('video/')) return 'video';
    if (mime.startsWith('image/')) return 'image';
    if (mime === 'application/pdf' || mime.startsWith('text/')) return 'document';
    return 'other';
};

class DownloadService {
    private db: IDBDatabase | null = null;

    constructor() {
        this.initDB();
    }

    private initDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve();
                return;
            }

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error("Error opening IndexedDB");
                reject(new Error("Error opening IndexedDB"));
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
        });
    }

    public async getStoredFiles(): Promise<StoredFile[]> {
        await this.initDB();
        if (!this.db) return [];

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onerror = () => reject(new Error("Could not get files from DB"));
            request.onsuccess = () => resolve(request.result as StoredFile[]);
        });
    }

    private async fetchWithRetries(url: string, retries = 3, delay = 1000): Promise<Response> {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.ok || (response.status >= 400 && response.status < 500)) {
                    return response;
                }
                console.warn(`Download attempt ${i + 1} failed with status ${response.status}. Retrying in ${delay / 1000}s...`);
            } catch (error) {
                console.warn(`Download attempt ${i + 1} failed with a network error. Retrying in ${delay / 1000}s...`, error);
            }
            
            if (i < retries - 1) {
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
        return fetch(url);
    }
    
    public async uploadFile(
        file: File,
        onProgress: (progress: { loaded: number, total: number }) => void
    ): Promise<void> {
        await this.initDB();
        if (!this.db) throw new Error("Database not initialized");

        onProgress({ loaded: 0, total: file.size });

        const newFile: StoredFile = {
            id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            type: getFileTypeFromMime(file.type),
            source: 'upload',
            blob: file,
            size: file.size,
            timestamp: Date.now()
        };
        
        // Simulate progress for better UX as local saving is very fast
        setTimeout(() => onProgress({ loaded: file.size / 2, total: file.size }), 50);
        await this.saveFileToDB(newFile);
        setTimeout(() => onProgress({ loaded: file.size, total: file.size }), 100);
    }

    public async downloadFile(
        id: string,
        url: string,
        name: string,
        type: 'music' | 'video',
        onProgress: (progress: { downloadedSize: number, totalSize: number }) => void
    ): Promise<void> {
        await this.initDB();
        if (!this.db) throw new Error("Database not initialized");

        if (navigator.storage && navigator.storage.estimate) {
            const quota = await navigator.storage.estimate();
            if (quota.usage && quota.quota && quota.usage / quota.quota > 0.95) {
                throw new Error("Low storage space. Cannot start download.");
            }
        }
        
        const response = await this.fetchWithRetries(url);
        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
        }
        if (!response.body) {
            throw new Error("Response has no body");
        }

        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');
        const totalSize = contentLength ? parseInt(contentLength, 10) : 0;
        let downloadedSize = 0;
        
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        
        while (true) {
            try {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                downloadedSize += value.length;
                onProgress({ downloadedSize, totalSize });
                
                if (navigator.storage && navigator.storage.estimate) {
                    const quota = await navigator.storage.estimate();
                     if (quota.usage && quota.quota && (quota.quota - quota.usage) < (totalSize - downloadedSize)) {
                        reader.cancel();
                        throw new Error("Stopped download due to low storage.");
                    }
                }
            } catch(e) {
                console.error("Download interrupted:", e);
                throw e;
            }
        }

        const blob = new Blob(chunks, { type: contentType || undefined });
        const file: StoredFile = {
            id,
            name,
            type: getFileTypeFromMime(contentType),
            source: 'download',
            blob,
            size: blob.size,
            timestamp: Date.now()
        };

        return this.saveFileToDB(file);
    }

    private saveFileToDB(file: StoredFile): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error("DB not available"));
                return;
            }
            const transaction = this.db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(file);

            request.onerror = () => reject(new Error("Could not save file to DB"));
            request.onsuccess = () => resolve();
        });
    }
    
    public async deleteFile(id: string): Promise<void> {
        await this.initDB();
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
             const transaction = this.db!.transaction(STORE_NAME, 'readwrite');
             const store = transaction.objectStore(STORE_NAME);
             const request = store.delete(id);
             
             request.onerror = () => reject(new Error("Could not delete file"));
             request.onsuccess = () => resolve();
        });
    }

    public async renameFile(id: string, newName: string): Promise<void> {
        await this.initDB();
        if (!this.db) return;

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const getRequest = store.get(id);

            getRequest.onerror = () => reject(new Error("Could not find file to rename"));
            getRequest.onsuccess = () => {
                const file = getRequest.result as StoredFile;
                if (file) {
                    file.name = newName;
                    const putRequest = store.put(file);
                    putRequest.onerror = () => reject(new Error("Could not update file name"));
                    putRequest.onsuccess = () => resolve();
                } else {
                    reject(new Error("File not found"));
                }
            };
        });
    }
}

export const downloadService = new DownloadService();