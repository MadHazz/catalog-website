import { Mail, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    try {
      const body = `${message}\n\nFrom: ${name} <${email}>`;
      const mailto = `mailto:support@shophub.com?subject=${encodeURIComponent(
        'Contact Form Submission'
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Send Message
            </button>
            {status === 'success' && (
              <p className="mt-4 text-green-600">
                Your email client should now open. If it doesn't, please email
                us directly.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-red-600">
                Something went wrong while preparing the message. Please try
                again.
              </p>
            )}
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-indigo-600" />
              <p>support@shophub.com</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-indigo-600" />
              <p>(555) 123-4567</p>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              <p>WhatsApp: +1 234 567 890</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}