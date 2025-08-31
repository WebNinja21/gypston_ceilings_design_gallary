import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Home } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { CustomerForm as CustomerFormType } from '../types';

interface CustomerFormProps {
  onSubmit: (formData: CustomerFormType) => void;
  loading?: boolean;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<CustomerFormType>({
    name: '',
    mobile: '',
    email: '',
    address: '',
    rooms: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const isValid = formData.name && formData.mobile && formData.email && formData.address;
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm">
      <h2 className="mb-6">Contact Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              type="tel"
              name="mobile"
              placeholder="Mobile Number *"
              value={formData.mobile}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
        
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Textarea
            name="address"
            placeholder="Complete Address *"
            value={formData.address}
            onChange={handleChange}
            className="pl-10 min-h-[80px]"
            required
          />
        </div>
        
        <div className="relative">
          <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            name="rooms"
            placeholder="Rooms/Area Details (optional)"
            value={formData.rooms}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
        
        <Button
          type="submit"
          disabled={!isValid || loading}
          className="w-full"
        >
          {loading ? 'Sending to WhatsApp...' : 'Send Inquiry to WhatsApp'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          * Required fields
        </p>
      </form>
    </div>
  );
};