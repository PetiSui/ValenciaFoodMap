"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { set } from "mongoose";

export default function ContactForm() {
  let isMensajeEnviado = false;
  return (
    <div className="w-[90%] md:w-full max-w-2xl space-y-8 my-4 pb-8 pt-4 bg-black/80 text-lightwhite dark:bg-white/90 backdrop-blur-sm dark:text-lightblack px-8 sm:px-16 rounded-xl shadow-black shadow-sm mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contáctanos</h1>
        <p className="text-gray-500 dark:text-gray-600">
          Rellena el formulario para enviar tu mensaje.
        </p>
      </div>
      <form className="space-y-5" onSubmit={async (e)=> {
        e.preventDefault();
        if((document.getElementById("IGNORE") as HTMLInputElement)?.checked) return;
        try {
          await fetch("/api/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: (document.getElementById("name") as HTMLInputElement).value,
              email: (document.getElementById("email") as HTMLInputElement).value,
              asunto: (document.getElementById("subject") as HTMLInputElement).value,
              mensaje: (document.getElementById("message") as HTMLTextAreaElement).value,
            }),
          });
          isMensajeEnviado = true;
          setTimeout(() => {
            isMensajeEnviado = false;
          }, 5000);
        } catch (err) {
          console.error(err);
        }
      }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              className="!bg-stone-900 placeholder:!text-neutral-300 dark:!text-lightwhite"
              id="name"
              placeholder="Nombre"
            />
            <input
              className="hidden"
              type="checkbox"
              name="IGNORE"
              id="IGNORE"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="!bg-stone-900 placeholder:!text-neutral-300 dark:!text-lightwhite"
              id="email"
              placeholder="Email"
              type="email"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Asunto <span className="text-red-600">*</span></Label>
          <Input
            className="!bg-stone-900 placeholder:!text-neutral-300 dark:!text-lightwhite"
            id="subject"
            placeholder="Asunto del mensaje"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje <span className="text-red-600">*</span></Label>
          <Textarea
            id="message"
            placeholder="Introduce el mensaje"
            className="min-h-[100px] !bg-stone-900 placeholder:!text-neutral-300 dark:!text-lightwhite"
          />
        </div>
        <Button
          type="submit"
          className="dark:text-lightwhite text-lightblack bg-lightwhite active:-translate-y-1 active:shadow-neutral-400 active:!bg-neutral-700 transition-all dark:bg-lightblack dark:hover:bg-neutral-600 hover:bg-neutral-600 hover:text-lightwhite !mt-10 shadow-black shadow-sm"
        >
          Enviar mensaje
        </Button>
         {isMensajeEnviado && <span className="text-green-500 ml-2">Mensaje enviado!</span>}
        <p className="text-sm absolute right-4 bottom-4 "><span className="text-red-600 mr-1">*</span>Campos obligatorios</p>
      </form>
    </div>
  );
}
