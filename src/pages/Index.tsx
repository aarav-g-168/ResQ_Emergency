import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Car, AlertTriangle, Clock, MapPin } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType: 'driver' | 'police') => {
    navigate(`/login/${userType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Emergency Response System</h1>
                <p className="text-sm text-muted-foreground">Real-time Coordination Platform</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <div className="w-2 h-2 bg-success rounded-full mr-2" />
              System Online
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Choose Your Role
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access the emergency response system with role-based dashboards for drivers and police officers.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Driver Card */}
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20 group"
              onClick={() => handleUserTypeSelection('driver')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Car className="h-8 w-8 text-warning group-hover:text-primary transition-colors" />
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                    DRIVER
                  </Badge>
                </div>
                <CardTitle className="text-xl">Emergency Driver</CardTitle>
                <CardDescription className="text-sm">
                  Access driver portal for emergency response coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Real-time GPS tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span>Emergency call management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Status reporting</span>
                  </div>
                </div>
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  Access Driver Portal
                </Button>
              </CardContent>
            </Card>

            {/* Police Card */}
            <Card 
              className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/20 group"
              onClick={() => handleUserTypeSelection('police')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Shield className="h-8 w-8 text-primary group-hover:text-primary transition-colors" />
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    POLICE
                  </Badge>
                </div>
                <CardTitle className="text-xl">Police Command</CardTitle>
                <CardDescription className="text-sm">
                  Access command center for incident coordination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Unit dispatch & tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span>Incident management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Real-time coordination</span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  variant="default"
                >
                  Access Command Center
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Status Section */}
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">System Availability</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">12</div>
                <div className="text-sm text-muted-foreground">Active Units</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">3</div>
                <div className="text-sm text-muted-foreground">Current Incidents</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
