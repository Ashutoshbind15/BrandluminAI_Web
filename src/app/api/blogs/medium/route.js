import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const jsonBody = await req.json();

  const { data } = await axios.get("https://api.medium.com/v1/me", {
    headers: {
      Authorization: `Bearer ${jsonBody.token}`,
    },
  });

  return NextResponse.json(data, { status: 200 });
};
