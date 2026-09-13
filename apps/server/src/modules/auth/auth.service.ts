import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { db } from "@repo/database";
import { ERROR_CODES, type LoginResponseData } from "@repo/shared";
import { AppError } from "../../errors/AppError";
import { TokenService } from "./token.service";
import { verifyGoogleIdToken } from "./googleAuth";

function generateUserCode(): string {
  const year = new Date().getFullYear();
  const random = randomUUID().slice(0, 6).toUpperCase();
  return `USR-CUST-${year}-${random}`;
}

async function buildLoginResponse(user: {
  userCode: string | null;
  email: string;
  fullName: string;
  role: LoginResponseData["user"]["role"];
  preferredLocale: string;
  avatarUrl: string | null;
  id: string;
}): Promise<LoginResponseData> {
  const accessToken = TokenService.generateAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = await TokenService.createRefreshToken(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      userCode: user.userCode ?? "",
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      preferredLocale: user.preferredLocale,
      avatarUrl: user.avatarUrl,
    },
  };
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<LoginResponseData> {
  const user = await db.user.findUnique({ where: { email } });

  if (!user || user.deletedAt !== null) {
    throw AppError.unauthorized(
      "Email hoặc mật khẩu không đúng.",
      ERROR_CODES.UNAUTHORIZED,
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw AppError.unauthorized(
      "Email hoặc mật khẩu không đúng.",
      ERROR_CODES.UNAUTHORIZED,
    );
  }

  return buildLoginResponse(user);
}

export async function loginWithGoogle(idToken: string): Promise<LoginResponseData> {
  const profile = await verifyGoogleIdToken(idToken);

  if (!profile.emailVerified) {
    throw AppError.unauthorized(
      "Email Google chưa được xác thực.",
      ERROR_CODES.UNAUTHORIZED,
    );
  }

  let user = await db.user.findUnique({ where: { googleId: profile.googleId } });

  if (!user) {
    const existingByEmail = await db.user.findUnique({ where: { email: profile.email } });

    if (existingByEmail) {
      user = await db.user.update({
        where: { id: existingByEmail.id },
        data: { googleId: profile.googleId, isVerified: true },
      });
    } else {
      const passwordHash = await bcrypt.hash(randomUUID(), 10);
      user = await db.user.create({
        data: {
          email: profile.email,
          fullName: profile.fullName,
          avatarUrl: profile.avatarUrl,
          googleId: profile.googleId,
          passwordHash,
          role: "CUSTOMER",
          isVerified: true,
          userCode: generateUserCode(),
        },
      });
    }
  }

  if (user.deletedAt !== null) {
    throw AppError.forbidden("Tài khoản đã bị khóa.", ERROR_CODES.ACCOUNT_DISABLED);
  }

  return buildLoginResponse(user);
}
