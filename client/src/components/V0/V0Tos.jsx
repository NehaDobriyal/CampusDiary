import React from "react"

export default function V0Tos() {
    return (
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-xl font-bold">User Responsibilities</h2>
              <p className="mb-4 text-muted-foreground">
                By using our dashboard application, you agree to the following:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Use the application only for lawful purposes and in accordance with these terms.</li>
                <li>
                  Protect your account credentials and be responsible for all activities that occur under your account.
                </li>
                <li>
                  Refrain from engaging in any activities that may interfere with or disrupt the application or its
                  servers.
                </li>
                <li>Respect the intellectual property rights of our company and other users.</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold">Data Privacy</h2>
              <p className="mb-4 text-muted-foreground">
                We take the privacy of your data seriously. By using our application, you agree to the following:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>We may collect and use your personal information to provide and improve our services.</li>
                <li>
                  We will protect your data in accordance with our Privacy Policy, which is available on our website.
                </li>
                <li>
                  You have the right to access, update, and delete your personal information as outlined in our Privacy
                  Policy.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold">Intellectual Property</h2>
              <p className="mb-4 text-muted-foreground">
                The application and its content are the property of our company and are protected by copyright, trademark,
                and other intellectual property laws. You agree to the following:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  You may not modify, copy, distribute, transmit, display, or create derivative works from the application
                  or its content.
                </li>
                <li>You may not reverse engineer or decompile the application without our prior written consent.</li>
                <li>You may not use any of our trademarks or logos without our prior written permission.</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold">Dispute Resolution</h2>
              <p className="mb-4 text-muted-foreground">
                In the event of any dispute arising from your use of the application, the following terms apply:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>The dispute will be governed by the laws of the jurisdiction where our company is headquartered.</li>
                <li>
                  Any legal proceedings will be conducted in the courts of the jurisdiction where our company is
                  headquartered.
                </li>
                <li>
                  You agree to attempt to resolve any disputes through good-faith negotiations before initiating legal
                  action.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }