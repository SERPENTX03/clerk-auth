import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { Webhook } from "svix";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!SIGNING_SECRET) {
      throw new Error(
        "Error: Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env"
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error: Could not verify webhook:", err);
      return new Response("Error: Verification error", {
        status: 400,
      });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, image_url } = evt.data;
      const email = email_addresses[0]?.email_address;

      if (!email) {
        return new Response("Email not found", { status: 404 });
      }

      const existingUser = await User.findOne({ clerkId: id });

      if (existingUser) {
        return new Response("User already exists", { status: 402 });
      }

      const user = new User({
        clerkId: id,
        email,
        profileImage: image_url,
        role: "user",
      });
      const newUser = await user.save();

      const client = await clerkClient();

      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          role: "USER",
          dbUserId: newUser.id,
        },
      });

      return NextResponse.json(
        {
          message: "User created successfully",
          userId: newUser.id,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      {
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
