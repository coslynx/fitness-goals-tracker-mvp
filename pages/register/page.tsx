"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/api";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw error;
      }

      router.push("/login");
    } catch (error) {
      console.error("Error registering:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(value) => setName(value)}
          isRequired
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
          isRequired
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
          isRequired
        />
        <Button type="submit" label="Register" loading={isLoading} />
      </form>
    </div>
  );
}