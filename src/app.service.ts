import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";

@Injectable()
export class AppService {

    constructor(private http: HttpService) {
    }

    async getContact(name: string, email: string, phone: string) {

        const response = await this.http.get('https://vladpalagin2013.amocrm.ru/api/v4/contacts', {
            params: {
                query: phone
            },
            headers: {
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUwN2I2YmY5NGY3MTU3ZjFhZjYyYmM3YmVlMzAzNzBmOTg0YzdjMjNhNDcwYzY1NzgzYzJhZDFhMGRiOGVlY2I1MWMwNDdlNzllM2Y3YjYyIn0.eyJhdWQiOiJmOTBiMWEzZC03MTYwLTQ4YTYtOTc0Yy0zYTE5ZjIzZjI1NTYiLCJqdGkiOiJlMDdiNmJmOTRmNzE1N2YxYWY2MmJjN2JlZTMwMzcwZjk4NGM3YzIzYTQ3MGM2NTc4M2MyYWQxYTBkYjhlZWNiNTFjMDQ3ZTc5ZTNmN2I2MiIsImlhdCI6MTcwMTM0NjI4MiwibmJmIjoxNzAxMzQ2MjgyLCJleHAiOjE3MDE0MzI2ODIsInN1YiI6IjEwMzk4Mjc0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNDM0NjgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.Dua9HDWwc6JhKGpdTCb56mfsD2UzgSycc5rCCNVrX0QkzX95FJC8sr1KeygO5rvQoasPBWqVwHbIbnvrQXPSdywyKfBMGR9h53e9AQEcUTILXENsawuQH7PG_oSZrBMlCsoxkT87-rmM8_c8ExRGsknB6BEKLKzmG--HonUbDLkFiGUCvGQWGIRLYJlx24bdZ8v9IevAtd4EaGgf4voEHKzJvwdFuqglMvbiyTht34YtCONr8lwJgElP05idSQxKbMEoKsjffyyVnaoX5L-KCAZDVSIE-ZvpWmA5wNNpVfLjLYlJDOqB_3URRnkhpDWO5Jk6KjAQmCGFOkTfrggv1Q`
            }
        }).toPromise()

        if (response.status === 204) {
            await this.createContact(name, email, phone);
        }

        else {
            const id = response.data._embedded.contacts[0].id;

            await this.updateContact(name, email, phone, id);
        }
    }

    async createContact(name: string, email: string, phone: string) {

        const contact =
            {
                name: name,
                custom_fields_values: [
                    {
                        field_id: 181107,
                        values: [
                            {
                                value: phone
                            }
                        ]
                    },
                    {
                        field_id: 181109,
                        values: [
                            {
                                value: email
                            }
                        ]
                    }
                ]
            };
        await this.http.post('https://vladpalagin2013.amocrm.ru/api/v4/contacts',
            [contact]
            ,
            {
                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUwN2I2YmY5NGY3MTU3ZjFhZjYyYmM3YmVlMzAzNzBmOTg0YzdjMjNhNDcwYzY1NzgzYzJhZDFhMGRiOGVlY2I1MWMwNDdlNzllM2Y3YjYyIn0.eyJhdWQiOiJmOTBiMWEzZC03MTYwLTQ4YTYtOTc0Yy0zYTE5ZjIzZjI1NTYiLCJqdGkiOiJlMDdiNmJmOTRmNzE1N2YxYWY2MmJjN2JlZTMwMzcwZjk4NGM3YzIzYTQ3MGM2NTc4M2MyYWQxYTBkYjhlZWNiNTFjMDQ3ZTc5ZTNmN2I2MiIsImlhdCI6MTcwMTM0NjI4MiwibmJmIjoxNzAxMzQ2MjgyLCJleHAiOjE3MDE0MzI2ODIsInN1YiI6IjEwMzk4Mjc0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNDM0NjgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.Dua9HDWwc6JhKGpdTCb56mfsD2UzgSycc5rCCNVrX0QkzX95FJC8sr1KeygO5rvQoasPBWqVwHbIbnvrQXPSdywyKfBMGR9h53e9AQEcUTILXENsawuQH7PG_oSZrBMlCsoxkT87-rmM8_c8ExRGsknB6BEKLKzmG--HonUbDLkFiGUCvGQWGIRLYJlx24bdZ8v9IevAtd4EaGgf4voEHKzJvwdFuqglMvbiyTht34YtCONr8lwJgElP05idSQxKbMEoKsjffyyVnaoX5L-KCAZDVSIE-ZvpWmA5wNNpVfLjLYlJDOqB_3URRnkhpDWO5Jk6KjAQmCGFOkTfrggv1Q`
                }
            }
        ).toPromise().then(result => console.log(result));
    }

    async updateContact(name: string, email: string, phone: string, id: number) {

        const contact =
            {
                id: id,
                name: name,
                custom_fields_values: [
                    {
                        field_id: 181107,
                        values: [
                            {
                                value: phone
                            }
                        ]
                    },
                    {
                        field_id: 181109,
                        values: [
                            {
                                value: email
                            }
                        ]
                    }
                ]
            };

        await this.http.patch('https://vladpalagin2013.amocrm.ru/api/v4/contacts',
            [contact],
            {
                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUwN2I2YmY5NGY3MTU3ZjFhZjYyYmM3YmVlMzAzNzBmOTg0YzdjMjNhNDcwYzY1NzgzYzJhZDFhMGRiOGVlY2I1MWMwNDdlNzllM2Y3YjYyIn0.eyJhdWQiOiJmOTBiMWEzZC03MTYwLTQ4YTYtOTc0Yy0zYTE5ZjIzZjI1NTYiLCJqdGkiOiJlMDdiNmJmOTRmNzE1N2YxYWY2MmJjN2JlZTMwMzcwZjk4NGM3YzIzYTQ3MGM2NTc4M2MyYWQxYTBkYjhlZWNiNTFjMDQ3ZTc5ZTNmN2I2MiIsImlhdCI6MTcwMTM0NjI4MiwibmJmIjoxNzAxMzQ2MjgyLCJleHAiOjE3MDE0MzI2ODIsInN1YiI6IjEwMzk4Mjc0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNDM0NjgyLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXX0.Dua9HDWwc6JhKGpdTCb56mfsD2UzgSycc5rCCNVrX0QkzX95FJC8sr1KeygO5rvQoasPBWqVwHbIbnvrQXPSdywyKfBMGR9h53e9AQEcUTILXENsawuQH7PG_oSZrBMlCsoxkT87-rmM8_c8ExRGsknB6BEKLKzmG--HonUbDLkFiGUCvGQWGIRLYJlx24bdZ8v9IevAtd4EaGgf4voEHKzJvwdFuqglMvbiyTht34YtCONr8lwJgElP05idSQxKbMEoKsjffyyVnaoX5L-KCAZDVSIE-ZvpWmA5wNNpVfLjLYlJDOqB_3URRnkhpDWO5Jk6KjAQmCGFOkTfrggv1Q`
                }
            }
        ).toPromise().then(result => console.log(result));
    }
}
