import { registerAs } from '@nestjs/config';

export interface AdConfig {
    url: string;
    baseDN: string;
    username: string;
    password: string;
    adminGroup: string;
    followReferrals: boolean;
    maxReferralHops: number;
}

export default registerAs(
    'ad',
    (): AdConfig => ({
        url: process.env.AD_URL ?? '',
        baseDN: process.env.BASE_DN ?? '',
        username: process.env.AD_BIND_USERNAME ?? '',
        password: process.env.AD_BIND_PASSWORD ?? '',
        adminGroup: process.env.AD_ADMIN_GROUP ?? 'Administrators',
        followReferrals: process.env.AD_FOLLOW_REFERRALS !== 'false',
        maxReferralHops: Number(process.env.AD_MAX_REFERRAL_HOPS ?? 10),
    }),
);
