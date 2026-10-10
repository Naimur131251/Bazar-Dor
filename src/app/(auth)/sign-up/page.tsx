"use client";
import { authClient, signUp } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Basic() {
  const [passwordValue, setPasswordValue] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিলেনি!");
      return;
    }

    const { data: resData, error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    console.log({
      name,
      email,
      password,
    });

    if (error) {
      console.error("Signup failed:", error);
      alert(error.message);
      return;
    }

    console.log("Signup successful:", resData);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <Form
      className="flex w-100 flex-col mx-auto my-10 space-y-6"
      onSubmit={onSubmit}
    >
      <Fieldset.Legend className="text-center mx-auto">
        <h2 className="font-extrabold text-2xl">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-sm text-neutral-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </Fieldset.Legend>

      <div className="bg-white p-6 rounded-2xl space-y-4">
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label>নাম</Label>
          <Input
            className={`border border-gray-200 rounded-lg`}
            placeholder="যেমন: রহিম উদ্দিন"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          // validate={(value) => {
          //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\$/i.test(value)) {
          //     return "Please enter a valid email address";
          //   }
          //   return null;
          // }}
        >
          <Label>ইমেইল</Label>
          <Input
            className={`border border-gray-200 rounded-lg`}
            placeholder="you@example.com"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          onChange={(value) => setPasswordValue(value)}
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
            className={`border border-gray-200 rounded-lg`}
            placeholder="কমপক্ষে ৮ অক্ষর"
          />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="confirmPassword"
          type="password"
          validate={(value) => {
            if (value !== passwordValue) {
              return "Passwords do not match";
            }
            return null;
          }}
        >
          <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
          <Input
            className={`border border-gray-200 rounded-lg`}
            placeholder="আবার লিখুন"
          />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button
            type="submit"
            className="button button--md button--primary bg-[#05893E] w-full rounded-lg"
          >
            অ্যাকাউন্ট তৈরি করুন
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
          অ্যাকাউন্ট আছে?{" "}
          <Link href="\sign-in" className="text-red-600">
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      <Link href="\" className="text-center text-neutral-500 mb-5">
        ← হোম পেজে ফিরে যান
      </Link>
    </Form>
  );
}
