import FeatureCard from "@/components/utils/FeatureCard";
import HowItWorksStep from "@/components/utils/HowItWorksStep";
import Testimonial from "@/components/utils/Testimonial";
import Image from "next/image";

export default function dashboard() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AI-Powered Ulcer Detection in Seconds
            </h1>
            <p className="text-lg mb-6">
              Harness the power of machine learning to detect ulcers quickly and
              accurately. Accessible and secure for everyone.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <button className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-blue-100">
                <a href="/scan">Get Started</a>
              </button>
              <button className="bg-transparent border border-white px-6 py-3 rounded-md font-medium hover:bg-blue-500">
                <a href="/resources">Learn More</a>
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <Image
              src="/logo.jpeg"
              alt="AI-powered ulcer detection"
              width={500} // Adjust width as per your layout
              height={500} // Adjust height as per your layout
              className="rounded-lg shadow-md"
              priority // Ensures this image is prioritized for loading
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <FeatureCard
              title="AI-Powered Detection"
              description="Leverage advanced machine learning for instant results."
              icon="⚡"
            />
            <FeatureCard
              title="Real-Time Analysis"
              description="Get accurate results in just a few seconds."
              icon="⏱️"
            />
            <FeatureCard
              title="Secure & Private"
              description="Your data is encrypted and never shared."
              icon="🔒"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16" id="how-it-works">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <HowItWorksStep
              number={1}
              title="Upload Image"
              description="Take a clear picture of the affected area and upload it."
            />
            <HowItWorksStep
              number={2}
              title="AI Analysis"
              description="Our AI model processes the image instantly."
            />
            <HowItWorksStep
              number={3}
              title="Get Results"
              description="Receive detailed results and next steps."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" id="testimonials">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <Testimonial
              name="John Doe"
              feedback="This app is a lifesaver! The detection is fast and accurate."
            />
            <Testimonial
              name="Jane Smith"
              feedback="I love how secure and easy to use this app is."
            />
            <Testimonial
              name="Dr. Emily White"
              feedback="A brilliant tool for healthcare professionals."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Our App</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Built using cutting-edge AI technology, our ulcer detection app is
            designed to make healthcare more accessible, secure, and efficient.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg mb-8">
            Start using our app today and experience the future of healthcare.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-blue-100">
            <a href="/scan">Start Scanning Now</a>
          </button>
        </div>
      </section>
    </div>
  );
}
