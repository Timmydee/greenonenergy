import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'

const LogoutButton = ({isCollapsed}: {isCollapsed: boolean}) => {
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axios.post("/api/auth/logout", {}, {withCredentials: true})
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.push('/auth/login');
    },
    onError: () => {
      toast.error("Error Logging out")
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  
  return (
    <div>
        <Button
                variant="destructive"
                className="w-full flex items-center gap-2 mt-6"
                onClick={handleLogout}
            >
                {/* <LogOut className="w-5 h-5" /> Logout */}
                <LogOut className="w-5 h-5" /> {!isCollapsed && 'Logout'}
            </Button>
    </div>
  )
}

export default LogoutButton