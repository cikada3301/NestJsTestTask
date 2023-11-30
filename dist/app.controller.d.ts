import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getContact(name: string, email: string, phone: string): Promise<void>;
}
