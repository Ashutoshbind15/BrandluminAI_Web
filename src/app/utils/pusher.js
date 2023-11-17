import "server-only";
import Pusher from "pusher";
let pusherInstance = null;

export const getPusherInstance = () => {
  if (!pusherInstance) {
    console.log("new pusher instance");
    pusherInstance = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: "ap2",
      useTLS: true,
    });
  }
  return pusherInstance;
};
