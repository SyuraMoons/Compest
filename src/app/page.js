import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black-800">
      {/* Hero Section */}
      <section className="bg-blue-100 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-black">Sea Catering</h1>
          <p className="text-xl italic text-black">
            Healthy Meals, Anytime, Anywhere
          </p>
        </div>
      </section>
      {/* Introduction Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-black">About Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to SEA Catering, your personalized solution for healthy and
            delicious meals delivered right to your doorstep, anywhere in
            Indonesia. We believe that nutritious eating should seamlessly
            integrate into your lifestyle, whether you're at home, at work, or
            on the go. Our customizable meal plans are thoughtfully designed to
            nourish your body and delight your taste buds, no matter where you
            are in the archipelago.
          </p>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-black">Our Features</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Meal Customization</li>
            <li>Detailed Nutritional Information</li>
            <li>Delivery to major cities</li>
            <li>Dietary options for all needs</li>
          </ul>
        </div>
      </section>
      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-black">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Have questions or feedback? We'd love to hear from you! Reach out to
            us through the following channels:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Manager: Brian</li>
            <li>Phone: (+62) 8123456789</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
