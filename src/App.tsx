import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageViewer } from "@/components/image-viewer";
import {
  FaWhatsapp,
  FaEnvelope,
  FaPrint,
  FaPaintBrush,
  FaExpandArrowsAlt,
  FaTruck,
  FaLightbulb,
  FaTools,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { ProjectGallery } from "@/components/Gallery/project-gallery";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const services = [
    {
      icon: FaPrint,
      title: "Impresión Digital",
      description:
        "Impresiones de alta calidad en diversos materiales y tamaños. Perfectas para folletos, carteles y más.",
    },
    {
      icon: FaPaintBrush,
      title: "Diseño Gráfico",
      description:
        "Creación de diseños atractivos y efectivos para tu publicidad. Logos, branding y materiales promocionales.",
    },
    {
      icon: FaExpandArrowsAlt,
      title: "Gran Formato",
      description:
        "Impresiones de gran tamaño para vallas, banners y más. Ideal para eventos y publicidad exterior.",
    },
    {
      icon: FaTruck,
      title: "Rotulación de Vehículos",
      description:
        "Personalización de flotas y vehículos comerciales. Transforma tu vehículo en una herramienta de marketing móvil.",
    },
    {
      icon: FaLightbulb,
      title: "Displays Luminosos",
      description:
        "Creación de displays con iluminación LED para mayor impacto. Perfectos para destacar en ferias y eventos.",
    },
    {
      icon: FaTools,
      title: "Instalación y Montaje",
      description:
        "Servicio completo de instalación y desinstalación de publicidad. Nos encargamos de todo para que tú no tengas que preocuparte.",
    },
  ];

  const projects = [
    {
      image: "img_01.png?height=300&width=400",
      title: "Campaña Pepsi",
      description: "Display LED de gran formato para evento internacional",
    },
    {
      image: "img_02.png?height=300&width=400",
      title: "Decoracion de Camión",
      description: "Impresión en vinilo para flota comercial",
    },
    {
      image: "img_03.png?height=300&width=400",
      title: "Póster de Cine",
      description: "Impresión de alta calidad para estreno de blockbuster",
    },
    {
      image: "img_04.png?height=300&width=400",
      title: "Experiencia de Marca",
      description: "Instalación interactiva 360° para lanzamiento de producto",
    },
    {
      image: "img_05.png?height=300&width=400",
      title: "Stand de Exhibición",
      description: "Diseño y producción de stand para eventos",
    },
    {
      image: "img_06.png?height=300&width=400",
      title: "Fachada Comercial",
      description: "Impresión e instalación de gran formato en edificio",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "inicio",
        "servicios",
        "proyectos",
        "galeria",
        "contacto",
      ];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#8E1B54] to-[#4A0E2A] text-white">
      <header className="sticky top-0 z-50 bg-[#8E1B54] shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            LABEL STUDIO S.A.S
          </motion.h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4 lg:space-x-6">
              {["inicio", "servicios", "proyectos", "galeria", "contacto"].map(
                (item, index) => (
                  <motion.li
                    key={item}
                    initial="hidden"
                    animate="visible"
                    variants={slideIn}
                    custom={index}
                  >
                    <button
                      onClick={() => scrollToSection(item)}
                      className={`capitalize hover:text-pink-300 transition duration-300 ${
                        activeSection === item ? "text-pink-300" : ""
                      }`}
                    >
                      {item}
                    </button>
                  </motion.li>
                )
              )}
            </ul>
          </nav>
          <div className="md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-pink-700 hover:text-white focus:text-pink-300 active:text-pink-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "Cerrar" : "Menú"}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#8E1B54] py-2"
            >
              <ul className="flex flex-col items-center space-y-2">
                {[
                  "inicio",
                  "servicios",
                  "proyectos",
                  "galeria",
                  "contacto",
                ].map((item) => (
                  <li key={item} className="w-full">
                    <button
                      onClick={() => scrollToSection(item)}
                      className="block px-4 py-2 hover:bg-pink-700 focus:bg-pink-700 active:bg-pink-700 rounded transition duration-300 capitalize w-full text-left"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <section
          id="inicio"
          className="min-h-screen flex items-center justify-center text-center px-4 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: "url('background.png?height=1080&width=1920')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#8E1B54] to-[#4A0E2A] opacity-80"></div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Transformamos tus Ideas en Impresiones Impactantes
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200">
              En Label Studio, fusionamos creatividad y tecnología para llevar
              tu marca al siguiente nivel. Descubre soluciones de impresión y
              diseño que capturan la atención y generan resultados.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                className="bg-white text-[#8E1B54] hover:bg-pink-100 transition duration-300 transform hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
                onClick={() =>
                  window.open("https://wa.me/+573192314711", "_blank")
                }
              >
                Solicitar Cotización <FaWhatsapp className="ml-2 inline" />
              </Button>
            </div>
          </motion.div>
        </section>

        <section
          id="servicios"
          className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#4A0E2A] to-[#8E1B54]"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Nuestros Servicios de Excelencia
            </motion.h2>
            <p className="text-center text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
              Ofrecemos una gama completa de soluciones de impresión y diseño
              para satisfacer todas tus necesidades publicitarias y de
              marketing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition duration-300 flex flex-col"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideIn}
                  custom={index}
                >
                  <service.icon className="text-4xl sm:text-5xl mb-4 text-pink-300" />
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  <p className="flex-grow text-sm sm:text-base">
                    {service.description}
                  </p>
                  <Button
                    variant="link"
                    className="text-pink-300 hover:text-pink-400 mt-4 p-0"
                    onClick={() => scrollToSection("contacto")}
                  >
                    Más información <FaArrowRight className="ml-2 inline" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="proyectos"
          className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#8E1B54] to-[#4A0E2A]"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Proyectos que Inspiran
            </motion.h2>
            <p className="text-center text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
              Explora nuestra selección de proyectos destacados y descubre cómo
              hemos ayudado a marcas líderes a destacar en el mercado.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="bg-white/10 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 group cursor-pointer"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideIn}
                  custom={index}
                  onClick={() => openImageViewer(index)}
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover transition duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition duration-300"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <Button
                      variant="link"
                      className="text-pink-300 hover:text-pink-400 p-0"
                    >
                      Ver detalles <FaArrowRight className="ml-2 inline" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="galeria"
          className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#4A0E2A] to-[#8E1B54]"
        >
          <ProjectGallery />
        </section>

        <section
          id="contacto"
          className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#8E1B54] to-[#4A0E2A]"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Hablemos de tu Próximo Proyecto
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
                className="bg-white/10 p-6 sm:p-8 rounded-lg backdrop-blur-sm"
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Información de Contacto
                </h3>
                <p className="mb-4 sm:mb-6 text-base sm:text-lg">
                  Estamos listos para convertir tus ideas en realidad.
                  Contáctanos hoy mismo y descubre cómo podemos impulsar tu
                  marca.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <p className="flex items-center text-base sm:text-lg">
                    <FaStar className="mr-2 text-yellow-400" />
                    <strong>Ejecutiva de cuenta:</strong> Jennyffer Sánchez
                  </p>
                  <p className="flex items-center text-base sm:text-lg">
                    <FaWhatsapp className="mr-2 text-green-400" />
                    <a
                      href="https://wa.me/573492314711"
                      className="hover:text-pink-300 transition duration-300"
                    >
                      319 231 4711
                    </a>
                  </p>
                  <p className="flex items-center text-base sm:text-lg">
                    <FaEnvelope className="mr-2 text-blue-400" />
                    <a
                      href="mailto:labelstudiosa@gmail.com"
                      className="hover:text-pink-300 transition duration-300"
                    >
                      labelstudiosa@gmail.com
                    </a>
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Envíanos un mensaje
                </h3>
                <form className="space-y-4 sm:space-y-6">
                  <Input
                    placeholder="Nombre"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-300 text-base sm:text-lg py-2 sm:py-3"
                  />
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-300 text-base sm:text-lg py-2 sm:py-3"
                  />
                  <Textarea
                    placeholder="Cuéntanos sobre tu proyecto"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-300 text-base sm:text-lg py-2 sm:py-3"
                    rows={5}
                  />
                  <Button className="w-full bg-pink-600 hover:bg-pink-700 transition duration-300 transform hover:scale-105 text-base sm:text-lg py-2 sm:py-3">
                    Enviar Mensaje
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#4A0E2A] py-8 sm:py-12 text-center">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-6 sm:mb-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
              Label Studio S.A.S
            </h3>
            <p className="text-sm sm:text-base text-gray-300">
              Transformando ideas en impresiones impactantes
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8"
          >
            <a
              href="#"
              className="text-white hover:text-pink-300 transition duration-300"
            >
              <FaWhatsapp size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-300 transition duration-300"
            >
              <FaEnvelope size={20} className="sm:w-6 sm:h-6" />
            </a>
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-xs sm:text-sm text-gray-400"
          >
            &copy; 2024 Label Studio S.A.S. Todos los derechos reservados.
          </motion.p>
        </div>
      </footer>

      <AnimatePresence>
        {isImageViewerOpen && (
          <ImageViewer
            images={projects.map((project) => ({
              src: project.image,
              alt: project.title,
            }))}
            initialIndex={currentImageIndex}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
