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
import { useGetSessionQuery } from "../../../store/api/auth/authApi";
import { profileUpdateSchema, type ProfileUpdateFormData } from "./profile.schema";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - MERN Template" },
    { name: "description", content: "Manage your profile" },
  ];
}

export default function Profile() {
  const { data: session, refetch } = useGetSessionQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Reset form when session data loads
  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session?.user, reset]);

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      setUpdateError("");
      setUpdateSuccess(false);

      // Here you would typically call an update profile API endpoint
      // For now, we'll simulate success since the auth API doesn't include profile updates
      console.log("Profile update data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUpdateSuccess(true);
      setIsEditing(false);

      // Refetch session to get updated data
      refetch();

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error: any) {
      console.error("Profile update failed:", error);
      setUpdateError(
        error?.data?.message ||
          error?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleCancel = () => {
    reset({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    });
    setIsEditing(false);
    setUpdateError("");
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and account information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {updateSuccess && (
              <div className="mb-4 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                Profile updated successfully!
              </div>
            )}

            {updateError && (
              <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {updateError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  disabled={!isEditing}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={!isEditing}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button type="submit" disabled={!isDirty}>
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCancel}>
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
              <p className="text-sm text-muted-foreground font-mono">{session.user.id}</p>
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
    </div>
  );
}
