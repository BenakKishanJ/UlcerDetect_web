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
      <section className="py-16 bg-gray-50" id="features">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-gray-800">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <FeatureCard
              title="AI-Driven Accuracy"
              description="Utilize cutting-edge AI technology for precise detection and reliable insights every time."
              icon="🤖"
            />
            <FeatureCard
              title="User-Friendly Interface"
              description="Intuitive and responsive design ensures effortless navigation and ease of use for all users."
              icon="🎨"
            />
            <FeatureCard
              title="Data Security & Privacy"
              description="Your data is safeguarded with advanced encryption and strict privacy protocols to ensure confidentiality."
              icon="🔐"
            />
            <FeatureCard
              title="Report History Retrieval"
              description="Access and manage past reports effortlessly, enabling detailed analysis and record-keeping."
              icon="🗂️"
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

      {/* Frequently Asked Questions */}

      <section className="py-16 bg-gray-50" id="faq">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
            Frequently Asked Questions: Diabetic Foot Ulcers
          </h2>
          <div className="space-y-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                What is a Diabetic Foot Ulcer?
              </h3>
              <p className="text-gray-600">
                A diabetic foot ulcer is an open sore, often on the bottom of
                the foot, that occurs in people with diabetes. It can lead to
                complications like infection or even amputation but is largely
                preventable with proper care.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                Who is at Risk of Developing a Diabetic Foot Ulcer?
              </h3>
              <p className="text-gray-600">
                People with diabetes, especially those with poor circulation,
                neuropathy, or conditions like kidney or heart disease, are at
                higher risk. Factors like obesity, smoking, and alcohol use can
                also increase the likelihood.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                How Do Diabetic Foot Ulcers Form?
              </h3>
              <p className="text-gray-600">
                Ulcers develop due to nerve damage, poor circulation, or foot
                deformities. High blood sugar levels can impair healing and
                increase the risk of infection.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                How Are Diabetic Foot Ulcers Treated?
              </h3>
              <p className="text-gray-600">
                Treatment includes keeping the ulcer clean, reducing pressure on
                the area (off-loading), managing blood sugar levels, and using
                medications or dressings. In severe cases, surgery may be
                required.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                How Can a Diabetic Foot Ulcer Be Prevented?
              </h3>
              <p className="text-gray-600">
                Prevention involves managing blood sugar levels, wearing proper
                footwear, inspecting feet daily, and avoiding smoking and
                alcohol. Regular visits to a podiatrist can help identify and
                mitigate risks early.
              </p>
            </div>
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
