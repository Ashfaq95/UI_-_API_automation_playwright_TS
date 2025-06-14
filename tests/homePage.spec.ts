import { test, expect } from '@playwright/test';
import { MyBoardsPage } from '../pages/homePage.pom';
import { ListPage } from '../pages/listPage.pom';
import { faker } from '@faker-js/faker';


test('User should be able to add a board, add two lists and Delete one list', async ({ page }) => {
    const boardPage = new MyBoardsPage(page);
    const listPage = new ListPage(page);
    const randomBoardName = faker.word.words(2);

    await boardPage.navigateToHomePage();
    await expect(boardPage['myBoardsLabel']).toBeVisible();
    await boardPage.createNewBoard(randomBoardName);
    await expect(page.locator(`input[value="${randomBoardName}"]`)).toBeVisible();
    await listPage.addList('Sunday Tasks');
    expect(await listPage.isListVisible('Sunday Tasks')).toBeTruthy();
    await listPage.addList('Monday Tasks');
    expect(await listPage.isListVisible('Monday Tasks')).toBeTruthy();
    await listPage.deleteFirstList();
    expect(await listPage.isListVisible('Monday Tasks')).toBeTruthy();


});