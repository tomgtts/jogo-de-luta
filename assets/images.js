// Aqui você pode carregar imagens se precisar de gráficos ao invés de formas geométricas
export const loadImage = (src) => {
    const img = new Image();
    img.src = src;
    return img;
  };
  