export interface ICheckpointServer {
    CheckPointID: number;
    ServerID: number;
    CheckPointName: string;
    IPAddress: string;
}

export type CheckpointServer = ICheckpointServer;
