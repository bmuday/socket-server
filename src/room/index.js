import { Socket } from "socket.io";
import { v4 as uuid } from "uuid";
// import { IUser, IMessage, IchannelParams, IJoinchannelParams } from "./types";

const channels = [];
const chats = [];

export const roomHandler = (socket) => {
  const createConversation = () => {};
  const joinConversation = () => {};

  const createChannel = () => {
    const channelId = uuid();
    channels[channelId] = {};
    socket.emit("channel-created", { channelId });
    console.log("user created the channel");
  };
  const joinChannel = ({ channelId, peerId, userName }) => {
    if (!channels[channelId]) channels[channelId] = {};
    if (!chats[channelId]) chats[channelId] = [];
    socket.emit("get-messages", chats[channelId]);
    console.log("user joined the channel", channelId, peerId, userName);
    channels[channelId][peerId] = { peerId, userName };
    socket.join(channelId);
    socket.to(channelId).emit("user-joined", { peerId, userName });
    socket.emit("get-users", {
      channelId,
      participants: channels[channelId],
    });

    socket.on("disconnect", () => {
      console.log("user left the channel", peerId);
      leaveChannel({ channelId, peerId });
    });
  };

  const leavechannel = ({ peerId, channelId }) => {
    // channels[channelId] = channels[channelId]?.filter((id) => id !== peerId);
    socket.to(channelId).emit("user-disconnected", peerId);
  };

  const sendMessage = (channelId, message) => {
    console.log({ message });
    if (chats[channelId]) {
      chats[channelId].push(message);
    } else {
      chats[channelId] = [message];
    }
    socket.to(channelId).emit("add-message", message);
  };

  socket.on("create-conversation", createConversation);
  socket.on("join-conversation", joinConversation);
  socket.on("create-channel", createChannel);
  socket.on("join-channel", joinChannel);
  socket.on("send-message", sendMessage);
};
