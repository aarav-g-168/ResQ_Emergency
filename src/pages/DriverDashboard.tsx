import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Car,
  MapPin,
  Clock, 
  Navigation, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  Settings,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
  const [currentStatus, setCurrentStatus] = useState<'available' | 'en-route' | 'on-scene' | 'returning'>('available');
  const [activeCall, setActiveCall] = useState(null);
  const navigate = useNavigate();

  const handleStatusChange = (status: typeof currentStatus) => {
    setCurrentStatus(status);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/');
  };

  const statusConfig = {
    available: { color: 'bg-success', text: 'Available', icon: CheckCircle },
    'en-route': { color: 'bg-warning', text: 'En Route', icon: Navigation },
    'on-scene': { color: 'bg-emergency', text: 'On Scene', icon: AlertTriangle },
    'returning': { color: 'bg-primary', text: 'Returning', icon: Car }
  };

  const mockEmergency = {
    id: 'EMG-2024-001',
    type: 'Medical Emergency',
    priority: 'High',
    location: '123 Main Street, Downtown',
    distance: '2.3 km',
    eta: '4 mins',
    caller: 'Anonymous',
    description: 'Chest pain, conscious and breathing'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="h-6 w-6 text-primary" />
            <div>
              <h1 className="font-semibold">Driver Dashboard</h1>
              <p className="text-sm text-muted-foreground">Unit: AMB-001</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/map')}>
              <MapPin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${statusConfig[currentStatus].color}`} />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Badge 
                variant="secondary" 
                className={`${statusConfig[currentStatus].color} text-white`}
              >
                {statusConfig[currentStatus].text}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={currentStatus === 'available' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange('available')}
                className="h-9"
              >
                Available
              </Button>
              <Button
                variant={currentStatus === 'en-route' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange('en-route')}
                className="h-9"
              >
                En Route
              </Button>
              <Button
                variant={currentStatus === 'on-scene' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange('on-scene')}
                className="h-9"
              >
                On Scene
              </Button>
              <Button
                variant={currentStatus === 'returning' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleStatusChange('returning')}
                className="h-9"
              >
                Returning
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Emergency Call */}
        <Card className="border-emergency/20 bg-emergency/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emergency">
              <AlertTriangle className="h-5 w-5" />
              Active Emergency Call
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{mockEmergency.type}</p>
                <p className="text-sm text-muted-foreground">Call ID: {mockEmergency.id}</p>
              </div>
              <Badge variant="destructive">{mockEmergency.priority} Priority</Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{mockEmergency.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{mockEmergency.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ETA: {mockEmergency.eta}</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-3 rounded-lg">
              <p className="text-sm font-medium mb-1">Details:</p>
              <p className="text-sm text-muted-foreground">{mockEmergency.description}</p>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => navigate('/map')}>
                <Navigation className="h-4 w-4 mr-2" />
                Navigate
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Dispatch
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <Phone className="h-4 w-4" />
                <span className="text-xs">Emergency</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-xs">Location</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">Report Issue</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <Settings className="h-4 w-4" />
                <span className="text-xs">Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverDashboard;