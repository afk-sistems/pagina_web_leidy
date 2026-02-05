import type { SoftDelete } from "./soft-delete.interface";

export interface IDistrict extends SoftDelete{
    id: number;
    name: string;
}