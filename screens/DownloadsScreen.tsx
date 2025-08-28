import React, { useState, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, StoredFile } from '../types';

// Icons
const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14.553 1.106A1 1 0 0016 8v4a1 1 0 00.553.894l2 1A1 1 0 0020 13V7a1 1 0 00-1.447-.894l-2-1z" /></svg>;
const MusicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" /></svg>;
const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>;
const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
const OtherFileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;

const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 8V2h6v6h5l-8 8-8-8h5zM0 18h20v2H0v-2z" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>;


const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const DownloadsScreen: React.FC = () => {
    const { 
        t, setScreen, playSound, activeTransfers, storedFiles, 
        uploadFiles, deleteStoredFile, renameStoredFile 
    } = useAppContext();
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [newName, setNewName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBack = () => {
        playSound('CLICK');
        setScreen(Screen.PARENTS);
    };

    const handleRename = (file: StoredFile) => {
        setRenamingId(file.id);
        setNewName(file.name);
    }

    const handleSaveRename = () => {
        if (renamingId && newName.trim()) {
            renameStoredFile(renamingId, newName.trim());
            setRenamingId(null);
            setNewName("");
        }
    }

    const handleDelete = (file: StoredFile) => {
        if(window.confirm(t('confirmDelete').replace('{name}', file.name))) {
            deleteStoredFile(file.id);
        }
    }

    const handleOpenFile = (file: StoredFile) => {
        const url = URL.createObjectURL(file.blob);
        window.open(url, '_blank');
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            uploadFiles(event.target.files);
        }
    };

    const getFileIcon = (type: StoredFile['type']) => {
        switch(type) {
            case 'music': return <MusicIcon />;
            case 'video': return <VideoIcon />;
            case 'image': return <ImageIcon />;
            case 'document': return <DocumentIcon />;
            default: return <OtherFileIcon />;
        }
    };

    const downloadedContent = storedFiles.filter(f => f.source === 'download').sort((a,b) => b.timestamp - a.timestamp);
    const uploadedContent = storedFiles.filter(f => f.source === 'upload').sort((a,b) => b.timestamp - a.timestamp);

    return (
        <div className="w-full h-full flex flex-col p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex-shrink-0 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-yellow-900">{t('downloads')}</h1>
                <button onClick={handleBack} className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    <span className="font-bold text-gray-700">{t('back')}</span>
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto mt-4 space-y-6">

                {/* Upload Files */}
                 <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
                    <h2 className="text-xl font-bold text-yellow-900 mb-3">Upload Your Files</h2>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileSelected}
                        multiple 
                        className="hidden"
                        accept="audio/*,video/*,image/*,application/pdf,.doc,.docx,.txt"
                    />
                    <button
                        onClick={handleUploadClick}
                        className="w-full bg-green-500 text-white font-bold p-3 rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <UploadIcon />
                        <span>Select Files to Add</span>
                    </button>
                </div>

                {/* Active Transfers */}
                {activeTransfers.length > 0 && (
                    <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
                        <h2 className="text-xl font-bold text-yellow-900 mb-3">{t('activeTransfers')}</h2>
                        <div className="space-y-3">
                            {activeTransfers.map(transfer => (
                                <div key={transfer.id}>
                                    <div className="flex justify-between items-center text-sm font-semibold text-gray-600 mb-1">
                                        <span className="truncate pr-2">{transfer.name}</span>
                                        <span>{transfer.error ? (transfer.direction === 'download' ? t('downloadFailed') : 'Upload failed') : `${transfer.progress}%`}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className={`h-2.5 rounded-full ${transfer.error ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${transfer.progress}%` }}></div>
                                    </div>
                                    {transfer.error && <p className="text-red-600 text-sm mt-1">{transfer.error.includes("low storage") ? t('lowStorageError') : transfer.error}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Stored Content */}
                <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
                    <h2 className="text-xl font-bold text-yellow-900 mb-3">{t('storedContent')}</h2>
                    {storedFiles.length === 0 ? <p className="text-gray-500">{t('noFilesYet')}</p> : (
                        <div className="space-y-4">
                            {/* Uploaded Files */}
                            {uploadedContent.length > 0 && <div>
                                <h3 className="font-bold text-lg text-yellow-800 mb-2 flex items-center gap-2"><UploadIcon /> Your Uploads</h3>
                                {uploadedContent.map(file => (
                                    <div key={file.id} className="bg-white p-2 rounded-lg shadow-sm mb-2 flex items-center gap-2">
                                        {getFileIcon(file.type)}
                                        <div className="flex-grow truncate">
                                            {renamingId === file.id ? (
                                                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full border rounded p-1"/>
                                            ) : (
                                                <p className="font-semibold text-gray-700 truncate">{file.name} <span className="text-sm text-gray-500">({formatBytes(file.size)})</span></p>
                                            )}
                                        </div>
                                        {renamingId === file.id ? (
                                            <>
                                                <button onClick={handleSaveRename} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex-shrink-0">{t('save')}</button>
                                                <button onClick={() => setRenamingId(null)} className="p-2 bg-gray-300 rounded hover:bg-gray-400 flex-shrink-0">{t('cancel')}</button>
                                            </>
                                        ) : (
                                            <div className="flex items-center flex-shrink-0">
                                                <button onClick={() => handleOpenFile(file)} className="p-2 hover:bg-lime-100 rounded-full" aria-label="Open File"><PlayIcon /></button>
                                                <button onClick={() => handleRename(file)} className="p-2 hover:bg-lime-100 rounded-full" aria-label="Rename File"><EditIcon /></button>
                                                <button onClick={() => handleDelete(file)} className="p-2 hover:bg-lime-100 rounded-full" aria-label="Delete File"><DeleteIcon /></button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>}
                             {/* Downloaded Files */}
                            {downloadedContent.length > 0 && <div>
                                <h3 className="font-bold text-lg text-yellow-800 mb-2 flex items-center gap-2"><DownloadIcon /> From Web</h3>
                                {downloadedContent.map(file => (
                                     <div key={file.id} className="bg-white p-2 rounded-lg shadow-sm mb-2 flex items-center gap-2">
                                        {getFileIcon(file.type)}
                                        <div className="flex-grow truncate">
                                            {renamingId === file.id ? (
                                                <input type="text" value={newName} onChange={e => setNewName(e.target.value)} className="w-full border rounded p-1"/>
                                            ) : (
                                                <p className="font-semibold text-gray-700 truncate">{file.name} <span className="text-sm text-gray-500">({formatBytes(file.size)})</span></p>
                                            )}
                                        </div>
                                        {renamingId === file.id ? (
                                            <>
                                                <button onClick={handleSaveRename} className="p-2 bg-green-500 text-white rounded hover:bg-green-600 flex-shrink-0">{t('save')}</button>
                                                <button onClick={() => setRenamingId(null)} className="p-2 bg-gray-300 rounded hover:bg-gray-400 flex-shrink-0">{t('cancel')}</button>
                                            </>
                                        ) : (
                                            <div className="flex items-center flex-shrink-0">
                                                <button onClick={() => handleOpenFile(file)} className="p-2 hover:bg-lime-100 rounded-full" aria-label="Open File"><PlayIcon /></button>
                                                <button onClick={() => handleRename(file)} className="p-2 hover:bg-lime-100 rounded-full" aria-label="Rename File"><EditIcon /></button>
                                                <button onClick={() => handleDelete(file)} className="p-2 hover:bg-lime-100 rounded-full" aria-label="Delete File"><DeleteIcon /></button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DownloadsScreen;