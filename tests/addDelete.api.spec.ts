import { test, expect } from '@playwright/test';
import { ListApi } from '../api/addDelete.api';
import { faker } from '@faker-js/faker';

test('Create and delete a list via API', async ({ request }) => {
    const listApi = new ListApi(request);
    const randomListName = faker.word.words(2);

    const listPayload = {
        boardId: 1,
        name: randomListName,
        order: 0
    };

    const createdList = await listApi.createList(listPayload);

    expect(createdList.name).toBe(randomListName);
    expect(createdList.boardId).toBe(1);

    await listApi.deleteList(createdList.id);
});