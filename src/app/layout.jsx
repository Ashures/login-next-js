import "../../public/main.css";

export const metadata = {
  title: 'SpaceTraders UI | Ashures',
  description: 'Login page test made by Ashures',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          {children}
        </div>
      </body>
    </html>
  );
}
