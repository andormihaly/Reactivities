import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editProfileSchema, type EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { useEffect } from "react";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

type Props ={
  setEditMode: (editMode: boolean) => void;
}
export default function ProfileEditForm({setEditMode}:Props) {
    const { control, reset, handleSubmit,formState: { isDirty, isValid } } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(editProfileSchema),

  });
   const { id } = useParams();
   const {updateProfile, profile} = useProfile(id);

    

  useEffect(() => {
    if (profile) reset(profile)
    
  }, [profile, reset]);

  const onSubmit = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
    onSuccess: () => setEditMode(false)
    });
  }

 if (!profile) return <Typography>Profile not found</Typography>

  return (
      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' mt={3} gap={2} alignContent='center'>
         <TextInput label='Display Name' control={control} name="displayName" />
         <TextInput label='Add your bio' control={control} name="bio" multiline rows={3} />
         <Box display='flex' justifyContent='end' gap={3}>
          <Button
            type="submit"
            color='success' variant="contained" fullWidth
            disabled={!isValid || !isDirty || updateProfile.isPending}
          >Update profile</Button>
        </Box>
      </Box>
  )
}
