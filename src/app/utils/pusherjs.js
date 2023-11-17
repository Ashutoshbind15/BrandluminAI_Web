import PusherClient from "pusher-js";

export const getPusherClientInstance = () => {
  console.log("new pusher client instance");
  const pusherClientInstance = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    {
      cluster: "ap2",
      enabledTransports: ["ws", "wss"],
    }
  );
  return pusherClientInstance;
};
