"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, SendHorizonal, CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    totalSavings,
    sendWhatsAppOrder,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<"Entrega em Domicílio" | "Retirada Pessoal">("Entrega em Domicílio");
  const [address, setAddress] = useState("");

  const handleSend = () => {
    if (!name.trim()) return;
    sendWhatsAppOrder({ name, phone, deliveryType, address });
    setIsCartOpen(false);
    setStep("cart");
    clearCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md glass-panel border-l border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span className="font-bold text-white">Minha Sacola</span>
                {totalItems > 0 && (
                  <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                    {totalItems} {totalItems === 1 ? "item" : "itens"}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="glass-pill p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              /* Sacola vazia */
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="w-20 h-20 rounded-full glass-pill flex items-center justify-center">
                  <ShoppingBag className="w-9 h-9 text-zinc-500" />
                </div>
                <div>
                  <p className="text-zinc-300 font-semibold mb-1">Sacola vazia</p>
                  <p className="text-zinc-500 text-sm">
                    Adicione produtos do catálogo para montar seu pedido!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="glass-button px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Step Tabs */}
                <div className="flex border-b border-white/10">
                  {(["cart", "checkout"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStep(s)}
                      className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                        step === s
                          ? "text-white border-b-2 border-amber-400"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {s === "cart" ? "1. Sacola" : "2. Finalizar"}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === "cart" ? (
                    <motion.div
                      key="cart-step"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 overflow-y-auto p-4 space-y-3"
                    >
                      {cart.map((item) => {
                        const price = item.product.salePrice ?? item.product.price;
                        return (
                          <motion.div
                            key={item.product._id}
                            layout
                            exit={{ opacity: 0, x: 40, height: 0 }}
                            className="glass-card rounded-xl p-3 flex gap-3"
                          >
                            <div
                              className="w-16 h-16 rounded-lg bg-zinc-800 flex-shrink-0 bg-cover bg-center"
                              style={{
                                backgroundImage: `url(${item.product.images[0]})`,
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-zinc-500 font-medium">
                                {item.product.brand.name}
                              </p>
                              <p className="text-sm font-semibold text-zinc-100 line-clamp-2 leading-snug">
                                {item.product.title}
                              </p>
                              <p className="text-sm font-black text-white mt-1">
                                R${" "}
                                {price.toLocaleString("pt-BR", {
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                            </div>
                            <div className="flex flex-col items-end justify-between gap-2">
                              <button
                                onClick={() => removeFromCart(item.product._id)}
                                className="text-zinc-600 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product._id, item.quantity - 1)
                                  }
                                  className="w-6 h-6 rounded-lg glass-pill flex items-center justify-center text-zinc-300 hover:text-white"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-bold text-white w-5 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product._id, item.quantity + 1)
                                  }
                                  className="w-6 h-6 rounded-lg glass-pill flex items-center justify-center text-zinc-300 hover:text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="checkout-step"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 overflow-y-auto p-4 space-y-4"
                    >
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1 block">
                          Seu Nome *
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Como deseja ser chamado(a)?"
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-base sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1 block">
                          Seu WhatsApp (opcional)
                        </label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-base sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/25 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1 block">
                          Modalidade de Entrega
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(["Entrega em Domicílio", "Retirada Pessoal"] as const).map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setDeliveryType(opt)}
                              className={`py-3 px-3 rounded-xl text-xs font-semibold text-center transition-all border ${
                                deliveryType === opt
                                  ? "bg-amber-500/20 border-amber-500/50 text-amber-200"
                                  : "glass-pill border-white/10 text-zinc-400 hover:text-white"
                              }`}
                            >
                              {opt === "Entrega em Domicílio" ? "🏠 " : "📍 "}
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      {deliveryType === "Entrega em Domicílio" && (
                        <div>
                          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1 block">
                            Endereço de Entrega
                          </label>
                          <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Rua, número, bairro e cidade"
                            rows={2}
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-white/10 text-base sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/25 transition-all resize-none"
                          />
                        </div>
                      )}

                      {/* Resumo */}
                      <div className="glass-pill rounded-xl p-3 space-y-2">
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                          Resumo do Pedido
                        </p>
                        {cart.map((item) => (
                          <div key={item.product._id} className="flex justify-between text-xs text-zinc-300">
                            <span className="line-clamp-1 flex-1 mr-2">
                              {item.quantity}x {item.product.title}
                            </span>
                            <span className="font-semibold whitespace-nowrap">
                              R${" "}
                              {(
                                (item.product.salePrice ?? item.product.price) * item.quantity
                              ).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        ))}
                        {totalSavings > 0 && (
                          <div className="flex justify-between text-xs text-emerald-400 pt-1 border-t border-white/10">
                            <span>🎉 Economia</span>
                            <span>
                              -R${" "}
                              {totalSavings.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer do Drawer */}
                <div className="p-4 border-t border-white/10 space-y-3">
                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Economia total</span>
                      <span className="font-bold text-emerald-400">
                        -R${" "}
                        {totalSavings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300 font-medium">Total</span>
                    <span className="text-2xl font-black text-white">
                      R${" "}
                      {totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {step === "cart" ? (
                    <div className="flex flex-col gap-2">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsCartOpen(false)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-zinc-300 border border-white/10 hover:border-white/25 hover:text-white transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Continuar Comprando
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setStep("checkout")}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:shadow-amber-500/30 transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        Finalizar Pedido
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleSend}
                      disabled={!name.trim()}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <SendHorizonal className="w-4 h-4" />
                      Enviar Pedido pelo WhatsApp
                    </motion.button>
                  )}
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
