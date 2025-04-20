import User from "@/models/User";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req as NextRequest);

    // Do something with payload
    // For this guide, log payload to console
    // const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, email_addresses, image_url } = evt.data;
      const user = await new User({
        clerkId: id,
        email: email_addresses[0].email_address,
        profileImage: image_url,
        role: "user",
      });
      await user.save();
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
