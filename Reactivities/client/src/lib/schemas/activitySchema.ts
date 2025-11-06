import {z} from 'zod';

const requiredString=(fieldName:string) => z.string().min(1,{message:`${fieldName} is required`})

export const activitySchema = z.object({
    title: requiredString('Title'),
    Description: requiredString('Description'),
    Category: requiredString('Category'),
    Date: requiredString('Date'),
    City: requiredString('City'),
    Venue: requiredString('Venue'),
})

export type ActivitySchema=z.infer<typeof activitySchema>;