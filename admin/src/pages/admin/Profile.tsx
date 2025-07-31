import { useState, useRef, ChangeEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Camera, Check, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, updateProfile, changePassword, uploadProfilePicture, loading } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Form errors
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle profile form input changes
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (profileErrors[name]) {
      setProfileErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle password form input changes
  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (passwordErrors[name]) {
      setPasswordErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate profile form
  const validateProfileForm = () => {
    const errors: Record<string, string> = {};
    if (!profileData.username.trim()) errors.username = 'Username is required';
    if (!profileData.email.trim()) errors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(profileData.email)) errors.email = 'Invalid email format';
    if (!profileData.first_name.trim()) errors.first_name = 'First name is required';
    if (!profileData.last_name.trim()) errors.last_name = 'Last name is required';
    return errors;
  };

  // Validate password form
  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) errors.newPassword = 'New password is required';
    if (passwordData.newPassword.length < 8) errors.newPassword = 'Password must be at least 8 characters';
    if (!passwordData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    const errors = validateProfileForm();
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    try {
      await updateProfile(profileData);
      setSuccessMessage('Profile updated successfully');
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been updated successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  // Handle password change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSuccessMessage('Password changed successfully');
      toast({
        title: 'Password Changed',
        description: 'Your password has been changed successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Password change error:', error);
    }
  };

  // Handle profile picture upload
  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadProfilePicture(file);
      toast({
        title: 'Profile Picture Updated',
        description: 'Your profile picture has been updated successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Profile picture upload error:', error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return 'U';
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user?.profile_picture ? `http://127.0.0.1:8000${user.profile_picture}` : undefined} />
                <AvatarFallback className="text-2xl">{getUserInitials()}</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full" 
                onClick={handleProfilePictureClick}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/jpeg,image/png,image/gif" 
                onChange={handleFileChange} 
              />
            </div>
            <p className="text-sm text-muted-foreground">Click the camera icon to upload a new picture</p>
          </CardContent>
        </Card>

        {/* Profile Settings Tabs */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              {successMessage && (
                <Alert className="mt-4">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="profile" className="space-y-4 mt-4">
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        name="username" 
                        value={profileData.username} 
                        onChange={handleProfileChange} 
                      />
                      {profileErrors.username && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {profileErrors.username}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profileData.email} 
                        onChange={handleProfileChange} 
                      />
                      {profileErrors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {profileErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input 
                        id="first_name" 
                        name="first_name" 
                        value={profileData.first_name} 
                        onChange={handleProfileChange} 
                      />
                      {profileErrors.first_name && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {profileErrors.first_name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input 
                        id="last_name" 
                        name="last_name" 
                        value={profileData.last_name} 
                        onChange={handleProfileChange} 
                      />
                      {profileErrors.last_name && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {profileErrors.last_name}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="mt-4" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Profile'
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="password" className="space-y-4 mt-4">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword" 
                        type="password" 
                        value={passwordData.currentPassword} 
                        onChange={handlePasswordInputChange} 
                      />
                      {passwordErrors.currentPassword && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {passwordErrors.currentPassword}
                        </p>
                      )}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword" 
                        type="password" 
                        value={passwordData.newPassword} 
                        onChange={handlePasswordInputChange} 
                      />
                      {passwordErrors.newPassword && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {passwordErrors.newPassword}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={passwordData.confirmPassword} 
                        onChange={handlePasswordInputChange} 
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> {passwordErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="mt-4" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Changing Password...
                      </>
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;