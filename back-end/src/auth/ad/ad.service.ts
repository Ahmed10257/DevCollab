import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import ActiveDirectory from 'activedirectory';
import adConfig from '../config/ad.config';
import { AdUserRecord } from '../types/ad-user';

type AdCallback<T> = (err: Error | null, result?: T) => void;

@Injectable()
export class AdService {
    private client: ActiveDirectory | null = null;

    constructor(
        @Inject(adConfig.KEY)
        private readonly config: ConfigType<typeof adConfig>,
    ) {}

    async authenticate(userName: string, password: string): Promise<AdUserRecord> {
        const client = this.getClient();

        const authenticated = await this.promisify<boolean>((cb) =>
            client.authenticate(userName, password, cb),
        );

        if (!authenticated) {
            throw new Error('Active Directory authentication failed');
        }

        const user = await this.promisify<AdUserRecord | undefined>((cb) =>
            client.findUser(userName, cb),
        );

        if (!user?.sAMAccountName) {
            throw new Error('Active Directory user record was not found');
        }

        return user;
    }

    async isUserInGroup(userName: string, groupName: string): Promise<boolean> {
        const client = this.getClient();
        return this.promisify<boolean>((cb) =>
            client.isUserMemberOf(userName, groupName, cb),
        );
    }

    get adminGroup(): string {
        return this.config.adminGroup;
    }

    private getClient(): ActiveDirectory {
        if (!this.config.url || !this.config.baseDN || !this.config.username || !this.config.password) {
            throw new InternalServerErrorException(
                'Active Directory is not configured. Set AD_URL, BASE_DN, AD_BIND_USERNAME, and AD_BIND_PASSWORD.',
            );
        }

        if (!this.client) {
            this.client = new ActiveDirectory({
                url: this.config.url,
                baseDN: this.config.baseDN,
                username: this.config.username,
                password: this.config.password,
                followReferrals: this.config.followReferrals,
                maxReferralHops: this.config.maxReferralHops,
            });
        }

        return this.client;
    }

    private promisify<T>(run: (callback: AdCallback<T>) => void): Promise<T> {
        return new Promise((resolve, reject) => {
            run((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result as T);
            });
        });
    }
}
