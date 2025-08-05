import type { Route } from "./+types/profile";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../shared/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../shared/shadcn/components/ui/card";
import { Input } from "../../../shared/shadcn/components/ui/input";
import { Label } from "../../../shared/shadcn/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../shared/shadcn/components/ui/tabs";
import {
  useGetSessionQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} from "../../../store/api/auth/authApi";
import {
  accountUpdateSchema,
  passwordChangeSchema,
  type AccountUpdateFormData,
  type PasswordChangeFormData,
} from "./profile.schema";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - MERN Template" },
    { name: "description", content: "Manage your profile" },
  ];
}

export default function Profile() {
  const { data: session, refetch } = useGetSessionQuery();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();

  // Account update form
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountUpdateSuccess, setAccountUpdateSuccess] = useState(false);
  const [accountUpdateError, setAccountUpdateError] = useState<string>("");

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    reset: resetAccount,
    formState: { errors: accountErrors, isDirty: isAccountDirty },
  } = useForm<AccountUpdateFormData>({
    resolver: zodResolver(accountUpdateSchema),
    defaultValues: {
      name: "",
    },
  });

  // Password change form
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState<string>("");

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isDirty: isPasswordDirty },
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Reset account form when session data loads
  useEffect(() => {
    if (session?.user) {
      resetAccount({
        name: session.user.name,
      });
    }
  }, [session?.user, resetAccount]);

  const onAccountSubmit = async (data: AccountUpdateFormData) => {
    try {
      setAccountUpdateError("");
      setAccountUpdateSuccess(false);

      await updateUser(data).unwrap();

      setAccountUpdateSuccess(true);
      setIsEditingAccount(false);

      // Refetch session to get updated data
      refetch();

      // Clear success message after 3 seconds
      setTimeout(() => setAccountUpdateSuccess(false), 3000);
    } catch (error: any) {
      console.error("Account update failed:", error);
      setAccountUpdateError(
        error?.data?.message ||
          error?.message ||
          "Failed to update account. Please try again."
      );
    }
  };

  const onPasswordSubmit = async (data: PasswordChangeFormData) => {
    try {
      setPasswordChangeError("");
      setPasswordChangeSuccess(false);

      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      setPasswordChangeSuccess(true);
      resetPassword();

      // Clear success message after 3 seconds
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
    } catch (error: any) {
      console.error("Password change failed:", error);
      setPasswordChangeError(
        error?.data?.message ||
          error?.message ||
          "Failed to change password. Please try again."
      );
    }
  };

  const handleAccountCancel = () => {
    resetAccount({
      name: session?.user?.name || "",
    });
    setIsEditingAccount(false);
    setAccountUpdateError("");
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and personal information.
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Account Form */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and account information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {accountUpdateSuccess && (
                  <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                    Account updated successfully!
                  </div>
                )}

                {accountUpdateError && (
                  <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    {accountUpdateError}
                  </div>
                )}

                <form
                  onSubmit={handleAccountSubmit(onAccountSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      {...registerAccount("name")}
                      disabled={!isEditingAccount}
                      aria-invalid={!!accountErrors.name}
                    />
                    {accountErrors.name && (
                      <p className="text-sm text-destructive">
                        {accountErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {!isEditingAccount ? (
                      <Button type="button" onClick={() => setIsEditingAccount(true)}>
                        Edit Account
                      </Button>
                    ) : (
                      <>
                        <Button type="submit" disabled={!isAccountDirty}>
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAccountCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Read-only account details and status.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">User ID</Label>
                  <p className="text-sm text-muted-foreground font-mono">
                    {session.user.id}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Email Address</Label>
                  <p className="text-sm text-muted-foreground">{session.user.email}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Email Verification Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {session.user.emailVerified ? (
                      <span className="text-green-600">✅ Verified</span>
                    ) : (
                      <span className="text-orange-600">❌ Not verified</span>
                    )}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Account Created</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(session.user.createdAt)}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Last Updated</Label>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(session.user.updatedAt)}
                  </p>
                </div>

                {session.user.image && (
                  <div>
                    <Label className="text-sm font-medium">Profile Image</Label>
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mt-2"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="password" className="space-y-6">
          <Card className="max-w-2xl">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {passwordChangeSuccess && (
                <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                  Password changed successfully!
                </div>
              )}

              {passwordChangeError && (
                <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {passwordChangeError}
                </div>
              )}

              <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...registerPassword("currentPassword")}
                    aria-invalid={!!passwordErrors.currentPassword}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-destructive">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...registerPassword("newPassword")}
                    aria-invalid={!!passwordErrors.newPassword}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-sm text-destructive">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...registerPassword("confirmPassword")}
                    aria-invalid={!!passwordErrors.confirmPassword}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={!isPasswordDirty}>
                    Change Password
                  </Button>
                  <Button type="button" variant="outline" onClick={() => resetPassword()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
