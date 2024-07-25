import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  return (
    <div className="w-full max-w-2xl space-y-8 mx-auto my-8 bg-black/80 text-lightwhite dark:bg-white/90 backdrop-blur-sm dark:text-lightblack px-16 py-12 mt-8 mb-8 rounded-xl shadow-black shadow-sm">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Contáctanos</h1>
        <p className="text-gray-500 dark:text-gray-400">
          ¿Tienes alguna duda? Rellena el formulario para enviar tu mensaje.
        </p>
      </div>
      <form className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="subject">Asunto</Label>
          <Input
            className="!bg-stone-900 placeholder:!text-neutral-300 dark:!text-lightwhite"
            id="subject"
            placeholder="Asunto del mensaje"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            placeholder="Introduce el mensaje"
            className="min-h-[100px] !bg-stone-900 placeholder:!text-neutral-300 dark:!text-lightwhite"
          />
        </div>
        <Button
          type="submit"
          className="dark:text-lightwhite text-lightblack bg-lightwhite dark:bg-lightblack dark:hover:bg-neutral-500 hover:bg-neutral-700 hover:text-lightwhite !mt-10 shadow-black shadow-sm"
        >
          Enviar mensaje
        </Button>
      </form>
    </div>
  );
}
