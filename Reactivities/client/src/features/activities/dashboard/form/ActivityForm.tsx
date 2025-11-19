import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { activitySchema, type ActivitySchema } from "../../../../lib/schemas/activitySchema";
import TextInput from "../../../../app/shared/components/TextInput";
import { categoryOptions } from "./categoryOptions";
import SelectInput from "../../../../app/shared/components/SelectInput";
import DateTimeIput from "../../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../../app/shared/components/LocationInput";


export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema),
    defaultValues: {title: "", description: "",category: "", date: null
      //,location: {   venue: "",   city: "",   latitude: 0, longitude: 0, },
    
    },

  });

  const navigate=useNavigate();
  const { id } = useParams();

  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

  useEffect(() => {
    if (activity) reset({
      ...activity,
      date: new Date(activity.date),
      location:{
        city:activity.city,
        venue:activity.venue,
        latitude:activity.latitude,
        longitude:activity.longitude
      }
    });
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
   
   console.log(data);
   const{location,...rest}=data;
   const flattenedData={...rest,...location,
    date: data.date ? new Date(data.date) : new Date()
   }
    try {
      if (activity)
      {
        updateActivity.mutate({...activity,...flattenedData},{
          onSuccess:()=>navigate(`/activities/${activity.id}`)
        })
      }
      else{
        createActivity.mutate(flattenedData,{
          onSuccess:(id)=>navigate (`/activities/${id}`)
        })
      }
    } catch (error) {
      console.log(error);
      
    }

  }

  if (isLoadingActivity) {
    return <Typography>Loading Activity....</Typography>
  }

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>

      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit Activity' : 'Create Activity'}
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>

        <TextInput label='Title' control={control} name="title" />
        <TextInput label='Description' control={control} name="description" multiline rows={3} />

        <Box display='flex' gap={3}>
          <SelectInput items={categoryOptions} label='Category' control={control} name="category" />

          <DateTimeIput label='Date' control={control} name="date" />
        </Box>
        
        <LocationInput name ='location' label="Enter the location" control={control}></LocationInput>

        <Box display='flex' justifyContent='end' gap={3}>
          <Button onClick={() => { }} color='inherit' >Cancel</Button>
          <Button
            type="submit"
            color='success' variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >Submit</Button>
        </Box>
      </Box>
    </Paper>

  )
}
