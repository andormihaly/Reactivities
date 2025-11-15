import { useParams } from "react-router"
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import ProfileEditForm from "./ProfileEditForm";

export default function ProfileAbout() {
    const { id } = useParams();
    const { profile } = useProfile(id);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = ()=>{
        setIsEditing(true);
    }
    const handleEditCancel = () =>{
        setIsEditing(false);
    }
    if (!profile) return <Typography>Profile not found</Typography>

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h5">About {profile?.displayName}</Typography>
                <Button onClick={()=>{
                    if (!isEditing) handleEditClick(); else handleEditCancel()
                    }}>
                    {!isEditing ? 'Edit profile' : 'Cancel'}
                </Button>
            </Box>
            <Divider sx={{my: 2}} />
            {!isEditing ? 
            (
            <Box sx={{overflow: 'auto', maxHeight: 350}}>
                <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>
                    {profile?.bio || 'No description added yet'}
                </Typography>
            </Box>
            )
            :
            (
                    <ProfileEditForm setEditMode={handleEditCancel}/>
            )}
        </Box>
        
    )
}