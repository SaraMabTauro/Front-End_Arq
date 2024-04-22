import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

export default function PaginaPrincipal() {
  const [formData, setFormData] = useState({
    idSub: "",
    nombre: "",
    contraseña: ""
  });

  const [socket, setSocket] = useState(null);
  const [suscripcionConfirmation, setSuscripcionConfirmation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("URL_DE_TU_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Error al enviar la suscripción");
      }

      const result = await response.json();
      console.log(result);
      toast.info('Procesando suscripción, estado: pendiente');
    } catch (error) {
      console.error("Error al enviar la suscripción:", error);
      toast.error('Error al enviar la suscripción');
    }
  };

  useEffect(() => {
    if (!socket) {
      const newSocket = io("URL_DE_TU_SOCKET");
      newSocket.on("suscripcion-processed", (suscripcion) => {
        console.log(suscripcion);
        setSuscripcionConfirmation(suscripcion);
        toast.success('Suscripción confirmada!');
        console.log("Suscripción realizada");
      });
      setSocket(newSocket);
    }

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <main className="min-h-screen bg-gradient-to-r from-neutral-800 to-sky-800 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col min-w-[400px]"
      >
        <h1 className="text-3xl text-neutral-800 font-bold mb-4">Datos de Suscripción</h1>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            ID Suscripción
          </label>
          <input
            type="text"
            name="idSub"
            value={formData.idSub}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-800 font-semibold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleInputChange}
            className="bg-neutral-100 appearance-none border rounded w-full py-2 px-3 text-neutral-800 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-800 p-2 text-white rounded font-semibold w-full"
        >
          Suscribirse
        </button>
      </form>
      {suscripcionConfirmation && (
        <div>
          <h2>Suscripción Confirmada:</h2>
          <p>ID Suscripción: {suscripcionConfirmation.idFactura}</p>
          <p>Suscriptor ID: {suscripcionConfirmation.subsId}</p>
        </div>
      )}
    </main>
  );
}
