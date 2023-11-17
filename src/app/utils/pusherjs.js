import PusherClient from "pusher-js";
let pusherClientInstance = null;

export const getPusherClientInstance = () => {
  if (!pusherClientInstance) {
    console.log("new pusher client instance");
    pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      {
        cluster: "ap2",
      }
    );
  }
  return pusherClientInstance;
};
