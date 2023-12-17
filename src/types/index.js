export interface IUser {
  peerId: string;
  userName: string;
}
export interface IRoomParams {
  roomId: string;
  peerId: string;
}

export interface IJoinRoomParams extends IRoomParams {
  userName: string;
}
export interface IMessage {
  content: string;
  author?: string;
  timestamp: number;
}
