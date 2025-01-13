import { MapPin, Phone } from 'lucide-react';
import { locations } from '../data/locations';

export default function Locations() {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Our Locations</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Find Us</h2>
          {locations.map((location) => (
            <div key={location.id} className="mb-6 last:mb-0">
              <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
              <div className="flex items-start gap-2 text-gray-600 mb-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <p>{location.address}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-5 w-5" />
                <p>{location.phone}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-200 rounded-lg h-[400px]">
          {/* Map placeholder - In a real application, integrate with a mapping service */}
          <div className="h-full flex items-center justify-center text-gray-500">
            Map View
          </div>
        </div>
      </div>
    </div>
  );
}