import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import type { LoginSchema } from "../schemas/loginSchema"
import { useLocation, useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount=()=>{
    const queryClient=useQueryClient();
    const navigate = useNavigate();
    const location=useLocation();

    const loginUser=useMutation({
        mutationFn:async (creds:LoginSchema)=>{
            await agent.post('/login?useCookies=true',creds)
        },
        onSuccess : async()=>{
        await queryClient.invalidateQueries({
        queryKey:['user']
        });
        
        }
    })

     const registerUser = useMutation({
         mutationFn:async (creds:RegisterSchema)=>{
            await agent.post('/account/register',creds)
        },
        onSuccess : async()=>{
            toast.success('Register successfull-you can login now')
            navigate('/login')
        }
        })


    const logoutUser = useMutation({
         mutationFn:async ()=>{
            await agent.post('/account/logout')
        },
        onSuccess : async()=>{
            queryClient.removeQueries({
                queryKey:['user'] 
            });
            queryClient.removeQueries({
                queryKey:['activities'] 
            });
            navigate('/')
        }
    })

    const {data:currentUser, isLoading:loadingUserInfo} = useQuery({
        queryKey:['user'],
        queryFn: async () =>{
            const response = await agent.get<User>('/account/user-info');
            return response.data;

        },
        enabled :!queryClient.getQueryData(['user']) &&
        //(location.pathname!=='/login') && ezt valamiert nem szereti
        (location.pathname!=='/register')
    })
    return {
        loginUser,
        currentUser,
        loadingUserInfo,
        logoutUser,
        registerUser
    }
}