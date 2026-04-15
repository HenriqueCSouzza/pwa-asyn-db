import { NextResponse } from "next/server";

const store = new Map();

export async function POST(req: Request) {
  const body = await req.json();

  // idempotência
  if (store.has(body.id)) {
    return NextResponse.json({ ok: true });
  }

  store.set(body.id, body);

  return NextResponse.json({ ok: true });
}
