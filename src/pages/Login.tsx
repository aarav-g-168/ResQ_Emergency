import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Car, Lock } from 'lucide-react';

interface LoginProps {
  userType: 'driver' | 'police';
}

const Login = ({ userType }: LoginProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (credentials.username && credentials.password) {
      localStorage.setItem('userType', userType);
      navigate(userType === 'driver' ? '/driver-dashboard' : '/police-dashboard');
    }
  };

  const isDriver = userType === 'driver';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            {isDriver ? (
              <Car className="h-12 w-12 text-primary" />
            ) : (
              <ShieldCheck className="h-12 w-12 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-bold">Emergency Response</h1>
          <p className="text-muted-foreground">
            {isDriver ? 'Driver Portal' : 'Police Command Center'}
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">Sign In</CardTitle>
              <Badge 
                variant={isDriver ? 'secondary' : 'default'} 
                className={isDriver ? 'bg-warning text-warning-foreground' : 'bg-primary text-primary-foreground'}
              >
                {isDriver ? 'DRIVER' : 'OFFICER'}
              </Badge>
            </div>
            <CardDescription>
              Enter your credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="h-11"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-11 font-semibold"
                variant={isDriver ? 'secondary' : 'default'}
              >
                <Lock className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </form>
            
            <div className="mt-4 pt-4 border-t">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="w-full text-sm"
              >
                ← Back to Selection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground text-center">
              Demo: Use any username and password to sign in
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;