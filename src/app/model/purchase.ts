import {Office} from './office';
import {User} from './user';

export class Purchase{
    id: number;
    created_at: string;
    dispatch_date: string;
    request_date: string;
    canceled_date: string;
    office: Office;
    status: string;
    user: User;
    user_response: User;
}

