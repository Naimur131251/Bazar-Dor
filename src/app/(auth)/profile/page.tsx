"use client";

import { authClient } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiCornerDownLeft } from "react-icons/fi";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = useSession();

  const [inputName, setInputName] = useState("");
  const [inputAvatar, setInputAvatar] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const user = session?.user;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputName.trim() && !inputAvatar.trim()) {
      toast.error("আপডেট করার জন্য নাম অথবা ছবির URL দিন।");
      return;
    }

    const updates: {
      name?: string;
      image?: string;
    } = {};

    if (inputName.trim()) {
      updates.name = inputName.trim();
    }

    if (inputAvatar.trim()) {
      try {
        const imageUrl = new URL(inputAvatar.trim());

        if (imageUrl.protocol !== "https:" && imageUrl.protocol !== "http:") {
          toast.error("সঠিক ছবির URL দিন।");
          return;
        }

        updates.image = imageUrl.toString();
      } catch {
        toast.error("সঠিক ছবির URL দিন।");
        return;
      }
    }

    setIsUpdating(true);

    try {
      const result = await authClient.updateUser(updates);

      if (result.error) {
        toast.error(result.error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      await authClient.getSession();

      setInputName("");
      setInputAvatar("");

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("আপডেট করার সময় সমস্যা হয়েছে।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const avatarUrl = user.image;

  return (
    <div className="mx-auto mt-10 w-full max-w-175 space-y-6 p-5">
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-[#111111]">
          আমার প্রোফাইল
        </h1>

        <p className="text-sm text-[#666666]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile card */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#eaeaea] bg-white p-6 shadow-sm">
        <div className="flex min-w-0 items-center gap-4">
          {avatarUrl ? (
            <Image
              className="h-18 w-18 shrink-0 rounded-xl bg-gray-200 object-cover"
              src={avatarUrl}
              alt={user.name || "Profile"}
              width={72}
              height={72}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ed] text-2xl font-bold text-[#058240]">
              {user.name?.trim().charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="wrap-break-word text-lg font-semibold text-[#111111]">
              {user.name || "ব্যবহারকারী"}
            </h2>

            <p className="break-all text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="inline-flex items-center gap-2 rounded-lg border border-[#dc3545] px-4 py-2 text-sm font-medium text-[#dc3545] transition hover:bg-[#fff5f5] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiCornerDownLeft />
          {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
        </button>{" "}
      </div>

      {/* Profile update form */}
      <div className="rounded-xl border border-[#eaeaea] bg-white px-5 py-6 shadow-sm sm:px-8">
        <h3 className="mb-5 text-base font-semibold text-[#111111]">
          তথ্য আপডেট করুন
        </h3>

        <form onSubmit={handleUpdate}>
          {/* Name */}
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              type="text"
              id="userName"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#e2e8f0] bg-[#fcfcfc] px-4 text-base outline-none transition focus:border-[#058240] focus:bg-white"
              placeholder={user.name || "আপনার নাম লিখুন"}
              autoComplete="name"
              maxLength={100}
            />
          </div>

          {/* Avatar URL */}
          <div className="mb-5">
            <label
              htmlFor="userAvatar"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              প্রোফাইল ছবির URL
            </label>

            <input
              type="url"
              id="userAvatar"
              value={inputAvatar}
              onChange={(e) => setInputAvatar(e.target.value)}
              className="h-12 w-full rounded-lg border border-[#e2e8f0] bg-[#fcfcfc] px-4 text-base outline-none transition focus:border-[#058240] focus:bg-white"
              placeholder={avatarUrl || "https://example.com/photo.jpg"}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isUpdating}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-[#058240] text-base font-medium text-white shadow-sm transition hover:bg-[#046c35] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
