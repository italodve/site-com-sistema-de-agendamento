import { Camera } from "lucide-react";

const galleryItems = [
  { label: "Corte Degradê", span: "col-span-2 row-span-2" },
  { label: "Barba Estilizada", span: "col-span-1 row-span-1" },
  { label: "Nosso Espaço", span: "col-span-1 row-span-1" },
  { label: "Detalhes", span: "col-span-1 row-span-1" },
  { label: "Acabamento", span: "col-span-1 row-span-1" },
  { label: "Ambiente VIP", span: "col-span-2 row-span-1" },
];

export default function GallerySection() {
  return (
    <section id="galeria" className="py-24 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">
            Galeria
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Nosso <span className="text-gradient-gold">Trabalho</span>
          </h2>
          <div className="gold-separator mb-6" />
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Veja alguns dos nossos melhores trabalhos e o ambiente da barbearia.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`${item.span} group relative bg-gradient-to-br from-card-hover to-border rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-gold/30 mx-auto mb-2" />
                  <p className="text-muted/50 text-xs">{item.label}</p>
                </div>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-foreground font-semibold text-sm">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
