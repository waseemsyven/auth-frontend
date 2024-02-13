import { withApiAuthRequired, getAccessToken } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function datasets(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scope: process.env.AUTH0_SCOPE,
    });
    const response = await fetch(
      `${process.env.AUTH0_AUDIENCE}darren-dev-b00f/models/list`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const datasets = await response.json();
    return NextResponse.json({ status: 200, data: datasets }, res);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 401 });
  }
});
