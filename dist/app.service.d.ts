import { HttpService } from "@nestjs/axios";
export declare class AppService {
    private http;
    constructor(http: HttpService);
    getContact(name: string, email: string, phone: string): Promise<void>;
    createContact(name: string, email: string, phone: string): Promise<void>;
    updateContact(name: string, email: string, phone: string, id: number): Promise<void>;
}
