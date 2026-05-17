declare module 'activedirectory' {
    export interface ActiveDirectoryConfig {
        url: string;
        baseDN: string;
        username: string;
        password: string;
        followReferrals?: boolean;
        maxReferralHops?: number;
    }

    export default class ActiveDirectory {
        constructor(config: ActiveDirectoryConfig);
        authenticate(
            username: string,
            password: string,
            callback: (err: Error | null, auth?: boolean) => void,
        ): void;
        findUser(
            username: string,
            callback: (err: Error | null, user?: Record<string, unknown>) => void,
        ): void;
        isUserMemberOf(
            username: string,
            groupName: string,
            callback: (err: Error | null, isMember?: boolean) => void,
        ): void;
    }
}
