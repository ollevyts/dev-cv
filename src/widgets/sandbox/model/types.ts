export interface ILogEvent {
    id: string;
    timestamp: string;
    type: 'CLICK' | 'CONVERSION' | 'SYSTEM' | 'ERROR';
    message: string;
    geo: string;
}

export interface ISandboxStats {
    clicks: number;
    convs: number;
    errors: number;
}