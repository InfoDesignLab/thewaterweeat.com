import { HttpClient } from '../..';
export declare class AxiosHttpClient implements HttpClient {
    private axios;
    get<T>(url: string): Promise<T>;
}
