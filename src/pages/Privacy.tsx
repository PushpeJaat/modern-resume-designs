const Privacy = () => (
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-3xl">
    <h1 className="text-3xl sm:text-4xl font-extrabold mb-8">Privacy Policy</h1>
    <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
      <p className="text-base">Last updated: March 25, 2026</p>
      
      <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
      <p>We collect information you provide when creating an account (email, name) and resume data you enter into the editor. We also collect usage data such as pages visited and features used.</p>

      <h2 className="text-xl font-bold text-foreground">2. How We Use Your Information</h2>
      <p>Your information is used to provide the CVPilot service, generate and store your resumes, and improve our platform. We do not sell your personal data to third parties.</p>

      <h2 className="text-xl font-bold text-foreground">3. Data Storage & Security</h2>
      <p>Your resume data is stored securely in our cloud infrastructure. We use industry-standard encryption and security practices to protect your information.</p>

      <h2 className="text-xl font-bold text-foreground">4. Your Rights</h2>
      <p>You can access, update, or delete your account and resume data at any time through your profile settings. Contact us at support@cvpilot.info for any data-related requests.</p>

      <h2 className="text-xl font-bold text-foreground">5. Cookies</h2>
      <p>We use essential cookies for authentication and session management. No third-party tracking cookies are used without your consent.</p>

      <h2 className="text-xl font-bold text-foreground">6. Contact</h2>
      <p>For questions about this privacy policy, contact us at <a href="mailto:support@cvpilot.info" className="text-primary hover:underline">support@cvpilot.info</a>.</p>
    </div>
  </div>
);

export default Privacy;
