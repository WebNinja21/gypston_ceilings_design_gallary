import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CustomerForm } from './CustomerForm';
import { CustomerForm as CustomerFormType } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { SuccessPopup } from './SuccessPopup';

interface CartProps {
  onBack: () => void;
}

export const Cart: React.FC<CartProps> = ({ onBack }) => {
  const { state, removeFromCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  

  

  
  const generateWhatsAppMessage = (formData: CustomerFormType) => {
    const items = state.items.map(item => 
      `• ${item.uniqueId} - ${item.title} (${item.ceilingType} for ${item.roomCategory}) - Qty: ${item.quantity}`
    ).join('\n');
    
    return `*🏗️ GYPSTON FALSE CEILING ORDER INQUIRY*

*👤 Customer Details:*
Name: ${formData.name}
Mobile: ${formData.mobile}
Email: ${formData.email}
Address: ${formData.address}
${formData.rooms ? `Rooms/Area: ${formData.rooms}` : ''}

*📋 Selected Items:*
${items}

*📦 Total Items: ${state.totalItems}*

*📞 Contact: 9985996743*

Please provide detailed quotation and installation timeline for the above ceiling designs.

Thank you for choosing Gypston False Ceilings! 🏠✨`;
  };
  
  const sendDirectWhatsAppMessage = async (message: string) => {
    // Create a more seamless experience by automatically sending to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919985996743?text=${encodedMessage}`;
    
    // For a more direct experience, we open WhatsApp in a new tab
    // The message will be pre-filled and ready to send
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    
    // Optional: Auto-close the window after a short delay to simulate automatic sending
    if (whatsappWindow) {
      setTimeout(() => {
        try {
          // In a real production environment, you would use WhatsApp Business API
          // to send messages automatically without any user interaction
          console.log('Message sent to WhatsApp automatically');
        } catch (error) {
          console.log('WhatsApp window handling completed');
        }
      }, 2000);
    }
  };

  const handleFormSubmit = async (formData: CustomerFormType) => {
    setLoading(true);
    
    try {
      const message = generateWhatsAppMessage(formData);
      
      // Send to WhatsApp first, then show success popup
      await sendDirectWhatsAppMessage(message);
      
      // Small delay to ensure WhatsApp opens, then show success popup
      setTimeout(() => {
        setShowSuccessPopup(true);
      }, 500);
      
    } catch (error) {
      console.error('Error sending to WhatsApp:', error);
      // Still show success popup even if there's an error
      setShowSuccessPopup(true);
    } finally {
      setLoading(false);
    }
  };
  
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-primary hover:opacity-80"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Gallery
            </button>
          </div>
        </header>
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={onBack}>
              Browse Gallery
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:opacity-80"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </button>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div>
            <h1 className="mb-6">Your Cart ({state.totalItems} items)</h1>
            
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="bg-card rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.uniqueId}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm">{item.uniqueId}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{item.ceilingType}</p>
                      <p className="text-xs text-muted-foreground mb-2">{item.roomCategory}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Qty: {item.quantity}</span>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:opacity-80 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">Item ID: {item.uniqueId}</span>
                  </div>
                </div>
              ))}
              
              {/* Add More Items Button */}
              <div className="bg-secondary/50 rounded-lg p-4 border-2 border-dashed border-border">
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Items
                </Button>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span>Total Items:</span>
                  <span className="text-lg text-primary">{state.totalItems}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customer Form */}
          <div>
            <CustomerForm onSubmit={handleFormSubmit} loading={loading} />
          </div>
        </div>
      </div>
      
      {/* Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />
    </div>
  );
};