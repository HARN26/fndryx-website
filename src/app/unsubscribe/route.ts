import { NextResponse } from "next/server";

const UNSUBSCRIBE_ENDPOINT =
  "https://xcesazshfinwsdqyndlg.supabase.co/functions/v1/unsubscribe";

// RFC 8058 one-click: mail clients POST here directly. Forward verbatim to the
// Edge Function and return its status and body untouched.
export async function POST(request: Request) {
  const url = new URL(request.url);
  const body = await request.text();

  const upstream = await fetch(`${UNSUBSCRIBE_ENDPOINT}${url.search}`, {
    method: "POST",
    headers: {
      "Content-Type":
        request.headers.get("content-type") ??
        "application/x-www-form-urlencoded",
    },
    body,
  });

  return new Response(await upstream.text(), { status: upstream.status });
}

// A human clicking the link gets the branded page. The token is not verified
// here: a bad token surfaces the branded error after the click instead of before.
export async function GET(request: Request) {
  const url = new URL(request.url);
  return NextResponse.redirect(
    new URL(`/unsubscribe/confirm${url.search}`, request.url),
    302
  );
}
