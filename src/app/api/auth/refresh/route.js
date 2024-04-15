import User from "@/app/models/User";
import { getAccessToken } from "@/app/utils/apis/videoIndexer";

export const POST = async (req) => {
  const refreshedAccessToken = await getAccessToken();

  const jsonbody = await req.json();
  const { uid } = jsonbody;

  await connectDB();

  const user = await User.findByIdAndUpdate(
    uid,
    { accessToken: refreshedAccessToken },
    { new: true }
  );

  return NextResponse.json(user, { status: 201 });
};
