import * as React from "react";

interface EmailTemplateProps {
  nombre: string;
  email?: string;
  asunto: string;
  mensaje: string;
}

export function EmailTemplate({
  nombre,
  email,
  asunto,
  mensaje,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Nombre: {nombre}!</h1>
      <h3 className="mb-2">Asunto: {asunto}</h3>
      {email && (
        <h3 className="my-2">Email para contacto de vuelta: {email}</h3>
      )}
      <p>{mensaje}</p>
    </div>
  );
}
