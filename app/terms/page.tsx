import Link from 'next/link'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-bold text-white">Terms and Conditions</h1>
            <p className="mt-2 text-gray-300">Last updated: May 12, 2025</p>
          </div>

          {/* Table of Contents */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 sm:px-10">
            <h2 className="text-lg font-medium text-gray-700">Table of Contents</h2>
            <nav className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {[
                { id: 'introduction', name: '1. Introduction' },
                { id: 'eligibility', name: '2. User Eligibility' },
                { id: 'accounts', name: '3. User Accounts' },
                { id: 'conduct', name: '4. User Conduct' },
                { id: 'intellectual-property', name: '5. Intellectual Property' },
                { id: 'user-content', name: '6. User-Generated Content' },
                { id: 'privacy', name: '7. Privacy Policy' },
                { id: 'liability', name: '8. Limitation of Liability' },
                { id: 'disclaimers', name: '9. Disclaimers' },
                { id: 'termination', name: '10. Termination' },
                { id: 'governing-law', name: '11. Governing Law' },
                { id: 'changes', name: '12. Changes to Terms' },
                { id: 'contact', name: '13. Contact Us' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-600 hover:text-gray-900 hover:underline text-sm"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="px-6 py-8 sm:px-10">
            <div className="prose prose-gray max-w-none">
              <section id="introduction" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to our Terms and Conditions. These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with our website/application/service (the "Service") operated by [Company Name] ("us", "we", or "our").
                </p>
                <p className="mb-4">
                  Please read these Terms carefully before using our Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
                <p className="mb-4">
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                </p>
              </section>

              <section id="eligibility" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Eligibility</h2>
                <p className="mb-4">
                  You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use our Service. By using our Service and agreeing to these Terms, you represent and warrant that you meet the eligibility requirements. If you are using the Service on behalf of a business or legal entity, you further represent and warrant that you have the authority to bind that entity to these Terms.
                </p>
              </section>

              <section id="accounts" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p className="mb-4">
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </section>

              <section id="conduct" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Conduct</h2>
                <p className="mb-4">When using our Service, you agree not to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Use the Service in any way that violates any applicable national or international law or regulation</li>
                  <li>Use the Service for the purpose of exploiting, harming, or attempting to exploit or harm minors</li>
                  <li>Transmit any material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable</li>
                  <li>Impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                  <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which may harm the Company or users of the Service</li>
                  <li>Use the Service in any manner that could disable, overburden, damage, or impair the Service</li>
                  <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service</li>
                </ul>
              </section>

              <section id="intellectual-property" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="mb-4">
                  The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of [Company Name] and its licensors. The Service is protected by copyright, trademark, and other laws of both the [Country] and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of [Company Name].
                </p>
              </section>

              <section id="user-content" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User-Generated Content</h2>
                <p className="mb-4">
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                <p className="mb-4">
                  By posting content to the Service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service. You retain any and all of your rights to any content you submit, post or display on or through the Service and you are responsible for protecting those rights.
                </p>
              </section>

              <section id="privacy" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy Policy</h2>
                <p className="mb-4">
                  Your use of our Service is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy, which explains how we collect, use, and disclose information about you.
                </p>
              </section>

              <section id="liability" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall [Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Your access to or use of or inability to access or use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content</li>
                </ul>
              </section>

              <section id="disclaimers" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers</h2>
                <p className="mb-4">
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                </p>
                <p className="mb-4">[Company Name] does not warrant that:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>The Service will function uninterrupted, secure or available at any particular time or location</li>
                  <li>Any errors or defects will be corrected</li>
                  <li>The Service is free of viruses or other harmful components</li>
                  <li>The results of using the Service will meet your requirements</li>
                </ul>
              </section>

              <section id="termination" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="mb-4">
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                </p>
              </section>

              <section id="governing-law" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="mb-4">
                  These Terms shall be governed and construed in accordance with the laws of [Country], without regard to its conflict of law provisions.
                </p>
                <p className="mb-4">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </section>

              <section id="changes" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="mb-4">
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
              </section>

              <section id="contact" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
                <p className="mb-4">If you have any questions about these Terms, please contact us at:</p>
                <ul className="list-none pl-0 mb-4 space-y-2">
                  <li><strong>Email:</strong> [contact@company.com]</li>
                  <li><strong>Address:</strong> [Company Address]</li>
                  <li><strong>Phone:</strong> [Company Phone Number]</li>
                </ul>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 sm:px-10 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} [Company Name]. All rights reserved.
              </p>
              <div className="mt-4 sm:mt-0">
                <Link 
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
