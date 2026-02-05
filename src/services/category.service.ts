import { and, collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import app from "../lib/firebase";
import type { ICategory } from "../interfaces/category.interface";
import { supabase } from "../lib/supabase";

export class CategoryService {


    

    private readonly tbl_name = 'tbl_category';

    async listAll(){

        const { data, error } = await supabase.from(this.tbl_name).select('*').eq('deleted', false);

        if(error) throw error;
        
        
        return data as ICategory[];

    }
    
}