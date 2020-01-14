import { DatabaseService } from "./db";
import { Identifiable } from "../models/identifiable"

export class Redis implements DatabaseService<Identifiable> {
    getOne(id: string): Identifiable {
        const identifiable: Identifiable = {
            id: id
        }
        return identifiable;
    }   
    getMany(ids: string[]): Identifiable[] {
        return ids.map(id => { 
            return { id: id }
        });
    }
    getAll(): Identifiable[] {
        return this.getMany(['1', '2', '3', '4']);
    }
}