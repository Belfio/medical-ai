import { Link } from "@remix-run/react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p>
            Welcome to the BioMedical Database Privacy Policy. This document
            explains how we collect, use, and protect your personal information
            when you use our platform for sharing and discovering biomedical
            datasets and models.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Information We Collect
          </h2>
          <p>
            We may collect personal information such as your name, email
            address, and usage data to provide and improve our services.
            Additionally, we collect information about the datasets and models
            you upload or interact with on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside">
            <li>
              To provide and maintain our biomedical data sharing platform
            </li>
            <li>
              To improve and personalize user experience for researchers and
              contributors
            </li>
            <li>
              To facilitate the sharing and discovery of biomedical datasets and
              models
            </li>
            <li>
              To communicate with you about our services and relevant scientific
              updates
            </li>
            <li>
              To ensure the integrity and security of the data on our platform
            </li>
            <li>
              To comply with legal obligations and ethical standards in
              biomedical research
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information and the biomedical data shared on our platform from
            unauthorized access, alteration, disclosure, or destruction. This
            includes encryption, access controls, and regular security audits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Sharing of Biomedical Data
          </h2>
          <p>
            The datasets and models shared on our platform are intended for
            research purposes. Users are responsible for ensuring they have the
            necessary rights and permissions to share data, and that shared data
            complies with relevant ethical and legal standards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information. You can also control the visibility and sharing
            settings of the datasets and models you upload. Please contact us if
            you wish to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Changes to This Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time to reflect
            changes in our practices or for legal reasons. We will notify you of
            any significant changes by posting the new Privacy Policy on this
            page and updating the effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
            <a
              href="mailto:privacy@biomeddb.com"
              className="text-blue-600 hover:underline"
            >
              privacy@biomeddb.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
