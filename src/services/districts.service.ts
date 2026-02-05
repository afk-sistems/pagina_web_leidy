import { addDoc, and, collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import app from "../lib/firebase";
import { supabase } from "../lib/supabase";
import type { IDistrict } from "../interfaces/district.interface";

export class DistrictService {

    private readonly tbl_name = 'tbl_districts';

    async listAll(){
        
        // const q = query(collection(this.db, this.tbl_name), and(
        //     where('estado', '==', true),
        //     where('eliminado', '==', false)
        // ),
        //     orderBy('nombre', 'asc')
        // );
        // const querySnapshot = await getDocs(q);
        // const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id,...doc.data()}));
        
        
        // return projectsData as any[];

        const {data, error} = await supabase
        .from(this.tbl_name)
        .select()
        
        if(error){
            throw error;
        }
        
        return data as IDistrict[];
    }
    
    
}