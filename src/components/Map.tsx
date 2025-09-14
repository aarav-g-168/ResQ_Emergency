import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Shield, 
  AlertTriangle,
  ArrowLeft,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(!mapboxToken);
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const mockUnits = [
    { id: 'AMB-001', type: 'ambulance', lat: 40.7128, lng: -74.0060, status: 'available' },
    { id: 'AMB-002', type: 'ambulance', lat: 40.7589, lng: -73.9851, status: 'en-route' },
    { id: 'POL-001', type: 'police', lat: 40.7505, lng: -73.9934, status: 'on-scene' },
    { id: 'POL-002', type: 'police', lat: 40.7282, lng: -73.9942, status: 'available' }
  ];

  const mockIncidents = [
    { id: 1, lat: 40.7614, lng: -73.9776, type: 'Medical Emergency', priority: 'High' },
    { id: 2, lat: 40.7505, lng: -73.9934, type: 'Traffic Incident', priority: 'Medium' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'en-route': return 'bg-warning';
      case 'on-scene': return 'bg-emergency';
      default: return 'bg-muted';
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      // Here you would initialize the actual Mapbox map
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h1 className="font-semibold">Live Map</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/10 text-success">
              <div className="w-2 h-2 bg-success rounded-full mr-1" />
              Real-time
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Mapbox Token Input */}
        {showTokenInput && (
          <Card className="border-warning/20 bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Mapbox Configuration Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To display the interactive map, please enter your Mapbox public token. 
                Get yours at <a href="https://mapbox.com/" target="_blank" className="text-primary underline">mapbox.com</a>
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="pk.eyJ1..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Map Container */}
        <Card className="h-[50vh]">
          <CardContent className="p-0">
            <div className="relative w-full h-full bg-muted/20 rounded-lg flex items-center justify-center">
              {showTokenInput ? (
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Configure Mapbox to view interactive map
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="animate-pulse">
                    <MapPin className="h-12 w-12 text-primary mx-auto" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Interactive map will load here with Mapbox token
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Units Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Active Units
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockUnits.map((unit) => (
                <div key={unit.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-3">
                    {unit.type === 'ambulance' ? (
                      <Car className="h-4 w-4 text-warning" />
                    ) : (
                      <Shield className="h-4 w-4 text-primary" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{unit.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {unit.lat.toFixed(4)}, {unit.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(unit.status)} text-white border-0`}
                  >
                    {unit.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockIncidents.map((incident) => (
                <div key={incident.id} className="p-2 border rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{incident.type}</span>
                    <Badge 
                      variant={incident.priority === 'High' ? 'destructive' : 'secondary'}
                    >
                      {incident.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{incident.lat.toFixed(4)}, {incident.lng.toFixed(4)}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    <Navigation className="h-3 w-3 mr-1" />
                    Navigate
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Map Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm">En Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emergency" />
                  <span className="text-sm">On Scene</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-warning" />
                  <span className="text-sm">Ambulance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm">Police Unit</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-emergency" />
                  <span className="text-sm">Emergency</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Map;