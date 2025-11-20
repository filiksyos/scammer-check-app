import './globals.css';

export const metadata = {
  title: 'Scammer Check - Verify Online Gurus',
  description: 'AI-powered scammer detection tool using web search and intelligent analysis',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}