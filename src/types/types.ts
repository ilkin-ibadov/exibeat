export interface User {
    _id: string;
    username: string;
    role: string;
    timestamp: Date;
}

export interface Track {
    _id: string;
    title: string;
    producer: User;
    dj: User;
    submissionDate: Date;
    hasMessage: boolean;
    feedbackSent: boolean;
}

export interface TracklistItemProps {
    track: Track;
    selectedTrack: string;
    setSelectedTrack: (trackId: string) => void;
}

export interface FeedbackModalProps {
    track: Track;
    selectedTrack: string;
    setSelectedTrack: (trackId: string) => void;
}

export interface Message {
    _id: string;
    content: string;
    timestamp: Date;
    track: Track;
    read: boolean;
    sender: User;
    recipient: User;
}