import { useState } from 'react';
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authcontext.jsx";
import { useNavigate } from 'react-router-dom';

const universityOptions = [
  { value: 'Graphic Era University', label: 'Graphic Era University' },
];

export function SignupForm() {
  const { signup } = useAuth();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedUniversity || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      await signup(email, password, selectedUniversity.value);
      navigate("/community");
    } catch (error) {
      alert("Error signing up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  return (
    <Card className="mx-auto my-20 max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@xyz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="university">University</Label>
            <Select
              id="university"
              options={universityOptions}
              value={selectedUniversity}
              onChange={setSelectedUniversity}
              placeholder="Select your university"
              isSearchable
            />
          </div>
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
