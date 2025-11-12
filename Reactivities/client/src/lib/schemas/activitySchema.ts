import {z} from 'zod';
import { requiredString } from '../util/util';



export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),

    //date: requiredString('Date'),
    //date: z.coerce.date({message:'Date is required'}),
    date: z.date().nullable().refine(v => v !== null && !isNaN(v.getTime()), {message: "Date is required",}),
    //date: z.coerce.date().refine((v) => v instanceof Date && !isNaN(v.getTime()),{ message: "Date is required" }),
    
   location:z.object({
    venue:requiredString('Venue'),
    city:z.string().optional(),
    latitude: z.number(),
    longitude:z.number(),
   })
})

export type ActivitySchema=z.infer<typeof activitySchema>;