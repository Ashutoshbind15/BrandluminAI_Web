import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const jsonBody = await req.json();

  const { type, content, token, mediumId } = jsonBody;

  if (type === "md") {
    const { data } = await axios.post(
      `https://api.medium.com/v1/users/${mediumId}/posts`,
      {
        title: content?.title,
        contentFormat: "markdown",
        content: content?.md,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(data, { status: 200 });
  } else if (type === "html") {
  }
};
