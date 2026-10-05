"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "../types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalSavings: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  sendWhatsAppOrder: (customerInfo: { name: string; phone?: string; deliveryType: string; address?: string }) => void;
  viewedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);

  const openProductDetail = (product: Product) => {
    setViewedProduct(product);
  };

  const closeProductDetail = () => {
    setViewedProduct(null);
  };

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("revendedora_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // Ignora erro no SSR
    }
  }, []);

  // Salvar no localStorage sempre que o carrinho mudar
  useEffect(() => {
    try {
      localStorage.setItem("revendedora_cart", JSON.stringify(cart));
    } catch {
      // Fallback
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = item.product.salePrice ?? item.product.price;
    return acc + itemPrice * item.quantity;
  }, 0);

  const totalSavings = cart.reduce((acc, item) => {
    if (item.product.salePrice && item.product.salePrice < item.product.price) {
      return acc + (item.product.price - item.product.salePrice) * item.quantity;
    }
    return acc;
  }, 0);

  const sendWhatsAppOrder = (customerInfo: {
    name: string;
    phone?: string;
    deliveryType: string;
    address?: string;
  }) => {
    const sellerWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
    
    let message = `✨ *NOVO PEDIDO DE COSMÉTICOS* ✨\n\n`;
    message += `👤 *Cliente:* ${customerInfo.name.trim()}\n`;
    if (customerInfo.phone) {
      message += `📱 *Telefone:* ${customerInfo.phone.trim()}\n`;
    }
    message += `🚚 *Modalidade:* ${customerInfo.deliveryType}\n`;
    if (customerInfo.address) {
      message += `📍 *Endereço:* ${customerInfo.address.trim()}\n`;
    }
    message += `\n📦 *ITENS DO PEDIDO:*\n`;
    message += `-----------------------------\n`;

    cart.forEach((item, index) => {
      const price = item.product.salePrice ?? item.product.price;
      const subtotal = (price * item.quantity).toFixed(2).replace(".", ",");
      message += `${index + 1}. [${item.product.brand.name.toUpperCase()}] *${item.product.title}*\n`;
      message += `   Qtd: ${item.quantity}x | R$ ${price.toFixed(2).replace(".", ",")} = *R$ ${subtotal}*\n`;
      if (item.product.volume) {
        message += `   Tamanho: ${item.product.volume}\n`;
      }
    });

    message += `-----------------------------\n`;
    if (totalSavings > 0) {
      message += `🎉 *Economia total:* R$ ${totalSavings.toFixed(2).replace(".", ",")}\n`;
    }
    message += `💰 *VALOR TOTAL: R$ ${totalPrice.toFixed(2).replace(".", ",")}*\n\n`;
    message += `Por favor, confirme a disponibilidade e o prazo de entrega! Obrigado(a)! ✨`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${sellerWhatsApp.replace(/\D/g, "")}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalSavings,
        isCartOpen,
        setIsCartOpen,
        sendWhatsAppOrder,
        viewedProduct,
        openProductDetail,
        closeProductDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
