import type { IImage } from "./image.interface";

export interface IProject{
    id: string;
    description: string;
    slug:string;
    name: string;
    category_id: number;
    category_name: string;
    min_area: number;
    lot_count:number;
    currency_symbol: string;
    min_price: number;
    on_sale: boolean;
    offer_price: number | null;
    has_water: boolean;
    has_electricity: boolean;
    has_sewer: boolean;
    district_id: number;
    district_name: string;
    latitude: number;
    longitude: number;
    brochure_link: string | null;
    video_link: string | null;
    visible_on_site: boolean;
    views: number;
    created_at: string;
    updated_at: string;
    images: IImage[];
}

export interface IProjectList{
    id: string;
    name: string;
    category_id: number;
    category_name: string;
    district_id: number;
    district_name: string;
    views: number;
    visible_on_site: boolean;
    created_at: string;
    updated_at: string;
}

export interface IAddProject extends Omit<IProject, 'id' | 'created_at' | 'updated_at' | 'images' | 'category_name' | 'district_name'>{
    images: {
        file: File;
        temporalUrl: string;
        alt: string;
    }[]
}

export interface IProjectListFiltering{
    
    category_id: number | null;
    district_id: number | null;
    with_services: boolean;
    on_sale: boolean;
    sort_by: string;
    sort_direction: "asc" | "desc";
    
    limit: number;
    cursor: {
        value: any,
        id: number
    }  | undefined
}