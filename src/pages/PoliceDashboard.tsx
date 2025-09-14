import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  MapPin, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Radio,
  Settings,
  LogOut,
  Car,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PoliceDashboard = () => {
  const [activeIncidents, setActiveIncidents] = useState(3);
  const [unitsOnDuty, setUnitsOnDuty] = useState(8);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/');
  };

  const mockIncidents = [
    {
      id: 'INC-001',
      type: 'Traffic Accident',
      priority: 'High',
      location: '5th Avenue & Main St',
      time: '14:32',
      status: 'In Progress',
      assignedUnit: 'UNIT-04'
    },
    {
      id: 'INC-002',
      type: 'Theft Report',
      priority: 'Medium',
      location: 'Shopping Mall',
      time: '13:45',
      status: 'Pending',
      assignedUnit: 'Unassigned'
    },
    {
      id: 'INC-003',
      type: 'Domestic Dispute',
      priority: 'High',
      location: 'Residential Area',
      time: '12:20',
      status: 'Resolved',
      assignedUnit: 'UNIT-02'
    }
  ];

  const mockUnits = [
    { id: 'UNIT-01', status: 'Available', location: 'Station A', officer: 'Officer Smith' },
    { id: 'UNIT-02', status: 'On Call', location: 'Downtown', officer: 'Officer Johnson' },
    { id: 'UNIT-03', status: 'Available', location: 'Highway Patrol', officer: 'Officer Davis' },
    { id: 'UNIT-04', status: 'En Route', location: '5th Avenue', officer: 'Officer Wilson' }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-success';
      case 'on call': case 'en route': return 'bg-warning';
      case 'off duty': return 'bg-muted';
      default: return 'bg-primary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-emergency text-emergency-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h1 className="font-semibold">Police Command Center</h1>
              <p className="text-sm text-muted-foreground">Central Dispatch</p>
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
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-emergency/10 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-emergency" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeIncidents}</p>
                  <p className="text-sm text-muted-foreground">Active Incidents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{unitsOnDuty}</p>
                  <p className="text-sm text-muted-foreground">Units on Duty</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Incidents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockIncidents.map((incident, index) => (
              <div key={incident.id} className="p-3 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{incident.type}</span>
                    <Badge className={getPriorityColor(incident.priority)}>
                      {incident.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {incident.time}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span>{incident.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Assigned: <span className="font-medium">{incident.assignedUnit}</span>
                  </span>
                  <Badge variant="outline">{incident.status}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Unit Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Unit Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockUnits.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(unit.status)}`} />
                  <div>
                    <p className="font-medium">{unit.id}</p>
                    <p className="text-sm text-muted-foreground">{unit.officer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{unit.status}</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{unit.location}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Command Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="h-12 flex flex-col gap-1 bg-emergency hover:bg-emergency/90">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">New Incident</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <Radio className="h-4 w-4" />
                <span className="text-xs">Dispatch</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-xs">View Map</span>
              </Button>
              <Button variant="outline" className="h-12 flex flex-col gap-1">
                <Phone className="h-4 w-4" />
                <span className="text-xs">Emergency</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PoliceDashboard;