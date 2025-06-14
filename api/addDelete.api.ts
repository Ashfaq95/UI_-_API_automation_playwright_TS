import { APIRequestContext, expect } from '@playwright/test';

interface CreateListPayload {
    boardId: number;
    name: string;
    order: number;
}

interface ListResponse {
    boardId: number;
    name: string;
    order: number;
    created: string;
    id: number;
}

export class ListApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createList(payload: CreateListPayload): Promise<ListResponse> {
        const response = await this.request.post('http://localhost:3000/api/lists', {
            data: payload
        });

        expect(response.status()).toBe(201);

        const body: ListResponse = await response.json();
        return body;
    }

    async deleteList(id: number): Promise<void> {
        const response = await this.request.delete(`http://localhost:3000/api/lists/${id}`);
        expect(response.status()).toBe(200);
    }
}
