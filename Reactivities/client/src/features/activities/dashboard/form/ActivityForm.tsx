import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { activitySchema, type ActivitySchema } from "../../../../lib/schemas/activitySchema";

export default function ActivityForm() {
  const { register, reset, handleSubmit, formState: { errors } } = useForm<ActivitySchema>({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema)

  });

  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
  useEffect(() => {
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = (data: ActivitySchema) => {
    console.log(data);
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
        <TextField
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
          label='Title'

          defaultValue={activity?.title}></TextField>
        
        <TextField {...register('Description')} label='Description' multiline rows={3} defaultValue={activity?.description}></TextField>
        <TextField {...register('Category')} label='Category' defaultValue={activity?.category}></TextField>
        <TextField {...register('Date')} label='Date' type="date"
          defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] :
            new Date().toISOString().split('T')[0]}>

        </TextField>
        <TextField {...register('City')} label='City' defaultValue={activity?.city}></TextField>
        <TextField {...register('Venue')} label='Venue' defaultValue={activity?.venue}></TextField>
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
