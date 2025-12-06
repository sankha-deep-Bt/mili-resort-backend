// // src/pages/LoginPage.tsx
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "../components/ui/card";
// import { Loader2, Mail, Key, Text, Phone } from "lucide-react";

// export default function Login() {
//   const { isAuth, isLoading, error, signUp } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [formError, setFormError] = useState<string | null>(null);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuth) {
//       navigate("/dashboard"); // Redirect path after login
//     }
//   }, [isAuth, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(null);

//     if (!email || !password) {
//       setFormError("Please fill in both email and password.");
//       return;
//     }

//     try {
//       // loginThunk returns a Promise (because it’s async)
//       await signUp(name, email, password, confirmPassword, phoneNumber);
//     } catch (err: any) {
//       setFormError(err?.message || "Login failed. Please try again.");
//       console.log(err.response);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <Card className="w-full max-w-md shadow-lg">
//         <CardHeader className="text-center">
//           <CardTitle>Login</CardTitle>
//           <CardDescription>Create and Account to get started</CardDescription>
//         </CardHeader>

//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             {formError && (
//               <p className="text-sm text-red-500 text-center">{formError}</p>
//             )}
//             {error && (
//               <p className="text-sm text-red-500 text-center">{error}</p>
//             )}

//             <div className="relative">
//               <Text className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="pl-9"
//                 disabled={isLoading}
//                 required
//               />
//             </div>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="pl-9"
//                 disabled={isLoading}
//                 required
//               />
//             </div>

//             <div className="relative">
//               <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="pl-9"
//                 disabled={isLoading}
//                 required
//               />
//             </div>
//             <div className="relative">
//               <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="pl-9"
//                 disabled={isLoading}
//                 required
//               />
//             </div>
//             <div className="relative">
//               <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="phoneNumber"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="pl-9"
//                 disabled={isLoading}
//                 required
//               />
//             </div>
//           </CardContent>

//           <CardFooter className="flex flex-col gap-3">
//             <Button type="submit" disabled={isLoading} className="w-full mt-4">
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Signing up...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//         <p className="text-center text-muted-foreground">
//           Already have an account?{" "}
//           <Link className="hover:underline" to="/login">
//             Login
//           </Link>
//         </p>
//       </Card>
//     </div>
//   );
// }

// src/pages/LoginPage.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Loader2, Mail, Key, Text, Phone, Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const { isAuth, isLoading, error, signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // 👁️ Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError("Please fill in both email and password.");
      return;
    }

    try {
      await signUp(name, email, password, confirmPassword, phoneNumber);
    } catch (err: any) {
      setFormError(err?.message || "Signup failed. Please try again.");
      console.log(err.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create an Account to get started</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {formError && (
              <p className="text-sm text-red-500 text-center">{formError}</p>
            )}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* Name */}
            <div className="relative">
              <Text className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9"
                disabled={isLoading}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9"
                disabled={isLoading}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-10"
                disabled={isLoading}
                required
              />

              {/* 👁️ Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9 pr-10"
                disabled={isLoading}
                required
              />

              {/* 👁️ Toggle button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-9"
                disabled={isLoading}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" disabled={isLoading} className="w-full mt-4">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </CardFooter>
        </form>

        <p className="text-center text-muted-foreground">
          Already have an account?{" "}
          <Link className="hover:underline" to="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
