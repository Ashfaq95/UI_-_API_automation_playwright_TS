
import { Page, Locator } from '@playwright/test';

export class ListPage {
    private page: Page;
    private addListButton: Locator;
    private listTitleInput: Locator;
    private listItems: Locator;
    private listMenuButtons: Locator;
    private deleteListButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.listTitleInput = page.getByRole('textbox', { name: 'Enter list title...' });
        this.addListButton = page.getByRole('button', { name: 'Add list' });
        this.listMenuButtons = page.getByRole('button').nth(2);
        this.deleteListButton = page.getByText('Delete list');
    }

    async addList(name: string) {
        await this.listTitleInput.fill(name);
        await this.addListButton.click();

    }

    async deleteFirstList() {
        await this.listMenuButtons.click();
        await this.deleteListButton.click();
    }
    async isListVisible(name: string): Promise<boolean> {
        return await this.page.locator(`text=${name}`).isVisible();
    }

    async isBoardVisible(name: string): Promise<boolean> {
        return await this.page.locator(`text=${name}`).isVisible();
    }
}
