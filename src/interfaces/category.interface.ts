import type { SoftDelete } from "./soft-delete.interface";

export interface ICategory extends SoftDelete {
    id: string;
    name: string;

}