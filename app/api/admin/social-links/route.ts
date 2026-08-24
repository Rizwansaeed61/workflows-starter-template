import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { siteConfig } from "@/content/site-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const socialLinks = await prisma.socialLink.findMany({
      where: { active: true },
      orderBy: { displayOrder: "asc" },
    });

    const linksMap: Record<string, string> = {};
    socialLinks.forEach((l) => {
      linksMap[l.platform.toLowerCase()] = l.url;
    });

    const data = {
      facebook: linksMap["facebook"] || siteConfig.facebook,
      instagram: linksMap["instagram"] || siteConfig.instagram,
      linkedin: linksMap["linkedin"] || siteConfig.linkedin,
      youtube: linksMap["youtube"] || siteConfig.youtube,
      twitter: linksMap["twitter"] || siteConfig.twitter,
      dribbble: linksMap["dribbble"] || siteConfig.dribbble,
      tiktok: linksMap["tiktok"] || siteConfig.tiktok,
      github: linksMap["github"] || siteConfig.github,
      email: siteConfig.email,
      phone: siteConfig.phone,
      whatsappUrl: siteConfig.whatsappUrl,
      location: "Multan, Pakistan (Serving UAE, USA & UK Clients)",
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({
      success: true,
      data: {
        facebook: siteConfig.facebook,
        instagram: siteConfig.instagram,
        linkedin: siteConfig.linkedin,
        youtube: siteConfig.youtube,
        twitter: siteConfig.twitter,
        dribbble: siteConfig.dribbble,
        tiktok: siteConfig.tiktok,
        github: siteConfig.github,
        email: siteConfig.email,
        phone: siteConfig.phone,
        whatsappUrl: siteConfig.whatsappUrl,
        location: "Multan, Pakistan (Serving UAE, USA & UK Clients)",
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      facebook,
      instagram,
      linkedin,
      youtube,
      twitter,
      dribbble,
      tiktok,
      github,
      email,
      phone,
      whatsappUrl,
    } = body || {};

    const platformsToUpdate = [
      { platform: "Facebook", url: facebook, icon: "Facebook", displayOrder: 1 },
      { platform: "Instagram", url: instagram, icon: "Instagram", displayOrder: 2 },
      { platform: "LinkedIn", url: linkedin, icon: "Linkedin", displayOrder: 3 },
      { platform: "YouTube", url: youtube, icon: "Youtube", displayOrder: 4 },
      { platform: "Twitter", url: twitter, icon: "Twitter", displayOrder: 5 },
      { platform: "Dribbble", url: dribbble, icon: "Globe", displayOrder: 6 },
      { platform: "TikTok", url: tiktok, icon: "Video", displayOrder: 7 },
      { platform: "GitHub", url: github, icon: "Github", displayOrder: 8 },
    ];

    for (const item of platformsToUpdate) {
      if (item.url) {
        const existing = await prisma.socialLink.findFirst({
          where: { platform: item.platform },
        });

        if (existing) {
          await prisma.socialLink.update({
            where: { id: existing.id },
            data: { url: item.url, active: true },
          });
        } else {
          await prisma.socialLink.create({
            data: item,
          });
        }
      }
    }

    // Update Profile details in Supabase
    await prisma.profile.updateMany({
      data: {
        ...(linkedin ? { linkedin } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(whatsappUrl ? { whatsapp: whatsappUrl } : {}),
      },
    });

    // Log admin activity
    await prisma.activityLog.create({
      data: {
        userName: "Admin",
        action: "UPDATE",
        entity: "Social Links",
        details: "Updated social media channels and contact handles",
      },
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Social media links updated successfully in Supabase!",
    });
  } catch (error: any) {
    console.error("Failed to update social links:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update social links" },
      { status: 500 }
    );
  }
}
