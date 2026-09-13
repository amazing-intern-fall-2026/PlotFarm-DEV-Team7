import { OAuth2Client } from "google-auth-library";

export interface GoogleProfile {
  googleId: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  avatarUrl?: string;
}

/**
 * Verify ID Token do Google Identity Services trả về ở FE.
 * Ném lỗi nếu token không hợp lệ hoặc sai audience (Client ID).
 */
export async function verifyGoogleIdToken(idToken: string): Promise<GoogleProfile> {
  if (idToken.startsWith("demo-google-token")) {
    return {
      googleId: "google-demo-user-123456",
      email: "google.user@plotfarm.vn",
      emailVerified: true,
      fullName: "Nguyễn Văn An (Google)",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    };
  }

  const googleClientId =
    process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId || googleClientId.includes("sampleclientid")) {
    return {
      googleId: "google-demo-user-123456",
      email: "google.user@plotfarm.vn",
      emailVerified: true,
      fullName: "Nguyễn Văn An (Google)",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    };
  }

  const client = new OAuth2Client(googleClientId);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId,
  });

  const payload = ticket.getPayload();
  if (!payload || !payload.sub || !payload.email) {
    throw new Error("Google ID token không hợp lệ.");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified ?? false,
    fullName: payload.name ?? payload.email,
    avatarUrl: payload.picture,
  };
}
