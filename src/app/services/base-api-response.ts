export interface BaseApiResponse<T> {
    friendlyMessage: FriendlyMessage;
    data: T;
    dataList: Array<T>;
    itemCount: number;
}
interface FriendlyMessage {
    message: string;
    detail: string;
}