export interface GalleryItem {
  id: string;
  uniqueId: string; // GYP01GB189 format
  title: string;
  ceilingType: 'Gypsum Ceilings' | 'POP Ceilings' | 'PVC Ceilings' | 'Grid Ceilings';
  roomCategory: 'Bedroom' | 'Living Room' | 'Hall' | 'Kitchen';
  imageUrl: string;

}

export interface CartItem extends GalleryItem {
  quantity: number;
}

export interface CustomerForm {
  name: string;
  mobile: string;
  email: string;
  address: string;
  rooms: string;
}