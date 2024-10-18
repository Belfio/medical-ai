import { Link } from "@remix-run/react";

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the BioMedical Database platform, you agree to
            comply with and be bound by these Terms and Conditions. If you do
            not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Use of the Platform
          </h2>
          <p>
            The BioMedical Database platform is designed for sharing and
            discovering biomedical datasets and models. Users are expected to
            use the platform responsibly and in compliance with all applicable
            laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
          <p>
            To access certain features of the platform, you may be required to
            create an account. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Content Submission</h2>
          <p>
            By submitting datasets or models to the platform, you affirm that
            you have the right to share this content and that it does not
            violate any third-party rights or applicable laws. You retain
            ownership of your content, but grant us a license to use, store, and
            share it on the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Intellectual Property
          </h2>
          <p>
            The BioMedical Database platform and its original content, features,
            and functionality are owned by us and are protected by international
            copyright, trademark, patent, trade secret, and other intellectual
            property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Data Usage and Privacy
          </h2>
          <p>
            Your use of the platform is also governed by our Privacy Policy. By
            using the platform, you consent to the collection and use of
            information as detailed in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            7. Limitation of Liability
          </h2>
          <p>
            We strive to maintain the accuracy and integrity of the data on our
            platform, but we cannot guarantee its completeness or accuracy. Use
            of the datasets and models on the platform is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. We will notify users of any significant changes by posting an
            update on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:terms@biomeddb.com"
              className="text-blue-600 hover:underline"
            >
              terms@biomeddb.com
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
