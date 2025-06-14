import { Page, Locator } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class MyBoardsPage {

    private page: Page;
    private HomePageUrl: string = process.env.BASE_URL as string;
    private myBoardsLabel: Locator;
    private createNewBoardButton: Locator;
    private addBoardTitleInputField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createNewBoardButton = this.page.getByRole('heading', { name: 'Create new board' });
        this.myBoardsLabel = this.page.getByRole('heading', { name: 'My Boards' });
        this.addBoardTitleInputField = this.page.getByRole('textbox', { name: 'Add board title' });

    }

    async navigateToHomePage(): Promise<void> {
        await this.page.goto(this.HomePageUrl);
    }
    async createNewBoard(boardName: string): Promise<void> {
        await this.createNewBoardButton.click();
        await this.addBoardTitleInputField.fill(boardName);
        await this.addBoardTitleInputField.press('Enter');

    }
    async isBoardVisible(name: string): Promise<boolean> {
        return await this.page.locator(`text=${name}`).isVisible();
    }

}