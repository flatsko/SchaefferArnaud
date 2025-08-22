import ContactHero from "../components/contact/ContactHero";
import ContactStats from "../components/contact/ContactStats";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import WhatsAppCard from "../components/contact/WhatsAppCard";
import CalendlyEmbed from "../components/contact/CalendlyEmbed";

const Contact = () => {
  return (
    <div className="min-h-screen pt-16 bg-gray-900">
      <ContactHero />
      <ContactStats />

      {/* Main Content Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-4xl font-bold text-white mb-8">
                Envoyez-moi un <span className="text-purple-400">message</span>
              </h2>
              <ContactForm />
            </div>
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-8">
                  Informations de{" "}
                  <span className="text-purple-400">contact</span>
                </h2>
                <ContactInfo />
              </div>

              {/* WhatsApp Card */}
              <div className="mt-8">
                <WhatsAppCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <CalendlyEmbed />
        </div>
      </section>
    </div>
  );
};

export default Contact;
