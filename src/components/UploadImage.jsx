import React, { useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // ajusta ruta

export default function UploadImage({ user }) {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Opcional: vista previa antes de subir
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file);

    if (error) {
      alert('Error al subir archivo: ' + error.message);
      return;
    }

    const { publicURL } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    setImageUrl(publicURL);
  };

  return (
      <button className="w-1/2 h-11/12 hover:bg-[rgba(0,0,0,0.5)] rounded-2xl" id="uploadBtn">
        <img 
          className='w-full h-full'
          src={user?.user_photo ?? "/user_image.svg"}
          alt="user image"
          id="image-profile"
        />
        <input className='hidden' type="file" id="fileInput" accept="image/*" />
      </button>
  );
}
