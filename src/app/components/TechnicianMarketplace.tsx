import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Award, Clock, CheckCircle, Filter, Zap, Shield, ThumbsUp } from 'lucide-react';

interface TechnicianMarketplaceProps {
  category: string;
  onSelectTechnician: (technician: any) => void;
  onBookNow: (technician: any) => void;
  onBack: () => void;
}

const technicians = [
  {
    id: 1,
    name: 'Juan Carlos Santos',
    photo: '👨‍🔧',
    rating: 4.9,
    reviewCount: 342,
    yearsExperience: 8,
    certifications: ['TESDA Certified', 'Samsung Authorized', 'Master Technician'],
    availability: 'Available Today',
    sameDayService: true,
    serviceArea: 'Quezon City, Makati, Manila',
    startingFee: 599,
    completedJobs: 856,
    specializations: ['Air Conditioner', 'Refrigerator'],
    verified: true,
    responseTime: '15 min avg',
  },
  {
    id: 2,
    name: 'Maria Elena Cruz',
    photo: '👩‍🔧',
    rating: 4.8,
    reviewCount: 256,
    yearsExperience: 6,
    certifications: ['TESDA Certified', 'LG Authorized'],
    availability: 'Available Tomorrow',
    sameDayService: false,
    serviceArea: 'Pasig, San Juan, Mandaluyong',
    startingFee: 549,
    completedJobs: 624,
    specializations: ['Washing Machine', 'Dryer'],
    verified: true,
    responseTime: '20 min avg',
  },
  {
    id: 3,
    name: 'Roberto Dela Cruz',
    photo: '👨‍🔧',
    rating: 4.7,
    reviewCount: 198,
    yearsExperience: 10,
    certifications: ['TESDA Certified', 'Master Technician', 'Refrigeration Specialist'],
    availability: 'Available Today',
    sameDayService: true,
    serviceArea: 'Taguig, Paranaque, Las Pinas',
    startingFee: 699,
    completedJobs: 1024,
    specializations: ['All Major Appliances'],
    verified: true,
    responseTime: '10 min avg',
  },
  {
    id: 4,
    name: 'Angelo Reyes',
    photo: '👨‍🔧',
    rating: 4.9,
    reviewCount: 412,
    yearsExperience: 7,
    certifications: ['TESDA Certified', 'Panasonic Authorized'],
    availability: 'Available Today',
    sameDayService: true,
    serviceArea: 'Caloocan, Malabon, Valenzuela',
    startingFee: 579,
    completedJobs: 732,
    specializations: ['Air Conditioner', 'Electric Fan'],
    verified: true,
    responseTime: '18 min avg',
  },
  {
    id: 5,
    name: 'Sofia Gonzales',
    photo: '👩‍🔧',
    rating: 4.8,
    reviewCount: 289,
    yearsExperience: 5,
    certifications: ['TESDA Certified', 'Kitchen Appliance Specialist'],
    availability: 'Available This Week',
    sameDayService: false,
    serviceArea: 'Pasay, Muntinlupa, Taguig',
    startingFee: 499,
    completedJobs: 445,
    specializations: ['Microwave', 'Oven', 'Rice Cooker'],
    verified: true,
    responseTime: '25 min avg',
  },
  {
    id: 6,
    name: 'Carlos Villanueva',
    photo: '👨‍🔧',
    rating: 4.6,
    reviewCount: 167,
    yearsExperience: 4,
    certifications: ['TESDA Certified'],
    availability: 'Available Tomorrow',
    sameDayService: false,
    serviceArea: 'Marikina, Antipolo, Cainta',
    startingFee: 529,
    completedJobs: 312,
    specializations: ['Refrigerator', 'Freezer'],
    verified: false,
    responseTime: '30 min avg',
  },
];

export default function TechnicianMarketplace({ category, onSelectTechnician, onBookNow, onBack }: TechnicianMarketplaceProps) {
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<'all' | 'today' | 'tomorrow'>('all');

  const filteredTechnicians = technicians.filter(tech => {
    if (selectedAvailability === 'today') return tech.availability === 'Available Today';
    if (selectedAvailability === 'tomorrow') return tech.availability === 'Available Tomorrow';
    return true;
  });

  const sortedTechnicians = [...filteredTechnicians].sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'price-low': return a.startingFee - b.startingFee;
      case 'price-high': return b.startingFee - a.startingFee;
      case 'experience': return b.yearsExperience - a.yearsExperience;
      case 'jobs': return b.completedJobs - a.completedJobs;
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#6B7280] hover:text-[#1E2F4F] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Services</span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {category} Technicians
              </h1>
              <p className="text-lg text-[#6B7280]" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {sortedTechnicians.length} certified technicians available in Metro Manila
              </p>
            </div>

            {/* Quick Availability Filter Pills */}
            <div className="flex gap-2">
              {[
                { value: 'all' as const, label: 'All' },
                { value: 'today' as const, label: 'Today', icon: Zap },
                { value: 'tomorrow' as const, label: 'Tomorrow' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedAvailability(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                    selectedAvailability === option.value
                      ? 'bg-[#1E2F4F] text-white shadow-md'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#1E2F4F]'
                  }`}
                >
                  {option.icon && <option.icon className="w-4 h-4" />}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Filters and Sort Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Verified Only</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>{technicians.filter(t => t.sameDayService).length} Same-Day Available</span>
              </div>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E2F4F] bg-white cursor-pointer font-medium"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Lowest Price</option>
              <option value="price-high">Highest Price</option>
              <option value="experience">Most Experienced</option>
              <option value="jobs">Most Jobs Completed</option>
            </select>
          </div>
        </div>

        {/* Enhanced Technician Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start space-x-5 mb-5">
                  {/* Larger Profile Photo */}
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                    {tech.photo}
                    {tech.verified && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Name, Rating, and Badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {tech.name}
                        </h3>
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          {tech.sameDayService && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>Same Day</span>
                            </span>
                          )}
                          {tech.verified && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold flex items-center space-x-1">
                              <Shield className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Rating Display */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(tech.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{tech.rating}</span>
                      <span className="text-sm text-[#6B7280]">({tech.reviewCount} reviews)</span>
                    </div>

                    {/* Experience Badge */}
                    <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                      <Award className="w-4 h-4" />
                      <span className="font-medium">{tech.yearsExperience} years experience • {tech.completedJobs} jobs</span>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {tech.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold border border-green-200"
                    >
                      ✓ {cert}
                    </span>
                  ))}
                </div>

                {/* Specializations */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.specializations.map((spec, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info Grid with Icons */}
                <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-200">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">Service Area</p>
                      <p className="text-sm text-gray-900 font-medium">{tech.serviceArea}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Clock className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">Availability</p>
                      <p className="text-sm text-green-600 font-semibold">{tech.availability}</p>
                      <p className="text-xs text-[#6B7280]">Responds in {tech.responseTime}</p>
                    </div>
                  </div>
                </div>

                {/* Pricing and CTAs */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-[#6B7280] mb-1">Starting Fee</p>
                    <p className="text-3xl font-bold text-[#1E2F4F]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      ₱{tech.startingFee}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onSelectTechnician(tech)}
                      className="px-5 py-3 rounded-lg border-2 border-[#1E2F4F] text-[#1E2F4F] hover:bg-[#1E2F4F] hover:text-white font-semibold transition-all"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onBookNow(tech)}
                      className="px-5 py-3 rounded-lg bg-[#1E2F4F] text-white hover:bg-[#2a4066] font-semibold transition-all shadow-md hover:shadow-lg"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
