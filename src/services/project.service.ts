import type { IProject, IProjectList, IProjectListFiltering } from "../interfaces/project.interface";
import { supabase } from "../lib/supabase";

export class ProjectService {


    private readonly tbl_name = 'tbl_project';

    
    async addNew(formData:any){

        formData.slug = formData.name.trim().toLowerCase().replace(/\s+/g, '-');
        
        const { error } = await supabase
        .from(this.tbl_name)
        .insert(formData)

        if(error) throw error;
    }

    async loadAllOnAdmin(filters:{[key:string]:any}){
        const {data, error} = await supabase
        .from(this.tbl_name)
        .select('id, name, category_id, slug, tbl_category(name), district_id, tbl_districts(name) , views, visible_on_site, created_at, updated_at')
        .order('name', { ascending: true })
        ;

        if(error) throw error;

        const mappedData:IProjectList[] = data.map((row:any) => {
            return {
                id: row.id,
                name: row.name,
                category_id: row.category_id,
                category_name: row.tbl_category.name,
                district_id: row.district_id,
                district_name: row.tbl_districts.name,
                views: row.views,
                visible_on_site: row.visible_on_site,
                created_at: row.created_at,
                updated_at: row.updated_at,
                slug: row.slug
            }
        })

        return mappedData;
        
    }

    async registerVisit(projectId:number){

        const { data, error } = await supabase.rpc('increment_views', { project_id: projectId })

        if(error) throw error;

    }

    async getPropertyById(id:number):Promise<IProject>{

        const {data, error } = await supabase
            .from(this.tbl_name)
            .select()
            .eq("id", id)
            .limit(1)
            .single()
            ;

        if(error) throw error;

        return data;

    }

    async getPropertyBySlug(slug:string){
        const {data, error} = await supabase
        .from(this.tbl_name)
        .select(
            `
            id,
            description,
            slug,
            name,
            min_area,
            lot_count,
            currency_symbol,
            min_price,
            on_sale,
            offer_price,
            has_water,
            has_electricity,
            has_sewer,
            latitude,
            longitude,
            brochure_link,
            video_link,
            visible_on_site,
            views,
            created_at,
            updated_at,
            images,
            category_id,
            tbl_category(name),
            district_id,
            tbl_districts(name)
            `
        )
        .eq('slug', slug)
        .eq('visible_on_site', true)
        .limit(1)
        .single();
        if(error) throw error;

        const {tbl_category, tbl_districts, ...row} = data as any;

        const mappedData:IProjectList = {
            ...row,
            category_name: tbl_category.name,
            district_name: tbl_districts.name,
            
        }

        return mappedData;
        
    }



    async loadAllForClients(filters:IProjectListFiltering){

        let query = supabase
        .from(this.tbl_name)
        .select(
            `
            id,
            description,
            slug,
            name,
            min_area,
            lot_count,
            currency_symbol,
            min_price,
            on_sale,
            offer_price,
            has_water,
            has_electricity,
            has_sewer,
            latitude,
            longitude,
            brochure_link,
            video_link,
            visible_on_site,
            views,
            created_at,
            updated_at,
            images,
            category_id,
            tbl_category(name),
            district_id,
            tbl_districts(name)
            `
        )
        .eq('visible_on_site', true)
        
        if(filters.category_id){
            query = query.eq('category_id', filters.category_id)
        }

        if(filters.district_id){
            query = query.eq('district_id', filters.district_id)
        }

        if(filters.with_services){
            query = query.or(
                'has_water.eq.true,has_electricity.eq.true,has_sewer.eq.true'
            )
        }

        if(filters.on_sale){
            query = query.eq('on_sale', true)
        }

        if(filters.sort_by){
            query = query.order(filters.sort_by, { ascending: filters.sort_direction === 'asc' })
        }

        if (filters.cursor) {
            query = query.or(
                filters.sort_direction === 'asc'
                ? `${filters.sort_by}.gt.${filters.cursor.value},and(${filters.sort_by}.eq.${filters.cursor.value},id.gt.${filters.cursor.id})`
                : `${filters.sort_by}.lt.${filters.cursor.value},and(${filters.sort_by}.eq.${filters.cursor.value},id.lt.${filters.cursor.id})`
            )
            }

        query = query.limit(filters.limit);

        const {data, error} = await query;
        
        if(error) throw error;
        
        const mappedData:any[] = data.map((value:any) => {

            const {tbl_category, tbl_districts, ...row} = value as any;

            return {
                ...row,
                category_name: tbl_category.name,
                district_name: tbl_districts.name,
            
             }
        })

        const cursor = data[data.length - 1] ? {
            value: (data[data.length - 1] as any)[filters.sort_by],
            id: (data[data.length - 1] as any).id
        } : undefined;

        return {data: mappedData, cursor};
        
    }
    
}



