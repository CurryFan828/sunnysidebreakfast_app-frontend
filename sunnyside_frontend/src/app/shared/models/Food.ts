export class Food {
    id!: number;
    name!: string;
    description?: string;
    price!: number;
    quantity?: number;
    tags?: string[];
    favorite!: boolean;
    stars!: number;
    imageUrl!: string;
    cookTime?: string;
}