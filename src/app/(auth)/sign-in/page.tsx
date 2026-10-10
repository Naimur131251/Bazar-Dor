"use client";

import { authClient, signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function Basic() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;

    try {
      setIsLoading(true);

      const { data, error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি!");
        return;
      }

      console.log("Signin successful:", data);
      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Signin failed:", error);
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error("Google দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
      toast.error("GitHub দিয়ে সাইন ইন করা যায়নি!");
    }
  };

  return (
    <Form
      className="flex w-100 flex-col mx-auto my-10 space-y-6"
      onSubmit={onSubmit}
    >
      <div className="text-center mx-auto">
        <h2 className="font-extrabold text-2xl">সাইন ইন</h2>
        <p className="text-sm text-neutral-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl space-y-4">
        <TextField isRequired name="email" type="email">
          <Label>ইমেইল</Label>
          <Input
            className="border border-gray-200 rounded-lg"
            placeholder="you@example.com"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড</Label>
          <Input
            className="border border-gray-200 rounded-lg"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button
            type="submit"
            isDisabled={isLoading}
            className="button button--md button--primary bg-primary w-full rounded-lg"
          >
            {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </Button>
        </div>

        <div className="flex justify-center items-center gap-3 text-[12px]">
          <hr className="w-40 h-0.5 bg-gray-300 border-0" />
          অথবা
          <hr className="w-40 h-0.5 bg-gray-300 border-0" />
        </div>

        <div className="flex justify-between text-[12px] font-bold gap-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1 cursor-pointer"
          >
            <FcGoogle className="-mt-0.5" />
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-1 cursor-pointer"
          >
            <FaGithub className="-mt-0.5" />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <div className="text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="text-red-600">
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      <Link href="/" className="text-center text-neutral-500 mb-5">
        ← হোম পেজে ফিরে যান
      </Link>
    </Form>
  );
}
